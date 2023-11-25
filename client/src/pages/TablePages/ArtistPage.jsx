import React, { useState, useEffect } from "react";
import CustomTable from "../../components/Table/Table";
import { addEvent, fetchArtist } from "../../services/domCRUD";
import { AddButton, UpdateButton, UpdateDeletebuttons } from "../../components/CustomButtons";
import { Toaster, toast } from 'react-hot-toast'
import { Modal } from 'antd';
import {styled} from 'styled-components';
import { FormArtist } from "../../components/Forms/ManagementsForms";

const StyledImage = styled.img`
  width: 70px; 
  height: 50px; 
  border-radius: 50%;
`;


export const ArtistTable = () => {
  const columns = [
    {
      name: 'Image',
      selector: (row) => <StyledImage src={row.path} alt="Product" />,
      sortable: true,
      maxWidth: '100px', // Adjust the maximum width as needed
  },
    {
      name: "Artist Name",
      selector: (row) => row.artist_name,
      sortable: true,
    },
    {
      name: "Artist Contact",
      selector: (row) => row.artist_contact,
      sortable: true,
    },
    {
      name: "Artist Address",
      selector: (row) => row.artist_address,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <UpdateDeletebuttons form_type={` artist ${row.artist_name} `}  onClick={() => modalOpenClose('update', row)} />
      ),
    },
  ];
  const [selectedFile, setSelectedFile] = useState(null);
  const storedUserJSON = localStorage.getItem("user");
  const user = JSON.parse(storedUserJSON);

  const initialData =  {
    artist_name: "",
    artist_address: "",
    artist_contact: "",
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
  const getArtist = async () => {
    try {
      const storedUserJSON = localStorage.getItem("user");
      const storedUser = JSON.parse(storedUserJSON);

      const res = await fetchArtist(storedUser.destinationName);
      const data = res.data.data;
      setRecords(data);
      setFilterRecords(data);
    } catch (error) {
      console.error("Error fetching checkpoints:", error);
    }
  };

  useEffect(() => {
    getArtist();
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
      visible={visible}
    >
      <form onSubmit={onSubmitHandler}>
        <FormArtist
          selectedFile={selectedFile}
          handleFileChange={handleFileChange}
          onChangeHandler={onChangeHandler}
          data={formData}
          isUpdateMode={isUpdateMode}
        />
        {isUpdateMode ? (
          <UpdateButton title={"Artist"} />
        ) : (
          <AddButton form_type={"Artist"} />
        )}
      </form>
    </Modal>
    <CustomTable
    handleFileChange={handleFileChange}
    onChangeHandler={onChangeHandler}
    setFormData={setFormData}
    data={formData}
    selectedFile={selectedFile}
    initialData={initialData}
      columns={columns}
      addform={<FormArtist/>}
      title={'Artist'}
      searchfield={'artist_name'}
      records={records}
      setRecords={setRecords}
      filterRecords={filterRecords}
      setFilterRecords={setFilterRecords}
      fetchData={getArtist}
      modalOpenClose={modalOpenClose}
    />
  </>
  );
};
