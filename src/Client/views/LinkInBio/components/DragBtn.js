import { ArrowsPointingOutIcon } from "@heroicons/react/24/solid"

export default function DragBtn({props}) {

    const { link, isDragDisabled, setIsDragDisabled } = props

     return (
        <div className='w-2 h-2 display justify-c btn-drag' 
            onMouseEnter={e=> {
                setIsDragDisabled(false)

                if (isDragDisabled) {
                    e.target.children[0].classList.add('c-blue')
                }
            }} 
            onMouseLeave={e=> {
                setIsDragDisabled(true)
                if (!isDragDisabled) {
                    e.target.children[0].classList.remove('c-blue')
                }
            }} 
        >
            <ArrowsPointingOutIcon width={20} className={' absolute no-click'} id={'drag-' + link.id} /> 
        </div>
    )
}
