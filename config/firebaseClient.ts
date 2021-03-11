import firebaseClient from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const CLIENT_CONFIG = {
  apiKey: "AIzaSyDbQ-S48-x-xmJSfD9ZvMXNWcBgCKX5sTY",
  authDomain: "test-frontend-44820.firebaseapp.com",
  databaseURL: "https://test-frontend-44820.firebaseio.com",
  projectId: "test-frontend-44820",
  storageBucket: "test-frontend-44820.appspot.com",
  messagingSenderId: "676284423351",
  appId: "1:676284423351:web:caf8de3dd0c91b42178132",
};

if (typeof window !== "undefined" && !firebaseClient.apps.length) {
  firebaseClient.initializeApp(CLIENT_CONFIG);
  firebaseClient
    .auth()
    .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
  (window as any).firebase = firebaseClient;
}

export { firebaseClient };