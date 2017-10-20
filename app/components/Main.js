
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import AllStudents from './AllStudents';
import AllCampuses from './AllCampuses';
import SingleStudent from './SingleStudent';
import SingleCampus from './SingleCampus';
import Home from './Home';
import { fetchStudents, fetchCampuses } from '../store/index';
import Navbar from './Navbar';
import { connect } from 'react-redux';

export class Main extends Component {
    componentDidMount () {
      this.props.fetchInitialData();
    }
  render () {
    return (
      <Router>
        <div>
          <main>
            <div>
            <Navbar />
            </div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/students" component={AllStudents} />
              <Route exact path="/students/:studentid" component={SingleStudent} />}
              <Route exact path="/campuses" component={AllCampuses} />
              <Route exact path="/campuses/:campusid" component={SingleCampus} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => {
  return {
     fetchInitialData: () => {
      dispatch(fetchStudents());
      dispatch(fetchCampuses());
     }
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Main)

export default Container;

