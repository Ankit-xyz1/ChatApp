import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { generateToken } from "../lib/util.js";
import cloudnary from "../lib/cloudnary.js";

export const signup = async (req, res) => {
  //destructuring the data from client
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ sucess: false, message: "all feilds are required" ,da:{name,email,password}});
  }

  if (password.length <= 8) {
    return res
      .status(400)
      .json({ sucess: false, message: "password should be grater than 8" });
  }

  //checking if user already exists
  const userAlreadyExist = await User.findOne({ email });
  if (userAlreadyExist) {
    return res
      .status(400)
      .json({ sucess: false, message: "user Already exists" });
  }

  //creating a new user in the database
  try {
    let hash = await bcrypt.hash(password, 10);
    const CreatedUser = await User.create({
      name,
      email,
      password: hash,
    });
    //genrating a jwt
    const Tokenn = generateToken(CreatedUser._id, res);

    //sending resposne to client
    return res.status(201).json({
      sucess: true,
      message: "user created sucessfully",
      data: {
        _id: CreatedUser._id,
        name: CreatedUser.name,
        email: CreatedUser.email,
      },
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      message: "an error occured",
      error: error,
    });
  }
};

export const Login = async (req, res) => {
  //destructuring the data from client
  const { email, password } = req.body;

  //validations
  if (!email || !password) {
    return res
      .status(400)
      .json({ sucess: false, message: "all feilds are required" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ sucess: false, message: "password should be grater than 8" });
  }

  //checking if user already exists
  const userAlreadyExist = await User.findOne({ email });
  if (!userAlreadyExist) {
    return res
      .status(400)
      .json({ sucess: false, message: "Invalid Credintials" });
  }
  try {
    const Authorized = await bcrypt.compare(
      password,
      userAlreadyExist.password
    );
    if (Authorized) {
      generateToken(userAlreadyExist._id, res);
      return res.status(200).json({
        sucess: true,
        message: "Logged In sucessfull",
        data: {
          _id: userAlreadyExist._id,
          name: userAlreadyExist.name,
          email: userAlreadyExist.email,
        },
      });
    } else {
      return res
        .status(400)
        .json({ sucess: false, message: "Invalid Credintials" });
    }
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      message: "Internal server error , Something went Wrong",
      error,
    });
  }
};

export const Logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({
      sucess: true,
      message: "loggedout sucess fully",
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      message: "Interrnal server error",
    });
  }
};

export const UpdateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic) {
      return res.status(400).json({
        sucess: false,
        message: "Profile pic cannot be empty",
      });
    }
    const userID = req.user._id;
    const uploadResponse = await cloudnary.uploader.upload(profilePic);
    const updatedUser = await User.findOneAndUpdate(
      { _id: userID },
      { profilePic: uploadResponse.secure_url },
      { new: true }
    ).select('-password');
    return res
      .status(200)
      .json({ sucess: true, data: updatedUser, message: "update Sucessfull" });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Interrnal server error",
    });
  }
};

export const checkAuth = async (req,res) => {
  try {
    const id = req.user._id;  
    const user = await User.findOne({ _id: id }).select('-password');
    res.status(200).send({
      sucess: true,
      message: "you're authenticated",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      sucess: false,
      message: "interrnal server error",
    });
  }
};
