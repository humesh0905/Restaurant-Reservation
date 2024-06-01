"use client"

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import ConfirmedCard from "@/components/cards/confirmed/ConfirmedCard";
import { fetchConfirmedReservations } from '@/services/reservation-services';

export default function Reservations() {

    const [confirmedReservations, setConfirmedReservations] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchConfirmedReservations();
                setConfirmedReservations(data);
            } catch (error) {
                console.error("Error fetching reservations:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h5 className="fw-bold">Confirmed Reservations</h5>
            <div id="confirmedReservations" className="row my-4">
                {confirmedReservations && confirmedReservations.length > 0 ?
                    confirmedReservations.map(confirmedReservation => (
                        <ConfirmedCard key={confirmedReservation.id} reservation={confirmedReservation} />
                    )) :
                    <h5 className="fw-bold">No reservations found.</h5>
                }
            </div>
        </div >
    )
}
