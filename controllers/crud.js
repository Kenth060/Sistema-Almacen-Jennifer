const conexion = require('../database/db');

exports.AddClient = ( req, res) => {
    const Nombre = req.body.Nombre_cl;
    const Apellido = req.body.Apellido_cl;
    const Telefono = req.body.Telefono_cl;
    const Cedula = req.body.Cedula_cl;
    
    const Distrito = req.body.Distrito_cl;
    const Residencia = req.body.Residencia_cl;
    const PuntoReferencia = req.body.PuntoReferencia_cl;
    const Distancia = req.body.Distancia_cl;
    const Casa = req.body.Casa_cl; 

    conexion.query('CALL AddClient(?, ?, ?, ?, ?, ?, ?, ?, ?)', [Nombre,Apellido,Cedula,Telefono,Distrito,Residencia,PuntoReferencia,Distancia,Casa],(error,results) => {
        if(error)
        { 
            conexion.query('CALL ShowClients()', (error,results)=>{
                if(error)
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
            conexion.query('CALL ShowClients()', (error,results)=>{
                if(error)
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

exports.UpdateClient = (req, res) => {
    const Id_Cliente = req.body.Id_cl;
    const Id_Dir = req.body.Id_dir_cl;
    const Nombre = req.body.Nombre_cl;
    const Apellido = req.body.Apellido_cl;
    const Telefono = req.body.Telefono_cl;
    const Cedula = req.body.Cedula_cl;
    
    const Distrito = req.body.Distrito_cl;
    const Residencia = req.body.Residencia_cl;
    const PuntoReferencia = req.body.PuntoReferencia_cl;
    const Distancia = req.body.Distancia_cl;
    const Casa = req.body.Casa_cl; 

    conexion.query('CALL UpdateClient(?,?,?, ?, ?, ?, ?, ?, ?, ?, ?)', [Id_Cliente,Nombre,Apellido,Cedula,Telefono,Id_Dir,Distrito,Residencia,PuntoReferencia,Distancia,Casa],(error,results) => {
        if(error)
        { 
            conexion.query('CALL ShowClients()', (error,results)=>{
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
            conexion.query('CALL ShowClients()', (error,results)=>{
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

exports.AddVendedor = ( req, res) => {
    const Nombre = req.body.Nombre_vd;
    const Apellido = req.body.Apellido_vd;
    const Telefono = req.body.Telefono_vd;
    const Cedula = req.body.Cedula_vd;
    
    const Distrito = req.body.Distrito_vd;
    const Residencia = req.body.Residencia_vd;
    const PuntoReferencia = req.body.PuntoReferencia_vd;
    const Distancia = req.body.Distancia_vd;
    const Casa = req.body.Casa_vd; 

    conexion.query('CALL AddVendedor(?, ?, ?, ?, ?, ?, ?, ?, ?)', [Nombre,Apellido,Cedula,Telefono,Distrito,Residencia,PuntoReferencia,Distancia,Casa],(error,results) => {
        if(error)
        { 
            console.log('Hubo un error al añadir =>'+ error);
            conexion.query('CALL ShowVendedores()', (error,results)=>{
                if(error)
                { console.log('Ha ocurrido un error al mostrar los vendedores, el error es => '+error); }
                else{
                
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
            conexion.query('CALL ShowVendedores()', (error,results)=>{
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

exports.UpdateVendedor = (req, res) => {
    const Id_Vendedor = req.body.Id_vd;
    const Id_Dir = req.body.Id_dir_vd;
    const Nombre = req.body.Nombre_vd;
    const Apellido = req.body.Apellido_vd;
    const Telefono = req.body.Telefono_vd;
    const Cedula = req.body.Cedula_vd;
    
    const Distrito = req.body.Distrito_vd;
    const Residencia = req.body.Residencia_vd;
    const PuntoReferencia = req.body.PuntoReferencia_vd;
    const Distancia = req.body.Distancia_vd;
    const Casa = req.body.Casa_vd; 

    conexion.query('CALL UpdateVendedor(?,?,?, ?, ?, ?, ?, ?, ?, ?, ?)', [Id_Vendedor,Nombre,Apellido,Cedula,Telefono,Id_Dir,Distrito,Residencia,PuntoReferencia,Distancia,Casa],(error,results) => {
        if(error)
        { 
            conexion.query('CALL ShowVendedores()', (error,results)=>{
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
            conexion.query('CALL ShowVendedores()', (error,results)=>{
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

exports.AddProduct = ( req, res) => {
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

    conexion.query('CALL AddProduct(?,?,?,?,?,?,?,?,?,?,?,?)', [Marca,Existencia,Precio,Color,Tipo,Talla,Modelo,Clasificacion,Dimensiones,UnidadMedida,Categoria,Fecha],(error,results) => {
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
                ruta:'productos'
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
                ruta:'productos'
            })
        }
    })
}

exports.UpdateProduct = (req, res) => {
    const Id_Producto = req.body.Id_Prod;
    const Categoria = req.body.Categoria_Prod;
    const Id_Cat = req.body.Id_Cat;

    const p_Cat = req.body.p_cat;

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

    conexion.query('CALL UpdateProduct(?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [Id_Producto,Categoria,Id_Cat,Marca,Existencia,Precio,Color,Tipo,Fecha,Talla,Modelo,Clasificacion,Dimensiones,UnidadMedida],(error,results) => {
        if(error)
        { 
            console.log('Hubo un error al actualizar el producto => '+error);
/*             res.render('productos', { clientes:results,
                alert: true,
                alertTitle: "No se pudo completar la operacion",
                alertMessage: "No se pudo agregar el Producto, compruebe los datos e intente nuevamente",
                alertIcon: 'error',
                showConfirmButton: true,
                timer: false,
                ruta:'productos'
            }) */
        }
        else 
        {
            console.log('Se actualizo el producto correctamente');
            res.redirect('/ShowProducts/'+p_Cat);

/*             res.render('productos', { clientes:results,
                alert: true,
                alertTitle: "Producto agregado",
                alertMessage: "¡Se agrego el Producto correctamente!",
                alertIcon: 'success',
                showConfirmButton: true,
                timer: false,
                ruta:'productos'
            }) */
        }
    })


} 