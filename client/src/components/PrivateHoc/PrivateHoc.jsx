import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from '../../store/slices/userSlice';
import Spinner from '../Spinner/Spinner';
import LoginPage from '../../pages/LoginPage/LoginPage';

const PrivateHoc = (Component, props) => {
  class Hoc extends React.Component {
    componentDidMount() {
      if (!this.props.data) {
        this.props.getUser();
        this.props.history.push('/login');
      }
    }
    render() {
      return (
        <>
          {this.props.isFetching && <Spinner />}
          {this.props.data && !this.props.isFetching && (
            <Component
              history={this.props.history}
              match={this.props.match}
              {...props}
            />
          )}
        </>
      );
    }
  }

  const mapStateToProps = (state) => state.userStore;

  const mapDispatchToProps = (dispatch) => ({
    getUser: () => dispatch(getUser()),
  });

  return connect(mapStateToProps, mapDispatchToProps)(Hoc);
};

export default PrivateHoc;
