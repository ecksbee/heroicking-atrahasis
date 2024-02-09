export default async ({query}) => {
    const indexName = 'concepts'
    const response = await fetch('concepts/search?indexName=' + indexName, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: 0,
            size: 10,
            query: {
                field: "EnglishLabels",
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