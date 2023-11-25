import React, { useState, useEffect } from "react";
import CustomTable from "../../components/Table/Table";
import { fetchGuide } from "../../services/domCRUD";
import { UpdateDeletebuttons } from "../../components/CustomButtons";

import {styled} from 'styled-components';

const StyledImage = styled.img`
  width: 50px; 
  height: 50px; 
  border-radius: 50%;
`;


export const GuideTable = () => {
  const columns = [
    {
      name: 'Images',
      selector: (row) => <StyledImage src={row.path} alt="Product" />,
      sortable: true,
      maxWidth: '100px', // Adjust the maximum width as needed
  },
    {
      name: "Guide Name",
      selector: (row) => row.guide_name,
      sortable: true,
    },
    {
      name: "Guide Price",
      selector: (row) => row.guide_price,
      sortable: true,
    },
    {
      name: "Contact Number",
      selector: (row) => row.contact,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <UpdateDeletebuttons form_type={` guide ${row.guide_name} `} />
      ),
    },
  ];

  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);

  const getGuide = async () => {
    try {
      const storedUserJSON = localStorage.getItem("user");
      const storedUser = JSON.parse(storedUserJSON);

      const res = await fetchGuide(storedUser.destinationName);
      const data = res.data.data;

      setRecords(data);
      setFilterRecords(data);
    } catch (error) {
      console.error("Error fetching checkpoints:", error);
    }
  };

  useEffect(() => {
    getGuide();
  }, []);

  return (
    <CustomTable
      columns={columns}
      addform={<GuideTable/>}
      title={'Guide'}
      searchfield={'guide_name'}
      records={records}
      setRecords={setRecords}
      filterRecords={filterRecords}
      setFilterRecords={setFilterRecords}
      fetchData={getGuide}
    />
  );
};
