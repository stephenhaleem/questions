// 🔹 Supabase config
const SUPABASE_URL = "https://pvtnnavvbnbwaslojmas.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2dG5uYXZ2Ym5id2FzbG9qbWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwODY2MzcsImV4cCI6MjA4NDY2MjYzN30.o4YSI6nx4ECI8CqTcX__94IzIL2d8tI4GsGjCtsfuTQ";

const client = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// 🔹 Generate a session ID for this user
const sessionId = crypto.randomUUID();

// 🔹 Questions
const questions = [
  "What is your name?",
  "What is your favorite programming language?",
  "Why do you want to learn web development?"
];

let currentIndex = 0;

// 🔹 DOM elements
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const nextBtn = document.getElementById("nextBtn");

// Show first question
questionEl.textContent = questions[currentIndex];

// 🔹 Handle Next button
nextBtn.addEventListener("click", async () => {
  const answer = answerEl.value.trim();

  if (!answer) {
    alert("Please enter an answer");
    return;
  }

  // Disable button while saving
  nextBtn.disabled = true;

  // 🔹 Save answer immediately
  const { error } = await client
    .from("responses")
    .insert([
      {
        session_id: sessionId,
        question: questions[currentIndex],
        answer: answer
      }
    ]);

  if (error) {
    console.error(error);
    alert("Failed to save answer");
    nextBtn.disabled = false;
    return;
  }

  // Move to next question
  answerEl.value = "";
  currentIndex++;

  if (currentIndex < questions.length) {
    questionEl.textContent = questions[currentIndex];
    answerEl.focus();
    nextBtn.disabled = false;
  } else {
    document.body.innerHTML = `
      <h2>All done!</h2>
      <p>Thanks for completing the questionnaire.</p>
    `;
  }
});