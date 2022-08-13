const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
	const token = req.cookies.jwttoken;
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
			if (err) throw err;
			req.user = user;
			next();
		});
	}
};
module.exports = { verifyToken };
