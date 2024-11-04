// /components/DisplayMenu.js
import React from 'react';
import './DisplayMenu.css';

const DisplayMenu = ({ grouping, sorting, onGroupingChange, onSortingChange }) => {
    return (
        <div className="display-menu">
            <label>
                Group by:
                <select value={grouping} onChange={(e) => onGroupingChange(e.target.value)}>
                    <option value="status">Status</option>
                    <option value="user">User</option>
                    <option value="priority">Priority</option>
                </select>
            </label>
            <label>
                Sort by:
                <select value={sorting} onChange={(e) => onSortingChange(e.target.value)}>
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                </select>
            </label>
        </div>
    );
};

export default DisplayMenu;
