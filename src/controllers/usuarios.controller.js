const Usuario = require('../models/usuario.model');

module.exports = {
  async index(req,res){
    const user = await Usuario.find();
    res.json(user);
  },
  async create(req,res){
    const {nome_usuario, email_usuario, tipo_usuario, senha_usuario} = req.body;
    let data = {};
    let user = await Usuario.findOne({email_usuario});

    if(!user){
      data = {nome_usuario,email_usuario,tipo_usuario,senha_usuario};
      user = await Usuario.create(data);
      console.log('findOne');
      return res.status(200).json(user);
    }else{
      return res.status(500).json({message: 'Usuário com e-mail já existente'});
    }
  },
  async details(req,res){
    const {_id} = req.params;
    const user = await Usuario.findOne({_id});
    res.json(user);
  },
  async delete(req,res){
    const {_id} = req.params;

    const user = await Usuario.findOneAndDelete({_id});

    return res.json(user);
  }
  
}