import React, { useState, useEffect } from "react";
import CustomTable from "../../components/Table/Table";
import { addEvent, fetchEvents } from "../../services/domCRUD";
import { AddButton, UpdateButton, UpdateDeletebuttons } from "../../components/CustomButtons";
import { Toaster, toast } from 'react-hot-toast'
import { Modal } from 'antd';
import { styled } from 'styled-components';
import { FormEvents } from "../../components/Forms/ManagementsForms";

const StyledImage = styled.img`
  width: 70px; 
  height: 50px; 
  border-radius: 50%;
`;


export const EventTable = () => {
  const columns = [
    {
      name: 'Image',
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
        <UpdateDeletebuttons form_type={` event ${row.event_name} `} onClick={() => modalOpenClose('update', row)} />
      ),
    },
  ];
  const [selectedFile, setSelectedFile] = useState(null);
  const storedUserJSON = localStorage.getItem("user");
  const user = JSON.parse(storedUserJSON);

  const initialData = {
    event_name: "",
    event_date: "",
    event_des: "",
    state: user.state,
    city: user.city,
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
          const response = await addEvent(FacilityData);
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
          <FormEvents
            selectedFile={selectedFile}
            handleFileChange={handleFileChange}
            onChangeHandler={onChangeHandler}
            data={formData}
            isUpdateMode={isUpdateMode}
          />
          {isUpdateMode ? (
            <UpdateButton title={"Event"} />
          ) : (
            <AddButton form_type={"Event"} />
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
        addform={<FormEvents />}
        title={'Event'}
        searchfield={'event_name'}
        records={records}
        setRecords={setRecords}
        filterRecords={filterRecords}
        setFilterRecords={setFilterRecords}
        fetchData={getEvents}
        modalOpenClose={modalOpenClose}
      />
    </>
  );
};
