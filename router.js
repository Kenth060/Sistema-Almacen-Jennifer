const express = require("express");
const router = express.Router();

const conexion = require("./database/db");

//6 -> Invocacion a bcryptjs
const bcryptjs = require("bcryptjs");

//Estableciendo las rutas
router.get("/Login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

//10 -> Registro
router.post("/register", async (req, res) => {
  const user = req.body.user;
  const name = req.body.name;
  const rol = req.body.rol;
  const pass = req.body.pass;
  //console.log('Abriendo registrar');
  let passwordHaash = await bcryptjs.hash(pass, 8);

  conexion.query(
    "INSERT INTO usuarios SET ?",
    { Usuario: user, Nombre: name, Rol: rol, Contraseña: passwordHaash },
    async (error, results) => {
      if (error) {
        console.log("Hubo un error al registrar error => " + error);
      } else {
        res.render("register", {
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

//11 -> Autenticacion
router.post("/auth", async (req, res) => {
  const user = req.body.user;
  const pass = req.body.pass;

  let passwordHaash = await bcryptjs.hash(pass, 8);

  if (user && pass) {
    conexion.query(
      "Select * FROM usuarios WHERE usuario = ?",
      [user],
      async (error, results) => {
        if (
          results.length == 0 ||
          !(await bcryptjs.compare(pass, results[0].Contraseña))
        ) {
          res.render("login", {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Usuario y/o contraseña incorrectas",
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: "login",
          });
        } else {
          req.session.loggedin = true;
          req.session.name = results[0].Nombre;
          res.render("login", {
            alert: true,
            alertTitle: "Conexion Exitosa",
            alertMessage: "¡Inicio de Sesión Correcto!",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 2500,
            ruta: "",
          });
        }
      }
    );
  } else {
    res.render("login", {
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

// 12-> Auth pages
router.get("/", (req, res) => {
  if (req.session.loggedin) {
    res.render("inicio", {
      login: true,
      name: req.session.name,
    });
  } else {
    res.render("login", {
      login: false,
      name: "Debe iniciar sesión",
    });
  }
});

router.get("/Inicio", (req, res) => {
  res.render("inicio");
});

router.get("/Abonos", (req, res) => {
  res.render("abonos");
});

router.get("/Clientes", (req, res) => {
  conexion.query("CALL ShowClients()", (error, results) => {
    if (error) {
      console.log(
        "Ha ocurrido un error al mostrar los clientes, el error es => " + error
      );
    } else {
      res.render("clientes", { clientes: results });
      // res.send(results);
    }
  });
});

router.get("/Productos", (req, res) => {
  res.render("productos");
});

router.get("/ShowProducts", (req, res) => {
  res.render("showProducts");
});

router.get("/Vendedores", (req, res) => {
  conexion.query("CALL ShowVendedores()", (error, results) => {
    if (error) {
      console.log(
        "Ha ocurrido un error al mostrar los vendedores, el error es => " +
          error
      );
    } else {
      res.render("vendedores", { vendedores: results });
      // res.send(results);
    }
  });
});

router.get("/Ventas", (req, res) => {
  //res.render("ventas");

  conexion.query("SELECT * from ventas", (error, results) => {
    if (error) 
    { console.log( "Ha ocurrido un error al mostrar las Ventas, el error es => " + error); } 
    else 
    {  res.render("ventas", { ventas: results });
      //res.send(results);
    }
  });

});

router.get("/EditClient/:id", (req, res) => {
  const id = req.params.id;

  conexion.query("CALL SearchClient(?)", [id], (error, results) => {
    if (error) {
      console.log(
        "Hubo un error al obtener informacion de ese cliente, error => " + error
      );
    } else {
      res.render("editClient.ejs", { cliente: results[0][0] });
    }
    // res.send(results[0][0]);}
  });
});

router.get("/DeleteClient/:ID", (req, res) => {
  const id = req.params.ID;
  conexion.query(
    "DELETE FROM cliente where Id_Cliente = ?",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.redirect("/Clientes");
      }
    }
  );
});

router.get("/EditVendedor/:id", (req, res) => {
  const id = req.params.id;

  conexion.query("CALL SearchVendedor(?)", [id], (error, results) => {
    if (error) {
      console.log(
        "Hubo un error al obtener informacion de ese vendedor, error => " +
          error
      );
    } else {
      res.render("editvendedor.ejs", { vendedor: results[0][0] });
    }
    // res.send(results[0][0]);}
  });
});

router.get("/DeleteVendedor/:ID", (req, res) => {
  const id = req.params.ID;
  conexion.query(
    "DELETE FROM vendedor where Id_Vendedor = ?",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.redirect("/Vendedores");
      }
    }
  );
});

router.get("/ShowProducts/:cat", (req, res) => {
  const cat = req.params.cat;
  //res.send(cat);
  
  conexion.query("CALL Show" + cat + "()", (error, results) => 
    {
        if (error) 
        { console.log( "Hubo un error al obtener informacion de este Producto, error => " + error); } 
        else 
        { res.render("showProducts.ejs", { Producto: results, Categoria: cat }); }
        //res.send(cat);}
    }); 

});

router.get("/DeleteProduct/:cat/Producto/:IdProd/Cat/:IdCat", (req, res) => 
{
  const id_prod = req.params.IdProd;
  const id_cat = req.params.IdCat;
  const cat = req.params.cat;

  //res.redirect('/ShowProducts/'+cat);

  res.send('Categoria => '+cat+' / ID Producto => '+id_prod+' / ID Categoria => '+id_cat);

   conexion.query ("CALL DeleteProduct(?,?,?)" , [id_prod, cat, id_cat],(error, results) => 
   {
      if (error) 
      { console.log("Hubo un error al eliminar el producto => " + error); } 
      else 
      {
       res.redirect('/ShowProducts/'+cat);
      }
    });  
});

router.get("/EditProduct/:cat/Producto/:IdProd/Cat/:IdCat", (req, res) => 
{
  const id_prod = req.params.IdProd;
  const id_cat = req.params.IdCat;
  const cat = req.params.cat;

  //res.send('Categoria => '+cat+' ID Producto => '+id_prod+' ID Categoria => '+id_cat);

  conexion.query("CALL SearchProduct(?,?)", [cat,id_prod], (error, results) => {
    if (error) 
    { console.log( "Hubo un error al buscar ese producto, error => " + error ); }
    else 
    {
      res.render("editProducts.ejs", { Producto: results[0][0] , p_cat:cat});
      //res.send(results[0][0]);
    }
      // res.send(results[0][0]);}
  });

});


const crud = require("./controllers/crud");
router.post("/AddClient", crud.AddClient);
router.post("/UpdateClient", crud.UpdateClient);
router.post("/AddVendedor", crud.AddVendedor);
router.post("/UpdateVendedor", crud.UpdateVendedor);
router.post("/AddProduct", crud.AddProduct);
router.post("/UpdateProduct", crud.UpdateProduct);

module.exports = router;
