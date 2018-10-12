const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/dist/public'));


//  **** DB creation, connection and schema ***
mongoose.connect('mongodb://localhost/NinjaGold', { useNewUrlParser: true });

var UserSchema = new mongoose.Schema({
    userName: { type: String },
    gold: { type: Number },
    logs: { type: Array }
}, { timestamps: true })
mongoose.model('User', UserSchema);
var User = mongoose.model('User')
//  **** DB creation, connection and schema END ***

app.get('/all', function (req, res) {
    Angular1.findOneAndUpdate({}, function (err, angular1) {
        if (err) {
            res.json({ message: "Error", error: err })
        }
        else {
            res.json({ tasks: angular1 })
        }
    })
})

app.post('/new', function (req, res) {
    console.log(req.body)
    var user = new User({ userName: req.body.userName, gold: req.body.gold, logs: req.body.logs });
    user.save(function (err) {
        if (err) {
            for (var key in err.errors) {
                req.flash('quoteErr', err.errors[key].message);
                console.log("could not create the user")
                res.json('/new');
            }
        } else {
            console.log("user created")
            res.json({ message: "cool " });
        }
    })
})


app.post('/findUser', function (req, res) {
    console.log(req.body)
    User.findOne({ userName: req.body.userName }, function (err, user) {

        if (err) {
            console.log('could not find this user');
            res.json(err);
        } else {
            res.json({ user: user })

        }
    })
})

app.post('/update', function (req, res) {
    User.findOneAndUpdate({ userName: req.body.userName }, { $set: { gold: req.body.gold, logs: req.body.logs } }, function (err, angular1) {
        if (err) {
            console.log('could not update this id');
            res.json({ message: "failed" });
        } else {
            res.json({ message: "updated the user" })

        }
    })
})


app.listen(8000, function () {
    console.log("listening to port 8000")
})