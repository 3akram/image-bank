const express = require('express'),
    router = express.Router();

router.get('/test', (req, res) => {
    res.send('api v1 works');
})

module.exports = router;
