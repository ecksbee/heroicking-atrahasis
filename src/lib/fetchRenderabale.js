import id from './id'

export default async (code) => {
    if (!code) {
        return null
    }
    const uuid = id()
    if (!uuid) {
        return null
    }
    const response = await fetch('taxonomies/' + code + '/networks/' + uuid)
    if (response.status >= 400) {
        throw new Error('Bad response from server')
    }
    return response.json()
}