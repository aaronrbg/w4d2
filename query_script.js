const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  const search = process.argv[2];
  console.log('Searching...');

  newQuery(search);

});

function newQuery(search) {
        client.query(`SELECT * 
        FROM famous_people
        WHERE first_name LIKE $1::text;`, [search], (err, result) => {
    if (err) {
    return console.error("error running query", err);
    }
    console.log(`Found ${result.rows.length} person(s) matching ${search}:`)

    printQuery(result);

    client.end();
    });
}

function printQuery(result) {
    result.rows.forEach( (row, resultIndex) => {
        born = row.birthdate.toString().substring(4,15);
        console.log(`- ${resultIndex + 1}: ${row.first_name} ${row.last_name}, born ${born}`);
        });
}