import React from 'react';
import { writeCampus, createCampus, destroyCampus } from '../store/index';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export function AllCampuses(props) {
    const students = props.students;
    const campuses = props.campuses;

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-3">
                    <div id="add-content">
                            <h3>Add Campus </h3>
                            <hr />
                            <form
                                id="new-campus-form"
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
                                    <button className="btn btn-default btn btn-danger" type="submit">Submit</button>
                                </span>
                            </form>
                    </div>
                </div>
                <div className="col-sm-8">
                    <div className="well">
                        <div><h1 id="pageheader">Campuses</h1>
                            <hr />
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Students</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        campuses.map((campus) => {
                                            let studentsOnCampus = students.filter((student) => {
                                                return student.campusId === campus.id
                                            })
                                            return (
                                                <tr key={campus.id} >
                                                    <th scope="row">{campus.id}</th>
                                                    <td><Link to={`/campuses/${campus.id}`}>{campus.name}</Link></td>
                                                    <td>{studentsOnCampus.length}</td>
                                                    <td>
                                                        {
                                                            studentsOnCampus.length <= 0 ? <button type="button" className="btn btn-danger" onClick={(event) => props.handleDelete(event, campus.id)}>Delete</button> : `Please move students before deleting`
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-sm-2" />
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
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleCampusChange(event) {
            dispatch(writeCampus(event.target.value));
        },
        handleDelete(event, id) {
            dispatch(destroyCampus(id));
        },
        handleSubmit(event) {
            event.preventDefault();
            dispatch(createCampus(event.target.name.value));
            dispatch(writeCampus(''));
        }
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(AllCampuses)

export default Container;
