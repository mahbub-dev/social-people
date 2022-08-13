const cloudinary = require("cloudinary").v2;

const uploaldImage = (image, callback) => {
	cloudinary.uploader.upload(image, (err, result) => {
		if (err) throw err;
		callback(result);
	});
};
module.exports = uploaldImage;
