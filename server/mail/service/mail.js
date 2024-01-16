const Mail = require('../../models/mail');
const jwt = require('jsonwebtoken');

const getMail = async (req, res) => {
  try {
    const token = req.query.token;
    const decoded = jwt.verify(token, 'mailer123');
    const id = req.query.id;

    const mailData = id ?
      await Mail.findOne({
        $or: [
          { receiver: decoded.email, _id: id },
          { sender: decoded.email, _id: id },
        ],
      }) :
      await Mail.find({
        $or: [
          { receiver: decoded.email },
          { sender: decoded.email },
        ],
      },
        "title sender receiver read date"
      );

    if (id && mailData.receiver === decoded.email) {
      mailData.read = true;
      mailData.save();
    }

    return res.status(200).json({ success: true, mail: mailData });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

const sendMail = async (req, res) => {
  const mailData = req.body;
  mailData.date = new Date();

  try {
    const token = req.query.token;
    const decoded = jwt.verify(token, 'mailer123');

    mailData.sender = decoded.email;

    const newMail = await Mail.create(mailData);

    newMail.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

const deleteMail = async (req, res) => {
  try {
    const token = req.query.token;
    const decoded = jwt.verify(token, 'mailer123');

    const mailData = await Mail.findById(req.params.id);

    if (!mailData) {
      return res.status(404).json({ success: false });
    }

    if (mailData.receiver !== decoded.email && mailData.sender !== decoded.email) {
      return res.status(401).json({ success: false });
    }

    await mailData.remove();

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
}

module.exports = {
  getMail,
  sendMail,
  deleteMail,
};
