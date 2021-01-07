import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { extractDataFromDoc } from "../firebase/firebaseService";
import { setError } from "../redux/actions/errorActions";
import { clearLoader, setLoader } from "../redux/actions/loaderAction";

export const useFirebaseDocument = ({
  firestoreQuery,
  onDataReceived,
  dependencies,
  shouldExecute
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shouldExecute) {
      return;
    }

    dispatch(setLoader());

    const unsubscribe = firestoreQuery().onSnapshot(
      (snapshot) => {
        if (!snapshot.exists) {
          dispatch(
            setError({
              code: "not_found",
              message: "Could not find this resource."
            })
          );
          dispatch(clearLoader());
          return;
        }
        onDataReceived(extractDataFromDoc(snapshot));

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
