const { table } = require("./airtable-hoc");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv, m, y, all } = event.queryStringParameters;
  //const { id, filterValue, filterField } = event.queryStringParameters;

  if (id) {
    const hoc = await table.find(id);
    const formattedHoc = { id: hoc.id, ...hoc.fields };
    if (hoc.error) {
      return {
        statusCode: 404,
        body: `No HOC with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedHoc);
  }

  try {
    if (fv) {
      // const { id, linkid, ...fields } = JSON.parse(event.body);
      // console.log(linkid);
      const hoc1 = await table
        .select({
          view: "viewbypositiveact",
          // filterByFormula: `empid = '${fv}'`,
          filterByFormula: `AND(empid='${fv}',YEAR(raisedon)=${y})`,
        })
        .firstPage();
      const hoc2 = await table
        .select({
          view: "viewbyunsafe",
          // filterByFormula: `empid = '${fv}'`,
          filterByFormula: `AND(empid='${fv}',YEAR(raisedon)=${y})`,
        })
        .firstPage();
      const hoc3 = await table
        .select({
          view: "viewbyquality",
          // filterByFormula: `empid = '${fv}'`,
          filterByFormula: `AND(empid='${fv}',YEAR(raisedon)=${y})`,
        })
        .firstPage();
      const hoc4 = await table
        .select({
          view: "viewbypositiveactnoloc",
          // filterByFormula: `empid = '${fv}'`,
          filterByFormula: `AND(empid='${fv}',YEAR(raisedon)=${y})`,
        })
        .firstPage();
      const hoc = [...hoc1, ...hoc2, ...hoc3, ...hoc4];
      const formattedHoc = hoc.map((e) => ({
        id: e.id,
        ...e.fields,
      }));

      return formattedReturn(200, formattedHoc);
    }
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }

  if (m) {
    const hoc1 = await table
      .select({
        view: "viewbypositiveact",
        filterByFormula: `AND(MONTH(raisedon)=${m},YEAR(raisedon)=${y})`,
      })
      .firstPage();
    const hoc2 = await table
      .select({
        view: "viewbyunsafe",
        filterByFormula: `AND(MONTH(raisedon)=${m},YEAR(raisedon)=${y})`,
      })
      .firstPage();
    const hoc3 = await table
      .select({
        view: "viewbyquality",
        filterByFormula: `AND(MONTH(raisedon)=${m},YEAR(raisedon)=${y})`,
      })
      .firstPage();
    const hoc4 = await table
      .select({
        view: "viewbypositiveactnoloc",
        filterByFormula: `AND(MONTH(raisedon)=${m},YEAR(raisedon)=${y})`,
      })
      .firstPage();
    console.log("hoc", hoc1);
    const hoc = [...hoc1, ...hoc2, ...hoc3, ...hoc4];

    const formattedHoc = hoc.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedHoc);
  }

  
  if (all) {
    let recordsArray = []
    await table
      .select({
        maxRecords: 10000,
        view: "sortedview",
      })
      .eachPage((records, fetchNewPage) => {
        recordsArray = [...recordsArray, ...records];

        fetchNewPage();
      })
      .catch((error) => {
        console.error(error);
        return false;
      });

    console.log('all', recordsArray)
    const formattedHoc = recordsArray.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedHoc);
  }

  try {
    const hoc = await table
      .select({
        view: "sortedview",
      })
      .firstPage();
    const formattedHoc = hoc.map((e) => ({
      id: e.id,
      ...e.fields,
    }));

    return formattedReturn(200, formattedHoc);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
