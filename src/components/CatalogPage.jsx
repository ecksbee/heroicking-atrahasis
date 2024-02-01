import { For, createSignal } from 'solid-js'

import store from '../lib/store'
import logo from '../logo.svg'
import styles from './CatalogPage.module.css'
import commonStyles from './Common.module.css'

const title = 'Taxonomy Library'
const CatalogPage = () => {
    const catalog = store.getCatalog()
    const subjects = catalog.Subjects
    const rsets = catalog.RelationshipSets
    const initSubject = subjects[0].Entity.Scheme + '/' + subjects[0].Entity.CharData
    const initRoleURI = rsets[0].RoleURI
    const [subject, setSubject] = createSignal(initSubject)
    const [relationshipSet, setRelationshipSet] = createSignal(initRoleURI)
    setSubject(initSubject)
    return (<>
        <img style={{height: 'auto', width: '25vw', position: 'fixed', bottom: '1%', right: '1%'}} src={logo} />
    <div id={styles['selector-container']}>
        <div id={styles['selector-panel']}>
            <h1 id={styles.title}>{title}</h1>
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
                            await store.loadRenderable(hash)
                        } catch (e) {
                            console.error(e)
                        }
                    }
                }>Browse</fluent-button>
            </div>
            </div>
        </div>
    </>
    )
}

export default CatalogPage
