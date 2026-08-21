import { mongeElkanSymmetric } from "@nlptools/distance";

const stringA = document.getElementById("stringA");
const stringB = document.getElementById("stringB");
const compareButton = document.getElementById("compare");

const scoreElement = document.getElementById("score");
const statusElement = document.getElementById("status");

compareButton.addEventListener("click", () => {
  const a = stringA.value.trim();
  const b = stringB.value.trim();

  if (!a || !b) {
    scoreElement.textContent = "--";
    statusElement.textContent = "ERROR: INPUT REQUIRED";
    return;
  }

  try {
    const similarity = mongeElkanSymmetric(normalizeName(a), normalizeName(b));

    // Convert 0-1 similarity to 0-100 score
    const score = similarity * 100;

    scoreElement.textContent = score.toFixed(2);

    if (score > 94) {
      statusElement.textContent = "FULLY MATCH";
    } else if (score >= 74) {
      statusElement.textContent = "PARTIALLY MATCH";
    } else {
      statusElement.textContent = "UNMATCH";
    }
  } catch (error) {
    console.error(error);

    scoreElement.textContent = "--";
    statusElement.textContent = "ERROR: COMPARISON FAILED";
  }
});

function normalizeName(name) {
  return (name ?? "")
    .normalize("NFD").replace(/\p{Diacritic}/gu, "") // remove diacritic characters
    .replace(/[^\p{L}\p{N}\s]/gu, "") // remove punctuation
    .replace(/\s+/g, " ").trim() // remove extra spaces
    .toLowerCase(); // convert to lowercase
}
