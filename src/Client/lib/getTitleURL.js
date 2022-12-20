import { isValidUrl } from "../../App/utils/isValidUrl";

export function getTitleURL(url) {

    const isUrl = isValidUrl(url)

    return isUrl.hostname.split('.')[0]
}