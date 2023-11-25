import React, { useState, useEffect } from "react";
import CustomTable from "../../components/Table/Table";
import { fetchProduct } from "../../services/domCRUD";
import { UpdateDeletebuttons } from "../../components/CustomButtons";
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
      name: "Images",
      selector: (row) => <StyledImage src={row.path} alt="Product" />,
      sortable: true,
      maxWidth: "100px", // Adjust the maximum width as needed
    },
    {
      name: "Product Name",
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      name: "Product Price",
      selector: (row) => row.product_price,
      sortable: true,
    },
    {
      name: "Quantity Available",
      selector: (row) => row.quantity_available,
      sortable: true,
    },
    {
      name: "Product Description",
      selector: (row) => row.product_descp,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <UpdateDeletebuttons form_type={`product ${row.product_name} `} />
      ),
    },
  ];

  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);

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

  return (
    <CustomTable
      title={"Product"}
      addform={<FormProduct />}
      columns={columns}
      records={records}
      setRecords={setRecords}
      filterRecords={filterRecords}
      setFilterRecords={setFilterRecords}
      fetchData={getProducts}
    />
  );
};
