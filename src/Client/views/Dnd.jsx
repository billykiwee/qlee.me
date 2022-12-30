
import { useEffect } from 'react';
import DraggableList from 'react-draggable-list';
import Main from '../../App/components/Main';
import { dragElement } from '../lib/draggable/dragabble';


export function MyListComponent() {


    const items = [
        { id: 1, text: 'Item 1' },
        { id: 2, text: 'Item 2' },
        { id: 3, text: 'Item 3' },
    ];


    useEffect(e=> {
        dragElement('draggable')
    })

    return (
        <Main>
            <div className='container grid gap'>
                {
                    items.map((e, i)=> {
                        return (
                            <div class="p-1 border border-r-04 white draggable" draggable >{i}</div>
                        )
                    })
                }
            </div>
        </Main>
    )
}

