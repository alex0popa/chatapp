import { UserModel as User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// register
export const register = async (req, res) => {
  const { userName, email, password, passwordVerify } = req.body;
  let status = 400;

  // validation
  
  if (!userName || !email || !password || !passwordVerify) {
    const msg = 'Please enter all required fields!';

    return res.status(status).json({ msg });
  }

  if (password.length < 6) {
    const msg = 'Please enter a password of at least 6 characters!';

    return res.status(status).json({ msg });
  }

  if (password !== passwordVerify) {
    const msg = 'Please enter the same passwordtwice!';

    return res.status(status).json({ msg });
  }

  if (await User.findOne({ email })) {
    const msg = 'An acount with this email already exists!';

    return res.status(status).json({ msg });
  }

  // save a new user acount to the db
  User
    .create({ userName, email, password })
    .then(({ _id: id }) => {
      const token = jwt.sign(
        { id },
        process.env.JWT_SECRET,
        // TODO on next version use a better algorithm { algorithm: 'PS512' },
        // use a callback if necessary
        // https://www.npmjs.com/package/jsonwebtoken
      );

      res.cookie('ntt', token, { httpOnly: true }).send();
    })
    .catch(err => {
      status = 500;
      console.error(err);

      /**
       * No errors sent to prevent hackers from knowing what kind of error they
       * are encountering
       */
      res.status(status).send();
    });
};

// login
export const login = (req, res) => {
  const { email, password } = req.body;
  let status = 400;

  // validate
  if (!email || !password) {
    const msg = 'Please enter all required fields!';

    return res.status(status).json({ msg });
  }

  User
  .findOne({ email })
  .select('+password') // this.password for the matchPasswords function in User model
  .then(user => {
    !user && res.status(404).json({ msg: 'Invalid credentials!'});

    user
      .matchPasswords(password)
      .then(isMatch => {
        if (isMatch) {
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

          res.cookie('ntt', token, { httpOnly: true }).send();
        } else {
          res.status(404).json({ msg: 'Invalid credentials!' });
        }
      })
      .catch(() => res.status(500).send());
  })
  .catch(err => {
    status = 500;
    console.error(err);

    /**
     * No errors sent to prevent hackers from knowing what kind of error they
     * are encountering
     */
    res.status(status).send();
  });
};

// logout, clear the cookie and set expire date in the past, 01/01/1970
export const logout = (req, res) => {
  res.cookie('ntt', '', { httpOnly: true, expires: new Date(0) }).send();
};

// check the tocken
export const loggedin = (req, res) => {
  const token = req.cookies.ntt;

  if (!token) {
    return res.json(false);
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, { id }) => {
      if (err) {
        return res.json(null);
      }

      User
        .findById(id)
        .then(({ userName, room }) => res.json({ userName, room }));
    }
  );
};

// TODO on next version modify userName or password