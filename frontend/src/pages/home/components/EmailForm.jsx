import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendEmails } from "../../../features/prompt/promptSlice";

export default function EmailForm() {
    const {selectedVendors} = useSelector(state => state.prompt);
    const {authToken} = useSelector(state => state.auth);
    const [emailSubject, setEmailSubject] = React.useState("");
    const [emailBody, setEmailBody] = React.useState("");
    const [sent, setSent] = React.useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(sendEmails({subject: emailSubject, body: emailBody, authToken}));
        setEmailSubject("");
        setEmailBody("");
        setSent(true);
    }

    return (
        <form onSubmit={handleSubmit} className="text-sm bg-gray-100 p-4 rounded-lg overflow-auto h-[85%] flex flex-col gap-8">
            <input 
                type="text" 
                name="emailSubject" 
                placeholder="Subject"
                value={emailSubject} 
                required
                onChange={(event) => setEmailSubject(event.target.value)} 
                className="px-4 py-2 mt-3 rounded-lg outline-gray-300 border-gray-300 border-2"
            />
            <textarea 
                type="text" 
                name="emailBody" 
                placeholder="Body"
                value={emailBody} 
                required
                onChange={(event) => setEmailBody(event.target.value)} 
                className="px-4 py-2 rounded-lg h-40 max-h-60 outline-gray-300 border-gray-300 border-2"
            />

            <button 
                type="submit"
                className="py-2 px-4 max-w-[80px] bg-gray-600 hover:bg-gray-800 transition duration-300 text-white rounded-lg font-medium"
            >
                Send
            </button>

            {sent && <p>Your quotation has been sent to emails</p>}
        </form>
    )
}