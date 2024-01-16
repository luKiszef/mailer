const Users = require('../../models/users');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
  try {
    const token = req.query.token;
    const decoded = jwt.verify(token, 'mailer123');

    if (decoded.admin) {
      const usersData = await Users.find();

      return res.status(200).json({ success: true, users: usersData });
    }

    return res.status(200).json({ success: false });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

const addUser = async (req, res) => {
  const userData = req.body;

  try {
    const token = req.query.token;
    const decoded = jwt.verify(token, 'mailer123');

    if (decoded.admin) {
      const newUser = await Users.create(userData);

      newUser.save();

      return res.status(200).json({ success: true });
    }

    return res.status(200).json({ success: false });
  } catch (error) {
    return res.status(500).json({ success: false });
  }


};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const cfg = { email, password, admin: true };
    const user = await Users.findOne(cfg);

    if (user) {
      const token = jwt.sign({
        id: user._id,
        email: user.email,
        admin: true,
      }, 'mailer123');

      return res.status(200).json({ success: true, token });
    }

    return res.status(200).json({ success: false });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const cfg = { email, password };
    const user = await Users.findOne(cfg);

    if (user) {
      const token = jwt.sign({
        id: user._id,
        email: user.email,
        admin: false,
      }, 'mailer123');

      return res.status(200).json({ success: true, token });
    }

    return res.status(200).json({ success: false });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

const getEmails = async (req, res) => {
  try {
    const token = req.query.token;
    jwt.verify(token, 'mailer123');

    const startsWith = req.query.startsWith;

    const emails = await Users.find({
      email: { $regex: `^${startsWith}`, $options: 'i' },
    }, 'email').limit(10);

    return res.status(200).json({ success: true, emails });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
}

module.exports = {
  getUsers,
  addUser,
  adminLogin,
  userLogin,
  getEmails,
};

