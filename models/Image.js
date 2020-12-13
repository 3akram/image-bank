const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    MODEL_NAME = 'Image';

const tagSchema   = Schema({
    title: String
})


const imageSchema = Schema({
    userId: {
        type     : String,
        required : true
    },
    path  : {
        type     : String,
        required : true,
    },
    tags  : [tagSchema]
})

imageSchema.pre('save', (next) => {
    console.log('before saving');
    next();
})

// event fires after a find method
imageSchema.post('save', function(doc) {
    console.log('to do is to add base url dynamic to the path');
    doc.path = `http://localhost:3000/${doc.path}`;
});

const Image = mongoose.model(MODEL_NAME, imageSchema);

module.exports = Image;
