import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(){
    return (
        <div className="container" >
            <div className="row">
                <div className="col-sm-2" />
                <div className="col-sm-8">
                    <div><h1 id="welcome">Welcome</h1></div>
                </div>
                <div className="col-sm-2" />
            </div>
        </div>
    )
}