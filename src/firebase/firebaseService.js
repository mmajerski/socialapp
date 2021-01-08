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

export const getItemsListener = () => {
  return db.collection("items").orderBy("date");
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
  return db.collection("items").add({
    ...item,
    owner: "Mike",
    ownerPhoto: "https://randomuser.me/api/portraits/men/2.jpg",
    members: firebase.firestore.FieldValue.arrayUnion(
      {
        id: "a",
        name: "Mike",
        photoURL: "https://randomuser.me/api/portraits/men/2.jpg"
      },
      {
        id: "b",
        name: "Jane",
        photoURL: "https://randomuser.me/api/portraits/women/11.jpg"
      }
    )
  });
};

export const updateItemInFirebase = (item) => {
  return db.collection("items").doc(item.id).update(item);
};

export const deleteItemFromFirebase = (itemId) => {
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
  try {
    await user.updateProfile({ photoURL: image.url });
    return await db
      .collection("users")
      .doc(user.uid)
      .update({ photoURL: image.url });
  } catch (error) {
    throw error;
  }
};
