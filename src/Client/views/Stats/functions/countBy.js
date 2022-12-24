export function countBy(array) {
    const iterate =  array.reduce((acc, curr) => {
        if (curr in acc) 
            acc[curr]++
        else 
            acc[curr] = 1
        return acc
    }, {})

    const transformedData = {}

    Object.keys(iterate).forEach((key, i) => {
        transformedData[i] = {
            name: key, 
            count: iterate[key]
        }
    })

    return transformedData
}
