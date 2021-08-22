const { Router } = require("express");
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuarioSignin,
  usuariosDelete2,
} = require("../controlers/usuarios");

const router = Router();

// localhost:3001/usuarios/
router.get("/", usuariosGet);
router.post("/", usuariosPost);
router.put("/", usuariosPut);
router.delete("/", usuariosDelete);
router.post("/signin/", usuarioSignin);
router.delete("/delete2", usuariosDelete2);

module.exports = router;