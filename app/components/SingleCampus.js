import React from 'react';
import { writeCampus, putCampus, destroyCampus } from '../store/index';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

export function SingleCampus(props) {
    const campusHelper = (campuses) => {
        if (campuses.length !== 0) {
            const filteredCampuses = campuses.filter((campusFilter) => {
                return campusFilter.id === Number(props.match.params.campusid);
            })
            return filteredCampuses[0]
        }
    }
    const nameHelper = (currentCampus) => {
        if (currentCampus ){
            return currentCampus.name
        }
    }
    const idHelper = (currentCampus) => {
        if (currentCampus ){
            return currentCampus.id
        }
    }
    const campuses = props.campuses;
    const campus = campusHelper(campuses);
    const name = nameHelper(campus);
    const id = idHelper(campus);
    const students = props.students;
    const filteredStudents = students.filter((student) => {
        return student.campusId === id;
    })
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3" >
                        <div id="add-content">
                            <h3>Edit Campus </h3>
                            <form
                                id="edit-campus-form"
                                onSubmit={props.handleSubmit}>
                                <div className="input-group input-group-sm">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        placeholder="Enter Campus name"
                                        onChange={props.handleCampusChange}
                                        value={props.newCampusEntry}
                                    />
                                    </div>
                                <span className="input-group-btn">
                                    <button className="btn btn-default" type="submit">Submit</button>
                                </span>
                            </form>
                            <button type="button" className="btn btn-danger" onClick={(event) => props.handleDelete(event, id)}>Delete</button>
                        </div>
                    </div>
                    <div className="col-sm-8">
                    <div className="well">
                        <h1 id="pageheader">Students at {name} Campus</h1>
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
                            filteredStudents.map((student) => {
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
            </div>
            <div className="col-sm-1" />
        </div>
    </div>  

    )
}


const mapStateToProps = (state, ownProps) => {
    return {
        students: state.students,
        campuses: state.campuses,
        newCampusEntry: state.newCampusEntry
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleSubmit(event) {
            event.preventDefault();
            const campus = event.target.name.value;
            dispatch(putCampus(Number(ownProps.match.params.campusid), campus, ownProps.history));
            const actionCampusClear = writeCampus('');
            dispatch(actionCampusClear);
        },
        handleCampusChange(event) {
            const action = writeCampus(event.target.value);
            dispatch(action);
        },
        handleDelete(event, id) {
            dispatch(destroyCampus(id));
            ownProps.history.push('/campuses');
        },
    }
}

const Container = withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleCampus))

export default Container;
