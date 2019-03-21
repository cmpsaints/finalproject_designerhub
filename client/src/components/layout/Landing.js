import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="dark-font display-3 mb-4">DesignerHub</h1>
                <p className="dark-font lead">
                  {" "}
                  create a freelance/client profile - share posts - network for
                  opportunities & talent
                </p>
                <br />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  sign up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  log in
                </Link>
                <p className="acknowledgement-style top-margin">
                  {" "}
                  <span className="">
                    <b>Acknowledgements/Shout-Outs:</b>
                  </span>
                  <br />- Special thanks to Pavan, Mark, & Manny at UCB Bootcamp
                  <br />- Shout out to "thenewboston" on YouTube for all the
                  extremely helpful
                  <br />
                  videos I consumed over the many months of this course
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

let mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
