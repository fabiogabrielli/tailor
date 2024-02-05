
        // CALCULADORA

    const faturamentoSlider = document.getElementById("faturamentoSlider");
    const lucroSlider = document.getElementById("lucroSlider");
    const perdaSlider = document.getElementById("perdaSlider");
    const jurosSlider = document.getElementById("jurosSlider");

    const faturamentoOutput = document.getElementById("faturamentoOutput");
    const lucroOutput = document.getElementById("lucroOutput");
    const perdaOutput = document.getElementById("perdaOutput");
    const jurosOutput = document.getElementById("jurosOutput");

    const resultDiv = document.getElementById("result");
    const myModal = document.getElementById("myModal");
    const myModalImpactos = document.getElementById("myModalImpactos");
    
    faturamentoOutput.textContent = "100.000.000";

    faturamentoSlider.oninput = function() {
        faturamentoOutput.textContent = formatValue(this.value);
    }

    lucroSlider.oninput = function() {
        lucroOutput.textContent = this.value;
    }

    perdaSlider.oninput = function() {
        perdaOutput.textContent = formatValue(this.value);
    }

    jurosSlider.oninput = function() {
        jurosOutput.textContent = this.value;
    }

    function formatValue(value) {
        value = parseInt(value, 10);
        return value.toLocaleString('pt-BR', { minimumFractionDigits: 0 });
    }

    function calculate() {
        const faturamentoAnual = parseFloat(faturamentoSlider.value);
        const lucroOperacional = parseFloat(lucroSlider.value) / 100;
        const valorEstimadoPerda = parseFloat(perdaSlider.value);
        const taxaDeJuros = parseFloat(jurosSlider.value) / 100;

        const lucroAnual = faturamentoAnual * lucroOperacional;

        const custoOportunidade = valorEstimadoPerda * (Math.pow(1 + taxaDeJuros / 12, 12) - 1);
        const perdaEstimadaTotal = valorEstimadoPerda + custoOportunidade;
        const mesesParaRecuperar = perdaEstimadaTotal / (lucroAnual / 12);

        let classificacaoImpacto;
        if (mesesParaRecuperar < 2) {
            classificacaoImpacto = "Perda Leve";
        } else if (mesesParaRecuperar < 4) {
            classificacaoImpacto = "Perda Moderada";
        } else if (mesesParaRecuperar < 6) {
            classificacaoImpacto = "Perda Significativa";
        } else {
            classificacaoImpacto = "Perda Crítica";
        }
        
        // Calcula a taxa de seguro de crédito com base no faturamento
        const taxaMaxima = 0.003; // 0,3%
        const taxaMinima = 0.0005; // 0,05%
        const faturamentoMaximo = 10000000000; // R$ 10 bilhões
        const faturamentoMinimo = 200000000; // R$ 200 milhoes

        var custoSeguro;
        if (faturamentoAnual <= 1000000000) {
        custoSeguro = ((faturamentoAnual - 200000000) / (1000000000 - 200000000) * (2000000000 - 600000000) + 600000000) / 1000;
        } else {
        custoSeguro = ((faturamentoAnual - 1000000000) / (10000000000 - 1000000000) * (5000000000 - 2000000000) + 2000000000) / 1000;
        }


        myModal.style.display = "flex";  

        const geral = document.getElementById("geral");
        geral.style.display = "none";  


        resultDiv.innerHTML = `
            <b>(+) Perda Estimada: </b>R$ ${formatValue(valorEstimadoPerda.toFixed(2))}<br>
            <b>(+) Custo de Oportunidade: </b>R$ ${formatValue(custoOportunidade.toFixed(2))}<br>
            <span class="prejuizo"><b>(-) Prejuízo Total:</b> R$ ${formatValue(perdaEstimadaTotal.toFixed(2))}</span><br><br>
            <b>Tempo de Recuperação (meses):</b> ${mesesParaRecuperar.toFixed(1)}<br>
            <b>Classificação de Impacto:</b> ${classificacaoImpacto}<br><br>
            <p><b>Caso a empresa tivesse contratado um seguro de crédito para proteger seus recebíveis, o seu custo anual seria de aproximadamente: </b><h1>R$ ${formatValue(custoSeguro.toFixed(2))}</h1></p>
        `;
    }

    function fechaModal() {
        myModal.style.display = "none";
        geral.style.display = "flex";  
    }
    


