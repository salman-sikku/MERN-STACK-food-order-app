import express from 'express';
import {validUserCheck} from '../middleware/authMiddleware.js';
import {categoryController, ubdateCategoryContro, getAllCategoryContro, getSingleCategoryContro, deleteCategoryContro} from '../controllers/categoryCont.js'

const router = express.Router() ;

// category router
router.post('/createcategory', categoryController);

// ubdate-category
router.put('/ubdate-category/:id', ubdateCategoryContro);

// get all category
router.get('/getall-category', getAllCategoryContro);

// get single category
router.get('/getsingle-category/:slug', getSingleCategoryContro);

// delete category
router.get('/delete-category/:id', deleteCategoryContro);


export default router