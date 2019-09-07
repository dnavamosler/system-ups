import firebase from "firebase";

export default () => {
  try {
    return firebase.database();
  } catch (error) {}
};
