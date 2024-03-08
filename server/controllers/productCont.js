import fs from "fs";
import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "./../models/oderModel.js";
import notificationModal from "./../models/notificationModal.js";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

// payment geteway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRINTREE_MERCHANR_ID,
  publicKey: process.env.BRINTREE_PUBLIC_KEY,
  privateKey: process.env.BRINTREE_PRIVATE_KEY,
});

export const createPrductController = async (req, res) => {
  try {
    const { name, description, price, category, rating, shipping } = req.fields;
    const { photo } = req.files;

    if (!name || !description || !price || !category || !rating) {
      res.status(404).send({
        success: false,
        msg: "All fields are required",
      });
    }

    if (photo.size > 1000000) {
      res.status(404).send({
        success: false,
        msg: "photo is Required and should be less then 1mb",
      });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(502).send({
      success: false,
      msg: "Error in create product",
      error,
    });
  }
};

// get all product
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "AllProducts fetched",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};

// get product
export const getSingleProduct = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    res.status(200).send({
      success: true,
      msg: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      msg: "Error in get single product",
      error,
    });
  }
};

// get photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

// delete product
export const deleteProductController = async (req, res) => {
  try {
    const deleteproduct = await productModel
      .findOneAndDelete(req.params.id)
      .select("-photo");
    res.status(200).send({
      success: true,
      msg: "Product Deleted successfully",
      deleteproduct,
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      msg: "Error in delete product",
      error,
    });
  }
};

// ubdate product
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, rating, shipping } = req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !rating:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();

    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

// realted product
export const realtedProdcutController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      msg: "Error in realted product",
    });
  }
};

// search products
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const searchproduct = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(searchproduct);
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      msg: "Error in search product",
      error,
    });
  }
};

export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

//payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, items } = req.body;

    // Log the received data for debugging
    console.log("Received payment request:", {
      nonce,
      items,
    });

    let total = 0;
    items.forEach((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: items,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.error("Error in payment controller:", error);
    res.status(500).send("Internal Server Error");
  }
};

// create notification
export const createNotificationController = async (req, res) => {
  try {
    const { message } = req.body;
    const newNotification = await notificationModal({
      message,
    });
    await newNotification.save();
    res
      .status(201)
      .json({ success: true, message: "Notification created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// get notification
export const getNotificationController = async (req, res) => {
  try {
    const getnotimsg = await notificationModal.find({}).sort({ createdAt: -1 });
    res.status(200).send({ success: true, getnotimsg });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Error in get notification",
      error,
    });
  }
};

// delete notification
export const deleteNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNotification = await notificationModal.findByIdAndDelete(id); // Delete notification by ID
    if (!deletedNotification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.status(200).json(deletedNotification); 
  } catch (error) {
    console.error("Error deleting notification by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
