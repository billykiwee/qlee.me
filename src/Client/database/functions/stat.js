import { db } from "../../../App/database/firebase";

export function stats(setLinks) {
  db.collection("stats").onSnapshot((snapshot) => {
    setLinks(snapshot.docs.map((doc) => doc.data()));
  });
}
