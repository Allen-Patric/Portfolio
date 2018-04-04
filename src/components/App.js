import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../styles/App.css';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const RedditPost = props => {
  return (
    <Card className="post-card">
      <CardHeader
        title={props.info.title}

        subtitle={props.info.author}
        actAsExpander={props.info.is_self === true}
        showExpandableButton={false}
      />

      <CardText expandable={props.info.is_self === true}>
        {props.info.selftext}
      </CardText>
      <CardActions>
        <FlatButton label="View Post" onClick={() => {
          window.open(props.info.url);
        }} />

      </CardActions>
    </Card>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      lastPostName: ''
    };
  }

  fetch(url) {
    var that = this;
    if (url) {
      fetch('https://www.reddit.com/r/' + url + '.json' + '?count=' + 25 + '&after=' + this.state.lastPostName)
        .then((response) => response.json())
        .then((result) => {
          that.setState({
            posts: result.data.children,
            lastPostName: result.data.children[result.data.children.length - 1].data.name
          });
        });
    }
  }
  componentWillMount() {
    this.fetch("reactjs");
  }


  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar
            title={"Reactjs Reddit"}
            showMenuIconButton={false}
            iconElementRight={<FlatButton onClick={() => this.fetch('reactjs')} label="next" />
            }
          />
          <div className="container">
            {this.state.posts.map(function (el, index) {
              return <RedditPost info={el.data} key={index} />
            })}
            <FlatButton onClick={() => this.fetch('reactjs')} label="more" />
          </div>
        </div>

      </MuiThemeProvider >

    );
  }
}

export default App;
