const mysql = require('mysql2')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'felo',
  password: '1234',
  database: 'food',
})
db.connect((error)=>{
  if(error){
      console.log("error connecting to db")
  }
  else{
  console.log('connected to database')}
})

module.exports = db