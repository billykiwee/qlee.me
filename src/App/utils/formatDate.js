export default function formatDate(date, type) {

    if (date) {

        let d = new Date(date.seconds * 1000).toLocaleDateString()
        let h = new Date(date.seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    

        let result = d + ' ' + h


        if (type=== 'hour') result = h
        if (type=== 'day') result = d
    
        return result
    }
}