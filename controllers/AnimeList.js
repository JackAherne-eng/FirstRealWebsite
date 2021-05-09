"use strict";

const logger = require("../utils/logger");
const uuid = require("uuid");
const AnimeListStore = require("../models/AnimeList-store.js");
const accounts = require("./accounts.js");

const AnimeList = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const AnimeListId = request.params.id;
    logger.debug("AnimeList id = " + AnimeListId);
    if (loggedInUser) {
      const viewData = {
        title: "AnimeList",
        AnimeList: AnimeListStore.getAnimeList(AnimeListId),
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName
      };
      response.render("AnimeList", viewData);
    } else response.redirect("/");
  },
  deleteAnime(request, response) {
    const AnimeListId = request.params.id;
    const AnimeId = request.params.Animeid;
    logger.debug("Deleting Anime" + AnimeId + "from AnimeList" + AnimeListId);
    AnimeListStore.removeAnime(AnimeListId, AnimeId);
    response.redirect("/AnimeList/" + AnimeListId);
  },
  addAnime(request, response) {
    const AnimeListId = request.params.id;
    const AnimeList = AnimeListStore.getAnimeList(AnimeListId);
    const newAnime = {
      id: uuid(),
      title: request.body.title,
      artist: request.body.artist,
      type: request.body.type,
      duration: request.body.duration
    };
    AnimeListStore.addAnime(AnimeListId, newAnime);
    response.redirect("/AnimeList/" + AnimeListId);
  },
  updateAnime(request, response) {
    const AnimeListId = request.params.id;
    const AnimeId = request.params.Animeid;
    logger.debug("updating Anime " + AnimeId);
    const updatedAnime = {
      title: request.body.title,
      artist: request.body.artist,
      type: request.body.type,
      duration: request.body.duration
    };
    AnimeListStore.editAnime(AnimeListId, AnimeId, updatedAnime);
    response.redirect("/AnimeList/" + AnimeListId);
  }
};

module.exports = AnimeList;
