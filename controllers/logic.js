const users = require("../models/collection")
const jwt=require('jsonwebtoken')



// register-account creation

register = (req, res) => {
    // acno=req.body.acno
    // const {acno}=req.body

    // psw=req.body.psw
    // const {psw}=req.body

    // uname=req.body.uname
    // const {uname}=req.body

    // destructuring

    const { acno, psw, uname } = req.body

    // check user data in collection
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(400).json({
                message: "User already exists",
                status: false,
                statusCode: 400
            })
        }
        else {
            //create an object for user
            let newUser = new users({
                acno,
                psw,
                uname,
                balance: 0,
                transactions: []
            })
            // save in database
            newUser.save()
            res.status(201).json({
                message: "account created successfully",
                status: true,
                statusCode: 201
            })
        }
    })
}

login = (req, res) => {
    // access data from request body
    const { acno, psw } = req.body

    users.findOne({ acno, psw }).then(user => {
        if (user) {
            // token generation
            const token=jwt.sign({acno},"secretkey123")
            res.status(200).json({
                message: "login success",
                status: true,
                statusCode: 200,
                currentUser: user.uname,
                token
            })
        }
        else {
            res.status(404).json({
                message: "incorrect account number or password",
                status: false,
                statusCode: 404
            })
        }
    })
}

getBalance = (req, res) => {
    // access acno from request param
    const { acno } = req.params
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(200).json({
                message: user.balance,
                status: true,
                statusCode: 200
            })
        }
        else {
            res.status(404).json({
                message: 'User not found',
                status: false,
                statusCode: 404
            })
        }
    })
}

moneyTransfer = (req, res) => {
    const { sAcno, rAcno, amount, psw, date } = req.body;
    // Convert amount to a number
    const amnt = parseInt(amount);
  
    users.findOne({ acno: sAcno, psw }).then((suser) => {
      if (suser) {
        users.findOne({ acno: rAcno }).then((ruser) => {
          if (ruser) {
            // Check amount in sender's balance
            if (amnt <= suser.balance) {
              suser.balance = suser.balance - amnt;
              suser.transactions.push({ tAcno: rAcno, amount: amnt, type: "DEBIT", date });
              suser.save();
  
              // Update receiver's object
              ruser.balance = ruser.balance + amnt;
              ruser.transactions.push({ tAcno: sAcno, amount: amnt, type: "CREDIT", date });
              ruser.save();
  
              res.status(200).json({
                message: "Transaction success!!",
                status: true,
                statusCode: 200,
              });
            } else {
              res.status(406).json({
                message: "Insufficient balance",
                status: false,
                statusCode: 406,
              });
            }
          } else {
            res.status(404).json({
              message: "Invalid debit credentials",
              status: false,
              statusCode: 404,
            });
          }
        });
      } else {
        res.status(404).json({
          message: "Recipient account number not found",
          status: false,
          statusCode: 404,
        });
      }
    });
  };
  

accountStatement = (req, res) => {
    const { acno } = req.params
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(200).json({
                message: user.transactions,
                status: true,
                statusCode: 200
            })
        }
        else {
            res.status(404).json({
                message: 'Account not found',
                status: false,
                statusCode: 404
            })
        }

    })

}

accountDelete=(req,res)=>{
    const {acno}=req.params
    users.deleteOne({acno}).then(data=>{
        if(data){
            res.status(200).json({
                message:"account deleted successfully",
                status:true,
                statusCode:200
            })
        }
    })
}

module.exports = { register, login, getBalance,moneyTransfer,accountStatement,accountDelete }