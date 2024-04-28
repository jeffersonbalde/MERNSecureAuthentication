const User = require("../model/user.model.js");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const secret_key = "secret_key";

const SignUp = async (req, res) => {
  // const user = new User({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: req.body.password
  // })

  const { name, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password);

  const user = new User({
    name,
    email,
    password: hashedPassword
  });

  let userExist;

  try {
    userExist = await User.findOne({ email: email });
  } catch (error) {
    console.log(error);
  }

  if (userExist) {
    return res.status(500).json({ message: "User already exist" });
  }

  try {
    await user.save();
  } catch (error) {
    // res.status(500).json({message: message})
    console.log(error);
  }

  return res.status(200).json({ message: user });
};

const LogIn = async (req, res) => {
    const {email, password} = req.body;

    let existingUSer;

    try {
        existingUSer = await User.findOne({email: email});
    } catch (error) {
        return new Error(error);
    }

    if(!existingUSer) {
        return res.status(400).json({message: "User not found"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUSer.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message: "Invalid email and password"});
    }

    const token = jwt.sign({ id: existingUSer.id}, secret_key, { expiresIn: "30s"});

    res.cookie(String(existingUSer._id), token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 30),
        httpOnly: true,
        sameSite: "lax"
    })

    return res.status(200).json({message: "Logged in successfully", user: existingUSer, token});
}

const VerifyToken = async (req, res, next) => {
    const cookie = req.headers.cookie
    const token = cookie.split("=")[1]
    if(!token) {
        return res.status(404).json({message: "No token found"});
    }

    jwt.verify(String(token), secret_key, (error, User) => {
        if(error) {
            return res.status(400).json({message: "Invalid token"}); 
        }
        console.log(User.id);
        req.id = User.id;
    })
    next();
}

const GetUser = async (req, res) => {
    const user_id = req.id;

    let user;

    try {
        user = await User.findById(user_id, "-password");
    } catch (error) {
        return new Error(error);
    }
 
    if(!user) {
        return res.status(404).json({message: "User not found"});
    }

    return res.status(200).json({user});
}

module.exports = {
  SignUp,
  LogIn,
  VerifyToken,
  GetUser
};
