import { useEffect, useState } from "react";
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from '../Card'
import { fetchCustomerData } from '@/services/customer-services';
import { fetchTableData, updateTable } from '@/services/table-services';
import { updateReservation } from '@/services/reservation-services'

const ConfirmedCard = ({ reservation }) => {

    const [customer, setCustomer] = useState(null);
    const [tables, setTables] = useState(null);

    const handleComplete = async () => {
        try {
            const updateReservationData = {
                ...reservation,
                status: 'Complete',
            };

            const updateTableData = {
                ...tables,
                status: 'Clean',
            }

            await Promise.all([
                updateReservation(updateReservationData),
                updateTable(updateTableData)
            ]);

            window.location.reload();
        } catch (error) {
            console.error('Failed to update reservation:', error);
        }
    };

    const handleCancel = async () => {
        try {
            const updateReservationData = {
                ...reservation,
                status: 'Cancelled',
            };

            const updateTableData = {
                ...tables,
                status: 'Clean',
            }

            await updateReservation(updateReservationData)
            await updateTable(updateTableData)

            window.location.reload();
        } catch (error) {
            console.error('Failed to update reservation:', error);
        }
    };

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const data = await fetchCustomerData(reservation.customer);
                setCustomer(data);
            } catch (error) {
                console.error("Error fetching customer:", error);
            }
        };

        const fetchTables = async () => {
            try {
                const data = await (reservation.table && fetchTableData(reservation.table));
                setTables(data);
            } catch (error) {
                console.error("Error fetching Table details:", error);
            }
        };

        fetchCustomer();
        fetchTables();
    }, []);

    return (
        <Card>
            <span className="badge mb-2 text-bg-info text-white align-self-end"></span>
            <div className="row">
                <div className="col-6">
                    <p className="mb-0 text-body-tertiary fw-bold">Customer Information</p>
                    <h5 className="my-3">{customer && (customer.first_name + " " + customer.last_name)}</h5>
                    <p className="mb-0 text-body-tertiary text-sm">{customer && customer.email}</p>
                    <p className="mb-0 text-body-tertiary fs-6">{customer && customer.phone}</p>
                    <div className="row my-4 gap-3 justify-content-center">
                        <button type="button" className="col-4 btn btn-outline-dark btn-sm d-none d-lg-inline"><FontAwesomeIcon icon={faPhone} size="sm" /> Call</button>
                        <button type="button" className="col-4 btn btn-outline-dark btn-sm d-none d-lg-inline"><FontAwesomeIcon icon={faEnvelope} size="sm" /> Email</button>
                        <button type="button" className="col-2 btn btn-sm d-lg-none d-inline"><FontAwesomeIcon icon={faPhone} size="sm" /></button>
                        <button type="button" className="col-2 btn btn-sm d-lg-none d-inline"><FontAwesomeIcon icon={faEnvelope} size="sm" /></button>
                    </div>
                </div>
                <div className="col-6">
                    <p className="mb-0 text-body-tertiary fw-bold">Reservation Information</p>
                    <h5 className="my-3">
                        <span>{tables && tables.table_name}&nbsp;&nbsp;&nbsp; </span>
                    </h5>
                    <p className="mb-0 text-body-tertiary text-sm">Guests: {reservation.guests}</p>
                    <p className="mb-0 text-body-tertiary fs-6">Time: {reservation.reservation_time}</p>
                    <div className="row my-4 gap-3 justify-content-center">
                        <button type="button" className="col-4 btn btn-outline-success btn-sm" onClick={() => handleComplete()} >Complete</button>
                        <button type="button" className="col-4 btn btn-outline-danger btn-sm" onClick={() => handleCancel()} >Cancel</button>
                    </div>
                </div>
            </div>
        </Card >
    )
}

export default ConfirmedCard