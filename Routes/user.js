const router = require("express").Router();
const cloudinary = require("cloudinary");
const { verifyToken } = require("../Middlware/tokenVerify");
const User = require("../Models/User");

// get user
router.get("/", verifyToken, async (req, res) => {
	try {
		const user = await User.findById({ _id: req.user.id });
		user && res.status(200).json(user);
	} catch (err) {
		console.log(err);
	}
});
// get all user
router.get("/team", verifyToken, async (req, res) => {
	try {
		const allUser = await User.find();
		res.status(200).json(allUser);
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: "interner server erorr" });
	}
});
// update user
router.put("/:id", verifyToken, async (req, res) => {
	try {
		const { id } = req.params;
		const { img, name, email, phone, address } = req.body.data;
		if (img) {
			const result = await cloudinary.uploader.upload(img);
			if (result) {
				const user = await User.findByIdAndUpdate(
					{ _id: id },
					{
						$set: {
							img: result.secure_url,
							name,
							email,
							phone,
							address,
						},
					},
					{ multi: true }
				);
				res.status(200).json({ msg: "update success", user });
			}
		} else {
			const user = await User.findOneAndUpdate(
				{ _id: id },
				{
					$set: {
						name,
						email,
						phone,
						address,
					},
				}
			);
			res.status(200).json({ msg: "update success", user });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ msg: "update failed" });
	}
});
module.exports = router;
