import React, { useState, useEffect } from "react";
import CustomTable from "../../components/Table/Table";
import { addEvent, deleteEvents, fetchEvents, updateEvents } from "../../services/domCRUD";
import { AddButton, UpdateButton, DeleButton, UpdateDeletebuttons } from "../../components/CustomButtons";
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
        <UpdateDeletebuttons form_type={` event ${row.event_name} `} onClickUpdate={() => modalOpenClose('update', row)} onClickDelete={() => openDeleteModal('delete', row)} />
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
      const eventData = new FormData();

      if (isUpdateMode) {
        eventData.append('data', JSON.stringify(formData));
      } else {
        eventData.append('data', JSON.stringify(formData));
        eventData.append('image', selectedFile);
      }

      loadingToast = toast.loading("Processing...");

      if (isUpdateMode) {
        const updateRes = await updateEvents(formData._id, formData);

        if (updateRes.status === 200) {
          toast.success("Event updated successfully");
          // Refresh the page with a delay
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          toast.error("Failed to update event");
        }
      }
      else if (deleteMode) {
        const deleteRes = await deleteEvents(formData._id);

        if (deleteRes.status === 200) {
          toast.success("Event deleted successfully");
          // Refresh the page with a delay
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          toast.error("Failed to delete event");
        }

        setDeleteMode(false);
        setDeleteModalVisible(false);
      }
      
      else {
        const addRes = await addEvent(eventData);
        if (addRes.status === 202) {
          toast.error("Event already exists");
        }

        if (addRes.status === 200) {
          toast.success("Event added successfully");
          toast.dismiss(loadingToast);
          // Refresh the page with a delay
          setTimeout(() => {
            window.location.reload();
          }, 1.2*1000);
        } else {
          toast.error("Failed to add event");
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
  const getEvents = async () => {
    try {
      const storedUserJSON = localStorage.getItem("user");
      const storedUser = JSON.parse(storedUserJSON);
      const res = await fetchEvents(storedUser.destinationName);
      const data = res.data.data;
      console.log(data)
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
      <Modal
        onCancel={closeDeleteModal}
        footer={null}
        open={deleteModalVisible}
      >
        <div className="p-6 bg-white rounded-md">
          <h2 className="text-2xl font-bold mb-4">Delete Event</h2>
          <form onSubmit={onSubmitHandler}>

            <div className="mb-4">
              <p className="text-lg">Do you want to delete the Event named:</p>
              <h4 className="text-xl font-semibold mt-2">{deleteModalVisible ? formData.event_name : ''}</h4>
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
