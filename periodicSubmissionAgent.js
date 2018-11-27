const fs = require("fs");
const config = require("./.config");
const chokidar = require("chokidar");
const mailparser = require("mailparser");
const plagiarismlib = require("./plagiarismlib");
function Assignment(
  options = {
    fromEmail: "",
    toEmail: "",
    files: []
  }
) {
  this.deadline = null;
  this.assignmentPool = [];
  this.plagiarismFilter = "basic";
  let plagiarismFilter = plagiarismlib.getMetrics({
    type: this.plagiarismFilter
  });
  let scores = [];
  assignmentPool.forEach(a => {
    scores.push(plagiarismFilter(a.files[0], this.files[0]));
  });
}

Assignment.prototype.trySubmit = function(cb) {
  // Assignment -
};

const onaddfile = path => {
  let pathComponents = path.split("/");
  let index = pathComponents.indexOf("MAIL_DIR");

  fs.readFile(path, (err, data) => {
    if (err) {
      //@TODO LOG ERROR
    }
    mailparser.simpleParser(data.toString("utf8"), (err, parsedEmail) => {
      if (err) {
        console.log("Error");
      } else {
        if (
          typeof parsedEmail.headers.get("from").value === "object" &&
          parsedEmail.headers.get("from").value instanceof Array
        ) {
          let studentEmailAddress = parsedEmail.headers.get("from").value[0]
            .address;
          let submissionAgainstAssignment = parsedEmail.headers.get("to")
            .value[0].address;

          const assignment = new Assignment({
            fromEmail: studentEmailAddress,
            toEmail: submissionAgainstAssignment,
            files: attatchments
          });
          assignment.trySubmit((err, done) => {
            //@TODO
            // Send reply email
          });
        }
      }
    });
  });
};

const startWatching = () => {
  var watcher = chokidar.watch(config.MAIL_DIR, {
    persistent: true
  });

  watcher.on("add", onaddfile);
};

if (require.main === module) {
  startWatching();
}

module.exports = { startWatching };
