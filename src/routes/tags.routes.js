
const { Router } = require("express");

const TagsController = require("../controllers/TagsController");
const ensureAuthenticated = require('../middlewares/ensureAuthentocated');

const tagsRouter = Router();

const tagsController = new TagsController();

tagsRouter.get("/", ensureAuthenticated, tagsController.index);

module.exports = tagsRouter;