
const { connect, Schema, model } =require( 'mongoose');
const {DB_URL}=require('./config')

connect(DB_URL);
const userSchema=new Schema({
       username:{
         type:String,
         required:true,
         unique:true,
         trim:true,
         minLength:4,
         maxLength:30,
         lowercase:true
       },
       password:{
        type:String,
        required:true,
        minLength:6
        
       },
       firstname:{
        type:String,
        required:true,
        trim:true,
        maxLength:30
       },
       lastname:{
        type:String,
        required:true,
        trim:true,
        maxLength:30
       }


},{timestamps:true});


const accountSchema=new Schema({
      userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
      },
      balance:{
        type:Number,
        required:true
      }
},{timestamps:true})


 const User=model('User',userSchema);
 const Account=model('Account',accountSchema);


 module.exports={User,Account}






