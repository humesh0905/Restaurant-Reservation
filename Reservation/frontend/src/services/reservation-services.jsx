async function fetchReservations() {
    const response = await fetch("http://localhost:8000/rms/reservations");
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
}

async function fetchReservation(reservationId) {
    const response = await fetch(`http://localhost:8000/rms/reservations/${reservationId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
}

async function fetchWaitlistReservations() {
    const response = await fetch("http://localhost:8000/rms/reservations/waiting");
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
}

async function fetchConfirmedReservations() {
    const response = await fetch("http://localhost:8000/rms/reservations/confirmed");
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
}

async function fetchClosedReservations() {
    const response = await fetch("http://localhost:8000/rms/reservations/closed");
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
}

async function createReservation(reservationDetails) {
    console.log(reservationDetails)
    const response = await fetch("http://localhost:8000/rms/reservations/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reservationDetails)
    });
    if (!response.ok) {
        throw new Error("Failed to create reservation");
    }
    return response.json();
}

async function updateReservation(reservationDetails) {
    const response = await fetch(`http://localhost:8000/rms/reservations/update/${reservationDetails.reservation_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reservationDetails)
    });
    if (!response.ok) {
        throw new Error("Failed to update reservation");
    }
    return response.json();
}

async function deleteReservation(reservationId) {
    const response = await fetch(`http://localhost:8000/rms/reservations/delete/${reservationId}`, {
        method: "DELETE"
    });
    if (!response.ok) {
        throw new Error("Failed to delete reservation");
    }
}

export { fetchReservations, fetchReservation, fetchWaitlistReservations, fetchConfirmedReservations, fetchClosedReservations, createReservation, updateReservation, deleteReservation };
