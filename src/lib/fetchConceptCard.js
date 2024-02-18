import href from './href'

export default async (code) => {
    if (!code) {
        return null
    }
    const hrefUnencoded = href()
    if (!hrefUnencoded) {
        return null
    }
    const hrefEncoded = encodeURIComponent(hrefUnencoded)
    const response = await fetch('/taxonomies/' + code + '/concepts?href=' + hrefEncoded)
    if (response.status >= 400) {
        throw new Error('Bad response from server')
    }
    return response.json()
}