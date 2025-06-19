import React from "react";
import { useSelector } from "react-redux";
import Loader from "../../../common/loader/Loader";
import EmailForm from "./EmailForm";
import SelectVendors from "./SelectVendors";

export default function SendEmails() {
    const {loading, promptResponse, error} = useSelector((state) => state.prompt);

    React.useEffect(() => {
        console.log(promptResponse, "prompt res")
    }, [promptResponse])

    return (
        <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1000px] mx-auto bg-white p-8 rounded-lg shadow">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">
                    {loading ? "Generating Results..." : `Generated ${promptResponse?.totalEmails} results`}
                </h3>
                {
                    loading 
                        ? (
                            <div className="my-20">
                                <Loader />
                            </div>
                        ) 
                        : (
                            <>
                                <SelectVendors />
                                <EmailForm />
                            </>
                        )
                }
            </div>
        </div>
    );
}
