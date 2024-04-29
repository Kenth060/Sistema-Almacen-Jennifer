const conexion = require('../database/db');

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

    conexion.query('CALL InsertarPersona(?,?, ?, ?, ?, ?, ?, ?, ?, ?)', [Tipo,Nombre,Apellido,Cedula,Telefono,Distrito,Residencia,PuntoReferencia,Distancia,Casa],(error,results) => {
        if(error)
        { 
            console.log('Hubo un error al Ingresar al cliente -> '+ error);
            conexion.query('SELECT * from MostrarClientes', (error,results)=>
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
                        ruta:'clientes'
                    })
                }
            })
        }
        else 
        {
            console.log('Cliente Ingresado Correctamente');
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
                        ruta:'clientes'
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

    conexion.query('CALL EditarPersona(?,?, ?, ?, ?, ?, ?, ?, ?, ?)', [Id_Cliente,Cedula,Nombre,Apellido,Telefono,Distrito,Residencia,PuntoReferencia,Distancia,Casa],(error,results) => 
    {
        if(error)
        { 
            console.log('Ha ocurrido un error al editar al cliente, el error es => '+error);
            conexion.query('SELECT * from MostrarClientes', (error,results)=>
            {
                if(error)
                { console.log('Ha ocurrido un error al mostrar los clientes, el error es => '+error); }
                else
                {
                    res.render('clientes', { clientes:results,
                        alert: true,
                        alertTitle: "No se pudo completar la operacion",
                        alertMessage: "No se pudo editar al cliente, compruebe los datos e intente nuevamente",
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta:'clientes'
                    })
                }
            })
        
        }
        else 
        {
            conexion.query("SELECT * from MostrarClientes", (error,results)=>{
                if(error)
                { console.log('Ha ocurrido un error al mostrar los clientes, el error es => '+error); }
                else
                {
                    res.render('clientes', { clientes:results,
                        alert: true,
                        alertTitle: "Cliente editado",
                        alertMessage: "¡Se edito al cliente correctamente!",
                        alertIcon: 'success',
                        showConfirmButton: true,
                        timer: false,
                        ruta:'clientes'
                    })
                }
            })
        }
    })
}

exports.AddVendedor = ( req, res) => 
{
    const Tipo = req.body.Tipo_vd;

    const Nombre = req.body.Nombre_vd;
    const Apellido = req.body.Apellido_vd;
    const Telefono = req.body.Telefono_vd;
    const Cedula = req.body.Cedula_vd;
    
    const Distrito = req.body.Distrito_vd;
    const Residencia = req.body.Residencia_vd;
    const PuntoReferencia = req.body.PuntoReferencia_vd;
    const Distancia = req.body.Distancia_vd;
    const Casa = req.body.Casa_vd; 

    conexion.query('CALL InsertarPersona(?,?, ?, ?, ?, ?, ?, ?, ?, ?)', [Tipo,Nombre,Apellido,Cedula,Telefono,Distrito,Residencia,PuntoReferencia,Distancia,Casa],(error,results) => 
    {
        if(error)
        { 
            console.log('Hubo un error al añadir =>'+ error);

            conexion.query('SELECT * FROM mostrarvendedores', (error,results)=>
            {
                if(error)
                { 
                    console.log('Ha ocurrido un error al mostrar los vendedores, el error es => '+error); 
                }
                else
                {
                    res.render('vendedores', { vendedores:results,
                        alert: true,
                        alertTitle: "No se pudo completar la operacion",
                        alertMessage: "No se pudo agregar al vendedor, compruebe los datos e intente nuevamente",
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta:'vendedores'
                    })
                }
            })
        
        }
        else 
        {
            conexion.query('SELECT * FROM mostrarvendedores', (error,results)=>
            {
                if(error)
                { console.log('Ha ocurrido un error al mostrar los clientes, el error es => '+error); }
                else
                {
                    res.render('vendedores', { vendedores:results,
                        alert: true,
                        alertTitle: "Vendedor agregado",
                        alertMessage: "¡Se agrego al vendedor correctamente!",
                        alertIcon: 'success',
                        showConfirmButton: true,
                        timer: false,
                        ruta:'vendedores'
                    })
                }
            })
        }
    })
}

exports.UpdateVendedor = (req, res) =>
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

    conexion.query("CALL EditarPersona(?,?, ?, ?, ?, ?, ?, ?, ?, ?)", [Id_Vendedor,Cedula,Nombre,Apellido,Telefono,Distrito,Residencia,PuntoReferencia,Distancia,Casa],(error,results) => 
    {
        if(error)
        { 
            console.log('Hubo un error al Editar al Vendedor => ' +error);

            conexion.query("SELECT * from MostrarVendedores", (error,results)=>
            {
                if(error)
                { console.log('Ha ocurrido un error al mostrar los vendedores, el error es => '+error); }
                else
                {
                    res.render('vendedores', { vendedores:results,
                        alert: true,
                        alertTitle: "No se pudo completar la operacion",
                        alertMessage: "No se pudo editar al vendedor, compruebe los datos e intente nuevamente",
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta:'vendedores'
                    })
                }
            })
        
        }
        else 
        {
            conexion.query("SELECT * from MostrarVendedores", (error,results) =>
            {
                if(error)
                { console.log('Ha ocurrido un error al mostrar los vendedores, el error es => '+error); }
                else
                {
                    res.render('vendedores', { vendedores:results,
                        alert: true,
                        alertTitle: "Vendedor editado",
                        alertMessage: "¡Se edito al vendedor correctamente!",
                        alertIcon: 'success',
                        showConfirmButton: true,
                        timer: false,
                        ruta:'vendedores'
                    })
                }
            })
        }
    })  
} 

exports.AddProduct = ( req, res) => 
{
    const Marca = req.body.Marca;
    const Existencia = req.body.Existencia;
    const Precio = req.body.Precio;
    const Color = req.body.Color;
    const Tipo = req.body.Tipo;
    const Fecha = req.body.Fecha;
    const Categoria = req.body.Categoria_Prod;

    const Talla = req.body.Talla;
    const Modelo = req.body.Modelo;
    const Clasificacion = req.body.Clasificacion;
    const Dimensiones = req.body.Dimensiones;
    const UnidadMedida = req.body.Unidad_Medida;

    conexion.query('CALL InsertarProductos(?,?,?,?,?,?,?,?,?,?,?,?)', [Marca,Existencia,Precio,Color,Tipo,Categoria,Talla,Modelo,Clasificacion,Dimensiones,UnidadMedida,Fecha],(error,results) => {
        if(error)
        { 
            console.log('Hubo un error al agregar el producto => '+error);

            res.render('productos', { 
                alert: true,
                alertTitle: "No se pudo completar la operacion",
                alertMessage: "No se pudo agregar el Producto, compruebe los datos e intente nuevamente",
                alertIcon: 'error',
                showConfirmButton: true,
                timer: false,
                cat: Categoria
            })
        }
        else 
        {
            res.render('productos', {
                alert: true,
                alertTitle: "Producto agregado",
                alertMessage: "¡Se agrego el Producto correctamente!",
                alertIcon: 'success',
                showConfirmButton: true,
                timer: false,
                cat: Categoria
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
                cat: Categoria 
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
                cat: Categoria
            });
        }
    })


} 

/*
exports.SearchCliente = (req,res) => {
    const nombre = req.body.nombreSearch;
    const consulta = "SELECT * FROM mostrarclientes WHERE Nombre LIKE '"+nombre+"%'";
    console.log('Buscando Cliente '+nombre + '\n QUERY=> '+ consulta);

     conexion.query(consulta, (error, results) => 
    {
      if (error) 
      { console.log( "Hubo un error al buscar a ese cliente, error => " + error );} 
      else 
      { 
        res.render("clientes", { clientes: results });
        console.log('encontrado ' + results);
      }
    });   
} */