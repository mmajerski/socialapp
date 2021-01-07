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
    .doc(user.id)
    .set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
};
