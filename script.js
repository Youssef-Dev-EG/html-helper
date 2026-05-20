let userAnswers = { 1: null, 2: null };
let xp = 0;
let badges = [];
let svgInteractions = 0;

// تشغيل البيانات والـ Streak عند الفتح
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem("kidsCodeLevel2") === "unlocked") {
        unlockLevel2Directly();
        xp = 50;
        badges.push("🧙‍♂️ ساحر الـ SVG");
        updateStatsUI();
    }
    checkUserDailyStreak();
});

function checkAnswer(questionNum, answer, buttonClicked) {
    userAnswers[questionNum] = answer;
    const parent = buttonClicked.parentElement;
    const buttons = parent.querySelectorAll('.quiz-btn');
    buttons.forEach(btn => btn.classList.remove('selected-answer'));
    buttonClicked.classList.add('selected-answer');
    updateBotMessage("🤔", "مممم.. أراك اخترت إجابة! اضغط على 'إرسال الإجابات' لنرى النتيجة!");
}

function finishQuiz() {
    let finalScore = 0;
    if (userAnswers[1] === 'h1') finalScore++;
    if (userAnswers[2] === 'color') finalScore++;
    
    const resultDiv = document.getElementById("quiz-result");
    
    if (finalScore === 2) {
        if (localStorage.getItem("kidsCodeLevel2") !== "unlocked") {
            xp += 50;
            badges.push("🧙‍♂️ ساحر الـ SVG");
            localStorage.setItem("kidsCodeLevel2", "unlocked");
        }
        resultDiv.innerHTML = `<p style="color: #2ed573; font-weight: bold;">🎉 ممتاز! كودك صحيح 2/2. حصلت على +50 XP!</p>`;
        unlockLevel2Directly();
        updateStatsUI();
        launchCelebration();
        updateBotMessage("😎", "يا لك من عبقري!! لقد نجحت في الاختبار وفتحت المستوى الثاني.");
    } else {
        resultDiv.innerHTML = `<p style="color: #ff7675; font-weight: bold;">❌ هناك خطأ في الكود. حاول مجدداً!</p>`;
        updateBotMessage("😢", "أوه.. هناك خطأ. لا بأس، راجع الإجابات وحاول مرة أخرى.");
    }
}

function unlockLevel2Directly() {
    const box = document.getElementById("level-2-box");
    const badge = document.getElementById("lvl-2-badge");
    const content = document.getElementById("level-2-content");
    if(box && badge && content) {
        box.classList.remove("locked");
        box.style.opacity = "1";
        badge.innerHTML = "المستوى الثاني 🔓 مفتوح";
        badge.style.background = "#2ed573";
        badge.style.color = "#000";
        content.style.display = "block";
    }
}

function updateStatsUI() {
    document.getElementById("user-xp").innerText = xp;
    if(badges.length > 0) {
        document.getElementById("user-badges").innerText = badges.join(", ");
    }
}

function changeAlienColor(bodyColor) {
    const alienBody = document.getElementById("alien-body");
    if (alienBody) alienBody.style.fill = bodyColor;
    svgInteractions++;
    updateBotMessage("🎨", "واو! ألوان جميلة! أنت فنان حقيقي!");
}

function startLesson3() {
    let kidName = prompt("مرحباً بك! ما هو اسمك يا بطل؟");
    const output = document.getElementById("lesson3-output");
    if (kidName) {
        output.innerHTML = `✨ عظيم يا <strong>${kidName}</strong>! المتصفح حفظ اسمك جوة متغير!`;
        updateBotMessage("🤩", "مدهش! لقد حفظت اسمك في الذاكرة بنجاح!");
    }
}

// ميزة 2: الوضع الليلي والنهاري
function toggleKidsCodeTheme() {
    document.body.classList.toggle("light-mode-active");
}

// ميزة 3: تأثير الـ Confetti والاحتفال
function launchCelebration() {
    const canvas = document.getElementById("celebration-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight;
    let particles = [];
    const colors = ["#deff9a", "#2ed573", "#6c5ce7", "#a29bfe", "#74b9ff"];
    for (let i = 0; i < 50; i++) {
        particles.push({ 
            x: Math.random()*canvas.width, 
            y: Math.random()*canvas.height-canvas.height, 
            r: Math.random()*6+2, 
            color: colors[Math.floor(Math.random()*colors.length)],
            vy: Math.random()*3+2
        });
    }
    function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        particles.forEach(p => { 
            ctx.beginPath(); 
            ctx.fillStyle=p.color; 
            ctx.arc(p.x,p.y+=p.vy,p.r,0,Math.PI*2); 
            ctx.fill(); 
        });
        if(particles[0].y < canvas.height) requestAnimationFrame(draw);
    }
    draw();
}

// ميزة 3: محرك المحاكي كيدو
function updateBotMessage(emoji, message) {
    document.getElementById("bot-face").innerText = emoji;
    document.getElementById("bot-message").innerText = message;
}

// ميزة 4: لوحة تحليلات المدرس
function generatePerformanceReport() {
    let svgProgress = Math.min(svgInteractions * 34, 100);
    let logicProgress = localStorage.getItem("kidsCodeLevel2") === "unlocked" ? 100 : 0;
    document.getElementById("skill-svg-bar").style.width = svgProgress + "%";
    document.getElementById("skill-svg-pct").innerText = svgProgress + "%";
    document.getElementById("skill-logic-bar").style.width = logicProgress + "%";
    document.getElementById("skill-logic-pct").innerText = logicProgress + "%";
    
    // تقرير نصي
    const report = `
    📊 تقرير الأداء الفوري:
    ✨ إجمالي النقاط: ${xp} XP
    🏆 الأوسمة: ${badges.length > 0 ? badges.join(", ") : "لم تحصل على أوسمة بعد"}
    🎨 مستوى الإبداع: ${svgProgress}%
    🧠 مستوى المنطق: ${logicProgress}%
    `;
    
    updateBotMessage("📋", "تم إنشاء التقرير! تحقق من الرسالة أعلاه.");
}

// ميزة 5: عداد الشعلة والـ Streak
function checkUserDailyStreak() {
    let count = parseInt(localStorage.getItem("kidsCode_streak")) || 1;
    document.getElementById("streak-count-text").innerText = count;
    if(count >= 1) {
        document.getElementById("streak-fire-icon").classList.add("streak-active-fire");
    }
}

// ميزة 6: ركن الأساطير وقصص الكفاح
function triggerLegendInspiration(legendKey) {
    const story = document.getElementById("story-" + legendKey);
    if(story) {
        story.style.display = story.style.display === "none" ? "block" : "none";
        if(story.style.display === "block") {
            updateBotMessage("📖", `اقرأ هذه القصة الملهمة واستمد منها الشجاعة!`);
        }
    }
}
