function loadCSVAndInitDashboard() {
    Papa.parse("data1.csv", {
      download: true,
      header: true,
      complete: function(results) {
        const data = results.data.filter(row =>
          row.Make && row.Model && row.Year && row.Type && row.Range && row.MSRP
        ).map(row => ({
          Make: row.Make,
          Model: row.Model,
          Year: parseInt(row.Year),
          Type: row.Type,
          Range: parseFloat(row.Range),
          MSRP: parseFloat(row.MSRP)
        }));
  
        buildDashboard(data);
      }
    });
  }
  function buildDashboard(sampleData) {
    const totalEVs = sampleData.length;
    const avgRange = (sampleData.reduce((sum, car) => sum + car.Range, 0) / totalEVs).toFixed(1);
    const avgMsrp = (sampleData.reduce((sum, car) => sum + car.MSRP, 0) / totalEVs).toFixed(0);
  
    // document.getElementById('totalEVs').textContent = totalEVs;
    // document.getElementById('avgRange').textContent = avgRange + ' mi';
    // document.getElementById('avgMsrp').textContent = '$' + avgMsrp;
  
    // Bar Chart: EVs by Year
    const yearCounts = {};
    sampleData.forEach(car => { yearCounts[car.Year] = (yearCounts[car.Year] || 0) + 1 });
  
    new Chart(document.getElementById('evByYear'), {
      type: 'bar',
      data: {
        labels: Object.keys(yearCounts),
        datasets: [{
          label: '# of EVs',
          data: Object.values(yearCounts),
          backgroundColor: '#A7C957'
        }]
      },
      options: { responsive: true, plugins: { title: { display: true, text: 'EVs by Model Year' } } }
    });
  }
      loadCSVAndInitDashboard();