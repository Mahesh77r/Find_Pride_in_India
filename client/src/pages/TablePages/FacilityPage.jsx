// FacilityTable.jsx

import React, { useState, useEffect } from "react";
import CustomTable from "../../components/Table/Table";
import { fetchFacility } from "../../services/domCRUD";
import { UpdateDeletebuttons } from "../../components/CustomButtons";
import { FormFacility } from '../../components/Forms/ManagementsForms';
import { Modal } from 'antd';
import { styled } from 'styled-components';
const StyledImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const FacilityTable = () => {

  const columns = [
    {
      name: 'Images',
      selector: (row) => <StyledImage src={row.path} alt="Product" />,
      sortable: true,
      maxWidth: '110px', // Adjust the maximum width as needed
      textAlign: 'center',
    },
    {
      name: "Facility Name",
      selector: (row) => row.facility_name,
      sortable: true,
      textAlign: 'center',
    },
    {
      name: "Facility Number",
      selector: (row) => row.facility_number,
      sortable: true,
    },
    {
      name: "Event Location",
      selector: (row) => row.facility_location,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <UpdateDeletebuttons form_type={` guide ${row.facility_name} `} onClick={() => modalopenClose('update', row)} />
      ),
    },
  ];

  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState(null);

  const modalopenClose = (formType, rowData) => {
    setVisible(true);
    setFormData(rowData);
  };

  const getFacility = async () => {
    try {
      const storedUserJSON = localStorage.getItem("user");
      const storedUser = JSON.parse(storedUserJSON);

      const res = await fetchFacility(storedUser.destinationName);
      const data = res.data.data;

      setRecords(data);
      setFilterRecords(data);
    } catch (error) {
      console.error("Error fetching checkpoints:", error);
    }
  };

  useEffect(() => {
    getFacility();
  }, []);

  return (
    <>
      <Modal
        onCancel={() => setVisible(false)}
        footer={null}
        visible={visible}
      >
        <FormFacility
          updatedata={formData}
          setupdatedata={setRecords}
        />
      </Modal>
      <CustomTable
        columns={columns}
        addform={<FormFacility />}
        title={'Facility'}
        searchfield={'facility_name'}
        records={records}
        setRecords={setRecords}
        filterRecords={filterRecords}
        setFilterRecords={setFilterRecords}
        fetchData={getFacility}
      />
    </>
  );
};