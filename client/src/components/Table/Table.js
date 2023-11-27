import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { AddButton } from '../../components/CustomButtons';
import { Modal } from 'antd';

const CustomTable = ({ onSubmitHandler, data,handleFileChange, selectedFile,setSelectedFile, onChangeHandler, columns, addform, initialData, setFormData, title, fetchData, searchfield, setFilterRecords, filterRecords, setRecords, records }) => {
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
        maxWidth: '60px', // Adjust the maximum width
        overflow: 'hidden',
        // whiteSpace: 'nowrap',
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
        width: '0px', // Adjust the width
        maxWidth: '0px', // Adjust the maximum width
        overflow: 'hidden',
        // textOverflow: 'ellipsis',
        // whiteSpace: 'nowrap',
      },
    },
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function handleFilter(event) {
    const newData = filterRecords.filter((row) => {
      return row[searchfield].toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }
  const [visible, setVisible] = useState(false);

  const modalOpenClose = () => {
    setVisible(!visible);
    if (!visible) {
      // If opening the modal, set form data to initial data
      setFormData(initialData);
    }
  };
  const onCancel = () => {
    setVisible(false);
    setSelectedFile(null);
    setFormData(null);
  };
  return (
    <div className="container p-2 bg-white bg-pattern-color text-pattern-text">
      <div className="flex justify-between items-center space-between p-0.2">
        <input
          type="text"
          placeholder={` Search ${title}`}
          className="border border-solid border-gray-700 mb-3 bg-white p-2 px-2 text-center"
          onChange={handleFilter}
        />
        <Modal onCancel={() => onCancel()} footer={null} open={visible}>
          <form>
            {React.cloneElement(addform, { onChangeHandler, data, handleFileChange,selectedFile })} {/* Pass necessary props */}
            <AddButton form_type={title} onClickfun={onSubmitHandler}/>
          </form>
        </Modal>

        <AddButton onClickfun={modalOpenClose} form_type={title} />
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

export default CustomTable;









