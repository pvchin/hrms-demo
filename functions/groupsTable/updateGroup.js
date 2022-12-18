const { table } = require("./airtable-groups");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, rec_id, ...fields } = JSON.parse(event.body);
  try {
    const updatedGroup = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedGroup);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
