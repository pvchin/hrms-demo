const formattedReturn = require("./formattedReturn");
const getPeriods = require("./periodsTable/getPeriods");
const updatePeriod = require("./periodsTable/updatePeriod");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getPeriods(event);
  } else if (event.httpMethod === "PUT") {
    return await updatePeriod(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
