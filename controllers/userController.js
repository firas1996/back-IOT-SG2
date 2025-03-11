const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const createToken = (id, name) => {
  return jwt.sign({ id, name }, process.env.SECRET_KEY, { expiresIn: "90d" });
};

exports.prottectorMW = async (req, res, next) => {
  try {
    let token;
    // 1) bech nthabat ken el user 3ando token wala lé
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        message: "You are not logged in !!!",
      });
    }
    // 2) bech nthabat ken el token valid or not

    const validToken = await promisify(jwt.verify)(
      token,
      process.env.SECRET_KEY
    );
    console.log(validToken);

    // 3) bech nthabat ken el user tfasa5 wala mizel mawjoud

    // 4) bech nthabtou ken el token tsan3et 9bal ma yetbadal el pass or not

    return next();
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!",
      error: error,
    });
  }
};

exports.signup = async (req, res) => {
  try {
    // solution 1 :
    // const newUser = await User.create({
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: req.body.password,
    //   confirmPassword: req.body.confirmPassword,
    //   role: "user",
    // });
    // solution 2 :
    // const { name, email, password, confirmPassword } = req.body;
    // const newUser = await User.create({
    //   name,
    //   email,
    //   password,
    //   confirmPassword,
    //   role: "user",
    // });
    // solution 3 :
    const newUser = await User.create({ ...req.body, role: "user" });
    res.status(201).json({
      message: "User created !!!",
      data: { newUser },
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!",
      error: error,
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "email and password are required !!!",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found !!!",
      });
    }
    if (!(await user.isPasswordValid(user.password, password))) {
      return res.status(404).json({
        message: "Invalid password !!!",
      });
    }
    const token = createToken(user._id, user.name);
    res.status(200).json({
      message: "Logged In !!!!",
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!",
      error: error,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      message: "User created !!!",
      data: { newUser },
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!",
      error: error,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({
      message: "User updated !!!",
      data: { updatedUser },
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!",
      error: error,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      message: "User Fetched !!!",
      data: { user },
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!",
      error: error,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Users Fetched !!!",
      nbr: users.length,
      data: { users },
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!",
      error: error,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      message: "User Fetched !!!",
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!!",
      error: error,
    });
  }
};
