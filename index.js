let periodicMailFetch = require("./periodicMailFetch");
//let periodicSubmissionAgent = require("./periodicSubmissionAgent");
let httpServer = require('./httpd')
periodicMailFetch.listenForEmails();
//periodicSubmissionAgent.startWatching();
httpServer.startServer()

