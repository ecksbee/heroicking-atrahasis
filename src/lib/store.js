import { createStore } from 'solid-js/store'
import fetchCatalog from './fetchCatalog'
import fetchConceptCard from './fetchConceptCard'
import fetchRenderabale from './fetchRenderabale'
import fetchConceptSearchResults from './fetchConceptSearchResult'
import fetchTaxonomyList from './fetchTaxonomyList'
 
const initialState = {
    catalog: null,
    renderable: null,
    conceptCard: null,
    taxonomyCode: null,
    taxonomyCodes: [],
    searchResults: null,
    loading: true,
    error: false,
    visibleArcDiagram: false,
    lang: 'Truncated',
    labelRole: 'Default',
}

const [state, setState] = createStore(initialState)
const setLang = (newVal) => {
    setState('lang', () => newVal)
}
const setLabelRole = (newVal) => {
    setState('labelRole', () => newVal)
}
const setCatalog = (newCatalog) => {
    setState('catalog', () => newCatalog)
}
const setLoading = (newVal) => {
    setState('loading', () => newVal)
}
const setError = (newVal) => {
    setState('error', () => newVal)
}
const setRenderable = (newRenderable) => {
    setState('renderable', () => newRenderable)
}
const setConceptCard = (newConceptCard) => {
    setState('conceptCard', () => newConceptCard)
}
const setTaxonomyCodes = (newTaxonomyCodes) => {
    setState('taxonomyCodes', () => newTaxonomyCodes)
}
const setTaxonomyCode = (newTaxonomyCode) => {
    setState('taxonomyCode', () => newTaxonomyCode)
}
const setSearchResults = (newSearchResults) => {
    setState('searchResults', () => newSearchResults)
}
const setVisibleArcDiagram = (newVal) => {
    setState('visibleArcDiagram', () => !!newVal)
}
const loadData = async () => {
    setLoading(true)
    setError(false)
    setRenderable(null)
    setConceptCard(null)
    setTaxonomyCodes([])
    let fetched
    try {
        fetched = await fetchTaxonomyList()
        if (!fetched?.length) {
            return
        }
        setTaxonomyCodes(fetched)
        const code = fetched[0]
        setTaxonomyCode(code)
        setLoading(false)
        setError(false)
    } catch (e) {
        console.error(e)
        setLoading(false)
        setError(true)
        setCatalog(null)
        setRenderable(null)
        return
    }
}
const loadCatalog = async () => {
    let fetched
    try {
        setLoading(true)
        fetched = await fetchCatalog(state.taxonomyCode)
        if (!!fetched) { 
            setLoading(false)
            setError(false)
            setCatalog(fetched)
        }
    } catch (e) {
      console.error(e)
      setError(true)
      setCatalog(null)
    }
    setLoading(false)
}
const loadRenderable = async () => {
    let fetched
    try {
        setLoading(true)
        fetched = await fetchRenderabale(state.taxonomyCode)
        if (!!fetched) { 
            setLoading(false)
            setError(false)
            setRenderable(fetched)
        }
    } catch (e) {
      console.error(e)
      setError(true)
      setRenderable(null)
    }
    setLoading(false)
}
const loadConceptCard = async () => {
    let fetched
    try {
        setLoading(true)
        fetched = await fetchConceptCard(state.taxonomyCode)
        if (!!fetched) { 
            setLoading(false)
            setError(false)
            setConceptCard(fetched)
        }
    } catch (e) {
      console.error(e)
      setError(true)
      setConceptCard(null)
    }
    setLoading(false)
}
const searchConcepts = async (searchParams) => {
    setLoading(true)
    setError(false)
    setSearchResults(null)
    let fetched
    try {
        fetched = await fetchConceptSearchResults(state.taxonomyCode, searchParams)
        if (!!fetched) { 
            setLoading(false)
            setError(false)
            setSearchResults(fetched)
        }
    } catch (e) {
      console.error(e)
      setError(true)
      setSearchResults(null)
    }
    setLoading(false)
}

export default {
    loadData,
    loadCatalog,
    getCatalog: () => state.catalog,
    setCatalog,
    getLoading: () => state.loading,
    setLoading,
    getError: () => state.error,
    setError,
    loadRenderable,
    getRenderable: () => state.renderable,
    setRenderable,
    loadConceptCard,
    getConceptCard: () => state.conceptCard,
    setConceptCard,
    getTaxonomyCodes: () => state.taxonomyCodes,
    setTaxonomyCodes,
    getTaxonomyCode: () => state.taxonomyCode,
    setTaxonomyCode,
    setConceptCard,
    getSearchResults: () => state.searchResults,
    setSearchResults,
    searchConcepts,
    getVisibleArcDiagram: () => state.visibleArcDiagram,
    setVisibleArcDiagram,
    getLang: () => state.lang,
    setLang,
    getLabelRole: () => state.labelRole,
    setLabelRole,
    getFootnotes: () => state.footnotes,
}