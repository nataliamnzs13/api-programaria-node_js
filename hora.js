const express = require("express")
const router = express.Router()

const app = express()
const PORTA = 3333

function mostrarHora(request, response) {
    const data = new Date()
    const hora = data.toLocaleTimeString('pt-BR')
    response.send(hora)
}

function mostrarPorta() {
    console.log("Servidor rodando na porta", porta)
}

app.listen(PORTA, mostrarPorta)
app.use(router.get('/hora', mostrarHora))