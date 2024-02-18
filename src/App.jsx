import { onMount } from 'solid-js'
import {
    provideFluentDesignSystem,
    fluentCombobox,
    fluentOption,
    fluentTab,
    fluentTabPanel,
    fluentTabs,
    fluentButton,
    fluentRadio,
    fluentRadioGroup,
    fluentTextField
} from '@fluentui/web-components'
import 'isomorphic-fetch'

import store from './lib/store'
import CatalogPage from './components/CatalogPage'
import BrowserPage from './components/BrowserPage'
import InspectorPage from './components/InspectorPage'
import Spinner from './components/Spinner'
import SearchResults from './components/SearchResults'
provideFluentDesignSystem().register(
    fluentCombobox(),
    fluentOption(),
    fluentTab(),
    fluentTabPanel(),
    fluentTabs(),
    fluentButton(),
    fluentRadio(),
    fluentRadioGroup(),
    fluentTextField()
)

const App = () => {
  onMount(async () => {
      try {
        await store.loadData()
      } catch (e) {
        console.error(e)
      }
  })
  return <>
    {store.getLoading() && !store.getError() && <Spinner />}
    {store.getError() && <div>error!</div>}
    {
      !store.getLoading() && !store.getError() && <>
      {
          !store.getSearchResults() && !store.getConceptCard() && !store.getRenderable() && <CatalogPage />
      }
      {
          !store.getSearchResults() && store.getConceptCard() && !store.getRenderable() && <InspectorPage />
      }
      {
          !store.getSearchResults() && store.getRenderable() && <BrowserPage />
      }
      {
          store.getSearchResults() && <SearchResults />
      }
      </>
    }
  </>
}



export default App