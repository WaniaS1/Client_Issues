const { MongoClient } = require('mongodb')

let dbConnection

module.exports = {
  connectToDb: function(cb){
    MongoClient.connect('mongodb://localhost:27017/SDF_1_Wsparcie')
    .then((client) => {
      dbConnection = client.db()
      return cb()
    })
    .catch((err)=>{
      console.log("Connection to the database cannot be established")
      console.log(err)
      return cb(err)
    })
  },
  getDb: () => dbConnection
}
