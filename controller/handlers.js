const order = require("../Model/model");

// add a data
const addData = (req, res) => {
  const data = req.body;
  // this is an object and it has a schema to  structure it properly
  const docs = new order(data);
  docs
    .save()
    .then(res.redirect("/"))
    .catch((err) => {
      console.log(err);
    });
};
// find all and display
const findAll = async (req, res) => {
  const result = await order.find().sort({ createdAt: -1 });

  res.render("Home", { order: result });
};
// find one and display details
const FindOne = async (req, res) => {
  //req.params is an object

  const id = req.params.id;

  const result = await order.findById(id);
  res.render("details", { orders: result });
};

// delete document by id
const deleteData = async (req, res) => {
  const id = req.params.id;
  const result = await order.findByIdAndDelete(id);
  res.json({ redirect: "/" });
};

// render update page
const updatePage = async (req, res) => {
  const id = req.params.id;

  const result = await order.findById(id);

  res.render("update", { id: id, order: result });
};

// update document in the db
const change = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const result = await order.findByIdAndUpdate(
    id,
    {
      name: data.name,
      phone: data.phone,
      product: data.product,
      color: data.color,
      many: data.many,
      styleM: data.styleM,
      styleW: data.styleW,
    },
    { new: true }
  );
  res.redirect("/");
};

// export the handlers

module.exports = {
  addData,
  findAll,
  FindOne,
  deleteData,
  updatePage,
  change,
};
