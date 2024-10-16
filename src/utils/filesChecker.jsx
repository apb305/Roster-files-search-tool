import RosterFileNames from "../constants/RosterFileNames";

const { SFF, OneRoster } = RosterFileNames;

const checkFiles = (files) => {
  // Use regex to strip any directory path from the file names
  const cleanedFiles = files.map((file) => file.replace(/^.*\//, ""));

  // Check if at least one file matches SFF, and no file outside of SFF is present
  if (
    SFF.some((value) => cleanedFiles.includes(value)) &&
    !SFF.some((value) => !cleanedFiles.includes(value)) &&
    files.length >= 3
  ) {
    return "Simple File Format";
  }

  // Check if at least one file matches OneRoster, and no file outside of OneRoster is present
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