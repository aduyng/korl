import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import FirebaseCredentials from "./config";

let app: FirebaseApp;

export default function getClient(): FirebaseApp {
  if (app) {
    return app;
  }
  app = initializeApp(FirebaseCredentials);

  const auth = getAuth();
  auth.useDeviceLanguage();
  return app;
}