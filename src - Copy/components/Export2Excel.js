import React, { useEffect } from "react";
//import ReactExport from "react-export-excel";
import ReactExport from "react-data-export";
//import { ExcelFile, ExcelSheet } from "react-export-excel";
import { Button } from "@chakra-ui/react";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
//const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Export2Excel = ({ filename, dataset, title }) => {
  const hoccols = [
    {
      title: "What is/are the findings?",
      width: { wch: 34 },
      style: {
        font: { sz: "9", bold: true },
        //fill: { patternType: "solid", fgColor: { rgb: "#F5FFFA" } },
        //fill: { patternType: "solid", fgColor: { rgb: "#F5FFFA" } },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      title: "What is/are the potential hazard(s)/risk(s)?",
      width: { wch: 34 },
      style: {
        font: { sz: "9", bold: true },
        //fill: { patternType: "solid", fgColor: { rgb: "#F5FFFA" } },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      title: "Type / Category",
      width: { wch: 14 },
      style: {
        font: { sz: "9", bold: true },
        //fill: { patternType: "solid", fgColor: { rgb: "FF00FF00" } },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      title: "What",
      width: { wch: 18 },
      style: {
        font: { sz: "9", bold: true },
        //fill: { patternType: "solid", fgColor: { rgb: "FF00FF00" } },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      title: "What Details",
      width: { wch: 28 },
      style: {
        font: { sz: "9", bold: true },
        //fill: { patternType: "solid", fgColor: { rgb: "FF00FF00" } },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      title: "Why",
      width: { wch: 18 },
      style: {
        font: { sz: "9", bold: true },
        //fill: { patternType: "solid", fgColor: { rgb: "FF00FF00" } },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      title: "Why Details",
      width: { wch: 28 },
      style: {
        font: { sz: "9", bold: true },
        //fill: { patternType: "solid", fgColor: { rgb: "FF00FF00" } },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      title: "Did a conversation take place?",
      width: { wch: 18 },
      style: {
        font: { sz: "9", bold: true },
        //fill: { patternType: "solid", fgColor: { rgb: "FF00FF00" } },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      title: "Was there an agreed remedial/corrective or preventive action? ",
      width: { wch: 28 },
      style: {
        font: { sz: "9", bold: true },
        //fill: { patternType: "solid", fgColor: { rgb: "FF00FF00" } },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      title: "Follow-up required?",
      width: { wch: 18 },
      style: {
        font: { sz: "9", bold: true },
        //fill: { patternType: "solid", fgColor: { rgb: "FF00FF00" } },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      title: "Work Related?",
      width: { wch: 18 },
      style: {
        font: { sz: "9", bold: true },
        //fill: { patternType: "solid", fgColor: { rgb: "FF00FF00" } },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      title: "Raised By",
      width: { wch: 28 },
      style: {
        font: { sz: "9", bold: true },
        //fill: { patternType: "solid", fgColor: { rgb: "FF00FF00" } },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      title: "Raised On",
      width: { wch: 18 },
      style: {
        font: { sz: "9", bold: true },
        //fill: { patternType: "solid", fgColor: { rgb: "FF00FF00" } },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      title: "Company",
      width: { wch: 28 },
      style: {
        font: { sz: "9", bold: true },
        //fill: { patternType: "solid", fgColor: { rgb: "FF00FF00" } },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
    {
      title: "Location",
      width: { wch: 28 },
      style: {
        font: { sz: "9", bold: true },
        //fill: { patternType: "solid", fgColor: { rgb: "FF00FF00" } },
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "top",
        },
      },
    },
  ];

  const hocdata = dataset.map((rec, index) => {
    return [
      {
        value: rec.findings ? rec.findings : "",
        style: {
          font: { sz: "9" },
          alignment: {
            wrapText: true,
            horizontal: "center",
            vertical: "top",
          },
        },
      },
      {
        value: rec.risks ? rec.risks : "",
        style: {
          font: { sz: "9" },
          alignment: {
            wrapText: true,
            horizontal: "center",
            vertical: "top",
          },
        },
      },
      {
        value: rec.category ? rec.category : "",
        style: {
          font: { sz: "9" },
          alignment: {
            wrapText: true,
            horizontal: "center",
            vertical: "top",
          },
        },
      },
      {
        value: rec.what ? rec.what : "",
        style: {
          font: { sz: "9" },
          alignment: {
            wrapText: true,
            horizontal: "center",
            vertical: "top",
          },
        },
      },
      {
        value: rec.what_details ? rec.what_details : "",
        style: {
          font: { sz: "9" },
          alignment: {
            wrapText: true,
            horizontal: "center",
            vertical: "top",
          },
        },
      },
      {
        value: rec.why ? rec.why : "",
        style: {
          font: { sz: "9" },
          alignment: {
            wrapText: true,
            horizontal: "center",
            vertical: "top",
          },
        },
      },
      {
        value: rec.why_details ? rec.why_details : "",
        style: {
          font: { sz: "9" },
          alignment: {
            wrapText: true,
            horizontal: "center",
            vertical: "top",
          },
        },
      },
      {
        value: rec.discussion ? rec.discussion : "",
        style: {
          font: { sz: "9" },
          alignment: {
            wrapText: true,
            horizontal: "center",
            vertical: "top",
          },
        },
      },
      {
        value: rec.action ? rec.action : "",
        style: {
          font: { sz: "9" },
          alignment: {
            wrapText: true,
            horizontal: "center",
            vertical: "top",
          },
        },
      },
      {
        value: rec.isfollowup ? rec.isfollowup : "",
        style: {
          font: { sz: "9" },
          alignment: {
            wrapText: true,
            horizontal: "center",
            vertical: "top",
          },
        },
      },
      {
        value: rec.isworkrelated ? rec.isworkrelated : "",
        style: {
          font: { sz: "9" },
          alignment: {
            wrapText: true,
            horizontal: "center",
            vertical: "top",
          },
        },
      },
      {
        value: rec.raisedby ? rec.raisedby : "",
        style: {
          font: { sz: "9" },
          alignment: {
            wrapText: true,
            horizontal: "center",
            vertical: "top",
          },
        },
      },
      {
        value: rec.raisedon ? rec.raisedon : "",
        style: {
          font: { sz: "9" },
          alignment: {
            wrapText: true,
            horizontal: "center",
            vertical: "top",
          },
        },
      },
      {
        value: rec.company ? rec.company : "",
        style: {
          font: { sz: "9" },
          alignment: {
            wrapText: true,
            horizontal: "center",
            vertical: "top",
          },
        },
      },
      {
        value: rec.location ? rec.location : "",
        style: {
          font: { sz: "9" },
          alignment: {
            wrapText: true,
            horizontal: "center",
            vertical: "top",
          },
        },
      },
    ];
  });

  const multiDataSet = [
    // {
    //   columns: cols1,
    //   data: [],
    // },
    {
      columns: hoccols,
      data: hocdata,
    },
  ];

  return (
    // <ExcelFile element={<Button>Export to Excel</Button>} filename={filename}>
    //   <ExcelSheet dataSet={multiDataSet1} name="Organization" />
    // </ExcelFile>

    <ExcelFile
      element={
        <Button colorScheme="teal" variant="solid">
          Download
        </Button>
      }
      filename={filename}
    >
      <ExcelSheet dataSet={multiDataSet} name={title} />
    </ExcelFile>

    // <ExcelFile filename={filename}>
    //   <ExcelSheet dataSet={multiDataSet} name="HOC" />
    // </ExcelFile>

    // <ExcelFile element={<Button>Export to Excel</Button>} filename={filename}>
    //   <ExcelSheet data={dataset} name={title}>
    //     <ExcelColumn label="Name" value="name" />
    //     <ExcelColumn label="From Date" value="from_date" />
    //     <ExcelColumn label="To Date" value="to_date" />
    //     <ExcelColumn label="No of Days" value="no_of_days" />
    //     <ExcelColumn label="Reason" value="reason" />
    //     <ExcelColumn label="Status" value="status" />
    //   </ExcelSheet>
    //</ExcelFile>
  );
};

export default Export2Excel;
