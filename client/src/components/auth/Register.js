import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser} from '../../actions/authAction';
import{ withRouter} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
class Register extends Component {
  constructor() {
      super();
      this.state = {
          name: '',
          email:'',
          password:'',
          password2:'',
          errors:{}
      }

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }
  onChange(e) { /*  e is event, whenever we type this will change*/
      this.setState({[e.target.name]: e.target.value}); /* to change component */
  }

  onSubmit(e) { /*  e is event, whenever we type this will change*/
    e.preventDefault();
    
    const newUser = {
        name: this.state.name,
        email:this.state.email,
        password:this.state.password,
        password2: this.state.password2
    };
this.props.registerUser(newUser, this.props.history);

   
}
  
  
    render() {

        const {errors} = this.state;


        return (
        <div className="register">
        <div className="dark-overlay2 landing-inner text-light"></div>
         <div className ="container">
          <div className="row">
            <div className="col-md-8 m-auto">
            
              <h1 className="display-4 text-center text-dark">Sign Up</h1>
              <p className="lead text-center text-dark">Create your DevConnector account</p>
              <form noValidate onSubmit ={this.onSubmit}>
              <TextFieldGroup
              placeholder="Name"
              name = "name"
              value = {this.state.name}
              onChange = {this.onChange}
              error = {errors.name} />

         <TextFieldGroup
              placeholder="Email Address"
              name = "email"
              type = "email"
              value = {this.state.email}
              onChange = {this.onChange}
              error = {errors.email}
              info = "This site uses Gravatar so if you want a profile image, use a Gravatar email" />
               <TextFieldGroup
              placeholder="Password"
              name = "password"
              type = "password"
              value = {this.state.password}
              onChange = {this.onChange}
              error = {errors.password} />
                 <TextFieldGroup
              placeholder="Confirm Password"
              name = "password2"
              type = "password"
              value = {this.state.password2}
              onChange = {this.onChange}
              error = {errors.password2} />
                <input type="submit" className="btn btn-dark btn-block" />
              </form>
            </div>
          </div>
        </div>
        </div>
    )
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, { registerUser})(withRouter(Register));
