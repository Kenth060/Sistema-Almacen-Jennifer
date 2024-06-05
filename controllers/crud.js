const conexion = require('../database/db');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const {promisify} = require('util');

//Metodo Registro usuarios
exports.RegisterUser = async (req,res) =>
{
    try
    {
        const Id_Persona = req.body.ColabName;
        const user = req.body.ColabUser;
        const Rol = req.body.ColabRol;
        const Pass = req.body.ColabPass;
        let passHash = await bcryptjs.hash(Pass,8);



        conexion.query('Call AddUser(?,?,?,?);',[user,passHash,Rol,Id_Persona], (error, results) =>
        {
            if(error)
            { console.log('Hubo un error al agregar el usuario => '+error); }
            else
            { 
                res.cookie('registerMessage', 'Se ha registrado el usuario del Colaborador Correctamente', { httpOnly: true });
                res.redirect('/inicio');
            }
        });
    }
    catch (error)
    { console.log('Hubo un error al realizar esta operacion => '+error);}
};

// Metodo Iniciar sesion
exports.Login = async (req,res) =>
{
    try 
    {
        const user = req.body.user;
        const pass = req.body.pass;

        if( !user || !pass)
        {
            res.render('login',
            {
                alert:true,
                alertTitle: '¡Faltan Datos!',
                alertMessage: 'Por favor Ingrese un usuario y contraseña',
                alertIcon: 'warning',
                showConfirmButton: true ,
                timer: false,
                ruta: 'login'
            });
        }
        else
        {
            conexion.query('SELECT * FROM usuarios WHERE usuario = ?',[user], async (error,results) =>
            {
                if (error) 
                { console.log('Hubo un error al buscar al Colaborador con usuario '+user+' ,el error es => '+error); }
                else
                {
                    console.log(results);
                    if (results.length == 0 || !(await bcryptjs.compare(pass, results[0].Contraseña)) )
                    {
                        res.render('login',
                        {
                            alert:true,
                            alertTitle: 'Compruebe los Datos',
                            alertMessage: 'Usuario y/o contraseña Incorrecta',
                            alertIcon: 'error',
                            showConfirmButton: true ,
                            timer: false,
                            ruta: 'login'
                        });
                    }
                    else
                    {
                        const ID = results[0].Id_Persona;
                        const Rol = results[0].Rol;
                        const token = jwt.sign( { Id:ID , rol:Rol } , process.env.JWT_SECRETO , {
                            expiresIn: process.env.JWT_EXPIRES_TIME
                        });

                        console.log('El token del usuario es => '+ token);

                        const cookieOptions = {
                            expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                            httpOnly:true
                        }

                        res.cookie('jwt',token,cookieOptions);
                        res.render('login',
                        {
                            alert:true,
                            alertTitle: 'Operación Completada',
                            alertMessage: 'Se ha iniciado de Sesion Correctamente',
                            alertIcon: 'success',
                            showConfirmButton: true ,
                            timer: 2000,
                            ruta: 'inicio'
                        });

                    }
                }
            });   
        }
        
    } 
    catch (error) 
    {console.log('Hubo un error al tratar de iniciar sesion => '+error); }
};

//Middleware autenticacion de usuario
exports.isAuthenticated = async (req, res, next)=>
{
    if (req.cookies.jwt)
    {
        try 
        {
            const TokenDecodificado = await promisify(jwt.verify)(req.cookies.jwt , process.env.JWT_SECRETO);
            conexion.query('CALL BuscarUser(?)',[TokenDecodificado.Id], (error,results) => 
            {
                if(error)
                {
                    console.log('Error en la consulta del de usuario en la base de datos => ' + error);
                    res.redirect('/login');
                }
                else if(!results[0].length)
                { 
                    console.log('No existe ese usuario');
                    res.redirect('/login');
                }
                else
                {

                    //console.log ('Usuario:'+results[0][0].Usuario+ ' NombreUsuario:' +results[0][0].Nombre);

                    const userInfo =
                    {
                        Usuario: results[0][0].Usuario,
                        NombreUsuario: results[0][0].Nombre,
                    };
                    req.user = userInfo;
                    req.user.Rol = TokenDecodificado.rol;
                    /* console.log('Variables usuario');
                    console.log(req.user); */
                    return next();
                }
            });
        } catch (error) 
        { 
            console.log('Hubo un error al autenticar => '+error);
            res.redirect('/login');
        }
    }
    else
    { 
        res.redirect('/login');
    }
}

// Middleware autenticacion rol
exports.isGerente = (req, res, next) =>
{
    if (req.user && req.user.Rol === 'Gerente') 
    {
        return next();
    } 
    else 
    {
        res.cookie('errorMessage', 'Solo los gerentes pueden acceder a esta ruta', { httpOnly: true });
        res.redirect('/inicio');
    }
};

// Metodo Cerrar Sesion
exports.logout = (req,res) =>
{
    res.clearCookie('jwt');
    return res.redirect('/inicio');
} 

/* METODOS CRUD */
exports.AddClient = ( req, res) => 
{
    const Tipo = req.body.Tipo_cl;

    const Nombre = req.body.Nombre_cl;
    const Apellido = req.body.Apellido_cl;
    const Telefono = req.body.Telefono_cl;
    const Cedula = req.body.Cedula_cl;
    
    const Distrito = req.body.Distrito_cl;
    const Residencia = req.body.Residencia_cl;
    const PuntoReferencia = req.body.PuntoReferencia_cl;
    const Distancia = req.body.Distancia_cl;
    const Casa = req.body.Casa_cl; 

    conexion.query('CALL InsertarPersona(?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [Tipo,Nombre,Apellido,Cedula,Telefono,Distrito,Residencia,PuntoReferencia,Distancia,Casa,null],(error,results) => 
    {
        if(error)
        { 
            console.log('Hubo un error al Ingresar al cliente -> '+ error);
            conexion.query('SELECT * from MostrarClientes', (error,results) =>
            {
                if (error)
                { console.log('Ha ocurrido un error al mostrar los clientes, el error es => '+error); }
                else
                {
                    res.render('clientes', { clientes:results,
                        alert: true,
                        alertTitle: "No se pudo completar la operacion",
                        alertMessage: "No se pudo agregar al cliente, compruebe los datos e intente nuevamente",
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta:'clientes', 
                        UserRol:req.user.Rol
                    })
                }
            })
        }
        else 
        {
            console.log('Cliente Ingresado Correctamente');
            console.log('VALOR EN REQ => '+ req.user.Rol);
            conexion.query('SELECT * from MostrarClientes', (error,results) =>
            {
                if (error)
                { console.log('Ha ocurrido un error al mostrar los clientes, el error es => '+error); }
                else
                {
                    res.render('clientes', { clientes:results,
                        alert: true,
                        alertTitle: "Cliente agregado",
                        alertMessage: "¡Se agrego al cliente correctamente!",
                        alertIcon: 'success',
                        showConfirmButton: true,
                        timer: false,
                        ruta:'clientes',
                        UserRol: req.user.Rol
                    })
                }
            }) 
        }
    })
}

exports.UpdateClient = (req, res) => 
{
    const Id_Cliente = req.body.Id_cl;
    const Nombre = req.body.Nombre_cl;
    const Apellido = req.body.Apellido_cl;
    const Telefono = req.body.Telefono_cl;
    const Cedula = req.body.Cedula_cl;
    
    const Distrito = req.body.Distrito_cl;
    const Residencia = req.body.Residencia_cl;
    const PuntoReferencia = req.body.PuntoReferencia_cl;
    const Distancia = req.body.Distancia_cl;
    const Casa = req.body.Casa_cl; 
    const tipo = req.body.tipo_edit; 
    let ruta;

    if(tipo == 'Cliente')
    {ruta='clientes'}
    else if(tipo == 'Proveedor')
    {ruta='proveedores'}

    

    conexion.query('CALL EditarPersona(?,?, ?, ?, ?, ?, ?, ?, ?, ?,?)', [Id_Cliente,Cedula,Nombre,Apellido,Telefono,Distrito,Residencia,PuntoReferencia,Distancia,Casa,tipo],(error,results) => 
    {
        if(error)
        { 
            console.log('Ha ocurrido un error al editar al cliente, el error es => '+error);
            conexion.query('SELECT * from MostrarClientes', (error,results)=>
            {
                if(error)
                { console.log(`Ha ocurrido un error al mostrar los ${tipo}, el error es => ${error}`); }
                else
                {
                    res.render('clientes', { clientes:results,
                        alert: true,
                        alertTitle: "No se pudo completar la operacion",
                        alertMessage: `No se pudo editar al ${tipo}, compruebe los datos e intente nuevamente`,
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta:ruta,
                        UserRol:req.user.Rol
                    })
                }
            })
        
        }
        else 
        {
            conexion.query("SELECT * from MostrarClientes", (error,results)=>{
                if(error)
                { console.log(`Ha ocurrido un error al mostrar los ${tipo}, el error es => ${error}`); }
                else
                {
                    res.render('clientes', { clientes:results,
                        alert: true,
                        alertTitle: `${tipo} editado`,
                        alertMessage: `¡Se edito al ${tipo} correctamente!`,
                        alertIcon: 'success',
                        showConfirmButton: true,
                        timer: false,
                        ruta:ruta,
                        UserRol:req.user.Rol
                    })
                }
            })
        }
    })
}

exports.AddColaborador = ( req, res) => 
{
    const Tipo = req.body.selectCargoC;

    console.log(Tipo)

    const Nombre = req.body.Nombre_vd;
    const Apellido = req.body.Apellido_vd;
    const Telefono = req.body.Telefono_vd;
    const Cedula = req.body.Cedula_vd;
    
    const Distrito = req.body.Distrito_vd;
    const Residencia = req.body.Residencia_vd;
    const PuntoReferencia = req.body.PuntoReferencia_vd;
    const Distancia = req.body.Distancia_vd;
    const Casa = req.body.Casa_vd;

    const Usuario_vendedor = req.body.uservd;

    conexion.query('CALL InsertarPersona(?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [Tipo,Nombre,Apellido,Cedula,Telefono,Distrito,Residencia,PuntoReferencia,Distancia,Casa,null],(error,results) => 
    {
        if(error)
        { 
            console.log('Hubo un error al añadir =>'+ error);

            conexion.query('SELECT * FROM mostrarcolaboradores', (error,results)=>
            {
                if(error)
                { console.log('Ha ocurrido un error al mostrar los vendedores, el error es => '+error);  }
                else
                {
                    res.render('vendedores', { 
                        vendedores:results,
                        alert: true,
                        alertTitle: "No se pudo completar la operacion",
                        alertMessage: "No se pudo agregar al colaborador, compruebe los datos e intente nuevamente",
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta:'colaboradores',
                        UserRol: req.user.Rol
                    })
                }
            })
        
        }
        else 
        {
            conexion.query('SELECT * FROM mostrarcolaboradores', (error,results)=>
            {
                if(error)
                { console.log('Ha ocurrido un error al mostrar los colaboradores, el error es => '+error); }
                else
                {
                    res.cookie('username', Usuario_vendedor, { httpOnly: true });
                    res.cookie('cedula', Cedula, { httpOnly: true });

                    res.render('vendedores', { vendedores:results,
                        alert: true,
                        alertTitle: "Colaborador agregado",
                        alertMessage: "¡Se agrego al colaborador correctamente!",
                        alertIcon: 'success',
                        showConfirmButton: true,
                        timer: false,
                        ruta:'register',
                        UserRol: req.user.Rol
                    })
                }
            })
        }
    }) 
}

exports.UpdateColaborador = (req, res) =>
{
    const Id_Vendedor = req.body.Id_vd;
    const Nombre = req.body.Nombre_vd;
    const Apellido = req.body.Apellido_vd;
    const Telefono = req.body.Telefono_vd;
    const Cedula = req.body.Cedula_vd;
    
    const Distrito = req.body.Distrito_vd;
    const Residencia = req.body.Residencia_vd;
    const PuntoReferencia = req.body.PuntoReferencia_vd;
    const Distancia = req.body.Distancia_vd;
    const Casa = req.body.Casa_vd; 
    const Tipo = req.body.selectCargoC;

    

    conexion.query("CALL EditarPersona(?,?, ?, ?, ?, ?, ?, ?, ?, ?,?)", [Id_Vendedor,Cedula,Nombre,Apellido,Telefono,Distrito,Residencia,PuntoReferencia,Distancia,Casa,Tipo],(error,results) => 
    {
        if(error)
        { 
            console.log('Hubo un error al Editar al Vendedor => ' +error);

            conexion.query("SELECT * from mostrarcolaboradores", (error,results)=>
            {
                if(error)
                { console.log('Ha ocurrido un error al mostrar los colaboradores, el error es => '+error); }
                else
                {
                    res.render('vendedores', { vendedores:results,
                        alert: true,
                        alertTitle: "No se pudo completar la operacion",
                        alertMessage: "No se pudo editar al colaborador, compruebe los datos e intente nuevamente",
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta:'colaboradores',
                        UserRol: req.user.Rol
                    })
                }
            })
        
        }
        else 
        {
            conexion.query("SELECT * from mostrarcolaboradores", (error,results) =>
            {
                if(error)
                { console.log('Ha ocurrido un error al mostrar los colaboradores, el error es => '+error); }
                else
                {
                    res.render('vendedores', { vendedores:results,
                        alert: true,
                        alertTitle: "Colaborador editado",
                        alertMessage: "¡Se edito al colaborador correctamente!",
                        alertIcon: 'success',
                        showConfirmButton: true,
                        timer: false,
                        ruta:'colaboradores',
                        UserRol: req.user.Rol
                    })
                }
            })
        }
    })  
} 

exports.AddProduct = ( req, res) => 
{
    const Marca = req.body.Marca;
    //const Existencia = req.body.Existencia;
    //const Precio_Compra = req.body.Precio_Compra;
    //const Precio_Venta = req.body.Precio_Venta;
    const Color = req.body.Color;
    const Tipo = req.body.Tipo;
    //const Fecha_Ingreso = req.body.Fecha_Ingreso;
    const Categoria = req.body.Categoria_Prod;

    const Talla = req.body.Talla;
    const Modelo = req.body.Modelo;
    const Clasificacion = req.body.Clasificacion;
    const Dimensiones = req.body.Dimensiones;
    const UnidadMedida = req.body.Unidad_Medida;
    const Fecha_Vencimiento = req.body.Fecha_Vencimiento;

    const params = [
        Marca.toUpperCase(),
        //Precio_Compra,
        //Precio_Venta,
        Color.toUpperCase(),
        Tipo.toUpperCase(),
        //Fecha_Ingreso,
        Categoria,
        Talla.toUpperCase(),
        Modelo.toUpperCase(),
        Clasificacion.toUpperCase(),
        Dimensiones.toUpperCase(),
        UnidadMedida.toUpperCase(),
        Fecha_Vencimiento
      ];


    conexion.query('CALL AddProducto( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', params, (error, results) => 
        {
            if(error)
            { 
                console.log('Hubo un error al agregar el producto => '+error);

                res.render('productos', 
                { 
                    alert: true,
                    alertTitle: "No se pudo completar la operacion",
                    alertMessage: "No se pudo agregar el Producto, compruebe los datos e intente nuevamente",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    cat: Categoria,
                    UserRol: req.user.Rol
                })
            }
            else 
            {
                res.render('productos', 
                {
                    alert: true,
                    alertTitle: "Producto agregado",
                    alertMessage: "¡Se agrego el Producto correctamente!",
                    alertIcon: 'success',
                    showConfirmButton: true,
                    timer: false,
                    cat: Categoria,
                    UserRol: req.user.Rol
                })
            }
        }) 
}

exports.UpdateProduct = (req, res) => 
{
    const Id_Producto = req.body.Id_Prod;
    const Categoria = req.body.Categoria_Prod;

    const Marca = req.body.Marca;
    const Existencia = req.body.Existencia;
    const Precio = req.body.Precio;
    const Color = req.body.Color;
    const Tipo = req.body.Tipo;
    const Fecha = req.body.Fecha;

    const Talla = req.body.Talla;
    const Modelo = req.body.Modelo;
    const Clasificacion = req.body.Clasificacion;
    const Dimensiones = req.body.Dimensiones;
    const UnidadMedida = req.body.Unidad_Medida;

    conexion.query('CALL update_producto(?,?,?,?,?,?,?,?,?,?,?,?)', [Id_Producto,Marca,Existencia,Precio,Color,Tipo,Fecha,Talla,Modelo,Clasificacion,Dimensiones,UnidadMedida],(error,results) => {
        if(error)
        { 
            console.log('Hubo un error al actualizar el producto => '+error);

            res.render("productos", {
                alert: true,
                alertTitle: "No se pudo completar la operacion",
                alertMessage: "No se pudo editar el Producto, compruebe los datos e intente nuevamente",
                alertIcon: 'error',
                showConfirmButton: true,
                timer: false,
                cat: Categoria,
                UserRol: req.user.Rol
            }); 
        }
        else 
        {
            console.log('Se actualizo el producto correctamente');

            res.render("productos", {
                alert: true,
                alertTitle: "Operación Completada",
                alertMessage: "Se edito el Producto Correctamente",
                alertIcon: 'success',
                showConfirmButton: true,
                timer: false,
                cat: Categoria,
                UserRol: req.user.Rol
            });
        }
    })


} 

exports.AddVenta = (req,res) => 
{
    const DatosVenta = req.body;

    console.log(DatosVenta);

    conexion.query('CALL InsertarVenta(?,?,?,?,?,?,?,?)',[DatosVenta.Id_Venta, DatosVenta.Tipo_Venta, DatosVenta.Cliente, DatosVenta.Vendedor, DatosVenta.Fecha_Venta, DatosVenta.Total, DatosVenta.Plazo , DatosVenta.Frecuencia_Abonos ], (error,results) =>
    {
        if(error)
        { 
            console.log('Hubo un error al agregar la Venta => '+error);
            res.status(500).json({ success: false, message: 'Hubo un error al agregar la Venta' });
        }
        else
        {
            console.log('Venta Agregada');
            DatosVenta.Productos.forEach((detalle_producto) => 
            { 
                conexion.query('CALL InsertarDetallesVenta(?,?,?,?)',[DatosVenta.Id_Venta, detalle_producto.IdProducto, detalle_producto.Cantidad, detalle_producto.Precio], (error,results) =>
                {
                    if(error)
                    {console.log('Hubo un error al agregar el producto a la venta => '+error);}
                    else
                    {console.log('Producto Agregado Correctamente :D');}
                })
            });
            
            res.status(200).json({ success: true, message: 'Venta agregada correctamente' });
        }

    })

} 

exports.AddAbono = (req,res) => 
{
    const ID_Venta = req.body.Id_Venta_Abono;
    const Monto = req.body.Monto_Abono;
    const Fecha = req.body.Fecha_Abono;

    conexion.query('INSERT INTO abonos (Id_Venta,Monto_Abonado,Fecha_Abono) VALUES (?,?,?)', [ID_Venta,Monto,Fecha], (error,results) =>
    {
        if(error)
        { 
            console.log('Hubo un error al registrar el abono => '+error); 

            conexion.query("SELECT * from showventascredito  ", (error, results) => 
                {
                  if (error) 
                  { console.log( "Ha ocurrido un error al mostrar las Ventas, el error es => " + error); } 
                  else 
                  {  
                    const Ventas = results.map(venta => 
                        {
                          const fecha = new Date(venta.Fecha_Venta);
                          const opciones = { day: '2-digit', month: 'long', year: 'numeric' };
                          const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
                          
                          return {
                            ...venta,
                            Fecha_Venta: fechaFormateada
                          };
                        });
                
                    res.render("abonos",{ Ventas_Credito:Ventas,
                        alert: true,
                        alertTitle: "No se pudo completar la operacion",
                        alertMessage: `No se pudo agregar al abono a la venta N° ${ID_Venta}, compruebe los datos e intente nuevamente`,
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta:'abonos',
                        UserRol: req.user.Rol
                    });
                  }
                    
                });

        }
        else
        {
            console.log('Abono Agregado');
            console.log("Abono Venta N° "+ID_Venta+'\nMONTO => '+Monto+'\nFecha => '+Fecha);

            conexion.query("SELECT * from showventascredito  ", (error, results) => 
                {
                  if (error) 
                  { console.log( "Ha ocurrido un error al mostrar las Ventas, el error es => " + error); } 
                  else 
                  {  
                    const Ventas = results.map(venta => 
                        {
                          const fecha = new Date(venta.Fecha_Venta);
                          const opciones = { day: '2-digit', month: 'long', year: 'numeric' };
                          const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
                          
                          return {
                            ...venta,
                            Fecha_Venta: fechaFormateada
                          };
                    });
                
                    res.render("abonos",{ Ventas_Credito:Ventas,
                        alert: true,
                        alertTitle: "Abono Agregado",
                        alertMessage: `El abono a la venta N° ${ID_Venta} ha sido agregado correctamente`,
                        alertIcon: 'success',
                        showConfirmButton: true, 
                        timer: false,
                        ruta:'abonos',
                        UserRol: req.user.Rol
                    });
                  }
                    
                });
        }

    })

    

}

exports.DevolverProducto = (req,res) =>
{
    const DatosDevolucion = req.body;

    console.log(DatosDevolucion);

    
    conexion.query('INSERT INTO productos_devueltos (`Id_Producto`, `Id_Venta`, `Cantidad_Devuelta`, `Fecha_Devolucion`, `Motivo`) VALUES (?,?,?,?,?)',[DatosDevolucion.Id_Producto,DatosDevolucion.Id_Venta,DatosDevolucion.Cantidad_Devuelta,DatosDevolucion.Fecha_Devolucion,DatosDevolucion.Motivo], (error,results) =>
        {
            if(error)
            { 
                console.log('Hubo un error al agregar el producto Devuelto => '+ error);
                res.status(500).json({ success: false, message: 'Hubo un error al agregar el producto Devuelto'});
            }
            else
            {
                console.log('Producto Devuelto');
                res.status(200).json({ success: true, message: 'Venta agregada correctamente' });
            }
    
        })
    
}

exports.AddProveedor = ( req, res) => 
{
        const Tipo = req.body.Tipo_pro;
        
        const Nombre = req.body.Nombre_pro;
        const Apellido = req.body.Apellido_pro;
        const Telefono = req.body.Telefono_pro;
        const Cedula = req.body.Cedula_pro;
            
        const Distrito = req.body.Distrito_pro;
        const Residencia = req.body.Residencia_pro;
        const PuntoReferencia = req.body.PuntoReferencia_pro;
        const Distancia = req.body.Distancia_pro;
        const Casa = req.body.Casa_pro;
        const Comercio = req.body.Comercio_pro 
    
        console.log('Tipo:', Tipo);
        console.log('Nombre:', Nombre);
        console.log('Apellido:', Apellido);
        console.log('Telefono:', Telefono);
        console.log('Cedula:', Cedula);
        console.log('Distrito:', Distrito);
        console.log('Residencia:', Residencia);
        console.log('Punto de Referencia:', PuntoReferencia);
        console.log('Distancia:', Distancia);
        console.log('Casa:', Casa);
        console.log('Comercio:', Comercio);
        
        conexion.query('CALL InsertarPersona(?,?, ?, ?, ?, ?, ?, ?, ?, ?,?)', [Tipo,Nombre,Apellido,Cedula,Telefono,Distrito,Residencia,PuntoReferencia,Distancia,Casa,Comercio],(error,results) => 
        {
            if(error)
            { 
                console.log('Hubo un error al Ingresar al proveedor -> '+ error);
                conexion.query('SELECT * from MostrarProveedores', (error,results) =>
                {
                    if (error)
                    { console.log('Ha ocurrido un error al mostrar los proveedores, el error es => '+error); }
                    else
                    {
                        res.render('Proveedores', { proveedores:results,
                            alert: true,
                            alertTitle: "No se pudo completar la operacion",
                            alertMessage: "No se pudo agregar al proveedor, compruebe los datos e intente nuevamente",
                            alertIcon: 'error',
                            showConfirmButton: true,
                            timer: false,
                            ruta:'Proveedores',
                            UserRol: req.user.Rol
                        })
                    }
                })
            }
            else 
            {
                console.log('Proveedor Ingresado Correctamente');
                conexion.query('SELECT * from MostrarProveedores', (error,results) =>
                {
                    if (error)
                    { console.log('Ha ocurrido un error al mostrar los proveedores, el error es => '+error); }
                    else
                    {
                        res.render('Proveedores', { proveedores:results,
                            alert: true,
                            alertTitle: "Proveedor agregado",
                            alertMessage: "¡Se agrego al proveedor correctamente!",
                            alertIcon: 'success',
                            showConfirmButton: true,
                            timer: false,
                            ruta:'Proveedores',
                            UserRol: req.user.Rol
                        })
                    }
                }) 
            }
})}

exports.AddCompra = (req,res) => 
{
    const DatosCompra = req.body;
    
    console.log(DatosCompra);
    
    conexion.query('CALL InsertarCompra(?,?,?,?,?)',[DatosCompra.Id_Compra, DatosCompra.Proveedor, DatosCompra.Comprador, DatosCompra.Fecha_Compra,DatosCompra.Total_compra], (error,results) =>
    {
        if(error)
        { 
            console.log('Hubo un error al agregar la Compra => '+error);
            res.status(500).json({ success: false, message: 'Hubo un error al agregar la Compra' });
        }
        else
        {
            console.log('Compra Agregada');
            DatosCompra.Productos.forEach((detalle_producto) => 
            { 
                conexion.query('CALL InsertarDetallesCompra(?,?,?,?,?)',[DatosCompra.Id_Compra, detalle_producto.IdProducto, detalle_producto.Cantidad, detalle_producto.Precio_Compra,detalle_producto.Precio_Venta], (error,results) =>
                {
                    if(error)
                    {console.log('Hubo un error al agregar el producto a la venta => '+error);}
                    else
                    {console.log('Producto Agregado Correctamente :D');}
                })
            });
                
            res.status(200).json({ success: true, message: 'Compra agregada correctamente' });
        }

    }) 
    
} 
