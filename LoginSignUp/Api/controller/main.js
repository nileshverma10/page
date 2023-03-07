const detailsModel = require("../model/main");
const Product = require("../model/AddProduct");

const register = async (req, res) => {
  try {
    const { email, password, fname, lname, phone, gender } = req.body;

    const data = new detailsModel({
      email: email,
      password: password,
      fname: fname,
      lname: lname,
      phone: phone,
      gender: gender,
    });

    await data.save();
    // data = data.toObject();
    // delete data.password;
    if (!data) {
      res.status(404).json({
        message: "Data not added",
      });
    } else {
      res.status(200).json({
        message: "Data added",
        data: data,
      });
    }
  } catch (error) {
    console.log("error===>", error);
    res.send("something went wrong");
  }
};

const getData = async (req, res) => {
  try {
    const data = await detailsModel.find();
    res.status(200).json({
      message: "Data fetched",
      data: data,
    });
  } catch (error) {
    console.log("error===>", error);
    res.send("something went wrong");
  }
};
const deleteData = async (req, res) => {
  try {
    const data = await detailsModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Data deleted",
      data: data,
    });
  } catch (error) {
    console.log("error===>", error);
    res.send("something went wrong");
  }
};
const patchData = async (req, res) => {
  try {
    const data = await detailsModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      message: "Data updated",
      data: data,
    });
  } catch (error) {
    console.log("error===>", error);
    res.send("something went wrong");
  }
};

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const data = new detailsModel({
//       email: email,
//       password: password,
//     });
//     await data.save();
//   } catch (error) {
//     console.log("error===>", error);
//     res.send("something went wrong");
//   }
// };

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = new detailsModel({
      email: email,
      password: password,
    });

    await data.save();
    // if (req.body.email && req.body.password) {
    //   let user = await detailsModel.findOne(req.body).select("-password");
    //   if (user) {
    //     res.send(user);
    //   } else {
    //     res.status(401).json({ message: "Invalid Credentials" });
    //   }
    // } else {
    //   res.status(401).json({ message: "Invalid Credentials" });
    // }

    if (!data) {
      res.status(404).json({
        message: "Data not added",
      });
    } else {
      res.status(200).json({
        message: "Data added",
        data: data,
      });
    }
  } catch (error) {
    console.log("error===>", error);
    res.send("something went wrong");
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, model, price, company } = req.body;
    const data = new Product({
      name: name,
      model: model,
      price: price,
      company: company,
    });

    await data.save();
    if (!data) {
      res.status(404).json({
        message: "Data not added",
      });
    } else {
      res.status(200).json({
        message: "Data added",
        data: data,
      });
    }
  } catch (error) {
    console.log("error===>", error);
    res.send("something went wrong");
  }
};

const getProduct = async (req, res) => {
  try {
    const data = await Product.find();
    res.status(200).json({
      message: "Data fetched",
      data: data,
    });
  } catch (error) {
    console.log("error===>", error);
    res.send("something went wrong");
  }
};
module.exports = {
  register,
  getData,
  deleteData,
  patchData,
  login,
  addProduct,
  getProduct,
};
