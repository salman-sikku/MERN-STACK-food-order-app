import express from 'express';
import {createPrductController, getProductController, getSingleProduct, productPhotoController, deleteProductController, updateProductController, realtedProdcutController, searchProductController, braintreeTokenController, brainTreePaymentController, createNotificationController, getNotificationController, productCategoryController, deleteNotificationById} from '../controllers/productCont.js';
import formidableMiddleware from 'express-formidable';
import {validUserCheck} from '../middleware/authMiddleware.js'

const router = express.Router();

// craete product
router.post('/create-product', formidableMiddleware(), createPrductController);

// get all product
router.get('/getall-products', getProductController);

//get single product
router.get('/get-product/:slug', getSingleProduct);

//get photo
router.get('/get-photo/:pid', productPhotoController);

//delete photo
router.delete('/delete-photo/:id', deleteProductController);

// ubdate product
router.put('/ubdate-product/:pid', formidableMiddleware(), updateProductController);

// realted product
router.get('/related-product/:pid/:cid', realtedProdcutController);

// search products
router.get('/search-product/:keyword', searchProductController);

// get products by category
router.get('/get-produts-by-category/:slug', productCategoryController)

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", validUserCheck,  brainTreePaymentController);

// create Notification
router.post('/createNotification', createNotificationController)

// get notification
router.get('/get-notification', validUserCheck, getNotificationController)

//detele notofication
router.delete('/delete-notification/:id', deleteNotificationById);
export default router