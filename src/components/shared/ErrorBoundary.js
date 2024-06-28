import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            flexDirection: "column",
          }}
        >
          <h1>OOPS !</h1>
          <h3>Something went Wrong</h3>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
