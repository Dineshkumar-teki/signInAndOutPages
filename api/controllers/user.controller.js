import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { email, username, password } = req.body;
  const hassedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({
    username,
    password: hassedPassword,
    email,
  });
  try {
    await newUser.save();
    res.status(200).send({ msg: "sign up success" });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      res.status(404).send({ msg: "User not found" });
    } else {
      const validPassword = bcrypt.compareSync(password, validUser.password);
      if (!validPassword) {
        res.status(500).send({ msg: "Password incorrect" });
      } else {
        const jwtToken = jwt.sign({ id: validUser._id }, validUser.username);
        const { password: pass, ...rest } = validUser._doc;
        res.status(200).send({ jwtToken, data: rest });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
