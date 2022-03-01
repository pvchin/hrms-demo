const { table } = require("./airtable-jobstatus");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedJobstatus = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedJobstatus);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
