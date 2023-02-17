const jwt = require("jsonwebtoken");

const AuthCheck = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "thesecretoftheserver", (err, decodedToken) => {
      if (err) {
        res.redirect("/lo");
      } else {
        //knowing the current user  , decodedToken hold's the payload
        res.locals.userToken = decodedToken;
        next();
      }
    });
  } else {
    res.redirect("/lo");
  }
};

module.exports = { AuthCheck };
