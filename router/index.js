const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const iplocate = require("node-iplocate");
const nodemailer = require("nodemailer");
const { email, database } = require("./credentials");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  res.render("index");

  iplocate(req.connection.remoteAddress).then(function (res) {
    if (res.country !== null) {
      conn.query(
        "INSERT INTO stats SET?",
        {
          id_visitor: null,
          ip: res.ip,
          country: res.country,
          country_code: res.country_code,
        },
        function (err, res) {
          if (err) console.log(err);
        }
      );
    }
  });
});

router.post("/register", (req, res, next) => {
  const { nombre, sex, correo } = req.body;
  conn.query(
    "INSERT INTO usuarios SET?",
    {
      id_usuario: null,
      nombre: nombre,
      sexo: sex,
      correo: correo,
    },
    (err, result) => {
      if (err) {
        console.log(`An error has occurred ${err}`);
      } else {
        const mailOptions = {
          from: "All Sec",
          to: correo,
          subject: {
            prepared: true,
            value:
              "=?UTF-8?B?" +
              new Buffer("BIENVENIDO AL EQUIPO ALL-SEC").toString("base64") +
              "?=",
          },
          html: `Para iniciar sesión en nuestra página, utilice las siguientes credenciales <br/> <strong>Usuario:</strong> ${correo} <br/> <strong>Contraseña:</strong> _Sus~H.eT.64@7@]`,
        };

        transport.sendMail(mailOptions, function (err, result) {
          if (err) {
            console.log(err);
          } else {
            res.render("register", { email: correo });
          }
        });
      }
    }
  );
});

router.post("/login", (req, res) => {
  var correo = req.body.email;
  var contraseña = req.body.password;

  conn.query(
    `SELECT u.correo FROM usuarios u WHERE u.correo="${correo}"`,
    function (err, result) {
      if (err) {
        console.log({ err });
      }
      if (result.length > 0) {
        if (contraseña == "_Sus~H.eT.64@7@]" && result[0].correo == correo) {
          res.render("client", { admin: true, email: correo });
        } else {
          res.render("index");
        }
      } else {
        res.render("index");
      }
    }
  );
});

router.get("/client", (req, res, next) => {
  res.render("client", { admin: false });
});

router.get("/streaming", (req, res, next) => {
  res.render("streaming");
});

router.get("/stats", (req, res, next) => {
  conn.query(
    "SELECT country_code, count(id_visitor) AS user_count FROM stats GROUP BY country_code",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.render("stats", { data: result });
      }
    }
  );
});

const conn = mysql.createConnection({
  host: database.host,
  port: database.port,
  user: database.user,
  password: database.password,
  database: database.name,
});

conn.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected database");
  }
});

const transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: email.mail,
    pass: email.password,
  },
});

module.exports = router;
