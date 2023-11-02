const getPoolCommand = require('./getPool/index')
const addPoolCommand = require('./addPool/index')
const createPoolCommand = require('./createPool/index')
const removePoolCommand = require('./removePool/index')
const editPoolCommand = require('./editPool/index')
const sacarBobitos = require('./sacarBobitos/index')
const mutearBobitos = require('./mutearBobitos/index')
const deafearBobitos = require('./deafearBobitos/index')
const timearBobitos = require('./timearBobitos/index')
const changeDisplayNames = require('./changeDisplayNames/index')
const changeConfig = require('./configDefaultValues/index')

module.exports = {
  getPoolCommand,
  addPoolCommand,
  createPoolCommand,
  removePoolCommand,
  editPoolCommand,
  sacarBobitos,
  mutearBobitos,
  deafearBobitos,
  timearBobitos,
  changeDisplayNames,
  changeConfig
}
