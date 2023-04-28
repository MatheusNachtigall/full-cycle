const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000

//config sql
const config = {
    host: 'desafio-db', //nome do container
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

// const mysql = require('mysql')
// const connection = mysql.createConnection(config)

// const createTable = `create table IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id))`;
// connection.query(createTable);

// const insertIntoTable = `INSERT INTO people(name) VALUES('Matheus');`;
// connection.query(insertIntoTable);

// connection.end();

async function getFakeName() {
    let res = await axios.get('https://api.namefake.com/');
    let name = res.data.name;
    console.log(names);
}

app.get('/', (req,res) => {
    res.send('<h1>Full Cycle Rocks2!!</h1>')
    getFakeName();
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})