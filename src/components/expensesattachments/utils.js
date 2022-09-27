export function filterById(expensesattachments, empId) {
  return expensesattachments
    .filter((item) => item.empid === empId)
    .map((r) => {
      return { ...r };
    });
}
