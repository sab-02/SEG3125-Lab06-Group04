async function loadSurveyResults() {

    try {
  
      const response = await fetch("/api/results");
      const data = await response.json();
  
      displayResponses(data);
      createAppealChart(data);
  
    } catch (error) {
  
      console.error("Error loading survey results:", error);
  
    }
  
  }
  
  
  // Display responses in the list
  function displayResponses(data) {
  
    const list = document.getElementById("responsesList");
  
    list.innerHTML = "";
  
    data.forEach((response, index) => {
  
      const li = document.createElement("li");
  
      li.innerHTML = `
        <strong>Response ${index + 1}</strong><br>
        Most Used Feature: ${response.most_used}<br>
        UI Change Suggestion: ${response.ui_change}<br>
        Visual Appeal: ${response.appealing}<br>
        Time to Find Product: ${response.time}<br>
        Features that work well: ${response.features.join(", ")}<br>
        Additional Feedback: ${response.feedback}
        <hr>
      `;
  
      list.appendChild(li);
  
    });
  
  }
  
  
  // Create pie chart for visual appeal
  function createAppealChart(data) {
  
    const counts = {};
  
    data.forEach(response => {
  
      const appeal = response.appealing;
  
      if (!appeal) return;
  
      if (counts[appeal]) {
        counts[appeal]++;
      } else {
        counts[appeal] = 1;
      }
  
    });
  
    const labels = Object.keys(counts);
    const values = Object.values(counts);
  
    const ctx = document.getElementById("appealChart");
  
    new Chart(ctx, {
  
      type: "pie",
  
      data: {
        labels: labels,
        datasets: [{
          label: "Website Appeal Ratings",
          data: values
        }]
      }
  
    });
  
  }
  
  
  // Run when analyst page loads
  loadSurveyResults();