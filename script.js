// const scroll = new LocomotiveScroll({
//     el: document.querySelector("#main"),
//     smooth: true,
// });

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
        .to("#hero", {
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
        .from("#nav", {
            y: -10,
            duration: 0.5,
            opacity: 0,
            delay: 0.5,
        })
        .to(".boundingelem", {
            y: 0,
            duration: 0.75,
            stagger: 0.25,
        })
        .to(".hero-watch-bg",{
            scale: 1,
            duration: 1,
            ease: "Power3.easeOut",
        })
        .from("#herofooter", {
            y: -10,
            duration: 1,
            opacity: 0,
            delay: -0.5,
        });
}

firstPageAnim();
mousefollower();
mousechapta();

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
