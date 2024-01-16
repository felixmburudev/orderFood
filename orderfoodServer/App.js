const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser');

const app = express()

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
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


  // Middleware to check authe
const checkAuth = (req, res, next) => {
  const authCookie = req.cookies.authCookie;

  if (!authCookie) {
    return res.status(401).json({ message: "access denaid" });
  }
  const userEmail = authCookie;
  req.user = { userEmail };

  next();
};

app.get('/check-auth', (req, res) => {
  const isAuthenticated = req.cookies.authCookie === 'authenticated';
  res.json({ authenticated: isAuthenticated });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
      if (err) {
        console.error('MySQL error:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Set a cookie 
      const userEmail = results[0].email;
    res.cookie('authCookie', userEmail, );
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
app.get('/cart/user', checkAuth ,(req, res)=>{
  const userEmail = req.user.userEmail;
    const query ='SELECT * FROM cart WHERE email = ?'
    db.query(query, userEmail, (error, results)=>{
        if(error){
            console.log("error retriving cartitems "+ error)
        } else{
            res.status(200).json(results)
        }
    })
    // res.status(200).json(items)
})

app.post('/cart/add', checkAuth, (req, res)=>{  
    const userEmail = req.user.userEmail;
    const {name, item_id, price }= req.body
    const quantity = 1
    const cart_id = `${userEmail}`+`${item_id}`
    const query = "INSERT INTO cart (email, cart_id, item_id, name, price,quantity) VALUES(?,?,?,?,?,?)"
    db.query(query, [userEmail, cart_id, item_id, name,price,quantity], (error, results)=>{
        if(error){console.log("the cart insertion failed due to " + error)}
        else{
            console.log("cart insertion success")
            res.status(200)
        }
    })
})
app.put('/cart/update', checkAuth, (req, res)=>{
    const userEmail = req.user.userEmail;
    const {item_id, updatedQuantity} = req.body
    const query ='UPDATE cart SET quantity = ? WHERE email =? AND item_id = ?'
    db.query(query,[updatedQuantity, userEmail, item_id],(error, results)=>{
        if(error){
            console.log('error while updating, ' + error)
        }
        else{
            console.log('item updated')
            res.status(200)
        }
    })
})
app.put('/cart/delete', checkAuth, (req, res)=>{
    const userEmail = req.user.userEmail;
    const {item_id} = req.body
    const deletQuery = 'DELETE FROM cart WHERE item_id = ? AND email = ?'
    db.query(deletQuery, [item_id, userEmail],(error, results)=>{
        if(error){console.log('error while deleting '+ error)}
        else{console.log("item deleted")}
    })
})


app.post('/image', (req, res) => {
    // const item_id = req.params.imgId
    const{item}=req.body
    db.query('SELECT image FROM food WHERE item_id = ?', [item.item_id], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error fetching image');
      } else {
        if (results.length > 0) {
          const imageBuffer = `data:img/jpeg;base64,${results[0].image.toString('base64')}`; // Get the BLOB data
          res.end(imageBuffer);
        } else {
          res.status(404).send('Image not found');
        }
      }
    });
  });
  
  app.get('/user-profile', checkAuth, (req, res) => {
    const userEmail = req.user.userEmail;
    db.query('SELECT * FROM users WHERE email = ?', [userEmail], (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const user = results[0];
      res.json({ user });
    });
  });

 
app.post('/logout', (req, res) => {
  // Clear auth cookie
  res.clearCookie('authCookie', { httpOnly: true });
console.log("Logout successful")
  res.json({ message: 'Logout successful' });
});


app.listen(3000, () =>{
    console.log('app running')
})