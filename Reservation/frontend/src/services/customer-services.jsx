async function fetchCustomers() {
    const response = await fetch("http://localhost:8000/rms/customers");
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
}

async function fetchCustomerData(customerId) {
    const response = await fetch(`http://localhost:8000/rms/customers/${customerId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
}

async function addCustomer(customerData) {
    const response = await fetch("http://localhost:8000/rms/customers/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customerData)
    });
    if (!response.ok) {
        throw new Error("Failed to add table");
    }
    return response.json();
}

async function deleteCustomer(customerId) {
    const response = await fetch(`http://localhost:8000/rms/customers/delete/${customerId}`, {
        method: "DELETE"
    });
    if (!response.ok) {
        throw new Error("Failed to delete table");
    }
}

async function sendReservationCreatedMail(mailRequest) {
    const response = await fetch(`http://localhost:8000/rms/send/reservation/email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(mailRequest)
    });
    if (!response.ok) {
        throw new Error("Failed to send mail");
    }
}

async function sendConfirmationMail(mailRequest) {
    const response = await fetch(`http://localhost:8000/rms/send/confirmation/email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(mailRequest)
    });
    if (!response.ok) {
        throw new Error("Failed to send mail");
    }
}

export { fetchCustomers, fetchCustomerData, addCustomer, sendReservationCreatedMail, sendConfirmationMail, deleteCustomer };
