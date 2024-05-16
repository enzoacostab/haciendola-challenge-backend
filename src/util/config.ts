import dotenv from 'dotenv'
dotenv.config()

export default {
  POSTGRES_URL: process.env.POSTGRES_URL,
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASS: process.env.POSTGRES_PASS,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  PORT: process.env.PORT || 3000,
  SECRET: process.env.SECRET,
  CLIENT_URL: process.env.CLIENT_URL
}
