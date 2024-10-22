const express = require('express')

const app = express()
const porta = 3333
const router = express.Router()

function mostraPorta() {
    console.log("Servidor rodando na porta", porta)
}

app.listen(porta, mostraPorta)
