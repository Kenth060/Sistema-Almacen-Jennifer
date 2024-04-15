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


