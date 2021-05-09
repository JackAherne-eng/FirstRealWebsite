"use strict";

// import express and initialise router
const express = require("express");
const router = express.Router();

// import controllers
const start = require("./controllers/start.js");
const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const AnimeList = require("./controllers/AnimeList.js");
const accounts = require("./controllers/accounts.js");

// connect routes to controllers

router.get("/", accounts.index);
router.get("/login", accounts.login);
router.get("/signup", accounts.signup);
router.get("/logout", accounts.logout);
router.post("/register", accounts.register);
router.post("/authenticate", accounts.authenticate);

router.get("/start", start.index);
router.get("/dashboard", dashboard.index);
router.get("/about", about.index);
router.get("/AnimeList/:id", AnimeList.index);
router.get("/AnimeList/:id/deleteAnime/:Animeid", AnimeList.deleteAnime);
router.get("/dashboard/deleteAnimeList/:id", dashboard.deleteAnimeList);
router.post("/dashboard/addAnimeList", dashboard.addAnimeList);
router.post("/AnimeList/:id/addAnime", AnimeList.addAnime);
router.post("/AnimeList/:id/updateAnime/:Animeid", AnimeList.updateAnime);

// export router module
module.exports = router;
