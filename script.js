let timeOut

function enableMeatIcon(e) {
    e.classList.toggle('active')
}

function setDefaultValue(e) {
    if (e.value === '')
        e.value = 0
}

function recuperarValoresChurrasco() {
    let churrasco = {
        inputs: [0, 0, 0, 0],
        itens: {
            carne: false,
            frango: false,
            refri: false,
            cerveja: false
        }
    }

    // Pegar valores dos inputs
    let inputGroup = document.getElementById('inputs')
    let inputs = inputGroup.children
    for (let i = 0; i < inputs.length; i++) {
        let inputValue = inputs[i].children[1].value // Valor do input
        //Validação
        if (inputValue === '') {
            let inputName = inputs[i].children[1].getAttribute('name')
            alert(`${inputName} não pode estar vazio`)
            return
        }
        churrasco.inputs[i] = inputValue
    }
    // Pega valores dos itens de comida marcados
    let meatIcons = document.getElementById('meat-icons')
    let icons = meatIcons.children
    let minimoSelecionado = false
    for (let icon of icons) {
        if (icon.className === 'active') { // Itens ativos
            minimoSelecionado = true
            let idItem = icon.getAttribute('id')
            churrasco.itens[idItem] = true
        }
    }
    // Validação
    if (!minimoSelecionado) {
        alert('Selecione pelo menos um item.')
        return
    }

    // Valores validados
    let quantidades = calcularValoresChurrasco(churrasco)
    hidePanel()
    enableResultPanel(quantidades)
}

function calcularValoresChurrasco(churrasco) {
    let [nHomens, nMulheres, nCriancas, nDuracao] = churrasco.inputs
    let { carne, frango, refri, cerveja } = churrasco.itens
    // Constantes
    const kCarneHomem = 500
    const kCarneMulher = 300
    const kCarneCrianca = 200
    const kCerveja = nDuracao >= 6 ? 2000 : 1200
    const kBebida = nDuracao >= 6 ? 1500 : 1000
    const kFrango = 2.75

    // Variaveis 
    let qtdCarne, qtdFrango, qtdBebida, qtdCerveja

    // Cálculo da carne
    if (carne)
        qtdCarne = (kCarneHomem * nHomens) + (kCarneMulher * nMulheres) + (kCarneCrianca * nCriancas)
    if (frango && carne) {
        qtdFrango = qtdCarne / kFrango
        qtdCarne = qtdCarne - qtdFrango
    }
    else if (frango) {
        qtdFrango = (kCarneHomem * nHomens) + (kCarneMulher * nMulheres) + (kCarneCrianca * nCriancas)
    }
    // Cálculo das bebidas
    if (refri)
        qtdBebida = (kBebida * nHomens) + (kBebida * nMulheres) + ((kBebida * nCriancas) / 2)
    if (cerveja)
        qtdCerveja = (kCerveja * nHomens) + (kCerveja * nMulheres)

    // Formatação
    // Carne
    qtdCarne = `<span>${(qtdCarne / 1000).toFixed(2)}</span> Kg de Carne`
    qtdFrango = `<span>${(qtdFrango / 1000).toFixed(2)}</span> Kg de Frango`
    qtdBebida = `<span>${Math.floor((qtdBebida / 1000) / 2)}</span> Garrafas de bebidas de 2L`
    qtdCerveja = `<span>${Math.floor((qtdCerveja / 1000) / 0.350)}</span> Latinhas de Cerveja`

    let quantidades = [qtdCarne, qtdFrango, qtdBebida, qtdCerveja]

    return quantidades
}

function reset() {
    clearTimeout(timeOut)
    let p1 = document.getElementById('p1')
    let p2 = document.getElementById('p2')
    p2.style.display = 'none'
    p2.style.opacity = '0'
    p1.style.display = 'block'
    p1.style.opacity = '1'

    // Limpar inputs
    let inputGroup = document.getElementById('inputs')
    let inputs = inputGroup.children
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].children[1].value = ''
    }
    // Limpar inputs p2
    let inputGroup2 = document.getElementById('inputs_p2')
    let inputs2 = inputGroup2.children
    for (let i = 0; i < inputs2.length; i++) {
        inputs2[i].removeAttribute('style')
    }

    // Limpar ícones de comida
    let meatIcons = document.getElementById('meat-icons')
    let icons = meatIcons.children
    for (let icon of icons) {
        icon.className = ''
    }

}

function hidePanel() {
    let p1 = document.getElementById('p1')
    p1.style.opacity = '0'
    timeOut = setTimeout(() => {
        p1.style.display = 'none'
    },500)
}

function enableResultPanel(result) {
    let p2 = document.getElementById('p2')
    setTimeout(() => {
        p2.style.display = 'block'
    },500)
    setTimeout(() => {
        p2.style.opacity = '1'
    },1000)

    let inputGroup = document.getElementById('inputs_p2')
    let inputs = inputGroup.children
    for (let i = 0; i < inputs.length; i++) {
        if (!result[i].includes('NaN')){
            inputs[i].children[1].innerHTML = result[i]
        }
        else {
            inputs[i].children[1].innerHTML = 'N/A'
            inputs[i].style.backgroundColor = '#DDD'
        }
    }

}