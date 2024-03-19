
// 開場動畫 
document.addEventListener("DOMContentLoaded", function () {

    var hasSeenAnimation = sessionStorage.getItem("hasSeenAnimation");

    // 如果已經設定了變數，則隱藏開場動畫
    if (hasSeenAnimation) {
        document.querySelector(".animation-wrapper").style.display = "none";
        document.querySelector(".slider").style.display = "none";
    } else {
        // 如果沒有設定，則顯示開場動畫並設定變數為 true
        sessionStorage.setItem("hasSeenAnimation", true);

        // 加入新的class 讓首頁動畫延遲2.2s
        document.body.classList.add("animation-started");

        setTimeout(function () {
            animation.style.pointerEvents = "none";
        }, 2500);
    }
});


// opening animation
let hero = document.querySelector(".hero");
let slider = document.querySelector(".slider");
let animation = document.querySelector("section.animation-wrapper");

const time_line = new TimelineMax();

// parameter1 是要控制的對象
// parameter2 是duration
// parameter3 是控制對象的原始狀態
// parameter4 是控制對象的動畫結束後的狀態
time_line
    .fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInOut })
    .fromTo(
        hero,
        1.2,
        { width: "80%" },
        { width: "100%", ease: Power2.easeInOut }
    )
    .fromTo(
        slider,
        1,
        { x: "-100%" },
        { x: "0%", ease: Power2.easeInOut },
        "-=1.2"
    )
    .fromTo(animation, 0.3, { opacity: 1 }, { opacity: 0 });

// setTimeout(() => {
//   animation.style.pointerEvents = "none";
// }, 2500);

// rwd photo
const heroImage = document.getElementById('heroImage');
const windowWidth = window.innerWidth;

// 設定不同寬度時要顯示的圖片路徑
const desktopImage = './pictures/profile.png';
const mobileImage = './pictures/profile_p.png';

window.addEventListener('load', () => {
    if (windowWidth <= 500) {
        heroImage.src = mobileImage;
    } else {
        heroImage.src = desktopImage;
    }
});



// navbar 滾動底線
let nav = document.querySelector("nav");
const projects = document.querySelectorAll(".card");

window.addEventListener("scroll", () => {

    // navbar shadow
    if (window.scrollY == 0) {
        nav.style.boxShadow = "";
    } else {
        nav.style.boxShadow = "0 10px 6px -6px #777";
    }

    // project fade-in-out
    projects.forEach((project) => {
        const projectPosition = project.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (projectPosition.top < windowHeight) {
            project.classList.add("animate");
        } else {
            project.classList.remove("animate");
        }
    });

});


