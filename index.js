let periodicMailFetch = require("./periodicMailFetch");
let periodicSubmissionAgent = require("./periodicSubmissionAgent");

periodicMailFetch.listenForEmails();
periodicSubmissionAgent.startWatching();
