import React, { useState, useEffect } from "react";
import CustomTable from "../../components/Table/Table";
import { addArtist, fetchArtist, updateArtist, deleteArtist } from "../../services/domCRUD";
import { AddButton, DeleButton, UpdateButton, UpdateDeletebuttons } from "../../components/CustomButtons";
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
      maxWidth: '100px',
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
        <UpdateDeletebuttons form_type={` artist ${row.artist_name} `} onClickUpdate={() => modalOpenClose('update', row)} onClickDelete={() => openDeleteModal('delete', row)} />
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
  };

  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const openDeleteModal = (formType, rowData) => {
    setDeleteMode(true);
    setDeleteModalVisible(true);
    setFormData(rowData);
  };

  const closeDeleteModal = () => {
    setDeleteMode(false);
    setDeleteModalVisible(false);
  };

  const modalOpenClose = (formType, rowData) => {
    setVisible(true);
    setFormData(rowData);
    setIsUpdateMode(formType === 'update');
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let loadingToast;

    try {
      const artistData = new FormData();

      if (isUpdateMode) {
        artistData.append('data', JSON.stringify(formData));
      } else {
        artistData.append('data', JSON.stringify(formData));
        artistData.append('image', selectedFile);
      }

      loadingToast = toast.loading("Processing...");

      if (isUpdateMode) {
        const updateRes = await updateArtist(formData._id, formData);

        if (updateRes.status === 200) {
          toast.success("Artist updated successfully");
          // Refresh the page with a delay
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          toast.error("Failed to update artist");
        }
      } else if (deleteMode) {
        const deleteRes = await deleteArtist(formData._id);

        if (deleteRes.status === 200) {
          toast.success("Artist deleted successfully");
          // Refresh the page with a delay
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          toast.error("Failed to delete artist");
        }

        setDeleteMode(false);
        setDeleteModalVisible(false);
      } else {
        const addRes = await addArtist(artistData);
        if (addRes.status === 202) {
          toast.error("Checkpoint already exists");
        }

        if (addRes.status === 200) {
          toast.success("Artist added successfully");
          toast.dismiss(loadingToast);
          // Refresh the page with a delay
          setTimeout(() => {
            window.location.reload();
          }, 1.2*1000);
        } else {
          toast.error("Failed to add artist");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    } finally {
      toast.dismiss(loadingToast);
      setVisible(false);
    }
  };

  const getArtist = async () => {
    try {
      const storedUserJSON = localStorage.getItem("user");
      const storedUser = JSON.parse(storedUserJSON);
      const res = await fetchArtist(storedUser.destinationName);
      const data = res.data.data;
      console.log(data)
      setRecords(data);
      setFilterRecords(data);
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  useEffect(() => {
    getArtist();
  }, []);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      <Modal
        onCancel={closeDeleteModal}
        footer={null}
        open={deleteModalVisible}
      >
        <div className="p-6 bg-white rounded-md">
          <h2 className="text-2xl font-bold mb-4">Delete Artist</h2>
          <form onSubmit={onSubmitHandler}>

            <div className="mb-4">
              <p className="text-lg">Do you want to delete the Artist named:</p>
              <h4 className="text-xl font-semibold mt-2">{deleteModalVisible ? formData.artist_name : ''}</h4>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-300 text-gray-800 hover:bg-gray-400 px-4 py-2 rounded-md mr-2"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
              <DeleButton title={'Artist'} />
            </div>

          </form>
        </div>
      </Modal>
    </>
  );
};
