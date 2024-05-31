import { Router } from "express";
import userModel from "../models/user.model.js";
import cartModel from "../models/carts.model.js";

const router = Router();

/**
 *  GET
 */

//RUTAS PARA EL INGRESO
router.get("/crear", (req, res) => {
  res.render("users/crear", { title: "crear usuario" });
});

router.get("/register", (req, res) => {
  res.render("users/register", { title: "registrar usuario" });
});

router.get("/login", (req, res) => {
  res.render("users/login", { title: "Iniciar Sesion" });
});

router.get("/editar/:id", async (req, res) => {
  const user = await userModel.findById(req.params.id).lean().exec();
  res.render("users/editar", { title: "editar usuario", user });
});

router.get("/profile", async (req, res) => {
  const user = req.session.user
  console.log(user)
  return res.render("users/profile", { message: "Bienvenido ",user});
});

router.get('/listado', async(req,res)=>{
  return res.render('listado',{message:"Perfil Administrador"})
})

/**
 *  POST
 */

router.post("/register", async (req, res) => {
  const usuario = req.body;
  const findUser = await userModel.findOne({ email: usuario.email });

  if (findUser) {
    return res.render("users/register", { message: "el usuario ya existe" });
  }

  const cart = await cartModel.create({});
  usuario.cart = cart._id;
  const newUser = await userModel.create(usuario);
  return res.render("users/listado", {
    title: "Iniciar Sesion",
    newUser,
    message: "el usuario creado",
  });
});

router.post("/editar/:id", async (req, res) => {
  let { id } = req.params;
  let userToReplace = req.body;

  if (!userToReplace.password) {
    return res.render("users/editar", {
      title: "editar usuario",
      message: "No se puede grabar sin password",
    });
  }
  let result = await userModel.updateOne({ _id: id }, userToReplace);
  return res.render("users/listado", {
    title: "Iniciar Sesion",
    userToReplace,
    message: "Usuario Actualizado",
    result,
  });
});

// Ruta para iniciar sesión
router.post("/login", async (req, res) => {
  const login = req.body;

  try {
    const validar = await userModel.findOne({
      email: login.email,
      password: login.password,
    });

    if (validar) {
      const users = await userModel.find().lean().exec();
      console.log(users);

      req.session.user = {
        id: validar._id,
        name: validar.name,
        lastname: validar.lastname,
        email: validar.email,
        password: validar.password,
        age: validar.age,
        role: validar.role,
      };

       
      if(validar.role === 'admin'){
        return res.render("users/listado",{message: "Bienvenido Admin "},users)
      }else{
        return res.render("users/profile",{message: "Bienvenido Usuario"})
      }

      return res.render("users/listado", {
        title: "Iniciar Sesion",
        users,
        payload: validar,
      });
    } else {
      return res.render("users/login", { message: "Credenciales inválidas" });
    }
  } catch (error) {
    return res.render("users/login", {
      message: "Error al intentar iniciar sesión",
    });
  }
});

/**
 *  PUT 
 */


/**
 *  DELETE
 */


export default router;
