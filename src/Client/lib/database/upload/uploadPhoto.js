import { db, storage } from '../../../../App/database/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'


export async function uploadPhoto(fileInput, linkID) {

    try {
        const selectedFile = fileInput.target.files[0]
        const path = `links/favicon/${linkID}`
        const fileRef = ref(storage, path)
        const uploadTask = uploadBytesResumable(fileRef, selectedFile)
    
        await uploadTask

        const downloadUrl = await getDownloadURL(ref(storage, path))

        db.collection('links').doc(linkID).update({ icon: downloadUrl })
    } 
    catch (error) {
        console.log(error)
    }
}
