import React from 'react';
import CategoriesForm from './components/CategoriesForm';
import SendEmails from './components/SendEmails';

export default function Home() {
    const [showSendEmailsComponent, setShowSendEmailsComponent] = React.useState(false);
    return (
        <div className='bg-gray-50 h-screen'>
            <CategoriesForm setShowSendEmailsComponent={setShowSendEmailsComponent} />
            {showSendEmailsComponent && <SendEmails />}
        </div>
    )
}
