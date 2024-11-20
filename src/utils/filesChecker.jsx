import RosterFileNames from "../constants/RosterFileNames";

const { SFF, OneRoster } = RosterFileNames;

const checkFiles = (files) => {
  // Use regex to strip any directory path from the file names
  const cleanedFiles = files.map((file) => file.replace(/^.*\//, ""));

  //Verify that the correct SFF file names are present
  if (
    SFF.some((value) => cleanedFiles.includes(value)) &&
    !SFF.some((value) => !cleanedFiles.includes(value)) &&
    files.length >= 3
  ) {
    return "Simple File Format";
  }

  //Verify that the correct OneRoster file names are present
  if (
    OneRoster.some((value) => cleanedFiles.includes(value)) &&
    !OneRoster.some((value) => !cleanedFiles.includes(value)) &&
    cleanedFiles.length >= 4
  ) {
    return "OneRoster";
  }

  // If files contain a mix of formats or unknown files
  return "Invalid files";
};

export default checkFiles;
