/**
 * Script para conversão de moedas usando a API Exchange Rate.
 * O script adiciona dois dropdowns com diferentes moedas e converte valores 
 * entre essas moedas quando um formulário é submetido.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Seleciona os elementos dropdown para moedas de entrada e saída
    const entradaMoedaSelect = document.getElementById('entrada-conversor');
    const saidaMoedaSelect = document.getElementById('saida-conversor');

    // Faz uma requisição à API Exchange Rate para obter as taxas de câmbio mais recentes em relação ao BRL (Real Brasileiro)
    fetch('https://api.exchangerate-api.com/v4/latest/BRL')
        .then(response => response.json())
        .then(data => {
            // Obtém as moedas disponíveis a partir da resposta da API
            const moedas = Object.keys(data.rates);

            // Adiciona cada moeda como uma opção nos dropdowns de entrada e saída
            moedas.forEach(moeda_tipo => {
                const opt_entrada = document.createElement('option');
                opt_entrada.value = moeda_tipo;
                opt_entrada.textContent = moeda_tipo;
                entradaMoedaSelect.appendChild(opt_entrada);

                const opt_saida = document.createElement('option');
                opt_saida.value = moeda_tipo;
                opt_saida.textContent = moeda_tipo;
                saidaMoedaSelect.appendChild(opt_saida);
            });
        })
        .catch(error => {
            // Loga um erro caso a requisição falhe
            console.error('Erro ao buscar taxas de câmbio:', error);
        });
});

