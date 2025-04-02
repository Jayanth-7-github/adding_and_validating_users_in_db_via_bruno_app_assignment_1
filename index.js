const express = require('express');
const { resolve } = require('path');
const {connect} =require("./connect")
const {UserModel} =require('./Model')
const bcrypt=require('bcrypt');
const { error } = require('console');

const app = express();
const port = 3010;
app.use(express.json())

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});


app.post('/signup',async(req,res)=>{

  const {username,mail,password}=req.body;
  
  bcrypt.hash(password,6,async(error,hash)=>{

    if (error){
      res.status(500).json({message:"Server Error"})
    }

    let newuser=new UserModel({username,mail,password:hash})

    await newuser.save()
    res.status(200).json({ status: true, message: "registration sucessfull" })
    
  })

})





app.post("/login",async(req,res)=>{
  const {mail,password}=req.body;
  try {
    if(!mail || !password){
      res.status(400).json({ status: true, message: "All feilds requrieded" })
    }
    let user=await UserModel.findOne({mail})
    if(!user){
      res.status(400).json({ status: true, message: "Please signup" })
    }
    await bcrypt.compare(password,user.password,function(err,result){
      if(err){
        res.status(500).json({ status: true, message: "Internal Server error" })
      }
      if(!result){
        res.status(400).json({ status: true, message: "password is incorret" });
      }
      res.status(200).json({ status: true, message: "Login sucessfull" })
    })
    
  } catch (error) {
      console.log(error)
  }
})






app.listen(port, () => {

  try {


    console.log(`Example app listening at http://localhost:${port}`);

    connect
    
  } catch (error) {
    console.log(error)
  }
  
});