import React, { useState, useEffect } from "react";
import { fetchTickets } from "./Api.js"
import TicketCard from "./TicketCard.js";
import DisplayMenu from "./DisplayMenu.js";
import "./KanbanBoard.css";

const KanbanBoard = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [grouping, setGrouping] = useState(
        localStorage.getItem("grouping") || "status"
    );
    const [sorting, setSorting] = useState(
        localStorage.getItem("sorting") || "priority"
    );

    useEffect(() => {
        async function getTickets() {
            const data = await fetchTickets();
            setTickets(data.tickets);
            setUsers(data.users);
        }
        getTickets();
    }, []);

    const handleGroupingChange = (newGrouping) => {
        setGrouping(newGrouping);
        localStorage.setItem("grouping", newGrouping);
    };

    const handleSortingChange = (newSorting) => {
        setSorting(newSorting);
        localStorage.setItem("sorting", newSorting);
    };

    const groupTickets = () => {
        let grouped = {};

        tickets.forEach((ticket) => {
            let groupKey;

            if (grouping === "user") {
                // Match the ticket's userId with the user's name
                const user = users.find((u) => u.id === ticket.userId);
                groupKey = user ? user.name : "Unknown User";
            } else if (grouping === "priority") {
                const priorityLabels = [
                    "No priority",
                    "Low",
                    "Medium",
                    "High",
                    "Urgent",
                ];
                groupKey = priorityLabels[ticket.priority] || "No priority";
            } else {
                groupKey = ticket[grouping] || "No " + grouping;
            }

            if (!grouped[groupKey]) grouped[groupKey] = [];
            grouped[groupKey].push(ticket);
        });

        Object.keys(grouped).forEach((group) => {
            grouped[group] = grouped[group].sort((a, b) => {
                if (sorting === "priority") return b.priority - a.priority;
                if (sorting === "title") return a.title.localeCompare(b.title);
                return 0;
            });
        });

        return grouped;
    };

    const groupedTickets = groupTickets();

    return (
        <>
            <DisplayMenu
                grouping={grouping}
                sorting={sorting}
                onGroupingChange={handleGroupingChange}
                onSortingChange={handleSortingChange}
            />
            <div className="kanban-board kanban-board-containers">

                <div className="kanban-columns">
                    {Object.keys(groupedTickets).map((group) => (
                        <div key={group} className="kanban-column">
                            <h2>{group}</h2>
                            {groupedTickets[group].map((ticket) => (
                                <TicketCard key={ticket.id} ticket={ticket} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default KanbanBoard;