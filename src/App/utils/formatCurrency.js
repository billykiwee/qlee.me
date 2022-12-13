

export default function formatCurrency(data, currency) {
    const formatC = new Intl.NumberFormat('fr-FR', { 
        style: 'currency', currency: 'EUR' 
    }).format(data)

    return formatC 
}
