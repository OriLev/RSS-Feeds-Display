import React, { Component, } from 'react';
import { Route, NavLink, Switch} from 'react-router-dom'
import './AppFrame.css';


class RSSInputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newFeed: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(e) {
    this.setState({ newFeed: e.target.value, })
  }

  handleSubmit(e) {
    const { newFeed, } = this.state;
    const { addFeed, } = this.props;
    addFeed(newFeed);
    this.setState({ newFeed: '', })
    e.preventDefault();
  }

  render() {
    const { handleSubmit, handleChange, } = this;
    const { newFeed, } = this.state;
    return (
      <form onSubmit={ handleSubmit }>
        <input type="url" value={ newFeed } onChange={ handleChange } />
        <input type="submit" value="add" />
      </form>
    );
  }
}

function RSSFeedsList({ feedsList, removeFeed, }) {
  return (
    <ul>
      {feedsList.map((feed, index) => (
        <li key={feed} >
          <NavLink to={`/${feed}`} activeClassName="activeLink">
            {feed}
          </NavLink>
          <input type="button" value="X" onClick={() => removeFeed(index)}/> 
        </li>
      ))}
    </ul>
  );
}

function RSSFeed() {
  return null;
}

function SideBar({ feedsList, addFeed, removeFeed, }) {
  return (
    <div className="sidebar">
      <div className="sidebar__RSSInputContainer">
         <RSSInputForm addFeed={ addFeed }/>
      </div>
      <div className="sidebar__RSSListContainer">
        <RSSFeedsList feedsList={ feedsList } removeFeed={ removeFeed }/>
      </div>
    </div>
  );
}

function MainScreen({ activeFeed }) {
  // const { activeFeed, } = match.params;
  return (
    <React.Fragment>
      <div className="main__headerContainer">
        <h1> {activeFeed} </h1>
      </div>
      <div className="main__feedContainer">
        <RSSFeed/>
      </div>
    </React.Fragment>
  );
}

function IllegalRoute({ match }) {
  const { illegalRoute, } = match.params;
  return (
      <div className="main__headerContainer">
        <h1> {illegalRoute} is not a valid route </h1>
      </div>
  );
}



export function AppFrame({ feedsList, addFeed, removeFeed, }) {
  console.log(feedsList)
  const sidebarProps = { feedsList, addFeed, removeFeed, }
  return (
    <div className="appWrapper">
      <SideBar { ...sidebarProps } />
      <div className="main">
        <Switch>
          {feedsList.map((feed) => (
            <Route 
              key={feed} 
              path={`/${feed}`} 
              render={() => <MainScreen activeFeed={feed} /> } 
            />
          ))}
          <Route path="/:illegalRoute" component={ IllegalRoute } />
        </Switch>
      </div>
    </div>
  );  
}
