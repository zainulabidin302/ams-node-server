require("colors");
const jsdiff = require("diff");
const fs = require("fs");

const lib = {};

lib.addRemoveCharDiff = (a, b) => {
  let diff = jsdiff.diffChars(a, b);
  let addedChars = diff.reduce((prev, curr) => {
    return prev + (curr.removed === true ? curr.count : 0);
  }, 0);

  let removedChars = diff.reduce((prev, curr) => {
    return prev + (curr.removed === true ? curr.count : 0);
  }, 0);
  return {
    totalDiffs: addedChars + removedChars,
    addedChars,
    removedChars
  };
};
lib.getCaseInsensitiveDiffScore = function(a, b) {
  return lib.addRemoveCharDiff(a.toLowerCase(), b.toLowerCase());
};

lib.getCaseSensitiveDiffScore = function(a, b) {
  return lib.addRemoveCharDiff(a, b);
};

lib.uniquenessScore = (a, b) => {
  // console.log(
  //   "getCaseInsensitiveDiffScore",
  //   lib.getCaseInsensitiveDiffScore(a, b)
  // );
  // console.log("getCaseSensitiveDiffScore", lib.getCaseSensitiveDiffScore(a, b));
  // console.log(
  //   "charachter sizeRatio (The closer to one, the more likely plagiarized)",
  //   lib.sizeRatio(a, b)
  // );

  let diffs = lib.getCaseInsensitiveDiffScore(a, b).totalDiffs;
  // diffs += lib.getCaseSensitiveDiffScore(a, b).totalDiffs;
  console.log("diffs", diffs);
  console.log("sizeRatio", lib.sizeRatio(a, b));

  return diffs / lib.sizeRatio(a, b);
};

lib.sizeRatio = (a, b) => {
  let max = Math.max(a.length, b.length);
  let min = Math.min(a.length, b.length);
  return max / min;
};

const matrices = {
  basic: (a, b) => lib.uniquenessScore(a, b)
};

lib.getMetrics = function(options = {}) {
  let type = options.type || basic;
  return matrices[type];
};

function test() {
  let a = fs.readFileSync("hello.txt", { encoding: "utf8" });
  let b = fs.readFileSync("hellob.txt", { encoding: "utf8" });
}

module.exports = lib;
