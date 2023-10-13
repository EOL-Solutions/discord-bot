module.exports = (repo) => {
  const findConfigurationByField = async (field) => repo.findConfigurationByField(field)
  const insertNewConfiguration = async (field, value) => repo.insertNewConfiguration(field, value)
  const updateConfiguration = async (field, value) => repo.updateConfiguration(field, value)
  const deleteConfigurationByField = async (field) => repo.deleteConfigurationByField(field)

  return {
    findConfigurationByField,
    insertNewConfiguration,
    updateConfiguration,
    deleteConfigurationByField
  }
}
