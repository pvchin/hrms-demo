const formattedReturn = require("./formattedReturn");
const getExpensesAttachments = require("./expensesattachmentsTable/getExpensesAttachments");
const createExpensesAttachment = require("./expensesattachmentsTable/createExpensesAttachment");
const deleteExpensesAttachment = require("./expensesattachmentsTable/deleteExpensesAttachment");
const updateExpensesAttachment = require("./expensesattachmentsTable/updateExpensesAttachment");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getExpensesAttachments(event);
  } else if (event.httpMethod === "POST") {
    return await createExpensesAttachment(event);
  } else if (event.httpMethod === "PUT") {
    return await updateExpensesAttachment(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteExpensesAttachment(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
