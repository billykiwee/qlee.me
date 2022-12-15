/* import { auth } from 'firebase-admin'
import { signInWithPopup } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Main from '../../App/components/Main'
import { useStateValue } from '../../App/components/StateProvider'
import { db } from '../../App/database/firebase'
import UniqueID from '../../App/utils/uniqueID'

export default function Login() {


    const [password, setPassword] = useState('')
    const [Name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [Phone, setPhone] = useState('')
    const [AcceptTerms, setAcceptTerms] = useState(true)

    const history = useNavigate()
    const [{user}] = useStateValue()

    const [MSG, setMSG] = useState({})   

    const userID =  UniqueID('user-', 10)


    // User register by email
    function register(e) {

        e.preventDefault() 
        setMSG({loader: true})

        const minLengthName = 4
        const maxLengthName = 16
        const minLengthPassword = 6
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const regexPWD = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)&é"'(§è!çà)-^$`ù=:;,]/


        async function Check() {

            if (Name.length < minLengthName && Name.length > maxLengthName) {
                throw `Le nom doit contenir entre ${minLengthName} et ${maxLengthName} `
            }
        
            if (!email) {
                throw 'Veuillez entrer un email valide'
            }

            if (!email.match(regexEmail)) {
                throw "L'email n'est pas valide"
            }
    
            if (password.length < minLengthPassword) {
                throw 'Le mot de passe doit contenir au moins 6 caractères'
            }
    
            // If password has special character
            if (!password.match(regexPWD)) {
                throw 'Le mot de passe doit contenir un caractère spécial'
            }
    
            // If password has number
            if (!password.match(/.[1234567890]/)) {
                throw 'Le mot de passe doit contenir un nombre'
            }

            if (!AcceptTerms) {
                throw "Vous devez accepter les conditions d'utilisation"
            }

            return true
        }

        Check()
        .then(e=> {

            const RandomPhotoUrl = document.querySelector('canvas')?.id
            
            auth
            .createUserWithEmailAndPassword(email, password)
            .then(auth => {

                    // Add this user on database
                    db.collection('shop').doc(ShopID).set({
                        id    : ShopID,
                        name  : NameShop ?? Name,
                        email : email,
                        photos: [RandomPhotoUrl],
                        logo: RandomPhotoUrl,
                        phone : Phone,
                        date  : serverTimestamp()
                    }) 
                    .then(e=> {
                        history('/' + ShopID)
                    })
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
    function GoogleRegister(e) {
        e.preventDefault()

        const RandomPhotoUrl = document.querySelector('canvas')?.id

        const provider = new GoogleAuthProvider()

        async function signup() {

            
            await signInWithPopup(auth, provider)
            .then(async (result) => {

                // If user log for the frist time
                const isFirstLogin = getAdditionalUserInfo(result).isNewUser
                 
                if (isFirstLogin) {

                    db.collection('shop').doc(ShopID).set({
                        id    : ShopID,
                        name  : NameShop ?? auth.currentUser.displayName,
                        email : auth.currentUser.email,
                        photos: [RandomPhotoUrl ?? auth.currentUser.photoURL],
                        logo: RandomPhotoUrl,
                        date  : serverTimestamp()
                    }) 
                }
                else {
                    history('/' + ShopID)
                }
            })
            return ShopID
        }

        signup()
        .then(shop => {
            history('/' + shop)
        }) 
    }



    // Redirect when user logged
    useEffect(() => {
        if (user) history('/' + ShopID)
    }, [user, history])


    // Hash password
    const [passwordShown, setPasswordShown] = useState(false)
    const togglePassword = () => setPasswordShown(!passwordShown)



    return (
        <div className='container'> 
            <div className="form-block m-t-2">

                {
                    userID &&
                <RandomPhotoURL user={userID} />
                }

                <form className='grid'>

                    <div className='grid m-b-1'>
                        <div className='display justify-c'>
                            {
                                NameShop 
                                ? <h2 className='text-align-c'>Créer un compte professionnel avec</h2>
                                : <h2 className='text-align-c'>Créer un compte avec</h2>
                            }
                        </div>
                        <div className='display justify-c gap'>
                            <div className='display'>
                                <button className='border hover h-3' type='button' onClick={GoogleRegister}>
                                    <span className='f-s-16 opacity p-04 c-black'>Google</span>
                                    <img src='/images/google.svg' width={26} />
                                </button>
                            </div>
                            <div className='display'>
                                <button className='border hover h-3' type='button' onClick={GoogleRegister}>
                                    <span className='f-s-16 opacity p-04 c-black'>Facebook</span>
                                    <img src='/images/facebook.svg' width={26} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='display border-b justify-c m-t-2 m-b-2 opacity'>
                        <div className='display justify-c white absolute w-3'>
                            <small className=''>ou</small>
                        </div>
                    </div>


                    <Messages statu={MSG.statu} msg={MSG.msg} loader={MSG.loader} />

                    <div className='grid w-100 m-b-1'>
                        <div className='m-b-04'>
                            <label>Nom</label>
                        </div>
                        <div className='div-input display border border-r-04'>
                            <span className='display m-l-04'>
                                <svg width="22" height="22" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.7778 25V22.7778C23.7778 21.599 23.3095 20.4686 22.476 19.6351C21.6425 18.8016 20.5121 18.3333 19.3333 18.3333H10.4444C9.2657 18.3333 8.13524 18.8016 7.30175 19.6351C6.46825 20.4686 6 21.599 6 22.7778V25M19.3333 9.44444C19.3333 11.899 17.3435 13.8889 14.8889 13.8889C12.4343 13.8889 10.4444 11.899 10.4444 9.44444C10.4444 6.98985 12.4343 5 14.8889 5C17.3435 5 19.3333 6.98985 19.3333 9.44444Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </span>
                            <input 
                                type="email"  
                                placeholder={NameShop ?? ''}
                                className='border-0 m-l-04 w-100'
                                onChange={e => setName(e.target.value)} 
                                required                             
                            />
                        </div>
                    </div>

                    <div className='grid w-100 m-b-1'>
                        <div className='m-b-04'>
                            <label>Email</label>
                        </div>
                        <div className='div-input display border border-r-04'>
                            <span className='display m-l-04'>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </span>
                            <input 
                            type="email" 
                            className='border-0 m-l-04 w-100'
                            onChange={e => setEmail(e.target.value)} 
                            required                             
                        />
                        </div>
                    </div>

                    <div className='grid w-100 m-b-1'>
                        <div className='m-b-04'>
                            <label>Numéro de téléphone</label>
                        </div>
                        <div className='div-input display border border-r-04'>
                            <span className='display m-l-04'>
                                <svg width="22" height="22"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H8.28C8.48979 3.00016 8.69422 3.0663 8.86436 3.18905C9.03449 3.3118 9.1617 3.48496 9.228 3.684L10.726 8.177C10.8019 8.40534 10.7929 8.65339 10.7007 8.87564C10.6085 9.0979 10.4393 9.27945 10.224 9.387L7.967 10.517C9.07332 12.9655 11.0345 14.9267 13.483 16.033L14.613 13.776C14.7205 13.5607 14.9021 13.3915 15.1244 13.2993C15.3466 13.2071 15.5947 13.1981 15.823 13.274L20.316 14.772C20.5152 14.8383 20.6885 14.9657 20.8112 15.136C20.934 15.3064 21.0001 15.511 21 15.721V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H18C9.716 21 3 14.284 3 6V5Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </span>
                            <input 
                                type="tel" 
                                className='border-0 m-l-04 w-100'
                                onChange={e => setPhone(e.target.value)} 
                                required                             
                            />
                        </div>
                    </div>

                    <div className='grid w-100 m-b-1'>
                        <div className='m-b-04'>
                            <label>Mot de passe</label>
                        </div>
                        <div className='div-input display border border-r-04'>
                            <span className='display m-l-04'>
                                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.8586 7.16405C14.3449 7.16405 14.8112 7.3572 15.155 7.70102C15.4988 8.04484 15.692 8.51115 15.692 8.99738M19.3586 8.99738C19.3589 9.85646 19.1579 10.7036 18.7718 11.4711C18.3857 12.2385 17.8251 12.9047 17.1351 13.4165C16.4451 13.9283 15.6449 14.2713 14.7984 14.4181C13.952 14.5649 13.0829 14.5114 12.2609 14.2618L10.192 16.3307H8.35864V18.1641H6.52531V19.9974H3.77531C3.53219 19.9974 3.29904 19.9008 3.12713 19.7289C2.95522 19.557 2.85864 19.3238 2.85864 19.0807V16.7102C2.85869 16.4671 2.95531 16.234 3.12723 16.0621L8.59423 10.5951C8.36547 9.8389 8.30233 9.04225 8.4091 8.25942C8.51587 7.47659 8.79005 6.72595 9.21297 6.05859C9.63589 5.39124 10.1976 4.82283 10.8599 4.39207C11.5223 3.9613 12.2696 3.67829 13.0511 3.56229C13.8327 3.44629 14.63 3.50003 15.3889 3.71984C16.1478 3.93966 16.8504 4.3204 17.4489 4.83614C18.0474 5.35189 18.5278 5.99053 18.8574 6.7086C19.1869 7.42666 19.3579 8.20731 19.3586 8.99738V8.99738Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </span>
                            <input  
                                className='border-0 m-l-04 w-100'
                                type={passwordShown ? "text" : "password"}  
                                onChange={e => setPassword(e.target.value)} 
                                required>
                            </input>
                            <img 
                                className="display click m-r-04" 
                                onClick={togglePassword} 
                                alt="" 
                                src={passwordShown ? '/images/eye.svg' : '/images/eye-closed.svg'}
                            /> 
                        </div>
                    </div>
                    
                    <div className='grid m-t-1'>    

                        <div className='display'>
                            <div className='display'>
                                <input type='checkbox' id='accept_terms' required checked={AcceptTerms} onChange={e=> setAcceptTerms(e.target.checked)}/>   
                                <label className='f-w-300 f-s-14 click' htmlFor='accept_terms'>
                                    <span>J'accepte les </span>
                                    <Link to='terms'>
                                        <span className='link hover-link'>conditions d'utilisation</span>
                                    </Link>
                                </label>
                            </div>
                        </div>
                        <button className="blue f-s-16 border-r-1 hover-blue" onClick={register} type="submit">
                            <span className='f-s-16 p-1'>Démmarer</span>
                        </button>

                        <Link to='/shop-login'>
                            <div className='display justify-c'>
                                <span className='f-s-14 p-1 link c-black'>Vous avez déjà un compte pro ?</span>
                            </div>
                        </Link>
                        
                    </div>

                </form>

            </div>
        </div>
    )
}
 */