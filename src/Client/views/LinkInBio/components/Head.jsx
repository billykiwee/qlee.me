import { PencilSquareIcon } from "@heroicons/react/24/solid"
import getFavicon from "../../../../App/utils/getFavicon"
import { uploadPhoto } from "../../Profil/functions/uploadPhoto"

export function Head({props}) {

    const { userView, User, LinkInBioLinks, Settings } = props


    return (
        <div className='grid gap-1rem p-1' >

            <div  
                style={
                    Settings?.header?.frame?.active ? 
                    {
                        background  : Settings?.header?.frame?.background,
                        borderRadius: Settings?.header?.frame?.radius + 'px',
                        opacity  : Settings?.header?.frame?.opacity,
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                    }
                    : null
                }
            />

            {
                userView 
                ? 
                (
                    <div className='display justify-c'>
                        <div className='edit-image-link'>
                            <img src={User?.photoURL} width={80} height={80} className='border-r-100' />
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
                    </div>
                )
                : 
                (
                    <div className='display justify-c'>
                        <img src={User?.photoURL} width={80} height={80} className='border-r-100' />
                    </div>
                )
            }
            <div className='grid gap-1rem'>
                <div className='grid gap'>
                    <div className='display justify-c'>
                        <span className='f-s-25 f-w-400' 
                            style={{
                                color   : Settings?.header?.title?.color,
                                fontSize: Settings.header?.title?.fontSize + 'px'
                            }}
                        >
                            <span>@</span>
                            {User?.name}
                        </span>
                    </div>
                    <div className='display justify-c'>
                        <span className='f-s-16 c-grey f-w-300 text-align-c' 
                            style={{
                                color   : Settings?.header?.description?.color,
                                fontSize: Settings.header?.description?.fontSize + 'px'
                            }}
                        >{Settings?.header?.description?.text}</span>
                    </div>
                </div>
                <div className='display gap-1rem justify-c'>
                    {
                        LinkInBioLinks
                        .filter(e=> e.asIcon)
                        .map((link, i)=> {

                            return (
                                <a href={'https://'+ link.shortLink} className='link' key={i} >
                                    <img src={link.icon ?? getFavicon(link.url)} width={34} className='border-r-100' />
                                </a>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}