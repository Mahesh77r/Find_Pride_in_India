import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Modal } from 'antd';

export const FetchDataTable = ({ columns, fetchData, searchfield, filterRecords, setRecords, records }) => {
  const customStyles = {
    rows: {
      style: {
        minHeight: '48px',
      },
    },
    headRow: {
      style: {
        maxHeight: '48px',
        backgroundColor: '#000D27',
      },
    },
    headCells: {
      style: {
        fontSize: '14px',
        fontWeight: '600',
        textTransform: 'uppercase',
        borderStyle: 'solid',
        borderWidth: '1px',
        color: 'white',
        textAlign: 'center',
      },
    },
    cells: {
      style: {
        fontSize: '13px',
        wordBreak: 'break-word',
        borderStyle: 'solid',
        borderWidth: '1px',
        color: '#00000',
        textAlign: 'center',
      },
    },
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  function handleFilter(event) {
    const newData = filterRecords.filter((row) => {
      return row[searchfield].toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }

  return (
    <div className="container p-2 bg-white bg-pattern-color text-pattern-text">
      <div className="flex justify-between items-center space-between p-0.2">
        <input
          type="text"
          placeholder={` Search`}
          className="border border-solid border-gray-700 mb-3 bg-white p-2 px-2 text-center"
          onChange={handleFilter}
        />
      </div>

      <DataTable
        columns={columns}
        data={records}
        fixedHeader
        pagination
        customStyles={customStyles}
        className="text-center items-center justify-center align-middle"
      />
    </div>
  );
};


