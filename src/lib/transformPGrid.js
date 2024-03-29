export default (pGrid, labelRole, lang) => {
    const grid = []
    const maxRow =
        pGrid.IndentedLabels.length + pGrid.ContextualMemberGrid.length + 1
    const maxCol = pGrid.PeriodHeaders.length + 1
    for (let i = 0; i < maxRow; i++) {
        const row = []
        if (i < pGrid.ContextualMemberGrid.length + 1) {
            for (let j = 0; j < maxCol; j++) {
                if (j === 0) {
                    if (i === 0) {
                        row.push('')
                    } else {
                        const voidCell = pGrid.VoidQuadrant[i - 1]
                        if (voidCell.TypedDomain) {
                            if (voidCell.TypedDomain.Label[labelRole]) {
                                const langVal =
                                    voidCell.TypedDomain.Label[labelRole][lang]
                                const unlabelledVal =
                                    voidCell.TypedDomain.Label.Default
                                        .Unlabelled
                                row.push(langVal || unlabelledVal)
                            } else {
                                row.push(
                                    voidCell.TypedDomain.Label.Default
                                        .Unlabelled
                                )
                            }
                        } else {
                            if (voidCell.Dimension.Label[labelRole]) {
                                const langVal =
                                    voidCell.Dimension.Label[labelRole][lang]
                                const unlabelledVal =
                                    voidCell.Dimension.Label.Default.Unlabelled
                                row.push(langVal || unlabelledVal)
                            } else {
                                row.push(
                                    voidCell.Dimension.Label.Default.Unlabelled
                                )
                            }
                        }
                    }
                } else {
                    if (i === 0) {
                        const ph = pGrid.PeriodHeaders[j - 1]
                        row.push(ph[lang] || ph.Unlabelled)
                    } else {
                        const memberCell =
                            pGrid.ContextualMemberGrid[i - 1][j - 1]
                        if (memberCell.TypedMember) {
                            row.push(memberCell.TypedMember)
                        } else if (memberCell.ExplicitMember) {
                            if (memberCell.ExplicitMember.Label[labelRole]) {
                                const explicitMember = memberCell.ExplicitMember
                                const langVal =
                                    explicitMember.Label[labelRole][lang]
                                const unlabelledVal =
                                    explicitMember.Label.Default.Unlabelled
                                row.push(langVal || unlabelledVal)
                            } else {
                                row.push(
                                    memberCell.ExplicitMember.Label.Default
                                        .Unlabelled
                                )
                            }
                        } else {
                            row.push('')
                        }
                    }
                }
            }
        } else {
            const index = i - pGrid.ContextualMemberGrid.length - 1
            for (let j = 0; j < maxCol; j++) {
                if (j === 0) {
                    const il = pGrid.IndentedLabels[index]
                    let label = ''
                    for (let i = 0; i < il.Indentation; i++) {
                        label += '    '
                    }
                    if (il.Label[labelRole]) {
                        label += il.Label[labelRole][lang] ||
                                il.Label.Default.Unlabelled
                    } else {
                        label += il.Label.Default.Unlabelled
                    }
                    row.push(label)
                } else {
                    const fact = pGrid.FactualQuadrant[index][j - 1]
                    if (fact.Unlabelled.Core) {
                        if (fact[lang]) {
                            row.push(
                                fact[lang].Head +
                                    fact[lang].Core +
                                    fact[lang].Tail
                            )
                        } else {
                            row.push(
                                fact.Unlabelled.Head +
                                    fact.Unlabelled.Core +
                                    fact.Unlabelled.Tail
                            )
                        }
                    } else if (fact.Unlabelled.InnerHtml) {
                        row.push('...')
                    } else {
                        row.push('')
                    }
                }
            }
        }
        row.push('')
        grid.push(row)
    }
    const last = []
    for (let j = 0; j < maxCol + 1; j++) {
        last.push('')
    }
    grid.push(last)
    return {
        grid,
        numFrozenRows: pGrid.VoidQuadrant.length + 1
    }
}
