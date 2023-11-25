import { useState } from "react";
import React from "react";
import "./table.css";
import { Table } from "./Table-component/Table";
import { Modal } from "./Table-component/Modal";

export const TableStructure =()=>{
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      page: "1st December",
      description: "Appointment at Dentist.",
      status: "done",
    },
    {
      page: "2nd December",
      description: "Appointment with doctor at Hospital",
      status: "pending",
    },
    {
      page: "3rd November",
      description: "Appointment with Doctor at Clinic",
      status: "left",
    },
  ]);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

  return (
    <div className="tablebody">
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <button onClick={() => setModalOpen(true)} className="btn">
        Add
      </button>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
    </div>
  );
}

export default TableStructure;
