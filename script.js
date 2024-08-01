// Função para carregar as moedas disponíveis pro menu de seleção que a API fornece.
document.addEventListener('DOMContentLoaded', function() {
    const entradaMoedaSelect = document.getElementById('entrada-conversor');
    const saidaMoedaSelect = document.getElementById('saida-conversor');

    fetch('https://api.exchangerate-api.com/v4/latest/BRL')
        .then(response => response.json())
        .then(data => {
            const moedas = Object.keys(data.rates);
            console.log('Moedas disponíveis:', moedas);
        })
        .catch(error => {
            console.error('Erro ao buscar taxas de câmbio:', error);
        });
});
