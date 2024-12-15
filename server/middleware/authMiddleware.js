const jwt = require("jsonwebtoken")


const auth = async (req, res , next) => {
 try {
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)
    if(!token){
        return res.status(400).json({message: "not authorized"})
    }

    //verify token 
    const data = jwt.verify(token, process.env.JWT_SECRET)

    req.user = data 
 

  
      next();

 } catch (error) {
    console.log(error.message);
    return res.status(400).json({message : "no token"})
 }
}

module.exports = {
  auth  
}