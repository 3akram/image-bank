const express   = require('express'),
    mongoose    = require('mongoose'),
    morgan      = require('morgan'),
    bodyParser  = require('body-parser'),
    auth        = require('./routes/api/v1/auth'),
    image       = require('./routes/api/v1/images'),
    passport    = require('passport');

const app     = express();
const DB_URI  = 'mongodb+srv://3akram:testtest@cluster0.qonvg.mongodb.net/image-bank?retryWrites=true&w=majority';
const API_DIR = '/api/v1';

// Logging request data
app.use(morgan('dev'));

//bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());

// set uploads to be staticly accessable
app.use('/uploads', express.static('uploads'));

//Passport Config
require('./config/passport.js')(passport);

// Database Connection Method
const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        console.log('Database Connected Succesfully');

        // Emit ready event to start the application
        app.emit('ready');
    } catch( e ) {
        console.log(e);
    }
}


// add api middleware
app.use(`${API_DIR}/auth`, auth);
app.use(`${API_DIR}/images`, image);


// Make client static in node server

app.use(express.static('client/build'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});


// Fire the connection to the database
connectToDatabase();

const PORT = 3000;

app.on('ready', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
})
