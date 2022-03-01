const { table } = require("./airtable-jobhistory");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdJobhistory = await table.create([{ fields }]);
    return formattedReturn(200, createdJobhistory);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
