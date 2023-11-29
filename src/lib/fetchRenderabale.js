import id from './id'

export default async () => {
    const uuid = id()
    if (!uuid) {
        return null
    }
    const response = await fetch('packages/' + uuid)
    if (response.status >= 400) {
        throw new Error('Bad response from server')
    }
    return response.json()
}