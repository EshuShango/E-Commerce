const productRoutes = express.Router();

// The `/api/products` endpoint

// GET all products and associated Category and Tag data (GET /api/products)
productRoutes.get("/", async (req, res) => {
  try {
    const dbProductData = await Product.findAll({
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
    res.json(dbProductData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one product by its `id` value and associated Category and Tag data (GET /api/products/:id)
productRoutes.get("/:id", async (req, res) => {
  try {
    const dbProductData = await Product.findByPk(req.params.id, {
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
    if (!dbProductData) {
      res.status(404).json({ message: "No product found with this id" });
      return;
    }
    res.json(dbProductData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create new product
productRoutes.post("/", (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tag_ids: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tag_ids.length) {
        const productTagIdArr = req.body.tag_ids.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// PUT update a product by its `id` value and associated Category and Tag data (PUT /api/products/:id) using async/await
productRoutes.put("/:id", async (req, res) => {
  // update product data
  try {
    const dbProductData = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!dbProductData) {
      res.status(404).json({ message: "No product found with this id" });
      return;
    }

    // return if not have tag_ids property in req.body
    if (!req.body.tag_ids) {
      res.status(200).json(dbProductData);
      return;
    }

    // find all associated tags from ProductTag
    const productTags = await ProductTag.findAll({
      where: { product_id: req.params.id },
    });
    // get list of current tag_ids
    const productTagIds = productTags.map(({ tag_id }) => tag_id);
    // create filtered list of new tag_ids
    const newProductTags = req.body.tag_ids
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id,
        };
      });
    // figure out which ones to remove
    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tag_ids.includes(tag_id))
      .map(({ id }) => id);

    // run both actions
    const updatedProductTags = await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);
    res.json(updatedProductTags);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// DETELE one product by its `id` value (DELETE /api/products/:id)
productRoutes.delete("/:id", async (req, res) => {
  try {
    // find product in product tag table and delete then delete product
    const dbProductTagData = await ProductTag.destroy({
      where: {
        product_id: req.params.id,
      },
    });

    // delete product
    const dbProductData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!dbProductData) {
      res.status(404).json({ message: "No product found with this id" });
      return;
    }
    res.json(dbProductData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default productRoutes;