import { db } from "../../../../App/database/firebase"


export function DeleteLink(props) {

    props.setMsg({
        title: 'Attention',
        message: `Tu es sur le point de supprimer ${props.link.name}`,
        question: 'Voulez-vous continuer ?',
        buttonText: 'Supprimer',
        buttonColor: 'red',
        valid: () => deleteLinksSelected(props.link),
        close: () => props.setMsg([]),
        statu: 'question'
    })


    const deleteLinksSelected = (link) => {

        db.collection('links').doc(link.id).delete()
        .then(e=> {
            props.setMsg([])
        })
        .then(e=> {
            const getNewIdDiv = (document.querySelector('#div-links').childNodes[0].id).split('-')[1]
            props.setShowStat(getNewIdDiv)
        })
    }
}
