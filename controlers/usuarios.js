const { request, response } = require("express");
const pool = require("../db/conexion");
const usuariosQueries = require("../models/usuarios");
const bcryptjs = require("bcryptjs");

const usuariosGet = async  (req = request, res = response) => {
  let {limite = 5, desde = 0} = req.query;

  desde = parseInt(desde);
  limite = parseInt(limite);

if (!Number.isInteger(limite) || !Number.isInteger(desde)){
  res.status(400).json({msg: "No se puede realizar esta consulta"});
  return;
}

  let conn;

  try{
    conn = await pool.getConnection();

    const usuarios = await conn.query(usuariosQueries.selectUsuarios,[parseInt(desde),parseInt(limite),]);
    
    res.json({usuarios});

  } catch (error) {
    console.log(error);
    res.status(500).json({msg: "por favor contactar con el administrador", error});
      } finally{
        if (conn) conn.end();
      }
      
  //res.json({ msg: "Hola a todos desde GET" });
};

const usuariosPost = async (req = request, res = response) => {
  const { nombre, email, password, status = 1 } = req.body;
let conn;

try{

  const salt = bcryptjs.genSaltSync ();
  const passwordHash = bcryptjs.hashSync(password,salt);

  conn = await pool.getConnection();

  const usuarios = await conn.query(usuariosQueries.insertUsuario,[nombre,email,passwordHash,status])
  res.json({usuarios});

} catch (error) {
  console.log(error);
  res.status(500).json({msg: "por favor contactar con el administrador", error});
    } finally{
      if (conn) conn.end();
    }

  
};

const usuariosPut = async (req = request, res = response) => {
  const { email } = req.query;
  const { nombre, status } = req.body;
  
  let conn;

  try{
    conn = await pool.getConnection();
  
    const usuarios = await conn.query(usuariosQueries.updateUsuario,[nombre,status,email]);
    res.json({usuarios});
  
  } catch (error) {
    console.log(error);
    res.status(500).json({msg: "por favor contactar con el administrador", error});
      } finally{
        if (conn) conn.end();
      }
  


  //res.status(400).json({ msg: "Hola a todos desde PUT", id });
};

const usuariosDelete = async (req = request, res = response) => {
  const { email } = req.query;

  let conn;

  try{
    conn = await pool.getConnection();
  
    const usuarios = await conn.query(usuariosQueries.deleteUsuario,[email]);
    res.json({usuarios});
  
  } catch (error) {
    console.log(error);
    res.status(500).json({msg: "por favor contactar con el administrador", error});
      } finally{
        if (conn) conn.end();
      }
  
  //res.status(500).json({ msg: "Hola a todos desde DELETE", usuario, password });
};

const usuarioSignin = async (req = request, res = response) => {
  const {email,password} = req.body;

  let conn;

  try{
  conn = await pool.getConnection();

  const usuarios = await conn.query(usuariosQueries.getUsuarioByEmail,[email]);
console.log(usuarios.length)
  if (usuarios.length===0){
    res.status(404).json({msg: `no se encontró el usuario ${email}`});
    return;
  }

  const passwordValida = bcryptjs.compareSync(password, usuarios[0].contrasena);
  

  if (!passwordValida) {
    res.status(401).json({msg: "La contraseña no coincide"});
    return;
  }

  res.json({msg: "Inicio de contraseña satisfactorio"});
  consolelog.log(usuarios[0].password);


  } catch (error) {
    console.error();
    res
    .status(500)
    .json({msg: "contacte al administrador", error});
     } finally {
       if (conn) conn.end();
     }
    }
//tarea hacer un endpoint para actualizar la contraseña



module.exports = { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuarioSignin };