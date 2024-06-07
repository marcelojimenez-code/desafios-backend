import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
    name: { type: String },
    lastname: { type: String },
    email: { type: String, unique: true },
    password: { type: String},
    age: Number,
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'carts' },
    role: {
         type: String,
         default: 'user'
     }
},{
    timestamps:true
})

const userModel = mongoose.model(userCollection, userSchema)

export default userModel