import React, { useState, useEffect } from "react";
import CustomTable from "../../components/Table/Table";
import { addArtist, fetchArtist } from "../../services/domCRUD";
import { AddButton, UpdateButton, UpdateDeletebuttons } from "../../components/CustomButtons";
import { Toaster, toast } from 'react-hot-toast'
import { Modal } from 'antd';
import { styled } from 'styled-components';
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
        <UpdateDeletebuttons form_type={` artist ${row.artist_name} `} onClick={() => modalOpenClose('update', row)} />
      ),
    },
  ];
  const [selectedFile, setSelectedFile] = useState(null);
  const storedUserJSON = localStorage.getItem("user");
  const user = JSON.parse(storedUserJSON);

  const initialData = {
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
  let loadingToast;
  try {
    if (isUpdateMode) {
      // Handle update logic
      console.log("Update logic here");
      toast.success("Artist updated successfully");
    } else {
      // Handle add logic
      const artistData = new FormData();
      artistData.append('data', JSON.stringify(formData));
      artistData.append('image', selectedFile);

      // Show loading notification
       loadingToast = toast.loading("Processing...");

      const res = await addArtist(artistData);
      console.log(res);
      if (res.status === 200) {
        toast.success("Artist added successfully");
      } else {
        toast.error("Failed to add artist");
      }
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("An error occurred");
  } finally {
    // Remove loading notification
    toast.dismiss(loadingToast);
    // Close modal
    setVisible(false);
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
        <form onSubmit={onSubmitHandler} encType="multipart/form-data">
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
            <AddButton form_type={"Artist"} onClickfun={""} />
          )}
        </form>
      </Modal>
      <CustomTable
        setSelectedFile={setSelectedFile}
        handleFileChange={handleFileChange}
        onSubmitHandler={onSubmitHandler}
        onChangeHandler={onChangeHandler}
        setFormData={setFormData}
        data={formData}
        selectedFile={selectedFile}
        initialData={initialData}
        columns={columns}
        addform={<FormArtist />}
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
