const { table } = require("./airtable-jobstatus");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedJobstatus = await table.destroy(id);
    return formattedReturn(200, deletedJobstatus);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
