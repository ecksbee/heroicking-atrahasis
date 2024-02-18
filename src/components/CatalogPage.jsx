import { For, createSignal } from 'solid-js'

import store from '../lib/store'
import SearchPage from './SearchPage'
import logo from '../logo.svg'
import styles from './CatalogPage.module.css'
import commonStyles from './Common.module.css'

const TaxonomySelection = ({hideRegistry}) => {
    const codes = store.getTaxonomyCodes()
    return <>
            <h2>Taxonomies</h2>
            <fluent-combobox class={commonStyles['combo-boxes']} current-value={store.getTaxonomyCode()} >
                <For each={codes}>
                    {(code) => {
                        return (<fluent-option value={code} onClick={async e => {
                            store.setTaxonomyCode(code)
                            try {
                                await store.loadCatalog()
                                hideRegistry()
                            } catch (e) {
                                console.error(e)
                            }
                        }}>{code?.toUpperCase()}</fluent-option>)
                    }}
                </For>
            </fluent-combobox>
            <div id={styles['browse-btn-wrapper']}>
                <fluent-button id='fetch-button' appearance='accent' onClick={
                    async e => {
                        try {
                            await store.loadCatalog()
                        } catch (e) {
                            console.error(e)
                        }
                    }
                }>Browse</fluent-button>
            </div></>
}


const ConceptNetworkCatalog = () => {
    const catalog = store.getCatalog()
    const subjects = catalog.Subjects
    const rsets = catalog.RelationshipSets
    const initSubject = subjects[0].Entity.Scheme + '/' + subjects[0].Entity.CharData
    const initRoleURI = rsets[0].RoleURI
    const [subject, setSubject] = createSignal(initSubject)
    const [relationshipSet, setRelationshipSet] = createSignal(initRoleURI)
    setSubject(initSubject)
    return <>
            <h2>Relationship Set</h2>
            <fluent-combobox id={styles.relationshipSetSelectize} class={commonStyles['combo-boxes']} current-value={initRoleURI} >
                <For each={rsets}>
                    {(rset) => {
                        const roleURI = rset.RoleURI
                        return (<fluent-option value={roleURI} onClick={e => {
                            setRelationshipSet(roleURI)
                        }}>{roleURI}</fluent-option>)
                    }}
                </For>
            </fluent-combobox>
            <div id={styles['browse-btn-wrapper']}>
                <fluent-button id='fetch-button' appearance='accent' onClick={
                    async e => {
                        const currSubject = subject()
                        const currRSet = relationshipSet()
                        if (!currSubject || !currRSet) {
                            return
                        }
                        const hash = catalog.Networks[currSubject][currRSet]
                        try {
                            if ('URLSearchParams' in window) {
                                var searchParams = new URLSearchParams(window.location.search)
                                searchParams.set('id', hash)
                                var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString()
                                history.pushState(null, '', newRelativePathQuery)
                            }
                            await store.loadRenderable(hash)
                        } catch (e) {
                            console.error(e)
                        }
                    }
                }>Browse</fluent-button>
            </div></>
}


const CatalogPage = ({gre}) => {
    const [registryVisible, setRegistryVisible] = createSignal(true)
    const [currentTab, setCurrentTab] = createSignal('networks')
    return (<>
        <div id={styles['selector-container']}>
            <div id={styles['selector-panel']}>
            {
                (!store.getCatalog() && registryVisible()) && <>
                    <h1 id={styles.title}>Taxonomy Library: </h1>
                    <img style={{height: 'auto', width: '25vw', position: 'fixed', bottom: '1%', right: '1%'}} src={logo} />
                    <TaxonomySelection hideRegistry={() => setRegistryVisible(false)}/>
                </>
            }
            {
                (store.getCatalog() || !registryVisible()) && <>
                    <h1 id={styles.title}>{'Taxonomy Library: ' + (store.getTaxonomyCode()?.toUpperCase() || '')}
                        &nbsp;&nbsp;
                        <a href='#' onClick={e => {
                            e.preventDefault()
                            e.stopPropagation()
                            setRegistryVisible(true)
                            store.setCatalog(null)
                        }}>[X]</a></h1>
                    <img style={{height: 'auto', width: '25vw', position: 'fixed', bottom: '1%', right: '1%'}} src={logo} />
                    <fluent-tabs activeid={currentTab()}>
                        <fluent-tab id='networks' onClick={e => setCurrentTab('networks')}>
                            Concept Networks</fluent-tab>
                        <fluent-tab id='concepts' onClick={e => setCurrentTab('concepts')}>
                            Concept Search</fluent-tab>
                        <fluent-tab-panel id='networks'>
                            { currentTab() === 'networks' && <ConceptNetworkCatalog /> }
                        </fluent-tab-panel>
                        <fluent-tab-panel id='concepts'>
                            { currentTab() === 'concepts' && <SearchPage /> }
                        </fluent-tab-panel>
                    </fluent-tabs>
                </>
            }
            </div>
        </div>
    </>
    )
}

export default CatalogPage
