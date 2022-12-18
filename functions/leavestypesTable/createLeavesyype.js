const { table } = require("./airtable-leavestypes");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdLeavestype = await table.create([{ fields }]);
    return formattedReturn(200, createdLeavestype);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
