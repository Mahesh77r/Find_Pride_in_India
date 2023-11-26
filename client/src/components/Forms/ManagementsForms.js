import React, { useState } from "react";
// import { UpdateClose } from '../Modal/Modal';

import { imgDB } from "../../services/FirebaseConfig";
import {
    getDownloadURL,
    ref as storageRef,
    uploadBytes,
} from "firebase/storage";
import { addEvent, addFacility, addGuide, addProduct } from "../../services/domCRUD";
import { Alert } from "../alert";

export const FormTouristGuide = ({
    img_url,
    guide_name,
    fees,
    contact_detail,
}) => {
    const [showalert, setShowalert] = useState(false);
    const handleCloseAlert = () => {
        setShowalert(false);
    };

    const [selectedFile, setSelectedFile] = useState(null);
    const storedUserJSON = localStorage.getItem("user");
    const user = JSON.parse(storedUserJSON);
    const [data, setData] = useState({
        guide_name: "",
        guide_price: "",
        contact: "",
        state: user.state,
        city: user.city,
        dest_name: user.destinationName,
    });

    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // Function to handle file selection
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (selectedFile) {
            try {
                // Create a reference to the location where you want to store the file in Firebase Storage.
                const imgRef = storageRef(imgDB, `guides/${selectedFile.name}`);

                // Upload the selected file to the specified location.
                const uploadData = await uploadBytes(imgRef, selectedFile);
                // Retrieve the download URL from the imgRef reference
                const downloadURL = await getDownloadURL(imgRef);

                // Now you can proceed to add the product with the image path.
                const GuideData = {
                    ...data,
                    imagePath: downloadURL,
                };

                // Log the download URL
                console.log("Download URL:", downloadURL);
                console.log(uploadData, "Uploaded successfully.");
                console.log(GuideData)
                const response = await addGuide(GuideData);
            } catch (error) {
                console.error("Firebase Storage Error:", error);
            }
        } else {
            setShowalert(true);
            console.error("No file selected");
        }
    };



    return (
        <>
            <form onSubmit={onSubmitHandler}>
                {/* <!-- product Image Input --> */}
                <div className="my-3 flex justify-center">
                    {/* Hidden file input */}
                    <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        onChange={handleFileChange}
                    />

                    {/* Image that acts as a file input */}
                    <label
                        htmlFor="fileInput"
                        className="cursor-pointer bg-gray-300 p-4 rounded-md hover:bg-gray-400"
                    >
                        {selectedFile ? (
                            <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="Selected"
                                className="w-100 h-50 object-cover"
                            />
                        ) : (
                            <img
                                src={img_url}
                                alt="Selected"
                                className="w-100 h-50 object-cover"
                            />
                        )}
                    </label>
                </div>
                <div className="mt-4">

                    <label
                        htmlFor="guideName"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Guide Name
                    </label>
                    <input
                        type="text"
                        id="guide_name"
                        onChange={onChangeHandler}
                        value={guide_name}
                        name="guide_name"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <label
                        htmlFor="fees"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Fees
                    </label>
                    <input
                        type="text"
                        id="guide_price"
                        onChange={onChangeHandler}
                        value={fees}
                        name="guide_price"
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mt-4">
                    <label
                        htmlFor="contactDetail"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Contact Detail
                    </label>
                    <input
                        type="text"
                        id="contact"
                        value={contact_detail}
                        name="contact"
                        onChange={onChangeHandler}

                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    />
                </div>

                {/*button  */}
                <div className="mt-4 ">
                    <div className="ms-2">
                        <button className="bg-purple-500 hover:bg-purple-600 flex p-2  rounded-xl text-white relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                            </svg>
                            <span className="ms-1">ADD </span>
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export const FormEvents = ({
    img_url,
    event_name,
    event_date,
    event_descp,
}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const storedUserJSON = localStorage.getItem("user");
    const user = JSON.parse(storedUserJSON);
    const [data, setData] = useState({
        event_name: "",
        event_date: "",
        event_des: "",
        state: user.state,
        city: user.city,
        dest_name: user.destinationName,
    });

    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // Function to handle file selection
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (selectedFile) {
            try {
                // Create a reference to the location where you want to store the file in Firebase Storage.
                const imgRef = storageRef(imgDB, `facility/${selectedFile.name}`);

                // Upload the selected file to the specified location.
                const uploadData = await uploadBytes(imgRef, selectedFile);
                // Retrieve the download URL from the imgRef reference
                const downloadURL = await getDownloadURL(imgRef);

                // Now you can proceed to add the product with the image path.
                const FacilityData = {
                    ...data,
                    imagePath: downloadURL,
                };

                // Log the download URL
                console.log("Download URL:", downloadURL);
                // console.log(uploadData, "Uploaded successfully.");
                console.log(FacilityData)
                const response = await addEvent(FacilityData);
            } catch (error) {
                console.error("Firebase Storage Error:", error);
            }
        } else {
            console.error("No file selected");
        }
    };



    return (
        <>
            {/* <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"> */}
            <form onSubmit={onSubmitHandler}>
           {/* <!-- Event Image Input --> */}
           <div className="my-3 flex justify-center">
                    {/* Hidden file input */}
                    <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        onChange={handleFileChange}
                    />

                    {/* Image that acts as a file input */}
                    <label
                        htmlFor="fileInput"
                        className="cursor-pointer bg-gray-300 p-4 rounded-md hover:bg-gray-400"
                    >
                        {selectedFile ? (
                            <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="Selected"
                                className="w-100 h-50 object-cover"
                            />
                        ) : (
                            <img
                                src={img_url}
                                alt="Selected"
                                className="w-100 h-50 object-cover"
                            />
                        )}
                    </label>
                </div>

            {/* <!-- Event Name Input --> */}
            <div className="mb-4">
                <label
                    htmlFor="event-name"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Name of Event
                </label>
                <input
                    type="text"
                    id="event-name"
                    value={event_name}
                    name="event_name"
                    onChange={onChangeHandler}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Enter the event name"
                    required
                />
            </div>

            {/* <!-- Event Date Input --> */}
            <div className="mb-4">
                <label
                    htmlFor="event-date"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Date of Event
                </label>
                <input
                    type="date"
                    id="event_date"
                    value={event_date}
                    onChange={onChangeHandler}

                    name="event-date"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    required
                />
            </div>

            {/* <!-- Event Description Input --> */}
            <div className="mb-4">
                <label
                    htmlFor="event-description"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Description of Event
                </label>
                <textarea
                    id="event-description"
                    onChange={onChangeHandler}
                    value={event_descp}
                    name="event_des"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    rows="4"
                    placeholder="Enter a description htmlFor the event"
                    required
                ></textarea>
            </div>
            {/*button  */}
            <div className="mt-4 ">
                    <div className="ms-2">
                        <button className="bg-purple-500 hover:bg-purple-600 flex p-2  rounded-xl text-white relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                            </svg>
                            <span className="ms-1">ADD </span>
                        </button>
                    </div>
                </div>
            </form>
            {/* </div> */}
        </>
    );
};

export const FormProduct = ({
    img_url,
    prod_name,
    prod_price,
    prod_quant,
    prod_desp,
}) => {
    // alert show and hide
    const [showalert, setShowalert] = useState(false);
    const handleCloseAlert = () => {
        setShowalert(false);
    };

    const [selectedFile, setSelectedFile] = useState(null);
    const storedUserJSON = localStorage.getItem("user");
    const user = JSON.parse(storedUserJSON);

    console.log(user);
    console.log(user.state, user.city, user.destinationName);
    const [data, setData] = useState({
        product_name: "",
        product_price: "",
        quantity_available: "",
        category: "",
        state: user.state,
        city: user.city,
        product_descp: "",
        destination_name: user.destinationName,
    });

    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // Function to handle file selection
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (selectedFile) {
            try {
                // Create a reference to the location where you want to store the file in Firebase Storage.
                const imgRef = storageRef(imgDB, `products/${selectedFile.name}`);

                // Upload the selected file to the specified location.
                const uploadData = await uploadBytes(imgRef, selectedFile);
                // Retrieve the download URL from the imgRef reference
                const downloadURL = await getDownloadURL(imgRef);

                // Now you can proceed to add the product with the image path.
                const productData = {
                    ...data,
                    imagePath: downloadURL,
                };

                // Log the download URL
                console.log("Download URL:", downloadURL);
                console.log(uploadData, "Uploaded successfully.");

                const response = await addProduct(productData);
            } catch (error) {
                console.error("Firebase Storage Error:", error);
            }
        } else {
            setShowalert(true);
            console.error("No file selected");
        }
    };

    return (
        <>
            <Alert
                bgcolor={"blue-300"}
                bool={showalert}
                desc={"Complete all the fields"}
                onClose={handleCloseAlert}
                title={"Fill Fields"}
            />
            <form onSubmit={onSubmitHandler}>
                {/* <!-- product Image Input --> */}
                <div className="my-3 flex justify-center">
                    {/* Hidden file input */}
                    <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        onChange={handleFileChange}
                    />

                    {/* Image that acts as a file input */}
                    <label
                        htmlFor="fileInput"
                        className="cursor-pointer bg-gray-300 p-4 rounded-md hover:bg-gray-400"
                    >
                        {selectedFile ? (
                            <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="Selected"
                                className="w-100 h-50 object-cover"
                            />
                        ) : (
                            <img
                                src={img_url}
                                alt="Selected"
                                className="w-100 h-50 object-cover"
                            />
                        )}
                    </label>
                </div>
                {/* <!-- product Name Input --> */}
                <div className="mb-4">
                    <label
                        htmlFor="prod_name"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Name of Product
                    </label>
                    <input
                        type="text"
                        id="prod_name"
                        onChange={onChangeHandler}
                        value={prod_name}
                        name="product_name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter the product name"
                        required
                    />
                </div>
                {/* product catergory dropdown */}
                <div className="mb-4">
                    <label
                        htmlFor="prod_category"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Category of Product
                    </label>
                    <select
                        id="prod_category"
                        onChange={onChangeHandler}
                        name="category"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    >
                        <option value="">Select a category</option>
                        <option value="clothes">Clothes</option>
                        <option value="food">Food</option>
                        <option value="books">Books</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* <!-- product Price Input --> */}
                <div className="mb-4">
                    <label
                        htmlFor="prod_price"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Price of Product
                    </label>
                    <input
                        type="number"
                        id="prod_price"
                        onChange={onChangeHandler}
                        value={prod_price}
                        name="product_price"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        required
                        inputMode="numeric"
                    />
                </div>

                {/* <!-- product Quantity Input --> */}
                <div className="mb-4">
                    <label
                        htmlFor="prod_quantity"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Quantity of Product
                    </label>
                    <input
                        type="number"
                        id="prod_quantity"
                        onChange={onChangeHandler}
                        value={prod_quant}
                        name="quantity_available"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        required
                        inputMode="numeric"
                    />
                </div>

                {/* <!-- product Description Input --> */}
                <div className="mb-4">
                    <label
                        htmlFor="prod_description"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Description of Product
                    </label>
                    <textarea
                        id="prod_description"
                        onChange={onChangeHandler}
                        value={prod_desp}
                        name="product_descp"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        rows="4"
                        placeholder="Enter a description htmlFor the product"
                        required
                    ></textarea>
                </div>

                {/* hidden fields starts */}
                {/* <input type='text' onChange={onChangeHandler} name='admin_name' value={user.admin_name} hidden /> */}

                {/* hidden fields ends */}

                {/*button  */}
                <div className="mt-4">
                    <div className="ms-2">
                        <button className="bg-purple-500 hover:bg-purple-600 flex p-2 rounded-xl text-white relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                            </svg>
                            <span className="ms-1">Update</span>
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export const FormFacility = ({
    img_url,
    fact_name,
    fact_contact,
    fact_loca,
}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const storedUserJSON = localStorage.getItem("user");
    const user = JSON.parse(storedUserJSON);
    const [data, setData] = useState({
        facility_name: "",
        facility_number: "",
        facility_location: "",
        state: user.state,
        city: user.city,
        dest_name: user.destinationName,
    });

    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // Function to handle file selection
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (selectedFile) {
            try {
                // Create a reference to the location where you want to store the file in Firebase Storage.
                const imgRef = storageRef(imgDB, `facility/${selectedFile.name}`);

                // Upload the selected file to the specified location.
                const uploadData = await uploadBytes(imgRef, selectedFile);
                // Retrieve the download URL from the imgRef reference
                const downloadURL = await getDownloadURL(imgRef);

                // Now you can proceed to add the product with the image path.
                const FacilityData = {
                    ...data,
                    imagePath: downloadURL,
                };

                // Log the download URL
                console.log("Download URL:", downloadURL);
                // console.log(uploadData, "Uploaded successfully.");
                console.log(FacilityData)
                const response = await addFacility(FacilityData);
            } catch (error) {
                console.error("Firebase Storage Error:", error);
            }
        } else {
            console.error("No file selected");
        }
    };



    return (
        <>
            {/* <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"> */}
            <form onSubmit={onSubmitHandler}>
                {/* <!-- product Image Input --> */}
                <div className="my-3 flex justify-center">
                    {/* Hidden file input */}
                    <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        onChange={handleFileChange}
                    />

                    {/* Image that acts as a file input */}
                    <label
                        htmlFor="fileInput"
                        className="cursor-pointer bg-gray-300 p-4 rounded-md hover:bg-gray-400"
                    >
                        {selectedFile ? (
                            <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="Selected"
                                className="w-100 h-50 object-cover"
                            />
                        ) : (
                            <img
                                src={img_url}
                                alt="Selected"
                                className="w-100 h-50 object-cover"
                            />
                        )}
                    </label>
                </div>


                {/* <!-- facility Name Input --> */}
                <div className="mb-4">
                    <label
                        htmlFor="facility-name"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Name of facility
                    </label>
                    <input
                        type="text"
                        id="facility-name"
                        value={fact_name}
                        onChange={onChangeHandler}
                        name="facility_name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter the facility name"
                        required
                    />
                </div>

                {/* <!-- facility contact Input --> */}
                <div className="mb-4">
                    <label
                        htmlFor="facility-contact"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Contact of facility
                    </label>
                    <input
                        type="tel"
                        id="facility-contact"
                        onChange={onChangeHandler}
                        value={fact_contact}
                        name="facility_number"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                {/* <!-- facility Description Input --> */}
                <div className="mb-4">
                    <label
                        htmlFor="facility-location"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Location of facility
                    </label>
                    <input
                        type="url"
                        id="facility-location"
                        onChange={onChangeHandler}
                        value={fact_loca}
                        name="facility_location"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                    <p className="text-sm text-red-400">Paste the URL</p>
                </div>
                {/*button  */}
                <div className="mt-4 ">
                    <div className="ms-2">
                        <button className="bg-purple-500 hover:bg-purple-600 flex p-2  rounded-xl text-white relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                            </svg>
                            <span className="ms-1">ADD </span>
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export const FormPlaceSummary = ({
    destination_name,
    admin_name,
    state,
    city,
    address,
    mobile_no,
    email,
    pass,
    image_url,
}) => {
    return (
        <>
            <ImageInput image_url={image_url} />
            <div className="flex">
                {/* <!-- destination name Input --> */}
                <div className="mb-4 w-50">
                    <label
                        htmlFor="destination-name"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Name of destination
                    </label>
                    <input
                        type="text"
                        id="destination-name"
                        value={destination_name}
                        name="destination-name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter the destination name"
                        required
                    />
                </div>

                {/* <!-- admin name Input --> */}
                <div className="mb-4 ms-3 w-50">
                    <label
                        htmlFor="admin-name"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Name of Admin
                    </label>
                    <input
                        type="text"
                        id="admin-name"
                        value={admin_name}
                        name="admin-name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter the Admin name"
                        required
                    />
                </div>
            </div>

            <div className="flex">
                {/* <!-- state name Input --> */}
                <div className="mb-4 w-50">
                    <label
                        htmlFor="state-name"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        State
                    </label>
                    <input
                        type="text"
                        id="state-name"
                        value={state}
                        name="state-name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter State"
                        required
                    />
                </div>

                {/* <!-- city name Input --> */}
                <div className="mb-4 ms-3 w-50">
                    <label
                        htmlFor="city-name"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        City
                    </label>
                    <input
                        type="text"
                        id="city-name"
                        value={city}
                        name="state-name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter City"
                        required
                    />
                </div>
            </div>

            {/* <!-- address Input --> */}
            <div className="mb-4">
                <label
                    htmlFor="address"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Address
                </label>
                <input
                    type="text"
                    id="address"
                    value={address}
                    name="address"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Enter Address"
                    required
                />
            </div>
            <div className="flex">
                {/* <!-- mobile number Input --> */}
                <div className="mb-4 w-50">
                    <label
                        htmlFor="mobile"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Mobile_no
                    </label>
                    <input
                        type="text"
                        id="mobile"
                        value={mobile_no}
                        name="mobile"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter mobile number"
                        required
                    />
                </div>

                {/* <!-- email Input --> */}
                <div className="mb-4 ms-3 w-50">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        name="state-name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Enter Email"
                        required
                    />
                </div>
            </div>

            {/* <!-- pass Input --> */}
            <div className="mb-4">
                <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Password
                </label>
                <input
                    type="text"
                    id="password"
                    value={pass}
                    name="password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Enter password"
                    required
                />
            </div>

            {/* <!-- image Input --> */}
        </>
    );
};

// export const AddCheckpoint = ({
//     img_url,
//     point_name,
//     point_number,
//     point_descp,
//     point_city,
//     point_state,
//     dest_name,
//     dest_id
// }) => {
//     const [showalert, setShowalert] = useState(false);
//     const handleCloseAlert = () => {
//         setShowalert(false);
//     };

//     const [selectedFile, setSelectedFile] = useState(null);
//     const storedUserJSON = localStorage.getItem("user");
//     const user = JSON.parse(storedUserJSON);
//     const [data, setData] = useState({
//         point_name: "",
//         point_number: "",
//         point_descp: "",
//         point_city: user.city,
//         point_state: user.state,
//         dest_name: user.destinationName,
//         dest_id: user._id,

//     });

//     const onChangeHandler = (e) => {
//         setData({ ...data, [e.target.name]: e.target.value });
//     };

//     // Function to handle file selection
//     const handleFileChange = (e) => {
//         setSelectedFile(e.target.files[0]);
//     };

//     const onSubmitHandler = async (e) => {
//         e.preventDefault();
//         if (selectedFile) {
//             try {
                
//                 const response = await addGuide(GuideData);
//             } catch (error) {
//                 console.error("Firebase Storage Error:", error);
//             }
//         } else {
//             setShowalert(true);
//             console.error("No file selected");
//         }
//     };



//     return (
//         <>
//             <form onSubmit={onSubmitHandler}>
//                 {/* <!-- checkpoint Image Input --> */}
//                 <div className="my-3 flex justify-center">
//                     {/* Hidden file input */}
//                     <input
//                         type="file"
//                         id="fileInput"
//                         className="hidden"
//                         onChange={handleFileChange}
//                     />

//                     {/* Image that acts as a file input */}
//                     <label
//                         htmlFor="fileInput"
//                         className="cursor-pointer bg-gray-300 p-4 rounded-md hover:bg-gray-400"
//                     >
//                         {selectedFile ? (
//                             <img
//                                 src={URL.createObjectURL(selectedFile)}
//                                 alt="Selected"
//                                 className="w-100 h-50 object-cover"
//                             />
//                         ) : (
//                             <img
//                                 src={img_url}
//                                 alt="Selected"
//                                 className="w-100 h-50 object-cover"
//                             />
//                         )}
//                     </label>
//                 </div>
//                 <div className="mt-4">

//                     <label
//                         htmlFor="checkpointName"
//                         className="block text-sm font-medium text-gray-700"
//                     >
//                         Checkpoint Name
//                     </label>
//                     <input
//                         type="text"
//                         id="checkpoint_name"
//                         onChange={onChangeHandler}
//                         value={point_name}
//                         name="checkpoint_name"
//                         className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//                     />
//                 </div>

//                 <div className="mt-4">
//                     <label
//                         htmlFor="number"
//                         className="block text-sm font-medium text-gray-700"
//                     >
//                         Checkpoint Number
//                     </label>
//                     <input
//                         type="text"
//                         id="checkpoint_number"
//                         onChange={onChangeHandler}
//                         value={point_number}
//                         name="checkpoint_number"
//                         className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//                     />
//                 </div>

//                 <div className="mt-4">
//                     <label
//                         htmlFor="point_descp"
//                         className="block text-sm font-medium text-gray-700"
//                     >
//                         Checkpoint Description
//                     </label>
//                     <input
//                         type="text"
//                         id="point_descp"
//                         value={point_descp}
//                         name="point_descp"
//                         onChange={onChangeHandler}

//                         className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//                     />
//                 </div>

//                 <div className="mt-4">
//                     <label
//                         htmlFor="city"
//                         className="block text-sm font-medium text-gray-700"
//                     >
//                        City
//                     </label>
//                     <input
//                         type="text"
//                         id="city"
//                         value={point_city}
//                         name="city"
//                         onChange={onChangeHandler}

//                         className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//                     />
//                 </div>

//                 <div className="mt-4">
//                     <label
//                         htmlFor="state"
//                         className="block text-sm font-medium text-gray-700"
//                     > State
//                     </label>
//                     <input
//                         type="text"
//                         id="state"
//                         value={point_state}
//                         name="state"
//                         onChange={onChangeHandler}

//                         className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//                     />
//                 </div>

//                 <div className="mt-4">
//                     <label
//                         htmlFor="dest_name"
//                         className="block text-sm font-medium text-gray-700"
//                     >
//                         Destination Name
//                     </label>
//                     <input
//                         type="text"
//                         id="dest_name"
//                         value={dest_name}
//                         name="dest_name"
//                         onChange={onChangeHandler}

//                         className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//                     />
//                 </div>

//                 <div className="mt-4">
//                     <label
//                         htmlFor="dest_id"
//                         className="block text-sm font-medium text-gray-700"
//                     >
//                         Destination ID
//                     </label>
//                     <input
//                         type="text"
//                         id="dest_id"
//                         value={dest_id}
//                         name="dest_id"
//                         onChange={onChangeHandler}

//                         className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//                     />
//                 </div>

//                 {/*button  */}
//                 <div className="mt-4 ">
//                     <div className="ms-2">
//                         <button className="bg-purple-500 hover:bg-purple-600 flex p-2  rounded-xl text-white relative">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 strokeWidth="1.5"
//                                 stroke="currentColor"
//                                 className="w-6 h-6"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
//                                 />
//                             </svg>
//                             <span className="ms-1">ADD </span>
//                         </button>
//                     </div>
//                 </div>
//             </form>
//         </>
//     );
// };



const ImageInput = ({ image_url }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };
    return (
        <>
            <div className="my-3 flex justify-center">
                {/* Hidden file input */}
                <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    onChange={handleFileChange}
                />

                {/* Image that acts as a file input */}
                <label
                    htmlFor="fileInput"
                    className="cursor-pointer bg-gray-300 p-4 rounded-md hover:bg-gray-400"
                >
                    {selectedFile ? (
                        <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Selected"
                            className="w-100 h-50 object-cover"
                        />
                    ) : (
                        <img
                            src={image_url}
                            alt="Selected"
                            className="w-100 h-50 object-cover"
                        />
                    )}
                </label>

                {selectedFile && (
                    <p className="my-2">Selected file: {selectedFile.name}</p>
                )}
            </div>
        </>
    );
};
