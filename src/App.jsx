import { onMount } from 'solid-js'
import {
    provideFluentDesignSystem,
    fluentCombobox,
    fluentOption,
    fluentTab,
    fluentTabPanel,
    fluentTabs,
    fluentButton,
    fluentTextField
} from '@fluentui/web-components'
import 'isomorphic-fetch'

import store from './lib/store'
import CatalogPage from './components/CatalogPage'
import BrowserPage from './components/BrowserPage'
import logo from './logo.svg'
import styles from './App.module.css'
provideFluentDesignSystem().register(
    fluentCombobox(),
    fluentOption(),
    fluentTab(),
    fluentTabPanel(),
    fluentTabs(),
    fluentButton(),
    fluentTextField()
)

const App = () => {
  onMount(async () => {
      try {
        await store.loadCatalog()
      } catch (e) {
        console.error(e)
      }
  })
  return <>
    {store.getLoading() && !store.getError() && <div id={styles['splash-screen']}><img style={{height: '100%', width: '100%'}} src={logo} /></div>}
    {store.getError() && <div>error!</div>}
    {
      !store.getLoading() && !store.getError() && <>
      {
          store.getCatalog() && !store.getHash() && <CatalogPage />
      }
      {
          store.getHash() && store.getRenderable() && <BrowserPage />
      }
      </>
    }
  </>
}

export default App