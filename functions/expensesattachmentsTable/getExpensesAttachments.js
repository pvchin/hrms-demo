const { table } = require("./airtable-expensesattachments");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fi } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const expenseattachment = await table.find(id);
    const formattedExpensesAttachments = {
      id: expenseattachment.id,
      ...expenseattachment.fields,
    };
    if (expenseattachment.error) {
      return {
        statusCode: 404,
        body: `No Expense attachment with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedExpensesAttachments);
  }

  if (fi) {
    const expensesattachments = await table
      .select({ view: "sortedview", filterByFormula: `attachmentid = '${fi}'` })
      .firstPage();
    const formattedExpenses = expensesattachments.map((expense) => ({
      id: expense.id,
      ...expense.fields,
    }));

    return formattedReturn(200, formattedExpenses);
  }

  try {
    const expensesattachments = await table.select().firstPage();
    const formattedExpensesAttachments = expensesattachments.map((expense) => ({
      id: expense.id,
      ...expense.fields,
    }));

    return formattedReturn(200, formattedExpensesAttachments);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
