import React from "react";
import ReactDOM from "react-dom";

class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <HelloMessage name="Taylor" />
  </React.StrictMode>,
  document.getElementById("root")
);
