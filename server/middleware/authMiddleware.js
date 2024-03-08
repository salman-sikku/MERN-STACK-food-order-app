import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const validUserCheck = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Missing token" });
    }

    const decode = JWT.verify(token, process.env.JWT_KEY);
    req.user = decode; 
    next(); 
  } catch (error) {
    console.log(error); // Log any errors that occur during token verification
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

