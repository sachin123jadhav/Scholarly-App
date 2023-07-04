import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import { useTable, usePagination, useRowSelect } from "react-table";

import Chat from "../../components/Chat";
import Checkbox from "../../components/Checkbox";
import Layout from "../../components/Layout";
import Icon from "../../components/Icon";
import {
  clearProspectorDataAction,
  getSavedScrapData,
  getScrapTableData,
  saveScrapData,
  selectSavedScrapData,
  selectScrapTableData,
} from "../../store/Prospector";
import Alerts from "../../utils/Alert";
import { ROUTES } from "../../routes/RouterConfig";
import { Td, Th } from "../../components/Prospector";

const COLUMNS = [
  {
    Header: "Place name",
    accessor: "title",
    width: "min-w-[150px]",
  },
  {
    Header: "Total Score",
    accessor: "totalScore",
  },
  {
    Header: "Reviews Count",
    accessor: "reviewsCount",
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

const ProspectorDataTable = () => {
  const token = useSelector((state) => state.Auth.token);
  const scrapData = useSelector(selectScrapTableData);
  const savedData = useSelector(selectSavedScrapData);

  const [loader, setLoader] = useState(false);
  const [isDataFiltered, setIsDataFiltered] = useState(false);
  const [dataChanged, setDataChanged] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { datasetid, name } = state;

  const tableData = useMemo(() => {
    if (!scrapData.length) {
      return [];
    }
    if (savedData.length) {
      setIsDataFiltered(false);
      const savedDataIds = savedData.map((data) => data.cid);
      const newTableData = scrapData.filter((data) => {
        if (savedDataIds.includes(data.cid)) {
          return false;
        }
        return data;
      });
      setIsDataFiltered(true);
      return newTableData;
    }
    setIsDataFiltered(true);
    return [...scrapData];
  }, [savedData, scrapData]);

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
    selectedFlatRows,
    toggleAllRowsSelected,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 50, pageIndex: 0 },
    },
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          width: "min-w-[50px]",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );

  useEffect(() => {
    dispatch(getScrapTableData(token, { datasetid }, setLoader));
    dispatch(getSavedScrapData(token, { datasetidref: datasetid }, setLoader));
    setDataChanged(false);
  }, [dataChanged]);

  const handleBackClick = () => {
    dispatch(clearProspectorDataAction());
    window.history.back();
  };

  const handleSave = () => {
    if (!selectedFlatRows.length) {
      let params = {
        title: "Data Selection Required",
        description:
          "Please choose at least one data item to save. Your selection is necessary to proceed.",
        status: "error",
      };
      Alerts(params);
      return;
    }
    const payload = {
      data: selectedFlatRows.map((row) => row.original),
      datasetidref: datasetid,
    };
    dispatch(saveScrapData(token, payload, setLoader));
    toggleAllRowsSelected(false);
    setDataChanged(true);
  };

  if (loader || !isDataFiltered) {
    return (
      <Layout>
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-n-7">
          <Spinner thickness="4px" speed="0.65s" size="xl" />
        </div>
      </Layout>
    );
  }

  const handleSavedDataClick = () => {
    navigate(ROUTES.PROSPECTOR_SAVE_DATA_TABLE, {
      state: { datasetid, name },
    });
  };

  return (
    <Layout>
      <Chat
        title={name}
        backIcon
        handleBackClick={handleBackClick}
        className="xl:-mt-0 md:-mt-13 md:pb-5"
        headerRightComponent={
          <div className="">
            {!!selectedFlatRows.length ? (
              <button onClick={handleSave} className="mx-5">
                Save
              </button>
            ) : (
              <button onClick={handleSavedDataClick}>Saved Data</button>
            )}
          </div>
        }
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
                    <tr {...row.getRowProps()}>
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

export default ProspectorDataTable;
