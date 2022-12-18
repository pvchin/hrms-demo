const formattedReturn = require("./formattedReturn");
const getLeavestypes = require("./leavestypesTable/getLeavestypes");
const createLeavetypes = require("./leavestypesTable/createLeavesyype");
const deleteLeavetypes = require("./leavestypesTable/deleteLeavestype");
const updateLeavetypes = require("./leavestypesTable/updateLeavestype");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getLeavestypes(event);
  } else if (event.httpMethod === "POST") {
    return await createLeavetypes(event);
  } else if (event.httpMethod === "PUT") {
    return await updateLeavetypes(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteLeavetypes(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
