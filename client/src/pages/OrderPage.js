import React, { useState, useEffect } from "react";
import CustomTable from "../components/Table/Table";
import {
  fetchOrder,
  deleteOrder, updateShippedStatus
} from "../services/domCRUD";
import { ShippedOrderButton, CancelOrderButton, ShippedCancelOrderButtons, ViewButton } from "../components/CustomButtons";
import { Toaster, toast } from 'react-hot-toast'
import { Modal } from 'antd';
// import { styled } from 'styled-components';
import { FormEvents } from '../components/Forms/ManagementsForms'
// You'll need to create FormOrder component

// const StyledImage = styled.img`
//   width: 70px;
//   height: 50px;
//   border-radius: 50%;
// `;

export const OrderTable = () => {
  const columns = [
    // {
    //   name: 'Image',
    //   selector: (row) => <StyledImage src={row.path} alt="Product" />,
    //   sortable: true,
    //   maxWidth: '100px',
    // },
    {
      name: "Tourist Name",
      selector: (row) => row.tourist_name,
      sortable: true,
      maxWidth: '220px',

    },
    {
      name: "Product Name",
      selector: (row) => row.product_name,
      sortable: true,
      maxWidth: '220px',

    },
    {
      name: "Product Quantity",
      selector: (row) => row.product_quantity,
      sortable: true,
      maxWidth: '220px',

    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          {row.shipped_status ? (
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-green-500">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
              </svg>
              <span className="text-green-500 text-lg font-semibold">Shipped</span>
            </div>
          ) : (
            <ShippedCancelOrderButtons form_type={` order ${row.tourist_name} `} onClickShipped={() => modalOpenClose('shipped', row)} onClickCancel={() => openDeleteModal('cancle', row)} />
          )}
          <ViewButton onClickView={() => openViewModal(row)} />
        </>
      ),
    }

    ,
  ];


  const initialData = {
    _id: "",
    tourist_name: "",
    tourist_email: "",
    tourist_state: "",
    tourist_city: "",
    tourist_pincode: "",
    tourist_address: "",
    tourist_phone_main: "",
    tourist_phone_opt: "",
    order_date: "",
    product_name: "",
    product_quantity: "",
    product_price: "",
    shipped_status: ""
  };


  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [deletemsg, setDeletemsg] = useState('');

  const openDeleteModal = (formType, rowData) => {
    setDeleteMode(true);
    setDeleteModalVisible(true);
    setFormData(rowData);
  };

  const closeDeleteModal = () => {
    setDeleteMode(false);
    setDeleteModalVisible(false);
  };

  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const modalOpenClose = (formType, rowData) => {

    setVisible(true);
    setFormData(rowData);
    console.log(rowData)
    setIsUpdateMode(formType === 'shipped');
  };

  const [viewModalVisible, setViewModalVisible] = useState(false);

  const openViewModal = (rowData) => {
    setViewModalVisible(true);
    setFormData(rowData);
  };

  const closeViewModal = () => {
    setViewModalVisible(false);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let loadingToast;

    try {
      // Validate delivery date
      const today = new Date();
      const selectedDate = new Date(formData.deliveryDate);

      if (selectedDate < today) {
        // If the selected date is before today, show an error toast
        toast.error('Delivery date must be greater than or equal to today.');
        return;
      }

      // Show a loading toast
      loadingToast = toast.loading('Processing...');

      if (isUpdateMode) {
        // Log the expected date for update mode
        const shippedData = {
          delivery_date: formData.deliveryDate,
          tourist_email: formData.tourist_email
        };
        console.log("Expected Date:", formData.deliveryDate);
        console.log("Expected Date:", formData._id);
        const res = await updateShippedStatus(formData._id, shippedData);
        // Other update logic goes here
        res.status === 200 ? toast.success('Order Shipped!') : toast.error('Order is not Shipped, try agian !!!');
        // Show success toast

      } else if (deleteMode) {
        // Uncomment the following line if deletemsg is defined
        // Uncomment the following line if deletemsg is defined
        const Msg = {
          cancellation_reason: deletemsg?.deletemsg || "Default cancellation reason", // Use deletemsg if defined, otherwise use a default value
        };
        console.log(Msg);

        const res = await deleteOrder(formData._id, Msg);

        // Other delete logic goes here

        if (res.status === 200) {
          toast.success('Order Canceled successfully!');
          setTimeout(() => { window.location.reload(); }, 500);
        } else {
          toast.error('Order is not canceled, try again !!!');
          setTimeout(() => { window.location.reload(); }, 500);
        }
        
      }
    } catch (error) {
      console.error("Error:", error);
      // Show error toast
      toast.error('An error occurred. Please try again.');
    } finally {
      // Dismiss the loading toast
      toast.dismiss(loadingToast);
      setVisible(false);
      setFormData(initialData);
      setDeleteModalVisible(false);
      setDeletemsg('');
      setDeleteMode(false);
      setIsUpdateMode(false);
    }
  };




  const getOrders = async () => {
    try {
      const storedUserJSON = localStorage.getItem("user");
      const storedUser = JSON.parse(storedUserJSON);
      console.log(storedUser._id)
      const res = await fetchOrder(storedUser._id); // Assuming you have a fetchOrder function
      const data = res.data.data;
      setRecords(data);
      setFilterRecords(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // Updated onChangeHandler to handle both deliveryDate and other fields
  const onChangeHandler = (e) => {
    if (e.target.name === 'deliveryDate') {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else if (e.target.name === 'deletemsg') {
      // Handle other fields
      // For example, assuming other fields have names like tourist_name, product_name, etc.
      setDeletemsg({ ...deletemsg, [e.target.name]: e.target.value });
    }
  };



  return (
    <>
      <Toaster position="top-center" />
      {/* shipped form */}
      <Modal
        onCancel={() => setVisible(false)}
        footer={null}
        open={visible}
      >
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Set Expected Delivery Date</h2>
            <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-600">
              Delivery Date
            </label>
            <input
              type="date"
              id="deliveryDate"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={onChangeHandler}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          {/* Other form fields go here */}
          <div className="mt-4">
            <ShippedOrderButton title={"Order"} />
          </div>
        </form>


      </Modal>
      {/* table */}
      <CustomTable
        onSubmitHandler={onSubmitHandler}
        onChangeHandler={onChangeHandler}
        setFormData={setFormData}
        data={formData}
        initialData={initialData}
        columns={columns}
        addform={<FormEvents />}
        title={'Order'}
        searchfield={'tourist_name'}
        records={records}
        setRecords={setRecords}
        filterRecords={filterRecords}
        setFilterRecords={setFilterRecords}
        fetchData={getOrders}
        modalOpenClose={modalOpenClose}
      />
      {/* cancle order */}
      <Modal
        onCancel={closeDeleteModal}
        footer={null}
        open={deleteModalVisible}
      >
        <div className="p-6 bg-white rounded-md">
          <h2 className="text-2xl font-bold mb-4">Delete Artist</h2>
          <form onSubmit={onSubmitHandler}>

            <div className="mb-4">
              <p className="text-lg">Do you want to delete the order from tourist:</p>
              <h4 className="text-xl font-semibold mt-2">{deleteModalVisible ? formData.tourist_name : ''}</h4>
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="deletemsg"
                onChange={onChangeHandler}
                name="deletemsg"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Write a reason..."
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-300 text-gray-800 hover:bg-gray-400 px-4 py-2 rounded-md mr-2"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
              <CancelOrderButton title={'Artist'} />
            </div>

          </form>
        </div>
      </Modal>
      {/* view details */}
      <Modal
        onCancel={closeViewModal}
        footer={null}
        open={viewModalVisible}
      >
        <div className="p-6 bg-white rounded-md flex-col">
          <h2 className="text-2xl font-bold mb-4">View Order Details</h2>
          <form className="">
            <div className="mb-4">
              <p className="text-lg">Tourist Name:<span className="ms-2 text-xl font-semibold">{formData.tourist_name}</span></p>
            </div>
            <div className="mb-4">
              <p className="text-lg">Email:<span className="ms-2 text-xl font-semibold">{formData.tourist_email}</span></p>
            </div>
            <div className="mb-4">
              <p className="text-lg">State:<span className="ms-2 text-xl font-semibold">{formData.tourist_state}</span></p>
            </div>
            <div className="mb-4">
              <p className="text-lg">City:<span className="ms-2 text-xl font-semibold">{formData.tourist_city}</span></p>
            </div>
            <div className="mb-4">
              <p className="text-lg">Pincode:<span className="ms-2 text-xl font-semibold">{formData.tourist_pincode}</span></p>
            </div>
            <div className="mb-4">
              <p className="text-lg">Address:<span className="ms-2 text-xl font-semibold">{formData.tourist_address}</span></p>
            </div>
            <div className="mb-4">
              <p className="text-lg">Main Phone:<span className="ms-2 text-xl font-semibold">{formData.tourist_phone_main}</span></p>
            </div>
            <div className="mb-4">
              <p className="text-lg">Optional Phone:<span className="ms-2 text-xl font-semibold">{formData.tourist_phone_opt}</span></p>
            </div>
            <div className="mb-4">
              <p className="text-lg">Order Date:<span className="ms-2 text-xl font-semibold">{formData.order_date.substring(0, 10)}</span></p>
            </div>
            <div className="mb-4">
              <p className="text-lg">Product Name:<span className="ms-2 text-xl font-semibold">{formData.product_name}</span></p>
            </div>
            <div className="mb-4">
              <p className="text-lg">Product Quantity:<span className="ms-2 text-xl font-semibold">{formData.product_quantity}</span></p>
            </div>
            <div className="mb-4">
              <p className="text-lg">Product Price:<span className="ms-2 text-xl font-semibold">{formData.product_price}</span></p>
            </div>
            <button
              type="button"
              className="bg-gray-300 text-gray-800 hover:bg-gray-400 px-4 py-2 rounded-md mr-2 flex flex-col items-center"
              onClick={closeViewModal}
            >
              Cancel
            </button>
          </form>
        </div>
      </Modal>

    </>
  );
};
