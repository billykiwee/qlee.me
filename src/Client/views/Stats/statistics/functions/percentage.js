export const percentage = (stat, array) => {
    const sumCount = Object.values(stat.array).map(e=> e.count).reduce((x,y)=> x + y)
    return ((array.count / sumCount) * 100 ).toFixed(0)
}