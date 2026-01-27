
// Supabase config 
const SUPABASE_URL = "https://pvtnnavvbnbwaslojmas.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2dG5uYXZ2Ym5id2FzbG9qbWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwODY2MzcsImV4cCI6MjA4NDY2MjYzN30.o4YSI6nx4ECI8CqTcX__94IzIL2d8tI4GsGjCtsfuTQ";


const client = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// create Session ID since there is no user auth for this simple app
const sessionId = crypto.randomUUID();

//  Questions, add the questions mr sam gave you
const questions = [
    "What is your name?",
  "How old are you?",
  "What your relationship status at the moment?",
  "Does your dad gifts you money?",
  "What the highest amount he has gifted you?",
  "NOTE ON A SCALE OF 0-20 HOW SATISFIED WILL YOU BE IF YOU RECIEVE AN AMOUNT FROM YOUR SPAUCE AND HOW MANY DAYS BEFORE THE EXCITMENT RUNS OUT.",
  "If you recieved 5000 naira,what the scale of ur satisfaction?",
  "How many days before the excitment runs out?",
  "If you recieved 10000 naira,what the scale of ur satisfaction?",
  "How many days before the excitment runs out?",
  "If you recieved 50000 naira,what the scale of ur satisfaction?",
  "How many days before the excitment runs out?",
  "If you recieved 100000 naira,what the scale of ur satisfaction?",
  "How many days before the excitment runs out?",
  "If you recieved 200000 naira,what the scale of ur satisfaction?",
  "How many days before the excitment runs out?",
  "If you recieved 350000 naira,what the scale of ur satisfaction?",
  "How many days before the excitment runs out?",
  "If you recieved 450000 naira,what the scale of ur satisfaction?",
  "How many days before the excitment runs out?",
  "If you recieved 600000 naira,what the scale of ur satisfaction?",
  "How many days before the excitment runs out?",
  "If you recieved 800000 naira,what the scale of ur satisfaction?",
  "How many days before the excitment runs out?",
  "If you recieved 1 million,what the scale of ur satisfaction?",
  "How many days before the excitment runs out?",
  "If you recieved 1.2 million,what the scale of ur satisfaction?",
  "How many days before the excitment runs out?",
  "If you recieved 1.3 million,what the scale of ur satisfaction?",
  "How many days before the excitment runs out?",
  "If you recieved 1.4 million,what the scale of ur satisfaction?",
  "How many days before the excitment runs out?",
  "If you recieved 1.550 million,what the scale of ur satisfaction?",
  "How many days before the excitment runs out?",
  "If you recieved 1.7 million,what the scale of ur satisfaction?",
  "How many days before the excitment runs out?",
  "If you recieved 1.850 million,what the scale of ur satisfaction?",
  "How many days before the excitment runs out?",
  "If you recieved 2 million,what the scale of ur satisfaction?",
  "How many days before the excitment runs out?",
];

// Tracks which question we are on ,Starts at 0 because arrays are 0-indexed
let currentIndex = 0;

//  DOM elements
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const progressBar = document.getElementById("progressBar");

// ================================
// Helper functions
// ================================

function updateProgress() {
  const progress = ((currentIndex + 1) / questions.length) * 100;
  progressBar.style.width = progress + "%";
}

function animateQuestionChange(newText) {
  questionEl.classList.add("fade-out");

  setTimeout(() => {
    questionEl.textContent = newText;
    questionEl.classList.remove("fade-out");
    questionEl.classList.add("fade-in");

    setTimeout(() => {
      questionEl.classList.remove("fade-in");
    }, 300);
  }, 300);
}

// ================================
// Initial state
// ================================

questionEl.textContent = questions[currentIndex];
updateProgress();
backBtn.disabled = true;

// ================================
// NEXT BUTTON
// ================================

nextBtn.addEventListener("click", async () => {
  const answer = answerEl.value.trim();

  if (!answer) {
    alert("Please enter an answer");
    return;
  }

  nextBtn.disabled = true;

  // Save answer to Supabase
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
// Clear input and move to next question
  answerEl.value = "";
  currentIndex++;

  if (currentIndex < questions.length) {
    animateQuestionChange(questions[currentIndex]);
    updateProgress();
    backBtn.disabled = false;
    nextBtn.disabled = false;
    answerEl.focus();
  } else {
    document.body.innerHTML = `
      <h2>All done! 🎉</h2>
      <p>Thanks for completing the questionnaire.</p>
    `;
  }
});

// ================================
// BACK BUTTON
// ================================

backBtn.addEventListener("click", () => {
  if (currentIndex === 0) return;

  currentIndex--;
  animateQuestionChange(questions[currentIndex]);
  updateProgress();

  answerEl.value = "";
  answerEl.focus();

  if (currentIndex === 0) {
    backBtn.disabled = true;
  }
});
