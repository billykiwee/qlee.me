import React, { useState } from 'react'
import { auth, db, storage} from '../../../App/database/firebase'
import { useNavigate } from 'react-router-dom'
import { signOut } from "firebase/auth"
import { isUserPremium } from '../../../Admin/settings/isPremium'
import Login from '../../../Website/views/Login/Login'
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import Main from '../../../App/components/Main'
import { useStateProps } from '../../../App/provider/ContextProvider'
import formatDate from '../../../App/utils/formatDate'
import formatCurrency from '../../../App/utils/formatCurrency'



export default function Profil() {

    const { user, transactions } = useStateProps()

    const history = useNavigate()

    const User =  user?.profil


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



    
    if (!user) return <Login />
    if (User)
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
                                    onChange={fileInput => { uploadPhoto(fileInput, User?.email) }}
                                />
                            </div>
                        </div>

                        <div className='grid gap-04'>
                            <div className='display gap-1rem'>
                                <span className='m-0 f-s-2rem f-w-500'>{User?.name}</span>
                                {
                                    isUserPremium(User).plan !== 'FREE' &&
                                    <div className='display justify-c yellow border-r-04 border-b h-1 p-04'>
                                        <span className='display'>{isUserPremium(User)?.plan}</span>
                                    </div>
                                }
                            </div>
                            <span>{User?.email}</span>
                        </div>
                    </div>
                    <div className='display gap'>
                        {/* <div className='display'>
                            <button className='p-1 h-4 border-b blue hover-blue border border-r-1' onClick={editProfil} >
                                <span className='f-s-16'>Modifier mes informations</span>
                            </button>
                        </div> */}
                        <div className='display'>
                            <button className='p-1 h-4 border-b white hover-white border border-r-1' onClick={e=> signOut(auth).then(e=> history('/')) }>
                                <span className='f-s-16'>Se déconnecter</span>
                            </button>
                        </div>
                    </div>
                    <div className='grid gap'>
                        <span className='f-s-20'>Mes informations</span>
                        <div className='grid gap-1rem white border-r-1 p-1 border'>
                            <Inputs props={{
                                label: 'Nom',
                                input: 'name',
                                User : User
                            }} />

                            <Inputs uneditable props={{
                                label: 'Email',
                                input: 'email',
                                User : User,
                            }} />
                        </div>
                    </div>
                </div>


                <div className='grid gap-2rem'>

                    <div className='grid gap'>
                        <span className='f-s-20'>Mes transactions</span>
                        <div className='grid gap-1rem' >
                            <div className='grid white border-r-04 border'>
                                <div className='display justify-s-b f-w-600' style={{ borderBottom: '1px solid var(--grey)', overflow: 'hidden', background: 'var(--grey-2)' }}>
                                    <span style={{width: '50%'}} className='p-1'>Type</span>
                                    <span style={{minWidth: '20%'}} className='text-align-e p-1' >Montant</span>
                                    <span className='text-align-e p-1' style={{width: '30%'}}>Date</span>
                                </div>
                                {
                                    transactions
                                    .sort((a,b) => b.date - a.date)
                                    .map((transaction, i)=> {

                                        const { id, type, formatAmount, date } = transaction

                                        return (
                                            <div className='display justify-s-b h-3' key={id} id={i}  style={{
                                                borderBottom: i !== transactions.length-1 ? '1px solid var(--grey)' : '',
                                            }}>
                                                <span style={{width: '50%'}} className='p-1'>{type}</span>  
                                                <span style={{minWidth: '20%', textAlign: 'end'}} className={(type === 'withdraw' ? 'c-green' : 'c-blue ') + 'p-1'}>{formatCurrency(formatAmount)}</span>
                                                <small style={{width: '30%', textAlign: 'end'}} className='p-1'>{formatDate(date, 'date').replaceAll('/', '-')}</small>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                </div>
                

            </div>
        </Main>
    )
}



const Inputs = ({ props, uneditable }) => {

    const { User, label, input } = props

    return (
        <div className='grid gap' style={{ pointerEvents : uneditable ? 'none' : 'cursor' }} >
            <span>{label}</span>
            <input 
                className='div-input grey h-3' 
                type='text' 
                placeholder={User?.[input]} 
            />
        </div>
    )
}