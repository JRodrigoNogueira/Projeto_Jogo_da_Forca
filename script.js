let biblioteca = ["floricultura", "xadrez", "yoga", "xerox", "amendoim", "cassino", "borboleta", "corretora", "jogador", "masmorras", "personagens",
    "livraria", "pensador", "irmandade", "segregar", "ensinar", "baterista", "pacifista", "cooperativo", "assaltante", "esportista", "perigoso", "biblioteca",
    "pernilongo", "variedade", "segregacionista", "relativismo", "jeito", "meigo", "seriado", "resfriado", "doente", "queimadura", "noturno", "adjetivo", "substantivo",
    "cidade", "mascarado", "nojento", "vindouro", "escola", "parabrisa"]
let qt = biblioteca.length - 1
let pos
let palavra
let tam
let desenhos = []
let verifLetra = []
let acertos
let errosMax = 7
let erros
let acertou
let jogando
let jog
let cont
let laco
let palavraInit
let cabeca
let letrasDigitDisplay
let letraCode
let letraValida
let letraDica
let msgDica


window.addEventListener("load", inicializar)

//Chamado sempre que a página for carregada
function inicializar() {

    desenhos[1] = document.getElementById("cabeca")
    desenhos[2] = document.getElementById("corpo")
    desenhos[3] = document.getElementById("bracoE")
    desenhos[4] = document.getElementById("bracoD")
    desenhos[5] = document.getElementById("pernaE")
    desenhos[6] = document.getElementById("pernaD")

    jog = document.getElementById("letraX")
    msg = document.getElementById("msg")
    cabeca = document.getElementById("cabeca")
    letrasDigitDisplay = document.getElementById("letrasDigitadas")
    msgDica = document.getElementById("msgDica")
    modal = document.getElementById("msgModal")

    jog.focus()

    inicio()
}

//Preparo para um novo jogo
function inicio() {
    for (let i = 0; i < tam; i++) {
        document.getElementById("letra" + i).style.background = "white"
    }
    msg.innerHTML = ""
    cabeca.src = "img/cabeca1.png"
    jogando = true
    cont = 0
    acertou = false
    erros = 0
    acertos = 0
    pos = Math.round(Math.random() * qt)
    palavra = biblioteca[pos]
    palavraInit = palavra
    tam = palavra.length
    jog.value = ""
    jog.focus()
    letrasDigitDisplay.innerHTML = "Letras Digitadas"
    defineLetras(tam)
    for (let i = 1; i < 7; i++)
        desenhos[i].style.display = "none"
    for (let i = 0; i < 30; i++) {
        verifLetra[i] = null
    }
}

//Determinando quantas caixas de letras serão exibidas
function defineLetras(l) {
    let obj
    for (i = 0; i < 20; i++) {
        obj = document.getElementById("letra" + i).value = "";
        obj = document.getElementById("letra" + i).style.display = "none"
    }
    for (i = 0; i < l; i++) {
        obj = document.getElementById("letra" + i).style.display = "inline-block"
    }
}

//Captura e Teste do input do jogador
function jogar() {
    if (jogando) {
        laco = true
        jog.focus()
        lerLetra(jog.value)
        //Testando se a letra já foi digitiada
        for (let i = 0; i < 30; i++) {
            if (verifLetra[i] == jog.value) {
                laco = false
                msg.innerHTML = "Você já tentou essa letra!"
            }
        }
        //Testando se é uma letra válida
        if (!letraValida) {
            msg.innerHTML = "Digite apenas letras!"
        }//Testando se algo foi digitado
        else if (jog.value == "") {
            msg.innerHTML = "Digite uma letra!"
        } else if (laco) {
            verifLetra[cont] = jog.value
            let letra
            let pesq
            let letraTmp
            msg.innerHTML = ""
            cont++
            letra = jog.value
            jog.value = ""
            pesq = palavra.match(letra)
            acertou = false
            //Enquanto a palavra possuir a letra digitada
            while (pesq != null) {
                letraTmp = palavra.search(letra)
                document.getElementById("letra" + letraTmp).value = letra
                document.getElementById("letra" + letraTmp).style.background = "#00ba7c"
                palavra = palavra.replace(letra, '0')
                acertos++
                pesq = palavra.match(letra)
                acertou = true
            }
            //Se a palavra não possuir a letra digitada
            if (!acertou) {
                letrasDigitDisplay.innerHTML += `<br>${letra.toUpperCase()}`
                erros++
                //Teste de derrota
                if (erros < errosMax) {
                    desenhos[erros].style.display = "block"
                } else {
                    cabeca.src = "img/cabeca2.png"
                    msg.innerHTML = "Sinto muito, você perdeu!"
                    for (let i = 0; i < tam; i++) {
                        if (document.getElementById("letra" + i).value == "") {
                            document.getElementById("letra" + i).style.background = "#f91880"
                            let sub = palavraInit.charAt(i)
                            document.getElementById("letra" + i).value = sub
                        }
                    }
                    jogando = false
                }
                //Teste de vitória
            } else if (acertos == tam) {
                msg.innerHTML = "Parabéns, você ganhou!"
                jogando = false
            }
        }
    }
}

//Ler a letra digitada a partir da tecla Enter
addEventListener("keydown", recebeEnter)

function recebeEnter(event) {
    let tecla = event.keyCode
    if (tecla == 13)
        jogar()
}

//Chamada da Função Dica
function dica() {
    if (jogando) {
        let verifica = false
        let sort = Math.floor(Math.random() * tam)
        while (!verifica) {
            if (document.getElementById("letra" + sort).value != "") {
                sort = Math.floor(Math.random() * tam)
            } else {
                letraDica = palavraInit.charAt(sort).toUpperCase()
                verifica = true
                iniciarModal()
            }
        }
        jog.focus()
    }
}

//Verificar se o input do jogador é uma letra
function lerLetra(letra) {
    letraCode = letra.charCodeAt(letra)
    if ((letraCode >= 65 && letraCode <= 90) || (letraCode >= 95 && letraCode <= 122)) {
        letraValida=true;
    }
    else {
        letraValida=false;
    }
}

//Dica - Função Preencher
function preencher(){
    removerModal()
    jog.value = letraDica.toLowerCase()
    jogar()
}

//Controle do Modal
function iniciarModal(){
    msgDica.innerHTML = `Dica: Letra ${letraDica}.`
    modal.classList.add("mostrar")
}

function removerModal(){
    modal.classList.remove("mostrar")
}