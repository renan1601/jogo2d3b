const canvas = document.getElementById('jogo2D')
const ctx = canvas.getContext('2d')
const gravidade = 0.2
let gameOver = false
let contadorPulos = 0
let recordePulos = 0

if (localStorage.getItem('recordePulos')) {
    recordePulos = parseInt(localStorage.getItem('recordePulos'))
}

const fundo = new Image()
fundo.src = 'https://img.freepik.com/vetores-premium/fundo-do-jogo-da-ilustracao-da-cidade-a-noite-do-vetor_303920-20.jpg'

const capacete = new Image()
capacete.src = 'https://www.pngarts.com/files/12/Wheeling-Motocross-Free-PNG-Image.png'

const obstaculoImg = new Image()
obstaculoImg.src = 'https://images.vexels.com/content/158457/preview/car-police-bumper-illustration-b8c26f.png'

document.addEventListener('keypress', (e) => {
    if(e.code == 'Space' && personagem.pulando == false && !gameOver){
        personagem.velocidadey = 10
        personagem.pulando = true
        contadorPulos++
    }
})

const personagem = {
    x: 100,
    y: canvas.height - 50,
    altura: 50,
    largura: 50,
    velocidadey: 0,
    pulando: false
}

function desenharPersonagem(){
    ctx.drawImage(capacete, personagem.x, personagem.y, personagem.largura, personagem.altura)
}

function atualizarPersonagem(){
    if(personagem.pulando){
        personagem.velocidadey -= gravidade
        personagem.y -= personagem.velocidadey
        if(personagem.y >= canvas.height - 50){
            personagem.velocidadey = 0
            personagem.pulando = false
            personagem.y = canvas.height - 50
        }
    }
}

const obstaculo = {
    x: canvas.width - 50,
    y: canvas.height - 100,
    largura: 50,
    altura: 100,
    velocidadex: 3
}

function desenharObstaculo(){
    ctx.drawImage(obstaculoImg, obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura)
}

function atualizarObstaculo(){
    obstaculo.x -= obstaculo.velocidadex
    if(obstaculo.x <= 0 - obstaculo.largura){
        obstaculo.x = canvas.width
        obstaculo.velocidadex += 0.2
        let nova_altura = (Math.random() * 50) + 100
        obstaculo.altura = nova_altura
        obstaculo.y = canvas.height - nova_altura
    }
}

function detectarColisao(){
    if (
        personagem.x < obstaculo.x + obstaculo.largura &&
        personagem.x + personagem.largura > obstaculo.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y
    ) {
        gameOver = true
        if (contadorPulos > recordePulos) {
            recordePulos = contadorPulos
            localStorage.setItem('recordePulos', recordePulos)
        }
    }
}

function desenharGameOver(){
    ctx.fillStyle = 'white'
    ctx.font = '50px Arial'
    ctx.fillText('PERDEU LADRAO', canvas.width / 2 - 210, canvas.height / 2)
}

function desenharContadorPulos(){
    ctx.fillStyle = 'white'
    ctx.font = '20px Arial'
    ctx.fillText('Pulos: ' + contadorPulos, 20, 30)
    ctx.fillText('Recorde: ' + recordePulos, 20, 60)
}

function loop(){
    if (gameOver) {
        desenharGameOver()
        return
    }
    
    ctx.drawImage(fundo, 0, 0, canvas.width, canvas.height)
    desenharObstaculo()
    desenharPersonagem()
    desenharContadorPulos()
    atualizarPersonagem()
    atualizarObstaculo()
    detectarColisao()
    
    requestAnimationFrame(loop)
}

fundo.onload = () => {
    loop() 
}

capacete.onload = () => {
    loop() 
}

obstaculoImg.onload = () => {
    loop()
}
