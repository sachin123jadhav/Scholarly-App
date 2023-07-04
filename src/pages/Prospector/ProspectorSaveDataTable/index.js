import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useTable, usePagination } from "react-table";

import Chat from "../../../components/Chat";
import Layout from "../../../components/Layout";
import Icon from "../../../components/Icon";
import { Td, Th } from "../../../components/Prospector";
import {
  clearProspectorDataAction,
  getSavedScrapData,
  selectSavedScrapData,
} from "../../../store/Prospector";

const COLUMNS = [
  {
    Header: "#",
    Cell: ({ row }) => {
      const { index } = row;
      return <span>{index + 1}</span>;
    },
    width: 50,
  },
  {
    Header: "Place name",
    accessor: "title",
    width: "min-w-[150px]",
  },
  {
    Header: "Total Score",
    accessor: "totalscore",
  },
  {
    Header: "Reviews Count",
    accessor: "reviewscount",
  },
  {
    Header: "Street",
    accessor: "street",
    width: "min-w-[250px]",
  },
  {
    Header: "City",
    accessor: "city",
  },
  {
    Header: "State",
    accessor: "state",
  },
  {
    Header: "Country Code",
    accessor: "countryCode",
  },
  {
    Header: "Website",
    accessor: "website",
    Cell: ({ value }) => (
      <a href={value} target="blank" className="items-center justify-center ">
        <span className="pt-3 mr-1 underline underline-offset-4 hover:text-blue-700 w-">Visit</span>
        <Icon
          name="external-link"
          className="w-4 h-4 text-n-2 fill-primary-3 dark:fill-primary-1"
        />
      </a>
    ),
  },
  {
    Header: "Phone",
    accessor: "phone",
    width: "min-w-[120px]",
  },
  {
    Header: "Category Name",
    accessor: "categoryName",
  },
  {
    Header: "URL",
    accessor: "url",
    Cell: ({ value }) => (
      <a href={value} target="blank">
        <Icon name="marker" className="w-4 h-4 text-n-2 fill-primary-3 dark:fill-primary-1" />
      </a>
    ),
  },
];

const ProspectorSaveDataTable = () => {
  const token = useSelector((state) => state.Auth.token);
  const savedData = useSelector(selectSavedScrapData);

  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const { state } = useLocation();
  const { datasetid, name } = state;

  const tableData = useMemo(() => {
    return [...savedData];
  }, [savedData]);

  const data = useMemo(() => [...tableData], [tableData]);
  const columns = useMemo(() => [...COLUMNS], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 50, pageIndex: 0 },
    },
    usePagination
  );

  useEffect(() => {
    dispatch(getSavedScrapData(token, { datasetidref: datasetid }, setLoader));
  }, []);

  const handleBackClick = () => {
    dispatch(clearProspectorDataAction());
    window.history.back();
  };

  if (loader) {
    return (
      <Layout>
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-n-7">
          <Spinner thickness="4px" speed="0.65s" size="xl" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Chat
        title={name}
        backIcon
        handleBackClick={handleBackClick}
        className="xl:-mt-0 md:-mt-13 md:pb-5"
      >
        {tableData.length ? (
          <>
            <table className="table table-fixed " {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()} className="border-red-500">
                    {headerGroup.headers.map((column) => (
                      <Th {...column.getHeaderProps()} width={column.width}>
                        {column.render("Header")}
                      </Th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} className="">
                      {row.cells.map((cell) => {
                        return (
                          <Td {...cell.getCellProps()}>
                            {cell.value || cell.value === undefined ? cell.render("Cell") : "N/A"}
                          </Td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-between">
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className="dark:btn-stroke-dark btn-stroke-light"
              >
                Previous Page
              </button>
              <div>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>
              </div>
              <button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className="dark:btn-stroke-dark btn-stroke-light"
              >
                Next Page
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-96">
            <h1 className="text-2xl font-semibold text-n-6 dark:text-n-2">No Data Found</h1>
          </div>
        )}
      </Chat>
    </Layout>
  );
};

export default ProspectorSaveDataTable;
