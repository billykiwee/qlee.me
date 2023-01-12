import { PencilSquareIcon } from "@heroicons/react/24/solid"
import getFavicon from "../../../../App/utils/getFavicon"
import { uploadPhoto } from "../../Profil/functions/uploadPhoto"

export function Head({props}) {

    const { userView, User, LinkInBioLinks, link_in_bio } = props

    return (
        <div className='grid gap-1rem p-1'>
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
                        <span className='f-s-25 f-w-400' style={{filter : 'invert(1)', color: 'black'}}>
                            <span className='f-s-18'>@</span>
                            {User?.name}
                        </span>
                    </div>
                    <div className='display justify-c'>
                        <span className='f-s-16 c-grey f-w-300 text-align-c'>{link_in_bio.description}</span>
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