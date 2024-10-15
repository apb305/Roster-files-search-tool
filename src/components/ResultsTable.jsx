import React from "react";
import Table from "react-bootstrap/Table";

function ResultsTable({ title, data }) {
  return (
    <div className="mt-3">
      <h4>{title}</h4>
      {data && data.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              {Object.keys(data[0]).map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((value, colIndex) => (
                  <td key={colIndex}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No {title.toLowerCase()} found.</p>
      )}
    </div>
  );
}

export default ResultsTable;
