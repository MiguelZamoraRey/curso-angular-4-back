const express = require('express');
const app = express();
const port = 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'curso_angular4'
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting to BBDD: ' + err.stack);
        return;
    }
    console.log('Succesfull connect!! ' + connection.threadId);
});

app.get('/', (req, res) => res.send('API REST: curso angular 4'))
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


app.get('/producto/:id',(req,res)=>{
    connection.query('SELECT * FROM productos where id = '+req.params.id, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
})
app.get('/producto',(req,res)=>{
    connection.query('SELECT * FROM productos', function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
})
app.delete('/producto/:id',(req,res)=>{
    connection.query('DELETE FROM productos WHERE id = '+req.params.id, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
})
app.post('/producto',(req,res)=>{
    var name = req.body.name;
    var description = req.body.description;
    var price = req.body.price;
    connection.query("INSERT INTO productos (nombre,description,precio) VALUES ('"+name+"','"+description+"','"+price+"')", function (error, results, fields) {
        if (error) throw error;
        res.send(req.body);
    });
})
app.put('/producto/',(req,res)=>{
    var id = req.body.id;
    var name = req.body.name;
    var description = req.body.description;
    var price = req.body.price;
    connection.query("UPDATE productos SET nombre='"+name+"', description='"+description+"',precio='"+price+"' where id = "+id, function (error, results, fields) {
        if (error) throw error;
        res.send("changed");
    });
})
app.post('/upload-file/:id',(req,res)=>{

})