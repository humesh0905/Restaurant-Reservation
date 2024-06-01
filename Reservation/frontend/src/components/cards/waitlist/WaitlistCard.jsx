import { useEffect, useState } from "react";
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from '../Card';
import AssignTableModal from '@/components/modal/assign-table/AssignTableModal';
import { fetchCustomerData } from '@/services/customer-services';
import { deleteReservation } from '@/services/reservation-services';

const WaitlistCard = ({ reservation }) => {

    const [customer, setCustomer] = useState(null);

    const handleDelete = async (reservationId) => {
        console.log(reservationId)
        try {
            await deleteReservation(reservationId);
            window.location.reload();
        } catch (error) {
            console.error('Failed to delete table:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCustomerData(reservation.customer);
                setCustomer(data);
            } catch (error) {
                console.error("Error fetching customer:", error);
            }
        };
        fetchData();
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
                        <button type="button" className="col-4 btn btn-outline-dark btn-sm d-none d-lg-inline" ><FontAwesomeIcon icon={faEnvelope} size="sm" /> Email</button>
                        <button type="button" className="col-2 btn btn-sm d-lg-none d-inline"><FontAwesomeIcon icon={faPhone} size="sm" /></button>
                        <button type="button" className="col-2 btn btn-sm d-lg-none d-inline"><FontAwesomeIcon icon={faEnvelope} size="sm" /></button>
                    </div>
                </div>
                <div className="col-6 d-flex flex-column justify-content-center align-items-center">
                    <AssignTableModal reservation={reservation}/>
                    <div className="w-50 my-3">
                        <button type="button" className="btn btn-outline-danger w-100" onClick={() => handleDelete(reservation.reservation_id)} >Delete</button>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default WaitlistCard