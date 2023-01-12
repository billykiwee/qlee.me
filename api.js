const axios = require("axios");
const fs = require("fs");

const API_KEY = "8mb1EiUaYo2Dv6FjiELiSzywppyq94ugPghtcrqNQz20kV2Xp5OGH1hVpoSzsoXv";
const SECRET_KEY = "BIIizjECn18tzDkAmOkNVZU8CaPtytcONJ8lhfFrElc510MDvWi0mObMIFCCVd29";

async function getTransactions() {
    try {
        const timestamp = Date.now();
        const url = "https://api.binance.com/api/v3/myTrades";

        // Paramètres pour la requête
        const params = {
            symbol: "BTCUSDT",
            limit: 500,
            timestamp
        };

        // En-têtes pour la requête
        const headers = {
            "X-MBX-APIKEY": API_KEY,
            "X-MBX-SIGNATURE": SECRET_KEY
        };

        // Envoyer la requête
        const response = await axios.get(url, { params, headers });

        // Vérifier si la requête a réussi
        if (response.status !== 200) {
            console.log(`Error: ${response.status}`);
            return;
        }

        // Récupérer les données de la réponse
        const data = response.data;


        console.log(data);

        // Exporter les données en fichier CSV
        const csv = arrayToCsv(data);
        fs.writeFileSync("transactions_history.csv", csv);
        console.log("L'historique des transactions a été exporté en fichier CSV avec succès.");

    } catch (error) {
        console.log(error);
    }
}


getTransactions();
