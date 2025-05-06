import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ViewDetails() {
  const { studentid } = useParams(); // This pulls "studentid" from the URL
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    //  we're passing a string, not an object
    fetch(`http://localhost:8000/students/${studentid}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setStudent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [studentid]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!student) return <div>No student found</div>;

  return (
    <div className="container">
      <h2>Student Details</h2>
      <p><strong>ID:</strong> {student.id}</p>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Place:</strong> {student.place}</p>
      <p><strong>Phone:</strong> {student.phone}</p>
      <Link to="/">Back</Link>
    </div>
  );
}