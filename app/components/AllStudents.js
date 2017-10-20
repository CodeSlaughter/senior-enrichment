import React from 'react';
import { writeStudent, writeEmail, selectCampus, createStudent, destroyStudent } from '../store/index';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import toonavatar from 'cartoon-avatar';

export function AllStudents(props) {
    const campusHelper = (student, campuses) => {
        if (campuses.length !== 0) {
            let coreCampus = campuses.filter((campus) => {
                return campus.id === student.campusId
            })
            if (coreCampus.length > 0) {
                return coreCampus[0].name
            }
        }
    }
    const students = props.students;
    const campuses = props.campuses;
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <div id="add-content">
                            <h3>Add Student</h3>
                            <hr />
                            <form
                                id="new-student-form"
                                onSubmit={props.handleSubmit}>
                                <div className="input-group form-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        placeholder="Enter Student name"
                                        onChange={props.handleStudentChange}
                                        value={props.newStudentEntry}
                                    />
                                </div>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="email"
                                    placeholder="Enter Student Email"
                                    onChange={props.handleEmailChange}
                                    value={props.newEmailEntry}
                                />
                                <select
                                    className="form-control"
                                    value={props.selectCampus}
                                    onChange={props.handleCampusChange}
                                    name="campus">
                                    {
                                        campuses.map((campus) => {
                                            return <option key={campus.id} value={campus.id}>{campus.name}</option>
                                        })
                                    }
                                </select>
                                <span className="input-group-btn">
                                    <button className="btn btn-default btn btn-danger btn-sm" type="submit">Submit</button>
                                </span>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-7">
                        <div className="well">
                            <h1 id="pageheader">Students</h1>
                            <hr />
                            <table className="table table-striped">
                                <thead >
                                    <tr>
                                        <th>ID#</th>
                                        <th><strong>Student Info</strong></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        students.map((student) => {
                                            return (
                                                <tr key={student.id}>
                                                    <th scope="row">{student.id}</th>
                                                    <td>
                                                    <Link to={`/students/${student.id}`}>
                                                        <div id="student-card-container">
                                                            <div><img src={`${student.photo}`} /></div>
                                                            <div id="student-card-info">
                                                                <p><strong>Name:</strong> {student.name}</p>
                                                                <p><strong>Email:</strong> {student.email}</p>
                                                                <p><strong>Campus:</strong> {campusHelper(student, campuses)}</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    </td>
                                                    <td><button type="button" className="btn btn-danger" onClick={(e) => props.handleDelete(e, student.id)}>Delete</button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-sm-2" />
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state, ownProps) => {
    return {
        students: state.students,
        campuses: state.campuses
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
            console.log('campus value', event.target.value);
            const action = selectCampus(event.target.value);
            dispatch(action);
        },
        handleDelete(event, id) {
            dispatch(destroyStudent(id));
        },
        handleSubmit(event) {
            console.log('--------------', event.target)
            event.preventDefault();
            dispatch(createStudent(event.target.name.value, event.target.email.value, event.target.campus.value, toonavatar.generate_avatar()));
            const actionStudentClear = writeStudent('');
            dispatch(actionStudentClear);
            const actionEmailClear = writeEmail('');
            dispatch(actionEmailClear);
            const actionCampusClear = selectCampus(1);
            dispatch(actionCampusClear);
        }
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(AllStudents)

export default Container;
