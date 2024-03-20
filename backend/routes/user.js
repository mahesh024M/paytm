const express=require('express');
const { authMiddleware } = require('../middleware');
const {Account}=require('../db')
const {User} = require('../db' )
const z=require('zod')
const {JWT_SECRET} =require('../config') 
const jwt= require('jsonwebtoken')


const signupBody = z.object({
  username: z.string().email(),
  firstname: z.string(),
  lastname: z.string(),
  password: z.string(),
});

const signinBody = z.object({
    username: z.string().email(),
    password: z.string(),
  });

  const updateBody=z.object({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    password: z.string().optional(),
  })



const router = express.Router();

router.post("/signup", async (req, res) => {
  const userData = req.body;
  //zod validation
  const result = signupBody.safeParse(req.body);

  if (!result.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }

  //jwt generate

  const user = await User.create({
    username: userData.username,
    password: userData.password,
    firstname: userData.firstname,
    lastname: userData.lastname,
  });

  const userId = user._id;

  //create account
  await Account.create({
     userId:userId,
     balance: 1+Math.random()*10000
  })

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
});


router.post('/signin',async(req,res)=>{
    
    const validation=signinBody.safeParse(req.body);

    if(!validation){
        return res.status(411).json({
            message:"Incorrect inputs"
        })
    }

    const user=await User.findOne({
        username:req.body.username,
        password:req.body.password
    })

    if(user){
       

        const token=jwt.sign({
            userId:user._id
        },JWT_SECRET)

        res.json({
            token:token
        })

        return
        
    }

    res.status(411).json({
        message:"Error while logging in"
    })

   

})


router.put('/',authMiddleware,async(req,res)=>{
      
        
 const {success}=updateBody.safeParse(req.body)

  if(!success){
    return res.json({
      message:'Error while updating information'
    })
  }

  await User.updateOne({_id:req.userId},req.body);

  res.json({
    message:"Updated successfully"
  })

})


router.get('/bulk',async(req,res)=>{

   const filter=req.query.filter || "";

   const regexFilter=new RegExp(filter,'i');

   try{
    const users= await User.find({
      $or:[
        {
          firstname:{ $regex:regexFilter}
        },
        {
          lastname:{ $regex:regexFilter}
        }
      ]
   })

   res.json({
         user:users.map(user=>({
           username:user.username,
           firstname:user.firstname,
           lastname:user.lastname,
           _id:user._id
         }))
   });

   } catch(err){
        
    res.status(500).json({ error: "Internal server error" });
   }

  
     

})

router.get('/getuser',authMiddleware,async(req,res)=>{
         
      const result=await User.findOne({_id:req.userId});
      console.log(result);
      if(!result){
         return res.json({
          message:"No user found"
         })
      }
      res.json({
         firstname:result.firstname,
         lastname:result.lastname
      })
})

router.get('/',authMiddleware,async(req,res)=>{
         
     res.json({
      message:"valid user",
       value:1
     })
})



module.exports =router
