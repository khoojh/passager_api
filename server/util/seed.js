var User = require('../api/user/userModel');
var Passage = require('../api/passage/passageModel');
// var Book = require('../api/book/bookModel');
// var Author = require('../api/author/authorModel');
var _ = require('lodash');
var logger = require('./logger');

logger.log("Seeding the database...");

var users = [
    {username: "Red", password: "getbusyliving"},
    {username: "AndyDufresne", password: "getbusydying"},
    {username: "GordieLachance", password: "illseeyou"}
];

var passages = [
    {
        "author": "Friedrich Nietzsche",
        "book": "Beyond Good and Evil",
        "content": "Inasmuch as we are born, sworn, jealous friends of solitude, our own deepest, most midnightly, noon-likely solitude. This is the type of people we are, we free spirits! and perhaps you are something of this yourselves, you who are approaching? you new philosophers?"
    },
    {
        "author": "Stephen King",
        "book": "On Writing",
        "content": "It starts with this: put your desk in the corner, and every time you sit down there to write, remind yourself why it isn’t in the middle of the room. Life isn’t a support-system for art. It’s the other way around."
    },
    {
        "author": "Stephen King",
        "book": "Different Seasons: The Body",
        "content": "But five hundred million Red Chinese don't give a shit, right? The most important things are the hardest to say, because words diminish them. It's hard to make strangers care about the good things in your life."
    }
];

//author
//book

var createDoc = (model, doc) => {
    return new Promise((resolve, reject) => {
        new model(doc).save((err, saved) => {
            return err ? reject(err) : resolve(saved);
        });
    });
};

var cleanDB = () => {
    logger.log("Cleaning up database...");
    var cleanPromises = [User, Passage].map((model) => {
        return model.remove().exec();
    });
    return Promise.all(cleanPromises);
};

var createUsers = (data) => {
    var promises = users.map((user) => {
        return createDoc(User, user);
    });

    return Promise.all(promises).then((users) => {
        return _.merge({ users: users }, data || {});
    });
};

var createPassages = (data) => {
    var promises = passages.map((passage) => {
        return createDoc(Passage, passage);
    });

    return Promise.all(promises).then((passages) => {
        return _.merge({ passages: passages }, data || {});
    });
};


cleanDB()
    .then(createUsers)
    .then(createPassages)
    // .then(logger.log.bind(logger))
    .catch(logger.log.bind(logger))
