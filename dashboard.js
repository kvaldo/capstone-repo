document.addEventListener("DOMContentLoaded", function () {
    const ctx1 = document.getElementById("statsChart").getContext("2d");
    const ctx2 = document.getElementById("dailyChart").getContext("2d");
    const ctx3 = document.getElementById("osChart").getContext("2d");
    const ctx4 = document.getElementById("browserChart").getContext("2d");
    const studentTableBody = document.getElementById("studentTableBody");
    const sortBySelect = document.getElementById("sortBy");
    const filterTextInput = document.getElementById("filterText");

    // Data from EJS passed to the window object
    const students = window.studentsData;
    const statsData = window.statsData;
    const dailies = window.dailiesData;
    const metadata = window.metadata;

    //console.log(metadata);

    const osLabels = metadata.osCount.map(item => item.label);
    const osCounts = metadata.osCount.map(item => item.count);

    const browserLabels = metadata.browserCount.map(item => item.label);
    const browserCounts = metadata.browserCount.map(item => item.count);

    //console.log(osLabels, browserLabels, osCounts, browserCounts);

    // Render Chart.js statistics chart
    new Chart(ctx1, {
        type: "bar",
        data: {
            labels: ["Website Visits", "Form Visits", "Form Submissions"],
            datasets: [
                {
                    label: "Website Traffic",
                    data: [statsData.siteVisits, statsData.formVisits, statsData.formSubmissions],
                    backgroundColor: ["#faec91", "#f7e465", "#FD0"],
                    borderColor: ["#5E5E5E", "#333333", "#1f1f1f"],
                    borderWidth: 2,
                },
            ],
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } },
        },
    });

    // Render Chart.js daily submissions chart
    new Chart(ctx2, {
        type: "line",
        data: {
            labels: dailies.map((day) => day.date),
            datasets: [
                {
                    label: "Form Submissions (Last 7 Days)",
                    data: dailies.map((day) => day.submissions),
                    backgroundColor: "#e74c3c",
                    borderColor: "#c0392b",
                    borderWidth: 2,
                    fill: false,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true } },
        },
    });

    // Render Chart.js Operating Systems Chart
    new Chart(ctx3, {
        type: "pie",
        data: {
            labels: osLabels,
            datasets: [{
                label: "Operating Systems",
                data: osCounts,
                backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true } },
        },
    });

    // Render Chart.js Browser Chart
    new Chart(ctx4, {
        type: "pie",
        data: {
            labels: browserLabels,
            datasets: [{
                label: "Browsers",
                data: browserCounts,
                backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true } },
        },
    });

    // Render User Information table
    function renderTable(filteredStudents) {
        studentTableBody.innerHTML = filteredStudents
            .map(
                (student) => `
                <tr class="student-row">
                    <th><h3 class="student-name">${student.firstname} ${student.lastname}</h3></th>
                    <td>
                        <h3>Compromised Info:</h3>
                        <ul>
                            <li><b>Phone Number:</b> ${student.phone}</li>
                            <li><b>Mailing Address:</b> ${student.address}</li>
                            <li><b>Date of Birth:</b> ${student.dob}</li>
                            <li><b>School Email:</b> ${student.schemail}</li>
                        </ul>
                    </td>
                </tr>
            `
            )
            .join("");
    }

    function sortStudents() {
        const sortBy = sortBySelect.value;
        students.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
        renderTable(students);
    }

    function filterStudents() {
        const filterText = filterTextInput.value.toLowerCase();
        const filteredStudents = students.filter(
            (student) =>
                student.firstname.toLowerCase().includes(filterText) ||
                student.lastname.toLowerCase().includes(filterText)
        );
        renderTable(filteredStudents);
    }

    sortBySelect.addEventListener("change", sortStudents);
    filterTextInput.addEventListener("input", filterStudents);
    renderTable(students);

    // Tab switching logic
    document.querySelectorAll(".tab-button").forEach((button) => {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            document.querySelectorAll(".tab-button").forEach((btn) => btn.classList.remove("active"));
            this.classList.add("active");

            document.getElementById("statsChart").style.display = this.dataset.chart === "statsChart" ? "block" : "none";
            document.getElementById("dailyChart").style.display = this.dataset.chart === "dailyChart" ? "block" : "none";
            document.getElementById("osChart").style.display = this.dataset.chart === "osChart" ? "block" : "none";
            document.getElementById("browserChart").style.display = this.dataset.chart === "browserChart" ? "block" : "none";
        });
    });
});