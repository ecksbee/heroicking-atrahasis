
export default async () => {
    const response = await fetch('/taxonomies')
    if (response.status >= 400) {
        throw new Error('Bad response from server')
    }
    return response.json()
}