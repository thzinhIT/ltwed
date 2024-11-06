// Chức năng chuyển đổi giữa các phần nội dung của trang
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.admin-section');

// Ẩn tất cả các section ban đầu
sections.forEach(section => section.style.display = 'none');

// Bắt sự kiện click để chuyển đổi giữa các section
navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        // Ẩn tất cả các section
        sections.forEach(section => section.style.display = 'none');
        // Hiện phần section được chọn
        const sectionId = link.getAttribute('data-section');
        document.getElementById(sectionId).style.display = 'block';
    });
});

// Biểu đồ doanh thu
const revenueChartCtx = document.getElementById('revenue-chart').getContext('2d');
const revenueChart = new Chart(revenueChartCtx, {
    type: 'polarArea', // Sử dụng biểu đồ dạng xoắn ốc
    data: {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
        datasets: [{
            label: 'Doanh thu (triệu VND)',
            data: [20, 35, 40, 30, 45, 50],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        }
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".admin-section");
    const navLinks = document.querySelectorAll(".nav-link");

    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove("active");
        });
        document.getElementById(sectionId).classList.add("active");
    }
    showSection("dashboard-overview");
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); 
            const sectionId = this.getAttribute("data-section");
            showSection(sectionId);
        });
    });
});
// Initialize Chart.js when document is ready
document.addEventListener("DOMContentLoaded", function () {
    // Monthly Revenue Bar Chart
    const ctxBar = document.getElementById("revenue-chart-full").getContext("2d");
    new Chart(ctxBar, {
        type: "bar",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
                label: "Doanh thu hàng tháng",
                data: [10000000, 12000000, 15000000, 14000000, 18000000, 21000000, 16000000, 17000000, 22000000, 25000000, 30000000, 32000000],
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Spiral Revenue Chart (simulate a spiral pattern with a line chart)
    const ctxSpiral = document.getElementById("revenue-chart-spiral").getContext("2d");
    const spiralData = [];
    for (let i = 0; i < 30; i++) {
        spiralData.push(Math.sin(i * 0.3) * 10000000 + 20000000);
    }
    new Chart(ctxSpiral, {
        type: "line",
        data: {
            labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
            datasets: [{
                label: "Doanh thu hàng ngày",
                data: spiralData,
                backgroundColor: "rgba(255, 159, 64, 0.2)",
                borderColor: "rgba(255, 159, 64, 1)",
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
});
// Điều hướng mượt mà đến một section
document.querySelector(".nav-link[data-section='revenue-section']").addEventListener("click", function(e) {
    e.preventDefault();
    document.getElementById("revenue-section").scrollIntoView({ behavior: "smooth", block: "start" });
});
