const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const checkAuth = require('./controllers/authController')
const addToCart = require('./routes/addToCart')
const itemRoute = require('./routes/itemRoute')
const userCart = require('./routes/userCart')
const signup = require('./routes/signup');
const getCartImg = require('./routes/cartItemImage');
const logout = require('./routes/logout')
const login = require('./routes/login')
const updateCart= require('./routes/updateCart')
const deleteCartItem = require('./routes/deleteCartItem')
const userProfile = require('./routes/userProfile')

const app = express()
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
  }));
app.use(bodyParser.json())
app.use(cookieParser());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); 
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });


app.get('/items', itemRoute)
app.post('/login', login);
app.post('/signup', signup);
app.get('/cart/user', checkAuth , userCart)
app.post('/cart/add', checkAuth, addToCart)
app.put('/cart/update', checkAuth, updateCart)
app.put('/cart/delete', checkAuth, deleteCartItem)
app.post('/image', getCartImg);  
app.get('/user-profile', checkAuth, userProfile); 
app.post('/logout', checkAuth, logout);


app.listen(3000, () =>{
    console.log('app running')
})