const router = require("express").Router();
let ShoppingList = require("../models/ShoppingList");

http://localhost:8070/ShoppingListRoutes/add

router.route("/add").post((req,res)=>{

    const itemName = req.body.itemName;
    const category = req.body.category;
    const quantity = Number(req.body.quantity);
    const unit = req.body.unit;
    const addedDate = req.body.addedDate;
    const estimatedPrice = Number(req.body.estimatedPrice);

    const newShoppingList = new ShoppingList({

        itemName,
        category,
        quantity,
        unit,
        addedDate,
        estimatedPrice

    })

    newShoppingList.save().then(()=>{
        res.json("Shopping list added");
    }).catch((err)=>{
        console.log(err);
    })

})

module.exports = router;