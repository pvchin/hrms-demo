const { table } = require("./airtable-expensesattachments");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedExpenseAttachment = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedExpenseAttachment);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
