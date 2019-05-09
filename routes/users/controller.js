const User = require('./model');
const validation = require('./validation');

exports.register = async (req, res) => {
  const { errors, isValid } = validation.validateRegisterInput(req.body);

  if (!isValid) {
    res.status(400).json({ success: false, errors });
  }

  try {
    const user = User.findOne({ email: req.body.email });

    if (user) {
      res.status(400).json({ success: false, errors: { email: 'Email já cadastrado' } });
    }

    const savedUser = await new User(req.body).save();

    console.log(savedUser);

    return res.status(201).json({ success: true, user: savedUser });
  } catch (err) {
    return res.status(400).json({ success: false, errors: err });
  }
};
