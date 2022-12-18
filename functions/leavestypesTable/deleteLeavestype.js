const { table } = require("./airtable-leavestypes");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedLeavestype = await table.destroy(id);
    return formattedReturn(200, deletedLeavestype);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
