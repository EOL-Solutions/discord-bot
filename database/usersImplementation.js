const db = require('./connection')

const findUserByID = async (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(err)
      }
      resolve(row)
    })
  })
}

const findUserByUsername = async (username) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) {
        reject(err)
      }
      resolve(row)
    })
  })
}

const findAllUsers = async () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM users', (err, row) => {
      if (err) {
        reject(err)
      }
      resolve(row)
    })
  })
}

const insertNewUser = async (user) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO users (id, username) VALUES (?, ?)', [user.id, user.username], (err) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}

const deleteUserByID = async (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM users WHERE id = ?', [id], (err) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}

module.exports = {
  findUserByID,
  findUserByUsername,
  findAllUsers,
  insertNewUser,
  deleteUserByID
}
