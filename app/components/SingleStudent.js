import React from 'react';
import { writeEmail, writeStudent, selectCampus, putStudent } from '../store/index';
import { withRouter, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';

export function SingleStudent(props) {
    const students = props.students;
    const campuses = props.campuses;
    const filteredStudents = students.filter((studentFilter) => {
        return studentFilter.id === Number(props.match.params.studentid)
    })
    const student = filteredStudents[0];
    const filteredCampuses = campuses.filter((campusFilter) => {
        return campusFilter.id === student.campusId
    })
    const campus = filteredCampuses[0];
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3" >
                        <div id="add-content">
                            <h3>Edit Student </h3>
                            <form
                                id="edit-student-form"
                                onSubmit={props.handleSubmit}
                                >
                                <div className="input-group input-group-sm"
                                >
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        placeholder="Enter Student name"
                                        onChange={props.handleStudentChange}
                                        value={props.newStudentEntry}
                                    />
                                </div>
                                <div className="input-group input-group-sm"
                                >
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="email"
                                        placeholder="Enter Student Email"
                                        onChange={props.handleEmailChange}
                                        value={props.newEmailEntry}
                                    />
                                </div>
                                <select
                                    name="campus"
                                    value={props.selectCampus} 
                                    onChange={props.handleCampusChange
                                }>
                                    {
                                        campuses.map((campus) => {
                                            return <option key={campus.id} value={campus.id}>{campus.name}</option>
                                        })
                                    }
                                </select>
                                <span className="input-group-btn">
                                    <button className="btn btn-default" type="submit">Submit</button>
                                </span>
                            </form>
                            </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="container">
                            <div id="student-card-container">
                                <div>
                                    {
                                    student === undefined ? <div /> : <img src={`${student.photo}`} />
                                    }
                                    </div>
                                    <div id="student-card-info">
                                    {
                                    student === undefined ? <p /> : <div><h1>{student.name}</h1></div>
                                    }
                                    {
                                    campus !== undefined && <p><Link to={`../campuses/${student.campusId}`}>Campus: {campus.name}</Link></p>
                                    }
                                    {
                                    student !== undefined && <p>Email: {student.email}</p>
                                    }
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-1" />
                </div>
            </div>
        </div>

    )
}


const mapStateToProps = (state, ownProps) => {
    return {
        students: state.students,
        campuses: state.campuses,
        newStudentEntry: state.newStudentEntry,
        newEmailEntry: state.newEmailEntry,
        selectCampus: state.selectCampus
    };
};


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleStudentChange(event) {
            const action = writeStudent(event.target.value);
            dispatch(action);
        },
        handleEmailChange(event) {
            const action = writeEmail(event.target.value);
            dispatch(action);
        },
        handleCampusChange(event) {
            const action = selectCampus(event.target.value);
            dispatch(action);
        },
        handleSubmit(event) {
            event.preventDefault();
            const thunk = putStudent(Number(ownProps.match.params.studentid), event.target.name.value, event.target.email.value, event.target.campus.value, ownProps.history);
            dispatch(thunk);
            const actionStudentClear = writeStudent('');
            dispatch(actionStudentClear);
            const actionEmailClear = writeEmail('');
            dispatch(actionEmailClear);
            const actionCampusClear = selectCampus(1);
            dispatch(actionCampusClear);
        }
    }
}

const Container = withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleStudent))

export default Container
