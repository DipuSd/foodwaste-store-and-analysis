const drawCountryWiseBarChart = async () => {
  const ctx = document.getElementById("foodwaste-by-country");
  const data = await fetch("/api/dashboard/countrywise-total-waste").then(
    (res) => res.json()
  );

  const countryNames = data.map((d) => d.countryName);
  const totalWastes = data.map((d) => d.totalWaste);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: countryNames,
      datasets: [
        {
          label: "Total Waste",
          data: totalWastes,
          borderWidth: 1,
          backgroundColor: "rgba(255, 99, 132, 0.6)",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

const drawCityWiseBarChart = async () => {
  const ctx = document.getElementById("foodwaste-by-city");
  const data = await fetch("/api/dashboard/citywise-total-waste").then((res) =>
    res.json()
  );

  const cityNames = data.map((d) => d.cityName);
  const totalWastes = data.map((d) => d.totalWaste);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: cityNames,
      datasets: [
        {
          label: "Total Waste",
          data: totalWastes,
          borderWidth: 1,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

const drawSourceWisePieChart = async () => {
  const ctx = document.getElementById("foodwaste-by-source");
  const data = await fetch("/api/dashboard/sourcewise-total-waste").then(
    (res) => res.json()
  );

  const sourceNames = data.map((d) => d.sourceName);
  const totalWastes = data.map((d) => d.totalWaste);

  new Chart(ctx, {
    type: "polarArea",
    data: {
      labels: sourceNames,
      datasets: [
        {
          label: "Total Waste",
          data: totalWastes,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};
