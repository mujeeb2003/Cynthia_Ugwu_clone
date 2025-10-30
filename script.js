// ============================================
// LOCOMOTIVE SCROLL - DISABLED FOR PARALLAX HERO
// (Conflicts with ScrollTrigger scrubbing)
// ============================================
// const scroll = new LocomotiveScroll({
//     el: document.querySelector("#main"),
//     smooth: true,
// });

// ============================================
// GSAP SCROLLTRIGGER REGISTRATION
// ============================================
gsap.registerPlugin(ScrollTrigger);

var timeout;
function mousechapta() {
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    var xdiff = 0;
    var ydiff = 0;
    window.addEventListener("mousemove", function (dets) {
        this.clearTimeout(timeout);

        xdiff = dets.clientX - xprev;
        ydiff = dets.clientY - yprev;

        xprev = dets.clientX;
        yprev = dets.clientY;

        xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
        yscale = gsap.utils.clamp(0.8, 1.2, ydiff);

        mousefollower(xscale, yscale);
        timeout = setTimeout(function () {
            document.querySelector(
                "#minicircle"
            ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
        }, 100);
    });
}

function mousefollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector(
            "#minicircle"
        ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
    });
}

function firstPageAnim() {
    var tl = gsap.timeline();
    tl.to(".fsboundingelem", {
        y: 0,
        duration: 0.5,
        delay: 0.5,
        ease: "Ease.easeIn",
        stagger: 0.2,
    })
        .to(".fsboundingelem", {
            y: -250,
            duration: 0.5,
            delay: 0.5,
            ease: "Ease.easeIn",
            stagger: 0.2,
        })
        .to("#fs", {
            height: "0",
            duration: 1.5,
            delay: -0.5,
            ease: "Ease.easeInOut",
        })
        .to("#elemsc", {
            height: "100%",
            duration: 1.5,
            delay: -1.6,
            ease: "Ease.easeInOut",
        })
        .to("#main", {
            height: "100%",
            duration: 1.5,
            delay: -1.1,
            ease: "Power2.easeInOut",
        })
        // Show NEW parallax hero instead of old hero
        .to(".hero-parallax", {
            display: "block"
        },"<")
        .to("#second", {
            display: "block"
        },"<")
        .to("#about", {
            display: "flex"
        },"<")
        .to("#subscribe", {
            display: "block"
        },"<")
        .to("#footer", {
            display: "flex"
        },"<")
        // Animate parallax hero elements in
        .from(".hero-text #nav", {
            y: -20,
            duration: 0.5,
            opacity: 0,
            delay: 0.5,
        })
        .from(".hero-headline", {
            y: 100,
            duration: 1,
            opacity: 0,
            ease: "power3.out"
        })
        .from(".cta-button", {
            y: 30,
            duration: 0.8,
            opacity: 1,
            ease: "power2.out"
        })
        .from(".hero-watch", {
            x: 200,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        }, "-=0.8")
        .call(() => {
            // Refresh ScrollTrigger after all animations complete
            ScrollTrigger.refresh();
        });
}

// Old hero image hover effects for #second section
document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
    elem.addEventListener("mousemove", function (dets) {
        // console.log(elem.querySelector("h1"))
        // console.log(elem.getBoundingClientRect())
        var difftop = dets.clientY - elem.getBoundingClientRect().top;
        // console.log(difftop);
        diffrot = gsap.utils.clamp(-20, 20, (dets.clientX - rotate) * 0.2);
        rotate = dets.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power1,
            top: difftop,
            left: dets.clientX,
            rotate: diffrot,
        });
        gsap.to(elem.querySelector("h1"), {
            opacity: 0.2,
            ease: Power3,
            x: 50,
        });
    });
    elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power1,
        });
        gsap.to(elem.querySelector("h1"), {
            opacity: 1,
            ease: Power3,
            x: 0,
        });
    });
});

// ============================================
// PARALLAX HERO SCROLLTRIGGER ANIMATION
// ============================================
function initParallaxHero() {
    // Wait for DOM and first page animation
    setTimeout(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: ".hero-parallax",
                start: "top top",
                end: "bottom top",
                scrub: 1, // Smooth scrubbing with slight delay (1 second)
                scroller: "#main", // CRITICAL: Tell ScrollTrigger to watch #main container
                // markers: true // Uncomment for debugging
            }
        })
        // Watch moves fastest (creates foreground effect)
        .to(".hero-watch", {
            y: -300,
            ease: "none"
        }, 0)
        
        // Text moves slower (mid-ground)
        .to(".hero-text", {
            y: -150,
            ease: "none"
        }, 0)
        
        // Background scales slightly (depth effect)
        .to(".hero-background", {
            scale: 1.15,
            ease: "none"
        }, 0);
    }, 3500); // Wait for loading animation to complete
}

// Initialize everything
firstPageAnim();
mousefollower();
mousechapta();
initParallaxHero();