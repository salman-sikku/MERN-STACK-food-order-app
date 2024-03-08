import { hashpassword, comparePassword } from "../helper/hashpassword.js";
import userModel from "../models/userModel.js";
import orderModel from "./../models/oderModel.js";
import JWT from "jsonwebtoken";

// user register
export const registerController = async (req, res) => {
  try {
    // validation
    const { name, email, password, answer, address } = req.body;
    if (!name || !email || !password || !answer || !address) {
      return res.status(404).send({
        msg: "All fields are required",
      });
    }

    // existing
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(201).send({
        success: true,
        msg: "Email is already existing",
      });
    }

    // hash password
    const hashpassw = await hashpassword(password);

    // save user
    const user = await new userModel({
      name,
      email,
      answer,
      password: hashpassw,
      address,
    }).save();

    // send response
    res.status(200).send({
      success: true,
      msg: "User successfully register",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(502).send({
      success: false,
      msg: "Error in register",
      error,
    });
  }
};

// user login
export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        msg: "Invalid email or password",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "Email is not registered",
      });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        msg: "Invalid password",
      });
    }

    const token = JWT.sign({ _id: user._id }, process.env.JWT_KEY, {
      expiresIn: "28d",
    });

    return res.status(200).json({
      success: true,
      msg: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        answer: user.answer,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      msg: "Error in login",
      error: error.message,
    });
  }
};

// ubdate user
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, answer } = req.body;

    if (!req.user || !req.user._id) {
      return res
        .status(404)
        .json({ error: "User not found or user ID missing" });
    }

    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Password validation
    if (password && password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    let hashedPassword;
    if (password) {
      hashedPassword = await hashpassword(password);
    }

    const updatedFields = {
      name: name || user.name,
      password: hashedPassword || user.password,
      address: address || user.address,
      email: email || user.email,
      answer: answer || user.answer,
    };

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      updatedFields,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Error While Updating Profile",
      error: error.message,
    });
  }
};

// get all users
export const allUserController = async (req, res) => {
  try {
    const allUser = await userModel.find({}).select("-password");
    res.status(200).send({
      success: true,
      msg: "All user get successfully",
      allUser,
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      msg: "Error in getting all user",
      error,
    });
  }
};

// forgtt password control
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email || !answer || !newPassword) {
      return res.status(402).send({
        success: false,
        msg: "Email, answer, and new password are required",
      });
    }

    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        msg: "Invalid email and answer",
      });
    }

    const hashpass = await hashpassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashpass });

    return res.status(200).send({
      success: true,
      msg: "Password successfully changed",
    });
  } catch (error) {
    console.log(error);
    return res.status(501).send({
      success: false,
      msg: "Error in forgot password",
    });
  }
};

// get orders
export const getOrderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      msg: "Error in getting order",
      error,
    });
  }
};

//orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 }); // Change "-1" to -1
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Getting Orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};
