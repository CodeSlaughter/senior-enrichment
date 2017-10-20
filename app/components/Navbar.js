import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(){
    return (
        <nav className="navbar" >
            <div className="container">
                <ul className="nav nav-tabs">
                    <li><Link to="/" className="nav-link">HOME</Link></li>
                    <li><Link to="/students" className="nav-link">STUDENTS</Link></li>
                    <li><Link to="/campuses" className="nav-link">CAMPUSES</Link></li>
                </ul>
            </div>
        </nav>
    )
}

