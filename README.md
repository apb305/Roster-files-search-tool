# Roster files search tool
This application allows users to upload multiple CSV files for cross-referencing and searching across large datasets. It’s designed to handle different CSV formats, such as the Simple File Format (SFF) and OneRoster, and efficiently cross-reference data from multiple files. It features a drag-and-drop file upload interface, advanced parsing with Papa Parse, and dynamic searching capabilities.

## Key Features
- **Drag-and-Drop File Upload:** Users can easily upload CSV files using an intuitive drag-and-drop interface powered by ```react-dropzone```.
- **Flexible File Selection:**
  
    - Supports two formats:
      
      - **SFF:** Cross-references LASID and CLASSLOCALID across users, class assignments, and classes.
        
      - **OneRoster:** Cross-references sourcedId across users, enrollments, classes, and orgs (supports multiple orgSourcedIds per user).
    
    - The application auto-detects the file format based on the files uploaded.

-  **Dynamic Cross-Referencing:**

     - **SFF:** Cross-references LASID and CLASSLOCALID across users, class assignments, and classes.

     - **OneRoster:** Cross-references sourcedId across users, enrollments, classes, and orgs (supports multiple orgSourcedIds per user).
 
- **Interactive Search Functionality:**

     - Search by user identifier (LASID, sourcedId, or email).

     - Displays relevant user data along with associated class and organizational information.
     
- **Error Handling:**

    - Detects and informs users of missing or invalid files.

    - Provides user feedback for unmatched search queries.
    
- **Performance Metrics (Coming soon):**

    - Display file parsing time for each file uploaded, providing insight into how long each operation takes.


## Web Technologies
- React (Vite)
- Bootstrap (front-end framework to help build the UI)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/roster-files-search-tool.git
   ```
   ```
   cd roster-files-search-tool
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the application:
   ```
   npm run dev
   ```
### Usage

1. Drag and drop the required CSV files into the application.

2. Enter a search query (LASID, sourcedId, or email).

3. Review the cross-referenced data, which will be displayed in tabular format.
   
