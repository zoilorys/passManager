# Backbone password manager

#### Used stack:
* RequireJS
* Backbone (and his deps)
* Backbone.Radio
* Backbone.Syphon
* Backbone.localStorage
* Bluebird
* Node.js (Express.js)
* ES2015
* Stylus
* Bootstrap
* gulp

#### Starting up:

To launch project, run `npm i && bower i && gulp` command, then run `node server.js` to launch backend server.

#### Notes:

* Local storage is used only to store current "session";
* There is no real persistence of data - data is alive while server is running (i guess its enough to test app);
