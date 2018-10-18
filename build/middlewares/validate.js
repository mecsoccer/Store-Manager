'use strict';

var _require = require('express-validator/check'),
    check = _require.check;

exports.product = [check('name').isLength({ min: 3 }), check('category').isNumeric(), check('qty_left').isNumeric(), check('qty_sold').isNumeric(), check('price').isNumeric(), check('min_qty').isNumeric()];
//# sourceMappingURL=validate.js.map