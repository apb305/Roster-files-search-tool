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
          <h4>How to use the app:</h4>
          <ul>
            <li>
              This app enables you to update <a href="https://support.hmhco.com/s/article/Simple-File-Format-SFF-Overview-Core-Platforms-ThinkCentral-Holt-McDougal-Online-Ed-Your-Friend-in-Learning" target="_blank" rel="noopener noreferrer">Simple File Format (SFF)</a> or <a href="https://s3.amazonaws.com/downloads.hmlt.hmco.com/Help/ImportMngmt/Administrator/OneRoster_Template_Files/About_OneRoster_Template_Files.htm" target="_blank" rel="noopener noreferrer">OneRoster</a> CSV files and search for users. Its primary purpose is to compare the data in the import files with the existing data on the site.
            </li>
            <br></br>
            <li>
              The following minimum files are required before uploading:
              <ul>
                <li className="mt-2">
                  <strong>Simple File Format (SFF):</strong> users.csv, classassignments.csv, and class.csv.
                </li>
                <li className="mt-2">
                  <strong>OneRoster:</strong> users.csv, enrollments.csv, classes.csv, and orgs.csv files.
                </li>
              </ul>
            </li>
            <br></br>
            <li>
              You can either click to upload or drag and drop a zipped or extracted folder containing the SFF or OneRoster files.
            </li>
          </ul>
          <h4>Demo:</h4>
          <a href="/images/demo.png" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
            Click here to view demo
          </a>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Example;
