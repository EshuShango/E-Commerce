const router = require("express").Router();
const { TableHints } = require("sequelize/types");
const { Tag, Product, ProductTag } = require("../../models");

const tR = router;

tR.get("/", async (req, res) => {
  try {
    // find all tags
    const dbTags = await Tag.findAll({
      // be sure to include its associated Product data
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });
    res.json(dbTags);
    res.status(200).json(dbTags);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

tR.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const dbTags = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });
    if (!dbTags) {
      res.status(404).json({
        message: " Can't find tag with that id !",
      });
      return;
    }
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});

tR.post("/", async (req, res) => {
  // create a new tag
  try {
    const dbTags = await Tag.create(req.body);
    res.json(dbTags);
    res.status(201);
  } catch (error) {
    console.log(err);
    res.status(500);
  }
});


tR.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value\
try {
  let dbTags = await Tag.update(req.body, {
    where: {
      id: req.params.id
    },
});
if (!dbTags) {
  res.status(404).json({ message: "Can't find tag with that id !" });
  return;
}
res.status(200).json(dbTags);

} catch (error) {
  console.log(err);
  res.status(500);
}
});



tR.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
        dbProduct = await ProductTag.destroy(
          {
            where: { tag_id: req.params.id, message: "deleting" },
          }
        );
        const dbTags = await Tag.destroy({
          where: {
            id: req.params.id,
          },
        });
        if (!dbTags) {
          res.status(404).json({ message: "Sorry, with that id !" });
          return;
        }
      } catch (error) {
        console.log(err);
        res.status(500).json(err);
      }
    });


module.exports = tR;