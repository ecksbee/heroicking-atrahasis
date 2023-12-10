import { createStore } from 'solid-js/store'
import fetchConceptCard from './fetchConceptCard'
import fetchRenderabale from './fetchRenderabale'
 
const initialState = {
    renderable: null,
    conceptCard: null,
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
const setVisibleArcDiagram = (newVal) => {
    setState('visibleArcDiagram', () => !!newVal)
}
const loadData = async () => {
    setLoading(true)
    setError(false)
    setRenderable(null)
    setConceptCard(null)
    loadConceptCard()
    loadRenderable()
}
const loadRenderable = async () => {
    let fetched
    try {
        fetched = await fetchRenderabale()
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
const loadConceptCard = async (href) => {
    let fetched
    try {
        fetched = await fetchConceptCard()
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

export default {
    loadData,
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
    getVisibleArcDiagram: () => state.visibleArcDiagram,
    setVisibleArcDiagram,
    getLang: () => state.lang,
    setLang,
    getLabelRole: () => state.labelRole,
    setLabelRole,
    getFootnotes: () => state.footnotes,
}