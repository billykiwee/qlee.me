import React from 'react'
import { uploadPhoto } from './database/upload/uploadPhoto'

export default function editPhoto(id, LinkID, type) {

    return (
        <div className='display justify-c border-r-100 white shadow border hover-white absolute click p-04' onClick={e=> document.querySelector('#' + id).click()}  > 
            <PencilSquareIcon width={16} />
            <input 
                type='file' 
                hidden 
                id='upload-img' 
                onChange={input => { uploadPhoto(input, LinkID, type) }}
            />
        </div>
    )
}
