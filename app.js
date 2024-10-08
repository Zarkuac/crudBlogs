const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// mongoDB
const dbURI = 'mongodb+srv://test_user:<db_password>@testdatabase.970me.mongodb.net/?retryWrites=true&w=majority&appName=testdatabase';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));


app.set('view engine', 'ejs');


//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended : true }));
app.use(morgan('dev'));


//routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

//BlogRoutes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req,res) =>{
    res.status(404).render('404', { title: '404 PAGE' });
});