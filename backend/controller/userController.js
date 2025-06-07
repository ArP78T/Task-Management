const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ success: "User registered successfully", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Registration failed" });
  }
};

const LoginUser = async(req, res) => {
  try {
    let { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    let user = await User.findOne({ email })
    if (!user) {
       res.status(400).json({ error: "Email not found" });
    }
    let isMatch = await bcrypt.compare(password,user.password)
    if (!isMatch) {
    res.status(400).json({ error: "Incorrect password" });
    }
    let token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" })
    res.status(200).json({message:"LogIn Successfully", success:true,token})
  } catch (err) {
    res.status(400).json({ error: "LogIn failed" });
  }
}

const userDetail = async (req, res) => {
  try {
    const { user } = req;

    const getDetails = await User.findById(user._id).populate("tasks", "-password");
  

    if (getDetails) {
      const allTask = getDetails.tasks;
     console.log(allTask)
      let yetToStart = [];
      let inProgress = [];
      let completed = [];

      allTask.forEach((item) => {
        if (item.status === "yetToStart") {
          yetToStart.push(item);
        } else if (item.status === "inprogress") {  // ✅ lowercase consistent with AddTask
          inProgress.push(item);
        } else if (item.status === "completed") {
          completed.push(item);
        }
      });

      return res.status(200).json({
        success: "success",
        tasks: {
          yetToStart,
          inProgress,
          completed,
        },
      });
    }

    return res.status(404).json({ error: "User not found" });

  } catch (error) {
    console.error("userDetail Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



module.exports = { registerUser,LoginUser ,userDetail};
