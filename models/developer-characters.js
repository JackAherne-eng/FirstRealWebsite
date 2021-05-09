"use strict";

const developerStore = {
  developers: require("./developer-characters.json").developers,

  getAllDevelopers() {
    return this.developers;
  }
};

module.exports = developerStore;
