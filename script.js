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

// ============================================
// TYPING EFFECT WITH GRADIENT ANIMATION
// ============================================
function initTypingEffect() {
    const headline = document.querySelector('.hero-headline');
    if (!headline) return;
    
    const text = headline.getAttribute('data-text');
    headline.textContent = ''; // Clear existing text
    
    // Split text into words to identify last two words
    const words = text.split(' ');
    const lastTwoWords = words.slice(-2).join(' ');
    
    // Split text into characters, preserving spaces and adding line break
    const lines = text.split('. ');
    const line1 = lines[0] + '.';
    const line2 = lines[1];
    
    // Wrap each character in a span
    const chars = [];
    let charIndex = 0;
    
    // First line
    for (let i = 0; i < line1.length; i++) {
        const char = line1[i];
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.setAttribute('data-index', charIndex++);
        headline.appendChild(span);
        chars.push(span);
    }
    
    // Line break
    headline.appendChild(document.createElement('br'));
    
    // Second line - mark last two words as gold
    const line2Start = text.indexOf(line2);
    const lastTwoWordsStart = text.indexOf(lastTwoWords);
    
    for (let i = 0; i < line2.length; i++) {
        const char = line2[i];
        const span = document.createElement('span');
        span.className = 'char';
        
        // Check if this character is part of last two words
        const absoluteIndex = line2Start + i;
        if (absoluteIndex >= lastTwoWordsStart) {
            span.classList.add('gold');
        }
        
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.setAttribute('data-index', charIndex++);
        headline.appendChild(span);
        chars.push(span);
    }
    
    // Typing animation with GSAP
    const tl = gsap.timeline({
        onComplete: () => {
            // After typing completes, trigger gradient sweep
            headline.classList.add('gradient-active');
            
            // Sweep gradient across each character sequentially
            chars.forEach((char, index) => {
                setTimeout(() => {
                    char.classList.add('sweeping');
                    
                }, index * 30); // 30ms delay between each character
                // After sweep completes, mark as complete
                if (index == chars.length - 1) {
                    setTimeout(() => {
                        headline.classList.add('sweep-complete');
                    }, 600);
                }
            });
        }
    });
    
    // Animate each character appearing
    chars.forEach((char, index) => {
        tl.to(char, {
            opacity: 1,
            y: 0,
            duration: 0.05,
            ease: "power1.out"
        }, index * 0.03);
    });
    
    return tl;
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
        // Typing effect will be called separately
        .call(() => {
            initTypingEffect();
        })
        .to(".cta-button", {
            y: 0,
            duration: 0.8,
            opacity: 1,
            ease: "power2.out"
        })
        .from(".hero-watch-carousel", {
            opacity: 0,
            scale: 0.8,
            duration: 1.2,
            ease: "power3.out"
        }, "-=0.8")
        .from(".carousel-indicators", {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.5")
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
        // Watch carousel moves fastest (creates foreground effect)
        .to(".hero-watch-carousel", {
            y: -800,
            ease: "none"
        }, 0)
        
        // Text moves slower (mid-ground)
        .to(".hero-text", {
            y: -150,
            ease: "none"
        }, 0)
        
        // Background scales slightly (depth effect)
        .to(".hero-background", {
            scale: 1.55,
            ease: "none"
        }, 0)
        
        // Indicators move with carousel
        .to(".carousel-indicators", {
            y: -800,
            ease: "none"
        }, 0);
    }, 3500); // Wait for loading animation to complete
}

// ============================================
// 3D STACKED WATCH CAROUSEL SYSTEM
// ============================================
let currentSlide = 0;
let autoPlayInterval;
let isCarouselPaused = false;

function initWatchCarousel() {
    const watches = document.querySelectorAll('.hero-watch');
    const indicators = document.querySelectorAll('.indicator');
    const carousel = document.querySelector('.hero-watch-carousel');
    
    if (!watches.length || watches.length < 3) return;
    
    // Calculate positions for circular carousel
    function getPosition(index, current) {
        const total = watches.length;
        let diff = index - current;
        
        // Wrap around for circular behavior
        if (diff < -1) diff += total;
        if (diff > 1) diff -= total;
        
        if (diff === -1) return 'left';
        if (diff === 0) return 'center';
        if (diff === 1) return 'right';
        return 'hidden';
    }
    
    // Update all watch positions
    function updatePositions(newIndex, animate = true) {
        // Get the container width to calculate positions
        const container = document.querySelector('.hero-watch-carousel');
        const containerWidth = container ? container.offsetWidth : 0;
        const spacing = containerWidth * 0.3; // 30% of container width
        
        watches.forEach((watch, index) => {
            const position = getPosition(index, newIndex);
            const oldPosition = watch.getAttribute('data-position');
            
            watch.setAttribute('data-position', position);
            
            // Define transforms for each position
            const transforms = {
                'left': { 
                    xPercent: -50,
                    yPercent: -50,
                    x: -spacing,
                    y: 0,
                    scale: 0.65, 
                    rotateY: 25, 
                    opacity: 0.3,
                    filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3)) blur(1px)',
                    zIndex: 1
                },
                'center': { 
                    xPercent: -50,
                    yPercent: -50,
                    x: 0,
                    y: 0,
                    scale: 1, 
                    rotateY: 0, 
                    opacity: 1,
                    filter: 'drop-shadow(0 30px 80px rgba(0, 0, 0, 0.6))',
                    zIndex: 3
                },
                'right': { 
                    xPercent: -50,
                    yPercent: -50,
                    x: spacing,
                    y: 0,
                    scale: 0.65, 
                    rotateY: -25, 
                    opacity: 0.3,
                    filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3)) blur(1px)',
                    zIndex: 1
                },
                'hidden': { 
                    xPercent: -50,
                    yPercent: -50,
                    x: position === 'left' ? -spacing * 2 : spacing * 2,
                    y: 0,
                    scale: 0.5, 
                    opacity: 0,
                    zIndex: 0
                }
            };
            
            const target = transforms[position];
            
            // Apply transforms - either animated or instant
            if (animate && oldPosition !== position) {
                gsap.to(watch, {
                    xPercent: target.xPercent,
                    yPercent: target.yPercent,
                    x: target.x,
                    y: target.y,
                    scale: target.scale,
                    rotateY: target.rotateY,
                    opacity: target.opacity,
                    filter: target.filter || 'none',
                    zIndex: target.zIndex,
                    duration: 1,
                    ease: "power3.inOut"
                });
            } else if (!animate) {
                // Set initial position instantly (no animation)
                gsap.set(watch, {
                    xPercent: target.xPercent,
                    yPercent: target.yPercent,
                    x: target.x,
                    y: target.y,
                    scale: target.scale,
                    rotateY: target.rotateY,
                    opacity: target.opacity,
                    filter: target.filter || 'none',
                    zIndex: target.zIndex
                });
            }
        });
    }
    
    // Initialize positions
    updatePositions(currentSlide, false);
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        if (slideIndex < 0) slideIndex = watches.length - 1;
        if (slideIndex >= watches.length) slideIndex = 0;
        
        // Update indicators
        indicators[currentSlide].classList.remove('active');
        indicators[slideIndex].classList.add('active');
        
        currentSlide = slideIndex;
        updatePositions(currentSlide, true);
    }
    
    // Auto-play functionality
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            if (!isCarouselPaused) {
                goToSlide(currentSlide + 1);
            }
        }, 5000); // Change every 5 seconds
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Pause on hover
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            isCarouselPaused = true;
        });
        
        carousel.addEventListener('mouseleave', () => {
            isCarouselPaused = false;
        });
    }
    
    // Manual control via indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoPlay();
            goToSlide(index);
            startAutoPlay(); // Restart auto-play after manual interaction
        });
    });
    
    // Click on side watches to navigate
    watches.forEach((watch, index) => {
        watch.addEventListener('click', () => {
            const position = watch.getAttribute('data-position');
            if (position === 'left') {
                stopAutoPlay();
                goToSlide(currentSlide - 1);
                startAutoPlay();
            } else if (position === 'right') {
                stopAutoPlay();
                goToSlide(currentSlide + 1);
                startAutoPlay();
            }
        });
    });
    
    // Start auto-play after initial load
    setTimeout(() => {
        startAutoPlay();
    }, 4000); // Start after hero animation completes
}

// Initialize everything
firstPageAnim();
// mousefollower();
// mousechapta();
initParallaxHero();
initWatchCarousel();

Shery.mouseFollower();
Shery.makeMagnet(".magnet",{
    ease: "Power2.easeOut",
});