import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Popup from 'react-popup';


class Prompt extends Component {
  constructor(props) {
      super(props);
      this.state = {
          value: this.props.defaultValue
      };

      this.onChange = (e) => this._onChange(e);
  }

  componentDidUpdate(prevProps, prevState) {
      if (prevState.value !== this.state.value) {
          this.props.onChange(this.state.value);
      }
  }

  _onChange(e) {
      let value = e.target.value;

      this.setState({value: value});
  }
  render() {
      return <input type="text" placeholder={this.props.placeholder} className="mm-popup__input" onChange={this.onChange} />;
  }
}
/** Prompt plugin */
Popup.registerPlugin('prompt', function (defaultValue, placeholder, callback) {
    let promptValue = null;
    let promptChange = function (value) {
        promptValue = value;
    };

    this.create({
        title: 'Please enter your name',
        content: <Prompt onChange={promptChange} placeholder={placeholder} value={defaultValue} />,
        buttons: {
            right: [{
                text: 'Save',
                className: 'success',
                action: function () {
                    callback(promptValue);
                    if(promptValue){
                      Popup.close();
                    }
                }
            }]
        }
    });
});

console.log('registered plugin');

export default Popup;

