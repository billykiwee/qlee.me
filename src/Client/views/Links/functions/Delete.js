
import { db, storage } from "../../../../App/database/firebase"
import { getStorage, ref, deleteObject } from "firebase/storage";



export async function DeleteLink(props) {

    const { link, snackBar, setPopUpMessage, Stats, type, history } = props

    setPopUpMessage({
        title      : 'Attention',
        message    : `Tu es sur le point de supprimer ${link.name}`,
        question   : 'Voulez-vous continuer ?',
        buttonText : 'Supprimer',
        buttonColor: 'red',
        valid      : () => deleteLinksSelected(link),
        close      : () => setPopUpMessage([]),
        statu      : 'question'
    })

    

    const deleteLinksSelected = async link => {

        try {
            await db.collection('links').doc(link.id).delete()
            await Stats?.filter(e => e.LinkID === link.id)
            .map(e => {
                
                db.collection('stats')
                .doc(e.statID)
                .delete()
            })
            await faviconExist(link.id)

            snackBar([])

            history(type !== 'stats' && '/dashboard')
        } 
        catch (error) {
            console.error(error);
        }
    }
}


const faviconExist = async id => {

    const storage = getStorage()
    const path = `links/favicon/${id}`

    const favicon = ref(storage, path)
    
    deleteObject(favicon).then(e=> {
        return true
    })
}