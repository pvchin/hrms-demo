const { table } = require("./airtable-expensesattachments");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdExpensesAttachment = await table.create([{ fields }]);
    return formattedReturn(200, createdExpensesAttachment);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
