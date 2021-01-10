import firebase from "../firebaseConfig/firebase";

const db = firebase.firestore();

export const extractDataFromDoc = (doc) => {
  if (!doc.exists) {
    return undefined;
  }

  const data = doc.data();

  return {
    ...data,
    id: doc.id
  };
};

export const getItemsListener = (limit, lastDocSnapshot = null) => {
  return db
    .collection("items")
    .orderBy("date")
    .startAfter(lastDocSnapshot)
    .limit(limit);
};

export const getItemListener = (itemId) => {
  return db.collection("items").doc(itemId);
};

export const getPhotosListener = (uid) => {
  return db
    .collection("users")
    .doc(uid)
    .collection("photos")
    .orderBy("createdAt", "desc");
};

export const addItemToFirebase = (item) => {
  const user = firebase.auth().currentUser;

  return db.collection("items").add({
    ...item,
    ownerUid: user.uid,
    owner: user.displayName,
    ownerPhoto: user.photoURL || null,
    members: firebase.firestore.FieldValue.arrayUnion({
      id: user.uid,
      name: user.displayName,
      photoURL: user.photoURL || null
    }),
    memberIds: firebase.firestore.FieldValue.arrayUnion(user.uid)
  });
};

export const updateItemInFirebase = (item) => {
  return db.collection("items").doc(item.id).update(item);
};

export const deleteItemFromFirebase = async (itemId) => {
  await firebase.database().ref(`comments/${itemId}`).remove();

  return db.collection("items").doc(itemId).delete();
};

export const cancelItem = (item) => {
  return db.collection("items").doc(item.id).update({
    isCancelled: !item.isCancelled
  });
};

export const setUserProfile = (user) => {
  return db
    .collection("users")
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
};

export const getUserProfile = (userId) => {
  return db.collection("users").doc(userId);
};

export const updateUserProfile = async (profile) => {
  const user = firebase.auth().currentUser;
  try {
    if (user.displayName !== profile.displayName) {
      await user.updateProfile({ displayName: profile.displayName });
    }
    return await db.collection("users").doc(user.uid).update(profile);
  } catch (error) {
    throw error;
  }
};

export const uploadImage = (file, filename) => {
  const user = firebase.auth().currentUser;
  const storageRef = firebase.storage().ref();
  return storageRef.child(`${user.uid}/images/${filename}`).put(file);
};

export const updateUserProfileWithImage = async (downloadURL, filename) => {
  const user = firebase.auth().currentUser;
  const userDocRef = db.collection("users").doc(user.uid);
  try {
    const userDoc = await userDocRef.get();
    if (!userDoc.data().photoURL) {
      await db.collection("users").doc(user.uid).update({
        photoURL: downloadURL
      });
      await user.updateProfile({
        photoURL: downloadURL
      });
    }

    return await db.collection("users").doc(user.uid).collection("photos").add({
      name: filename,
      url: downloadURL,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch (error) {
    throw error;
  }
};

export const deleteImageFromProfile = async (image) => {
  const user = firebase.auth().currentUser;

  // const storageRef = firebase.storage().ref();
  // await storageRef.child(`${user.uid}/images/${image.name}`).delete(image);

  const userPgotosDocRef = db
    .collection("users")
    .doc(user.uid)
    .collection("photos")
    .doc(image.id);

  try {
    const userPhotosDoc = await userPgotosDocRef.get();
    const userPhotosDocId = userPhotosDoc.id;
    if (user.photoURL === image.url) {
      await user.updateProfile({ photoURL: null });
    }

    await db.collection("users").doc(user.uid).update({ photoURL: null });

    return await db
      .collection("users")
      .doc(user.uid)
      .collection("photos")
      .doc(userPhotosDocId)
      .delete();
  } catch (error) {
    throw error;
  }
};

export const setImageAsMain = async (image) => {
  const user = firebase.auth().currentUser;
  const itemDocQuery = db
    .collection("items")
    .where("memberIds", "array-contains", user.uid);
  const userFollowingRef = db
    .collection("following")
    .doc(user.uid)
    .collection("userFollowings");

  const batch = db.batch();

  batch.update(db.collection("users").doc(user.uid), { photoURL: image.url });

  try {
    const itemQuerySnap = await itemDocQuery.get();
    for (let i = 0; i < itemQuerySnap.docs.length; i++) {
      const itemDoc = itemQuerySnap.docs[i];
      if (itemDoc.data().ownerUid === user.uid) {
        batch.update(itemQuerySnap.docs[i].ref, {
          ownerPhoto: image.url
        });
      }

      batch.update(itemQuerySnap.docs[i].ref, {
        members: itemDoc.data().members.filter((member) => {
          if (member.id === user.uid) {
            member.photoURL = image.url;
          }

          return member;
        })
      });
    }

    const userFollowingSnap = await userFollowingRef.get();

    userFollowingSnap.docs.forEach((docRef) => {
      const followingDocRef = db
        .collection("following")
        .doc(docRef.id)
        .collection("userFollowers")
        .doc(user.uid);
      batch.update(followingDocRef, {
        photoURL: image.url
      });
    });

    // const followingIds = [];

    // const userFollowersSnap = await userFollowingRef.get();

    // userFollowersSnap.docs.forEach((docRef) => {
    //   followingIds.push(docRef.id);
    // });

    // followingIds.forEach((id) => {
    //   const followingDocRef = db
    //     .collection("following")
    //     .doc(id)
    //     .collection("userFollowings")
    //     .doc(user.uid);
    //   batch.update(followingDocRef, { photoURL: image.url });
    // });

    await batch.commit();

    return await user.updateProfile({ photoURL: image.url });
  } catch (error) {
    throw error;
  }
};

export const makeUserMember = (item) => {
  const user = firebase.auth().currentUser;
  return db
    .collection("items")
    .doc(item.id)
    .update({
      members: firebase.firestore.FieldValue.arrayUnion({
        id: user.uid,
        name: user.displayName,
        photoURL: user.photoURL || null
      }),
      memberIds: firebase.firestore.FieldValue.arrayUnion(user.uid)
    });
};

export const cancelUserMember = async (item) => {
  const user = firebase.auth().currentUser;
  try {
    const itemDoc = await db.collection("items").doc(item.id).get();
    return db
      .collection("items")
      .doc(item.id)
      .update({
        members: itemDoc
          .data()
          .members.filter((member) => member.id !== user.uid),
        memberIds: firebase.firestore.FieldValue.arrayRemove(user.uid)
      });
  } catch (error) {
    throw error;
  }
};

// Comments

export const addComment = (itemId, values) => {
  const user = firebase.auth().currentUser;
  const newComment = {
    username: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid,
    text: values.comment,
    dateString: `${new Date()}`,
    parentId: values.parentId
  };

  return firebase.database().ref(`comments/${itemId}`).push(newComment);
};

export const itemCommentsRef = (itemId) => {
  return firebase.database().ref(`comments/${itemId}`).orderByKey();
};

export const readComments = (itemId) => {
  return firebase
    .database()
    .ref(`comments/${itemId}`)
    .orderByKey()
    .once("value");
};

// Followers / following

export const followUser = async (profile) => {
  const user = firebase.auth().currentUser;
  const batch = db.batch();

  try {
    batch.set(
      db
        .collection("following")
        .doc(user.uid)
        .collection("userFollowings")
        .doc(profile.id),
      {
        displayName: profile.displayName,
        photoURL: profile.photoURL,
        uid: profile.id
      }
    );

    batch.update(db.collection("users").doc(user.uid), {
      followingCount: firebase.firestore.FieldValue.increment(1)
    });

    return await batch.commit();
  } catch (error) {
    throw error;
  }
};

export const unfollowUser = async (profile) => {
  const user = firebase.auth().currentUser;
  const batch = db.batch();

  try {
    batch.delete(
      db
        .collection("following")
        .doc(user.uid)
        .collection("userFollowings")
        .doc(profile.id)
    );

    batch.update(db.collection("users").doc(user.uid), {
      followingCount: firebase.firestore.FieldValue.increment(-1)
    });

    return await batch.commit();
  } catch (error) {
    throw error;
  }
};

export const getFollowersCollection = (profileId) => {
  return db.collection("following").doc(profileId).collection("userFollowers");
};

export const getFollowingCollection = (profileId) => {
  return db.collection("following").doc(profileId).collection("userFollowings");
};

export const getFollowingDoc = (profileId) => {
  const userUid = firebase.auth().currentUser.uid;
  return db
    .collection("following")
    .doc(userUid)
    .collection("userFollowings")
    .doc(profileId)
    .get();
};
