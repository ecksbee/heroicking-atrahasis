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
          !store.getConceptCard() && !store.getRenderable() && store.getCatalog() && <CatalogPage />
      }
      {
          !store.getConceptCard() && store.getRenderable() && <BrowserPage />
      }
      {
          store.getConceptCard() && !store.getRenderable() && <InspectorPage />
      }
      </>
    }
  </>
}



export default App