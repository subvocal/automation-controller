"use strict";

const Moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const Configuration = sequelize.define("Configuration", {
    configKey: DataTypes.STRING,
    configValue: DataTypes.STRING,
    description: DataTypes.STRING,
    device: DataTypes.STRING
  });

  return Configuration;
};