import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//POST request
export const SignupUser = async (req, res) => {
     try{
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        //Check if user already exist
        const userExist = await User.findOne({ email });
        if(userExist){
          return res.status(400).json({message: "User already exist"});
        }

        //hash Password 
        const hashPassword = await bcrypt.hash(password, 10);

        //create user
        await User.create({ name, email, password:hashPassword });
        res.status(201).json({message: "User created successfully"});

     }catch(error){
        res.status(500).json({message : "Server Error", error});
     }
};

export const LoginUser = async (req, res) =>{
    try{
        const { email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        //if user not exist
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({message: "User not Exist!"});
        }

        const PassMatch = await bcrypt.compare(password, user.password);
        if(!PassMatch){
            return res.status(400).json({message: "Incorrect Password"});
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn : "7d" }
        );
         
        res.status(200).json({message: "Login Successfully",
                            token, 
                            user : {id: user._id, 
                                  name: user.name,
                                email: user.email}
                            });

    }catch(error){
        res.status(500).json({message : "Server Error", error});
    }
};

// GET request — returns the logged-in user's own profile data.
// req.user.id is set by the verifyToken middleware, from the JWT.
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
