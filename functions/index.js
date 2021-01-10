const functions = require("firebase-functions");

const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

exports.followUserFunction = functions.firestore
  .document("following/{userUid}/userFollowings/{profileId}")
  .onCreate(async (snapshot, context) => {
    const following = snapshot.data();
    try {
      const userDoc = await db
        .collection("users")
        .doc(context.params.userUid)
        .get();
      const batch = db.batch();

      batch.set(
        db
          .collection("following")
          .doc(context.params.profileId)
          .collection("userFollowers")
          .doc(context.params.userUid),
        {
          displayName: userDoc.data().displayName,
          photoURL: userDoc.data().photoURL,
          uid: userDoc.id
        }
      );
      batch.update(db.collection("users").doc(context.params.profileId), {
        followerCount: admin.firestore.FieldValue.increment(1)
      });

      return await batch.commit();
    } catch (error) {
      return console.log(error);
    }
  });

exports.unfollowUserFunction = functions.firestore
  .document("following/{userUid}/userFollowings/{profileId}")
  .onDelete(async (snapshot, context) => {
    try {
      const batch = db.batch();

      batch.delete(
        db
          .collection("following")
          .doc(context.params.profileId)
          .collection("userFollowers")
          .doc(context.params.userUid)
      );

      batch.update(db.collection("users").doc(context.params.profileId), {
        followerCount: admin.firestore.FieldValue.increment(-1)
      });

      return await batch.commit();
    } catch (error) {
      return console.log(error);
    }
  });

exports.updateFollowings = functions.firestore
  .document("following/{profileId}/userFollowers/{userId}")
  .onUpdate(async (snapshot, context) => {
    try {
      const userDoc = await db
        .collection("users")
        .doc(context.params.userId)
        .get();
      const batch = db.batch();

      batch.update(
        db
          .collection("following")
          .doc(context.params.profileId)
          .collection("userFollowings")
          .doc(context.params.userId),
        {
          photoURL: userDoc.data().photoURL
        }
      );

      return await batch.commit();
    } catch (error) {
      return console.log(error);
    }
  });

// exports.itemUpdated = functions.firestore
//   .document("/items/{itemId}")
//   .onUpdate(async (snapshot, context) => {
//     const before = snapshot.before.data();
//     const after = snapshot.after.data();

//     if (before.members.length < after.members.length) {
//       let memberJoined = after.members.filter(
//         (item1) => !before.members.some((item2) => item2.id === item1.id)
//       )[0];

//       try {
//         const followerDocs = await db
//           .collection("following")
//           .doc(memberJoined.id)
//           .collection("userFollowers")
//           .get();
//         followerDocs
//           .forEach((doc) => admin.database().ref(`/posts/${doc.id}`))
//           .push(newPost(memberJoined, "joined-item", context.params.itemId));
//       } catch (error) {
//         return console.log(error);
//       }
//     }

//     if (before.members.length > after.members.length) {
//       let memberLeft = before.members.filter(
//         (item1) => !after.members.some((item2) => item2.id === item1.id)
//       )[0];

//       try {
//         const followerDocs = await db
//           .collection("following")
//           .doc(memberLeft.id)
//           .collection("userFollowers")
//           .get();
//         followerDocs
//           .forEach((doc) => admin.database().ref(`/posts/${doc.id}`))
//           .push(newPost(memberLeft, "left-item", context.params.itemId));
//       } catch (error) {
//         return console.log(error);
//       }
//     }

//     return console.log("finished");
//   });

// function newPost(user, code, itemId) {
//   return {
//     photoURL: user.photoURL,
//     date: admin.database.ServerValue.TIMESTAMP,
//     code,
//     displayName: user.displayName,
//     itemId,
//     userUid: user.id
//   };
// }
