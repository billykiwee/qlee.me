
export function makeFriendly(number) {
    let n =  new Intl.NumberFormat('en-EN', {notation: 'compact'})

    return n.format(number)
}
