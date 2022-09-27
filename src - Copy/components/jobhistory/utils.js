export function filterByEmpId(jobhistory, empId) {
  // eslint-disable-next-line array-callback-return
  return jobhistory
    .filter((item) => item.empid === empId)
    .map((r) => {
      return { ...r };
    });
}
