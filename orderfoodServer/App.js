const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser');

const app = express()

app.use(cors({
    origin: 'http://localhost:5173', 
  }));
app.use(bodyParser.json())
app.use(cookieParser());

const db = mysql.createConnection({
    host:"localhost",
    user:'felo',
    password:"1234",
    database:'food',
})
db.connect((error)=>{
    if(error){
        console.log("error connecting to db")
    }
    else{
    console.log('connected to database')}
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); 
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log("ll")
    db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
      if (err) {
        console.error('MySQL error:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Set a cookie 
      res.cookie('authCookie', 'authenticated', { httpOnly: true });
      res.status(200).json({ message: 'Login successful' });
    });
  });

  app.post('/signup', (req, res) => {
    const { name, email, password, phone } = req.body;
  
    // Check if exist
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error('MySQL error:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      if (results.length > 0) {
        return res.status(409).json({ message: 'Email already exists' });
      }
  
      // Insert a new user
      db.query('INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?,?)', [name, email, password, phone], (err) => {
        if (err) {
          console.error('MySQL error:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }
  
        res.status(201).json({ message: 'User created successfully' });
      });
    });
  });

app.post('/items', (req, res)=>{
    const queryItems ='SELECT * FROM food'
    // console.log("getting items")
    db.query(queryItems, (error, results)=>{
        if(error){ console.log('An error occurred while fetching items from db' + error)}
        else{
            const items =results.map(item =>({
                item_id: item.item_id,
                name: item.name,
                price: item.price,
                item_description: item.item_description,
                image:`data:image/jpeg;base64,${item.image.toString('base64')}`
            }))

            res.json(items)

        }
    })
})
app.get('/cart/user',(req, res)=>{
    const user_id =1
    console.log('server called bt usercart')
    const query ='SELECT * FROM cart WHERE user_id = ?'
    db.query(query, user_id, (error, results)=>{
        if(error){
            console.log("error retriving cartitems "+ error)
        } else{
            res.status(200).json(results)
        }
    })
    // res.status(200).json(items)
})

app.post('/cart/add', (req, res)=>{
    const {name, item_id, price }= req.body
    const user_id =1
    const cart_id = `${user_id}`+`${item_id}`
    const quantity =1
    console.log("this items came " + name +item_id+quantity+price)
    const query = "INSERT INTO cart (user_id, cart_id, item_id, name, price,quantity) VALUES(?,?,?,?,?,?)"
    db.query(query, [user_id, cart_id, item_id, name,price,quantity], (error, results)=>{
        if(error){console.log("the cart insertion failed due to " + error)}
        else{
            console.log("cart insertion success")
        }
    })
    res.status(200)
})
app.put('/cart/update',(req, res)=>{
    const {item_id, updatedQuantity} = req.body
    console.log(item_id + " ss " + updatedQuantity)
    const query ='UPDATE cart SET quantity = ? WHERE user_id =? AND item_id = ?'
    db.query(query,[updatedQuantity, 1, item_id],(error, results)=>{
        if(error){
            console.log('error while updating, ' + error)
        }
        else{
            console.log('item updated')
        }
    })
    res.status(200)
})
app.put('/cart/delete', (req, res)=>{
    const {item_id} = req.body
    console.log("deliting " + item_id)
    const deletQuery = 'DELETE FROM cart WHERE item_id = ?'
    db.query(deletQuery, [item_id],(error, results)=>{
        if(error){console.log('error while deleting '+ error)}
        else{console.log("item deleted")}
    })
})


app.post('/image', (req, res) => {
    // const item_id = req.params.imgId
    const{item}=req.body
    console.log(item.item_id+"  is thenimahewiefdf")
    db.query('SELECT image FROM food WHERE item_id = ?', [item.item_id], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error fetching image');
      } else {
        if (results.length > 0) {
            console.log('image foud sucker')
          const imageBuffer = `data:img/jpeg;base64,${results[0].image.toString('base64')}`; // Get the BLOB data
          console.log(imageBuffer)
          res.end(imageBuffer);
        } else {
          res.status(404).send('Image not found');
        }
      }
    });
  });
  

app.listen(3000, () =>{
    console.log('app running')
})