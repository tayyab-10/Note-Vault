const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    obj = {
        Tayyab: "coder",
        number: 133
    }
    res.json(obj);

})
module.exports = router