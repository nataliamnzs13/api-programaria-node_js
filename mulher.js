const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

function mostraMulher(request, response) {
    response.json({
        nome: 'Natalia Menezes',
        imagen: 'https://bit.ly/3LJIyOF',
        minibio: 'Desenvolvedora web'
    })
}

function mostraPorta() {
    console.log("Servidor rodando na porta", porta)
}

app.listen(porta, mostraPorta)
app.use(router.get('/mulher', mostraMulher))
