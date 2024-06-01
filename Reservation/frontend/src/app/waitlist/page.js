"use client";

import { useEffect, useState } from "react";
import WaitlistCard from "@/components/cards/waitlist/WaitlistCard";
import CreateReservationModal from "@/components/modal/create-reservation/CreateReservationModal";
import { fetchWaitlistReservations } from '@/services/reservation-services';

export default function Waitlists() {
    const [waitlistReservations, setWaitlistReservations] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchWaitlistReservations();
                setWaitlistReservations(data);
            } catch (error) {
                console.error("Error fetching reservations:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h5 className="fw-bold">Reservations</h5>
            <CreateReservationModal />
            <div className="row my-4">
                {waitlistReservations !== null && waitlistReservations.length > 0 ?
                    waitlistReservations.map(waitlistReservation => (
                        <WaitlistCard key={waitlistReservation.reservation_id} reservation={waitlistReservation} />
                    )) :
                    <h5 className="fw-bold">No reservations found.</h5>
                }
            </div>
        </div>
    );
}
