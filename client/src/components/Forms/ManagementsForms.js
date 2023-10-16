import React from 'react'

export const FormTouristGuide = ({img_url,guide_name,fees,contact_detail,}) => {
    return (
        <>
            <div className="mt-4">

                {/* <!-- product Image Input --> */}
                <div className="mb-4 relative">
                    <label for="product-image" className="block text-gray-700 text-sm font-bold mb-2">product Image</label>
                    <div className="bg-gray-200 h-40 w-full rounded-md flex items-center justify-center">
                        <input type="file" id="product-image" name="product-image" accept="image/*" className="opacity-0 absolute z-10 w-full h-full cursor-pointer" />
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 20" fill="currentColor" className="text-gray-600">
                                <path d="M17,2H3C2.447,2,2,2.447,2,3v14c0,0.553,0.447,1,1,1h14c0.553,0,1-0.447,1-1V3C18,2.447,17.553,2,17,2zM16,15h-3.207 l-2.293-2.293c-0.195-0.195-0.451-0.293-0.707-0.293s-0.512,0.098-0.707,0.293L7.207,15H4v-1l2.793-2.793c0.781-0.781,2.047-0.781,2.828,0 L12,14v1H4.999c-0.553,0-1-0.447-1-1V4c0-0.553,0.447-1,1-1H16c0.553,0,1,0.447,1,1V14H16z" />
                                <path d="M10,4h1v3h3v1h-3v3H10v-3H7v-1h3V4z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <label htmlFor="guideName" className="block text-sm font-medium text-gray-700">
                    Guide Name
                </label>
                <input
                    type="text"
                    id="guideName"
                    value={guide_name}
                    name="guideName"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
            </div>

            <div className="mt-4">
                <label htmlFor="fees" className="block text-sm font-medium text-gray-700">
                    Fees
                </label>
                <input
                    type="text"
                    id="fees"
                    value={fees}
                    name="fees"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
            </div>

            <div className="mt-4">
                <label htmlFor="contactDetail" className="block text-sm font-medium text-gray-700">
                    Contact Detail
                </label>
                <input
                    type="text"
                    id="contactDetail"
                    value={contact_detail}
                    name="contactDetail"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
            </div>
        </>
    )
}

export const FormEvents = ({img_url,event_name, event_date, event_descp}) => {
    return (
        <>
            <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
                {/* <!-- Event Image Input --> */}
                <div className="mb-4 relative">
                    <label for="event-image" className="block text-gray-700 text-sm font-bold mb-2">Event Image</label>
                    <div className="bg-gray-200 h-40 w-full rounded-md flex items-center justify-center">
                        <input type="file" id="event-image" name="event-image" accept="image/*" className="opacity-0 absolute z-10 w-full h-full cursor-pointer" />
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 20" fill="currentColor" className="text-gray-600">
                                <path d="M17,2H3C2.447,2,2,2.447,2,3v14c0,0.553,0.447,1,1,1h14c0.553,0,1-0.447,1-1V3C18,2.447,17.553,2,17,2zM16,15h-3.207 l-2.293-2.293c-0.195-0.195-0.451-0.293-0.707-0.293s-0.512,0.098-0.707,0.293L7.207,15H4v-1l2.793-2.793c0.781-0.781,2.047-0.781,2.828,0 L12,14v1H4.999c-0.553,0-1-0.447-1-1V4c0-0.553,0.447-1,1-1H16c0.553,0,1,0.447,1,1V14H16z" />
                                <path d="M10,4h1v3h3v1h-3v3H10v-3H7v-1h3V4z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* <!-- Event Name Input --> */}
                <div className="mb-4">
                    <label for="event-name" className="block text-gray-700 text-sm font-bold mb-2">Name of Event</label>
                    <input type="text" id="event-name" value={event_name} name="event-name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" placeholder="Enter the event name" required />
                </div>

                {/* <!-- Event Date Input --> */}
                <div className="mb-4">
                    <label for="event-date" className="block text-gray-700 text-sm font-bold mb-2">Date of Event</label>
                    <input type="date" id="event-date" value={event_date} name="event-date" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required />
                </div>

                {/* <!-- Event Description Input --> */}
                <div className="mb-4">
                    <label for="event-description" className="block text-gray-700 text-sm font-bold mb-2">Description of Event</label>
                    <textarea id="event-description" value={event_descp} name="event-description" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" rows="4" placeholder="Enter a description for the event" required></textarea>
                </div>


            </div>

        </>
    );
}


export const FormProduct = ({img_url, prod_name, prod_price, prod_quant, prod_desp}) => {
    return (
        <>
            <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
                {/* <!-- product Image Input --> */}
                <div className="mb-4 relative">
                    <label for="product-image" className="block text-gray-700 text-sm font-bold mb-2">Product Image</label>
                    <div className="bg-gray-200 h-40 w-full rounded-md flex items-center justify-center">
                        <input type="file" id="product-image" name="product-image" accept="image/*" className="opacity-0 absolute z-10 w-full h-full cursor-pointer" />
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 20" fill="currentColor" className="text-gray-600">
                                <path d="M17,2H3C2.447,2,2,2.447,2,3v14c0,0.553,0.447,1,1,1h14c0.553,0,1-0.447,1-1V3C18,2.447,17.553,2,17,2zM16,15h-3.207 l-2.293-2.293c-0.195-0.195-0.451-0.293-0.707-0.293s-0.512,0.098-0.707,0.293L7.207,15H4v-1l2.793-2.793c0.781-0.781,2.047-0.781,2.828,0 L12,14v1H4.999c-0.553,0-1-0.447-1-1V4c0-0.553,0.447-1,1-1H16c0.553,0,1,0.447,1,1V14H16z" />
                                <path d="M10,4h1v3h3v1h-3v3H10v-3H7v-1h3V4z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* <!-- product Name Input --> */}
                <div className="mb-4">
                    <label for="product-name" className="block text-gray-700 text-sm font-bold mb-2">Name of Product</label>
                    <input type="text" id="product-name" value={prod_name} name="product-name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" placeholder="Enter the product name" required />
                </div>

                {/* <!-- product Price Input --> */}
                <div className="mb-4">
                    <label for="product-price" className="block text-gray-700 text-sm font-bold mb-2">Price of Product</label>
                    <input type="number" id="product-price" value={prod_price} name="product-price" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required />
                </div>

                {/* <!-- product Quantity Input --> */}
                <div className="mb-4">
                    <label for="product-quantity" className="block text-gray-700 text-sm font-bold mb-2">Price of Quantity</label>
                    <input type="number" id="product-quantity" value={prod_quant} name="product-quantity" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required />
                </div>

                {/* <!-- product Description Input --> */}
                <div className="mb-4">
                    <label for="product-description" className="block text-gray-700 text-sm font-bold mb-2">Description of Product</label>
                    <textarea id="product-description" value={prod_desp} name="product-description" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" rows="4" placeholder="Enter a description for the product" required></textarea>
                </div>


            </div>

        </>
    );
}

export const FormFacility = ({img_url, fact_name, fact_contact, fact_loca}) => {
    return (
        <>
            <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
                {/* <!-- facility Image Input --> */}
                <div className="mb-4 relative">
                    <label for="facility-image" className="block text-gray-700 text-sm font-bold mb-2">facility Image</label>
                    <div className="bg-gray-200 h-40 w-full rounded-md flex items-center justify-center">
                        <input type="file" id="facility-image" name="facility-image" accept="image/*" className="opacity-0 absolute z-10 w-full h-full cursor-pointer" />
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 20" fill="currentColor" className="text-gray-600">
                                <path d="M17,2H3C2.447,2,2,2.447,2,3v14c0,0.553,0.447,1,1,1h14c0.553,0,1-0.447,1-1V3C18,2.447,17.553,2,17,2zM16,15h-3.207 l-2.293-2.293c-0.195-0.195-0.451-0.293-0.707-0.293s-0.512,0.098-0.707,0.293L7.207,15H4v-1l2.793-2.793c0.781-0.781,2.047-0.781,2.828,0 L12,14v1H4.999c-0.553,0-1-0.447-1-1V4c0-0.553,0.447-1,1-1H16c0.553,0,1,0.447,1,1V14H16z" />
                                <path d="M10,4h1v3h3v1h-3v3H10v-3H7v-1h3V4z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* <!-- facility Name Input --> */}
                <div className="mb-4">
                    <label for="facility-name" className="block text-gray-700 text-sm font-bold mb-2">Name of facility</label>
                    <input type="text" id="facility-name" value={fact_name} name="facility-name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" placeholder="Enter the facility name" required />
                </div>

                {/* <!-- facility contact Input --> */}
                <div className="mb-4">
                    <label for="facility-contact" className="block text-gray-700 text-sm font-bold mb-2">Contact of facility</label>
                    <input type="tel" id="facility-contact" value={fact_contact} name="facility-contact" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required />
                </div>

                {/* <!-- facility Description Input --> */}
                <div className="mb-4">
                    <label for="facility-location" className="block text-gray-700 text-sm font-bold mb-2">Location of facility</label>
                    <input type="url" id="facility-location" value={fact_loca} name="facility-location" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required />
                    <p className="text-sm text-red-400">Paste the URL</p>
                </div>


            </div>

        </>
    );
}




