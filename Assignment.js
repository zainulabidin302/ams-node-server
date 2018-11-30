/*
 * Assignment Model

 * @params
 *
 * title {string}
 * course {string}
 * students {Array}
 * attatchments {Array}
 *
 * throws
 */
function Assignment(options = {}) {
  if (typeof options.title === "string" && options.length > 1) {
    this.title = options.title;
  } else {
    throw Error("Title must be set.");
  }

  if (typeof options.course === "string" && options.course > 1) {
    this.course = options.course;
  } else {
    throw Error("Course must be set and unique.");
  }

  if (
    typeof options.students === "object" &&
    options.students instanceof Array
  ) {
    this.students = options.students;
  } else {
    throw Error("Students must be array.");
  }

  if (
    typeof options.attatchments === "object" &&
    options.students instanceof Array
  ) {
    this.attatchments = options.attatchments;
  } else {
    throw Error("Attatchments must be array.");
  }
}

module.exports = Assignment;
