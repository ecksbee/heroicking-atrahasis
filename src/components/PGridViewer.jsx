import { onMount } from 'solid-js'

import store from '../lib/store'
import dataGrid from '../lib/dataGrid'
import transformPGrid from '../lib/transformPGrid'

const PGridViewer = ({labelRole, lang}) => {
    let pGridDiv
    onMount(()=> {
        try {
            const renderable = store.getRenderable()
            const pGrid = renderable.PGrid
            const blob = transformPGrid(pGrid, labelRole, lang)
            setTimeout(() => {
                dataGrid(blob.grid, blob.numFrozenRows, 1, pGridDiv, (grid, e) => {

                }, pGrid.FootnoteGrid, pGrid.Footnotes)
            }, 100)
        } catch (e) {
            console.error(e)
        }
    })
    return <div id='r-viewerPresentation'>
            <div id='pgrid' ref={pGridDiv} />
        </div>
}

export default PGridViewer
