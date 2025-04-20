Papa.parse("data1.csv", {
    download: true,
    header: true,
    complete: function (results) {
      const validData = results.data.filter(row => row.Make && row.Model);
      const grouped = {};
  
      validData.forEach(car => {
        if (!grouped[car.Make]) {
          grouped[car.Make] = new Set();
        }
        grouped[car.Make].add(car.Model);
      });
  
      const container = document.getElementById("makeContainer");
      Object.keys(grouped).sort().forEach(make => {
        const card = document.createElement("div");
        card.className = "make-card";
  
        const header = document.createElement("div");
        header.className = "make-header";
        header.innerHTML = `${make} <span class="arrow">&#9654;</span>`;
  
        const modelList = document.createElement("ul");
        modelList.className = "models-list";
        [...grouped[make]].sort().forEach(model => {
          const item = document.createElement("li");
          item.textContent = model;
          modelList.appendChild(item);
        });
  
        header.addEventListener("click", () => {
          modelList.style.display = modelList.style.display === "block" ? "none" : "block";
          header.querySelector(".arrow").classList.toggle("open");
        });
  
        card.appendChild(header);
        card.appendChild(modelList);
        container.appendChild(card);
      });
    }
  });
  