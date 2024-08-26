const { Endereco } = require('../models');

exports.createEndereco = async (req, res) => {
    try {
        const {Cep, Logradouro, Numero, Complemento, Bairro, Cidade, Estado, MunicipioIBGE} = req.body;
        const novoEndereco = await Endereco.create({
            Cep,
            Logradouro,
            Numero,
            Complemento,
            Bairro,
            Cidade,
            Estado,
            MunicipioIBGE,
        });
        res.status(201).json(novoEndereco);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar endereço', details: error.message});
    }
};

exports.getAllEnderecos = async (req, res) => {
    try {
        const enderecos = await Endereco.findAll();
        res.status(200).json(enderecos);
    
    } catch (error){
        res.status(500).json({ error: 'Erro ao buscar endereços', detais: error.message});
    }
};

exports.getEnderecoById = async (req, res) => {
    try{
        const { Id } = req.params;
        const endereco = await Endereco.findByPk(id);
        if(!endereco){
            return res.status(404).json({ error: 'Endereço não encontrado'});
        
        }
        res.status(200).json(endereco);
    } catch (error){
        res.status(500).json({ error: 'Erro ao buscar endereço', detils: error.message});
    }
};

exports.updateEndereco = async (req, res) => {
    try {
        const {Id} = req.params;
        const { Cep, Logradouro, Numero, Complemento, Bairro, Cidade, Estado, Municipio} = req.body;
        const endereco = await Endereco.findByPk(id);
        if(!endereco){
            return res.status(404).json({ error: 'Endereço não encontrado'});
        
        }
        endereco.Cep = Cep;
        endereco.Logradouro = Logradouro;
        endereco.Numero = Numero;
        endereco.Bairro = Bairro;
        endereco.Cidade = Cidade;
        endereco.Estado = Estado;
        endereco.MunicipioIBGE = MunicipioIBGE;
        await endereco.save();

        res.status(200).json(endereco);
    } catch (error){
res.status(500).json({error: 'Erro ao atualizar endereço', details: error.message});
    }
};

exports.deleteEndereco = async (req, res) => {
    try{
        const { Id } = req.params;
        const endereco = await Endereco.findByPk(id);
        if(!endereco){
            return res.status(404).json({ error: 'Endereço não encontrado'});
        
        }
        await endereco.destroy();
        res.status(204).send();
    } catch (error){
        res.status(500).json({ error: 'Erro ao deletar endereço', detils: error.message});
    }
};

const axios = require('axios');

exports.persisteEndereco = async (req, res) => {
    const cep = req.params.cep;
    if (cepRegex.test(cep)){
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
           
            try {
                const {cep, logradouro, unidade:numero, complemento, bairro, localidade:cidade, uf:estado, ibge:municipioIBGE} = response.data;
                const novoEndereco = await Endereco.create({
                    Cep : cep,
                    Logradouro: logradouro,
                    Numero: numero,
                    Complemento: complemento,
                    Bairro: bairro,
                    Cidade: cidade,
                    Estado: estado,
                    MunicipioIBGE: municipioIBGE,
                });
                res.status(201).json(novoEndereco);
            } catch (error) {
                res.status(500).json({ error: 'Erro ao criar endereço', details: error.message});
            }
        } catch (error){
            console.error('Erro ao fazer requisição:', error);
            res.status(500).send('ERRO AO CONSULTAR CEP');
        }
    } else {
         res.status(400).send("CEP Inválido. Formato: XXXXX-XXX");
        }
};
