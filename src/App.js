import React from 'react';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import './App.css';
import './tab.scss';
import { createStore} from 'redux';
import { Provider, connect } from 'react-redux';
 
 
 



class DynamicForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fields: ["home", "about", "tools"],counter: 0, showWarning: true, isInputDisabled: true, isFormGroupDeletionAllowed: false, type:'text'};
    this.onClickButtonAdder = this.onClickButtonAdder.bind(this);
    this.onClickButtonSubmit = this.onClickButtonSubmit.bind(this);
    this.onToggleInput = this.onToggleInput.bind(this);
    this.onToggleClick = this.onToggleClick.bind(this);
  }

  onClickButtonAdder(event) {
    event.preventDefault();
 
    this.setState({
      // fields: [...this.state.fields, ""],
      fields:  this.state.fields.length > 12 ? [...this.state.fields]: [...this.state.fields, ""],
      counter: this.state.counter + 1,
      
       
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

     console.log(index)
  }


  onClickButtonSubmit(event) {
    event.preventDefault();
    const filteredValues = this.state.fields.filter(value => value);
    alert(filteredValues);
    console.log(filteredValues)
  }
  
 


  onTabClick() {
    alert("tab clicked")
  }
  onToggleClick() {
    alert("clicked")  
  }
 
  onToggleInput(event ) {
    event.preventDefault();
    // let type = [...this.state.type];
    // this.setState({   isInputDisabled: false});
    if (!this.state.popupVisible) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
 
   
 
    this.setState(prevState => ({
      isInputDisabled: !prevState.isInputDisabled,
      type: !prevState.type,
      popupVisible: !prevState.popupVisible,
       
    }));

    // this.setState({
    //   type
      
    // });
 
     }


   
  render() {
  
   
    
// const isFormGroupDeletionAllowed =
// this.state.fields.length > 1 ? true : false;

const isFormGroupDeletionAllowed =
this.state.isInputDisabled === true ?  false : true;


 
     
 
    return (
      <div className="dynamicForm" ref={node => { this.node = node; }}>
        
        <div className="Tabs">
        
         
        <span>
      
        {this.state.fields.map((value, index, isInputDisabled , type) => (
          <FormGroup
            inputChange={this.onChangeFormGroupInput.bind(this, index)}
            buttonClick={this.onClickFormGroupButton.bind(this, index)}
            buttonDisabled={this.state.isInputDisabled === true ? !isFormGroupDeletionAllowed : undefined}
            value={value}
            key={index}
            type={this.state.isInputDisabled === true ? "button": "input"}
            inputType={this.onChangeFormGroupInputType.bind(this, index)} 
            // isDisabled={this.state.isInputDisabled}  //veto power
          />
        ))}
        </span >
        
      
        {this.state.popupVisible && (
           <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 512 512"  className="addSign"  onClick={this.onClickButtonAdder}>
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
          <FormButton  click={this.onToggleInput} innerHtml="edit" />
          <FormButton click={this.onClickButtonSubmit} innerHtml="save" />
          </div>
      </div>
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
        onClick={props.inputType}
         
      />
  
   
      {/* <button
        className="dynamicForm__itemButton"
        type="button"
        onClick={props.buttonClick}
        disabled={props.buttonDisabled}
        tabIndex="-1"
  >-</button> */}

</div>
 
   <div  tabIndex="-1" onClick={props.buttonClick}>
     <Provider  store={store}>
       <div className="reduxContianer1"><MenuContainer /></div> 
    </Provider>  
   
  </div>  
    </div>
  );
}
 
function App() {
  return (
    <div className="App">
    
      <header className="App-header">
      <DynamicForm />
     
      </header>
      {/* <Provider store={store}>
      <div>
        <button onClick={onClickButton}>Toggle menu!</button>
      </div>
    </Provider> */}
 
  
    </div>
  );
}
 
 
 //Import any modules from libraries

 

function toggleMenu (state) {
  var newState = Object.assign({}, state)
  newState.showMenu = !newState.showMenu
  return newState;
}


function reducer (state = {}, action) {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return toggleMenu(state);
  }
  return state;
}

const store = createStore(reducer);

const onClickButton = () => {
  store.dispatch({
    type: 'TOGGLE_MENU'
  })
}

const Menu = ({showMenu}) => {
  return(
    <div>
      { showMenu ?
      <div>
       x
      </div> :
      '' }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    showMenu: state.showMenu
  };
}

const MenuContainer = connect(mapStateToProps)(Menu);

 


 
 



export default App;
