const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dc7bgyrbe",
  api_key: "787585993957793",
  api_secret: "1z7pOQF8izsj-Ve_t6LZIz9rvpA",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}
const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
