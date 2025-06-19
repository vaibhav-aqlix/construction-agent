import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedVendors as selectVendors } from "../../../features/prompt/promptSlice";

export default function SelectVendors() {
    const {promptResponse} = useSelector((state) => state.prompt);
    const [selectedVendors, setSelectedVendors] = React.useState([]);
    const dispatch = useDispatch();

    const toggleSelectedVendors = (vendorInfo) => {
        setSelectedVendors((prevVendors) => {
            const vendorExists = prevVendors.some((vendor => vendor.email === vendorInfo?.email));

            if (vendorExists) 
                return prevVendors.filter((vendor) => vendor.email !== vendorInfo?.email);

            else return [...prevVendors, vendorInfo];
        })

        dispatch(selectVendors(selectedVendors));
    }

    React.useEffect(() => {
        console.log(selectedVendors, "selected vendors")
    }, [selectedVendors])
    
    return (
        <>
            {promptResponse?.vendors?.llmResponse.map(vendor => {
                return (
                    <>
                        <p className="text-gray-600 font-semibold text-lg my-2">{vendor?.vendorType}</p>

                        <div className="flex flex-wrap gap-4 mb-4">
                            {
                                vendor?.info?.map((vendorInfo) => {
                                    const selectedVendor = selectedVendors.some(vendor => vendor.email === vendorInfo?.email);

                                    return (
                                        <div
                                            key={vendorInfo}
                                            onClick={() => toggleSelectedVendors(vendorInfo)}
                                            className={`p-2 rounded-lg border shadow cursor-pointer flex transition hover:scale-105 ${
                                                selectedVendor
                                                    ? "bg-gray-600 border-gray-700 text-white"
                                                    : "bg-white border-gray-200"
                                            }`}
                                        >
                                            <div className={`flex justify-between items-center gap-2`}>
                                                <div className="flex flex-col gap-1">
                                                    <span className={`text-sm ${selectedVendor ? "text-white" : "text-gray-600"}`}>{vendorInfo?.name}</span>
                                                    <span className={`text-sm ${selectedVendor ? "text-white" : "text-gray-600"}`}>{vendorInfo?.email}</span>
                                                    <span className={`text-sm ${selectedVendor ? "text-white" : "text-gray-600"}`}>{vendorInfo?.location}</span>
                                                </div>
                                                <span className="font-bold">✓</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>
                );
            })}
        </>
    )
}