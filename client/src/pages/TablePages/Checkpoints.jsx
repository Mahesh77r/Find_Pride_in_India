import React, { useState, useEffect } from "react";
import CustomTable from "../../components/Table/Table";
import { addCheckpoint, fetchCheckpoints } from "../../services/CheckpointsCrud";

import { styled } from 'styled-components';
import { AddButton, UpdateButton, UpdateDeletebuttons } from "../../components/CustomButtons";
import { Toaster, toast } from 'react-hot-toast'
import { Modal } from 'antd';
import { FormCheckpoint } from "../../components/Forms/ManagementsForms";

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
        <UpdateDeletebuttons form_type={`checkpoint ${row.point_name} `} onClick={() => modalOpenClose('update', row)} />
      ),
    },
  ];

  const [selectedFile, setSelectedFile] = useState(null);
  const storedUserJSON = localStorage.getItem("user");
  const user = JSON.parse(storedUserJSON);

  const initialData = {
    point_name: "",
    point_number: "",
    point_descp: "",
    point_city: user.city,
    point_state: user.state,
    dest_name: user.destinationName,
    dest_id: user._id,
  }

  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const modalOpenClose = (formType, rowData) => {
    setVisible(true);
    setFormData(rowData);
    setIsUpdateMode(formType === 'update');
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isUpdateMode) {
      // Handle update logic
      // ...
    } else {
      if (selectedFile) {
        try {
          const FacilityData = {
            ...FormData,
            image: selectedFile,
          };
          const response = await addCheckpoint(FacilityData);
          if (response.status === 200) {
            toast.success("Facility added Successfully");
          }
          else {
            toast.error("Failed to add Facility ");
          }
        } catch (error) {
          console.error("Firebase Storage Error:", error);
        }
      } else {
        console.error("No file selected");
      }
    }
  };
  const getCheckpoints = async () => {
    try {
      const storedUserJSON = localStorage.getItem("user");
      const storedUser = JSON.parse(storedUserJSON);

      const res = await fetchCheckpoints(storedUser.destinationName);
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

  const onChangeHandler = (e) => {
    // setData({ ...data, [e.target.name]: e.target.value });
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  return (
    <>
      <Toaster position="top-center" />
      <Modal
        onCancel={() => setVisible(false)}
        footer={null}
        open={visible}
      >
        <form onSubmit={onSubmitHandler}>
          <FormCheckpoint
            selectedFile={selectedFile}
            handleFileChange={handleFileChange}
            onChangeHandler={onChangeHandler}
            data={formData}
            isUpdateMode={isUpdateMode}
          />
          {isUpdateMode ? (
            <UpdateButton title={"Checkpoint"} />
          ) : (
            <AddButton form_type={"Checkpoint"} />
          )}
        </form>
      </Modal>
      <CustomTable
      onSubmitHandler={onSubmitHandler}
        setSelectedFile={setSelectedFile}
        handleFileChange={handleFileChange}
        onChangeHandler={onChangeHandler}
        setFormData={setFormData}
        data={formData}
        selectedFile={selectedFile}
        initialData={initialData}
        columns={columns}
        addform={<FormCheckpoint />}
        title={'Checkpoint'}
        searchfield={'checkpoint_name'}
        records={records}
        setRecords={setRecords}
        filterRecords={filterRecords}
        setFilterRecords={setFilterRecords}
        fetchData={getCheckpoints}
        modalOpenClose={modalOpenClose}
      />
    </>
  );
};
