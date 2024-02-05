import { For, createSignal } from 'solid-js'

import store from '../lib/store'
import styles from './SearchPage.module.css'

const types = [ 'monetaryItemType', 'stringItemType' ]
const SearchPage = () => {
    const [search, setSearch] = createSignal('')
    const [filter, setFilter] = createSignal('Term')
    const [type, setType] = createSignal('')
    return (<div>
        <h2>Concepts</h2>
        <fluent-text-field appearance="outline" placeholder="Type query here" onClick={
            e => {
                setSearch(e.currentTarget.value)
            }
        } current-value={search()}></fluent-text-field>
        <div>
            <fluent-radio-group orientation="horizontal" value={filter()}>
                <fluent-radio onClick={e => {setFilter('Term')}} value='Term'>Term</fluent-radio>
                <fluent-radio onClick={e => {setFilter('Name')}} value='Name'>Name</fluent-radio>
            </fluent-radio-group>
        </div>
        <fluent-combobox current-value={type()} >
            <For each={types}>
                {(myType) => {
                    return (<fluent-option value={myType} onClick={e => {
                        setType(myType)
                    }}>{myType}</fluent-option>)
                }}
            </For>
        </fluent-combobox>
            <div>
                <fluent-button appearance='accent' onClick={
                    async e => {
                        const currSearch = search()
                        const currFilter = filter()
                        const currType = type()
                        try {
                            alert(currSearch + " " + currFilter + " " + currType)   //todo
                        } catch (e) {
                            console.error(e)
                        }
                    }
                }>Browse</fluent-button>
            </div>
    </div>)
}

export default SearchPage
