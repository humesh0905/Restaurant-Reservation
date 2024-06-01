import React, { useState } from 'react';
import Modal from "../Modal";
import { createReservation } from '@/services/reservation-services';
import { addCustomer, sendReservationCreatedMail } from "@/services/customer-services";

const CreateReservationModal = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [guests, setGuests] = useState(1); // Set a default value for guests

    const sendMail = async (mailRequest) => {
        try {
            await sendReservationCreatedMail(mailRequest);
        } catch (error) {
            console.error("Error sending mail:", error);
            throw error; // Rethrow the error to indicate mail sending failure
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const customerDetails = {
                first_name: firstName,
                last_name: lastName,
                phone: phone,
                email: email,
            };

            const savedCustomer = await addCustomer(customerDetails);

            const reservationDetails = {
                customer: savedCustomer.customer_id,
                status: "Queued",
                guests: guests
            }

            const reservation = await createReservation(reservationDetails);
            const mailRequest = {
                reservation_id: reservation.reservation_id,
                recipient_email: email
            };
            sendMail(mailRequest)

            setFirstName('');
            setLastName('');
            setPhone('');
            setEmail('');
            setGuests(1); // Reset guests to default value
            window.location.reload();
        } catch (error) {
            console.error('Failed to create reservation:', error);
        }
    };

    return (
        <>
            <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#createReservation">
                Create new reservation
            </button>
            <Modal id="createReservation">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="createReservationLabel">New Reservation</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-md-6">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input type="tel" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="tableSize" className="form-label">Number of Guests</label>
                            <select id="tableSize" className="form-select" value={guests} onChange={(e) => setGuests(parseInt(e.target.value))}>
                                <option value="1">1 person</option>
                                <option value="2">2 people</option>
                                <option value="3">3 people</option>
                                <option value="4">4 people</option>
                                <option value="5">5 people</option>
                                <option value="6">6 people</option>
                                <option value="7">7 people</option>
                                <option value="8">8 people</option>
                                <option value="9">9 people</option>
                                <option value="10">10 people</option>
                                <option value="11">11 people</option>
                                <option value="12">12 people</option>
                                <option value="13">13 people</option>
                                <option value="14">14 people</option>
                                <option value="15">15 people</option>
                            </select>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-dark">Create</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default CreateReservationModal;
