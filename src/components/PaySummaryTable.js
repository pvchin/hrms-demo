import React from "react";
// import {
//   Box,
//   Divider,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   chakra,
// } from "@chakra-ui/react";
//import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
//import { useTable, useSortBy } from "react-table";
//import { formatPrice } from "../helpers/Utils";

export default function PaySummaryTable({ columns, data }) {
  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   useTable({ columns, data }, useSortBy);

  return (
    <div>Payroll Summary</div>
    // <Table colorScheme="whiteAlpha" variant="simple" {...getTableProps()}>
    //   <Thead position="sticky" top="0" bgColor="blue.200">
    //     {headerGroups.map((headerGroup) => (
    //       <Tr {...headerGroup.getHeaderGroupProps()}>
    //         {headerGroup.headers.map((column) => (
    //           <Th
    //             {...column.getHeaderProps(column.getSortByToggleProps())}
    //             isNumeric={column.isNumeric}
    //           >
    //             {column.render("Header")}
    //             <chakra.span pl="4">
    //               {column.isSorted ? (
    //                 column.isSortedDesc ? (
    //                   <TriangleDownIcon aria-label="sorted descending" />
    //                 ) : (
    //                   <TriangleUpIcon aria-label="sorted ascending" />
    //                 )
    //               ) : null}
    //             </chakra.span>
    //           </Th>
    //         ))}
    //       </Tr>
    //     ))}
    //   </Thead>

    //   <Tbody {...getTableBodyProps()}>
    //     {rows.map((row) => {
    //       prepareRow(row);
    //       return (
    //         <Tr bgColor="gray.50" {...row.getRowProps()}>
    //           {row.cells.map((cell) => (
    //             <Td
    //               borderBottom="1px solid black"
    //               borderRight="1px solid black"
    //               bgColor="whiteAlpha.400"
    //               {...cell.getCellProps()}
    //               isNumeric={cell.column.isNumeric}
    //             >
    //               {cell.render("Cell")}
    //             </Td>
    //           ))}
    //         </Tr>
    //       );
    //     })}
    //   </Tbody>
    // </Table>
  );
}
