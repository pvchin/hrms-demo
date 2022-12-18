const formattedReturn = require("./formattedReturn");
const getGroup = require("./groupsTable/getGroups");
const createGroup = require("./groupsTable/createGroup");
const deleteGroup = require("./groupsTable/deleteGroup");
const updateGroup = require("./groupsTable/updateGroup");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getGroup(event);
  } else if (event.httpMethod === "POST") {
    return await createGroup(event);
  } else if (event.httpMethod === "PUT") {
    return await updateGroup(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteGroup(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
