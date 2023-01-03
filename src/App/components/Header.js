import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getDevice } from '../../Client/lib/getDevice'
import { ProfilImg } from '../../Website/Home'
import { db } from '../database/firebase'
import { useStateValue } from '../provider/StateProvider'
import { ArrowDownCircleIcon, Bars2Icon, BeakerIcon, BuildingOfficeIcon, LockOpenIcon, MoonIcon, PencilIcon, SunIcon, SwatchIcon, UserIcon, UsersIcon } from '@heroicons/react/24/solid'
import { fetchLinks } from '../../Client/lib/database/links/fetchLinks'
import { fetchUser } from '../../Client/lib/database/user/fetchUser'
import { toggleTheme } from '../functions/setTheme'


export default function Header({visible}) {


    const [{user}] = useStateValue()

    const [User, setUser] = useState([])

    useEffect(e=> {
       fetchUser(setUser, user?.email)
    }, [user])


    const [Menu, setMenu] = useState(false)


    const menu = [
        {
            name: user ? 'Mon compte' : 'Se connecter',
            link:  user ? '/profil' : '/login',
            icon: <UserIcon width={16} className='c-black' />
        },
        {
            name: 'Créer un lien',
            link: '/dashboard',
            icon: <PencilIcon width={16} className='c-black' />
        },
        {
            name: 'Link in bio',
            link: '/dashboard',
            icon: <SwatchIcon width={16} className='c-yellow' />
        },
        {
            name: 'Pricing',
            link: '/pricing',
            icon:  <LockOpenIcon width={16} className='c-black' />
        },
        {
            name: 'Terms',
            link: '/terms',
            icon:  <BuildingOfficeIcon width={16} className='c-black' />
        }
    ]


    useEffect(e=> {

        window.onclick = e => {
            if (!e.target.closest('header')) setMenu(false)
        }

    }, [Menu])




    const location = useLocation()    

    function isLinkInBio() {
        if (location.pathname.includes('edit/@')) return false
        return location.pathname.includes('/@')
    }
    

    const [theme, setTheme] = useState(localStorage.getItem('theme'))



    if (!isLinkInBio())
    return (
        <header className='p-1 white shadow '>
            <div className='display justify-s-b'>
                <div className='display gap click'>
                    <Link to='/' >
                        <span className='display'>
                            {
                                getDevice() === 'mobile'
                                ? <img src='/images/logo-icon.png' width={36} />
                                : (
                                    <svg height={48} viewBox="0 0 593 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M262.088 147.6V116.008L265.432 109.32C265.256 114.424 264.229 118.619 262.352 121.904C260.475 125.189 258.04 127.624 255.048 129.208C252.115 130.792 248.888 131.584 245.368 131.584C242.024 131.584 238.944 130.939 236.128 129.648C233.371 128.357 230.965 126.568 228.912 124.28C226.917 121.992 225.363 119.381 224.248 116.448C223.133 113.456 222.576 110.288 222.576 106.944V105.36C222.576 102.016 223.133 98.9067 224.248 96.032C225.363 93.1573 226.947 90.6347 229 88.464C231.053 86.2347 233.488 84.504 236.304 83.272C239.12 82.04 242.259 81.424 245.72 81.424C249.709 81.424 253.2 82.2747 256.192 83.976C259.243 85.6773 261.648 88.1413 263.408 91.368C265.168 94.5947 266.136 98.5253 266.312 103.16H263.848V83.008H270.536V147.6H262.088ZM246.864 123.84C249.739 123.84 252.349 123.195 254.696 121.904C257.043 120.613 258.92 118.765 260.328 116.36C261.736 113.896 262.44 111.021 262.44 107.736V103.688C262.44 100.461 261.707 97.7333 260.24 95.504C258.832 93.216 256.925 91.4853 254.52 90.312C252.173 89.08 249.621 88.464 246.864 88.464C243.696 88.464 240.909 89.1973 238.504 90.664C236.157 92.1307 234.309 94.2133 232.96 96.912C231.669 99.552 231.024 102.632 231.024 106.152C231.024 109.672 231.699 112.781 233.048 115.48C234.397 118.12 236.275 120.173 238.68 121.64C241.085 123.107 243.813 123.84 246.864 123.84ZM287.296 130V65.76H295.744V130H287.296ZM280.784 72.448V65.76H295.744V72.448H280.784ZM331.924 131.584C327.817 131.584 324.268 130.88 321.276 129.472C318.284 128.064 315.849 126.216 313.972 123.928C312.094 121.581 310.686 118.971 309.748 116.096C308.868 113.221 308.428 110.288 308.428 107.296V105.712C308.428 102.661 308.868 99.6987 309.748 96.824C310.686 93.9493 312.094 91.368 313.972 89.08C315.849 86.7333 318.225 84.8853 321.1 83.536C324.033 82.128 327.465 81.424 331.396 81.424C336.5 81.424 340.694 82.5387 343.98 84.768C347.324 86.9387 349.788 89.7547 351.372 93.216C353.014 96.6773 353.836 100.373 353.836 104.304V108.088H312.124V101.752H347.676L345.74 105.184C345.74 101.84 345.212 98.9653 344.156 96.56C343.1 94.096 341.516 92.1893 339.404 90.84C337.292 89.4907 334.622 88.816 331.396 88.816C328.052 88.816 325.265 89.5787 323.036 91.104C320.865 92.6293 319.222 94.712 318.108 97.352C317.052 99.992 316.524 103.043 316.524 106.504C316.524 109.848 317.052 112.869 318.108 115.568C319.222 118.208 320.924 120.32 323.212 121.904C325.5 123.429 328.404 124.192 331.924 124.192C335.62 124.192 338.612 123.371 340.9 121.728C343.246 120.085 344.654 118.179 345.124 116.008H353.044C352.398 119.235 351.108 122.021 349.172 124.368C347.236 126.715 344.801 128.504 341.868 129.736C338.934 130.968 335.62 131.584 331.924 131.584ZM385.806 131.584C381.7 131.584 378.15 130.88 375.158 129.472C372.166 128.064 369.732 126.216 367.854 123.928C365.977 121.581 364.569 118.971 363.63 116.096C362.75 113.221 362.31 110.288 362.31 107.296V105.712C362.31 102.661 362.75 99.6987 363.63 96.824C364.569 93.9493 365.977 91.368 367.854 89.08C369.732 86.7333 372.108 84.8853 374.982 83.536C377.916 82.128 381.348 81.424 385.278 81.424C390.382 81.424 394.577 82.5387 397.862 84.768C401.206 86.9387 403.67 89.7547 405.254 93.216C406.897 96.6773 407.718 100.373 407.718 104.304V108.088H366.006V101.752H401.558L399.622 105.184C399.622 101.84 399.094 98.9653 398.038 96.56C396.982 94.096 395.398 92.1893 393.286 90.84C391.174 89.4907 388.505 88.816 385.278 88.816C381.934 88.816 379.148 89.5787 376.918 91.104C374.748 92.6293 373.105 94.712 371.99 97.352C370.934 99.992 370.406 103.043 370.406 106.504C370.406 109.848 370.934 112.869 371.99 115.568C373.105 118.208 374.806 120.32 377.094 121.904C379.382 123.429 382.286 124.192 385.806 124.192C389.502 124.192 392.494 123.371 394.782 121.728C397.129 120.085 398.537 118.179 399.006 116.008H406.926C406.281 119.235 404.99 122.021 403.054 124.368C401.118 126.715 398.684 128.504 395.75 129.736C392.817 130.968 389.502 131.584 385.806 131.584ZM417.354 130V119.264H427.562V130H417.354ZM442.057 130V83.008H448.745V103.16H447.689C447.689 98.584 448.276 94.712 449.449 91.544C450.681 88.3173 452.5 85.8533 454.905 84.152C457.31 82.4507 460.361 81.6 464.057 81.6H464.409C468.105 81.6 471.156 82.4507 473.561 84.152C476.025 85.8533 477.844 88.3173 479.017 91.544C480.19 94.712 480.777 98.584 480.777 103.16H478.313C478.313 98.584 478.929 94.712 480.161 91.544C481.393 88.3173 483.212 85.8533 485.617 84.152C488.081 82.4507 491.161 81.6 494.857 81.6H495.209C498.905 81.6 501.985 82.4507 504.449 84.152C506.913 85.8533 508.732 88.3173 509.905 91.544C511.137 94.712 511.753 98.584 511.753 103.16V130H503.305V101.312C503.305 97.4987 502.366 94.5653 500.489 92.512C498.612 90.4 496.001 89.344 492.657 89.344C489.196 89.344 486.409 90.4587 484.297 92.688C482.185 94.8587 481.129 97.9093 481.129 101.84V130H472.681V101.312C472.681 97.4987 471.742 94.5653 469.865 92.512C467.988 90.4 465.377 89.344 462.033 89.344C458.572 89.344 455.785 90.4587 453.673 92.688C451.561 94.8587 450.505 97.9093 450.505 101.84V130H442.057ZM547.197 131.584C543.09 131.584 539.541 130.88 536.549 129.472C533.557 128.064 531.122 126.216 529.245 123.928C527.368 121.581 525.96 118.971 525.021 116.096C524.141 113.221 523.701 110.288 523.701 107.296V105.712C523.701 102.661 524.141 99.6987 525.021 96.824C525.96 93.9493 527.368 91.368 529.245 89.08C531.122 86.7333 533.498 84.8853 536.373 83.536C539.306 82.128 542.738 81.424 546.669 81.424C551.773 81.424 555.968 82.5387 559.253 84.768C562.597 86.9387 565.061 89.7547 566.645 93.216C568.288 96.6773 569.109 100.373 569.109 104.304V108.088H527.397V101.752H562.949L561.013 105.184C561.013 101.84 560.485 98.9653 559.429 96.56C558.373 94.096 556.789 92.1893 554.677 90.84C552.565 89.4907 549.896 88.816 546.669 88.816C543.325 88.816 540.538 89.5787 538.309 91.104C536.138 92.6293 534.496 94.712 533.381 97.352C532.325 99.992 531.797 103.043 531.797 106.504C531.797 109.848 532.325 112.869 533.381 115.568C534.496 118.208 536.197 120.32 538.485 121.904C540.773 123.429 543.677 124.192 547.197 124.192C550.893 124.192 553.885 123.371 556.173 121.728C558.52 120.085 559.928 118.179 560.397 116.008H568.317C567.672 119.235 566.381 122.021 564.445 124.368C562.509 126.715 560.074 128.504 557.141 129.736C554.208 130.968 550.893 131.584 547.197 131.584Z" fill="var(--black)"/>
                                        <g filter="url(#filter0_i_651_85)">
                                        <rect x="37" y="70" width="144" height="100" rx="40" fill="#FBBD05"/>
                                        </g>
                                        <g filter="url(#filter1_i_651_85)">
                                        <rect x="37" y="30" width="144" height="100" rx="40" fill="#0B71F1"/>
                                        </g>
                                        <defs>
                                        <filter id="filter0_i_651_85" x="37" y="70" width="144" height="100" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dy="-16"/>
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_651_85"/>
                                        </filter>
                                        <filter id="filter1_i_651_85" x="37" y="30" width="144" height="100" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dy="-16"/>
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_651_85"/>
                                        </filter>
                                        </defs>
                                    </svg>
                                )
                            }
                            </span>
                    </Link>
                </div>
                <div className='display gap'>
                    <button className='hamburger border-r-100 hover' onClick={e=> { toggleTheme(localStorage.getItem('theme')) ; setTheme(localStorage.getItem('theme'))}}>
                        <span className='display'>
                            {theme === 'light' ? <MoonIcon width={18} className='c-black' /> : <SunIcon width={20} className='c-yellow' />}
                        </span>
                    </button>
                    <div className='display gap-04 border p-04 h-2 border-r-2'>
                        {
                            user 
                            ?
                            <Link to='/dashboard' className='display avatar-header' >
                                <img src={User?.photoURL ?? '/images/user-solid.svg'} className='border-r-100' width={32} height={32} />
                            </Link>
                            : 
                            <div className='display justify-c'>
                                <Link to='/login'>
                                    <button className='hover-blue border-r-2 p-1 gap-04 blue' style={{height: '32px'}}>
                                        <span className='display'>
                                            <img src='/images/user-solid.svg' width={14} style={{filter:' invert(100%)'}} />
                                        </span>
                                        <span className='display'>Se connecter</span>
                                    </button>
                                </Link>
                            </div>
                        }
                        <button className='hamburger border-r-100 hover ' onClick={e=> setMenu(Menu === false ? true : false)} >
                            <span className='display'>
                                <Bars2Icon width={20} className='c-black' />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            {
                Menu &&
                <div className='display justify-c menu m-t-1'>
                    <div className='grid w-100p'>
                        {
                            menu.map((menu, i)=> {
                                return (
                                    <Link to={menu.link} className={'w-100p'} key={menu.name} onClick={e=> setMenu(false) }>
                                        <button className='h-3 hover border-r-1 display gap p-1'>
                                            {menu.icon}
                                            <span className='f-s-16 c-black'>{menu.name}</span>
                                        </button>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </header>
    )
}
