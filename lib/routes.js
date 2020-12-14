"use strict";
const Path = require("path");
const Home = require("./controllers/home");

module.exports = [
    // we’re going to define our routes here
    {
        method: "GET",
        path: "/",
        handler: Home.home,
        config: {
            description: "Gets all the notes available"
        }
    },
    {
        method: "POST",
        path: "/config/save",
        handler: Home.save,
        config: {
            description: "Set the desired temperature"
        }
    },
    {
        method: "GET",
        path: "/config/{device}/{configKey}",
        handler: Home.read,
        config: {
            description: "Read the desired configuration"
        }
    },
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true
            }
        }
    }
];