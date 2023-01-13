import { PencilSquareIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useStateProps } from '../../../../../../App/provider/ContextProvider'
import { db, storage } from '../../../../../../App/database/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import getFavicon from '../../../../../../App/utils/getFavicon'


export default function LinkIcon({ upload }) {

    const { Link } = upload

    const { snackBar } = useStateProps()
    

   async function uploadPhoto(fileInput) {

        try {
            const selectedFile = fileInput.target.files[0]
            const path = `links/favicon/${Link.id}`
            const fileRef = ref(storage, path)

            await uploadBytesResumable(fileRef, selectedFile)
    
            const downloadUrl = await getDownloadURL(ref(storage, path))
    
            db
            .collection('links')
            .doc(Link.id)
            .update({ icon: downloadUrl })

            snackBar.add({ text: 'Icon modifié' })
        } 
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='display justify-c'>
            <div className='edit-image-link'>
                <img src={getFavicon(Link)} width={80} height={80} className='border-r-100' /> 
                <label htmlFor='upload-img' className=' display justify-c border-r-100 white shadow border hover-white absolute click p-04 w-1 h-1'>
                    <PencilSquareIcon width={16} />
                    <input 
                        type='file' 
                        hidden 
                        id='upload-img' 
                        onChange={uploadPhoto}
                    />
                </label>
            </div>
        </div>
    )
}
