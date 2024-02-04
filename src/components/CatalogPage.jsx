import { For, createSignal } from 'solid-js'

import store from '../lib/store'
import SearchPage from './SearchPage'
import logo from '../logo.svg'
import styles from './CatalogPage.module.css'
import commonStyles from './Common.module.css'

const ConcentNetworkCatalog = () => {
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


const mainPanelTitle = 'Taxonomy Library'
const CatalogPage = () => {
    const [currentTab, setCurrentTab] = createSignal('networks')
    return (<>
        <div id={styles['selector-container']}>
        <div id={styles['selector-panel']}>
            <h1 id={styles.title}>{mainPanelTitle}</h1>
            <img style={{height: 'auto', width: '25vw', position: 'fixed', bottom: '1%', right: '1%'}} src={logo} />
            <fluent-tabs activeid={currentTab()}>
                <fluent-tab id='networks' onClick={e => setCurrentTab('networks')}>
                    Concept Networks</fluent-tab>
                <fluent-tab id='concepts' onClick={e => setCurrentTab('concepts')}>
                    Concept Search</fluent-tab>

                <fluent-tab-panel id='networks'>
                    { currentTab() === 'networks' && <ConcentNetworkCatalog /> }
                </fluent-tab-panel>
                <fluent-tab-panel id='concepts'>
                    { currentTab() === 'concepts' && <SearchPage /> }
                </fluent-tab-panel>
            </fluent-tabs>
        </div>
        </div>
    </>
    )
}

export default CatalogPage
