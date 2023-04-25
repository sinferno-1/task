const peopleTable = require("../models/people");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
   return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "7d" });
};


const signup = async (req, res) => {
   console.log("req :", req.body)
   const { name, email, password } =
      req.body;
   try {
      const userExist = await peopleTable.findOne({ email });
      if (userExist) {
         return res.status(200).json({
            errors: [{ msg: "Email already exists" }],
         });
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      try {
         const user = await peopleTable.create({
            name,
            email,
            password: hash,
         });
         const token = createToken(user);
         return res
            .status(200)
            .cookie("token", token, {
               expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
               httpOnly: true,
            })
            .json({ success: true, user, token });
      } catch (error) {
         console.log(error);
         return res.status(500).json({ error });
      }
   } catch (error) {
      console.log(error);
      return res.status(500).json({ errors: error });
   }
}

const login = async (req, res) => {
   try {
      let user;
      const { email } = req.body;
      user = await peopleTable.findOne({ email });
      const { password } = req.body;
      if (user) {
         const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch) {
            return res.status(200).json({
               errors: [
                  {
                     msg: "Wrong username or password",
                  },
               ],
               email: email,
            });
         } else {
            const token = createToken(user);
            res
               .status(200)
               .cookie("token", token, {
                  expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                  httpOnly: true,
               })
               .json({ success: true, user, token });
         }
      } else {
         return res.status(200).json({
            errors: [
               {
                  msg: "Wrong username or password",
               },
            ],
            email: email,
         });
      }
   } catch (error) {
      res.status(500).json({ errors: error.message });
   }
}

const getUser = async (req, res) => {
   try {
      let user;
      const { id } = req.params;
      user = await peopleTable.findOne({ _id: id});
      if (user) {
         return res.status(200).json({_id : user._id , name: user.name, email: user.email});
      }
      else {
         return res.status(200).json({ message: "user not found " })
      }
   } catch (error) {
      res.status(500).json({ errors: error.message });
   }
}

const obj = { login, signup, getUser };

module.exports = obj;