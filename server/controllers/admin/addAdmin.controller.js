const bcrypt = require("bcryptjs");
const User = require("../../models/User.model");

exports.addAdmin = async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Please Fill the required data");
  }
  const encryptedPassword = await bcrypt.hash(req.body.password, 12);
  const Admin = await User.create({
    username: req.body.username,
    password: encryptedPassword,
  });
  res.status(200).json(Admin);
};
