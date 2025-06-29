import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const UserSchema= new mongoose.Schema({
fullName:{
    type:String,required:true,trim:true
}, 
password:{
    type:String,required:true,trim:true, minlength:8, 
},
 email:{type:String,required:true,trim:true,unique:true, lowercase:true, 
     match: [/\S+@\S+\.\S+/, 'Please enter a valid email']
 },
},
{ timestamps:true,}
)

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('user', UserSchema)

export default User;