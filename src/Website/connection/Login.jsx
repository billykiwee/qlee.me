import React, { useState, useEffect } from 'react'
import { auth, db } from '../../App/database/firebase'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStateValue } from '../../App/components/StateProvider'
import { GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo, signOut} from "firebase/auth"
import { serverTimestamp } from 'firebase/firestore'
import UniqueID from '../../App/utils/uniqueID'
import Messages from '../../App/utils/Messages'
import RandomPhotoURL from '../../App/utils/RandomPhotoURL'
import Main from '../../App/components/Main'
import '../../App/css/login.css'



export default function Signup() {

    const { NameShop } = useParams()
    
    const [Name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const history = useNavigate()
    const [{user}] = useStateValue()

    const [MSG, setMSG] = useState({})   

    const userID = UniqueID('user', 10)


    // User register by email
    function register(e) {

        e.preventDefault() 
        setMSG({loader: true})

        const minLengthName = 4
        const maxLengthName = 16
        const minLengthPassword = 6
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const regexPWD = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)&é"'(§è!çà)-^$`ù=:;,]/

        console.log(email);

        async function Check() {

            if (!email) {
                throw 'Veuillez entrer un email valide'
            }

            if (!email.match(regexEmail)) {
                throw "L'email n'est pas valide"
            }
    
            if (password.length < minLengthPassword) {
                throw 'Le mot de passe doit contenir au moins 6 caractères'
            }
    
            if (!password.match(regexPWD)) {
                throw 'Le mot de passe doit contenir un caractère spécial'
            }
    
            if (!password.match(/.[1234567890]/)) {
                throw 'Le mot de passe doit contenir un nombre'
            }

            return true
        }

        Check()
        .then(e=> {

            const RandomPhotoUrl = document.querySelector('canvas')?.id

            
            auth.createUserWithEmailAndPassword(email, password)
            .then(e=> {
                    // Add this user on database
                db.collection('users').doc(email).set({
                    id    : userID,
                    name  : email.split('@')[0],
                    email : email,
                    photoURL: RandomPhotoUrl,
                    date  : serverTimestamp()
                }) 
                .then(e=> history('/dashboard') )
            })
            .catch(error => {
                console.log(error)
                setMSG({
                    statu: 'error', 
                    msg: "L'adresse mail est associé à un autre compte"
                })
            })
        })
        .catch(error => {

            setMSG({
                statu: 'error', 
                msg: error
            })

        }) 
    }


    // User register with Google
    function GoogleRegister() {

        const RandomPhotoUrl = document.querySelector('canvas')?.id

        const provider = new GoogleAuthProvider()

        async function signup() {

            await signInWithPopup(auth, provider)
            .then(async (result) => {

                // If user log for the frist time
                const isFirstLogin = getAdditionalUserInfo(result).isNewUser
                 
                if (isFirstLogin) {

                    db.collection('users').doc(auth.currentUser.email).set({
                        id    : userID,
                        name  : NameShop ?? auth.currentUser.displayName,
                        email : auth.currentUser.email,
                        photoURL: auth.currentUser.photoURL,
                        logo: RandomPhotoUrl,
                        date  : serverTimestamp()
                    }) 
                }
                else {
                    history('/dashboard')
                    console.log('Déjà client');
                }
            })
            return userID
        }

        signup()
        .then(shop => {
            history('/dashboard')
            console.log('compte créer avec google');
        }) 
    }



    // Hash password
    const [passwordShown, setPasswordShown] = useState(false)


//signOut(auth)

    return (

        <Main>
            <div className='login'>
                <div className='login-img'>
                    <img className='border-r-2' width={444} height='100%' src='https://images.unsplash.com/photo-1665686306574-1ace09918530?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80' />
                </div>
                <div className="form-block">

                    <RandomPhotoURL user={email} />

                    <form className='grid w-100p'>

                        <div className='grid m-b-1'>
                            <div className='display justify-c'>
                                <h2 className='text-align-c'>Se connecter avec</h2>
                            </div>
                            <div className='display justify-c gap'>
                                <div className='display'>
                                    <button className='border border-r-1 hover h-3' type='button' onClick={GoogleRegister}>
                                        <span className='f-s-16 opacity p-04 c-black'>Google</span>
                                        <img src='/images/google.svg' width={36} />
                                    </button>
                                </div>
                                <div className='display'>
                                    <button className='border border-r-1 hover h-3' type='button' onClick={GoogleRegister}>
                                        <span className='f-s-16 opacity p-04 c-black'>Facebook</span>
                                        <img src='/images/facebook.svg' width={36} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className='display border-top justify-c m-t-2 m-b-2 opacity'>
                            <div className='display justify-c white absolute w-3'>
                                <span className=''>ou</span>
                            </div>
                        </div>


                        <Messages statu={MSG.statu} msg={MSG.msg} loader={MSG.loader} />

                        <div className='grid w-100p m-b-1'>
                            <div className='m-b-04'>
                                <label>Email</label>
                            </div>
                            <div className='div-input display border border-r-1'>
                                <span className='display m-l-1'>
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </span>
                                <input type="email" placeholder='mon-email@gmail.com' className='border-0 m-l-04 w-100p'onChange={e => setEmail(e.target.value)} required />
                            </div>
                        </div>

                        <div className='grid w-100p m-b-1'>
                            <div className='m-b-04'>
                                <label>Mot de passe</label>
                            </div>
                            <div className='div-input display border border-r-1'>
                                <span className='display m-l-1'>
                                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.8586 7.16405C14.3449 7.16405 14.8112 7.3572 15.155 7.70102C15.4988 8.04484 15.692 8.51115 15.692 8.99738M19.3586 8.99738C19.3589 9.85646 19.1579 10.7036 18.7718 11.4711C18.3857 12.2385 17.8251 12.9047 17.1351 13.4165C16.4451 13.9283 15.6449 14.2713 14.7984 14.4181C13.952 14.5649 13.0829 14.5114 12.2609 14.2618L10.192 16.3307H8.35864V18.1641H6.52531V19.9974H3.77531C3.53219 19.9974 3.29904 19.9008 3.12713 19.7289C2.95522 19.557 2.85864 19.3238 2.85864 19.0807V16.7102C2.85869 16.4671 2.95531 16.234 3.12723 16.0621L8.59423 10.5951C8.36547 9.8389 8.30233 9.04225 8.4091 8.25942C8.51587 7.47659 8.79005 6.72595 9.21297 6.05859C9.63589 5.39124 10.1976 4.82283 10.8599 4.39207C11.5223 3.9613 12.2696 3.67829 13.0511 3.56229C13.8327 3.44629 14.63 3.50003 15.3889 3.71984C16.1478 3.93966 16.8504 4.3204 17.4489 4.83614C18.0474 5.35189 18.5278 5.99053 18.8574 6.7086C19.1869 7.42666 19.3579 8.20731 19.3586 8.99738V8.99738Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </span>
                                <input  
                                    className='border-0 m-l-04 w-100p'
                                    type={passwordShown ? "text" : "password"}  
                                    onChange={e => setPassword(e.target.value)} 
                                    placeholder='*********'
                                    required
                                />
                                <img 
                                    className="display click m-r-1" 
                                    onClick={e=> setPasswordShown(passwordShown === true ? false : true)} 
                                    alt="" 
                                    width={20}
                                    src={passwordShown ? '/images/eye.svg' : '/images/eye-closed.svg'}
                                /> 
                            </div>
                        </div>
                        
                        <div className='grid m-t-1'>    
                            <button className="blue f-s-16 border-r-1 border-b hover-blue" onClick={register} type="submit">
                                <span className='f-s-16 p-1'>Se connecter</span>
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </Main>
    )
}
