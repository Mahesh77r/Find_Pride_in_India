import React, { useState, useEffect } from "react";
import CustomTable from "../../components/Table/Table";
import { fetchCheckpoints } from "../../services/CheckpointsCrud";

import {styled} from 'styled-components';
import { UpdateDeletebuttons } from "../../components/CustomButtons";

const StyledImage = styled.img`
  width: 70px; 
  height: 50px; 
  border-radius: 50%;
`;

export const Checkpoints = () => {

  const AudioColumn = ({ audioPath }) => (
    <audio controls>
      <source src={audioPath} type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  );
  const columns = [
    {
      name: 'Images',
      selector: (row) => <StyledImage src={row.image_path} alt="Checkpoints" />,
      sortable: true,
      maxWidth: '100px', // Adjust the maximum width as needed
  },
    {
      name: "Point Number",
      selector: (row) => row.point_number,
      sortable: true,
    },
    {
      name: "Point Name",
      selector: (row) => row.point_name,
      sortable: true,
    },
    {
      name: "Text Data",
      selector: (row) => row.point_descp,
      sortable: true,
    },
    {
      name: 'Audio',
      selector: (row) => <AudioColumn audioPath={row.audio_path} />,
      sortable: true,
      maxWidth: '100px', // Adjust the maximum width as needed
    },
    {
      name: "Actions",
      cell: (row) => (
        <UpdateDeletebuttons form_type={`checkpoint ${row.point_name} `} />
      ),
    },
  ];

  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);

  const getCheckpoints = async () => {
    try {
      const storedUserJSON = localStorage.getItem("user");
      const storedUser = JSON.parse(storedUserJSON);

      const res = await fetchCheckpoints(storedUser._id);
      const data = res.data.data;

      setRecords(data);
      setFilterRecords(data);
    } catch (error) {
      console.error("Error fetching checkpoints:", error);
    }
  };

  useEffect(() => {
    getCheckpoints();
  }, []);

  return (
    <CustomTable
      columns={columns}
      addform={<Checkpoints/>}
      title={'Checkpoint'}
      searchfield={"point_name"}
      records={records}
      setRecords={setRecords}
      filterRecords={filterRecords}
      setFilterRecords={setFilterRecords}
      fetchData={getCheckpoints}
    />
  );
};
