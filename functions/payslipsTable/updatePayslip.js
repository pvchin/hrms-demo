const { table } = require("./airtable-payslips");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  //const { id, ...fields } = JSON.parse(event.body);
  const records  = JSON.parse(event.body);
  const minifyRecord = (record) => {
    return {
      id: record.id,
      fields: record.fields,
    };
  };
  console.log("update", minifyRecord(records))
  try {
    //const updatedPayslip = await table.update([{ id, fields }]);
    const updatedPayslip = await table.update(records );
    return formattedReturn(200, updatedPayslip);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
