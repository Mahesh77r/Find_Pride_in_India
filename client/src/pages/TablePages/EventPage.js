import React, { useState, useEffect } from "react";
import CustomTable from "../../components/Table/Table";
import { fetchEvents } from "../../services/domCRUD";
import { UpdateDeletebuttons } from "../../components/CustomButtons";

import {styled} from 'styled-components';

const StyledImage = styled.img`
  width: 70px; 
  height: 50px; 
  border-radius: 50%;
`;


export const EventTable = () => {
  const columns = [
    {
      name: 'Images',
      selector: (row) => <StyledImage src={row.path} alt="Product" />,
      sortable: true,
      maxWidth: '100px', // Adjust the maximum width as needed
  },
    {
      name: "Event Name",
      selector: (row) => row.event_name,
      sortable: true,
    },
    {
      name: "Event Date",
      selector: (row) => row.event_date.substring(0, 10),
      sortable: true,
    },
    {
      name: "Event Description",
      selector: (row) => row.event_des,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <UpdateDeletebuttons form_type={` guide ${row.event_name} `} />
      ),
    },
  ];

  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);

  const getEvents = async () => {
    try {
      const storedUserJSON = localStorage.getItem("user");
      const storedUser = JSON.parse(storedUserJSON);

      const res = await fetchEvents(storedUser.destinationName);
      const data = res.data.data;

      setRecords(data);
      setFilterRecords(data);
    } catch (error) {
      console.error("Error fetching checkpoints:", error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <CustomTable
      columns={columns}
      addform={<EventTable/>}
      title={'Event'}
      searchfield={'event_name'}
      records={records}
      setRecords={setRecords}
      filterRecords={filterRecords}
      setFilterRecords={setFilterRecords}
      fetchData={getEvents}
    />
  );
};
