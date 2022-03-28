/* 
    - 👍🏼 Agregar preguntas reales
    - 👍🏼 Agregar cuenta regresiva por cada pregunta 
    - 👍🏼 Funcion para deshabilitar botones al escoger una respuesta en funcion oprimirBoton()
    - 👍🏼 Agregar contador dinamico de preguntas respondidas
    - 👍🏼 Pantalla final con las respuestas acertadas e incorrectas
    - 👍🏼 Agregar pantalla de inicio de Quiz
    - 👍🏼 Corregir problema de imagen
    - 👍🏼 Validar Emojis
    - 👍🏼 Corregir botón 'Volver a jugar'
    - 👍🏼 Cambiar consulta de JSON por Fetch
*/

let pregunta
let preguntas = []
let btns = [
    select_id('btn1'),
    select_id('btn2'),
    select_id('btn3'),
    select_id('btn4'),
]
let contadorValue = 1
let contadorRespuestas = 0
let tiempoTotal = 10
let emoji = ''

async function obtenerPreguntas() {
    const response = await fetch('preguntas-quiz.json')
    return await response.json()
}

async function respuesta() {
    const data = await obtenerPreguntas()
    console.log(data);
    console.log(data.length);

    let escogerPreguntas = (Math.floor(Math.random() * data.length))
    pregunta = data[escogerPreguntas]

    preguntas_escogidas = [
        pregunta.respuesta,
        pregunta.incorrecta1,
        pregunta.incorrecta2,
        pregunta.incorrecta3
    ]

    preguntas_escogidas.sort(() => Math.random() - 0.5)

    select_id('question').innerHTML = '<p>' + pregunta.pregunta + '</p>'
    select_id('btn1').innerHTML = preguntas_escogidas[0]
    select_id('btn2').innerHTML = preguntas_escogidas[1]
    select_id('btn3').innerHTML = preguntas_escogidas[2]
    select_id('btn4').innerHTML = preguntas_escogidas[3]

    tiempoTotal = 10
    cuentaRegresiva()
    select_id('regresiveCounter').style.color = 'green'
    reiniciar_colores_respuestas()
    habilitarBotones()
    contador(contadorValue)
    contadorValue++
}

function iniciarQuiz() {
    select_id('iniciar-quiz').style.display = 'none'
    select_id('quiz-section').style.display = 'block'
    respuesta()
}

function volverJugar() {
    location.reload()
    select_id('iniciar-quiz').style.display = 'none'
    select_id('quiz-section').style.display = 'block'
    respuesta()
}

function cuentaRegresiva() {
    select_id('regresiveCounter').innerHTML = 'Tiempo restante: ' + tiempoTotal
    if (tiempoTotal === 0) respuesta()
    else {
        if (tiempoTotal < 4) select_id('regresiveCounter').style.color = 'red'
        tiempoTotal -= 1
        setTimeout('cuentaRegresiva()', 1000)
    }
}

function oprimirBoton(id) {

    if (preguntas_escogidas[id] == pregunta.respuesta) {
        btns[id].style.background = '#00b09d'
        btns[id].style.color = 'white'
        contadorRespuestas++
    } else {
        btns[id].style.background = '#eb4d4b'
        btns[id].style.color = 'white'
    }

    deshabilitarBotones(btns[id])
}

function deshabilitarBotones(id) {
    for (i = 0; i < btns.length; i++) { if (btns[i] !== id) btns[i].disabled = true }
}

function habilitarBotones() {
    for (const btn of btns) { btn.disabled = false }
}

function reiniciar_colores_respuestas() {
    for (const btn of btns) {
        btn.style.background = 'rgb(238, 237, 237)'
        btn.style.color = 'black'
    }
}

function contador(contador) {
    select_id('counter').innerHTML = 'Pregunta: ' + contador + ' de ' + 10 + ' - Correctas: ' + contadorRespuestas
    if (contador > 10) {
        select_id('quiz-section').style.display = 'none'
        select_id('final-section').style.display = 'block'
        select_id('final-section').innerHTML = '<p>Respuestas Correctas: ' + contadorRespuestas + ' de 10</p><p class="emoji">' + validadorEmoji(contadorRespuestas) + '</p><button class="btn-volver-jugar" onclick="volverJugar();">Volver a jugar</button>'

    }
}

function validadorEmoji(contador) {
    let unicodeText
    if (contador >= 8) {
        unicodeText = '1F60D'

    } else if (contador > 3 && contador < 8) {
        unicodeText = '1F60A'
    } else {
        unicodeText = '1F62D'
    }
    return emoji = String.fromCodePoint(parseInt(unicodeText, 16))
}

function select_id(id) {
    return document.getElementById(id)
}

function style(id) {
    return select_id(id).style
}