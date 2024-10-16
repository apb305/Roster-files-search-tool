import { useState } from "react";
import Papa from "papaparse";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import MyDropzone from "./components/DropZone";
import FileList from "./components/FileList";
import SearchBar from "./components/SearchBar";
import ResultsTable from "./components/ResultsTable";
import JSZip from "jszip";
import checkFiles from "./utils/filesChecker";
import HelpModal from "./components/HelpModal";

function App() {
  const [csvData, setCsvData] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [filteredUserData, setFilteredUserData] = useState(null);
  const [classAssociations, setClassAssociations] = useState([]);
  const [fileType, setFileType] = useState("");
  const [searchMethod, setSearchMethod] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [orgAssociations, setOrgAssociations] = useState([]);
  const [fileTimes, setFileTimes] = useState([]);

  // Function to handle file selection and parsing with Papa Parse
  const handleFileDrop = (acceptedFiles) => {
    setErrorMessage("");
    setSelectedFiles(acceptedFiles);
    const filePromises = acceptedFiles.map(async (file) => {
      //Handle zip file
      if (file.name.endsWith(".zip")) {
        const zip = new JSZip();
        const zipData = await zip.loadAsync(file);
        const extractedFiles = [];

        for (const fileName in zipData.files) {
          if (zipData.files[fileName].name.endsWith(".csv")) {
            const fileContent = await zipData.files[fileName].async("text");
            Papa.parse(fileContent, {
              header: true,
              complete: (result) => {
                extractedFiles.push({
                  name: fileName,
                  data: result.data,
                });
              },
            });
          }
        }
        setSelectedFiles(extractedFiles);

        return extractedFiles;
      } else {
        return new Promise((resolve, reject) => {
          Papa.parse(file, {
            header: true,
            complete: (result) => {
              resolve({ name: file.name, data: result.data });
            },
            error: (error) => reject(error),
          });
        });
      }
    });

    // Wait for all files to be parsed
    Promise.all(filePromises).then((parsedFiles) => {
      //Flatten any nested arrays (in case of zip files with multiple CSVs)
      const flatFiles = parsedFiles.flat();

      let usersFile,
        classAssignmentsFile,
        classFile,
        enrollmentsFile,
        classesFile,
        orgsFile;

      //Get the names of the files
      const fileNames = flatFiles.map((item) => item.name);

      // Detect file type (SFF or OneRoster) based on file names
      const result = checkFiles(fileNames);

      if (result === "Simple File Format") {
        // Simple File Format (SFF)
        setFileType("Simple File Format");
        setSearchMethod("Enter LASID or Email");
        flatFiles.forEach((parsedFile) => {
          if (parsedFile.name.toLowerCase().includes("users")) {
            usersFile = parsedFile;
          } else if (
            parsedFile.name.toLowerCase().includes("classassignments")
          ) {
            classAssignmentsFile = parsedFile;
          } else if (parsedFile.name.toLowerCase().includes("class")) {
            classFile = parsedFile;
          }
        });
        if (usersFile && classAssignmentsFile && classFile) {
          setCsvData([usersFile, classAssignmentsFile, classFile]);
        }
      } else if (result === "OneRoster") {
        // OneRoster Format
        setFileType("OneRoster");
        setSearchMethod("Enter sourcedId or Email");
        flatFiles.forEach((parsedFile) => {
          if (parsedFile.name.toLowerCase().includes("users")) {
            usersFile = parsedFile;
          } else if (parsedFile.name.toLowerCase().includes("enrollments")) {
            enrollmentsFile = parsedFile;
          } else if (parsedFile.name.toLowerCase().includes("classes")) {
            classesFile = parsedFile;
          } else if (parsedFile.name.toLowerCase().includes("orgs")) {
            orgsFile = parsedFile;
          }
        });
        if (usersFile && enrollmentsFile && classesFile && orgsFile) {
          setCsvData([usersFile, enrollmentsFile, classesFile, orgsFile]);
        }
      } else if (result === "Invalid files") {
        setErrorMessage("Please make sure to include at least users.csv, classassignments.csv, and class.csv for the Simple File Format (SFF) and users.csv, enrollments.csv, classes.csv, and orgs.csv for OneRoster.");
      }
    });
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle search submit
  const handleSearchSubmit = () => {
    if (!searchQuery) {
      return;
    }

    let results;
    if (fileType === "Simple File Format") {
      results = crossReferenceSFF();
    } else if (fileType === "OneRoster") {
      results = crossReferenceOneRoster();
    }

    if (!results.user) {
      setFilteredUserData(null);
      setClassAssociations([]);
    } else {
      setFilteredUserData(results.user);
      setClassAssociations(results.classes);
      setOrgAssociations(results.orgs);
    }

    setSearchPerformed(true);
  };

  // Cross-reference logic for Simple File Format (SFF)
  const crossReferenceSFF = () => {
    const usersFile = csvData[0].data;
    const classAssignmentsFile = csvData[1].data;
    const classFile = csvData[2].data;

    // Find the user by LASID or EMAIL
    const matchedUser = usersFile.find(
      (user) =>
        user["LASID"]?.toLowerCase() === searchQuery.toLowerCase() ||
        user["PRIMARYEMAIL"]?.toLowerCase() === searchQuery.toLowerCase()
    );

    if (!matchedUser) return { user: null, classes: [] };

    // Find all class assignments for that LASID
    const matchingAssignments = classAssignmentsFile.filter(
      (assignment) => assignment["LASID"] === matchedUser["LASID"]
    );

    // Find all classes for those CLASSLOCALIDs
    const matchingClasses = matchingAssignments.map((assignment) =>
      classFile.find(
        (cls) => cls["CLASSLOCALID"] === assignment["CLASSLOCALID"]
      )
    );

    return { user: matchedUser, classes: matchingClasses };
  };

  // Cross-reference logic for OneRoster
  const crossReferenceOneRoster = () => {
    const usersFile = csvData[0].data;
    const enrollmentsFile = csvData[1].data;
    const classesFile = csvData[2].data;
    const orgsFile = csvData[3].data;

    // Find the user by sourcedId or email
    const matchedUser = usersFile.find(
      (user) =>
        user["sourcedId"]?.toLowerCase() === searchQuery.toLowerCase() ||
        user["email"]?.toLowerCase() === searchQuery.toLowerCase()
    );

    if (!matchedUser) return { user: null, classes: [], orgs: [] };

    // Find all enrollments for that sourcedId
    const matchingEnrollments = enrollmentsFile.filter(
      (enrollment) => enrollment["userSourcedId"] === matchedUser["sourcedId"]
    );

    // Find all classes for those classSourcedIds
    const matchingClasses = matchingEnrollments.map((enrollment) =>
      classesFile.find(
        (cls) => cls["sourcedId"] === enrollment["classSourcedId"]
      )
    );

    // Find all organizations for the orgSourcedIds
    let orgSourcedIds = matchedUser["orgSourcedIds"];
    let matchingOrgs = [];

    if (orgSourcedIds) {
      const orgIdsArray = orgSourcedIds.split(",").map((id) => id.trim());
      matchingOrgs = orgIdsArray
        .map((orgId) => orgsFile.find((org) => org["sourcedId"] === orgId))
        .filter(Boolean); // Filters out any null/undefined results
    }

    return { user: matchedUser, classes: matchingClasses, orgs: matchingOrgs };
  };

  return (
    <Container className="text-center">
      <Row>
        <Col>
          <div className="mt-5">
            <h4>Roster Files Lookup Tool</h4>
            <small>Version 1.0.0</small>
          </div>
          <div>
            <HelpModal/>
            </div>

          <div className="border p-3 mt-5">
            <Form.Group
              controlId="formFileMultiple"
              className="mb-3 text-start"
            >
              <MyDropzone onDropFiles={handleFileDrop} />
              <Form.Label className="mt-2">
                <strong>Selected files: </strong>
                <FileList selectedFiles={selectedFiles} fileType={fileType} />
              </Form.Label>
            </Form.Group>

            {errorMessage ? (
              <p className="text-danger">{errorMessage}</p>
            ) : (
              selectedFiles.length > 0 && (
                <SearchBar
                  searchQuery={searchQuery}
                  handleSearchChange={handleSearchChange}
                  handleSearchSubmit={handleSearchSubmit}
                  searchMethod={searchMethod}
                />
              )
            )}
          </div>

          {/* Conditionally render tables based on searchPerformed and fileType */}
          {searchPerformed && (
            <>
              <ResultsTable title="User Data" data={[filteredUserData]} />
              <ResultsTable
                title="Class Associations"
                data={classAssociations}
              />
              {fileType === "OneRoster" && (
                <ResultsTable title="Org Associations" data={orgAssociations} />
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
