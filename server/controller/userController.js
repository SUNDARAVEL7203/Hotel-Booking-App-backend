const User = require("../model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

const getUsers = async(req, res, next) => {
    try {
        const users = await User.find();
        if (!users) {
          res.status(400);
          throw new Error("users not found");
        }
    
        return res.status(200).json(users);
      } catch (error) {
        next(error);
      }
}

const createUser = async(req, res, next) => {
    try {
        const {password, ...rest}= req.body
        console.log(req.body)
        //generate salt
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({
            ...rest,
            password : hashedPassword
        })
        if(!user){
            res.status(400)
            throw new Error("user not created")
        }
        //hash password before saving to database
        const { password: userPassword,  ...otherDetails } = user._doc
        console.log(user)
        return res.status(201).json(otherDetails)
    } catch (error) {
        next(error)
    }
}



const loginUser = async (req, res, next) => {
  try {
    // todo use joi to validate data;

    const { email, password } = req.body;

    // get user from database
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400);
      throw new Error("user not found");
    }

    // compare the password

    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) {
      res.status(401).json({message : "in valid password"})
       
    }

    // generate token set
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  
    
    const { password: userPassword, ...rest } = user._doc;
     res.status(200).json({
      token, email:user.email, admin:user.isAdmin
    });
  } catch (error) {
    next(error);
  }
}; 

  const logoutUser = async (req, res) => {
    try {
      res.json({ message: 'User logged out successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };


module.exports = {
    getUsers,
    createUser,
    loginUser,
    logoutUser
}
