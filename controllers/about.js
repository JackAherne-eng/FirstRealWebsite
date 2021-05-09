"use strict";

// import all required modules
const logger = require("../utils/logger");
const developerStore = require("../models/developer-characters.js");
const accounts = require("./accounts.js");

// create About object
const About = {
  // index method - responsible for creating and rendering the view
  index(request, response) {
    // display confirmation message in log
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("about rendering");

    // create view data object (contains data to be sent to the view e.g. page title)
    if (loggedInUser) {
      const viewData = {
        title: "About the AnimeList App",
        developers: developerStore.getAllDevelopers(),
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName
      };

      // render the About view and pass through the data
      response.render("about", viewData);
    } else response.redirect("/");
  }
};

// export the About module
module.exports = About;
