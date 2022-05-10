let biblioteca = ["xadrez", "zorra", "cascata", "cassino", "pensador", "picareta", "cone", "fome", "caminhar", "seriado",
    "simples", "assoprar", "sambar", "leitura", "cinema", "jogadores", "masmorra", "limonada", "leigo", "livraria",
    "mesclar", "muralha", "acreditar", "sanfona", "sapateado", "sentimento", "chamariz", "imaginar", "vestimenta", "latir"]
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
let letraDigitada
let temas
let msg

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
    temas = document.getElementById("temas")
    btnModal = document.getElementsByClassName("btnModal")

    jog.focus()

    inicio()
}

//Preparo para um novo jogo
function inicio() {
    removerModal()
    msg.innerHTML = ""
    cabeca.src = "img/cabeca1.png"
    jogando = true
    cont = 0
    acertou = false
    erros = 0
    acertos = 0
    pos = Math.round(Math.random() * qt)
    palavra = biblioteca[pos].toUpperCase()
    palavraInit = palavra
    tam = palavra.length
    jog.value = ""
    jog.focus()
    letrasDigitDisplay.innerHTML = "Letras Digitadas:"
    for (let i = 0; i < tam; i++) {
        document.getElementById("letra" + i).style.background = "white"
    }
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
    for (i = 0; i < 11; i++) {
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
        letraDigitada = jog.value.toUpperCase()
        lerLetra(letraDigitada)
        //Testando se a letra já foi digitiada
        for (let i = 0; i < 30; i++) {
            if (verifLetra[i] == letraDigitada) {
                laco = false
                msg.innerHTML = "Você já tentou essa letra!"
            }
        }
        //Testando se é uma letra válida
        if (!letraValida) {
            msg.innerHTML = "Digite apenas letras!"
        }//Testando se algo foi digitado
        else if (letraDigitada == "") {
            msg.innerHTML = "Digite uma letra!"
        } else if (laco) {
            verifLetra[cont] = letraDigitada
            let letra
            let pesq
            let letraTmp
            msg.innerHTML = ""
            cont++
            letra = letraDigitada
            jog.value = ""
            letraDigitada = ""
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
                erros++
                //Teste de derrota
                if (erros < errosMax) {
                    letrasDigitDisplay.innerHTML += ` ${letra.toUpperCase()},`
                    desenhos[erros].style.display = "block"
                } else {
                    cabeca.src = "img/cabeca2.png"
                    letrasDigitDisplay.innerHTML += ` ${letra.toUpperCase()}.`
                    msg = "Sinto muito, você perdeu!"
                    for (let i = 0; i < tam; i++) {
                        if (document.getElementById("letra" + i).value == "") {
                            document.getElementById("letra" + i).style.background = "#f91880"
                            let sub = palavraInit.charAt(i)
                            document.getElementById("letra" + i).value = sub
                        }
                    }
                    jogando = false
                    iniciarModal(msg,jogando)
                }
                //Teste de vitória
            } else if (acertos == tam) {
                msg = "Parabéns, você ganhou!"
                jogando = false
                iniciarModal(msg,jogando)
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
                letraDica = palavraInit.charAt(sort)
                verifica = true
                msg = `Dica: Letra ${letraDica}.`
                iniciarModal(msg,jogando)
            }
        }
        jog.focus()
    }
}

//Verificar se o input do jogador é uma letra
function lerLetra(letra) {
    letraCode = letra.charCodeAt(letra)
    if ((letraCode >= 65 && letraCode <= 90) || (letraCode >= 95 && letraCode <= 122)) {
        letraValida = true;
    }
    else {
        letraValida = false;
    }
}

//Dica - Função Preencher
function preencher() {
    removerModal()
    jog.value = letraDica
    jogar()
}

//Muda o array de palavras
function trocaTema() {
    switch (temas.value) {
        case "t1":
            biblioteca = ["xadrez", "zorra", "cascata", "cassino", "pensador", "picareta", "cone", "fome", "caminhar", "seriado",
                "simples", "assoprar", "sambar", "leitura", "cinema", "jogadores", "masmorra", "limonada", "leigo", "livraria",
                "mesclar", "muralha", "acreditar", "sanfona", "sapateado", "sentimento", "chamariz", "imaginar", "vestimenta", "latir"]
            qt = biblioteca.length - 1
            break

        case "t2":
            biblioteca = ["Akshan", "Aphelios", "Blitzcrank", "Camille", "Caitlyn", "Evelynn", "Ekko", "Illaoi", "Ivern", "Kennen",
                "Kindred", "Kled", "Leblanc", "Lulu", "Malzahar", "Morgana", "Nocturne", "Pantheon", "Qiyana", "Renekton",
                "Sejuani", "Sett", "Senna", "Singed", "Tryndamere", "Twitch", "Vladmir", "Xerath", "Yorick", "Yasuo"]
            qt = biblioteca.length - 1
            break

        case "t3":
            biblioteca = ["Vingadores", "Avatar", "Titanic", "Frozen", "Minions", "Aquaman", "Coringa", "Batman", "Aladdin", "Venom",
                "Zootopia", "Shrek", "Soul", "Valente", "Moana", "Divergente", "Ragnarok", "Godzilla", "Vikings", "Gravidade",
                "Megamente", "Norbit", "Duna", "Eternos", "Luca", "V", "Cruella", "Rio", "Carros", "Enrolados"]
            qt = biblioteca.length - 1
            break

        case "t4":
            biblioteca = ["Superstore", "Vikings", "Dark", "Ragnarok", "Suits", "Elite", "Atypical", "TeenWolf", "Glee", "Riverdalee",
                "Supergirl", "Gatunas", "Gotham", "Rebelde", "Lupin", "Lucifer", "Ruptura", "Outlander", "Sintonia", "Arcane",
                "You", "Spartacus", "Sherlock", "SmallVille", "Kingdom", "Lost", "Heroes", "Desalma", "Frontier", "Bridgerton"]
            qt = biblioteca.length - 1
            break

        case "t5":
            biblioteca = ["Skyrim", "Uncharted", "Forza", "Halo", "Terraria", "GTA", "Warframe", "Smite", "Lineage", "Fifa",
                "DayZ", "Valheim", "Minecraft", "Bioshock", "Ark", "Hitman", "Mario", "Sonic","Tetris", "Diablo", 
                "Warcraft", "Metalgear", "Portal", "Starcraft", "Pong", "Inside", "Valorant", "Simcity", "OverWatch", "Bloodborne"]
            qt = biblioteca.length - 1
            break
    }
}

//Controle do Modal
function iniciarModal(msg,jogo) {
    msgDica.innerHTML = msg
    modal.classList.add("mostrar")
    if(jogo){
        btnModal[0].style.display = "none"
        btnModal[1].style.display = "inline"
    }else if(!jogo){
        btnModal[1].style.display = "none"
        btnModal[0].style.display = "inline"
    }
}

function removerModal() {
    modal.classList.remove("mostrar")
}