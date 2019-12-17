import { hot } from 'react-hot-loader/root';
import React from 'react'
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { ThemeContext } from './ThemeContext'
import '../styles/main.less'
import Home from './Home'
import Topics from './Topics'
import About from './About'
import NoMatch from './NoMatch'
import ThemeTogglerButton from './ThemeTogglerButton'

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === "dark"
            ? "light"
            : "dark",
      }));
    };

    // State also contains the updater function so it will
    // be passed down into the context provider
    this.state = {
      theme: "dark",
      toggleTheme: this.toggleTheme,
    };
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        <ThemeContext.Consumer>
        {
          ({theme}) => (
            <Router>
              <div className={theme}>
                <div className="header">
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/about">About</Link>
                    </li>
                    <li>
                      <Link to="/topics">Topics</Link>
                    </li>
                  </ul>
                  <ThemeTogglerButton/>
                </div>
                <hr />
                <div className="container">
                  <Switch>
                  <Route exact path={'/'} component={Home} />
                  <Route path={'/about'} component={About} />
                  <Route path={'/topics'} component={Topics} />
                  <Route component={NoMatch} />
                </Switch>
                </div>

              </div>
            </Router>
          )
        }
        </ThemeContext.Consumer>
      </ThemeContext.Provider>
    )
  }
};

export default hot(Root)

