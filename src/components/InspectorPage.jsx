import { createSignal } from 'solid-js'

import store from '../lib/store'
import styles from './InspectorPage.module.css'

const InspectorPage = () => {
    const conceptCard = store.getConceptCard()
    console.dir(conceptCard)
    return (<div id={styles['main-panel']} style={{
        display: 'block'
    }}>
            <div id={styles['main-panel-title']}>
                <h1 class={styles.truncate + ' ' + styles['main-panel-title-h1']}>{conceptCard.ID}
                </h1>
            </div>
            <div id={styles['main-panel-body']}>
                <p>Source: {conceptCard.Source}</p>
                <p>ID: {conceptCard.ID}</p>
                <p>Namespace: {conceptCard.Namespace}</p>
                <p>Name: {conceptCard.Name}</p>
                <p>Substitution Group: {conceptCard.SubstitutionGroup}</p>
                <p>PeriodType: {conceptCard.ItemType}</p>
                <p>Period Type: {conceptCard.PeriodType}</p>
                <p>Balance Type: {conceptCard.BalanceType}</p>
            </div>
    </div>)
}

export default InspectorPage
