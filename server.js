const express   = require('express'),
    mongoose    = require('mongoose'),
    morgan      = require('morgan'),
    bodyParser  = require('body-parser'),
    auth        = require('./routes/api/v1/auth'),
    v1          = require('./routes/api/v1/images'),
    passport    = require('passport');

const app     = express();
const DB_URI  = 'mongodb+srv://3akram:testtest@cluster0.qonvg.mongodb.net/image-bank?retryWrites=true&w=majority';
const API_DIR = '/api/v1';

//bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());

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
app.use(`${API_DIR}/images`, v1);

/*
 * method : GET
 * access : Public
 * desc   : Test entire api
 */

app.get('/', (req, res) => {
	res.send('app works');
})


// Logging request data
app.use(morgan('dev'));

// Fire the connection to the database
connectToDatabase();


const PORT = 3000;

app.on('ready', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
})


