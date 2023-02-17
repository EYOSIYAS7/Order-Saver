const User = require("../Model/user");
const jwt = require("jsonwebtoken");

const lo = async (req, res) => {
  res.render("login");
};

const logOut = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/lo");
};

const si = async (req, res) => {
  res.render("signup");
};
const login = async (req, res) => {
  // the login static method returns a user document
  const user = await User.login(req.body.email, req.body.password);

  if (user.email) {
    const lTonken = jwt.sign(
      { id: user._id, email: user.email },
      "thesecretoftheserver",
      {
        expiresIn: "5d",
      }
    );
    res.cookie("jwt", lTonken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }

  res.json({ user });
};

const signUp = async (req, res) => {
  //   const email = req.body.email;
  //   const password = req.body.password;

  //the signup static method return a new added user
  const docs = await User.signup(req.body.email, req.body.password);

  // creating a new token
  if (docs.email) {
    const token = jwt.sign(
      { id: docs._id, email: docs.email },
      "thesecretoftheserver",
      {
        expiresIn: "5d",
      }
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }

  res.status(200).json({ docs });
};

module.exports = { login, signUp, lo, si, logOut };
