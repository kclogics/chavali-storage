import React from "react";
// import { render } from "ReactDOM";
import { render, ReactDOM } from "react-dom";
import PropTypes from "prop-types";
import "./App.css";
import "./tab.scss";
import "./scroll.scss";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useParams,
  useRouteMatch
} from "react-router-dom";

const Dashboard = () => <h2>You are in the Dashboard</h2>;
const Home = () => <h2>You are in the home</h2>;
const About = () => <h2>You are in the about</h2>;

function Welcome(props) {
  return <h1>Hello, {props.value}</h1>;
}

class DynamicForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: ["home", "about", "tools"],
      counter: 0,
      showWarning: true,
      isInputDisabled: true,
      isFormGroupDeletionAllowed: false,
      type: "text"
    };
    this.onClickButtonAdder = this.onClickButtonAdder.bind(this);
    this.onClickButtonSubmit = this.onClickButtonSubmit.bind(this);
    this.onToggleInput = this.onToggleInput.bind(this);
    this.onToggleClick = this.onToggleClick.bind(this);
  }

  onClickButtonAdder(event) {
    event.preventDefault();

    this.setState({
      // fields: [...this.state.fields, ""],
      fields:
        this.state.fields.length > 12
          ? [...this.state.fields]
          : [...this.state.fields, ""],
      counter: this.state.counter + 1
    });

    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }

  onClickFormGroupButton(index) {
    let fields = [...this.state.fields];
    fields.splice(index, 1);
    this.setState({ fields });
  }

  onChangeFormGroupInput(index, event) {
    let fields = [...this.state.fields];
    fields[index] = event.target.value;
    this.setState({ fields });
  }

  onChangeFormGroupInputType(index, event) {
    event.preventDefault();
    const filteredValues = this.state.fields.filter(value => value);

    console.log(index);
  }

  onClickButtonSubmit(event) {
    event.preventDefault();
    const filteredValues = this.state.fields.filter(value => value);
    alert(filteredValues);
    console.log(filteredValues);
  }

  onTabClick() {
    alert("tab clicked");
  }
  onToggleClick() {
    alert("clicked");
  }

  onToggleInput(event) {
    event.preventDefault();
    // let type = [...this.state.type];
    // this.setState({   isInputDisabled: false});
    if (!this.state.popupVisible) {
      // attach/remove event handler
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
      isInputDisabled: !prevState.isInputDisabled,
      type: !prevState.type,
      popupVisible: !prevState.popupVisible
    }));

    // this.setState({
    //   type

    // });
  }

  render() {
    // const isFormGroupDeletionAllowed =
    // this.state.fields.length > 1 ? true : false;

    const isFormGroupDeletionAllowed =
      this.state.isInputDisabled === true ? false : true;
    return (
      <Router>
        <div
          className="dynamicForm"
          ref={node => {
            this.node = node;
          }}
        >
          <div className="Tabs">
            <span>
              {this.state.fields.map((value, index, isInputDisabled, type) => (
                <Link to={"/" + value}>
                  <FormGroup
                    // to={value}
                    inputChange={this.onChangeFormGroupInput.bind(this, index)}
                    buttonClick={this.onClickFormGroupButton.bind(this, index)}
                    buttonDisabled={
                      this.state.isInputDisabled === true
                        ? !isFormGroupDeletionAllowed
                        : undefined
                    }
                    value={value}
                    // key={index}
                    type={
                      this.state.isInputDisabled === true ? "button" : "input"
                    }
                    inputType={this.onChangeFormGroupInputType.bind(
                      this,
                      index
                    )}
                    // isDisabled={this.state.isInputDisabled}  //veto power
                  />
                </Link>
              ))}
            </span>
            {this.state.popupVisible && (
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 512 512"
                className="addSign"
                onClick={this.onClickButtonAdder}
              >
                <g id="icomoon-ignore"></g>
                <path d="M496 192h-176v-176c0-8.836-7.164-16-16-16h-96c-8.836 0-16 7.164-16 16v176h-176c-8.836 0-16 7.164-16 16v96c0 8.836 7.164 16 16 16h176v176c0 8.836 7.164 16 16 16h96c8.836 0 16-7.164 16-16v-176h176c8.836 0 16-7.164 16-16v-96c0-8.836-7.164-16-16-16z"></path>
              </svg>
            )}
            {/* <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 512 512"  className="addSign"  onClick={this.onClickButtonAdder}>
        <g id="icomoon-ignore"></g>
        <path d="M496 192h-176v-176c0-8.836-7.164-16-16-16h-96c-8.836 0-16 7.164-16 16v176h-176c-8.836 0-16 7.164-16 16v96c0 8.836 7.164 16 16 16h176v176c0 8.836 7.164 16 16 16h96c8.836 0 16-7.164 16-16v-176h176c8.836 0 16-7.164 16-16v-96c0-8.836-7.164-16-16-16z"></path>
        </svg> */}
          </div>
          <div className="right_nav">
            <Provider store={store}>
              <button onClick={onClickButton}>Remove</button>
            </Provider>
            {/* <FormButton click={this.onToggleInput} innerHtml="edit" /> */}
            <FormButton click={this.onClickButtonSubmit} innerHtml="save" />

            <FormButton click={this.onToggleInput} innerHtml="edit" />
          </div>
          <Link to="/dashboard">
            <button>dash</button>
          </Link>
        </div>
        <Route exact path="/dashboard" component={Dashboard} />
        {this.state.fields.map((value, index, isInputDisabled, type) => (
          <Route exact path={"/" + value}>
            {value}
          </Route>
        ))}
      </Router>
    );
  }
}

function FormButton(props) {
  let buttonType = props.type;
  let buttonModifierClassName = "";

  if (buttonType) {
    buttonType = `${buttonType[0].toUpperCase()}${buttonType.slice(1)}`; // capitalize
    buttonModifierClassName = `dynamicForm__button--is${buttonType}`;
  }

  return (
    <button
      className={`dynamicForm__button ${buttonModifierClassName}`}
      onClick={props.click}
    >
      {props.innerHtml}
    </button>
  );
}

function FormGroup(props) {
  return (
    <Router>
      <div className="FormGroup">
        {/* <Provider  store={store}>
        <MenuContainer />
    </Provider> */}
        <div>
          <input
            className="dynamicForm__itemInput"
            value={props.value}
            onChange={props.inputChange}
            disabled={props.isDisabled}
            type={props.type}
            // onClick={props.inputType}
          />

          {/* <button
        className="dynamicForm__itemButton"
        type="button"
        onClick={props.buttonClick}
        disabled={props.buttonDisabled}
        tabIndex="-1"
  >-</button> */}
        </div>

        <div tabIndex="-1" onClick={props.buttonClick}>
          <Provider store={store}>
            <div className="reduxContianer1">
              <MenuContainer />
            </div>
          </Provider>
        </div>
      </div>
    </Router>
  );
}

//Form component
class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };

    this.handleChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    console.log("Change detected. State updated" + name + " = " + value);
  }

  handleSubmit(event) {
    alert("submitted Link: " + this.state.name);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            {/* <label for="nameImput">Paste Link </label> */}

            <input
              className="form-group"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              id="nameImput"
              placeholder="Paste Link"
            />

            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

class LinkInput extends React.Component {
  render() {
    return (
      <div>
        <ContactForm />
      </div>
    );
  }
}

// react Router Path

// const ReactRouterPath = () => (
//   <div>
//     <h1>React Router Example</h1>
//     <ul>
//       <li>
//         <Link to="/dashboard">
//           <FormGroup type="input" />
//         </Link>
//       </li>
//       <li>
//         <Link to="/profile">Profile</Link>
//       </li>
//     </ul>

//     <div>
//       <Route path="/dashboard" component={Dashboard} />
//       <Route path="/profile" component={Profile} />
//     </div>
//   </div>
// );

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/">
          <header className="App-header">
            <LinkInput />
            <DynamicForm />
          </header>
          {/* <Provider store={store}>
      <div>
        <button onClick={onClickButton}>Toggle menu!</button>
      </div>
    </Provider> */}
          {/* <img src="https://www.google.com/s2/favicons?domain=www.facebook.in"></img> */}

          {/* <ReactRouterPath /> */}
        </Route>
      </div>
    </Router>
  );
}

//Import any modules from libraries

function toggleMenu(state) {
  var newState = Object.assign({}, state);
  newState.showMenu = !newState.showMenu;
  return newState;
}

function reducer(state = {}, action) {
  switch (action.type) {
    case "TOGGLE_MENU":
      return toggleMenu(state);
  }
  return state;
}

const store = createStore(reducer);

const onClickButton = () => {
  store.dispatch({
    type: "TOGGLE_MENU"
  });
};

const Menu = ({ showMenu }) => {
  return (
    <div>
      {showMenu ? (
        <svg class="svg-icon" viewBox="0 0 20 20" width="20px" height="20px">
          <path d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"></path>
        </svg>
      ) : (
        ""
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    showMenu: state.showMenu
  };
}

const MenuContainer = connect(mapStateToProps)(Menu);

export default App;
