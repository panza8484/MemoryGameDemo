/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("// Import necessary modules\r\nconst express = __webpack_require__(/*! express */ \"express\");\r\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\"); // Add bodyParser middleware to parse JSON data\r\n\r\nconst app = express();\r\nconst port = 3000;\r\n\r\n// Connect to MongoDB\r\nmongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {\r\n  useNewUrlParser: true,\r\n  useUnifiedTopology: true,\r\n})\r\n  .then(() => {\r\n    console.log('Connected to MongoDB');\r\n  })\r\n  .catch((error) => {\r\n    console.error('Error connecting to MongoDB:', error);\r\n  });\r\n\r\n// Define the schema for high scores\r\nconst highScoreSchema = new mongoose.Schema({\r\n  time: Number, // Field to store the time\r\n  name: String, // Field to store the player's name\r\n  moves: Number, // Field to store the number of moves\r\n});\r\n\r\n// Create the HighScore model\r\nconst HighScore = mongoose.model('HighScore', highScoreSchema);\r\n\r\n// Middleware to parse JSON data\r\napp.use(bodyParser.json());\r\n\r\n// Route to get all high scores\r\napp.get('/high-scores', async (req, res) => {\r\n  try {\r\n    const highScores = await HighScore.find({}, 'time name moves'); // Retrieve all fields\r\n    res.json(highScores);\r\n  } catch (error) {\r\n    console.error('Error retrieving high scores:', error);\r\n    res.status(500).json({ error: 'Error retrieving high scores' });\r\n  }\r\n});\r\n\r\n// Route to save a new high score\r\napp.post('/high-scores', async (req, res) => {\r\n  const { time, name, moves } = req.body;\r\n\r\n  try {\r\n    const highScore = new HighScore({ time, name, moves });\r\n    await highScore.save();\r\n    res.json({ success: true });\r\n  } catch (error) {\r\n    console.error('Error saving high score:', error);\r\n    res.status(500).json({ error: 'Error saving high score' });\r\n  }\r\n});\r\n\r\n// Start the server\r\napp.listen(port, () => {\r\n  console.log(`Server is running on port ${port}`);\r\n});\r\n\n\n//# sourceURL=webpack://wiggingproject3/./src/index.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("body-parser");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;