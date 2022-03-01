const formattedReturn = require("./formattedReturn");
const getJobstatus = require("./jobstatusTable/getJobstatus");
const createJobstatus = require("./jobstatusTable/createJobstatus");
const deleteJobstatus = require("./jobstatusTable/deleteJobstatus");
const updateJobstatus = require("./jobstatusTable/updateJobstatus");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getJobstatus(event);
  } else if (event.httpMethod === "POST") {
    return await createJobstatus(event);
  } else if (event.httpMethod === "PUT") {
    return await updateJobstatus(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteJobstatus(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
