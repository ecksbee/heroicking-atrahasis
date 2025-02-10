
export default async (code) => {
    if (!code) {
        return null
    }
    const response = await fetch('taxonomies/' + code)
    if (response.status >= 400) {
        throw new Error('Bad response from server')
    }
    return response.json()
}