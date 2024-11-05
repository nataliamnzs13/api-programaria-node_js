const express = require("express") //iniciando o express
const router = express.Router() //configurando a primeira parte da rota
const cors = require('cors') //trazer o pacote cors, que permite consumir a API no front

const conectaBancodeDados = require('./bancoDeDados.js') //ligando ao arquivo banco de dados
conectaBancodeDados() //estou chamando a funçao que conecta o banco de datos 

const Mulher = require('./mulherModel.js')

const app = express() //iniciando o app
app.use(express.json())
app.use(cors())

const porta = 3333 //criar a porta

//GET
async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find()

        response.json(mulheresVindasDoBancoDeDados)
    } catch (error) {
        console.log(error)
    } 
}
//POST
async function criaMulher(request, response) {
    //instanciar o objeto
    const novaMulher = new Mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })
 
    try {
        const mulherCreada = await novaMulher.save()
        response.status(201).json(mulherCreada)
    } catch (error) {
        console.log(error)
    }
}
//PATCH
async function corrigeMulher(request, response) {
    try {
        //buscar mulher pelo id que viene por el parametro da url da requisicao
        const mulherEncontrada = await Mulher.findById(request.params.id)
        //condiciones para guardar las informaciones modificadas
        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }
        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem
        }
        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio
        }
        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao
        }

        //salvar a mulher con los nuevos dados
        const mulherActualizadaNoBancoDeDados = await mulherEncontrada.save()
        //resposta do objeto actualizado 
        response.json(mulherActualizadaNoBancoDeDados)
    } catch (error) {
        console.log(error)
    }
   }  
//DELETE 
async function deletaMulher(request, response) {

    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({ message: 'Mulher eliminada com sucesso la lista' })
    } catch (error) {
        console.log(error)
    }
}
//PORTA
function mostraPorta() {
    console.log("Servidor rodando na porta", porta)
}

app.use(router.get('/mulheres', mostraMulheres)) //rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)) //rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) //Rota PATCH /mulheres
app.use(router.delete('/mulheres/:id', deletaMulher)) //Rota DELETE
app.listen(porta, mostraPorta) //servidor ouvidno a porta
