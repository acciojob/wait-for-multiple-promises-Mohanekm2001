//your JS code here. If required.
function waitRandomTime() {
  return new Promise((resolve) => {
    const randomTime = Math.floor(Math.random() * 3000) + 1000;
    setTimeout(() => {
      resolve(randomTime);
    }, randomTime);
  });
}

const promises = [waitRandomTime(), waitRandomTime(), waitRandomTime()];

const tableBody = document.getElementById("output");

const loadingRow = document.createElement("tr");
const loadingCell = document.createElement("td");
loadingCell.colSpan = 2;
loadingCell.innerText = "Loading...";
loadingRow.appendChild(loadingCell);
tableBody.appendChild(loadingRow);

Promise.all(promises)
  .then((results) => {
    tableBody.removeChild(loadingRow);

    results.forEach((time, index) => {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      const timeCell = document.createElement("td");
      nameCell.innerText = `Promise ${index + 1}`;
      timeCell.innerText = `${(time / 1000).toFixed(3)}`;
      row.appendChild(nameCell);
      row.appendChild(timeCell);
      tableBody.appendChild(row);
    });

    const totalRow = document.createElement("tr");
    const totalNameCell = document.createElement("td");
    const totalTimeCell = document.createElement("td");
    totalNameCell.innerText = "Total";
    totalTimeCell.innerText = `${(results.reduce((acc, cur) => acc + cur) / 1000).toFixed(3)}`;
    totalRow.appendChild(totalNameCell);
    totalRow.appendChild(totalTimeCell);
    tableBody.appendChild(totalRow);
  })
  .catch((err) => {
    console.error(err);
  });
