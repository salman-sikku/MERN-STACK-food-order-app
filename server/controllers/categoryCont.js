import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const categoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.send({ msg: "Name is required" });
    }
    // check name
    const exiting = await categoryModel.findOne({ name });
    if (exiting) {
      return res.status(200).send({
        success: false,
        msg: "Category alredy exiting",
      });
    }

    const newCategory = await categoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(200).send({
      success: true,
      msg: "New category created",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(502).send({
      success: false,
      msg: "Error in create category",
      error,
    });
  }
};

// ubdate category
export const ubdateCategoryContro = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const ubdateCategory = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    res.status(200).send({
        success : true,
        msg : 'Ubdate category successfully',
        ubdateCategory
    })
  } catch (error) {
    console.log(error);
    res.status(502).send({
      success: false,
      msg: "Error in ubdate category",
      error,
    });
  }
};

// get all category
export const getAllCategoryContro = async (req, res)=>{
   try {
     const getCategory = await categoryModel.find({});
     res.status(200).send({
       success : true,
       msg : 'Get all category successfully',
       getCategory   
     }) 
   } catch (error) {
      console.log(error);
      res.status(502).send({
        success : false,
        msg : 'Error in getting all category',
        error
      })
   }
}

// get single category
export const getSingleCategoryContro = async (req, res)=>{
   try {
     const singleCategory = await categoryModel.findOne({slug: req.params.slug});
     res.status(200).send({
      success : true,
      msg : 'Get single category successfully',
      singleCategory
     })
   } catch (error) {
     console.log(error);
     res.status(502).send({
       success : false,
       msg : 'Error in getting single category',
       error
     })
   }
}

// delete category
export const deleteCategoryContro = async(req, res)=>{
    try {
      const {id} = req.params ;
      const deleteCategory = await categoryModel.findByIdAndDelete(id);
      res.status(200).send({
        success : true,
        msg : 'Delete category successfully',
        deleteCategory
      })
    } catch (error) {
      console.log(error);
      res.status(502).send({
        success : false,
        msg : 'Error in delete category',
        error
      })
    }
} 