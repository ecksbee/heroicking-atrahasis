import { For, createSignal } from 'solid-js'

import store from '../lib/store'
import styles from './SearchPage.module.css'

const types = [ 'xbrli:monetaryItemType', 'xbrli:stringItemType', 'dtr-types:domainItemType' ]
const sGroups = [ 'xbrli:item', 'xbrldt:hypercubeItem', 'xbrldt:dimensionItem' ]
const SearchPage = () => {
    const [search, setSearch] = createSignal('')
    const [filter, setFilter] = createSignal('Term')
    const [type, setType] = createSignal('')
    const [sGroup, setSGroup] = createSignal('')
    return (<div>
        <div>
            <h2>Query</h2>
            <fluent-text-field style={{width:'244px'}} appearance="outline" placeholder="Type query here" onKeyUp={
                e => {
                    setSearch(e.currentTarget.value)
                }
            }></fluent-text-field>
            <fluent-radio-group orientation="horizontal" value={filter()}>
                <fluent-radio onClick={e => {setFilter('Term')}} value='Term'>Term</fluent-radio>
                <fluent-radio onClick={e => {setFilter('Name')}} value='Name'>Name</fluent-radio>
            </fluent-radio-group>
        </div>
        <div>
            <h3>Type</h3>
            <fluent-combobox current-value={type()} >
                <For each={types}>
                    {(myType) => {
                        return (<fluent-option value={myType} onClick={e => {
                            setType(myType)
                        }}>{myType}</fluent-option>)
                    }}
                </For>
            </fluent-combobox>
        </div>
        <div>
            <h3>Substitution Group</h3>
            <fluent-combobox current-value={type()} >
                <For each={sGroups}>
                    {(mySGroup) => {
                        return (<fluent-option value={mySGroup} onClick={e => {
                            setSGroup(mySGroup)
                        }}>{mySGroup}</fluent-option>)
                    }}
                </For>
            </fluent-combobox>
        </div>
        <div>
            <fluent-button appearance='accent' onClick={
                async e => {
                    try {
                        const query = search()
                        await store.searchConcepts({
                            query,
                            filter: filter(),
                            type: type(),
                            substitutionGroup: sGroup()
                        })
                    } catch (e) {
                        console.error(e)
                    }
                }
            }>Search</fluent-button>
        </div>
    </div>)
}

export default SearchPage
