const { table } = require("./airtable-groups");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdGroup = await table.create([{ fields }]);
    return formattedReturn(200, createdGroup);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
