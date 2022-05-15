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
let pontuacao = 0
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
let msgDisplay
let msg
let solicitaDica = 0

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
    msgDisplay = document.getElementById("msg")
    cabeca = document.getElementById("cabeca")
    letrasDigitDisplay = document.getElementById("letrasDigitadas")
    msgDica = document.getElementById("msgDica")
    modal = document.getElementById("msgModal")
    temas = document.getElementById("temas")
    btnModal = document.getElementsByClassName("btnModal")

    inicio()
}

//Preparo para um novo jogo
function inicio() {
    removerModal()
    solicitaDica = 0
    msgDisplay.innerHTML = ""
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
        letraDigitada = jog.value.toUpperCase()
        lerLetra(letraDigitada)
        //Testando se a letra já foi digitiada
        for (let i = 0; i < 30; i++) {
            if (verifLetra[i] == letraDigitada) {
                laco = false
                msgDisplay.innerHTML = "Você já tentou essa letra!"
            }
        }
        //Testando se é uma letra válida
        if (letraDigitada == "") {
            msgDisplay.innerHTML = "Digite uma letra!"
        } //Testando se algo foi digitado
        else if (!letraValida) {
            msgDisplay.innerHTML = "Digite apenas letras!"
        } else if (laco) {
            verifLetra[cont] = letraDigitada
            let letra
            let pesq
            let letraTmp
            msgDisplay.innerHTML = ""
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
                    msgDica.style.color = "white"
                    pontuacao = 0
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
                pontuacao += 1
                if(pontuacao < 10){
                    msg = `Parabéns, você ganhou!<br>Sua pontuação atual é de: ${pontuacao}`
                }else {
                    msgDica.style.color = "#00ba7c"
                    switch(temas.value){
                        case "t1":
                            msg = `Você acertou ${pontuacao} palavras seguidas!<br>Você é um mestre no modo padrão!!!`
                            break
                        
                        case "t2":
                            msg = msg = `Você acertou ${pontuacao} palavras seguidas!<br>Você é um desafiante no LoL!!!`
                            break

                        case "t3":
                            msg = msg = `Você acertou ${pontuacao} palavras seguidas!<br>Você é um mestre dos filmes!!!`
                            break

                        case "t4":
                            msg = msg = `Você acertou ${pontuacao} palavras seguidas!<br>Você é um mestre das séries!!!`
                            break

                        case "t5":
                            msg = msg = `Você acertou ${pontuacao} palavras seguidas!<br>Você é um mestre dos jogos!!!`
                            break

                        case "t6":
                            msg = msg = `Você acertou ${pontuacao} palavras seguidas!<br>Você é um mestre dos animes!!!`
                            break

                        case "t7":
                            msg = msg = `Você acertou ${pontuacao} palavras seguidas!<br>Você é um mestre do Kpop!!!`
                            break
                    }
                }
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
    if ((jogando)&&(solicitaDica<2)) {
        let verifica = false
        let sort = Math.floor(Math.random() * tam)
        while (!verifica) {
            if (document.getElementById("letra" + sort).value != "") {
                sort = Math.floor(Math.random() * tam)
            } else {
                letraDica = palavraInit.charAt(sort)
                verifica = true
                solicitaDica += 1
                msg = `Dica: Letra ${letraDica}.`
                iniciarModal(msg,jogando)
            }
        }
    } else if ((jogando)&&(solicitaDica>=2)){
        solicitaDica += 1
        msg = `Você já usou todas as dicas desta rodada!`
        iniciarModal(msg,jogando)
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

        case "t6":
            biblioteca = ["Rezero", "Naruto", "Danganronpa", "Pokemon", "Digimon", "Noragami", "Another", "Fate", "Castlevania", "Hellsing",
                "Kakeguri", "Dororo", "Boruto", "Berserker", "Bleach", "Haikyuu", "Beyblade", "Orange", "Beatless", "Ultraman", 
                "Aggretsuko", "Durarara", "Shiki", "Shirobako", "Magi", "Sasuke", "Pain", "Kakashi", "Madara", "Hashirama", 
                "Goku", "Mikasa", "Eren", "Takemichi", "Hinata", "Naoto", "Kira", "L", "Luffy", "Ash", 
                "Akame", "Yumeko", "Monokuma", "Chihiro", "Emilia", "Pikachu", "Dracula", "Alucard", "Sarada", "Guts", 
                "Shoyo", "Kenma", "Shinoa", "Guren", "Meliodas", "Izumi", "Kirito", "Ken", "Kaneki", "Touka"]
            qt = biblioteca.length -1
            break

        case "t7":
            biblioteca = ["SKZ", "TXT", "BTS", "ATEEZ", "Jungkook", "Hyunjin", "Felix", "Taehyung", "SHINee", "LeeKnow", 
                "Wooyoung", "Enhypen", "Yeonjun", "Beomgyu", "PSY", "ITZY", "BLACKPINK", "Lisa", "Suga", "AESPA", 
                "Karina", "CL", "BIGBANG", "SUPERJUNIOR", "TWICE", "Taehyun", "SOOBIN", "Bangchan", "Changbin", "Jimin",
                "Rose", "Jisoo", "Hyuna", "Dawn", "EXO", "Mamamoo", "Nmixx", "MCND", "NCT", "Seventeen",
                "TVXQ", "Namjoon", "HueningKai", "IKON", "Ryunjin", "Chaeryeong", "Lia", "MonstaX", "Seungmin", "JHope",
                "LeSserafim", "RedVelvet", "Bahiyyih", "Winter", "Jessi", "Minho", "Jonghyun", "Key", "Onew", "Taemin", 
                "Kai", "Sunoo", "Jake", "Jay", "Jungwon", "Treasure", "IVE", "Jin", "Jeongin", "Jisung"]
            qt = biblioteca.length - 1
            break
    }
    pontuacao = 0
    msgDica.style.color = "white"
    inicio()
}

//Controle do Modal
function iniciarModal(msg,jogo) {
    msgDica.innerHTML = msg
    modal.classList.add("mostrar")
    if((jogo)&&(solicitaDica>=3)){
        btnModal[0].classList.remove("ocultar")
        btnModal[1].classList.add("ocultar")
    }else if(jogo){
        btnModal[0].classList.add("ocultar")
        btnModal[1].classList.remove("ocultar")
    }else if(!jogo){
        btnModal[1].classList.add("ocultar")
        btnModal[0].classList.remove("ocultar")
    }
}

function removerModal() {
    modal.classList.remove("mostrar")
}