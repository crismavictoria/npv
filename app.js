// NPV Calculation function
function calculateNPV(cashFlows, discountRate) {
  let npv = 0;
  for (let i = 0; i < cashFlows.length; i++) {
    npv += cashFlows[i] / Math.pow(1 + discountRate, i + 1);
  }
  return npv;
}

// Async NPV calculation function
async function calculateAsyncNPV(cashFlows, discountRate) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(calculateNPV(cashFlows, discountRate));
    }, 1000); // Simulating an asynchronous delay of 1 second
  });
}

// Unit tests
function runTests() {
  // Test calculateNPV function
  const cashFlows = [100, 200, 300];
  const discountRate = 0.25;
  const npv = calculateNPV(cashFlows, discountRate);
  console.log("calculateNPV result:", npv);
  console.assert(npv === 360, "calculateNPV test failed.");
}

// Run the tests
runTests();

// UI event listener
document.getElementById("calculateBtn").addEventListener("click", async () => {
  const lowerBound = parseFloat(document.getElementById("lowerBound").value);
  const upperBound = parseFloat(document.getElementById("upperBound").value);
  const increment = parseFloat(document.getElementById("increment").value);

  const cashFlows = [100, 200, 300]; // Example cash flows

  const resultsTable = document.createElement("table");
  const tableHeader = resultsTable.createTHead();
  const headerRow = tableHeader.insertRow();
  headerRow.innerHTML = "<th>Discount Rate (%)</th><th>Net Present Value</th>";

  document.getElementById("results").innerHTML = "";
  document.getElementById("results").appendChild(resultsTable);

  for (let rate = lowerBound; rate <= upperBound; rate += increment) {
    const npv = await calculateAsyncNPV(cashFlows, rate);
    const row = resultsTable.insertRow();
    row.innerHTML = `<td>${rate.toFixed(2)}</td><td>${npv.toFixed(2)}</td>`;
  }
});


