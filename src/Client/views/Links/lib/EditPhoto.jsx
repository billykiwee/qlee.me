import { PencilSquareIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useStateProps } from '../../../../App/provider/ContextProvider'
import { db, storage } from '../../../../App/database/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'


export default function EditPhoto({ upload }) {

    const { LinkID } = upload

    const { snackBar } = useStateProps()
    

   async function uploadPhoto(fileInput, linkID) {

        try {
            const selectedFile = fileInput.target.files[0]
            const path = `links/favicon/${linkID}`
            const fileRef = ref(storage, path)

            await uploadBytesResumable(fileRef, selectedFile)
    
            const downloadUrl = await getDownloadURL(ref(storage, path))
    
            db
            .collection('links')
            .doc(linkID)
            .update({ icon: downloadUrl })

            snackBar.add({ text: 'Icon modifié' })
        } 
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='display justify-c border-r-100 white shadow border hover-white absolute click p-04' onClick={e=> e.target.children[0].click()}  > 
            <label htmlFor='upload-img'>
                <PencilSquareIcon width={16} />
                <input 
                    type='file' 
                    hidden 
                    id='upload-img' 
                    onChange={input => { uploadPhoto(input, LinkID) }}
                />
            </label>
        </div>
    )
}
