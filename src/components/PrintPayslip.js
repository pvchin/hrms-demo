import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
import { formatPrice, formatPriceZero } from "../helpers/Utils";

const PrintPayslip = ({ data, emp }) => {
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const subtitle =
    "Payslip for the month of " +
    months[parseInt(data.rowData.payrun.slice(-2) - 1)] +
    " " +
    data.rowData.payrun.slice(0, 4);
  const footer =
    "This is computer generated report so no signature is required";
  const {
    empno,
    ic_no,
    designation,
    bank_acno,
    //bank_name,
    tap_acno,
    scp_acno,
    //payrun,
  } = emp[0];
  const { name } = data.rowData;
  const totalEarnings =
    data.rowData.wages_bnd +
    data.rowData.site_allows_bnd +
    data.rowData.expenses_claims_bnd +
    data.rowData.total_allowances_bnd;
  const totalDeductions =
    data.rowData.tap_amount_bnd +
    data.rowData.scp_amount_bnd +
    data.rowData.total_deductions_bnd;
  const earningsdesp = [
    "Wages",
    data.rowData.site_allows_bnd === 0 ? "" : data.rowData.allows_type1,
    data.rowData.expenses_claims_bnd === 0 ? "" : data.rowData.allows_type2,
    data.rowData.allows_type3,
    data.rowData.allows_type4,
    data.rowData.allows_type5,
    data.rowData.allows_type6,
    data.rowData.allows_type7,
    data.rowData.allows_type8,
  ];
  const earningsamt = [
    formatPrice(data.rowData.wages_bnd),
    data.rowData.site_allows_bnd === 0
      ? ""
      : formatPrice(data.rowData.site_allows_bnd),
    data.rowData.expenses_claims_bnd === 0
      ? ""
      : formatPrice(data.rowData.expenses_claims_bnd),
    formatPrice(
      Math.round(
        (data.rowData.allows_type3amt + Number.EPSILON) *
          data.rowData.currency_rate *
          100
      ) / 100
    ),
    formatPrice(
      Math.round(
        (data.rowData.allows_type4amt + Number.EPSILON) *
          data.rowData.currency_rate *
          100
      ) / 100
    ),
    formatPrice(
      Math.round(
        (data.rowData.allows_type5amt + Number.EPSILON) *
          data.rowData.currency_rate *
          100
      ) / 100
    ),
    formatPrice(
      Math.round(
        (data.rowData.allows_type6amt + Number.EPSILON) *
          data.rowData.currency_rate *
          100
      ) / 100
    ),
    formatPrice(
      Math.round(
        (data.rowData.allows_type7amt + Number.EPSILON) *
          data.rowData.currency_rate *
          100
      ) / 100
    ),
    formatPrice(
      Math.round(
        (data.rowData.allows_type8amt + Number.EPSILON) *
          data.rowData.currency_rate *
          100
      ) / 100
    ),
  ];
  const deductionsdesp = [
    data.rowData.tap_amount_bnd === 0 ? "" : "TAP Amount",
    data.rowData.scp_amount_bnd === 0 ? "" : "SCP Amount",
    data.rowData.deducts_type1,
    data.rowData.deducts_type2,
    data.rowData.deducts_type3,
    data.rowData.deducts_type4,
    data.rowData.deducts_type5,
    data.rowData.deducts_type6,
    data.rowData.deducts_type7,
    data.rowData.deducts_type8,
  ];
  const deductionsamt = [
    formatPrice(parseFloat(data.rowData.tap_amount_bnd, 10)),
    formatPrice(parseFloat(data.rowData.scp_amount_bnd, 10)),
    formatPrice(
      Math.round(
        (data.rowData.deducts_type1amt + Number.EPSILON) *
          data.rowData.currency_rate *
          100
      ) / 100
    ),
    formatPrice(
      Math.round(
        (data.rowData.deducts_type2amt + Number.EPSILON) *
          data.rowData.currency_rate *
          100
      ) / 100
    ),
    formatPrice(
      Math.round(
        (data.rowData.deducts_type3amt + Number.EPSILON) *
          data.rowData.currency_rate *
          100
      ) / 100
    ),
    formatPrice(
      Math.round(
        (data.rowData.deducts_type4amt + Number.EPSILON) *
          data.rowData.currency_rate *
          100
      ) / 100
    ),
    formatPrice(
      Math.round(
        (data.rowData.deducts_type5amt + Number.EPSILON) *
          data.rowData.currency_rate *
          100
      ) / 100
    ),
    formatPrice(
      Math.round(
        (data.rowData.deducts_type6amt + Number.EPSILON) *
          data.rowData.currency_rate *
          100
      ) / 100
    ),
    formatPrice(
      Math.round(
        (data.rowData.deducts_type7amt + Number.EPSILON) *
          data.rowData.currency_rate *
          100
      ) / 100
    ),
    formatPrice(
      Math.round(
        (data.rowData.allows_type8amt + Number.EPSILON) *
          data.rowData.currency_rate *
          100
      ) / 100
    ),
  ];

  pdfMake.fonts = {
    Courier: {
      normal: "Courier",
      bold: "Courier-Bold",
      italics: "Courier-Oblique",
      bolditalics: "Courier-BoldOblique",
    },
    Helvetica: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
      italics: "Helvetica-Oblique",
      bolditalics: "Helvetica-BoldOblique",
    },
    Times: {
      normal: "Times-Roman",
      bold: "Times-Bold",
      italics: "Times-Italic",
      bolditalics: "Times-BoldItalic",
    },
    Roboto: {
      normal: "Roboto-Regular.ttf",
      bold: "Roboto-Medium.ttf",
      italics: "Roboto-Italic.ttf",
      bolditalics: "Roboto-MediumItalic.ttf",
    },
    Symbol: {
      normal: "Symbol",
    },
    ZapfDingbats: {
      normal: "ZapfDingbats",
    },
  };

  const { vfs } = vfsFonts.pdfMake;
  pdfMake.vfs = vfs;

  const documentDefinition = {
    pageSize: "A4",
    pageOrientation: "portrait",
    content: [
      {
        image: "logo",
        width: 200,
      },
      // { text: "AppSmith Sutera Sdn Bhd", style: "header" },
      { text: subtitle + "\n", style: "subheader" },
      {
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 5,
            x2: 500,
            y2: 5,
            lineWidth: 2,
          },
        ],
      },
      {
        columns: [
          {
            width: 90,
            text: "\n",
          },
          {
            width: 20,
            text: "",
          },
          {
            width: "200",
            text: "",
          },
          {
            width: "*",
            text: "",
          },
        ],
      },
      {
        columns: [
          {
            width: 90,
            text: "Emp No ",
          },
          {
            width: 20,
            text: ":",
          },
          {
            width: "200",
            text: empno,
          },
          {
            width: "*",
            text: "",
          },
        ],
      },
      {
        columns: [
          {
            width: 90,
            text: "Name ",
          },
          {
            width: 20,
            text: ":",
          },
          {
            width: 200,
            text: name,
          },
          {
            width: "*",
            text: "",
          },
        ],
      },
      {
        columns: [
          {
            width: 90,
            text: "I/C No ",
          },
          {
            width: 20,
            text: ":",
          },
          {
            width: 200,
            text: ic_no,
          },
          {
            width: "*",
            text: "",
          },
        ],
      },
      {
        columns: [
          {
            width: 90,
            text: "Designation ",
          },
          {
            width: 20,
            text: ":",
          },
          {
            width: 200,
            text: designation,
          },
          {
            width: "*",
            text: "",
          },
        ],
      },
      {
        columns: [
          {
            width: 90,
            text: "Bank A/C No ",
          },
          {
            width: 20,
            text: ":",
          },
          {
            width: 200,
            text: bank_acno,
          },
          {
            width: "*",
            text: "",
          },
        ],
      },
      {
        columns: [
          {
            width: 90,
            text: "TAP No ",
          },
          {
            width: 20,
            text: ":",
          },
          {
            width: 200,
            text: tap_acno,
          },
          {
            width: "*",
            text: "",
          },
        ],
      },
      {
        columns: [
          {
            width: 90,
            text: "SCP No ",
          },
          {
            width: 20,
            text: ":",
          },
          {
            width: 200,
            text: scp_acno,
          },
          {
            width: "*",
            text: "",
          },
        ],
      },
      // {
      //   text: [
      //     { text: "Emp No : " + empno + "\n", style: "text" },
      //     { text: "Name   : " + name + "\n", style: "text" },
      //     { text: "Addess : " + address + "\n", style: "text" },
      //     { text: "Phone  : " + phone + "\n\n", style: "text" },
      //   ],
      // },

      {
        table: {
          headerRows: 1,
          widths: ["97%"],
          body: [[""], [""]],
        },
        layout: "headerLineOnly",
      },
      {
        style: "tableExample",
        table: {
          widths: [150, 80, 150, 80],
          body: [
            [
              { alignment: "left", text: "Earnings" },
              { alignment: "right", text: "Amount" },
              { alignment: "left", text: "Deductions" },
              { alignment: "right", text: "Amount" },
            ],
            [
              {
                stack: [
                  {
                    type: "none",
                    fontSize: 12,
                    ul: earningsdesp,
                  },
                ],
              },
              {
                stack: [
                  {
                    type: "none",
                    fontSize: 12,
                    alignment: "right",
                    ul: earningsamt,
                  },
                ],
              },
              {
                stack: [
                  {
                    type: "none",
                    fontSize: 12,
                    ul: deductionsdesp,
                  },
                ],
              },
              {
                stack: [
                  {
                    type: "none",
                    fontSize: 12,
                    alignment: "right",
                    ul: deductionsamt,
                  },
                ],
              },
            ],
            [
              { alignment: "left", text: "Total Earnings" },
              { alignment: "right", text: formatPrice(totalEarnings) },
              { alignment: "left", text: "Total Deductions" },
              { alignment: "right", text: formatPriceZero(totalDeductions) },
            ],
            [
              { alignment: "left", text: "" },
              { alignment: "right", text: "" },
              { alignment: "left", text: "Nett Pay" },
              { alignment: "right", text: formatPrice(data.rowData.nett_pay) },
            ],
          ],
        },
      },
      // {
      //   style: "tableExample",
      //   table: {
      //     widths: [480, 80],
      //     body: [
      //       [
      //         { alignment: "left", text: "Nettpay" },
      //         { alignment: "right", text: "Amount" },
      //       ],
      //     ],
      //   },
      // },
      { text: footer + "\n", style: "footer" },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      text: {
        fontSize: 12,
        bold: false,
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
      //font: "Helvetica",
    },
    images: {
      logo: "https://res.cloudinary.com/dlmzwvakr/image/upload/v1658466681/appsmiths/AppSutLogo_tijr4l.jpg",
      img1: "./AppSutLogo.jpg",
    },
  };

  pdfMake.createPdf(documentDefinition).open();
};

export default PrintPayslip;
