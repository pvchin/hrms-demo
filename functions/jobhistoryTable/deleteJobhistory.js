const { table } = require("./airtable-jobhistory");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedJobhistory = await table.destroy(id);
    return formattedReturn(200, deletedJobhistory);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
