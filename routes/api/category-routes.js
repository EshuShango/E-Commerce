const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint
const cR = router;

//^ GET All categories and associated 
//^Products (with attributes) (GET /api/categories)
cR.get("/", async (req, res) => {
  try {
    // find all categories
    const dbCategory = await Category.findAll({
      // be sure to include its associated Products
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });
    res.json(dbCategory);
    // res.status(200).json(dbCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//^ GET One category by its `id` value and associated 
//^Products (with attributes) (GET /api/categories/:id)
cR.get("/:id", async (req, res) => {
  console.log("here we are")
  try {
    const dbCategory = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });
    if (!dbCategory) {
      res.status(404).json({ message: "Can't find the category with this id" });
      return;
    }
    res.status(200).json(dbCategory)
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});
//^ CREATE
cR.post("/", async (req, res) => {
  try {
    // created a new category
    // we request the "body" aka input or info from a user
    // then we JSON it, with a status of,
    // " request has been fulfilled and resulted in a new resource being created."
    const dbCategory = await Category.create(req.body);
    
    // created a new category
    res.status(201).json(dbCategory);
  } catch (error) {
    console.log(err);
    res.status(500);
  }
});

//^ UPDATE
cR.put("/:id", async (req, res) => {
  // update a category by its `id` value
  // chose let because in theory it's immutable, due to being
  // able to be updated etc
  try {
    let dbCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!dbCategory) {
      res.status(404).json({ message: "Sorry, nothing with that id !" });
      return;
    }
    res.status(200).json(dbCategory);
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});

//^ DELETE a category by it's `id` value
cR.delete("/:id", async (req, res) => {
  //? do we update the product to a category via foreign key
  //? and then delete it ?
  try {
    // dbProduct = await Product.update(
    //   { category_id: null },
    //   {
    //     where: { category_id: req.params.id, message: "deleting a Product" },
    //   }
    // );
    //! UPDATED PRODUCTs associated with
    //! category to be deleted
    const dbCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!dbCategory) {
      res.status(404).json({ message: "Sorry, nothing with that id !" });
      return;
    }
    res.status(200).json(dbCategory);
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

module.exports = cR;
