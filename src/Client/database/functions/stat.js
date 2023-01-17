import { db } from "../../../App/database/firebase"

export function stats(setLinks, linkID) {

  db.collection('stats')
  .where('LinkID', '==', linkID)
  .onSnapshot(snapshot=> {
      setLinks(snapshot.docs.map(doc => doc.data()))
  })
}
