document.addEventListener("DOMContentLoaded", () => {

  // ═════════════════════════════════════
  // 1. GRAB ELEMENTS
  // ═════════════════════════════════════
  const fab      = document.getElementById("ai-fab");
  const modal    = document.getElementById("chat-modal");
  const closeBtn = document.getElementById("close-chat");
  const messages = document.getElementById("messages");
  const input    = document.getElementById("userInput");
  const sendBtn  = document.getElementById("sendBtn");

  // ✅ FIX #6 — null safety guard
  // Stops the whole script cleanly if any element is missing
  if (!fab || !modal || !closeBtn || !messages || !input || !sendBtn) {
    console.error("FitBot: one or more required elements not found.");
    return;
  }

  // ═════════════════════════════════════
  // 2. OPEN / CLOSE (TOGGLE)
  // ═════════════════════════════════════
  fab.addEventListener("click", () => {
    modal.classList.toggle("active");
    if (modal.classList.contains("active")) input.focus();
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  // ═════════════════════════════════════
  // 3. ADD MESSAGE (single function)
  // ═════════════════════════════════════
  // ✅ FIX #1 — removed duplicate botReply() function
  // One function handles both "user" and "bot" messages
  function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.className = `msg ${type}`;
    msg.textContent = text;         // textContent stays — safe from XSS ✅
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  // ═════════════════════════════════════
  // 4. AI REPLY LOGIC
  // ═════════════════════════════════════
  // ✅ FIX #3 — use const instead of reassigning the parameter
  function getReply(userText) {
    const text = userText.toLowerCase();  // new const, not mutating parameter

    if (text.includes("food") || text.includes("diet")) {
      return "🥗 Balanced diet with protein + carbs + fats.";
    }
    if (text.includes("calorie")) {
      return "🔥 Reduce calories and avoid sugar.";
    }
    if (text.includes("muscle")) {
      return "💪 Train + protein + sleep well.";
    }
    return "🤖 Ask me about food, calories, or fitness.";
  }

  // ═════════════════════════════════════
  // 5. BOT REPLY WITH TYPING DELAY
  // ═════════════════════════════════════

  // ✅ FIX #4 — typing indicator + 750ms delay feels natural
  function botReplyWithDelay(replyText) {
    const typing = document.createElement("div");
    typing.className = "msg bot typing";
    typing.textContent = "typing...";
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {
      typing.remove();
      addMessage(replyText, "bot");
    }, 750);
  }

  // ═════════════════════════════════════
  // 6. SEND MESSAGE
  // ═════════════════════════════════════
  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    botReplyWithDelay(getReply(text));  // ✅ FIX #1 + #4 combined
    input.value = "";
    input.focus();
  }

  sendBtn.addEventListener("click", sendMessage);

  // ✅ FIX #2 — Enter key support
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // ═════════════════════════════════════
  // 7. DRAG — with boundary clamping
  // ═════════════════════════════════════
  const header = modal.querySelector(".chat-header");
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  modal.style.position = "fixed";

  header.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - modal.getBoundingClientRect().left;
    offsetY = e.clientY - modal.getBoundingClientRect().top;
    header.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    // ✅ FIX #5 — clamp inside viewport, modal can't escape screen
    const maxX = window.innerWidth  - modal.offsetWidth;
    const maxY = window.innerHeight - modal.offsetHeight;

    const newX = Math.min(Math.max(0, e.clientX - offsetX), maxX);
    const newY = Math.min(Math.max(0, e.clientY - offsetY), maxY);

    modal.style.left   = newX + "px";
    modal.style.top    = newY + "px";
    modal.style.right  = "auto";
    modal.style.bottom = "auto";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    header.style.cursor = "grab";
  });

  // ═════════════════════════════════════
  // 8. WELCOME MESSAGE
  // ═════════════════════════════════════
  addMessage("👋 Hi! Ask me about food, calories, or fitness goals.", "bot");

});