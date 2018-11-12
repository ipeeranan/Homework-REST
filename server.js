var express = require('express');
var app = express();
var db = require('./database');


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Add routing
app.get('/', function (req, res) {
    res.send('Express is running');
});
var output = {
    status: 'success',
    message: 'REST API is working'
}
app.get('/api/json',function(req,res){
    res.status(500).json(output);
});

app.get('/api/products/', db.getAllProducts);
app.get('/api/products/:id', db.getProductByID);
app.post('/api/products/', db.insertProducts);
app.put('/api/products/:id', db.updateProduct);
//Purchase_item
app.get('/api/purchase_items', db.getPurchase_items);
app.get('/api/purchase_items/:id', db.getPurchase_itemsByID);
app.post('/api/purchase_items', db.InsertPurchase_items);
app.put('/api/purchase_items/:id', db.UpdatePurchase_items);
app.delete('/api/purchase_items/:id', db.DeletePurchase_items);
//Purchase
app.get('/api/purchase', db.getPurchase);
app.get('/api/purchase/:id', db.getPurchaseByID);
app.post('/api/purchase', db.insertPurchase);
app.put('/api/purchase/:id', db.updatePurchase);
app.delete('/api/purchase/:id', db.DeletePurchase);
//users
app.get('/api/users', db.getUsers);
app.get('/api/users/:id', db.getUsersByID);
app.post('/api/users', db.InsertUsers);
app.put('/api/users/:id', db.UpdateUsers);
app.delete('/api/users/:id', db.DeleteUsers);

var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log('App is running on http://localhost:' + port);
});