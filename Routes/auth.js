const { verifyToken } = require("../Middlware/tokenVerify");
const uploaldImage = require("../cloudinary");
const router = require("express").Router();
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// signup

router.post("/signup", async (req, res) => {
	// requrie data from client {name,email,password,phone,address}
	const { name, email, password, phone, address, image } = req.body.data;
	try {
		const hashPassword = await bcrypt.hash(password, 10);
		const user = new User({
			name,
			email,
			password: hashPassword,
			phone,
			address,
		});
		user.save();
		res.status(200).json({ msg: "signup success" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: "data is not valid" });
	}
});

// login user
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body.data;
		const user = await User.findOne({ email: email });
		if (!user) {
			res.status(401).json({ msg: "wrong credintial" });
		} else {
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				res.status(401).json({ msg: "wrong credintial" });
			} else {
				const token = jwt.sign(
					{ id: user._id, email: user.email },
					process.env.JWT_SECRET,
					{ expiresIn: "1d" }
				);
				res.cookie("jwttoken", token, {
					maxAge: 172800000,
					secure: true,
					httpOnly: false,
					sameSite: "none",
				})
					.status(200)
					.json(user);
			}
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: "login failed" });
	}
});

// Logout
router.get("/logout", async (req, res) => {
	res.clearCookie("jwttoken", { path: "/" }).json({ msg: "logout success" });
});

module.exports = router;
