module.exports = (repo) => {
  const getRandomItem = (items) => repo.getRandomItem(items)

  return {
    getRandomItem
  }
}
