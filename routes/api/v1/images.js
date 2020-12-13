const express = require('express'),
    multer    = require('multer'),
    passport  = require('passport'),
    Image     = require('../../../models/Image');

const router   = express.Router();
const storage  =  require('../../../config/multer')(multer);


// uploads configurations
const uploader = multer({
    storage: storage, 
    limits: {
    fileSize: 1024 * 1024 * 5,
    }
});

/*
 * desc   : Test v1 endpoint
 * access : Public
 * method : GET
 * route  : /api/v1/images/test
 */
router.get('/test', (req, res) => {
    res.send('api v1 works');
})

/*
 * desc   : Add a new image
 * access : Private
 * method : Post
 * route  : /api/v1/images/add-image
 */

router.post('/add-image', passport.authenticate('jwt', { session: false }) ,uploader.single('image'), async (req, res) => {
    const image  = new Image();
    image.path   = req.file.path;
    image.userId = req.user._id;

    try {
        await image.save();
        res.json({success: true});
    } catch (error) {
        console.log('error : ', error);
        res.json({success: false});
    }
    
})


module.exports = router;
