"use strict";
const express = require("express");
const routes = express.Router();

const cartItems = [{
    id: 1,
    product: "item1",
    price: 100,
    quantity: 3
},
{
    id: 2,
    product: "item2",
    price: 200,
    quantity: 2
},
{
    id: 3,
    product: "item3",
    price: 300,
    quantity: 3
},
{
    id: 4,
    product: "sword",
    price: 400,
    quantity: 4
}
]

routes.get("/cart-items", (req, res)=>{
    let filteredCartItems = cartItems;
    const maxPrice = parseFloat(req.query.maxPrice);
    const prefix = req.query.prefix;
    const pageSize = parseInt(req.query.pageSize);
    if(maxPrice){
        filteredCartItems = filteredCartItems.filter(item=>item.price<maxPrice);
    }
    if(prefix){
        filteredCartItems = filteredCartItems.filter(item=>item.product.toLowerCase().startsWith(prefix.toLowerCase()));
    }
    if(pageSize){
        filteredCartItems = filteredCartItems.slice(0, pageSize);
    }
    res.json(filteredCartItems);
})

routes.get("/cart-items/:id",(req, res)=>{
    const id = parseInt(req.params.id);
    const item = cartItems.find(item=>item.id===id);
    
    if(item){
        res.status(200);
        res.json(item);
    }
    else{
        res.status(404);
        res.send('No items found');
    }
})

routes.post("/cart-items", (req, res)=>{
    const item = req.body;
    item.id = cartItems.length+1;
    cartItems.push(item);
    res.status(201);
    res.json(item);
})

routes.put("/cart-items/:id",(req, res)=>{
    console.log("hello")
    const id = parseInt(req.params.id);
    const index = cartItems.findIndex(item=>item.id===id);
    if(index!=-1){
        if(req.body.quantity) cartItems[index].quantity = req.body.quantity;
        if(req.body.product) cartItems[index].product = req.body.product;
        if(req.body.price) cartItems[index].price = req.body.price;
        cartItems[index].id = id;
        res.status(200);
        res.json(cartItems[index]);
    }
    else{
        res.status(404);
        res.send('No items found');
    }

})

routes.delete("/cart-items/:id",(req,res)=>{

    const id = parseInt(req.params.id);
    const index = cartItems.findIndex(item=>item.id===id);
    if(index!=-1){
        cartItems.splice(index, 1);
    }
    else{
        res.status(404);
        res.send('id not found');
    }
    res.status(204);
    res.send();
});


module.exports = routes;