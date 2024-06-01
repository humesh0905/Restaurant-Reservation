"use client"

import { useEffect, useState } from "react";
import ClosedCard from "@/components/cards/closed/ClosedCard";
import { fetchClosedReservations } from '@/services/reservation-services';

export default function Reservations() {

    const [closedReservations, setClosedReservations] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchClosedReservations();
                setClosedReservations(data);
            } catch (error) {
                console.error("Error fetching reservations:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h5 className="fw-bold">Closed Reservations</h5>
            <div id="closedReservations" className="row my-4">
                {closedReservations && closedReservations.length > 0 ?
                    closedReservations.map(closedReservation => (
                        <ClosedCard key={closedReservation.id} reservation={closedReservation} />
                    )) :
                    <h5 className="fw-bold">No closed reservations found.</h5>
                }
            </div>
        </div >
    )
}
