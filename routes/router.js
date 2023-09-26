const express = require('express')
const { register, login, getBalance, moneyTransfer, accountStatement,accountDelete } = require('../controllers/logic')
const { jwtMiddleware } = require('../middlewares/jwtMiddleware')



// router object
const router=new express.Router()

// request from frontend >> backend


// create ac - signup
router.post('/bankuser/create_acc',register)

// login
router.post('/bankuser/login',login)

// check balance
router.get('/bankuser/balance/:acno',jwtMiddleware,getBalance)

// money transfer
router.post('/bankuser/money-transfer',jwtMiddleware,moneyTransfer)

// account statements
router.get('/bankuser/account-statement/:acno',jwtMiddleware,accountStatement)


// profile view


// delete account
router.delete('/bankuser/delete-account/:acno',jwtMiddleware,accountDelete)

// export router
module.exports=router