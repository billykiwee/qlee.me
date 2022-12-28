import { ClipboardIcon } from "@heroicons/react/24/outline"


export function copyClipboard(link) {
    navigator.clipboard.writeText(link.shortLink)

    let div = document.querySelector('#link-' + link.id)

    
    div.style.display = 'flex'
    
    setTimeout(e=> div.style.display = 'none', 1500)
}

export function CopyClip(linkObj) {

    const { link } = linkObj

    return (
        <div className='display'>
            <button 
                className='display border-r-04 w-2 hover h-2' 
                onClick={e=> copyClipboard(link)} 
            >
                <ClipboardIcon width={18} className='c-black' />
            </button>
            <div className='display disable green absolute border-r-04 p-04' id={'link-' + link.id} >
                <small>Copié</small>
            </div>
        </div>
    )
}
