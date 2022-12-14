import React, { Component } from 'react';
import { connect } from 'react-redux';
import Payments from './Payments';
import { Link } from 'react-router-dom';



class Header extends Component {
  renderContent() {
    switch (this.props.auth.isLogIn) {
      //case null:
      //  return 'Still deciding';
      case false:
        return <li><a href="/auth/google">Login With Google</a></li>;
      default:
        return [
          <li key="1"><Payments /></li>,
          <li key="3" style={{ margin: '0 10px' }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="2"><a href="/api/logout">Logout</a></li>
        ]
    }
  }

  componentDidMount=()=>{
    console.log(`what is current auth state ${this.props.auth}`)
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth.isLogIn ? '/surveys' : '/'}
            className="left brand-logo"
          >
            Emaily
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state =>{
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Header);
