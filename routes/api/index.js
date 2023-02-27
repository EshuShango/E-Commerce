const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

const apiR = router;

apiR.use('/categories', categoryRoutes);
apiR.use('/products', productRoutes);
apiR.use('/tags', tagRoutes);

module.exports = apiR;


