import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { checkUser, registerUser } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function RegisterForm() {
  const user = useAuth();
  const [formData, setFormData] = useState({
    bio: '',
    uid: user.user.uid,
    userName: '',
    city: '',
    state: '',
    emailAddress: user.userEmail,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(checkUser(user.user.uid)).then(() => {
      window.location.reload();
    });
  };

  const handleChange = ({ target }) => {
    setFormData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  return (
    <Form className="registerForm" onSubmit={handleSubmit}>
      <Form.Group className="mb-3 registerInputs topInput" controlId="formBasicEmail">
        <Form.Control
          as="textarea"
          name="userName"
          required
          placeholder="Enter your Username"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3 registerInputs" controlId="password">
        <Form.Control
          as="textarea"
          name="password"
          required
          placeholder="Enter your Bio"
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="outline-success" className="registerButton" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
};

export default RegisterForm;
