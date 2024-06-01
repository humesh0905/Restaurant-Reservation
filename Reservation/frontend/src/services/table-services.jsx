async function fetchTablesData() {
    const response = await fetch("http://localhost:8000/rms/tables");
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
}

async function fetchCleanTables(guests) {
    const response = await fetch(`http://localhost:8000/rms/tables/clean/${guests}`);
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
}

async function fetchTableData(tableId) {
    const response = await fetch(`http://localhost:8000/rms/tables/${tableId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
}

async function addTable(tableData) {
    console.log(tableData)
    const response = await fetch("http://localhost:8000/rms/tables/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tableData)
    });
    if (!response.ok) {
        throw new Error("Failed to add table");
    }
    return response.json();
}

async function updateTable(tableDetails) {
    const response = await fetch(`http://localhost:8000/rms/tables/update/${tableDetails.table_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tableDetails)
    });
    if (!response.ok) {
        throw new Error("Failed to update table");
    }
    return response.json();
}

async function deleteTable(tableId) {
    const response = await fetch(`http://localhost:8000/rms/tables/delete/${tableId}`, {
        method: "DELETE"
    });
    if (!response.ok) {
        throw new Error("Failed to delete table");
    }
}

export { fetchTablesData, fetchCleanTables, fetchTableData, addTable, updateTable, deleteTable };
