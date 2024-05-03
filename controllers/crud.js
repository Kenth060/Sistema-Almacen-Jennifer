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
                        ruta:'clientes'
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
                        ruta:'abonos'
                    });
                  }
                    
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
}  */
