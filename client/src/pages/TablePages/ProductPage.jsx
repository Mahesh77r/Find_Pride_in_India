import React, { useState, useEffect } from "react";
import CustomTable from "../../components/Table/Table";
import { addProduct, fetchProduct } from "../../services/domCRUD";
import { AddButton, UpdateButton, UpdateDeletebuttons } from "../../components/CustomButtons";
import { Toaster, toast } from 'react-hot-toast'
import { Modal } from 'antd';
import { FormProduct } from "../../components/Forms/ManagementsForms";

import { styled } from "styled-components";

const StyledImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const ProductTable = () => {
  const columns = [
    {
      name: "Image",
      selector: (row) => <StyledImage src={row.path} alt="Product" />,
      sortable: true,
      maxWidth: "120px", // Adjust the maximum width as needed
    },
    {
      name: "Product Name",
      selector: (row) => row.product_name,
      sortable: true,
      maxWidth: "200px",
    },
    {
      name: "Product Price",
      selector: (row) => row.product_price,
      sortable: true,
      maxWidth: "170px",
    },
    {
      name: "Quantity Available",
      selector: (row) => row.quantity_available,
      sortable: true,
      maxWidth: "210px",
    },
    {
      name: "Product Description",
      selector: (row) => row.product_descp,
      sortable: true,
      maxWidth: "270px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <UpdateDeletebuttons form_type={`product ${row.product_name} `} onClick={() => modalOpenClose('update', row)} />
      ),
    },
  ];
  const [selectedFile, setSelectedFile] = useState(null);
  const storedUserJSON = localStorage.getItem("user");
  const user = JSON.parse(storedUserJSON);

  const initialData = {
    product_name: "",
    product_price: "",
    quantity_available: "",
    category: "",
    state: user.state,
    city: user.city,
    product_descp: "",
    destination_name: user.destinationName,
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
          const response = await addProduct(FacilityData);
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
  const getProducts = async () => {
    try {
      const storedUserJSON = localStorage.getItem("user");
      const storedUser = JSON.parse(storedUserJSON);

      const res = await fetchProduct(storedUser.destinationName);
      const data = res.data.data;
      setRecords(data);
      setFilterRecords(data);
    } catch (error) {
      console.error("Error fetching checkpoints:", error);
    }
  };

  useEffect(() => {
    getProducts();
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
          <FormProduct
            selectedFile={selectedFile}
            handleFileChange={handleFileChange}
            onChangeHandler={onChangeHandler}
            data={formData}
            isUpdateMode={isUpdateMode}
          />
          {isUpdateMode ? (
            <UpdateButton title={"Product"} />
          ) : (
            <AddButton form_type={"Product"} />
          )}
        </form>
      </Modal>
      <CustomTable
        setSelectedFile={setSelectedFile}
        onSubmitHandler={onSubmitHandler}
        handleFileChange={handleFileChange}
        onChangeHandler={onChangeHandler}
        setFormData={setFormData}
        data={formData}
        selectedFile={selectedFile}
        initialData={initialData}
        columns={columns}
        addform={<FormProduct />}
        title={'Product'}
        searchfield={'product_name'}
        records={records}
        setRecords={setRecords}
        filterRecords={filterRecords}
        setFilterRecords={setFilterRecords}
        fetchData={getProducts}
        modalOpenClose={modalOpenClose}
      />
    </>
  );
};
