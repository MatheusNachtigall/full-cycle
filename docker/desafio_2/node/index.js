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

const mysql = require('mysql')


async function getFakeName() {
    let res = await axios.get('https://api.namefake.com/');
    return res.data.name;
}

app.get('/', async (req,res) => {
    let name = await getFakeName();

    const connection = mysql.createConnection(config)

    const createTable = `create table IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id))`;
    connection.query(createTable);

    let sqlQuery = `INSERT INTO people(name) VALUES('${name}');`;
    connection.query(sqlQuery);

    sqlQuery = `SELECT name FROM people;`;
    connection.query(sqlQuery, (err, result, fields) => {
        let table = '<table>';
        table += '<tr><th>Nomes na tabela:</th></tr>';
        for(let person of result) {      
            table += `<tr><td>${person.name}</td></tr>`;
        }
        table += '</table>';
        res.send('<h1>Full Cycle Rocks2!!</h1>' + table)
    });

    connection.end();

})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})