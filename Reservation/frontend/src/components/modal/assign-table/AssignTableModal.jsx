import Modal from "../Modal";
import { useEffect, useState } from "react";
import { fetchCleanTables, updateTable } from '@/services/table-services';
import { updateReservation } from '@/services/reservation-services';
import { fetchCustomerData, sendConfirmationMail } from "@/services/customer-services";

const AssignTableModal = ({ reservation }) => {

    const [availableTables, setAvailableTables] = useState(null);
    const [assignedTable, setAssignedTable] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        handleAssignTable();
    }, []);

    const handleAssignTable = async () => {
        try {
            const data = await fetchCleanTables(reservation.guests);
            setAvailableTables(data);
        } catch (error) {
            console.error("Error fetching clean tables:", error);
        }
    };

    const handleRadioChange = (table) => {
        setAssignedTable(table);
    };

    const sendMail = async (customerId) => {
        try {
            const customer = await fetchCustomerData(customerId);
            console.log(customer);
            const mailRequest = {
                reservation_id: reservation.reservation_id,
                recipient_email: customer.email
            };
            console.log(mailRequest);
            await sendConfirmationMail(mailRequest);
        } catch (error) {
            console.error("Error sending mail:", error);
            throw error; // Rethrow the error to indicate mail sending failure
        }
    };

    const handleSubmit = async () => {
        try {
            setIsProcessing(true);

            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            const formattedTime = today.toTimeString().split(' ')[0];

            const updateReservationData = {
                ...reservation,
                table: assignedTable.table_id,
                status: 'Reserved',
                reservation_date: formattedDate,
                reservation_time: formattedTime
            };

            const updateTableData = {
                ...assignedTable,
                status: 'Occupied'
            };

            await Promise.all([
                updateReservation(updateReservationData),
                updateTable(updateTableData),
            ]);

            sendMail(updateReservationData.customer)

            // Refresh page
            window.location.reload();
        } catch (error) {
            console.error("Error updating reservation, table, or sending mail:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <>
            <div className="w-50 my-3">
                <button type="button" className="btn btn-outline-dark w-100" data-bs-toggle="modal" data-bs-target={"#assignTableModal-" + reservation.reservation_id}>Assign Table</button>
            </div>
            <Modal id={"assignTableModal-" + reservation.reservation_id} backdrop="static">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="assignTableModalLabel">Available Tables</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <table className="table table-borderless my-0">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Table Name</th>
                                <th scope="col">Capacity</th>
                                <th scope="col">Section</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {availableTables && availableTables.map(table => (
                                <tr key={table.table_id}>
                                    <td>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input border-dark"
                                                type="radio"
                                                value={table.table_id}
                                                name="availableTables" // Ensure all radio buttons have the same name
                                                id={`table-${table.table_id}`}
                                                checked={assignedTable && assignedTable.table_id === table.table_id}
                                                onChange={() => handleRadioChange(table)}
                                            />
                                        </div>
                                    </td>
                                    <td>{table.table_name}</td>
                                    <td>{table.capacity}</td>
                                    <td>{table.section}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="modal-footer justify-content-center">
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-dark" onClick={() => handleSubmit()} disabled={isProcessing}>
                        {isProcessing ? 'Processing...' : 'Assign'}
                    </button>
                </div>
            </Modal>
        </>
    )
}

export default AssignTableModal;
