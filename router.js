const express = require("express");
const router = express.Router();

const conexion = require("./database/db");

//1 -> Invocacion a bcryptjs
const bcryptjs = require("bcryptjs");

//2 -> Var de Session
const session = require('express-session');
router.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized: true
}));

//3 -> Estableciendo las rutas
router.get ("/", (req, res) => 
{
  res.render("login");
});

router.get ("/register", (req, res) => {
  res.render("register");
});

router.get ("/login", (req, res) => 
{
  res.render("login");
});

router.get ("/inicio", async (req, res) => 
{
  //if (req.session.loggedin) 
  if(1)
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
        res.render("inicio", 
        {
          VentaContado: VentaContado,
          VentaCredito: VentaCredito,
          Ingresos: 'C$ '+Ingresos,
          Productos: ProductosAct[0].Total,
          No_Clientes:No_Clientes[0].Total,
          Ventas:Ventas
        });

        /* console.log(Ventas); */

      })
      .catch(error => {
        console.log('Hubo un error al obtener los datos => ' + error);
      });
  } 
  else 
  {
    res.redirect('/login');
  }
});

router.get ("/Abonos", (req, res) => 
{
  if (req.session.loggedin) 
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
        
            res.render("abonos",{ Ventas_Credito:Ventas });
          }
            
    });
  } 
  else 
  {
    res.redirect('/login');
  }
});

router.get ("/Clientes", (req, res) => 
{
  if (req.session.loggedin) 
  {
    conexion.query("SELECT * from MostrarClientes", (error, results) => 
      {
        if (error) 
        { console.log( "Ha ocurrido un error al mostrar los clientes, el error es => " + error ); } 
        else 
        { res.render("clientes", { clientes: results }); }
      });
  } 
  else 
  { res.redirect('/login'); }
});

router.get("/EditClient/:ID", (req, res) => 
{
  const id = req.params.ID;

  conexion.query("SELECT * FROM persona where Id_Persona = ?", [id], (error, results) => 
  {
    if (error) 
    { console.log("Hubo un error al obtener informacion de ese cliente, error => " + error ); }
    else 
    { res.render("editClient.ejs", { cliente: results[0] }); }
    //{ res.send(results[0]);}
  });
});

router.get ("/Compras", (req, res) => 
{
  //if(1)
  if (req.session.loggedin) 
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
      //res.send(Gerentes);
      res.render("compras", {productos: Productos , compras:Compras,proveedores:Proveedores,gerentes:Gerentes});
    })
    .catch(error => 
    { console.log('Hubo un error al obtener los datos => ' + error); });    
  }
  else 
  { res.redirect('/login'); }
});

router.get("/Vendedores", (req, res) => 
{
  if (req.session.loggedin) 
  {
    conexion.query("SELECT * FROM mostrarvendedores", (error, results) => 
      {
        if (error) 
        { console.log( "Ha ocurrido un error al mostrar los vendedores, el error es => " + error ); } 
        else 
        { res.render("vendedores", { vendedores: results }); }
      });
  } 
  else 
  { res.redirect('/login'); }

});

router.get("/EditVendedor/:ID", (req, res) => {
  const id = req.params.ID;

  conexion.query("SELECT * FROM persona where Id_Persona = ?", [id], (error, results) => 
  {
    if (error) 
    { console.log( "Hubo un error al obtener informacion de ese vendedor, error => " + error); } 
    else 
    {res.render("editvendedor.ejs", { vendedor: results[0] });}
    // res.send(results[0][0]);}
  });
});

router.get ("/Proveedores", (req, res) => 
{
  conexion.query("SELECT * FROM mostrarproveedores", (error, results) => 
  {
    if (error) 
    { console.log( "Ha ocurrido un error al mostrar los proveedores, el error es => " + error ); } 
    else 
    { res.render("Proveedores", { proveedores: results }); }
  });
});

router.get("/Productos", (req, res) => 
{
  if (req.session.loggedin) 
  {   res.render("productos"); } 
  else 
  { res.redirect('/login'); }

});

router.get ("/Show/ProductosDevueltos", (req, res) => 
{
  conexion.query('SELECT * FROM ShowProductosDevueltos', (error, results) => {
    if(error)
    { console.log('Hubo un error al mostrar los productos devueltos => '+error); }
    else
    {
      //res.send(results);

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

      res.render("productosDevueltos",{ Devoluciones : devoluciones});
    }
  })
});

router.get("/Ventas", (req, res) => 
{
  if(1) 
  //if (req.session.loggedin)
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
    .then(() => {
      
      res.render("ventas", 
      {
        ventas: Ventas, 
        productos: Productos , 
        Tipo:tipoVenta,
        clientes:Clientes,
        vendedores:Vendedores
      });

    })
    .catch(error => {
      console.log('Hubo un error al obtener los datos => ' + error);
    });
  } 
  else 
  { res.redirect('/login'); }

});

router.get("/ShowProducts/:categoria", (req, res) => {

  if (req.session.loggedin) 
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
        res.render("showProducts.ejs", { Producto: productosFormateados, Categoria: categoria }); 
      }   
    });  
  }
  else 
  { res.redirect('/login'); }
 
});

router.get("/EditProduct/:Cat/p/:IdProd", (req, res) => 
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

        //res.send(productosFormateados);
      res.render("editProducts.ejs", { Producto: productosFormateados[0]});
    }
  });

}); 

router.get('/buscar-cliente', (req, res) => 
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

router.get('/buscar-vendedor', (req, res) => 
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

router.get('/buscar-detalleventa', (req, res) => 
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

router.get('/buscar-abonos', (req, res) => 
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
  
router.get('/buscar-records', (req, res) => 
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

router.get('/buscar-prov', (req, res) => 
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

router.get('/buscar-gerente', (req, res) => 
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

router.get('/buscar-detallecompra', (req, res) => 
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





// 4 -> Registro
router.post ("/register", async (req, res) => 
  {
    const user = req.body.user;
    const name = req.body.name;
    const rol = req.body.rol;
    const pass = req.body.pass;
    //console.log('Abriendo registrar');
    let passwordHaash = await bcryptjs.hash(pass, 8);
  
    conexion.query( "INSERT INTO usuarios SET ?", { Usuario: user, Contraseña: passwordHaash, Rol: rol,Id_Persona:31 }, async (error, results) => 
    {
      if (error) 
      { console.log("Hubo un error al registrar error => " + error); } 
      else 
      {
          res.render("register", 
          {
            alert: true,
            alertTitle: "Registro",
            alertMessage: "¡Registro de Usuario Exitoso!",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 1500,
            ruta: "",
          });
      }
    }
    );
  });

// 5 -> Autenticacion
router.post ("/auth", async (req, res) =>
  {
    const user = req.body.user;
    const pass = req.body.pass;
  
    let passwordHaash = await bcryptjs.hash(pass, 8);
  
    if (user && pass) 
    {
      conexion.query( "Select * FROM usuarios WHERE usuario = ?", [user], async (error, results) => 
      {
        if ( results.length == 0 || !(await bcryptjs.compare(pass, results[0].Contraseña)) ) 
        {
          res.render("login", 
          {
              alert: true,
              alertTitle: "Error",
              alertMessage: "Usuario y/o contraseña incorrectas",
              alertIcon: "error",
              showConfirmButton: true,
              timer: false,
              ruta: "login",
            });
        } 
        else 
        {
            req.session.loggedin = true;
            req.session.name = results[0].Usuario;
            res.render("login", {
              alert: true,
              alertTitle: "Conexion Exitosa",
              alertMessage: "¡Inicio de Sesión Correcto!",
              alertIcon: "success",
              showConfirmButton: false,
              timer: 2500,
              ruta: "inicio",
            });
          }
        }
      );
  
    } 
    else 
    {
      res.render("login", 
      {
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "¡Por favor ingrese un usuario y/o una contraseña!",
        alertIcon: "warning",
        showConfirmButton: true,
        timer: false,
        ruta: "login",
      });
    }
});

// 6 -> METODOS POST

const crud = require("./controllers/crud");
router.post("/AddClient", crud.AddClient);
router.post("/UpdateClient", crud.UpdateClient);
router.post("/AddVendedor", crud.AddVendedor);
router.post("/UpdateVendedor", crud.UpdateVendedor);
router.post("/AddProduct", crud.AddProduct);
router.post("/UpdateProduct", crud.UpdateProduct);
router.post("/AddVenta",crud.AddVenta);
router.post("/AddAbono",crud.AddAbono);
router.post("/DevolverProducto",crud.DevolverProducto);
router.post("/AddProveedor",crud.AddProveedor);
router.post("/AddCompra",crud.AddCompra);

module.exports = router;

