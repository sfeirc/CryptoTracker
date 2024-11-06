// Fonction pour récupérer et afficher les données des cryptomonnaies
function fetchCryptoData() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=false')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('.crypto-table tbody');
            tableBody.innerHTML = '';

            data.forEach((coin) => {
                const row = document.createElement('tr');

                // Rang
                const rankCell = document.createElement('th');
                rankCell.scope = 'row';
                rankCell.textContent = coin.market_cap_rank;
                row.appendChild(rankCell);

                // Nom et Image
                const nameCell = document.createElement('td');
                nameCell.innerHTML = `
                    <img src="${coin.image}" alt="${coin.name}" class="me-2">
                    ${coin.name} (${coin.symbol.toUpperCase()})
                `;
                row.appendChild(nameCell);

                // Prix en EUR
                const priceCell = document.createElement('td');
                priceCell.textContent = coin.current_price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
                row.appendChild(priceCell);


                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Erreur:', error));
}

// Chargement initial des données
fetchCryptoData();

// Rafraîchir les données lorsqu'on clique sur le bouton
document.querySelector('.refresh-btn').addEventListener('click', () => {
    fetchCryptoData();
});
