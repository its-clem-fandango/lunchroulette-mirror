import { Button } from './ui/button';

import React, { useState } from 'react';

const ConfirmLunchButton: React.FC = () => {

        const today = new Date();
        const dateString = today.toDateString(); // e.g., "Fri Dec 01 2023"
        const [date, setDate] = useState(dateString);

        const firstName = "John"
        const lastName = 'Doe'

    // I also need to send the username 
    // Each day, I need to create a function that sets the use state in a new date

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Sending this date: ',{date, firstName, lastName})
        console.log({today})

        try {
            const response = await fetch('/api/save-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const responseBody = await response.json();
            console.log('Server response:', responseBody);
        } catch (error) {
            console.error('Failed to send date:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Button type="submit">🥙 Confirm Lunch for Today</Button>
        </form>
    );
};

export default ConfirmLunchButton;
