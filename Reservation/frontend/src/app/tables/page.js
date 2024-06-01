"use client"

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import AddTableModal from "@/components/modal/add-table/AddTableModal";
import { fetchTablesData, deleteTable } from '@/services/table-services';

export default function Table() {
    const [tables, setTables] = useState(null);

    const handleDelete = async (tableId) => {
        try {
            await deleteTable(tableId);
            window.location.reload();
        } catch (error) {
            console.error('Failed to delete table:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchTablesData();
                setTables(data);
            } catch (error) {
                console.error("Error fetching tables:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h5 className="fw-bold">Tables</h5>
            <AddTableModal />
            <table className="table table-borderless my-4">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Table Name</th>
                        <th scope="col">Capacity</th>
                        <th scope="col">Section</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {tables && tables.map((table, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{table.table_name}</td>
                            <td>{table.capacity}</td>
                            <td>{table.section}</td>
                            <td>{table.status}</td>
                            <td>
                                <button type="button" className="col-4 btn btn-sm"><FontAwesomeIcon icon={faTrash} size="lg" onClick={() => handleDelete(table.table_id)} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
