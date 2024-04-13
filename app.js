//1- Invocacion a express
const express = require('express');
const app = express();

//2- Setear urlencoded para capturar los datos de los formularios
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//3 Inovar a dotenv
const dotenv= require('dotenv');
dotenv.config({path:'./env/.env'})

//4 -> Directorio Public
app.use('/resources',express.static('public'));
app.use('/resources',express.static(__dirname + '/public'));


//5 -> Establecer Motor de Plantillas ejs
app.set('view engine','ejs');

//6 -> Invocacion a bcryptjs
const bcryptjs = require('bcryptjs');

//7 -> Var de Session
const session = require('express-session');
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized: true
}));

//8 -> Invocar al modulo de conexion de la BD
const conexion = require('./database/db');

//9 -> Estableciendo las rutas
app.get('/Login', (req,res) => {
    res.render ('login');
})

app.get('/Registro', (req,res) => {
    res.render ('register');
})

app.get('/Inicio', (req,res) => {
    res.render ('inicio');
})

app.get('/Abonos', (req,res) => {
    res.render ('abonos');
})

app.get('/Clientes', (req,res) => {
    res.render ('clientes');
})

app.get('/Productos', (req,res) => {
    res.render ('productos');
})

app.get('/Vendedores', (req,res) => {
    res.render ('vendedores');
})

app.get('/Ventas', (req,res) => {
    res.render ('ventas');
})

//10 -> Registro
app.post('/register', async (req,res) => {
    const user = req.body.user;
    const name = req.body.name;
    const rol = req.body.rol;
    const pass = req.body.pass;
    console.log('Abriendo registrar');
    let passwordHaash = await bcryptjs.hash(pass ,8 );

    conexion.query('INSERT INTO usuarios SET ?', { Usuario:user , Nombre:name , Rol:rol , Contraseña:passwordHaash} , async(error, results)=>{
        if(error)
        {    console.log('Hubo un error al registrar error => ' + error ); }
        else
        {
            res.render('register',{
                alert: true,
                alertTitle: "Registro",
                alertMessage: "¡Registro de Usuario Exitoso!",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta:''
            });
        }
    });
})

//11 -> Autenticacion
app.post('/auth', async (req, res) => {
     const user = req.body.user;
     const pass = req.body.pass;

     let passwordHaash = await bcryptjs.hash(pass,8);

     if(user && pass)
     {
        conexion.query('Select * FROM usuarios WHERE usuario = ?', [user] , async (error,results) => {
            if(results.length == 0 || !(await bcryptjs.compare(pass, results[0].Contraseña)))
            {
                res.render('login',{
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Usuario y/o contraseña incorrectas",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta:'login'
                });
            }
            else
            {
                req.session.loggedin = true;
                req.session.name = results[0].Nombre;
                res.render('login',{
                    alert: true,
                    alertTitle: "Conexion Exitosa",
                    alertMessage: "¡Inicio de Sesión Correcto!",
                    alertIcon: 'success',
                    showConfirmButton: false,
                    timer: 2500,
                    ruta:''
                });
            }
        })
     }
     else 
     {
        res.render('login',{
            alert: true,
            alertTitle: "Advertencia",
            alertMessage: "¡Por favor ingrese un usuario y/o una contraseña!",
            alertIcon: 'warning',
            showConfirmButton: true,
            timer: false,
            ruta:'login'
        });
     }
})

// 12-> Auth pages
app.get('/', (req,res) => {
    if(req.session.loggedin)
    {
        res.render('inicio',{
            login: true,
            name: req.session.name
        });
    }
    else
    {
        res.render('login',{
            login: false,
            name: 'Debe iniciar sesión'
        });
    }
})

app.listen(4500,(req,res) => {
    console.log('SERVER LISTO SIIIIUUU en http://localhost:4500')
})
