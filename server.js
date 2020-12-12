const express   = require('express'),
    mongoose    = require('mongoose'),
    morgan      = require('mogran'),
    bodyParser  = require('body-parser');

const app = express();

const dbURI = 'mongodb+srv://3akram:testtest@cluster0.qonvg.mongodb.net/image-bank?retryWrites=true&w=majority';

// Database Connection Method
const connectToDatabase = async () => {
    try {

        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('Database Connected Succesfully');

        // Emit ready event to start the application
        app.emit('ready');
    } catch( e ) {
        console.log(e);
    }
}


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


