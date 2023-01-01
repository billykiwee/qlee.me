
import { db, storage } from "../../../../App/database/firebase"
import { getStorage, ref, deleteObject } from "firebase/storage";



export async function DeleteLink(props) {

    const { link, setMsg, Stats, type, history } = props

    setMsg({
        title      : 'Attention',
        message    : `Tu es sur le point de supprimer ${link.name}`,
        question   : 'Voulez-vous continuer ?',
        buttonText : 'Supprimer',
        buttonColor: 'red',
        valid      : () => deleteLinksSelected(link),
        close      : () => setMsg([]),
        statu      : 'question'
    })

    

    const deleteLinksSelected = async link => {

        console.log(faviconExist(link));

        /* try {
            await db.collection('links').doc(link.id).delete()
            await Stats?.filter(e => e.LinkID === link.id)
            .map(e => {

                db.collection('stats')
                .doc(e.statID)
                .delete()
                .then(e=> {

                })
            })

            setMsg([])

          history(type !== 'stats' && '/dashboard')
        } 
        catch (error) {
            console.error(error);
        }
    } */
    }
}


const faviconExist = link => {


    const storage = getStorage()
    const path = `links/favicon/${link.id}`

    const favicon = ref(storage, path)


   return deleteObject(favicon)

}