import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// const isClientSide = require('../isClientSide')

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "billing-management-7e841.firebaseapp.com",
  projectId: "billing-management-7e841",
  storageBucket: "billing-management-7e841.appspot.com",
  messagingSenderId: "886975848837",
  appId: "1:886975848837:web:f17340255de80eca5264ec",
  measurementId: "G-FPMPCF82YN",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseDB = getFirestore(firebaseApp);
// if (isClientSide()) firebase.analytics()

// Helpers
const docWithId = (doc) => ({ id: doc.id, ...doc.data() });

const getDocumentItem = async (docRef) => docWithId(await docRef.get());

const getCollectionItems = async (collectionRef) => {
  const collectionSnapshots = await collectionRef.get();
  const snapshots = [];
  collectionSnapshots.forEach((snapshot) => {
    snapshots.push(docWithId(snapshot));
  });
  return snapshots;
};

// To avoid “cannot be serialized as JSON” error
const convertDates = (doc) => ({
  ...doc,
  dateCreated: doc.dateCreated ? doc.dateCreated.toDate().toString() : null,
  dateUpdated: doc.dateUpdated ? doc.dateUpdated.toDate().toString() : null,
});

module.exports = {
  firebaseApp,
  firebaseDB,

  docWithId,
  getDocumentItem,
  getCollectionItems,

  convertDates,
};
