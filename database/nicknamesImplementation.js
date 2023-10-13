const db = require('./connection')

const findNicknamesByUserID = async (id) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM nicknames WHERE user_id = ?', [id], (err, row) => {
      if (err) {
        reject(err)
      }
      resolve(row)
    })
  })
}

const findNicknameByNickname = async (nickname) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM nicknames WHERE nickname = ?', [nickname], (err, row) => {
      if (err) {
        reject(err)
      }
      resolve(row)
    })
  })
}

const insertNewNickname = async (nickname, userID) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO nicknames (nickname, user_id) VALUES (?, ?)', [nickname, userID], (err) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}

const updateNickname = async (oldNickname, newNickname, userID) => {
  return new Promise((resolve, reject) => {
    db.run('UPDATE nicknames SET nickname = ? WHERE nickname = ? AND user_id = ?', [newNickname, oldNickname, userID], (err) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}

const deleteNicknamesByUserID = async (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM nicknames WHERE user_id = ?', [id], (err) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}

const deleteNicknameByNickname = async (nickname) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM nicknames WHERE nickname = ?', [nickname], (err) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}

module.exports = {
  findNicknamesByUserID,
  findNicknameByNickname,
  insertNewNickname,
  updateNickname,
  deleteNicknamesByUserID,
  deleteNicknameByNickname
}
