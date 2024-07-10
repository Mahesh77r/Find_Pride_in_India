import React, { useState, useEffect } from "react";
import CustomTable from "../components/Table/Table";
import { addClue, fetchClue, updateclue, deleteClue } from "../services/domCRUD";
import { AddButton, DeleButton, UpdateButton, UpdateDeletebuttons } from "../components/CustomButtons";
import { Toaster, toast } from 'react-hot-toast'
import { Modal } from 'antd';
import { styled } from 'styled-components';
import { FormArtist, FormGame } from "../components/Forms/ManagementsForms";
import {ClueAnsData} from '../components/DemoData'
const StyledImage = styled.img`
  width: 70px;
  height: 50px;
  border-radius: 50%;
`;

export const GamePage = () => {
  const columns = [
    {
      name: "Clue Name",
      selector: (row) => row.clue_name,
      sortable: true,
    },
    {
      name: "Clue Question",
      selector: (row) => row.clue_que,
      sortable: true,
    },
    {
      name: "Clue Answer",
      selector: (row) => row.clue_ans,
      sortable: true,
    },{
        name: "Clue Option 2",
        selector: (row) => row.clue_opt_b,
        sortable: true,
      },{
        name: "Clue Option 3",
        selector: (row) => row.clue_opt_c,
        sortable: true,
      },
    {
      name: "Actions",
      cell: (row) => (
        <UpdateDeletebuttons form_type={` artist ${row.clue_name} `} onClickUpdate={() => modalOpenClose('update', row)} onClickDelete={() => openDeleteModal('delete', row)} />
      ),
    },
  ];

   const storedUserJSON = localStorage.getItem("user");
  const user = JSON.parse(storedUserJSON);

  const initialData = {
    clue_name: "",
    clue_ans: "",
    clue_opt_b:"",
    clue_opt_c:"",
    clue_que: "",
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
      const ClueData = new FormData();

      if (isUpdateMode) {
        ClueData.append('data', JSON.stringify(formData));
      } else {
        ClueData.append('data', JSON.stringify(formData));
      }

      loadingToast = toast.loading("Processing...");

      if (isUpdateMode) {
        const updateRes = await updateclue(formData._id, formData);

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
        const deleteRes = await deleteClue(formData._id);

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
        const addRes = await addClue(ClueData);
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
    //   const res = await fetchClue(storedUser.destinationName);
    //   const data = res.data.data;
    const data = ClueAnsData[0]
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

  

  return (
    <>
      <Toaster position="top-center" />
      <Modal
        onCancel={() => setVisible(false)}
        footer={null}
        open={visible}
      >
        <form onSubmit={onSubmitHandler}>
          <FormGame
            onChangeHandler={onChangeHandler}
            data={formData}
            isUpdateMode={isUpdateMode}
          />
          {isUpdateMode ? (
            <UpdateButton title={"Clue"} />
          ) : (
            <AddButton form_type={"Clue"} onClickfun={""} />
          )}
        </form>
      </Modal>
      <CustomTable
        onSubmitHandler={onSubmitHandler}
        onChangeHandler={onChangeHandler}
        setFormData={setFormData}
        // handleAudioChange={}
        handleFileChange={null}
        selectedAudio={null}
        selectedFile={null}
        setSelectedFile={null}
        data={formData}
        initialData={initialData}
        columns={columns}
        addform={<FormGame />}
        title={'Clue'}
        searchfield={'clue_name'}
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
          <h2 className="text-2xl font-bold mb-4">Delete Clue</h2>
          <form onSubmit={onSubmitHandler}>

            <div className="mb-4">
              <p className="text-lg">Do you want to delete the Clue named:</p>
              <h4 className="text-xl font-semibold mt-2">{deleteModalVisible ? formData.clue_name : ''}</h4>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-300 text-gray-800 hover:bg-gray-400 px-4 py-2 rounded-md mr-2"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
              <DeleButton title={'Clue'} />
            </div>

          </form>
        </div>
      </Modal>
    </>
  );
};