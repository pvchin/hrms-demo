const { table } = require("./airtable-jobhistory");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedJobhistory = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedJobhistory);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
