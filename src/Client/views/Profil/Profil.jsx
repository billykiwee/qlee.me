import React, { useState, useEffect } from 'react'
import { auth, db, storage} from '../../../App/database/firebase'
import { useNavigate } from 'react-router-dom'
import { signOut } from "firebase/auth"
import { isUserPremium } from '../../../Admin/settings/isPremium'
import { useStateValue } from '../../../App/provider/StateProvider'
import { fetchUser } from '../../lib/database/fetchUser'
import Main from '../../../App/components/Main'

import { PencilSquareIcon } from '@heroicons/react/24/solid'

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'



export default function Profil() {

    const history = useNavigate()

    const [{user}] = useStateValue()

    const [User, setUser] = useState([])

    useEffect(e=> {
        fetchUser(setUser, user?.email)
    }, [user])



    async function uploadPhoto(fileInput, userEmail) {

        try {
            const selectedFile = fileInput.target.files[0]
            const path = `users/photoURL/${userEmail}`
            const fileRef = ref(storage, path)
            const uploadTask = uploadBytesResumable(fileRef, selectedFile)
        
            await uploadTask
    
            const downloadPhoto = await getDownloadURL(ref(storage, path))
    
            db.collection('users').doc(userEmail).update({ photoURL: downloadPhoto })
        } 
        catch (error) {
            console.log(error)
        }
    }

    const [editValue, setEditValue] = useState([])

    function editProfil() {
        db.collection('users').doc(user?.email).update({
            [editValue[0]] : editValue[1]
        })
    }

    

    return (
        <Main>
            <div className='grid gap-2rem blocks'>
                <div className='grid gap-2rem'>
                    <div className='display gap-1rem'>

                        <div className='edit-image-link'>
                            <img src={User?.photoURL} width={68} height={68} className='border-r-100' />
                            <div className='display justify-c border-r-100 white shadow border hover-white absolute click p-04' onClick={e=> document.querySelector('#upload-img').click()}  > 
                                <PencilSquareIcon width={16} />
                                <input 
                                    type='file' 
                                    hidden 
                                    id='upload-img' 
                                    onChange={fileInput => { uploadPhoto(fileInput, User.email) }}
                                />
                            </div>
                        </div>

                        <div className='grid gap-04'>
                            <div className='display gap-1rem'>
                                <h2 className='m-0'>{User?.name}</h2>
                                {
                                    isUserPremium(User).plan !== 'FREE' &&
                                    <div className='display justify-c yellow border-r-04 border-b h-1 p-04'>
                                        <span className='display'>{isUserPremium(User).plan}</span>
                                    </div>
                                }
                            </div>
                            <span>{User?.email}</span>
                        </div>
                    </div>
                    <div className='display gap'>
                        <div className='display'>
                            <button className='p-1 h-4 border-b blue hover-blue border border-r-1' onClick={editProfil} >
                                <span className='f-s-16'>Modifier mes informations</span>
                            </button>
                        </div>
                        <div className='display'>
                            <button className='p-1 h-4 border-b white hover-white border border-r-1' onClick={e=> signOut(auth).then(e=> history('/')) }>
                                <span className='f-s-16'>Se déconnecter</span>
                            </button>
                        </div>
                    </div>
                </div>


                <div className='grid gap-1rem'>
                    <Inputs props={{
                        label: 'Nom',
                        input: 'name',
                        User : User
                    }} />

                    <Inputs props={{
                        label: 'Description',
                        input: 'description',
                        User : User
                    }} />

                    <Inputs props={{
                        label: 'Email',
                        input: 'email',
                        User : User
                    }} />
                    <div className='grid gap'>
                        <span>Mot de passe</span>
                        <input className='div-input white h-3' type='password' defaultValue='*******' />
                    </div>
                    <div className='grid gap'>
                        <span>Confirmer le mot de passe</span>
                        <input className='div-input white h-3' type='password' defaultValue='*******' />
                    </div>
                </div>

            </div>
        </Main>
    )
}



const Inputs = ({props}) => {

    return (
        <div className='grid gap'>
            <span>{props.label}</span>
            <input 
                className='div-input white h-3' 
                type='text' 
                placeholder={props.User?.[props.input]} 
            />
        </div>
    )
}