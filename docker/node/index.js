const express = require('express')
const app = express()
const port = 3000

//config sql
const config = {
    host: 'db', //nome do container
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) VALUES('Matheus');`;
connection.query(sql);
connection.end();

app.get('/', (req,res) => {
    res.send('<h1>Matheus</h1>')
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})