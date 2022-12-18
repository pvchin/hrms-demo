const { table } = require("./airtable-groups");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv } = event.queryStringParameters;
  //const { id, filterValue, filterField } = event.queryStringParameters;

  if (id) {
    const group = await table.find(id);
    const formattedGroup = { id: group.id, ...group.fields };
    if (group.error) {
      return {
        statusCode: 404,
        body: `No Group with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedGroup);
  }
  try {
    if (fv) {
      // const { id, linkid, ...fields } = JSON.parse(event.body);
      // console.log(linkid);
      const group = await table
        .select({ filterByFormula: `grouptype = '${fv}'` })
        .firstPage();
      const formattedGroup = group.map((e) => ({
        id: e.id,
        ...e.fields,
      }));

      return formattedReturn(200, formattedGroup);
    }
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }

  try {
    const group = await table.select().firstPage();
    const formattedGroup = group.map((e) => ({
      id: e.id,
      ...e.fields,
    }));

    return formattedReturn(200, formattedGroup);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
