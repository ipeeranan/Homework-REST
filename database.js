const pgp = require('pg-promise')();
var db = pgp('postgres://swvdjapflwlqyg:c0c2a74d8ea2d5012d6e41aadcf5242b7d3a52f6921650ac736b7a10885f5a91@ec2-54-243-147-162.compute-1.amazonaws.com:5432/d1bhuue0uajvkm?ssl=true');

module.exports = {
    getAllProducts,
    getProductByID,
    insertProducts,
    updateProduct
}

function getAllProducts(req, res) {
    db.any('select * from products')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL products'
                });
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        })
}


function getProductByID(req, res) {
    db.any('select * from products where id =' + req.params.id)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved products id:' + req.params.id
                });
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        })
}

function insertProducts(req, res) {
    db.none('insert into products(id, title, price, created_at, tags)' +
        'values(${id}, ${title}, ${price}, ${created_at}, ${tags})',
        req.body)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one product'
                });
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        })
}

function updateProduct(req, res) {
    db.none('update products set id=${id}, title=${title}, price=${price}, tags=${tags} ' + 'where id=' + req.params.id, req.body)
    .then(function (data){
        res.status(200)
        .json({
            status: 'success',
            message: 'Updatae one product'
        });
    })
    .catch(function (error) {
        console.log('ERROR:', error)
    })
}