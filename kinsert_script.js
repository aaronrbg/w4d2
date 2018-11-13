const pg = require('knex')({client: 'pg'});
const connection = require("./settings"); // settings.json

// const client = new pg.Client({
//   user     : settings.database,
//   password : settings.password,
//   database : settings.database,
//   host     : settings.hostname,
//   port     : settings.port,
//   ssl      : settings.ssl
// });

const knex = require('knex')({
    client: 'pg',
    connection
});

const insert = [process.argv[2], process.argv[3], process.argv[4]];

newInsert(insert);
  
function newInsert(insert) {
    knex('famous_people').insert({first_name: insert[0], last_name: insert[1], birthdate: insert[2]}).asCallback((error, result) => {
        if (error) {
                return console.error("error running query", error);
                }
        console.log(`Insert success`);
    knex.destroy()
    });
  }