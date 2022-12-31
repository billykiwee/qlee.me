import { ClipboardIcon } from "@heroicons/react/24/outline"


export function copyClipboard(link) {
    navigator.clipboard.writeText(link.shortLink)

    let div = document.querySelector('#copy-' + link.id)

    div.style.display = 'flex'
    
    setTimeout(e=> div.style.display = 'none', 2000)
}

export function CopyClip(linkObj) {

    const { link } = linkObj

    return (
        <div className='display'>
            <div className='display justify-c border-r-04 w-2 hover h-2 click' onClick={e=> copyClipboard(link)} >
                <ClipboardIcon width={18} className='c-black' />
            </div>
            <div className='display disable green absolute border-r-04 p-04' id={'copy-' + link.id} >
                <small>Copié</small>
            </div>
        </div>
    )
}
