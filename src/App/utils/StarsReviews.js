import UniqueID from "./uniqueID"

export function StarsReviews({number, size}) {

    const sizeStar = 18
    const fill = <svg width={size || sizeStar} height={size || sizeStar} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5001 1.66675L13.0751 6.88341L18.8334 7.72508L14.6667 11.7834L15.6501 17.5167L10.5001 14.8084L5.35008 17.5167L6.33341 11.7834L2.16675 7.72508L7.92508 6.88341L10.5001 1.66675Z" fill="#fbbd05"/></svg>
    const demi = <svg width={size || sizeStar} height={size || sizeStar} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M9.99984 1.66675L7.42484 6.88341L1.6665 7.72508L5.83317 11.7834L4.84984 17.5167L9.99984 14.8084V1.66675Z" fill="#fbbd05"/><path d="M12.5748 6.88341L9.99984 1.66675V14.8084L15.1498 17.5167L14.1665 11.7834L18.3332 7.72508L12.5748 6.88341Z" fill="var(--border)"/></svg>
    const empty = <svg width={size || sizeStar} height={size || sizeStar} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5001 1.66675L13.0751 6.88341L18.8334 7.72508L14.6667 11.7834L15.6501 17.5167L10.5001 14.8084L5.35008 17.5167L6.33341 11.7834L2.16675 7.72508L7.92508 6.88341L10.5001 1.66675Z" fill="var(--border)"/></svg>

    if (number > 5) number = 5

    let SplitNumber = number.toString().split('.')

    let numerOfStar = 5
    let starRest = Math.floor(numerOfStar - number)
    if (!number) starRest = 5

    const svg = {
        fill : [],
        demi : [],
        empty: []
    }
    
    for (let i = 0; i < SplitNumber[0]; i++) svg.fill.push(fill)
    for (let i = 0; i < SplitNumber[1]*0+1; i++) svg.demi.push(demi)
    for (let i = 0; i < starRest; i++) svg.empty.push(empty)

    return (
        <div className='display'>
            {
                svg.fill.map(e=> <span key={UniqueID()} className="display">{e}</span>)
            }
            {
                svg.demi.map(e=> <span key={UniqueID()} className="display">{e}</span>)
            }
            {
                svg.empty.map(e=> <span key={UniqueID()} className="display">{e}</span>)
            }
        </div>
    )
}