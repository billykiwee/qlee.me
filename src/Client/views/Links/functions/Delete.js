import { db } from "../../../../App/database/firebase"


export async function DeleteLink(props) {

    const { link, setMsg, setShowStat } = props


    setMsg({
        title: 'Attention',
        message: `Tu es sur le point de supprimer ${link.name}`,
        question: 'Voulez-vous continuer ?',
        buttonText: 'Supprimer',
        buttonColor: 'red',
        valid: () => deleteLinksSelected(link),
        close: () => setMsg([]),
        statu: 'question'
    })


    const deleteLinksSelected = async (link) => {

        db.collection('links').doc(link.id).delete()
        .then(e=> {
            setMsg([])
        })
        .then(e=> {
            if (setShowStat) {
                const getNewIdDiv = (document.querySelector('#div-links').childNodes[0].id).split('-')[1]
                setShowStat(getNewIdDiv)
            }
            else {
                window.location.href = '/dashboard'
            }
        })
    }
}
