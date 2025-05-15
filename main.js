window.onload = function () {
  Tabletop.init({
    key: 'your-google-sheet-key', // Replace with your actual Google Sheet key
    callback: showData,
    simpleSheet: true
  });
};

function showData(data) {
  const enrollmentForm = document.getElementById('enrollmentForm');
  const studentDataDiv = document.getElementById('studentData');

  enrollmentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const enrollmentNumber = document.getElementById('enrollmentNumber').value;
    const student = data.find(student => student.enrollment_number === enrollmentNumber);

    if (student) {
      const studentInfo = `
        <table>
          <tr><th>Enrollment Number</th><td>${student.enrollment_number}</td></tr>
          <tr><th>Name</th><td>${student.name}</td></tr>
          <tr><th>Course</th><td>${student.course}</td></tr>
          <tr><th>Year</th><td>${student.year}</td></tr>
        </table>
      `;
      studentDataDiv.innerHTML = studentInfo;
    } else {
      studentDataDiv.innerHTML = '<p>No student found with this enrollment number.</p>';
    }
  });
}



