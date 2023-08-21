const argon2 = require("argon2");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  const { password } = req.body;

  console.log("Password received:", password);

  if (!password) {
    console.log("Password is missing");
    return res.status(400).send("Password is required");
  }

  argon2
    .hash(password, hashingOptions)
    .then((hashedPassword) => {
      console.log("Hashed password:", hashedPassword);
      req.body.hashedPassword = hashedPassword;
      delete req.body.password;

      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  hashPassword,
};
