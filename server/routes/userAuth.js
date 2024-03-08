import express from "express";
import {registerController, userLoginController, updateProfileController, allUserController, forgotPasswordController, getOrderController, getAllOrdersController, orderStatusController} from './../controllers/authController.js';
import {validUserCheck} from '../middleware/authMiddleware.js'
const router = express.Router() ;

// resgister router
router.post('/register', registerController) ;
router.post('/login', userLoginController) ;

// private_router
router.get('/userAuth', validUserCheck, (req, res)=>{
    res.status(200).send({ok : true}) ;
});

//admin_router
router.get('/adminAuth', validUserCheck, (req, res)=>{
    res.status(200).send({ok : true}) ;
});

// ubdate profile
router.put('/profile', validUserCheck, updateProfileController);

// get user
router.get('/all-users', allUserController);

// forgetPaddword
router.post('/forgot-password', forgotPasswordController);

//get order
router.get('/get-order', validUserCheck, getOrderController);

//get all order
router.get('/getall-orders', validUserCheck, getAllOrdersController);

//status orders
router.put('/status-order/:orderId', validUserCheck, orderStatusController);

export default router