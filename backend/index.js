const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('node:path'); 
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { log } = require('node:console');

app.use(express.json());
app.use(cors());




mongoose.connect("mongodb+srv://niranzanroy1:01737650473@nayanproject.ww3uvvb.mongodb.net/nayanproject")
.then(()=>console.log('database is connected'))
.catch((error)=>{
  console.log('database is not connected');
  console.log(error.message);
});

// image upload

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/images');
   
  },
  filename: function (req, file, cb) {
    console.log(file)
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname
    (file.originalname)}`);
   
  }
})


const upload = multer({ storage: storage })
app.use( "/images" ,express.static(__dirname + '/uploads/images'));
// console.log(__dirname);
// app.use(express.static('file'));
//creating upload endpoint
app.post("/uploads", upload.single('product'),(req, res)=>{
  console.log(req.file)
    res.json({
       success:true,
       img_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})


//Creating Schema
const Product = mongoose.model('Product',{
    id:{
      type:Number,
      required:true,
    },
    name:{
      type:String,
      required:true,
    },
    image:{
      type:String,
      required:true,
    },
    category:{
      type:String,
      required:true,
    },
    new_price:{
      type:Number,
      required:true,
    },
    old_price:{
      type:Number,
      required:true,
    },
    date:{
      type:Date,
      default:Date.now,
    },
    avilable:{
        type:Boolean,
        default:true
    }
})
//addproduct endpoint
app.post("/addproduct", async(req, res)=>{
     let products = await Product.find({});
       let id;
        if(products.length > 0){
           let last_product = products.slice(-1);
           id =last_product[0].id + 1;
        }else{
          id=0;
        }
     const product = new Product({
          id:id,
          name:req.body.name,
          image:req.body.image,
          category:req.body.category,
          new_price:req.body.new_price,
          old_price:req.body.old_price,
     })
      console.log(product._id);
      await  product.save();
      res.json({
          success:true
      })
})
//removeproduct
app.post("/removeproduct", async(req, res)=>{
    await  Product.findOneAndDelete({id:req.body.id});
    res.json({
        success: true,
        message : `Product id ${req.body.id} has been deleted`,
    });
})

//readProducts

app.get("/allproducts", async(req, res)=>{
      let products = await Product.find({});
      res.send(products);
})
// creating schema to store user information
 
const Users = mongoose.model('Users', {
      username:{
         type:String,
         required: true,
      },
      email : {
        type : String,
        required: true,
        unique : true,
      },
      password : {
         type : String,
         required : true,
      },
      cartData : {
         type : Object,  
      },
      date :{
         type :Date,
         default : Date.now,
      }
})

// creating endpoint to store user information

app.post("/signup", async(req, res)=>{
    let  check = await Users.findOne({email: req.body.email});
    if(check){
       return res.status(402).json({success:false, errors : 'Exsisting user find with same email id'});
    }

    let cart ={};
    for (let i = 0; i < 300; i++) {    
        cart[i] = 0;
    }
    const user = new Users({
         username : req.body.username,
         email : req.body.email,
         password : req.body.password,
         cartData : cart,
    })
   
    await user.save();
     
   const data = {
       user : {
          id : user.id,
          
       } 
    }
    
    console.log(data.user.id);
    const token = jwt.sign(data , "secret_ecom");
    res.json({success : true , token});

})

//creating endpoint for login

app.post("/login", async(req, res)=>{
     const user = await Users.findOne({email: req.body.email});
     if(user){
         let checkpassword = user.password === req.body.password;
         if(checkpassword){
             const data = {
                 user : {
                   id : user.id,
                 }
             }

             const token = jwt.sign(data , "secret_ecom");
             res.json({success : true ,token});
      
         }else{
            res.json({success : false , errors : "Wrong password"}) ;
         }
     } else{
        res.json({success : false, errors : "Wrong email id"})
     }
})
//creating endpoint getting popular women

app.get("/popularwomen", async(req, res)=>{
    let allproducts = await Product.find({category : "women"});
    let popular = allproducts.slice(-4);
    res.send(popular);
})

//creating endpoint getting new collection

app.get("/newcollection", async(req, res)=>{
  let allproducts = await Product.find({});
  let newcollection = allproducts.slice(-8);
  res.send(newcollection);
})

// creating endpoint update cartdata

const fetchData =(req, res, next)=>{
      try {
        const token = req.header('auth_token');
        const data = jwt.verify(token , "secret_ecom");
        req.user = data.user;
        next();
      } catch (error) {
          res.send({message : false , errors : " something happend wrong ?"})
      } 
      
}



app.post("/addtocart", fetchData, async(req, res)=>{
     const userData = await Users.findOne({_id : req.user.id});
      userData.cartData[req.body.id] +=1;
      await Users.findOneAndUpdate({_id : req.user.id}, {cartData : userData.cartData})
      res.json({success: true});
  })

  app.post("/removefromcart", fetchData, async(req, res)=>{
    const userData = await Users.findOne({_id : req.user.id});
     if(userData.cartData[req.body.id] > 0){
        userData.cartData[req.body.id] -=1;
     }else{
        userData.cartData[req.body.id] = 0;
     }
     
     await Users.findOneAndUpdate({_id : req.user.id}, {cartData : userData.cartData})
     res.json({success: true});
 })

//creating endpoint for getting cartitem 
app.post("/getcart", fetchData, async(req, res)=>{
     const userData = await Users.findOne({_id : req.user.id});
    
     res.json(userData.cartData);
})

app.get('/' , (req, res)=>{
     res.send("express app is running");
})


app.listen(port, ()=>{  
  console.log(`server is running at port http://localhost:${port}`);    
})