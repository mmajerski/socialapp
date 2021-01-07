import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { extractDataFromDoc } from "../firebase/firebaseService";
import { setLoader, clearLoader } from "../redux/actions/loaderAction";

export const useFirebaseCollection = ({
  firestoreQuery,
  onDataReceived,
  dependencies
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoader());

    const unsubscribe = firestoreQuery().onSnapshot(
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => extractDataFromDoc(doc));
        onDataReceived(docs);
        dispatch(clearLoader());
      },
      (error) => {
        console.log(error);
        dispatch(clearLoader());
      }
    );

    return () => {
      unsubscribe();
    };
  }, dependencies);
};
