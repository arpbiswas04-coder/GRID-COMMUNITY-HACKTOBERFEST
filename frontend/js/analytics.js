// ==========================================================================
// TYPE.E — ANALYTICS ENGINE (analytics.js)
// Personal records, Chart.js progression curve & CSV history export
// ==========================================================================

class AnalyticsEngine {
  constructor() {
    this.chartInstance = null;
  }

  init() {
    this.renderPersonalBests();
    this.renderChart();
    this.renderHistoryTable();

    const exportBtn = document.querySelector("#btn-export-csv");
    if (exportBtn) exportBtn.onclick = () => this.exportCSV();

    const clearBtn = document.querySelector("#btn-clear-history");
    if (clearBtn) clearBtn.onclick = () => this.clearHistory();
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
      this.drawCanvasFallback(canvas, dataWPM);
    }
  }

  drawCanvasFallback(canvas, data) {
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
      ctx.fillText("Complete races to view your performance progression curve.", canvas.width / 2, canvas.height / 2);
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
}

window.TypeEAnalytics = new AnalyticsEngine();
