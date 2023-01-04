

export default function formatCurrency(data, currency, digit) {

    const formatC = new Intl.NumberFormat( 

        currency ?? 'fr-FR', { 
            style                : 'currency',
            currency             : 'EUR',
            minimumFractionDigits: digit ?? 2
        }
    ).format(data)

    return formatC
}
