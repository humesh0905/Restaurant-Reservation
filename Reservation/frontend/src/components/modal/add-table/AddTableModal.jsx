import React, { useState } from 'react';
import Modal from '../Modal';
import { addTable } from '@/services/table-services'; // Import addTable function from your API file

const AddTableModal = (isUpdate) => {
    const [tableName, setTableName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [section, setSection] = useState('Main');
    const [status, setStatus] = useState('Clean');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const tableData = {
                table_name: tableName,
                capacity: parseInt(capacity),
                section: section,
                status: status
            };
            await addTable(tableData);
            setTableName('');
            setCapacity('');
            window.location.reload();
        } catch (error) {
            console.error('Failed to add table:', error);
        }
    };

    return (
        <>
            <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#addTableModal">
                Add table
            </button>
            <Modal id="addTableModal">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Table Details</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit} className="row g-3">
                        <div className="col-12">
                            <label htmlFor="tableName" className="form-label">Name</label>
                            <input type="text" className="form-control" id="tableName" value={tableName} onChange={(e) => setTableName(e.target.value)} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="capacity" className="form-label">Capacity</label>
                            <input type="number" className="form-control" id="capacity" min="4" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="section" className="form-label">Section</label>
                            <select id="section" className="form-select" value={section} onChange={(e) => setSection(e.target.value)}>
                                <option>Main</option>
                                <option>Private</option>
                            </select>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-dark">Add Table</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default AddTableModal;
