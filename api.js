const axios = require('axios');
const fs = require('fs');
const json2xls = require('json2xls');

// Insérez votre clé d'API Binance ici
const api_key = "YOUR_API_KEY";

// Définir les paramètres de la requête
const params = {
    symbol: "BTCUSDT",
    limit: 500
};

// Ajouter la clé d'API à la requête
const headers = {
    "X-MBX-APIKEY": api_key
};

axios.get('https://api.binance.com/api/v3/myTrades', {params, headers})
    .then(response => {
        // Vérifier si la requête a réussi
        if (response.status !== 200) {
            console.log(`Error: ${response.status}`);
            return;
        }
        const data = response.data;
        const xls = json2xls(data);
        fs.writeFileSync('transactions_binance.xlsx', xls, 'binary');
        console.log("Les transactions Binance ont été exportées en fichier Excel avec succès.");
    })
    .catch(error => {
        console.log(error);
    });
