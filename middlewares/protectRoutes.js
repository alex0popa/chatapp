import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const token = req.cookies.ntt;

  if (!token) {
    return res.status(401).json({ msg: 'Unauthorized!' });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET,
    // TODO on next version use a better algorithm { algorithm: 'PS512' },
    (err, decoded) => {
      if (err) {
        console.error(err);

        return res.status(401).json({ msg: 'Unauthorized!' });
      }

      // TODO if need the id, put it in req
      // req.userId = decoded.id;

      next();
    }
  );
};
