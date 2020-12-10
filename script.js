function enableMeatIcon(e) {
    e.classList.toggle('active')
}

// 400gr carne/ pessoa
// 1200ml cerveja/ pessoa
// 1000ml refrigerante-agua/pessoa
// crianças valem por 0.5

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
            alert('Valor não pode estar vazio.')
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
    calcularValoresChurrasco(churrasco)
}

function calcularValoresChurrasco(churrasco) {
    let [nHomens, nMulheres, nCriancas, nDuracao] = churrasco.inputs
    let {carne, frango, refri, cerveja} = churrasco.itens
    //TODO calcular valores com as variáveis acima
    //TODO criar método para chamar o #p2 e ocultar #p1 mostrando os valores obtidos
}