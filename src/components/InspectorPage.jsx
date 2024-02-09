import { For, createSignal } from 'solid-js'

import store from '../lib/store'
import styles from './InspectorPage.module.css'

const RelationshipSetList = ({renderableMap}) => <div><ol>
    <For each={Object.keys(renderableMap)}>
        {(hash) => {
            return (<li><a href='#' onClick={async e => {
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
            }}>{renderableMap[hash]}</a></li>)
        }}
    </For>
    </ol></div>

const InspectorPage = () => {
    const [currentTab, setCurrentTab] = createSignal('presentation')
    const conceptCard = store.getConceptCard()
    return (<div id={styles['main-panel']} style={{
        display: 'block'
    }}>
            <div id={styles['main-panel-title']}>
                <h1 class={styles.truncate + ' ' + styles['main-panel-title-h1']}>{conceptCard.ID}
                <a href='#' onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    store.setConceptCard(null)
                }}>[X]</a></h1>
            </div>
            <div id={styles['main-panel-body']}>
                <p>Source: {conceptCard.Source}</p>
                <p>ID: {conceptCard.ID}</p>
                <p>Namespace: {conceptCard.Namespace}</p>
                <p>Name: {conceptCard.Name}</p>
                <p>Substitution Group: {conceptCard.SubstitutionGroup}</p>
                <p>Type: {conceptCard.ItemType}</p>
                <p>Period Type: {conceptCard.PeriodType}</p>
                <p>Balance Type: {conceptCard.BalanceType}</p>
            </div>
            <div>
                <fluent-tabs activeid={currentTab()}>
                    <fluent-tab id='presentation' onClick={e => setCurrentTab('presentation')}>
                        Presentation</fluent-tab>
                    <fluent-tab id='definition' onClick={e => setCurrentTab('definition')}>
                        Definition</fluent-tab>
                    <fluent-tab id='calculation' onClick={e => setCurrentTab('calculation')}>
                        Calculation</fluent-tab>

                    <fluent-tab-panel id='presentationPanel'>
                        { currentTab() === 'presentation' && <RelationshipSetList renderableMap={conceptCard.PGridMap} /> }
                    </fluent-tab-panel>
                    <fluent-tab-panel id='definitionPanel'>
                        { currentTab() === 'definition' && <RelationshipSetList renderableMap={conceptCard.DGridMap} /> }
                    </fluent-tab-panel>
                    <fluent-tab-panel id='calculationPanel'>
                        { currentTab() === 'calculation' && <RelationshipSetList renderableMap={conceptCard.CGridMap} /> } 
                    </fluent-tab-panel>
                </fluent-tabs>
            </div>
    </div>)
}

export default InspectorPage
