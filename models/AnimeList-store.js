"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");
const cloudinary = require("cloudinary");
const logger = require("../utils/logger");

try {
  const env = require("../.data/.env.json");
  cloudinary.config(env.cloudinary);
} catch (e) {
  logger.info("You must provide a Cloudinary credentials file - see README.md");
  process.exit(1);
}

const AnimeListStore = {
  store: new JsonStore("./models/AnimeList-store.json", {
    AnimeListCollection: []
  }),
  collection: "AnimeListCollection",

  getAllAnimeLists() {
    return this.store.findAll(this.collection);
  },

  getAnimeList(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addAnimeList(AnimeList, response) {
    AnimeList.picture.mv("tempimage", err => {
      if (!err) {
        cloudinary.uploader.upload("tempimage", result => {
          console.log(result);
          AnimeList.picture = result.url;
          response();
        });
      }
    });
    this.store.add(this.collection, AnimeList);
  },

  removeAnimeList(id) {
    const AnimeList = this.getAnimeList(id);
    this.store.remove(this.collection, AnimeList);
  },

  removeAllAnimeLists() {
    this.store.removeAll(this.collection);
  },

  addAnime(id, Anime) {
    const AnimeList = this.getAnimeList(id);
    AnimeList.Animes.push(Anime);
  },

  removeAnime(id, AnimeId) {
    const AnimeList = this.getAnimeList(id);
    const Animes = AnimeList.Animes;
    _.remove(Animes, { id: AnimeId });
  },

  editAnime(id, AnimeId, updatedAnime) {
    const AnimeList = this.getAnimeList(id);
    const Animes = AnimeList.Animes;
    const index = Animes.findIndex(Anime => Anime.id === AnimeId);
    Animes[index].title = updatedAnime.title;
    Animes[index].artist = updatedAnime.artist;
    Animes[index].type = updatedAnime.type;
    Animes[index].duration = updatedAnime.duration;
  },

  getUserAnimeLists(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  }
};

module.exports = AnimeListStore;
