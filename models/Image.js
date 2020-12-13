const mongoose    = require('mongoose');

const Schema = mongoose.Schema,
    MODEL_NAME = 'Image';

const imageSchema = Schema({
    userId: {
        type     : String,
        required : true
    },
    path  : {
        type     : String,
        required : true,
    }
})

imageSchema.pre('save', (next) => {
    console.log('before saving');
    next();
})

// event fires after a find method
imageSchema.post('find', function(docs) {
    console.log('to do is to add __hostname to the path');
});

const Image = mongoose.model(MODEL_NAME, imageSchema);

module.exports = Image;
