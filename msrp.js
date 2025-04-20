function loadMSRPTable() {
    Papa.parse("data1.csv", {
      download: true,
      header: true,
      complete: function (results) {
        const data = results.data
          .filter(row => row.Make && row.Model && row.MSRP && parseFloat(row.MSRP) > 0)
          .map(row => ({
            Make: row.Make,
            Model: row.Model,
            Country: row.Country,
            City: row.City,

            MSRP: parseFloat(row.MSRP)
          }));
  
        renderTable(data);
      }
    });
  }
  
  function renderTable(data) {
    const tableBody = document.querySelector("#msrpTable tbody");
    tableBody.innerHTML = "";
  
    data.forEach(ev => {
      const row = `<tr>
        <td>${ev.Make}</td>
        <td>${ev.Model}</td>
        <td>${ev.Country}</td>
        <td>${ev.City}</td>
        <td>$${ev.MSRP.toLocaleString()}</td>
      </tr>`;
      tableBody.innerHTML += row;
    });
  }
  
  loadMSRPTable();
  