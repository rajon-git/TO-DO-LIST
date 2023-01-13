const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const userSchema=mongoose.Schema({
    name: {
        type:String,
        required:[true,"please add a name"],
    },
    email: {
        type:String,
        unique:true,
        trim:true,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "please enter a valid email"],
        required:[true,"please add an email"],
    },
    phone: {
        type:String,
        default:"+880",
    },
    photo: {
        type:String,
        required:[true,"please add a photo"],
        default:"https://i.ibb.co/4pDNDk1/avatar.png",
    },
    password: {
        type: String,
        required:[true,"please add a password"],
        minLength:[6,"password must be grater than 6 character"],
        //maxLength:[29,"password must be less than 29"],
    },
    bio :{
        type:String,
        default:"bio",
        maxLength:[300,"Bio must be less than 300 character"],
    },
},{timestamps:true,versionKey:false});

//encrypt password before saving db
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    //hash password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(this.password,salt);
    this.password=hashedPassword;
    next();

})

const User=mongoose.model("User",userSchema);
module.exports=User;