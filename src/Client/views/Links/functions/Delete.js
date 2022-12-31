import { db } from "../../../../App/database/firebase"


export async function DeleteLink(props) {

    const { link, setMsg, Stats } = props


    setMsg({
        title      : 'Attention',
        message    : `Tu es sur le point de supprimer ${link.name}`,
        question   : 'Voulez-vous continuer ?',
        buttonText : 'Supprimer',
        buttonColor: 'red',
        valid      : () => deleteLinksSelected(link).then(e=> window.location.href = '/dashboard' ),
        close      : () => setMsg([]),
        statu      : 'question'
    })


    const deleteLinksSelected = async (link) => {

        await db.collection('links').doc(link.id).delete()

        await Stats.filter(e=> e.LinkID === link.id).map(e=> {
            db.collection('stats').doc(e.statID).delete()
        })
    }
}
