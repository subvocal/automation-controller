"use strict";

const Models = require("../models/");

module.exports = {
    home: async (request, h) => {
        const desiredTemp = await Models.Configuration.findOne({
            where: {
                configKey: "DESIRED_TEMPERATURE",
                device: "JORDAN_ROOM"
            }
        });
        const currentTemp = await Models.Configuration.findOne({
            where: {
                configKey: "CURRENT_TEMPERATURE",
                device: "JORDAN_ROOM"
            }
        });
        const weemoState = await Models.Configuration.findOne({
            where: {
                configKey: "WEEMO_ON_OFF",
                device: "JORDAN_WEEMO"
            }
        });
        console.log("weemostate: "+ weemoState.configValue);

        return h.view('home', {
            data: {
                desiredTemperature: desiredTemp.configValue,
                currentTemperature: currentTemp.configValue,
                weemoState: weemoState.configValue
            },
            page: 'Home — Thermostat Controller',
            description: 'Control your room\'s temperature'
        });
    },
    save: async (request, h) => {
        const configKey = request.payload.configKey;
        const device = request.payload.device;
        const configValue = request.payload.configValue;

        console.log("SAVING RECORD: key: %s, device: %s, value: %s", configKey, device, configValue)

        // first delete the config
        await Models.Configuration.destroy({
            where: {
                configKey: configKey,
                device: device
            }
        });

        const newDesiredTemp = request.payload.newDesiredTemp;

        const result = await Models.Configuration.create({
            configKey: configKey,
            configValue: configValue,
            device: device
        });

        const data = {
            configValue: configValue
        }

        return JSON.stringify(data);
    },
    read: async (request, h) => {
        const configKey = request.params.configKey;
        const device = request.params.device;


        const config = await Models.Configuration.findOne({
            where: {
                configKey: configKey,
                device: device
            }
        });

        console.log("Reading RECORD: key: %s, device: %s, value: %s", configKey, device, config.configValue)

        const data = {
            configValue: config.configValue
        }

        return JSON.stringify(data);
    }
};