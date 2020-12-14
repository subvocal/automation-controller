"use strict";

const Hapi = require("@hapi/hapi");
const Path = require("path");
const Settings = require("./settings");
const Routes = require("./lib/routes");
const Models = require("./lib/models/");
const Vision = require("@hapi/vision");
const Inert = require("@hapi/inert");

const { Configuration } = require("./lib/models");

const init = async () => {
    const server = new Hapi.Server({
        port: Settings.port,
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'static/public')
            }
        }
    });

    await server.register([Inert, Vision]);

    server.views({
        engines: { pug: require("pug") },
        path: Path.join(__dirname, "lib/views"),
        compileOptions: {
            pretty: false
        },
        isCached: Settings.env === "production"
    });

    server.route(Routes);

    await Models.sequelize.sync();
    await loadData()
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

const loadData = async () => {

    const result = await Configuration.create({
        configKey: "DESIRED_TEMPERATURE",
        configValue: "68",
        device: "JORDAN_ROOM"
    });
    const result2 = await Configuration.create({
        configKey: "CURRENT_TEMPERATURE",
        configValue: "unknown",
        device: "JORDAN_ROOM"
    });
    const result3 = await Configuration.create({
        configKey: "WEEMO_ON_OFF",
        configValue: "unknown",
        device: "JORDAN_WEEMO"
    });
}

process.on("unhandledRejection", err => {
    console.log(err);
    process.exit(1);
});

init();