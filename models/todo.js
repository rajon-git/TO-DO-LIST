const mongoose=require("mongoose");
const todoSchema=mongoose.Schema({
    email:{
        type:String,
        required:[true,"please add your name"],
    },
    todoName:{
        type:String,
    },
    todoDescription:{
        type:String,
    },
    todoStatus:{
        type:String,
        default:"new",
    },
},{timestamps:true,versionKey:false});
const Todo=mongoose.model("Todo",todoSchema);
module.exports=Todo;