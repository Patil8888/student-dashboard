window.onload = function() {
  Tabletop.init({
    key: 'YOUR_GOOGLE_SHEET_ID',  // Replace this with your Google Sheet ID
    callback: function(data, tabletop) {
      console.log(data);  // You can see the data structure in the console
      window.studentData = data;  // Store the data globally for later use
    },
    simpleSheet: true
  });

  // Handle form submission
  const form = document.getElementById('enrollmentForm');
  form.addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent the default form submission

    const enrollmentNumber = document.getElementById('enrollmentNumber').value;
    
    // Filter student data based on enrollment number
    const student = window.studentData.find(s => s['Enrollment No'] == enrollmentNumber);
    
    if (student) {
      // Display student data
      document.getElementById('studentData').innerHTML = `
        <h3>Student Information</h3>
        <table class="table">
          <tr><th>Name</th><td>${student.Name}</td></tr>
          <tr><th>Subject</th><td>${student.Subject}</td></tr>
          <tr><th>Grade</th><td>${student.Grade}</td></tr>
          <tr><th>Attendance (%)</th><td>${student['Attendance (%)']}</td></tr>
        </table>
      `;
    } else {
      // If no data found
      document.getElementById('studentData').innerHTML = '<p>No data found for this enrollment number.</p>';
    }
  });
};


