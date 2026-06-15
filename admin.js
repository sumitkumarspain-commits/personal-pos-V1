let globalLogs = []; // shared in real system later

function showLogs() {
  let text = "FULL SYSTEM LOGS:\n\n";

  globalLogs.forEach(l => {
    text += `${l.time} - ${l.action}\n`;
  });

  alert(text);
}