const mysqlConnection = require('../db/conexion.cjs');

const create = (req, res) => {
    console.log(req.body);
    res.json({message: "POST new vehiculo"}); // dummy function for now
};

const edit = (req,res) => {
    console.log(req.body);
    res.json({message: 'PUT edit vehiculo'}); // dummy function for now
}

const list = (req,res) => {
    console.log('all vehiculos');
    mysqlConnection.query('SELECT * FROM productos',(err, results, fields) => {
        if(err) res.json(err);
        else res.json(results);
    })
    //res.json({message: 'GET all vehiculos'}); // dummy function
}
module.exports = {create, edit, list};