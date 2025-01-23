import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: [6,"Email is too short"],
        maxlength:[55,"Email is too long"],
    },password:{
        type: String,
        required: true,
        select:false,
    }});

userSchema.statics.hashPassword = async function (password) {
        return await bcrypt.hash(password, 10);

    }

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
};

userSchema.methods.generateToken = function(){
    return jwt.sign({id: this._id}, process.env.SECRET, {expiresIn: 86400});
}


const User = mongoose.model("User", userSchema);

export default User;