import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
import { formatPrice } from "../helpers/Utils";
import { useRecoilState, useRecoilValue } from "recoil";
import { payrunState } from "./data/atomdata";
import { usePayslipsContext } from "../context/payslips_context";

const PrintPDFTest = ({ singlebatchpayslip }) => {
  const period = singlebatchpayslip[0].period;
  const subtitle = `Payroll Summary for the period  ${period}`;
  const names = singlebatchpayslip.map((r) => {
    return r.name;
  });
  const wages = singlebatchpayslip.map((r) => {
    const amount = formatPrice(r.wages_bnd);
    return amount;
  });
  const tapamount = singlebatchpayslip.map((r) => {
    const amount = formatPrice(r.tap_amount_bnd);
    return amount;
  });
  const scpamount = singlebatchpayslip.map((r) => {
    const amount = formatPrice(r.scp_amount_bnd);
    return amount;
  });
  const sitesallowsamt = singlebatchpayslip.map((r) => {
    const amount = formatPrice(r.site_allows_bnd);
    return amount;
  });
  const expclaimsamt = singlebatchpayslip.map((r) => {
    const amount = formatPrice(r.expenses_claims_bnd);
    return amount;
  });
  const allowsamt = singlebatchpayslip.map((r) => {
    const amount = formatPrice(r.total_allowances_bnd);
    return amount;
  });
  const deductsamt = singlebatchpayslip.map((r) => {
    const amount = formatPrice(r.total_deductions_bnd);
    return amount;
  });
  const nettpay = singlebatchpayslip.map((r) => {
    const amount = formatPrice(r.nett_pay_bnd);
    return amount;
  });
  const totalwages = singlebatchpayslip.reduce((acc, item) => {
    return acc + item.wages_bnd;
  }, 0);
  const totaltap = singlebatchpayslip.reduce((acc, item) => {
    return acc + item.tap_amount_bnd;
  }, 0);
  const totalscp = singlebatchpayslip.reduce((acc, item) => {
    return acc + item.scp_amount_bnd;
  }, 0);
  const totalsitesallows = singlebatchpayslip.reduce((acc, item) => {
    return acc + item.site_allows_bnd;
  }, 0);
  const totalexpclaims = singlebatchpayslip.reduce((acc, item) => {
    return acc + item.expenses_claims_bnd;
  }, 0);
  const totalallows = singlebatchpayslip.reduce((acc, item) => {
    return acc + item.total_allowances_bnd;
  }, 0);
  const totaldeducts = singlebatchpayslip.reduce((acc, item) => {
    return acc + item.total_deductions_bnd;
  }, 0);
  const totalnettpay = singlebatchpayslip.reduce((acc, item) => {
    return acc + item.nett_pay_bnd;
  }, 0);
  const { vfs } = vfsFonts.pdfMake;
  pdfMake.vfs = vfs;

  const documentDefinition = {
    pageSize: "A4",
    pageOrientation: "landscape",
    content: [
      { text: "AppSmith Sutera Sdn Bhd", style: "header" },
      { text: subtitle, style: "subheader" },

      {
        style: "tableExample",
        table: {
          widths: [200, 50, 50, 50, 50, 50, 50, 50, 50],
          body: [
            [
              {
                alignment: "center",
                text: "Employee Name",
                style: "subheader",
              },
              { alignment: "right", text: "Wages", style: "subheader" },
              { alignment: "right", text: "TAP Amount", style: "subheader" },
              { alignment: "right", text: "SCP Amount", style: "subheader" },
              {
                alignment: "right",
                text: "Site Allowances",
                style: "subheader",
              },
              {
                alignment: "right",
                text: "Expenses Claims",
                style: "subheader",
              },
              { alignment: "right", text: "Allowances", style: "subheader" },
              { alignment: "right", text: "Deductions", style: "subheader" },
              { alignment: "right", text: "Nett Pay", style: "subheader" },
            ],
            [
              {
                stack: [
                  {
                    type: "none",
                    fontSize: 8,
                    ul: names,
                  },
                ],
              },
              {
                stack: [
                  {
                    type: "none",
                    fontSize: 8,
                    alignment: "right",
                    ul: wages,
                  },
                ],
              },
              {
                stack: [
                  {
                    type: "none",
                    fontSize: 8,
                    alignment: "right",
                    ul: tapamount,
                  },
                ],
              },

              {
                stack: [
                  {
                    type: "none",
                    fontSize: 8,
                    alignment: "right",
                    ul: scpamount,
                  },
                ],
              },
              {
                stack: [
                  {
                    type: "none",
                    fontSize: 8,
                    alignment: "right",
                    ul: sitesallowsamt,
                  },
                ],
              },
              {
                stack: [
                  {
                    type: "none",
                    fontSize: 8,
                    alignment: "right",
                    ul: expclaimsamt,
                  },
                ],
              },
              {
                stack: [
                  {
                    type: "none",
                    fontSize: 8,
                    alignment: "right",
                    ul: allowsamt,
                  },
                ],
              },
              {
                stack: [
                  {
                    type: "none",
                    fontSize: 8,
                    alignment: "right",
                    ul: deductsamt,
                  },
                ],
              },
              {
                stack: [
                  {
                    type: "none",
                    fontSize: 8,
                    alignment: "right",
                    ul: nettpay,
                  },
                ],
              },
            ],
            [
              "",
              {
                alignment: "right",
                text: formatPrice(totalwages),
                style: "footer",
              },
              {
                alignment: "right",
                text: formatPrice(totaltap),
                style: "footer",
              },
              {
                alignment: "right",
                text: formatPrice(totalscp),
                style: "footer",
              },
              {
                alignment: "right",
                text: formatPrice(totalsitesallows),
                style: "footer",
              },
              {
                alignment: "right",
                text: formatPrice(totalexpclaims),
                style: "footer",
              },
              {
                alignment: "right",
                text: formatPrice(totalallows),
                style: "footer",
              },
              {
                alignment: "right",
                text: formatPrice(totaldeducts),
                style: "footer",
              },
              {
                alignment: "right",
                text: formatPrice(totalnettpay),
                style: "footer",
              },
            ],
          ],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 12,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 9,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      footer: {
        fontSize: 8,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
      tableOpacityExample: {
        margin: [0, 5, 0, 15],
        fillColor: "blue",
        fillOpacity: 0.3,
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: "black",
      },
    },
    defaultStyle: {
      // alignment: 'justify'
    },
  };

  pdfMake.createPdf(documentDefinition).open();
};

export default PrintPDFTest;
