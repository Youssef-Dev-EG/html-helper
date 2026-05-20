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

// فحص إجابة السؤال وتحديد الاختيار
function checkAnswer(questionNum, answer, buttonClicked) {
    userAnswers[questionNum] = answer;
    const parent = buttonClicked.parentElement;
    const buttons = parent.querySelectorAll('.quiz-btn');
    buttons.forEach(btn => btn.classList.remove('selected-answer'));
    buttonClicked.classList.add('selected-answer');
    updateBotMessage("🤔", "مممم.. أراك اخترت إجابة! اضغط على 'إرسال الإجابات' لنرى النتيجة!");
}

// إنهاء الاختبار وفحص النتائج
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

// فتح المستوى الثاني مباشرة
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

// تحديث واجهة الإحصائيات
function updateStatsUI() {
    document.getElementById("user-xp").innerText = xp;
    if(badges.length > 0) {
        document.getElementById("user-badges").innerText = badges.join(", ");
    }
}

// تغيير لون الكائن الفضائي
function changeAlienColor(bodyColor) {
    const alienBody = document.getElementById("alien-body");
    if (alienBody) alienBody.style.fill = bodyColor;
    svgInteractions++;
    updateBotMessage("🎨", "واو! ألوان جميلة! أنت فنان حقيقي!");
}

// بدء درس المتغيرات
function startLesson3() {
    let kidName = prompt("مرحباً بك! ما هو اسمك يا بطل؟");
    const output = document.getElementById("lesson3-output");
    if (kidName) {
        output.innerHTML = `✨ عظيم يا <strong>${kidName}</strong>! المتصفح حفظ اسمك جوة متغير!`;
        updateBotMessage("🤩", "مدهش! لقد حفظت اسمك في الذاكرة بنجاح!");
    }
}

// تبديل الوضع الليلي والنهاري
function toggleKidsCodeTheme() {
    document.body.classList.toggle("light-mode-active");
}

// تأثير الاحتفال بالحلوى الملونة
function launchCelebration() {
    const canvas = document.getElementById("celebration-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight;
    let particles = [];
    const colors = ["#deff9a", "#2ed573", "#6c5ce7", "#a29bfe", "#74b9ff", "#ff7675"];
    
    for (let i = 0; i < 60; i++) {
        particles.push({ 
            x: Math.random() * canvas.width, 
            y: Math.random() * canvas.height - canvas.height, 
            r: Math.random() * 6 + 2, 
            color: colors[Math.floor(Math.random() * colors.length)],
            vy: Math.random() * 4 + 2,
            vx: (Math.random() - 0.5) * 2
        });
    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { 
            ctx.beginPath(); 
            ctx.fillStyle = p.color; 
            ctx.arc(p.x += p.vx, p.y += p.vy, p.r, 0, Math.PI * 2); 
            ctx.fill();
        });
        if(particles[0].y < canvas.height) requestAnimationFrame(draw);
    }
    draw();
}

// محرك المحاكي كيدو - تحديث رسالة البوت
function updateBotMessage(emoji, message) {
    document.getElementById("bot-face").innerText = emoji;
    document.getElementById("bot-message").innerText = message;
}

// لوحة تحليلات الأداء
function generatePerformanceReport() {
    let svgProgress = Math.min(svgInteractions * 34, 100);
    let logicProgress = localStorage.getItem("kidsCodeLevel2") === "unlocked" ? 100 : 0;
    
    document.getElementById("skill-svg-bar").style.width = svgProgress + "%";
    document.getElementById("skill-svg-pct").innerText = svgProgress + "%";
    document.getElementById("skill-logic-bar").style.width = logicProgress + "%";
    document.getElementById("skill-logic-pct").innerText = logicProgress + "%";
    
    const reportText = `📊 تقرير الأداء الفوري:\n✨ إجمالي النقاط: ${xp} XP\n🏆 الأوسمة: ${badges.length > 0 ? badges.join(", ") : "لم تحصل على أوسمة بعد"}\n🎨 الإبداع: ${svgProgress}%\n🧠 المنطق: ${logicProgress}%`;
    
    updateBotMessage("📋", reportText);
}

// عداد الشعلة والـ Streak
function checkUserDailyStreak() {
    let count = parseInt(localStorage.getItem("kidsCode_streak")) || 1;
    document.getElementById("streak-count-text").innerText = count;
    if(count >= 1) {
        document.getElementById("streak-fire-icon").classList.add("streak-active-fire");
    }
}

// ركن الأساطير وقصص الكفاح
function triggerLegendInspiration(legendKey) {
    const story = document.getElementById("story-" + legendKey);
    if(story) {
        const isVisible = story.style.display === "block";
        story.style.display = isVisible ? "none" : "block";
        if(!isVisible) {
            updateBotMessage("📖", "اقرأ هذه القصة الملهمة واستمد منها الشجاعة!");
        }
    }
}
