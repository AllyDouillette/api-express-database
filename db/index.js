// Load our .env file
require('dotenv').config()

console.log(process.env.HOST)
console.log(process.env.PORT)
console.log(process.env.DATABASE)
console.log(process.env.USER)
console.log(process.env.PASSWORD)

// Require Client obj from the postgres node module
import { Client } from "pg"

const client = {
  query: async (str, values) => {
    // Get the connection string from process.env -
    // the dotenv library sets this variable based
    // on the contents of our env file
    // Create a new connection to the database using the Client
    // object provided by the postgres node module
    const dbClient = new Client({
      host: process.env.HOST,
      port: process.env.PORT,
      database: process.env.DATABASE,
      user: process.env.USER,
      password: process.env.PASSWORD
    })
    // connect a connection
    await dbClient.connect()
    // execute the query
    const result = await dbClient.query(str, values)
    // close the connection
    await dbClient.end()
    return result
  }
}

export default client;
