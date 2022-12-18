const { table } = require("./airtable-groups");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedGroup = await table.destroy(id);
    return formattedReturn(200, deletedGroup);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
