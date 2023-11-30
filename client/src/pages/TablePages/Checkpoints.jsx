import React, { useState, useEffect } from "react";
import CustomTable from "../../components/Table/Table";
import { addCheckpoint, fetchCheckpoints, updateCheckpoint, deleteCheckpoint } from "../../services/CheckpointsCrud";
import { styled } from 'styled-components';
import { AddButton, UpdateButton, UpdateDeletebuttons, DeleButton } from "../../components/CustomButtons";
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
    <audio controls style={{ width: '240px' }}>
      <source src={audioPath} type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  );


  const columns = [
    {
      name: 'Images',
      selector: (row) => <StyledImage src={row.image_path} alt="Checkpoints" />,
      sortable: true,
      maxWidth: '120px',
    },
    {
      name: "Point Number",
      selector: (row) => row.point_number,
      sortable: true,
      maxWidth: '160px',

    },
    {
      name: "Point Name",
      selector: (row) => row.point_name,
      sortable: true,
      maxWidth: '220px',

    },
    {
      name: "Text Data",
      selector: (row) => row.point_descp,
      sortable: true,
      maxWidth: '390px',
    },
    {
      name: 'Audio',
      selector: (row) => <AudioColumn audioPath={row.audio_path} />,
      sortable: true,
      minWidth: '280px',
      maxWidth: '280px',
    },
    {
      name: "Actions",
      cell: (row) => (
        <UpdateDeletebuttons form_type={`checkpoint ${row.point_name} `} onClickUpdate={() => modalOpenClose('update', row)} onClickDelete={() => openDeleteModal('delete', row)} onClick={() => modalOpenClose('update', row)} />
      ),
      maxWidth: '280px',
      minWidth: '280px',
    },
  ];

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const storedUserJSON = localStorage.getItem("user");
  const user = JSON.parse(storedUserJSON);

  const initialData = {
    point_number: "",
    point_name: "",
    point_descp: "",
    point_city: user.city,
    point_state: user.state,
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
      const checkpointData = new FormData();

      if (isUpdateMode) {
        checkpointData.append('data', JSON.stringify(formData));
      } else if (!deleteMode) {
        checkpointData.append('data', JSON.stringify(formData));
        checkpointData.append('image', selectedFile);
        checkpointData.append('audio', selectedAudio);

        // Log FormData entries
        for (const entry of checkpointData.entries()) {
          console.log(entry[0], entry[1]);
        }
      }

      loadingToast = toast.loading("Processing...");

      if (isUpdateMode) {
        console.log(formData);
        const updateRes = await updateCheckpoint(formData._id, formData);

        if (updateRes.status === 200) {
          toast.success("Checkpoint updated successfully");
        } else {
          toast.error("Failed to update checkpoint");
        }
      } else if (deleteMode) {
        const deleteRes = await deleteCheckpoint(formData._id);

        if (deleteRes.status === 200) {
          toast.success("Checkpoint deleted successfully");
        } else {
          toast.error("Failed to delete checkpoint");
        }

        setDeleteMode(false);
        setDeleteModalVisible(false);
      } else {
        const res = await addCheckpoint(checkpointData);

        if (res.status === 202) {
          toast.error("Checkpoint already exists");
        }

        if (res.status === 200) {
          toast.success("Checkpoint added successfully");
        } else {
          toast.error("Failed to add checkpoint");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    } finally {
      toast.dismiss(loadingToast);
      // 
      setVisible(false);
      setIsUpdateMode(false);
      // 
      setDeleteModalVisible(false)
      setDeleteMode(false)
      // 
      setFormData(initialData);
      // 
      setSelectedAudio(null);
      setSelectedFile(null);
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAudioChange = (e) => {
    setSelectedAudio(e.target.files[0]);
  };

  return (
    <>
      <Toaster position="top-center" />
      {/* add / udpate form modal */}
      <Modal
        onCancel={() => setVisible(false)}
        footer={null}
        open={visible}
        style={{ maxWidth: '890px' }} // Adjust the width as needed
      >
        <form onSubmit={onSubmitHandler} encType="multipart/form-data">
          <FormCheckpoint
            onChangeHandler={onChangeHandler}
            data={formData}
            handleFileChange={handleFileChange}
            selectedFile={selectedFile}
            handleAudioChange={handleAudioChange}
            selectedAudio={selectedAudio}
            isUpdateMode={isUpdateMode}
          />
          {isUpdateMode ? (
            <UpdateButton title={"Checkpoint"} />
          ) : (
            <AddButton form_type={"Checkpoint"} />
          )}
        </form>
      </Modal>
      {/* fetch data table */}
      <CustomTable
        handleAudioChange={handleAudioChange}
        selectedAudio={selectedAudio}
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
      {/* delete modal */}
      <Modal
        onCancel={closeDeleteModal}
        footer={null}
        open={deleteModalVisible}
      >
        <div className="p-6 bg-white rounded-md">
          <h2 className="text-2xl font-bold mb-4">Delete Artist</h2>
          <form onSubmit={onSubmitHandler}>

            <div className="mb-4">
              <p className="text-lg">Do you want to delete the Chekpoint named:</p>
              <h4 className="text-xl font-semibold mt-2">{deleteModalVisible ? formData.point_name : ''}</h4>
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
