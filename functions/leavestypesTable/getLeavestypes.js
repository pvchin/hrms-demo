const { table } = require("./airtable-leavestypes");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv, fi, m, y, al } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const leavestype = await table.find(id);
    const formattedLeavestypes = { id: leavestype.id, ...leavestype.fields };
    if (leavestype.error) {
      return {
        statusCode: 404,
        body: `No Leave Type with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedLeavestypes);
  }
  
  try {
    const leavestypes = await table.select({ view: "sortedview" }).firstPage();
    const formattedLeavestypes = leavestypes.map((leave) => ({
      id: leave.id,
      ...leave.fields,
    }));

    return formattedReturn(200, formattedLeavestypes);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
