const express = require("express");
const router = express.Router();
const crud = require("./controllers/crud");
const conexion = require("./database/db");
const { exec } = require('child_process');


//3 -> Estableciendo las rutas
router.get ("/", (req, res) => 
{
  res.render("inicio");
});

router.get ("/register", (req, res) => 
{
  consultaColaboradores = 
  `SELECT 
        P.Id_Persona,
        CONCAT(P.Nombre, ' ', P.Apellido) AS 'Nombre',
        P.Tipo_Persona
  FROM persona P
  WHERE Cedula = ?`
  
  const usuario = req.cookies.username;
  const cedula = req.cookies.cedula;
  res.clearCookie('username');
  res.clearCookie('cedula');

  conexion.query(consultaColaboradores,[cedula],(error, results) => 
  {
    if(error)
    { console.log('Hubo un error al buscar los colaboradores, el error es => ' + error);}
    else
    {
      //res.send(results)
      res.render("register",{Colaboradores:results, username:usuario,Tipo:results[0].Tipo_Persona});
    }

  });
});

router.get ("/login", (req, res) => 
{
  res.render("login");
});

router.get ("/inicio", crud.isAuthenticated, async (req, res) => 
{

    let VentaContado = [];
    let VentaCredito = [];
    let Ventas = [];
    let Ingresos = null;
    let ProductosAct = null;
    let No_Clientes = null;
    let ClientesNew = null;

    const consultaVentasContado = new Promise((resolve, reject) => 
    {
      conexion.query("SELECT * FROM ventasContxmes;", (error, results) => 
      {
        if (error) 
        {
          console.log('HUBO UN ERROR AL MOSTRAR EL GRAFICO DE LAS VENTAS AL CONTADO => ' + error);
          reject(error);
        } 
        else 
        {
          VentaContado = results;
          resolve();
        }
      });
    });

    const consultaVentasCredito = new Promise((resolve, reject) => 
    {
      conexion.query("SELECT * FROM ventasCredxmes;", (error, results) => 
      { 
        if (error) 
        {
          console.log('HUBO UN ERROR AL MOSTRAR EL GRAFICO DE LAS VENTAS AL CREDITO => ' + error);
          reject(error);
        } 
        else
        {
          VentaCredito = results;
          resolve();
        }
      });
    });

    const consultaIngresos = new Promise((resolve, reject) => 
    {
      const queryIngresos = `SELECT SUM(Total_Venta) AS Ingresos_Mes FROM Venta
                              WHERE 
                              MONTH(Fecha_Venta) = MONTH(CURDATE()) AND
                              YEAR(Fecha_Venta) = YEAR(CURDATE())
      `;

      conexion.query(queryIngresos, (error, results) => 
      {
        if (error) 
        {
          console.log('HUBO UN ERROR AL MOSTRAR EL GRAFICO DE LAS VENTAS AL CONTADO => ' + error);
          reject(error);
        } 
        else 
        {
          if(results[0].Ingresos_Mes == null)
          { Ingresos = 0; }
          else
          { Ingresos = results[0].Ingresos_Mes; }
          console.log('INGRESOS => C$ '+Ingresos);
          console.log(results[0].Ingresos_Mes);
          resolve();
        }
      });                        
    });

    const consultaProductosAct = new Promise((resolve, reject) => 
      {
        const queryProductosAct = `SELECT COUNT(productos.Id_Producto) AS Total FROM productos where productos.Estado_Producto = 'Activo'`;
  
        conexion.query(queryProductosAct, (error, results) => 
        {
          if (error) 
          {
            console.log('HUBO UN ERROR AL MOSTRAR EL Buscar los Productos Activos => ' + error);
            reject(error);
          } 
          else 
          {
            ProductosAct = results;
            resolve();
          }
        });                        
      });

    const consultaClientes = new Promise((resolve, reject) => 
    {
      const queryClientes = `SELECT COUNT(persona.Id_Persona) AS Total 
                             FROM persona 
                             WHERE persona.Tipo_Persona='Cliente' 
                             and 
                             persona.Estado='Activo'
      `;
    
      conexion.query(queryClientes, (error, results) => 
      {
        if (error) 
        {
          console.log('HUBO UN ERROR AL  Buscar los Clientes Activos => ' + error);
          reject(error);
        } 
        else 
        {
          No_Clientes = results;
          resolve();
        }
      });                        
    });

    const consultaVentas = new Promise((resolve, reject) => 
    {
      const queryVentas = `SELECT 
                              v.Tipo_Venta, 
                              v.Fecha_Venta, 
                              v.Total_Venta, 
                              CONCAT(c.Nombre,' ',c.Apellido) AS Cliente, 
                              CONCAT(vdr.Nombre,' ',vdr.Apellido) AS Vendedor
                            FROM 
                                Venta v
                            JOIN 
                                Persona c ON v.Id_Cliente = c.Id_Persona
                            JOIN 
                                Persona vdr ON v.Id_Vendedor = vdr.Id_Persona
                            WHERE 
                                MONTH(v.Fecha_Venta) = MONTH(CURDATE()) 
                                AND YEAR(v.Fecha_Venta) = YEAR(CURDATE())
                            ORDER BY 
                                v.Fecha_Venta DESC
                            LIMIT 5;
  
      `;
      
      conexion.query(queryVentas, (error, results) => 
      {
        if (error) 
        {
          console.log('HUBO UN ERROR AL  Buscar las ultimas Ventas => ' + error);
          reject(error);
        } 
        else 
        {
          const VentasFormateadas = results.map(venta => 
            {
              const fecha = new Date(venta.Fecha_Venta);
              const opciones = { day: '2-digit', month: 'long', year: 'numeric' };
              const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
              
              return {
                ...venta,
                Fecha_Venta: fechaFormateada
              };
          });

          Ventas = VentasFormateadas;
          resolve();
        }
      });                        
    });
    
    Promise.all([consultaVentasContado, consultaVentasCredito, consultaIngresos,consultaProductosAct,consultaClientes,consultaVentas])
      .then(() => {
        
        const errorMessage = req.cookies.errorMessage;
        res.clearCookie('errorMessage');

        const successMessage = req.cookies.successMessage;
        res.clearCookie('successMessage');

        const registerMessage = req.cookies.registerMessage;
        res.clearCookie('registerMessage');


        res.render("inicio", 
        {
          VentaContado: VentaContado,
          VentaCredito: VentaCredito,
          Ingresos: 'C$ '+Ingresos,
          Productos: ProductosAct[0].Total,
          No_Clientes:No_Clientes[0].Total,
          Ventas:Ventas,
          usuario: req.user.NombreUsuario,
          Mensaje: errorMessage,
          UserRol:req.user.Rol,
          MensajeRespaldo:successMessage,
          MensajeRegistro:registerMessage
        });

        /* console.log(Ventas); */

      })
      .catch(error => {
        console.log('Hubo un error al obtener los datos del inicio => ' + error);
      });
/*  } 
   else 
  {
    res.redirect('/login');
  } */
});

router.get ("/Abonos", crud.isAuthenticated , (req, res) => 
{
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
        
        const fechaPlazo = new Date(venta.Plazo_Compra);
        const fechaPlazoFormateada = fechaPlazo.toLocaleDateString('es-ES', opciones);
                  
        return { 
          ...venta,
          Fecha_Venta: fechaFormateada,
          Plazo_Compra:fechaPlazoFormateada
        };
      });
        
      const errorMessage = req.cookies.errorMessage;
      res.clearCookie('errorMessage');

      res.render("abonos",{ 
        Ventas_Credito:Ventas ,
        Mensaje: errorMessage,
        UserRol:req.user.Rol
      });
    }
            
  });
});

router.get ("/Clientes", crud.isAuthenticated, (req, res) => 
{
  conexion.query("SELECT * from MostrarClientes", (error, results) => 
  {
    if (error) 
    { console.log( "Ha ocurrido un error al mostrar los clientes, el error es => " + error ); } 
    else 
    { res.render("clientes", { clientes: results , 
      usuario: req.user.NombreUsuario,
      UserRol:req.user.Rol}); }
  });
});

router.get("/EditClient/:ID", crud.isAuthenticated,  (req, res) => 
{
  const id = req.params.ID;

  conexion.query("SELECT * FROM persona where Id_Persona = ?", [id], (error, results) => 
  {
    if (error) 
    { console.log("Hubo un error al obtener informacion de ese cliente, error => " + error ); }
    else 
    { 
      res.render("editClient.ejs", 
      { 
        cliente: results[0],
        UserRol:req.user.Rol,
        tipo:'Cliente'
     }); 
    
    }
  });
});

router.get ("/Compras", crud.isAuthenticated , crud.isGerente, (req, res) => 
{
    let Compras = [];
    let Productos = [];
    let Proveedores = [];
    let Gerentes = [];

    const consultaCompras = new Promise((resolve, reject) => 
    {
      conexion.query("SELECT * FROM mostrarcompras", (error, results) => 
      {
        if (error) 
        {
          console.log('HUBO UN ERROR AL MOSTRAR LAS COMPRAS => ' + error);
          reject(error);
        } 
        else 
        {
          const compras = results.map( compra => 
          {
            const fecha = new Date(compra.Fecha_Compra);
            const opciones = { day: '2-digit', month: 'long', year: 'numeric' };
            const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
                
            return {
              ...compra,
              Fecha_Compra: fechaFormateada
            };
          });
  
          Compras = compras;
          resolve();
        }
      });
    });

    const consultaProductos = new Promise((resolve, reject) => 
    {
      conexion.query('SELECT * from productos', (error, results) => 
      {
        if (error)
        {console.log( "Ha ocurrido un error al mostrar los Productos en las Compras, el error es => " + error); } 
        else 
        {
          Productos = results;
          resolve();
        }
      })

    });

    const consultaProveedores = new Promise((resolve, reject) => 
    {
      conexion.query('SELECT * from mostrarproveedores', (error, results) => 
      {
        if (error)
        {console.log( "Ha ocurrido un error al mostrar los Proveedores en las Compras, el error es => " + error); } 
        else 
        {
          Proveedores = results;
          resolve();
        }
      })
    });

    const consultaGerente = new Promise((resolve, reject) => 
    {
      conexion.query(`SELECT * from persona where Tipo_Persona = 'Gerente'`, (error, results) => 
      {
        if (error)
        {console.log( "Ha ocurrido un error al mostrar los GErentes en las Compras, el error es => " + error); } 
        else 
        {
          Gerentes = results;
          resolve();
        }
      })
    });

    Promise.all([consultaCompras , consultaProductos, consultaProveedores,consultaGerente])
    .then(() => 
    {
      const errorMessage = req.cookies.errorMessage;
      res.clearCookie('errorMessage');

      res.render("compras", 
                  {productos: Productos ,
                   compras:Compras,
                   proveedores:Proveedores,
                   gerentes:Gerentes, 
                   Mensaje: errorMessage,
                   UserRol:req.user.Rol
                  }
      );
    })
    .catch(error => 
    { console.log('Hubo un error al obtener los datos => ' + error); });    

});

router.get("/Colaboradores", crud.isAuthenticated , crud.isGerente, (req, res) => 
{
  conexion.query("SELECT * FROM mostrarcolaboradores ORDER BY Tipo_Persona", (error, results) => 
  {
    if (error) 
    { console.log( "Ha ocurrido un error al mostrar los vendedores, el error es => " + error ); } 
    else 
    { 
      const errorMessage = req.cookies.errorMessage;
      res.clearCookie('errorMessage');

      

      res.render("vendedores", 
                  { vendedores: results,
                    Mensaje: errorMessage,
                    UserRol:req.user.Rol
                  }       
      ); 
    }
  });
});

router.get("/EditColaborador/:ID" , crud.isAuthenticated , crud.isGerente, (req, res) => 
{
  const id = req.params.ID;

  conexion.query("SELECT * FROM persona where Id_Persona = ?", [id], (error, results) => 
  {
    if (error) 
    { console.log( "Hubo un error al obtener informacion de ese vendedor, error => " + error); } 
    else 
    {
      const errorMessage = req.cookies.errorMessage;
      res.clearCookie('errorMessage');
      res.render("editvendedor.ejs", 
                  { 
                    vendedor: results[0] ,
                    /* //Mensaje: errorMessage, */
                    UserRol:req.user.Rol
                  }
      );
    }
  });
});

router.get ("/Proveedores",  crud.isAuthenticated , crud.isGerente,(req, res) => 
{
  conexion.query("SELECT * FROM mostrarproveedores", (error, results) => 
  {
    if (error) 
    { console.log( "Ha ocurrido un error al mostrar los proveedores, el error es => " + error ); } 
    else 
    { 
      const errorMessage = req.cookies.errorMessage;
      res.clearCookie('errorMessage');
      res.render("Proveedores", { proveedores: results, Mensaje: errorMessage,UserRol:req.user.Rol });
    }
  });
});

router.get("/EditProveedor/:ID", crud.isAuthenticated,  (req, res) => 
  {
    const id = req.params.ID;
  
    conexion.query("SELECT * FROM persona where Id_Persona = ?", [id], (error, results) => 
    {
      if (error) 
      { console.log("Hubo un error al obtener informacion de ese proveedor, error => " + error ); }
      else 
      { 
        res.render("editClient.ejs", 
        { 
          cliente: results[0],
          UserRol:req.user.Rol,
          tipo:'Proveedor'
       }); 
      
      }
    });
  });


router.get("/Productos", crud.isAuthenticated, (req, res) => 
{ 
  res.render("productos", { UserRol:req.user.Rol});  

});

router.get ("/Show/ProductosDevueltos",  crud.isAuthenticated , crud.isGerente, (req, res) => 
{
  conexion.query('SELECT * FROM ShowProductosDevueltos', (error, results) => {
    if(error)
    { console.log('Hubo un error al mostrar los productos devueltos => '+error); }
    else
    {
      const devoluciones = results.map( devolucion => 
        {
          const fecha = new Date(devolucion.Fecha_Devolucion);
          const opciones = { day: '2-digit', month: 'long', year: 'numeric' };
          const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
          
          return {
            ...devolucion,
            Fecha_Devolucion: fechaFormateada
          };
        });

      const errorMessage = req.cookies.errorMessage;
      res.clearCookie('errorMessage');
      res.render("productosDevueltos",{ Devoluciones : devoluciones, Mensaje: errorMessage, UserRol:req.user.Rol});
    }
  })
});

router.get("/Ventas",  crud.isAuthenticated , (req, res) => 
{
    const tipoVenta = req.query.tipoVenta;

    let Ventas = [];
    let Productos = [];
    let Clientes = [];
    let Vendedores = [];

    const consultaVentas = new Promise((resolve, reject) => 
    {
      conexion.query("SELECT * FROM mostrarventas;", (error, results) => 
      {
        if (error) 
        {
          console.log('HUBO UN ERROR AL MOSTRAR LAS VENTAS  => ' + error);
          reject(error);
        } 
        else 
        {
          let resultados = results.map(venta => 
          {
            const fecha = new Date(venta.Fecha_Venta);
            const opciones = { day: '2-digit', month: 'long', year: 'numeric' };
            const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
              
            return {
              ...venta,
              Fecha_Venta: fechaFormateada
            };
          });

          Ventas = resultados;
          resolve();
        }
      });
    });

    const consultaProductos = new Promise((resolve, reject) => 
    {
      conexion.query("SELECT * FROM Productos;", (error, results) => 
      {
        if (error) 
        {
          console.log('HUBO UN ERROR AL MOSTRAR LOS PRODUCTOS  => ' + error);
          reject(error);
        } 
        else 
        {
          Productos = results;
          resolve();
        }
      });
    });

    const consultaClientes = new Promise((resolve, reject) => 
    {
      conexion.query("SELECT * FROM mostrarclientes;", (error, results) => 
      {
        if (error) 
        {
          console.log('HUBO UN ERROR AL MOSTRAR LOS CLIENTES  => ' + error);
          reject(error);
        } 
        else 
        {
          Clientes = results;
          resolve();
        }
      });
    });

    const consultaVendedores = new Promise((resolve, reject) => 
    {
      conexion.query("SELECT * FROM mostrarvendedores;", (error, results) => 
      {
        if (error) 
        {
          console.log('HUBO UN ERROR AL MOSTRAR LOS VENDEDORES  => ' + error);
          reject(error);
        } 
        else 
        {
          Vendedores = results;
          resolve();
        }
      });
    });

    Promise.all([consultaVentas, consultaProductos, consultaClientes , consultaVendedores])
    .then(() => 
    {
      const errorMessage = req.cookies.errorMessage;
      res.clearCookie('errorMessage');

      res.render("ventas", 
      {
        ventas: Ventas, 
        productos: Productos , 
        Tipo:tipoVenta,
        clientes:Clientes,
        vendedores:Vendedores,
        Mensaje: errorMessage,
        UserRol:req.user.Rol
      });

    })
    .catch(error => {
      console.log('Hubo un error al obtener los datos => ' + error);
    });


});

router.get("/ShowProducts/:categoria", crud.isAuthenticated,(req, res) => 
{

    const categoria = req.params.categoria;
    //res.send(categoria);

    conexion.query ('CALL MostrarProductos(?)',[categoria], (error, results) => 
    {
      if (error) 
      { console.log( "Hubo un error al Mostrar estos Producto, error => " + error); } 
      else 
      {
        const productosFormateados = results[0].map(producto => 
            {
              const fecha = new Date(producto.Fecha_Ingreso);
              const opciones = { day: '2-digit', month: 'long', year: 'numeric' };
              const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
              
              return {
                ...producto,
                Fecha_Ingreso: fechaFormateada
              };
            });
  
        //res.send(productosFormateados);
        res.render("showProducts.ejs", { Producto: productosFormateados, Categoria: categoria, UserRol:req.user.Rol }); 
      }   
    });  

});

router.get("/EditProduct/:Cat/p/:IdProd" , crud.isAuthenticated , crud.isGerente, (req, res) => 
{
  const id_prod = req.params.IdProd;
  const  cat = req.params.Cat

  conexion.query("CALL BuscarProducto(?,?)", [cat,id_prod], (error, results) => 
  {
    if (error) 
    { console.log( "Hubo un error al buscar ese producto, error => " + error ); }
    else 
    { 
      const productosFormateados = results[0].map( producto => 
        {
          const fecha = new Date(producto.Fecha_Ingreso);
          const opciones = { day: '2-digit', month: 'long', year: 'numeric' };
          const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
          
          return {
            ...producto,
            Fecha_Ingreso: fechaFormateada
          };
      });

      const errorMessage = req.cookies.errorMessage;
      res.clearCookie('errorMessage');
      res.render("editProducts.ejs", { Producto: productosFormateados[0], Mensaje: errorMessage, UserRol:req.user.Rol});
    }
  });

}); 

router.get('/buscar-cliente',  crud.isAuthenticated, (req, res) => 
{
  const cedula = req.query.cedula;

  conexion.query("Select * from persona where Tipo_Persona='Cliente' and  Cedula = ? ", [cedula], (error , results) => 
  {
    if(error)
    {console.log('Hubo un error al buscar al cliente con Cedula: '+ cedula +' el error es => '+ error)}
    else
    {
      if(results.length != 0)
      {
        const nombre = results[0].Nombre + ' ' + results[0].Apellido;
        res.json({ nombreCliente: nombre }); 
      }
      else 
      {res.json({ nombreCliente: 'No se encontro al Cliente' }); }
    }
  })


});

router.get('/buscar-vendedor', crud.isAuthenticated,  (req, res) => 
{
  const cedula = req.query.cedula;

  conexion.query("Select * from persona where Tipo_Persona='Vendedor' and  Cedula = ? ", [cedula], (error , results) => 
  {
    if(error)
    {console.log('Hubo un error al buscar al vendedor con Cedula: '+ cedula +' el error es => '+ error)}
    else
    {
      if(results.length != 0)
      {
        const nombre = results[0].Nombre + ' ' + results[0].Apellido;
        res.json({ nombreVendedor: nombre }); 
      }
      else 
      {res.json({ nombreVendedor: 'No se encontro al Vendedor' }); }
    }
  })


});

router.get('/buscar-detalleventa', crud.isAuthenticated,  (req, res) => 
{
  const id = req.query.id;
  conexion.query("SELECT * from mostrardetalleventa WHERE Id_Venta = ?", [id], (error , results) => 
    {
      if(error)
      {console.log('Hubo un error al buscar el detalle de la venta N° '+ id +' el error es => '+ error)}
      else
      {
        const detalles_venta = results;
        res.json({ DetallesVenta: detalles_venta }); 

        /* console.log('Los detalles de la venta son =>\n');
        console.log(detalles_venta);
        detalles_venta.forEach((Detalle) => 
        {

          console.log('Productos Adquiridos =>'+Detalle.Producto);
        })  */
      }
    }) 
  
  
});

router.get('/buscar-abonos', crud.isAuthenticated,  (req, res) => 
  {
    const id = req.query.id;
    conexion.query("SELECT * FROM historial_abonos WHERE Id_Venta = ?", [id], (error , results) => 
      {
        if(error)
        {console.log('Hubo un error al buscar los abonos de la venta N° '+ id +' el error es => '+ error)}
        else
        {
          const abonos = results.map(abono => 
            {
              const fecha = new Date(abono.Fecha_Abono);
              const opciones = { day: '2-digit', month: 'long', year: 'numeric' };
              const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
              
              return {
                ...abono,
                Fecha_Abono: fechaFormateada
              };
            });

          res.json({ Abonos: abonos }); 
  
          /* console.log('Los detalles de la venta son =>\n');
          console.log(detalles_venta);
          detalles_venta.forEach((Detalle) => 
          {
  
            console.log('Productos Adquiridos =>'+Detalle.Producto);
          })  */
        }
      }) 
    
    
});
  
router.get('/buscar-records', crud.isAuthenticated,  (req, res) => 
  {
    const id = req.query.id;
    conexion.query("SELECT * FROM record_crediticio WHERE Id_Cliente = ?", [id], (error , results) => 
      {
        if(error)
        {console.log('Hubo un error al buscar los records crediticios del cliente '+ id +' el error es => '+ error)}
        else
        {
          const records = results.map( record => 
            {
              const fecha = new Date(record.Fecha_Compra);
              const opciones = { day: '2-digit', month: 'long', year: 'numeric' };
              const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
              
              return {
                ...record,
                Fecha_Compra: fechaFormateada
              };
            });

          res.json({ Records: records }); 
  
          /* console.log('Los detalles de la venta son =>\n');
          console.log(detalles_venta);
          detalles_venta.forEach((Detalle) => 
          {
  
            console.log('Productos Adquiridos =>'+Detalle.Producto);
          })  */
        }
      }) 
    
    
});

router.get('/buscar-prov', crud.isAuthenticated , crud.isGerente,  (req, res) => 
{
  const cedula = req.query.cedula;
  
  conexion.query("Select * from persona where Tipo_Persona='Proveedor' and  Cedula = ? ", [cedula], (error , results) => 
  {
    if(error)
    {console.log('Hubo un error al buscar al Proveedor con Cedula: '+ cedula +' el error es => '+ error)}
    else
    {
      if(results.length != 0)
      {
        const nombre = results[0].Nombre + ' ' + results[0].Apellido;
        const COMERCIO = results[0].Comercio;
        res.json({ nombreProveedor: nombre , comercio:COMERCIO}); 
      }
        else 
        {res.json({ nombreProveedor: 'No se encontro al Proveedor' }); }
      }
  })
  
});

router.get('/buscar-gerente' ,crud.isAuthenticated , crud.isGerente, (req, res) => 
  {
    const cedula = req.query.cedula;
    
    conexion.query("Select * from persona where Tipo_Persona='Gerente' and  Cedula = ? ", [cedula], (error , results) => 
    {
      if(error)
      {console.log('Hubo un error al buscar al Gerente con Cedula: '+ cedula +' el error es => '+ error)}
      else
      {
        if(results.length != 0)
        {
          const nombre = results[0].Nombre + ' ' + results[0].Apellido;
          res.json({ nombreGerente: nombre }); 
        }
          else 
          {res.json({ nombreGerente: 'No se encontro al Gerente' }); }
        }
    })
    
  });

router.get('/buscar-detallecompra', crud.isAuthenticated , crud.isGerente, (req, res) => 
{
  const id = req.query.id;
  conexion.query("SELECT * from mostrardetallecompras WHERE Id_Compra = ?", [id], (error , results) => 
  {
    if(error)
    {console.log('Hubo un error al buscar el detalle de la Compra N° '+ id +' el error es => '+ error)}
    else
    {
      const detalles_Compras = results;
      res.json({ DetallesCompra: detalles_Compras }); 
    }
  }) 
      
});


router.get('/respaldar', (req, res) => 
{
  // Ruta al ejecutable mysqldump
  const rutaMysqldump = 'C:/xampp/mysql/bin/mysqldump.exe'; // Ruta a mysqldump.exe en Windows

  // Comando para ejecutar mysqldump
  const comandoMysqldump = `${rutaMysqldump} -u ${process.env.DB_USER} comercial_jenny > ${process.env.RUTA}`;

  // Ejecutar el comando mysqldump
  exec(comandoMysqldump, (error, stdout, stderr) => 
  {
    if (error) 
    {
      console.error(`Error al ejecutar mysqldump: ${error.message}`);
      return;
    }
    
    if (stderr) 
    {
      console.error(`Error stderr: ${stderr}`);
      return;
    }

    console.log(`Respaldo de la base de datos creado exitosamente.`);
    res.cookie('successMessage', 'El respaldo de la base de datos ha sido creado exitosamente.', { httpOnly: true });
    res.redirect('/inicio');
  });
});

// 6 -> METODOS POST

router.post("/AddClient",crud.isAuthenticated, crud.AddClient);
router.post("/UpdateClient",crud.isAuthenticated, crud.UpdateClient);
router.post("/AddColaborador", crud.isAuthenticated,crud.AddColaborador);//
router.post("/UpdateColaborador",crud.isAuthenticated, crud.UpdateColaborador);//
router.post("/AddProduct", crud.isAuthenticated,crud.AddProduct);
router.post("/UpdateProduct",crud.isAuthenticated, crud.UpdateProduct);
router.post("/AddVenta",crud.isAuthenticated,crud.AddVenta);
router.post("/AddAbono",crud.isAuthenticated,crud.AddAbono);
router.post("/DevolverProducto",crud.isAuthenticated,crud.DevolverProducto);
router.post("/AddProveedor",crud.isAuthenticated,crud.AddProveedor);
router.post("/AddCompra",crud.isAuthenticated,crud.AddCompra);

router.post("/register",crud.RegisterUser);
router.post("/auth",crud.Login);
router.get("/logout",crud.logout);

module.exports = router;

