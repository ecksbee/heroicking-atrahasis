import store from '../lib/store'
import styles from './SearchResults.module.css'

const SearchResults = () =><div id={styles['search-results']}>
    <h1>Search results for "{store.getSearchResults().request.query.match}"
                <a href='#' onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    store.setSearchResults(null)
                }}>[X]</a></h1>
    <ol>
    {store.getSearchResults() && 
        <For each={store.getSearchResults()?.hits??[]}>
            {(item) => {
                return (
                    <li>
                    <ul>
                        <li><h3 onClick={async e => {
                            try {
                                if ('URLSearchParams' in window) {
                                    var searchParams = new URLSearchParams(window.location.search)
                                    searchParams.set('href', encodeURI(item.id))
                                    var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString()
                                    history.pushState(null, '', newRelativePathQuery)
                                }
                                store.setSearchResults(null)
                                await store.loadConceptCard(item.id)
                            } catch (e) {
                                console.error(e)
                            }
                        }}>{item.id}</h3></li>
                        <li>{item.fields.Name}</li>
                        <li>{item.fields.Namespace}</li>
                        <li>Type: {item.fields.ItemType}</li>
                        <li>Balance: {item.fields.BalanceType}</li>
                        <li>Substitution Group: {item.fields.SubstitutionGroup}</li>
                        <li>Period: {item.fields.PeriodType}</li>
                    </ul>
                    </li>
                )
            }}
        </For>}
        </ol></div>

export default SearchResults