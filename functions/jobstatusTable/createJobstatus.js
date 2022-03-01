const { table } = require("./airtable-jobstatus");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdJobstatus = await table.create([{ fields }]);
    return formattedReturn(200, createdJobstatus);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
