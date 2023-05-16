const mysqlConnection = require('../db/conexion.cjs'); //
const secretKey = require('../config/config.js').J_KEY;
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');


const signUp = (req, res, next) =>{
    mysqlConnection.query(
        `SELECT * FROM usuarios WHERE LOWER(username) = LOWER(${mysqlConnection.escape(
          req.body.username
        )});`,
        (err, result) => {
          if (result.length) {
            return res.status(409).send({
              msg: 'This username is already in use!'
            });
          } else {
            // username is available
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              if (err) {
                return res.status(500).send({
                  msg: err
                });
              } else {
                // has hashed pw => add to database
                mysqlConnection.query(
                  `INSERT INTO usuarios (id, username, password, registered) VALUES ('${uuid.v4()}', ${mysqlConnection.escape(
                    req.body.username
                  )}, ${mysqlConnection.escape(hash)}, now())`,
                  (err, result) => {
                    if (err) {
                      // throw err;
                      return res.status(400).send({
                        msg: err
                      });
                    }
                    return res.status(201).send({
                      msg: 'Registered!'
                    });
                  }
                );
              }
            });
          }
        }
      );
};

const login = (req, res, next) =>{
    mysqlConnection.query(
        `SELECT * FROM usuarios WHERE username = ${mysqlConnection.escape(req.body.username)};`,
        (err, result) => {
          // user does not exists
          if (err) {
            
            return res.status(400).send({
              msg: err
            });
          }
          if (!result.length) {
            return res.status(401).send({
              msg: 'Username or password is incorrect!'
            });
          }
          // check password
          bcrypt.compare(
            req.body.password,
            result[0]['password'],
            (bErr, bResult) => {
              // wrong password
              if (bErr) {
                //throw bErr;
                return res.status(401).send({
                  msg: 'Username or password is incorrect!'
                });
              }
              if (bResult) {
                const token = jwt.sign({
                    username: result[0].username,
                    userId: result[0].id
                  },
                  secretKey, {
                    expiresIn: '2 minutes'
                  }
                );
                mysqlConnection.query(
                  `UPDATE usuarios SET last_login = now() WHERE id = '${result[0].id}'`
                );
                return res.status(200).send({
                  msg: 'Logged in!',
                  token,
                  user: result[0]
                });
              }
              return res.status(401).send({
                msg: 'Username or password is incorrect!'
              });
            }
          );
        }
      );
}
module.exports = {signUp, login};