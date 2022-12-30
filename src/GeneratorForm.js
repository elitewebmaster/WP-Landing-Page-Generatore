import { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

var obj = {
  templateName: "",
  name: false,
  fullName: false,
  firstName: false,
  lastName: false,
  email: false,
  phone: false,
  company: false,
  jobTitle: false,
  note: false,
  message: false,
  website: false,
  zip: false,
};

const GeneratorForm = ({ setGenerator }) => {
  const [preferences, setPreferences] = useState(obj);
  const [alert, setAlert] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setPreferences((values) => ({
      ...values,
      [name]:
        typeof preferences[name] === "boolean" ? !preferences[name] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let showAlert = true;

    if (preferences.templateName !== "") {
      Object.entries(preferences).forEach((element, i) => {
        if (typeof element[1] === "boolean" && element[1]) {
          showAlert = false;
        }
      });
    }

    setAlert(showAlert);
    if (!showAlert) setGenerator(preferences);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setPreferences(obj);
    setGenerator(null);
    setAlert(false);
  };

  return (
    <section
      id="landing"
      className="box-green row mt-4 mb-4 overflow-x-hidden container-fluid"
    >
      <Form onSubmit={handleSubmit} onReset={handleReset}>
        <Container>
          <Row>
            <Col xs={12} md={4}>
              <Form.Group className="mb-3" controlId="templateName">
                <Form.Label>WordPress Page Template Name</Form.Label>
                <Form.Control
                  type="text"
                  name="templateName"
                  placeholder="Temeplate Name"
                  onChange={handleChange}
                  value={preferences["templateName"]}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={3}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Check
                  name="name"
                  type="switch"
                  label="Name"
                  onChange={handleChange}
                  checked={preferences["name"]}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="fullName">
                <Form.Check
                  name="fullName"
                  type="switch"
                  label="Full Name"
                  onChange={handleChange}
                  checked={preferences["fullName"]}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Check
                  name="firstName"
                  type="switch"
                  label="First Name"
                  onChange={handleChange}
                  checked={preferences["firstName"]}
                />
              </Form.Group>
            </Col>
            <Col sm={12} md={3}>
              <Form.Group className="mb-3" controlId="lastName">
                <Form.Check
                  name="lastName"
                  type="switch"
                  label="Last Name"
                  onChange={handleChange}
                  checked={preferences["lastName"]}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Check
                  name="email"
                  type="switch"
                  label="Email Address"
                  onChange={handleChange}
                  checked={preferences["email"]}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="phone">
                <Form.Check
                  name="phone"
                  type="switch"
                  label="Phone Number"
                  onChange={handleChange}
                  checked={preferences["phone"]}
                />
              </Form.Group>
            </Col>
            <Col sm={12} md={3}>
              <Form.Group className="mb-3" controlId="company">
                <Form.Check
                  name="company"
                  type="switch"
                  label="Company"
                  onChange={handleChange}
                  checked={preferences["company"]}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="jobTitle">
                <Form.Check
                  name="jobTitle"
                  type="switch"
                  label="Job Title"
                  onChange={handleChange}
                  checked={preferences["jobTitle"]}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="note">
                <Form.Check
                  name="note"
                  type="switch"
                  label="Note"
                  onChange={handleChange}
                  checked={preferences["note"]}
                />
              </Form.Group>
            </Col>
            <Col sm={12} md={3}>
              <Form.Group className="mb-3" controlId="message">
                <Form.Check
                  name="message"
                  type="switch"
                  label="Message"
                  onChange={handleChange}
                  checked={preferences["message"]}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="website">
                <Form.Check
                  name="website"
                  type="switch"
                  label="Website"
                  onChange={handleChange}
                  checked={preferences["website"]}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="zip">
                <Form.Check
                  name="zip"
                  type="switch"
                  label="Zip Code"
                  onChange={handleChange}
                  checked={preferences["zip"]}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="primary" type="submit">
                Generate
              </Button>{" "}
              <Button variant="danger" type="reset">
                Reset
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              {alert && (
                <Alert variant="danger" className="mt-4">
                  Please select at least one input field & give the template a
                  name.
                </Alert>
              )}
            </Col>
          </Row>
        </Container>
      </Form>
    </section>
  );
};

export default GeneratorForm;
