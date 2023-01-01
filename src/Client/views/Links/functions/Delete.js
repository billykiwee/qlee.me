
import { db } from "../../../../App/database/firebase"
import { deleteObject, ref, storage } from 'firebase/storage'

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

        try {
            await db.collection('links').doc(link.id).delete()
            await Stats?.filter(e => e.LinkID === link.id)
            .map(e => {

                db.collection('stats')
                .doc(e.statID)
                .delete()
                .then(e=> {
                    const fileRef = storage.ref('links/favicon/' + link.id);

                    fileRef.delete().then(function() {
                    console.log('File deleted successfully');
                    }).catch(function(error) {
                    console.error('Error deleting file:', error);
                    });
                })
            })

            setMsg([])

          history(type !== 'stats' && '/dashboard')
        } 
        catch (error) {
            console.error(error);
        }
    }
}
