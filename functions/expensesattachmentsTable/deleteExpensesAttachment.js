const { table } = require("./airtable-expensesattachments");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedExpenseAttachment = await table.destroy(id);
    return formattedReturn(200, deletedExpenseAttachment);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
