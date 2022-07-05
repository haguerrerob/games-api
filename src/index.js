import server from './app'
import recursos from './db'
const { conn } = recursos

const PORT = process.env.PORT || 4000

// Sync all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`) // eslint-disable-line no-console
  })
})
