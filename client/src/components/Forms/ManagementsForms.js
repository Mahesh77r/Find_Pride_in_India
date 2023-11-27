import React, { useState } from "react";

export const FormTouristGuide = ({ onChangeHandler, data, handleFileChange, selectedFile, isUpdateMode }) => {
    console.log(data)

    return (
        <>
            <h1 className="text-xl font-bold mb-3 text-center">
                Do you want to {isUpdateMode ? "update" : "add"} Guide?
            </h1>

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
                            className="w-100 h-50 object-cover" // This style will be overridden
                            style={{ width: '200px', height: '10px', objectFit: 'cover' }}
                        />
                    ) : (
                        data && data.path ? (
                            <img
                                src={data.path}
                                alt="Selected"
                                className="w-100 h-50 object-cover" // This style will be overridden
                                style={{ width: '400px', height: '250px', objectFit: 'cover' }}
                            />
                        ) : (
                            <div style={{ width: '200px', height: '100px', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                No Image Selected
                            </div>
                        )
                    )}
                </label>

            </div>
            {/*  */}
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
                    value={data ? data.guide_name : ""}
                    name="guide_name"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
            </div>
            {/*  */}
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
                    value={data ? data.guide_price : ""}
                    name="guide_price"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
            </div>
            {/*  */}
            <div className="mt-4 mb-2">
                <label
                    htmlFor="contactDetail"
                    className="block text-sm font-medium text-gray-700"
                >
                    Contact Detail
                </label>
                <input
                    type="text"
                    id="contact"
                    value={data ? data.contact : ""}
                    name="contact"
                    onChange={onChangeHandler}

                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
            </div>

        </>
    );
};

export const FormEvents = ({ onChangeHandler, data, handleFileChange, selectedFile, isUpdateMode }) => {
    console.log(data)

    return (
        <>
            {/* <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"> */}
            <h1 className="text-xl font-bold mb-3 text-center">
                Do you want to {isUpdateMode ? "update" : "add"} Event?
            </h1>
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
                            className="w-100 h-50 object-cover" // This style will be overridden
                            style={{ width: '200px', height: '10px', objectFit: 'cover' }}
                        />
                    ) : (
                        data && data.path ? (
                            <img
                                src={data.path}
                                alt="Selected"
                                className="w-100 h-50 object-cover" // This style will be overridden
                                style={{ width: '400px', height: '250px', objectFit: 'cover' }}
                            />
                        ) : (
                            <div style={{ width: '200px', height: '100px', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                No Image Selected
                            </div>
                        )
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
                    value={data ? data.event_name : ""}
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
                    value={data ? data.event_date.substring(0, 10) : ""}
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
                    value={data ? data.event_des : ""}
                    name="event_des"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    rows="4"
                    placeholder="Enter a description htmlFor the event"
                    required
                ></textarea>
            </div>


            {/* </div> */}
        </>
    );
};

export const FormProduct = ({ onChangeHandler, data, handleFileChange, selectedFile, isUpdateMode }) => {

    return (
        <>
        <h1 className="text-xl font-bold mb-3 text-center">
                Do you want to {isUpdateMode ? "update" : "add"} Prodcut?
            </h1>
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
                            className="w-100 h-50 object-cover" // This style will be overridden
                            style={{ width: '200px', height: '10px', objectFit: 'cover' }}
                        />
                    ) : (
                        data && data.path ? (
                            <img
                                src={data.path}
                                alt="Selected"
                                className="w-100 h-50 object-cover" // This style will be overridden
                                style={{ width: '400px', height: '250px', objectFit: 'cover' }}
                            />
                        ) : (
                            <div style={{ width: '200px', height: '100px', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                No Image Selected
                            </div>
                        )
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
                    value={data ? data.product_name : ""}
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
                    value={data ? data.product_category : ""}
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
                    value={data ? data.product_price : ""}
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
                    value={data ? data.quantity_available : ""}
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
                    value={data ? data.product_descp : ""}
                    name="product_descp"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    rows="4"
                    placeholder="Enter a description htmlFor the product"
                    required
                ></textarea>
            </div>


        </>
    );
};

export const FormFacility = ({ onChangeHandler, data, handleFileChange, selectedFile, isUpdateMode }) => {
    return (
        <>
        <h1 className="text-xl font-bold mb-3 text-center">
                Do you want to {isUpdateMode ? "update" : "add"} Facility?
            </h1>
            <div className="my-3 flex justify-center">
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
                            className="w-100 h-50 object-cover" // This style will be overridden
                            style={{ width: '200px', height: '10px', objectFit: 'cover' }}
                        />
                    ) : (
                        data && data.path ? (
                            <img
                                src={data.path}
                                alt="Selected"
                                className="w-100 h-50 object-cover" // This style will be overridden
                                style={{ width: '400px', height: '250px', objectFit: 'cover' }}
                            />
                        ) : (
                            <div style={{ width: '200px', height: '100px', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                No Image Selected
                            </div>
                        )
                    )}
                </label>
            </div>

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
                    value={data ? data.facility_name : ""}
                    onChange={onChangeHandler}
                    name="facility_name"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Enter the facility name"
                    required
                />
            </div>

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
                    value={data ? data.facility_number : ""}
                    name="facility_number"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    required
                />
            </div>

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
                    value={data ? data.facility_location : ""}
                    name="facility_location"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    required
                />
                <p className="text-sm text-red-400">Paste the URL</p>
            </div>
        </>
    );
};

export const FormCheckpoint = ({ onChangeHandler, data, handleFileChange, selectedFile, isUpdateMode }) => {

    return (
        <>
        <h1 className="text-xl font-bold mb-3 text-center">
                Do you want to {isUpdateMode ? "update" : "add"} Checkpoint?
            </h1>
            {/* <!-- checkpoint Image Input --> */}
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
                            className="w-100 h-50 object-cover" // This style will be overridden
                            style={{ width: '200px', height: '10px', objectFit: 'cover' }}
                        />
                    ) : (
                        data && data.path ? (
                            <img
                                src={data.path}
                                alt="Selected"
                                className="w-100 h-50 object-cover" // This style will be overridden
                                style={{ width: '400px', height: '250px', objectFit: 'cover' }}
                            />
                        ) : (
                            <div style={{ width: '200px', height: '100px', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                No Image Selected
                            </div>
                        )
                    )}
                </label>
            </div>

            <div className="mt-4">
                <label
                    htmlFor="number"
                    className="block text-sm font-medium text-gray-700"
                >
                    Checkpoint Number
                </label>
                <input
                    type="text"
                    id="checkpoint_number"
                    onChange={onChangeHandler}
                    value={data ? data.point_number : ""}
                    name="checkpoint_number"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
            </div>

            <div className="mt-4">

                <label
                    htmlFor="checkpointName"
                    className="block text-sm font-medium text-gray-700"
                >
                    Checkpoint Name
                </label>
                <input
                    type="text"
                    id="checkpoint_name"
                    onChange={onChangeHandler}
                    value={data ? data.point_name : ""}
                    name="checkpoint_name"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
            </div>

            <div className="mt-4 mb-2">
                <label
                    htmlFor="point_descp"
                    className="block text-sm font-medium text-gray-700"
                >
                    Checkpoint Description
                </label>
                <input
                    type="text"
                    id="point_descp"
                    value={data ? data.point_descp : ""}
                    name="point_descp"
                    onChange={onChangeHandler}

                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
            </div>

        </>
    );
};

export const FormArtist = ({ onChangeHandler, data, handleFileChange, selectedFile,isUpdateMode }) => {
    return (
        <>
        <h1 className="text-xl font-bold mb-3 text-center">
                Do you want to {isUpdateMode ? "update" : "add"} Artist?
            </h1>
            {/* Image Input */}
            <div className="my-3 flex justify-center">
                {/* Hidden file input */}
                <input
                    type="file"
                    id="fileInput"
                    required
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
                            style={{ width: '200px', height: '100px', objectFit: 'cover' }}
                        />
                    ) : (
                        data && data.path ? (
                            <img
                                src={data.path}
                                alt="Selected"
                                className="w-100 h-50 object-cover"
                                style={{ width: '400px', height: '250px', objectFit: 'cover' }}
                            />
                        ) : (
                            <div style={{ width: '200px', height: '100px', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                No Image Selected
                            </div>
                        )
                    )}
                </label>
            </div>

            {/* Artist Name Input */}
            <div className="mt-4">
                <label
                    htmlFor="artistName"
                    className="block text-sm font-medium text-gray-700"
                >
                    Artist Name
                </label>
                <input
                    type="text"
                    id="artist_name"
                    onChange={onChangeHandler}
                    value={data ? data.artist_name : ""}
                    name="artist_name"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    required
                />
            </div>

            {/* Artist Contact Input */}
            <div className="mt-4">
                <label
                    htmlFor="artistContact"
                    className="block text-sm font-medium text-gray-700"
                >
                    Artist Contact
                </label>
                <input
                    type="text"
                    id="artist_contact"
                    onChange={onChangeHandler}
                    value={data ? data.artist_contact : ""}
                    name="artist_contact"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    required
                />
            </div>

            {/* Artist Address Input */}
            <div className="mt-4 mb-2">
                <label
                    htmlFor="artistAddress"
                    className="block text-sm font-medium text-gray-700"
                >
                    Artist Address
                </label>
                <input
                    type="text"
                    id="artist_address"
                    value={data ? data.artist_address : ""}
                    name="artist_address"
                    onChange={onChangeHandler}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    required
                />
            </div>
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
