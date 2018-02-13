import React, { Component, } from 'react';
import { Route, NavLink, Switch, withRouter, } from 'react-router-dom'
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
    const { addFeed, history, } = this.props;
    addFeed(newFeed);
    history.push(`/${newFeed}`);
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

class RSSFeed extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      items: [],
      error: '',
    }
  }

  componentDidMount() {
    function checkStatus(response) {
      if (response.status === "ok") {
        return response
      } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
      }
    }
    const { activeFeed, } = this.props;
    const jsonFeedAPI = 'https://api.rss2json.com/v1/api.json?rss_url=';
    fetch(jsonFeedAPI + activeFeed)
    .then(res => {console.log(res); return res.json()})
    .then(res => checkStatus(res))
    .then(res => (
      this.setState({
        loading: false,
        items: res.items,
      })
    ))
    .catch(err => (
      this.setState({
        loading: false,
        error: err.response.message,
      })
    ))
  }
  render() {
    const { loading, items, error, } = this.state;
    if (loading) {
      return <Loading />
    }
    if (error) {
      return <ErrorMessage message={ error } />
    }
    return <ItemsList items={ items } />;
  }
}

function ItemsList({ items, }) {
  const Items = () => (
    <React.Fragment>
      
    </React.Fragment>
  )

  return (
    <ul>

    </ul>
  )
}

function SideBar({ feedsList, addFeed, removeFeed, }) {
  const RSSInputFormWithHistory = withRouter(RSSInputForm);
  return (
    <div className="sidebar">
      <div className="sidebar__RSSInputContainer">
         <RSSInputFormWithHistory addFeed={ addFeed }/>
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
        <h1> { activeFeed } </h1>
      </div>
      <div className="main__feedContainer">
        <RSSFeed activeFeed={ activeFeed }/>
      </div>
    </React.Fragment>
  );
}

function ErrorMessage({ message, }) {
  return (
      <div className="main__errorMessageContainer">
        <h1> {message} </h1>
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
          <Route path="/:illegalRoute" render={() => (
            <ErrorMessage message={ 'There is no feed associataed with this route' } />
          )} />
        </Switch>
      </div>
    </div>
  );  
}
