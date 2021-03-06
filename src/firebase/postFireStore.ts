import firebase from "firebase";
import geohash from "ngeohash";
import { db, FieldValue } from "./firebase";

type PhotoData = {
  latitude: number;
  longitude: number;
  photogenicSubject: string;
  uid: string;
  url: string;
  filename: string;
};
type PostFireStore = {
  addImageData: (data: PhotoData) => Promise<{ state: string; docId?: string }>;
  addPhotoId: (docId: string) => Promise<string>;
  getPhotoData: (
    docId: string
  ) => Promise<{ state: string; data?: firebase.firestore.DocumentData }>;
};

const photosRef = db.collection("photos");

export const postFireStore: PostFireStore = {
  // photosコレクションにデータを追加
  addImageData: (data: PhotoData) => {
    const { latitude, longitude, photogenicSubject, uid, url, filename } = data;
    const geohashStr = geohash.encode(latitude, longitude);
    return new Promise((resolve) => {
      photosRef
        .add({
          create_time: FieldValue.serverTimestamp(),
          favoriteNumber: 0,
          geohash: geohashStr,
          latitude,
          longitude,
          photogenic_subject: photogenicSubject,
          uid,
          url,
          img_index: filename,
        })
        .then(async (docRef) => {
          const addIdResult = await postFireStore.addPhotoId(docRef.id);
          if (addIdResult === "error") resolve({ state: "error" });
          resolve({ state: "success", docId: docRef.id });
        })
        .catch((error) => {
          resolve({ state: "error" });
        });
    });
  },
  // ランダム生成されたドキュメントIDをphoto_idフィールドに追加
  addPhotoId: (docId: string) => {
    return new Promise((resolve) => {
      photosRef
        .doc(docId)
        .update({
          photo_id: docId,
        })
        .then(() => {
          resolve("success");
        })
        .catch((error) => {
          resolve("error");
        });
    });
  },
  getPhotoData: (docId: string) => {
    return new Promise((resolve) => {
      photosRef
        .doc(docId)
        .get()
        .then((doc) => {
          resolve({ state: "success", data: doc.data() });
        })
        .catch((error) => {
          resolve({ state: "error" });
        });
    });
  },
};
