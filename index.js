require('dotenv').config()
const { client, token } = require('./client')
const clientEvents = require('./client-events/index')

const {
  usersRepository,
  configurationsRepository,
  nicknamesRepository,
  utilsRepository
} = require('./repository/index')

const {
  usersImplementation,
  configurationsImplementation,
  nicknamesImplementation
} = require('./database/index')

const utilsImplementation = require('./utils/index')

const repositories = {
  usersRepository: usersRepository(usersImplementation),
  configurationsRepository: configurationsRepository(configurationsImplementation),
  nicknamesRepository: nicknamesRepository(nicknamesImplementation),
  utilsRepository: utilsRepository(utilsImplementation)
}

clientEvents(repositories)

client.login(token)
