import React, { useMemo, useState } from "react";
import { useTable } from "react-table";
import axios from "axios";
import "./table.css";

const Table = ({ data, fetchData }) => {
  const [loading, setLoading] = useState(false); // Local loading state for status update

  const handleStatusChange = async (applicationId, newStatus) => {
    setLoading(true); // Show loading when status update API is called
    try {
      // Make the API call to update the status
      console.log("API is Called");
      await axios.put(
        `https://money-squad-backend-service.vercel.app/updateapplicationsstatus/${applicationId}`,
        {
          Status: newStatus,
        }
      );
      console.log("Status updated successfully");

      // Fetch the updated data after the API call
      await fetchData();
    } catch (error) {
      console.error("Error updating status", error);
    } finally {
      setLoading(false); // Hide loading modal after API call finishes
    }
  };

  const columns = useMemo(
    () => [
      { Header: "Application", accessor: "Application" },
      {
        Header: "Status",
        accessor: "Status",
        Cell: ({ row, value }) => (
          <select
            value={value}
            onChange={(e) =>
              handleStatusChange(row.original._id, e.target.value)
            }
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        ),
      },
      { Header: "Name", accessor: "Name" },
      { Header: "DOB", accessor: "DOB" },
      { Header: "Salary", accessor: "Salary" },
      { Header: "Obligation", accessor: "Obligation" },
      { Header: "Due", accessor: "Due" },
      { Header: "PAN", accessor: "PAN" },
      { Header: "Number", accessor: "Number" },
      { Header: "Employment", accessor: "Employment" },
      { Header: "CreditModel", accessor: "CreditModelL" },
      { Header: "Experience", accessor: "Experience" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="table-container">
      {/* Local loading indicator */}
      {loading && (
        <div className="loading-modal">
          <div className="loading-content">
            <p>Updating Status...</p>
          </div>
        </div>
      )}

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
