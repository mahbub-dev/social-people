const schema = require("mongoose").Schema;
const model = require("mongoose").model;

const UserSchema = new schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		phone: { type: String, required: true, unique: true },
		address: { type: String, required: true },
		img: {
			type: String,
			default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
		},
		password: { type: String, required: true },
	},
	{ timestamps: true }
);
module.exports = model("user", UserSchema);
