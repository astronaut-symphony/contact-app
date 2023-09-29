const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const { body, validationResult } = require('express-validator');
const { loadContacts, detailContact, addContact, nameCheck } = require('./utils/contact.js');

const app = express();
const port = 3000;



app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 6000 }, 
    secret: 'secret', 
    resave: true, 
    saveUninitialized: true
}));
app.use(flash());



app.get('/', (req, res) => {
    res.render('index', {
        layout: 'layouts/main',
        title: 'Home'
    });
});

app.get('/contact', (req, res) => {
    const contacts = loadContacts();
    res.render('contact', {
        layout: 'layouts/main',
        title: 'Contact', 
        contacts,
        flash: req.flash('info')
    });
});

app.post('/contact',
    [
        body('name').custom((name) => {
            const duplicate = nameCheck(name);
            if (duplicate) {
                throw new Error('Contact with this name already exists.');
            }
            return true;
        }),
        body('telp').isMobilePhone('id-ID').withMessage('Phone number is invalid.'),
        body('email').isEmail().withMessage('Email address is invalid.')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(400).json({error: errors.array()});
            res.render('contact-add', {
                layout: 'layouts/main',
                title: 'New Contact',
                errors: errors.array()
            });
        } else {
            addContact(req.body);
            req.flash('info', 'New contact added successfully.');
            res.redirect('/contact');
        }
    }
);

app.get('/contact/new', (req, res) => {
    res.render('contact-add', {
        layout: 'layouts/main',
        title: 'New Contact'
    });
});

app.get('/contact/:name', (req, res) => {
    const contact = detailContact(req.params.name);
    
    res.render('detail', {
        layout: 'layouts/main',
        title: 'Detail', 
        contact
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main',
        title: 'About'
    });
});



app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});