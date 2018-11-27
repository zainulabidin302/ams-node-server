const Imap = require("imap");
const mailparser = require("mailparser");
const config = require("./.config.js");
const fs = require("fs");
const path = require("path");

const imap = new Imap(config);

const onmessage = (msg, seqno) => {
  let buffer = "";
  msg.on("body", (stream, info) => {
    stream.on("data", chunk => {
      buffer += chunk.toString("utf8");
    });
    stream.once("end", () => {
      mailparser.simpleParser(buffer, {}, (err, parsedEmail) => {
        if (err) {
          console.log(err);
        } else {
          if (
            typeof parsedEmail.headers.get("from").value === "object" &&
            parsedEmail.headers.get("from").value instanceof Array
          ) {
            parsedEmail.headers.get("from").value.forEach(item => {
              let studentEmailAddress = item.address;
              let emailAgainstAssignment = parsedEmail.headers.get("to")
                .value[0].address;
              fs.writeFile(
                path.join(
                  config.MAIL_DIR,
                  emailAgainstAssignment,
                  studentEmailAddress
                ),
                buffer,
                err => {
                  if (err) {
                    // @TODO
                    // Send reply email with error.
                    console.log("Can not save submission file");
                  }
                }
              );
            });
          }
          console.log(
            `from: ${studentEmailAddress} -> to ${emailAgainstAssignment}`
          );

          // fs.writeFile(STUDENTS_DIR + "");
        }
      });
    });
  });

  msg.once("attributes", function(attrs) {
    imap.setFlags([attrs.uid], ["\\Seen"], error => {
      if (error) {
        console.log(error);
        console.log("can not mark seen");
      }
    });
    // console.log(prefix + "Attributes: %s", inspect(attrs, false, 8));
  });
  msg.once("end", () => {
    // console.log("msg ended", seqno);
  });
};

const onmail = (err, num) => {
  console.log(err, num);
  if (err) {
    console.log("ONMAILERROR: ", err);
    return;
  }

  let fetchMessage = imap.fetch(num, {
    bodies: "",
    struct: true,
    markSeen: true
  });

  fetchMessage.on("message", onmessage);

  fetchMessage.once("error", function(err) {
    console.log("Fetch error: " + err);
  });

  fetchMessage.once("end", function() {
    // console.log("Done fetching all messages!");
  });
};

var fatalError = msg => {
  console.log(msg);
  process.exit(-1);
};

imap.once("ready", () => {
  console.log("Ready !");

  imap.openBox(config.defaultFolder, false, (err, box) => {
    if (err) {
      fatalError(err);
    }
    imap.on("mail", () => {
      console.log("NEW MAIL ARRIVED");
      imap.search(["UNSEEN"], onmail);
    });
  });
});

imap.once("error", msg => {
  console.log("ERROR", msg);
});
imap.once("end", function() {
  console.log("Connection ended");
});

const listenForEmails = () => {
  console.log("connecting");
  imap.connect();
};

module.exports = { listenForEmails };
