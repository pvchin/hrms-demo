const { table } = require("./airtable-hoclookup");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, rec_id, ...fields } = JSON.parse(event.body);
  try {
    const updatedHocLookup = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedHocLookup);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
