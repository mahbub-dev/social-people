const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const auth = require("./Routes/auth");
const user = require("./Routes/user");

const app = express();
env.config();
cloudinary.config({
	cloud_name: process.env.CLOUDS_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
});
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

if (process.env.NODE_ENV == "production") {
	app.use(express.static("client/build"));
	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

// routes
app.use("/api/auth", auth);
app.use("/api/user", user);

app.listen(process.env.PORT, (err) => {
	if (err) throw err;
	console.log(`server running on port ${process.env.PORT}!`);
	mongoose.connect(process.env.MONGO_URI, (err) => {
		if (err) throw e;
		console.log("database is connected");
	});
});
