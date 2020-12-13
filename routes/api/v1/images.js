const express  = require('express'),
    multer     = require('multer'),
    passport   = require('passport'),
    fs         = require('fs'),
    Image      = require('../../../models/Image'),
    Tag        = require('../../../models/Tag');

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
 * method : POST
 * route  : /api/v1/images/add-image
 */

router.post('/add-image', passport.authenticate('jwt', { session: false }), uploader.single('image'), async (req, res) => {
    const image  = new Image();
    image.path   = req.file.path;
    image.userId = req.user._id;
    image.tags   = [{
            title: 'code'
        }, {
            title: 'vs-code'
        }, {
            title: 'blue'
        }
    ]
    try {
        await image.save();
        res.json({success: true});
    } catch (error) {
        console.log('error : ', error);
        res.json({success: false});
    }
    
})

/*
 * desc   :  Add tag to specific image with query parameter imageId
 * access :  Private
 * method :  PUT
 * route  :  /api/v1/images/add-tag
 */

router.put('/add-tag', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const imageId = req.query.imageId;
    const title     = req.body.title;
    const tag       = new Tag();
    tag.title       = title;
    console.log(req);
    try {
        const image = await Image.findById(imageId);
        const tags  = image.tags;
        tags.push(tag);
        const result = await image.save();
        res.json(result);
    } catch (error) {
        console.log(error);
        res.json({success: false});
    }
})

/*
 * desc   :  Delete image
 * access :  Private
 * method :  DELETE
 * route  :  /api/v1/images/delete-image
 */

router.delete('/delete-image', async (req, res) => {
    const imageId = req.query.imageId;
    try {   
        const image = await Image.findById(imageId);
        fs.unlinkSync(image.path);
        await Image.deleteOne({_id: imageId});
        res.json({success: true});
        
    } catch (error) {
        console.log(error);
        res.json({success: false});
    }
    
})

module.exports = router;
