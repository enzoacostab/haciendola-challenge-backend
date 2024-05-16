import { connectToDatabase } from './util/db'
import app from './app'
import config from './util/config'
const { PORT } = config

const main = async () => {
  try {
    await connectToDatabase()
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()
