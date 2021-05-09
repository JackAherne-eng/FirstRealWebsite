"use strict";

// import all required modules
const logger = require("../utils/logger");
const uuid = require("uuid");
const accounts = require("./accounts.js");

const AnimeListStore = require("../models/AnimeList-store.js");

// create dashboard object
const dashboard = {
  // index method - responsible for creating and rendering the view
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
      const viewData = {
        title: "AnimeList Dashboard",
        AnimeLists: AnimeListStore.getUserAnimeLists(loggedInUser.id),
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName
      };
      logger.info("about to render" + viewData.AnimeList);
      response.render("dashboard", viewData);
    } else response.redirect("/");
  },

  deleteAnimeList(request, response) {
    const AnimeListId = request.params.id;
    logger.debug("Deleting AnimeList" + AnimeListId);
    AnimeListStore.removeAnimeList(AnimeListId);
    response.redirect("/dashboard");
  },

  addAnimeList(request, response) {
    const date = new Date();
    const loggedInUser = accounts.getCurrentUser(request);
    const newAnimeList = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      genreDescription: request.body.genreDescription,
      picture: request.files.picture,
      date: date,
      Animes: []
    };
    logger.debug("Creating a new AnimeList" + newAnimeList);
    AnimeListStore.addAnimeList(newAnimeList, function() {
      response.redirect("/dashboard");
    });
  }
};

// export the dashboard module
module.exports = dashboard;
