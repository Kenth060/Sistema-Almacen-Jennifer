const express = require('express');
const router = express.Router();

const conexion = require('./database/db');

 //Estableciendo las rutas
router.get('/Login', (req,res) => {
    res.render ('login');
})

router.get('/Registro', (req,res) => {
    res.render ('register');
})

router.get('/Inicio', (req,res) => {
    res.render ('inicio');
})

router.get('/Abonos', (req,res) => {
    res.render ('abonos');
})

router.get('/Clientes', (req,res) => {

    conexion.query('CALL ShowClients()', (error,results)=>{
        if(error)
        { console.log('Ha ocurrido un error al mostrar los clientes, el error es => '+error); }
        else
        {
            res.render('clientes', {clientes:results})
           // res.send(results);
        }
    })
})

router.get('/Productos', (req,res) => {
    res.render ('productos');
})

router.get('/Vendedores', (req,res) => {
    res.render ('vendedores');
})

router.get('/Ventas', (req,res) => {
    res.render ('ventas');
})

router.get('/EditClient/:id', (req,res) => {
    const id = req.params.id;

    conexion.query('CALL SearchClient(?)', [id], (error,results) => {
        if(error)
        { console.log('Hubo un error al obtener informacion de ese cliente, error => '+error);}
        else
        { res.render ('editClient.ejs' , {cliente:results[0][0]}); }
           // res.send(results[0][0]);}
        
    })
})

router.get('/DeleteClient/:ID', (req,res) => {
    const id = req.params.ID;
    conexion.query('DELETE FROM cliente where Id_Cliente = ?',[id],(error,results) => {
        if(error)
        {   throw error;    }
        else
        { res.redirect('/Clientes');}
    })
})



const crud = require('./controllers/crud');
router.post('/AddClient',crud.AddClient);
router.post('/UpdateClient',crud.UpdateClient);



module.exports = router;