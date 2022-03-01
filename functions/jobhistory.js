const formattedReturn = require("./formattedReturn");
const getJobhistory = require("./jobhistoryTable/getJobhistory");
const createJobhistory = require("./jobhistoryTable/createJobhistory");
const deleteJobhistory = require("./jobhistoryTable/deleteJobhistory");
const updateJobhistory = require("./jobhistoryTable/updateJobhistory");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getJobhistory(event);
  } else if (event.httpMethod === "POST") {
    return await createJobhistory(event);
  } else if (event.httpMethod === "PUT") {
    return await updateJobhistory(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteJobhistory(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
