import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../../App/database/firebase";

export async function uploadPhoto(fileInput, userEmail) {
  try {
    const selectedFile = fileInput.target.files[0];
    const path = `users/photoURL/${userEmail}`;
    const fileRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(fileRef, selectedFile);

    await uploadTask;

    const downloadPhoto = await getDownloadURL(ref(storage, path));

    db.collection("users").doc(userEmail).update({ photoURL: downloadPhoto });
  } catch (error) {
    console.log(error);
  }
}
