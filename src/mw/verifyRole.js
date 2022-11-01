const ADMIN = true;

const verifyRole = (req, res, next) =>{
  ADMIN ? next() : res.send({ error: "User no autorizado"})
}

export { verifyRole };