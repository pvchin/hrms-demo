const { table } = require("./airtable-jobstatus");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv, fi, m, y, al } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const jobstatus = await table.find(id);
    const formattedJobstatus = { id: jobstatus.id, ...jobstatus.fields };
    if (jobstatus.error) {
      return {
        statusCode: 404,
        body: `No Job Status with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedJobstatus);
  }

  if (fv) {
    const jobstatus = await table
      .select({ view: "sortedview", filterByFormula: `empid = '${fv}'` })
      .firstPage();
    const formattedJobstatus = jobstatus.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedJobstatus);
  }

  try {
    const jobstatus = await table.select({ view: "sortedview" }).firstPage();
    const formattedJobstatus = jobstatus.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedJobstatus);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
