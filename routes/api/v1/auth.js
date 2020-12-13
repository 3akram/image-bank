
const express = require('express'),
    router    = express.Router(),
    bcrypt    = require('bcrypt'),
    jwt       = require('jsonwebtoken'),
    keys      = require('../../../config/keys'),
    User      = require('../../../models/user');


// encrypting password method
const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

/*
 * method : GET
 * access : Public
 * desc   : test endpoint
 * route  : /api/vi/auth/test
*/

router.get('/test', (req, res) => {
    res.send('auth api works');
})

/*
 * desc   : Register a new user
 * access : Public
 * method : POST
 * route  : /api/v1/auth/register
 */

router.post('/register', async (req, res) => {
    
    // Extract data from body
    const { name, email, password, password2 } = req.body;

    let isExits = User.findOne(email);
    if(isExits) return res.json({success: false, message: 'EMAIL_EXITS'})

    const newUser    = new User();
    newUser.name     = name;
    newUser.email    = email;
    newUser.password = await encryptPassword(password);
    try {
        const result = await newUser.save();
        res.json({ success: true, data:  result });
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false});
    }
})

/*
 * desc   : Log user in
 * access : Public
 * method : POST
 * route  : /api/v1/auth/login
 */

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user    = await User.findOne({email});    
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.json({success: false, message: 'WORNG_PASSWORD'});
        
        // sign user in
        const payload = {
            name  : user.name,
            email : user.email
        };

        const token = jwt.sign(payload, keys.secretOrKey, { expiresIn: 25200 });
        res.json({success: true, token: `Barear ${token}`});

    } catch (error) {
        console.log('Error', error);
        res.status(400).json({success: false, message: 'EMAIL_NOT_FOUND'});
    }
})


module.exports = router;
