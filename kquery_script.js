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

const search = process.argv[2];

newQuery(search);
  
function newQuery(search) {
    knex.select().from('famous_people').where({first_name: search}).asCallback((error, result) => {
        if (error) {
                return console.error("error running query", err);
                }
        console.log(`Found ${result.length} person(s) matching ${search}:`)

    printQuery(result);

    knex.destroy()
    });
  }
  
  function printQuery(result) {
      result.forEach( (row, resultIndex) => {
          born = row.birthdate.toString().substring(4,15);
          console.log(`- ${resultIndex + 1}: ${row.first_name} ${row.last_name}, born ${born}`);
          });
  }