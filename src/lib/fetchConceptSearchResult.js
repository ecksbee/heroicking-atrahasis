export default async (code, {
    query, filter, type, substitutionGroup
}) => {
    if (!code) {
        return null
    }
    const response = await fetch('/taxonomies/' + code + '/search', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: 0,
            size: 10,
            query: {
                field: filter.toLowerCase() === 'term'? 'EnglishLabels' : 'Name',
                match: query
            },
            fields: [ "ID", "Source", "Namespace", "Name", "ItemType", "SubstitutionGroup",
            "BalanceType", "PeriodType"   ]
        })
    }
    )
    if (response.status >= 400) {
        throw new Error('Bad response from server')
    }
    return response.json()
}