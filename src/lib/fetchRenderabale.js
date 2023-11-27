
export default async (uuid) => {
    const response = await fetch('packages/' + uuid)
    if (response.status >= 400) {
        throw new Error('Bad response from server')
    }
    return response.json()
}