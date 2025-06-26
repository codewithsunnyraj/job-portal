import { JsonWebTokenError } from "jsonwebtoken";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const register = async (req, res) => {
  const { fullname, email, phoneNumber, password, role } = req.body;
  try {
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Missing Details",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already Exist with this EmailId",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = await User({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    await createUser.save();
    res.status(200).json({
      message: "User Register Successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in Register", error);
    res.status(400).json({
      message: "Error while Register",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Missing Details",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect Email & Password ",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect Email & Password ",
        success: false,
      });
    }
    //CHECK ROLE
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role ",
        success: false,
      });
    }
    //Token
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome User ${user.fullname}`,
        success: true,
        user,
      });
  } catch (error) {
    console.log("Error in login", error);
    res.status(400).json({
      message: "Error while Login",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    // localStorage.removeItem("token");
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged Out Successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in Logout", error);
    res.status(400).json({
      message: "Error while Logout",
      success: false,
    });
  }
};
