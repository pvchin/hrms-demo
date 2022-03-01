const { table } = require("./airtable-jobhistory");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv, fi, m, y, al } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const jobhistory = await table.find(id);
    const formattedJobhistory = { id: jobhistory.id, ...jobhistory.fields };
    if (jobhistory.error) {
      return {
        statusCode: 404,
        body: `No Job History with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedJobhistory);
  }

  if (fv) {
    const jobhistory = await table
      .select({ view: "sortedview", filterByFormula: `empid = '${fv}'` })
      .firstPage();
    const formattedJobhistory = jobhistory.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedJobhistory);
  }

  try {
    const jobhistory = await table.select({ view: "sortedview" }).firstPage();
    const formattedJobhistory = jobhistory.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedJobhistory);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
