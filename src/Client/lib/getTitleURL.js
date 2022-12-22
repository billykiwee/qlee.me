import { isValidUrl } from "../../App/utils/isValidUrl"

export function getTitleURL(url) {

    const isUrl = isValidUrl(url)

    return isUrl !== null ? isUrl.hostname.split('.')[1] : null
}