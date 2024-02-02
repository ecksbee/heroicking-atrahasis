import canvasDatagrid from 'canvas-datagrid'

export default (data, numFrozenRows, numFrozenCols, mount, onContextMenu, footnoteGrid, footnotes) => {
    setTimeout(() => {
        const grid = canvasDatagrid({
            allowSorting: false, // affected by this bug https://github.com/TonyGermaneri/canvas-datagrid/issues/261
            allowColumnReordering: false,
            autoResizeColumns: false,
            editable: false,
            allowFreezingColumns: true,
            allowFreezingRows: true,
            style: {
                cellFont: '10.66px CarlitoRegular',
                columnHeaderCellFont: '12px CarlitoRegular',
                rowHeaderCellFont: '12px CarlitoRegular',
                activeCellFont: '10.66px CarlitoRegular',
            }
        })
        mount.appendChild(grid)
        grid.style.height = 'calc(100vh - 16px - 38px - 32px - 40px - 16px)'
        grid.style.width = '98vw'
        grid.data = data
        grid.frozenColumn = numFrozenCols || 1
        grid.frozenRow = (Math.floor(grid.visibleRowHeights.length/2) < numFrozenRows) ? 1 : numFrozenRows
        grid.addEventListener('beforesortcolumn', e => {
            e.preventDefault()
        })
        if (onContextMenu) {
            grid.addEventListener('contextmenu', e => {
                onContextMenu(grid, e)
            })
        }
        const l = numFrozenCols || 1
        const columnNames = Array.from(Array(l)).map((e, i) => i.toString())
        columnNames.forEach(
            name =>  grid.fitColumnToValues(name)
        )
        grid.draw()
    }, 100)
}
