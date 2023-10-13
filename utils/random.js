const queue = []

module.exports = (items) => {
  const queueLastItem = queue.pop()
  for (let i = 0; i < 10; i++) {
    const item = items.sort(() => 0.5 - Math.random())[0]
    if (queueLastItem !== item) {
      queue.unshift(item)
      return item
    }
  }

  queue.push(queueLastItem)
  return items.sort(() => 0.5 - Math.random())[0]
}
