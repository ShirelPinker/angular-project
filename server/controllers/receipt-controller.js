// const productsLogic = require("../logic/products-logic");
const express = require("express");
const router = express.Router();
const fs = require('fs/promises')

// router.get('/', (req,res)=>{
//     res.sendFile(__dirname+'/index.html')
// })

router.post('/', async (req, res) => {
    const receiptItems = req.body;
    const id = Math.random().toString().replace('0.', '')
    let str = 'Recipe No. ' + id
    for (const item of receiptItems) {
        const price = item.unitPrice * item.quantity
        str += `
        ${item.productName} || ${price}$
        _______________________________`
    }

    try {
        await fs.writeFile(id + '.txt', str)
        // console.log(__dirname+'\\..\\..\\'+id+'.txt')
        // res.sendFile(__dirname+'\\..\\..\\'+id+'.txt')
         res.json({ id })

    } catch (err) {
        console.log(err);
    }
   
})

router.get('/recipe/:id', (req,res)=>{
    res.sendFile(__dirname+'/'+req.params.id+'.txt')
})

module.exports = router;
