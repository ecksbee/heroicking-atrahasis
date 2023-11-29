export default () => {
    const urlParams = new URLSearchParams(window.location.search)
    const hrefFromQuery = urlParams.get('href')
    return hrefFromQuery
}
