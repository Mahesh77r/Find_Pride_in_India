import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { AddButton } from '../../components/CustomButtons';
import { Modal } from 'antd';

const CustomTable = ({ columns,addform , title,fetchData, searchfield, setFilterRecords, filterRecords, setRecords, records }) => {
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
  }, []);

  function handleFilter(event) {
    const newData = filterRecords.filter((row) => {
      return row[searchfield].toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }
  const [visible, setVisible] = useState(false);
  const modalopenClose = () => {
    setVisible(true);
  };

  return (
    <div className="container" style={{ padding: '2%', backgroundColor: 'white', backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png");', color: '#1c8c59' }}>
      <div className="text-end" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.2% 0.2% ' }}>
        <input
          type="text"
          placeholder={` Search ${title}`}
          className="border border-solid border-gray-700 mb-3 bg-white p-2 px-2 text-center"
          onChange={handleFilter}
        />
        <Modal
        onCancel={() => setVisible(false)}
        footer={null}
        visible={visible}>
        {addform}
        </Modal>
        <AddButton onClick={modalopenClose} form_type={title}/>
      </div>

      <DataTable columns={columns} data={records} fixedHeader pagination customStyles={customStyles} style={{ color: '#1c8c59' }} className='text-center items-center justify-center align-middle'/>
    </div>
  );
};

export default CustomTable;
