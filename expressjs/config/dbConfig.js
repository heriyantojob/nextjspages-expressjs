import knex from 'knex'
// import knexfile from 'knexfile'
//import { Model } from "objection"

const dbConfig = knex({
    client: 'mysql2',
    connection: {
      // database : 'project_joint_viral',
      database : 'project_joint_viral_express',
      host : 'localhost',
      port : 3306,
      user : 'root',
      password : '',
   
    }, pool: { min: 0, max: 7 },  
   
  })

 // Model.knex(dbConfig)

export default dbConfig


// https://itnext.io/express-knex-objection-painless-api-with-db-74512c484f0c