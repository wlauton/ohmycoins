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

/**
 * Função para manipular o envio do formulário de conversão de moeda.
 * @param {Event} event - O evento de submissão do formulário.
 */
document.getElementById('conversor-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    // Seleciona os elementos dropdown e o valor de entrada
    const entradaMoedaSelect = document.getElementById('entrada-conversor');
    const saidaMoedaSelect = document.getElementById('saida-conversor');
    let valor = document.getElementById('quantia').value.replace(',', '.'); // Normaliza o valor para float
    let entradaMoeda = entradaMoedaSelect.value;
    let saidaMoeda = saidaMoedaSelect.value;

    // Faz uma requisição à API Exchange Rate para obter a taxa de câmbio da moeda de entrada
    fetch(`https://api.exchangerate-api.com/v4/latest/${entradaMoeda}`)
        .then(response => response.json())
        .then(data => {
            let taxa = data.rates[saidaMoeda]; // Obtém a taxa de câmbio para a moeda de saída
            let conversao = valor * taxa; // Realiza a conversão

            // Exibe o resultado da conversão
            document.getElementById('resultado').style.visibility = "visible";
            document.getElementById('resultado').innerText = ` ${conversao.toFixed(2)} ${saidaMoeda}`;
        })
        .catch(error => {
            // Loga um erro caso a requisição falhe e exibe uma mensagem de erro para o usuário
            console.error('Erro ao buscar taxa de câmbio:', error);
            document.getElementById('resultado').innerText = 'Erro ao buscar taxa de câmbio. Tente novamente.';
        });
});
