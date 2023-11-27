
export default async () => {
    const response = await fetch('packages/')
    if (response.status >= 400) {
        throw new Error('Bad response from server')
    }
    return response.json()
}