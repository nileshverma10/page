 const detailsModel = require("../model/main");
const Product = require("../model/AddProduct");
const loginDetail = require("../model/login");

const Jwt = require("jsonwebtoken");
const jwtKey = "hawkeye";

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
   
    // if (data) {
    //   Jwt.sign({ data }, jwtKey, (err, token) => {
    //     if (err) {
    //       res.send("token error");
    //     }
    //     res.send({ data, auth: token });
    //   });
    // } else {
    //   res.send("something went wrong");
    // }
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

const login =  async  (req, res) => {
  try {
    const { email, password } = req.body;
    const data = new loginDetail({
      email: email,
      password: password,
    });
    
    if (data) {
      await Jwt.sign({ data }, jwtKey, (err, token) => {
        if (err) {
          res.send("token error");
        }
        return res.send({ data, auth: token });
           
      });
    } else {
      res.send("something went wrong");
    }
    
     await data.save();

  //   if (!data) {
  //     res.status(404).json({
  //       message: "Data not added",
  //     });
  //   } else {
  //     res.status(200).json({
  //       message: "Data added",
  //       data: data,
  //     });
  //   }
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
    // if (data.length > 0) {
    //   res.send(data);
    // } else {
    //   console.log("Something went wrong");
    // }
  } catch (error) {
    console.log("error===>", error);
    res.send("something went wrong");
  }
};

const deleteList = async (req, res) => {
  try {
    const data = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Data deleted",
      data: data,
    });
  } catch (error) {
    console.log("error===>", error);
    res.send("something went wrong");
  }
};

const getProductDetail = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    res.status(200).json({
      message: "Data Find",
      data: data,
    });
  } catch (error) {
    console.log("error===>", error);
    res.send("something went wrong");
  }
};

const updateProduct = async (req, res) => {
  try {
    const data = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    const result = await Product.findById(req.params.id);
    res.status(200).json({
      message: "Product updated successfully",
      result: result,
    });
  } catch (error) {
    res.send("Something went wrong!!!!");
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
  deleteList,
  getProductDetail,
  // updateProductDetail,
  updateProduct,
};
