function loadCSVAndInitDashboard() {
    Papa.parse("data1.csv", {
      download: true,
      header: true,
      complete: function (results) {
        const data = results.data
          .filter(
            (row) =>
              row.Make &&
              row.Model &&
              row.Year &&
              row.Type &&
              row.Range &&
              row.MSRP &&
              row.Eligibility
          )
          .map((row) => ({
            Make: row.Make,
            Model: row.Model,
            Year: parseInt(row.Year),
            Type: row.Type,
            Range: parseFloat(row.Range),
            MSRP: parseFloat(row.MSRP),
            Eligibility: row.Eligibility
          }));
  
        buildDashboard(data);
      },
    });
  }
  function buildDashboard(sampleData) {
    const totalEVs = sampleData.length;
    const avgRange = (
      sampleData.reduce((sum, car) => sum + car.Range, 0) / totalEVs
    ).toFixed(1);
    const avgMsrp = (
      sampleData.reduce((sum, car) => sum + car.MSRP, 0) / totalEVs
    ).toFixed(0);
  
    // Pie Chart: EV Make Eligibility
    const typeCounts = {};
    sampleData.forEach((car) => {
      typeCounts[car.Eligibility] = (typeCounts[car.Eligibility] || 0) + 1;
    });
  
    new Chart(document.getElementById("eligibility"), {
      type: "pie",
      data: {
        labels: Object.keys(typeCounts),
        datasets: [
          {
            label: "EV Eligibility",
            data: Object.values(typeCounts),
            backgroundColor: ["#ff6384", "#36a2eb", "#4bc0c0"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { title: { display: true, text: "EV Type Distribution" } },
      },
    });
  }
  loadCSVAndInitDashboard();
  