import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import firebase from "firebase/compat/app";
import firebaseConfig from "./firebaseConfig";
import axios from "./axios";

firebase.initializeApp(firebaseConfig);
const auth = getAuth();

const signIn = async (email, password) => {
  try {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        axios
          .post("/", { email: email })
          .then((res) => {})
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error.message);
  }
};

const signUp = async (email, password, name) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password).then((user) => {
      axios
        .post("/users/new", { email: email, name: name })
        .then((res) => {})
        .catch((error) => console.log(error));
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};

export { auth, signIn, signUp, logOut };
