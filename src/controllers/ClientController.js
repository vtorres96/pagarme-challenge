const Client = require('../models/Client')
const ValidationContract = require('../validators/validator')

module.exports = {
    async index(req, res) {
        try {
            const clients = await Client.find()
    
            return res.json(clients)
        } catch (error) {
            return res.status(400).json(error)
        }
    },

    async create(req, res) {
        let contract = new ValidationContract()
        
        contract.isRequired(req.body.name, 'Preencha o campo nome, campo obrigatório')
        contract.isRequired(req.body.email, 'Preencha o campo e-mail, campo obrigatório')
        contract.isRequired(req.body.password, 'Preencha o campo senha, campo obrigatório')

        contract.hasMinLen(req.body.name, 3, 'O nome deve conter ao menos 3 caracteres')
        contract.isEmail(req.body.email, 'E-mail inválido')
        contract.hasMinLen(req.body.password, 6, 'A senha deve conter ao menos 6 caracteres')

        // If Data Invalid
        if(!contract.isValid()){
            res.status(400).send(contract.errors()).end()
            return
        }

        try {
            const { 
                name, 
                email,
                password 
            } = req.body;

            const client = await Client.create({
                name,
                email,
                password
            })

            return res.json(client)
        } catch (error) {
            return res.status(400).json(error) 
        }
    }
} 