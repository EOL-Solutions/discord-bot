const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/sqlite.db', (err) => {
  if (err) {
    console.log(err.message)
  }
  console.log('Connected to the database.')
})

module.exports = db
