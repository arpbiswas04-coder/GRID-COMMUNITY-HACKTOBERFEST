// ==========================================================================
// TYPE.E — ANALYTICS ENGINE (analytics.js)
// Personal records, Chart.js progression curve & CSV history export
// ==========================================================================

class AnalyticsEngine {
  constructor() {
    this.chartInstance = null;
    this.programmingChartInstance = null;
  }

  init() {
    this.renderPersonalBests();
    this.renderChart();
    this.renderHistoryTable();

    this.renderProgrammingPersonalBests();
    this.renderProgrammingChart();
    this.renderLanguageStats();
    this.renderProgrammingHistoryTable();

    const exportBtn = document.querySelector("#btn-export-csv");
    if (exportBtn) exportBtn.onclick = () => this.exportCSV();

    const clearBtn = document.querySelector("#btn-clear-history");
    if (clearBtn) clearBtn.onclick = () => this.clearHistory();

    const exportProgBtn = document.querySelector("#btn-export-prog-csv");
    if (exportProgBtn) exportProgBtn.onclick = () => this.exportProgrammingCSV();

    const clearProgBtn = document.querySelector("#btn-clear-prog-history");
    if (clearProgBtn) clearProgBtn.onclick = () => this.clearProgrammingHistory();
  }

  renderPersonalBests() {
    const state = window.TypeEStorage.get();
    const pb = state.personalBests;

    const setTxt = (id, val) => {
      const el = document.querySelector(id);
      if (el) el.textContent = val;
    };

    setTxt("#pb-highest-wpm", pb.highestWPM || 0);
    setTxt("#pb-best-acc", `${pb.bestAccuracy || 0}%`);
    setTxt("#pb-30s", pb.best30s || 0);
    setTxt("#pb-60s", pb.best60s || 0);
    setTxt("#pb-120s", pb.best120s || 0);
  }

  renderChart() {
    const canvas = document.querySelector("#performance-chart");
    if (!canvas) return;

    const state = window.TypeEStorage.get();
    const history = [...state.testHistory].reverse();
    const labels = history.map((h, i) => `#${i + 1}`);
    const dataWPM = history.map(h => h.wpm);

    if (window.Chart) {
      if (this.chartInstance) this.chartInstance.destroy();

      const isDark = state.theme === "dark-arcade";
      const primaryCol = isDark ? "#00FF88" : "#FFE66D";
      const textCol = isDark ? "#FFFFFF" : "#171717";
      const gridCol = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

      this.chartInstance = new window.Chart(canvas, {
        type: "line",
        data: {
          labels: labels.length > 0 ? labels : ["No Data"],
          datasets: [{
            label: "Speed (WPM)",
            data: dataWPM.length > 0 ? dataWPM : [0],
            borderColor: textCol,
            borderWidth: 3,
            backgroundColor: primaryCol,
            pointBackgroundColor: textCol,
            pointBorderColor: primaryCol,
            pointRadius: 5,
            fill: true,
            tension: 0.2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { font: { family: "Space Grotesk", weight: "bold", size: 12 }, color: textCol }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: gridCol },
              ticks: { font: { family: "JetBrains Mono", weight: "bold" }, color: textCol }
            },
            x: {
              grid: { color: gridCol },
              ticks: { font: { family: "JetBrains Mono", weight: "bold" }, color: textCol }
            }
          }
        }
      });
    } else {
      this.drawCanvasFallback(canvas, dataWPM, "Complete races to view your performance progression curve.");
    }
  }

  drawCanvasFallback(canvas, data, emptyMsg = "Complete races to view your performance progression curve.") {
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.fillStyle = "#FAF7F0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!data || data.length === 0) {
      ctx.fillStyle = "#171717";
      ctx.font = "bold 13px 'Space Grotesk', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(emptyMsg, canvas.width / 2, canvas.height / 2);
      return;
    }

    const pad = 36;
    const w = canvas.width - pad * 2;
    const h = canvas.height - pad * 2;
    const maxVal = Math.max(...data, 60);

    ctx.strokeStyle = "#171717";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(pad, pad);
    ctx.lineTo(pad, pad + h);
    ctx.lineTo(pad + w, pad + h);
    ctx.stroke();

    ctx.beginPath();
    data.forEach((val, i) => {
      const x = pad + (i / Math.max(1, data.length - 1)) * w;
      const y = pad + h - (val / maxVal) * h;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }

  renderHistoryTable() {
    const tbody = document.querySelector("#history-table-body");
    if (!tbody) return;

    const state = window.TypeEStorage.get();
    tbody.innerHTML = "";

    if (state.testHistory.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:1.5rem; color:var(--color-muted);">No sprint records found yet. Enter the Arena to build your history!</td></tr>`;
      return;
    }

    state.testHistory.forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.dateStr}</td>
        <td><strong>${item.wpm} WPM</strong></td>
        <td>${item.accuracy}%</td>
        <td>${item.duration}s</td>
        <td><span class="badge ${item.difficulty === 'hard' ? 'badge-red' : item.difficulty === 'medium' ? 'badge-yellow' : 'badge-blue'}">${item.difficulty}</span></td>
        <td>${item.correctChars} / ${item.incorrectChars}</td>
        <td>${item.wonRace ? '🏆 WIN' : '🏁 PB PACE'}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  exportCSV() {
    const state = window.TypeEStorage.get();
    if (state.testHistory.length === 0) {
      if (window.TypeESettings) window.TypeESettings.showToast("No sprint history to export!", "error");
      return;
    }

    const headers = ["Sprint_ID", "Date_Time", "WPM", "Accuracy_Pct", "Duration_Seconds", "Difficulty", "Correct_Chars", "Mistakes", "Won_Race"];
    const rows = state.testHistory.map(item => [
      `"${item.id}"`,
      `"${item.dateStr}"`,
      item.wpm,
      item.accuracy,
      item.duration,
      `"${item.difficulty}"`,
      item.correctChars,
      item.incorrectChars,
      item.wonRace ? "YES" : "NO"
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `type_e_history_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    if (window.TypeESettings) window.TypeESettings.showToast("CSV history exported successfully!", "success");
  }

  clearHistory() {
    if (confirm("Reset sprint history and personal records?")) {
      const state = window.TypeEStorage.get();
      state.testHistory = [];
      state.keyStatistics = {};
      state.previousSessionRace = null;
      state.personalBests = {
        highestWPM: 0,
        bestAccuracy: 0,
        best30s: 0,
        best60s: 0,
        best120s: 0,
        totalTests: 0,
        totalCharsTyped: 0
      };
      window.TypeEStorage.save();
      this.renderPersonalBests();
      this.renderChart();
      this.renderHistoryTable();
      if (window.TypeESettings) window.TypeESettings.showToast("History data cleared.");
    }
  }

  // ==========================================================================
  // PROGRAMMING PERFORMANCE METHODS
  // ==========================================================================

  renderProgrammingPersonalBests() {
    const state = window.TypeEStorage.get();
    const pb = state.programmingPersonalBests || {
      highestWPM: 0,
      bestAccuracy: 0,
      best30s: 0,
      best60s: 0,
      best120s: 0
    };

    const setTxt = (id, val) => {
      const el = document.querySelector(id);
      if (el) el.textContent = val;
    };

    setTxt("#prog-pb-highest-wpm", pb.highestWPM || 0);
    setTxt("#prog-pb-best-acc", `${pb.bestAccuracy || 0}%`);
    setTxt("#prog-pb-30s", pb.best30s || 0);
    setTxt("#prog-pb-60s", pb.best60s || 0);
    setTxt("#prog-pb-120s", pb.best120s || 0);
  }

  renderProgrammingChart() {
    const canvas = document.querySelector("#programming-chart");
    if (!canvas) return;

    const state = window.TypeEStorage.get();
    const history = [...(state.programmingHistory || [])].reverse();
    const labels = history.map((h, i) => `#${i + 1} (${(h.language || "CODE").toUpperCase()})`);
    const dataWPM = history.map(h => h.wpm);

    if (window.Chart) {
      if (this.programmingChartInstance) this.programmingChartInstance.destroy();

      const isDark = state.theme === "dark-arcade";
      const primaryCol = isDark ? "#00E5FF" : "#38EF7D";
      const textCol = isDark ? "#FFFFFF" : "#171717";
      const gridCol = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

      this.programmingChartInstance = new window.Chart(canvas, {
        type: "line",
        data: {
          labels: labels.length > 0 ? labels : ["No Data"],
          datasets: [{
            label: "Programming Speed (WPM)",
            data: dataWPM.length > 0 ? dataWPM : [0],
            borderColor: textCol,
            borderWidth: 3,
            backgroundColor: primaryCol,
            pointBackgroundColor: textCol,
            pointBorderColor: primaryCol,
            pointRadius: 5,
            fill: true,
            tension: 0.2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { font: { family: "Space Grotesk", weight: "bold", size: 12 }, color: textCol }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: gridCol },
              ticks: { font: { family: "JetBrains Mono", weight: "bold" }, color: textCol }
            },
            x: {
              grid: { color: gridCol },
              ticks: { font: { family: "JetBrains Mono", weight: "bold" }, color: textCol }
            }
          }
        }
      });
    } else {
      this.drawCanvasFallback(canvas, dataWPM, "Complete programming sprints to view your code progression curve.");
    }
  }

  renderLanguageStats() {
    const grid = document.querySelector("#prog-lang-stats-grid");
    if (!grid) return;

    const state = window.TypeEStorage.get();
    const history = state.programmingHistory || [];

    const languages = [
      { id: "javascript", name: "JavaScript" },
      { id: "python", name: "Python" },
      { id: "c", name: "C" },
      { id: "cpp", name: "C++" },
      { id: "html", name: "HTML" },
      { id: "css", name: "CSS" },
      { id: "sql", name: "SQL" }
    ];

    grid.innerHTML = "";

    languages.forEach(lang => {
      const langRuns = history.filter(h => (h.language || "").toLowerCase() === lang.id);
      const count = langRuns.length;
      let avgWpm = 0;
      let topWpm = 0;
      let avgAcc = 0;

      if (count > 0) {
        avgWpm = Math.round(langRuns.reduce((sum, r) => sum + (r.wpm || 0), 0) / count);
        topWpm = Math.max(...langRuns.map(r => r.wpm || 0));
        avgAcc = Math.round(langRuns.reduce((sum, r) => sum + (r.accuracy || 0), 0) / count);
      }

      const card = document.createElement("div");
      card.className = `prog-lang-card ${count > 0 ? "active-lang" : ""}`;
      card.innerHTML = `
        <div class="prog-lang-card-header">
          <span class="prog-lang-title">${lang.name}</span>
          <span class="badge ${count > 0 ? 'badge-yellow' : 'badge-dark'}">${count} ${count === 1 ? 'Sprint' : 'Sprints'}</span>
        </div>
        <div class="prog-lang-metrics">
          <div class="prog-metric-item">
            <span class="prog-metric-label">Avg Speed</span>
            <span class="prog-metric-val">${count > 0 ? avgWpm : '--'} <span style="font-size:0.75rem;">WPM</span></span>
          </div>
          <div class="prog-metric-item">
            <span class="prog-metric-label">Top Speed</span>
            <span class="prog-metric-val">${count > 0 ? topWpm : '--'} <span style="font-size:0.75rem;">WPM</span></span>
          </div>
          <div class="prog-metric-item">
            <span class="prog-metric-label">Avg Acc</span>
            <span class="prog-metric-val">${count > 0 ? avgAcc + '%' : '--%'}</span>
          </div>
          <div class="prog-metric-item">
            <span class="prog-metric-label">Status</span>
            <span class="prog-metric-val" style="font-size:0.85rem;">${count > 0 ? 'ACTIVE' : 'READY'}</span>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  renderProgrammingHistoryTable() {
    const tbody = document.querySelector("#prog-history-table-body");
    if (!tbody) return;

    const state = window.TypeEStorage.get();
    const history = state.programmingHistory || [];
    tbody.innerHTML = "";

    if (history.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:1.5rem; color:var(--color-muted);">No programming sprints recorded yet. Select Programming on the Homepage to practice authentic code snippets!</td></tr>`;
      return;
    }

    history.forEach(item => {
      const tr = document.createElement("tr");
      const langUpper = (item.language || "Code").toUpperCase();
      const diffBadge = item.difficulty === "advanced" ? "badge-red" : item.difficulty === "intermediate" ? "badge-yellow" : "badge-blue";
      tr.innerHTML = `
        <td>${item.dateStr || new Date(item.timestamp || Date.now()).toLocaleDateString()}</td>
        <td><span class="badge badge-yellow">${langUpper}</span></td>
        <td><span class="badge ${diffBadge}">${item.difficulty || 'beginner'}</span></td>
        <td><strong>${item.wpm} WPM</strong></td>
        <td>${item.accuracy}%</td>
        <td>${item.duration}s</td>
        <td>${item.correctChars} / ${item.incorrectChars}</td>
        <td>${item.wonRace ? '🏆 WIN' : (item.isPersonalBest ? '⭐ PB' : '🏁 PB PACE')}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  exportProgrammingCSV() {
    const state = window.TypeEStorage.get();
    const history = state.programmingHistory || [];
    if (history.length === 0) {
      if (window.TypeESettings) window.TypeESettings.showToast("No programming sprint history to export!", "error");
      return;
    }

    const headers = [
      "Session_ID",
      "Date_Time",
      "Language",
      "Difficulty",
      "WPM",
      "Accuracy_Pct",
      "Duration_Seconds",
      "Correct_Chars",
      "Mistakes",
      "Race_Result"
    ];

    const rows = history.map(item => [
      `"${item.id}"`,
      `"${item.dateStr}"`,
      `"${item.language || 'code'}"`,
      `"${item.difficulty || 'beginner'}"`,
      item.wpm,
      item.accuracy,
      item.duration,
      item.correctChars,
      item.incorrectChars,
      item.wonRace ? "WIN" : (item.isPersonalBest ? "NEW_PB" : "PB_PACE")
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `type_e_programming_history_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    if (window.TypeESettings) window.TypeESettings.showToast("Programming CSV exported successfully!", "success");
  }

  clearProgrammingHistory() {
    if (confirm("Reset programming sprint history and programming personal records?")) {
      const state = window.TypeEStorage.get();
      state.programmingHistory = [];
      state.programmingPersonalBests = {
        highestWPM: 0,
        bestAccuracy: 0,
        best30s: 0,
        best60s: 0,
        best120s: 0,
        totalTests: 0,
        totalCharsTyped: 0
      };
      state.programmingGhostRecords = {
        "30": null,
        "60": null,
        "120": null
      };
      window.TypeEStorage.save();
      this.renderProgrammingPersonalBests();
      this.renderProgrammingChart();
      this.renderLanguageStats();
      this.renderProgrammingHistoryTable();
      if (window.TypeESettings) window.TypeESettings.showToast("Programming history cleared.");
    }
  }
}

window.TypeEAnalytics = new AnalyticsEngine();

