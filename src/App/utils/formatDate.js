export default function formatDate(date, type) {

    try {

        let DATE = new Date(date.seconds * 1000).toLocaleDateString()
        let HOURS = new Date(date.seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    
        if (type === 'date') return DATE
        if (type === 'hours') return HOURS
        else return DATE + ' ' + HOURS
    }

    catch (e) {
        console.log(e);
    }
}