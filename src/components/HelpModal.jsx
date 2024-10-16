import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="link" className="text-decoration-none" onClick={handleShow}>
        Help
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>
              Please make sure to include the users.csv, classassignments.csv,
              and class.csv for the Simple File Format (SFF) and users.csv,
              enrollments.csv, classes.csv, and orgs.csv for OneRoster.
            </li>
            <br></br>
            <li>
              You can upload the complete zipped folder containing either the
              SFF or OneRoster files.
            </li>
          </ul>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Example;
