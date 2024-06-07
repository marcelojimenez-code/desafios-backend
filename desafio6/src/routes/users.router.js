import { Router } from "express";
import userModel from "../models/user.model.js";
import cartModel from "../models/carts.model.js";

const router = Router();

// GET - Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
      const users = await userModel.find();
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// GET - Obtener un usuario por su ID
router.get('/:id', async (req, res) => {
  try {
      const user = await userModel.findById(req.params.id).lean().exec();
      if (user) {
          res.status(200).json(user);
      } else {
          res.status(404).json({ message: 'Usuario no encontrado' });
      }
  } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuario' });
  }
});

// POST - Crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
      const usuario = req.body;
      const findUser = await userModel.findOne({ email: usuario.email, password: usuario.password }).lean().exec();
    
      if (findUser) {
        return res.render("users/register", { message: "el usuario ya existe" });
      }
    
      const cart = await cartModel.create({});
      usuario.cart = cart._id;
      const newUser = await userModel.create(usuario);

      res.status(201).json(newUser);
  } catch (error) {
      res.status(400).json({ error: 'Error al crear usuario' });
  }
});

// PUT - Actualizar un usuario existente
router.put('/:id', async (req, res) => {
  try {
      await userModel.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
      res.status(400).json({ error: 'Error al actualizar usuario' });
  }
});

// DELETE - Eliminar un usuario por su ID
router.delete('/:id', async (req, res) => {
  try {
      await userModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
      res.status(400).json({ error: 'Error al eliminar usuario' });
  }
});

export default router;
