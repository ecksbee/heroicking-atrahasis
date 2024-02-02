import { createSignal } from 'solid-js'

import store from '../lib/store'
import PGridViewer from './PGridViewer'
import DGridViewer from './DGridViewer'
import CGridViewer from './CGridViewer'
import LabelManager from './LabelManager'
import styles from './BrowserPage.module.css'

const BrowserPage = () => {
    const [currentTab, setCurrentTab] = createSignal('presentation')
    const renderable = store.getRenderable()
    if (!renderable) {
        return null
    }
    let mainPanelTitle = renderable.RelationshipSet.Title
    let subtitle = renderable.RelationshipSet.RoleURI
    return (<div id={styles['main-panel']} style={{
        display: 'block'
    }}>
            <div id={styles['main-panel-title']}>
                <h1 class={styles.truncate + ' ' + styles['main-panel-title-h1']}>{mainPanelTitle}
                &nbsp;&nbsp;
                <a href='#' onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    store.setRenderable(null)
                    const u = new URL(window.location.href)
                    u.search = ''
                    console.log(u.toString())
                    history.pushState(null, '', u.toString())
                }}>[X]</a></h1>
                <h2>{subtitle}</h2>
            </div>
            <div id={styles['main-panel-body']}>
                <fluent-tabs activeid={currentTab()}>
                    <fluent-tab id='presentation' onClick={e => setCurrentTab('presentation')}>
                        Presentation</fluent-tab>
                    <fluent-tab id='definition' onClick={e => setCurrentTab('definition')}>
                        Definition</fluent-tab>
                    <fluent-tab id='calculation' onClick={e => setCurrentTab('calculation')}>
                        Calculation</fluent-tab>
                    <fluent-tab id='label' onClick={e => setCurrentTab('label')}>
                        Label</fluent-tab>

                    <fluent-tab-panel id='presentationPanel'>
                        { currentTab() === 'presentation' && <PGridViewer labelRole={store.getLabelRole()} lang={store.getLang()} /> }
                    </fluent-tab-panel>
                    <fluent-tab-panel id='definitionPanel'>
                        { currentTab() === 'definition' && <DGridViewer labelRole={store.getLabelRole()} lang={store.getLang()} /> }
                    </fluent-tab-panel>
                    <fluent-tab-panel id='calculationPanel'>
                        { currentTab() === 'calculation' && <CGridViewer labelRole={store.getLabelRole()} lang={store.getLang()} />} 
                    </fluent-tab-panel>

                    <fluent-tab-panel id='labelManager'>
                        { currentTab() === 'label' && <LabelManager />} 
                    </fluent-tab-panel>
                </fluent-tabs>
            </div>
    </div>)
}

export default BrowserPage
