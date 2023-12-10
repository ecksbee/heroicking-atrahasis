import href from './href'

export default async () => {
    const hrefUnencoded = href()
    if (!hrefUnencoded) {
        return null
    }
    const hrefEncoded = encodeURIComponent(hrefUnencoded)
    const response = await fetch('concepts?href=' + hrefEncoded)
    if (response.status >= 400) {
        throw new Error('Bad response from server')
    }
    return response.json()
}