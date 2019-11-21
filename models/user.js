const mongoose=require('mongoose');


const useSchema=mongoose.Schema({
    username:{type:String,unique:true},
    fullname:{type:String,unique:true,default:''},
    email:{type:String,unique:true},
    password:{type:String,default:''},
    userImage:{type:String,default:'default.png'},
    facebook:{type:String,default:''},
    fbTokens:Array,
    google:{type:'String',default:''},
    googleTokens:Array
});
useSchema.methods.encryptPassword=function(password){
    return bcrypt.hasSync(password,bcrypt.genSaltSync(10),null)
}
useSchema.methods.validUserPassword=function(password){
    return bcrypt.compareSync(password,this.password);
}
module.exports=mongoose.model('User',userSchema);