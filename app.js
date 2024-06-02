//1- Invocacion a express
const express = require('express');
const app = express();

// 9 => Invocar a Cookie Parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//2- Setear urlencoded para capturar los datos de los formularios 
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//3 Inovar a dotenv 
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'})

//4 -> Directorio Public
app.use('/resources',express.static('public'));
app.use('/resources',express.static(__dirname + '/public'));

//5 -> Establecer Motor de Plantillas ejs
app.set('view engine','ejs');

//8 -> Invocar enrutador
app.use('/',require('./router'));



/* //Para eliminar la cache 
app.use(function (req, res, next) 
{
    if (!req.user)
    {res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');}
    next();
});  */

app.listen(4500,(req,res) => {
    console.log('SERVER LISTO SIIIIUUU en http://localhost:4500')
})
