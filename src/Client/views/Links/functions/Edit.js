import { editNameOrURL } from "./Edit/nameOrURL"
import { editShortLink } from "./Edit/shortLink"


export function EditLink(props) {    

    const { editLink, popUp } = props

    if (Object.keys(editLink) === 'shortLink') {
        
        popUp.show({
            valid     : () => editShortLink(props),
            title     : 'Le lien court va être modifier',
            message   : 'Tu es sur le point de modifier le lien court',
            buttonText: 'Continuer',
        })
    }
    
    editNameOrURL(props)
}


