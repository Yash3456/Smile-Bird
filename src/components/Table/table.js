import React, { useState, useEffect } from "react";
import Table from "./Table2"; // Assuming your table component is in Table2
import axios from "axios";

const TableStructure = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  const fetchData = async () => {
    setLoading(true); // Show loading modal before fetching data
    try {
      const response = await axios.post(
        "http://localhost:9000/getapplications",
        {
          username: "Yash goyal", // Mocked username; can be dynamic
        }
      );
      const agents = await response.data;
      console.log(response.data, "DATA Fetched");
      setData(agents); // Update the table with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Hide loading modal after data is fetched
    }
  };

  return (
    <div>
      <h1
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 40,
        }}
      >
        Applicants List
      </h1>

      {/* Show loading modal */}
      {loading && (
        <div className="loading-modal">
          <div className="loading-content">
            <p>Loading...</p>
          </div>
        </div>
      )}

      {/* Pass the data and fetchData function to the Table component */}
      <Table data={data} fetchData={fetchData} />
    </div>
  );
};

export default TableStructure;
