const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

const ptR = router;

// get all products
ptR.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const dbProd = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ["id", "category_name"],
        },
        {
          model: Tag,
          attributes: ["id", "tag_name"],
        },
      ],
    });
    // res.json(dbProd);
    res.status(200).json(dbProd);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one product
ptR.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const dbProd= await Product.findByPk(req.params.id,{
      include: [
        {
          model: Category,
          attributes: ["id", "category_name"],
        },
        {
          model: Tag,
          attributes: ["id", "tag_name"],
        },
      ],
    });
    if (!dbProd) {
      res.status(404).json(
        { message: "No product found with this id" }
        );
      return;
    }
    res.json(dbProd);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});




// create new product
ptR.post('/', async (req, res) => {
  try {
    const dbProd = await Product.create(req.body);

    if (req.body.tag_id) {
      console.log('HEYYYYYYY');
      const prodTagIdArr = req.body.tag_id.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(prodTagIdArr);
    }
    res.status(200).json(dbProd);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

ptR.put('/:id', async (req, res) => {
  try {
    let dbProd = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!dbProd) {
      res.status(404).json({ message: "No product found with this id" });
      return;
    }

    if (!req.body.tag_ids) {
      res.status(200).json(dbProd);
      return;
    }

    const productTags = await ProductTag.findAll({
      where: { product_id: req.params.id },
    });

    const productTagIds = productTags.map(({ tag_id }) => tag_id);
    const newProductTags = req.body.tag_ids
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id,
        };
      });

    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tag_ids.includes(tag_id))
      .map(({ id }) => id);

      // run both actions
    await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);

     // find all associated tags from ProductTag
    const updatedProductTags = await ProductTag.findAll({
      where: { product_id: req.params.id },
    });

    res.json(updatedProductTags);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//!---

ptR.delete('/:id', async (req, res) => {
  // delete one product by its `id` value 
  try {

    const dbProdTag = await ProductTag.destroy({
      where: {
        product_id: req.params.id,
      },
    });
    // deleting product 
    const dbProd = await Product.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!dbProd) {
      res.status(404).json({ message: "No product found with this id" });
      return;
    }
    res.status(200).json({ message:"Hey your doing great !" });
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = ptR;
