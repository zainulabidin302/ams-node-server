const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const config = require("./.config");
const app = express();
var multer = require("multer");
// const inspect = require("util").inspect;
// const Assignment = require("./Assignment");
var upload = multer({ dest: "uploads/" });
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/", express.static(path.join(__dirname, "public")));
let db = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      config.mongoconstring,
      { useNewUrlParser: true },
      (err, client) => {
        if (err) return reject(err);
        let dbHanlde = client.db("ams");
        return resolve(dbHanlde, client);
      }
    );
  });
};
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.body);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

/*
 * Assignment Model
 * fields: title, course,
 *
 *
 */

app.post("/api/course", upload.array("attatchments"), (req, res) => {
  let errors = [];
  if (!req.body["course.students"] || req.body["course.students"].length == 0) {
    errors.push("Alteast one student must be added to course");
  }
  if (!req.body["course.title"] || req.body["course.title"].length < 1) {
    errors.push("Couse must be defined");
  }
  if (errors.length > 0) {
    return res.json({ error: errors });
  }

  db()
    .then((db, client) => {
      let assignmentsCol = db.collection("assignments");

      let index = 0;

      let oninserted = (err, result) => {
        console.log("request processed");
        if (err)
          return res.json({
            success: "There was an error when processing your request.",
            error: err
          });
        return res.json({ success: "Course has been created successfully." });
      };

      if (typeof req.body.assignments === "string") {
        let assignment = req.body.assignments;
        let a = JSON.parse(assignment);
        a.files = req.files.slice(index, index + a.attatchmentsLength);
        index += a.attatchmentsLength;
        a.courseTitle = req.body["course.title"];
        a.courseStudents = req.body["course.students"];
        a.createdAt = a.modifiedAt = new Date().toISOString();
        a.courseEmail = "umtassignmentsubmissions@gmail.com";

        a.courseStudents = req.body["course.students"].map(item => {
          if (typeof item === "string" && item.length > 0) {
            let parts = item.split(",");
            if (parts.length == 2) {
              return { email: parts[0], phone: parts[1] };
            } else {
              return null;
            }
          } else {
            return null;
          }
        });
        assignmentsCol.insertOne(a, oninserted);
      } else {
        if (req.body.assignments instanceof Array) {
          let assignmentBatch = [];
          req.body.assignments.forEach(assignment => {
            let a = JSON.parse(assignment);
            a.files = req.files.slice(index, index + a.attatchmentsLength);
            index += a.attatchmentsLength;
            a.courseTitle = req.body["course.title"];
            a.courseEmail = "umtassignmentsubmissions@gmail.com";
            a.courseStudents = req.body["course.students"].map(item => {
              if (typeof item === "string" && item.length > 0) {
                let parts = item.split(",");
                if (parts.length == 2) {
                  return { email: parts[0], phone: parts[1] };
                } else {
                  return null;
                }
              } else {
                return null;
              }
            });
            a.createdAt = a.modifiedAt = new Date().toISOString();
            assignmentBatch.push(a);
          });
          assignmentsCol.insertMany(assignmentBatch, oninserted);
        } else {
          return res.json({
            error:
              "Did you add any assignments? Atleast one assignment is required."
          });
        }
      }
    })
    .catch(error => {
      return res.json(error);
    });
});

let updateSingleAssignment = async function(
  a,
  index,
  assignmentsCol,
  req,
  res
) {
  a.files = req.files.slice(index, index + a.attatchmentsLength);

  if (
    typeof a.attatchments_existing == "object" &&
    a.attatchments_existing instanceof Array
  ) {
    console.log("Existing data foudn!");

    a.files = a.files.concat(a.attatchments_existing);
    a.attatchmentsLength += a.attatchments_existing.length;
  }

  a.courseTitle = req.body["course.title"];
  a.courseStudents = req.body["course.students"];
  a.createdAt = a.modifiedAt = new Date().toISOString();
  a.courseEmail = "umtassignmentsubmissions@gmail.com";

  a.courseStudents = req.body["course.students"].map(item => {
    if (typeof item === "string" && item.length > 0) {
      let parts = item.split(",");
      if (parts.length == 2) {
        return { email: parts[0], phone: parts[1] };
      } else {
        return null;
      }
    } else {
      return null;
    }
  });

  let _id = a._id;

  delete a._id;
  delete a.attatchments_existing;
  console.log("before updating", a, req.files);
  return new Promise((resolve, reject) => {
    assignmentsCol.replaceOne({ _id: ObjectId(_id) }, a, (err, result) => {
      if (err) {
        return reject({
          success: "There was an error when processing your request.",
          error: err
        });
      }
      return resolve({ success: "Course updated." });
    });
  });
};

app.post("/api/course/update", upload.array("attatchments"), (req, res) => {
  let errors = [];

  if (!req.body["course.students"] || req.body["course.students"].length == 0) {
    errors.push("Alteast one student must be added to course");
  }
  if (!req.body["course.title"] || req.body["course.title"].length < 1) {
    errors.push("Couse must be defined");
  }
  if (errors.length > 0) {
    return res.json({ error: errors });
  }

  db()
    .then(async (db, client) => {
      let assignmentsCol = db.collection("assignments");

      if (typeof req.body.assignments === "string") {
        let assignment = req.body.assignments;
        let updates = await updateSingleAssignment(
          assignment,
          0,
          assignmentsCol,
          req,
          res
        );
        res.json(updates);
      } else {
        if (req.body.assignments instanceof Array) {
          try {
            let index = 0;
            let response = await Promise.all(
              req.body.assignments.map(async assignment => {
                let a = JSON.parse(assignment);
                let currentIndex = index;
                index += a.attatchmentsLength;

                return await updateSingleAssignment(
                  a,
                  currentIndex,
                  assignmentsCol,
                  req,
                  res
                );
              })
            );

            res.json(response);
          } catch (error) {
            console.log(error);
            return res.json({
              error: error
            });
          }
        } else {
          return res.json({
            error:
              "Did you add any assignments? Atleast one assignment is required."
          });
        }
      }
    })
    .catch(error => {
      return res.json(error);
    });
});

app.get("/courses", (req, res) => {
  db()
    .then(dbHandle => {
      let assignmentsCol = dbHandle.collection("assignments");
      assignmentsCol.find({}).toArray((err, data) => {
        if (err) {
          res.json(err);
        } else {
          console.log(data);
          res.json(data);
        }
      });
    })
    .catch(error => {
      res.json(error);
    });
});

app.get("/course/:id", (req, res) => {
  db()
    .then(dbHandle => {
      let assignmentsCol = dbHandle.collection("assignments");
      assignmentsCol
        .find({ _id: ObjectId(req.params.id) })
        .toArray((err, data) => {
          if (err) {
            res.json(err);
          } else {
            if (data.length === 1) {
              assignmentsCol
                .find({ courseTitle: data[0].courseTitle })
                .toArray((err, data) => {
                  if (err) {
                    res.json(err);
                  } else {
                    return res.json(data);
                  }
                });
            } else {
              res.json(null);
            }
          }
        });
    })
    .catch(error => {
      res.json(error);
    });
});

app.get("/courses/titles", (req, res) => {
  db()
    .then(dbHandle => {
      let assignmentsCol = dbHandle.collection("assignments");
      assignmentsCol
        .aggregate([
          {
            $project: {
              courseTitle: 1
            }
          },
          {
            $group: {
              _id: "$courseTitle",
              courseTitle: { $first: "$courseTitle" },
              count: { $sum: 1 }
            }
          }
        ])
        .toArray((err, data) => {
          if (err) {
            res.json(err);
          } else {
            console.log(data);
            res.json(data.filter(item => item.courseTitle !== null));
          }
        });
    })
    .catch(error => {
      res.json(error);
    });
});

// app.all("*", (req, res) => {
//   res.writeHead(400);
//   res.send("Not found");
// });
app.listen(config.http_port, config.http_hostname, () => {
  console.log(`HTTP Server is listening on port ${config.http_port}`);
});
