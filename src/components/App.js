import React from 'react';
import AppBar from 'material-ui/AppBar';
import '../styles/App.css';
import RedditFeed from './RedditFeed';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import MenuDrawer from './MenuDrawer';

const App = ({subreddit, actions, menu}) => (
  <div className="wrapper">
    <MenuDrawer 
      toggleMenu = {actions.toggleMenu}
      menu={menu}
    />
    <AppBar
      title={subreddit}
      showMenuIconButton={true}
      style={{ position: 'fixed' }}
      onLeftIconButtonClick={actions.toggleMenu}
    />
    <RedditFeed
      subreddit={subreddit}
    />
  </div>
);

const mapStateToProps = state => ({
  subreddit: state.subreddit,
  menu: state.view
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
