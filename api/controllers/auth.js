import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

/*export const register = async (req, res, next) => {
  console.log("register started")
  try {
    //const salt = bcrypt.genSaltSync(10);
    //const hash = bcrypt.hashSync(req.body.password, salt);
    
    //const newUser = new User({
     // ...req.body,
      //password: hash,
    //});
    
    const newUser = new User({
      username: req.body.username,
      email:req.body.email,
      password: req.body.password
    });
    console.log(newUser)
    await newUser.save();
      res.status(201).json("user has been created");
      console.log("register started")
    } catch (err) {
      res.status(500).json(err);
    }
  
};
*/
export const CreateNewUser = async(req,res) => {
  const newUser = new User();
  newUser.username = req.body.username;
  newUser.password = req.body.password;
console.log(newUser);
  try {
    await newUser.save();
    
  } catch (err) {
    console.error("something goes wrong");
  }
}

export const Login = async (req, res, next) => {
  console.log("login started")
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));
     console.log(user)
    //const isPasswordCorrect = await bcrypt.compare(
      //req.body.password,
      //user.password
    //);
    //console.log(isPasswordCorrect)
    //if (!isPasswordCorrect)
     // return next(createError(400, "Wrong password or username!"));

if (user.password !== req.body.password)
      return next(createError(400, "Wrong password or username!"));
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
      console.log(token);
  } catch (err) {
    next(err);
  }
};