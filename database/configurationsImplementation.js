const db = require('./connection')

const findConfigurationByField = async (field) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM configurations WHERE field = ?', [field], (err, row) => {
      if (err) {
        reject(err)
      }
      resolve(row)
    })
  })
}

const insertNewConfiguration = async (field, value) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO configurations (field, value) VALUES (?, ?)', [field, value], (err) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}

const updateConfiguration = async (field, value) => {
  return new Promise((resolve, reject) => {
    db.run('UPDATE configurations SET value = ? WHERE field = ?', [value, field], (err) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}

const deleteConfigurationByField = async (field) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM configurations WHERE field = ?', [field], (err) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}

module.exports = {
  findConfigurationByField,
  insertNewConfiguration,
  updateConfiguration,
  deleteConfigurationByField
}
