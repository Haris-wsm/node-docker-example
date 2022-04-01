const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.signUp = async (req, res) => {
  let { username, password } = req.body;

  try {
    password = await bcrypt.hash(password, 12);
    const newUser = await User.create({ username, password });
    req.session.user = newUser;
    res.status(201).json({ status: 'success', data: { user: newUser } });
  } catch (e) {
    console.log(e);
    res.status(400).json({ status: 'fail' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user)
      return res
        .status(404)
        .json({ status: 'fail', message: 'user not found.' });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({
        status: 'fail',
        message: 'Username or Passwrod is not correct.'
      });

    req.session.user = user;

    res.status(200).json({ status: 'success' });
  } catch (error) {
    res.status(400).json({ status: 'fail' });
  }
};
