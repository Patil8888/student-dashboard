
let studentData = [];

window.onload = function() {
  // Load data from localStorage if exists
  const dataStr = localStorage.getItem('studentData');
  if (dataStr) {
    try {
      studentData = JSON.parse(dataStr);
    } catch (e) {
      console.error("Error parsing student data from localStorage:", e);
      studentData = [];
    }
  }
};

function sanitize(str) {
  // Convert to lowercase and trim whitespace for case-insensitive search
  return str ? str.toString().toLowerCase().trim() : "";
}

function searchStudent() {
  const enrollmentInput = document.getElementById("enrollment").value;
  const ugInput = document.getElementById("ugnumber").value;

  const sanitizedEnroll = sanitize(enrollmentInput);
  const sanitizedUG = sanitize(ugInput);

  // Find the student by Enrollment Number or UG Number
  const found = studentData.find(student => {
    // Adjust property names based on your dataset
    const studentEnroll = sanitize(student.EnrollmentNumber);
    const studentUG = sanitize(student.UGNumber);
    return studentEnroll === sanitizedEnroll || studentUG === sanitizedUG;
  });

  const infoDiv = document.getElementById("student-info");
  if (found) {
    let html = "<h2>Student Details:</h2><ul>";
    for (let key in found) {
      // Format property names nicely if needed
      html += `<li><strong>${key}:</strong> ${found[key]}</li>`;
    }
    html += "</ul>";
    infoDiv.innerHTML = html;
  } else {
    infoDiv.innerHTML = "<p>No student found. Check your entry and try again.</p>";
  }
}




