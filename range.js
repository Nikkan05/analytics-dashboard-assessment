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
              row.MSRP
          )
          .map((row) => ({
            Make: row.Make,
            Model: row.Model,
            Year: parseInt(row.Year),
            Type: row.Type,
            Range: parseFloat(row.Range),
            MSRP: parseFloat(row.MSRP),
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
  
    // Histogram: Electric Range
    const rangeData = sampleData.map(car => car.Range);
    new Chart(document.getElementById('rangeHistogram'), {
      type: 'bar',
      data: {
        labels: sampleData.map(car => `${car.Make} ${car.Model}`),
        datasets: [{
          label: 'Electric Range (mi)',
          data: rangeData,
          backgroundColor: 'rgba(255, 159, 64, 0.6)'
        }]
      },
      options: { responsive: true, plugins: { title: { display: true, text: 'Electric Range per Vehicle' } } }
    });
  }
  loadCSVAndInitDashboard();
  