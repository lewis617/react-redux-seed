import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Helmet from 'react-helmet';
import LoadingBar from './LoadingBar';
import config from '../../../config';

class Main extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  };

  render() {
    require('./index.scss');

    return (
      <div>
        <Helmet {...config.app.head}/>
        <LoadingBar />
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/">
                <span>{config.app.title}</span>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav navbar pullRight>
              <LinkContainer to="/counter">
                <NavItem>计数器</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div>
          {/* this will render the child routes */}
          {React.cloneElement(this.props.children, this.props)}
        </div>
      </div>
    );
  }
}

export default Main;
