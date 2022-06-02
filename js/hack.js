{
    const effects = [
        {
            options: {
                shapeColors: ['#35c394','#9985ee','#f54665','#4718f5','#f5aa18'],
                shapesOnTop: true
            },
            hide: {
                lettersAnimationOpts: {
                    duration: 300,
                    delay: (t,i)  => (t.parentNode.children.length-i-1)*30,
                    easing: 'easeOutExpo',
                    opacity: 0,
                    translateY: (t,i) => i%2 === 0 ? '80%' : '-80%',
                    rotate: (t,i) => i%2 === 0 ? -25 : 25
                },
                shapesAnimationOpts: {
                    duration: 50,
                    easing: 'easeOutExpo',
                    translateX: t => t.dataset.tx,
                    translateY: t => t.dataset.ty,
                    scale: 0,
                    rotate: 0,
                    opacity: {
                        value: 0, 
                        duration: 50, 
                        easing: 'linear'
                    }
                }
            },
            show: {
                lettersAnimationOpts: {
                    duration: 400,
                    delay: (t,i)  => (t.parentNode.children.length-i-1)*80,
                    easing: 'easeOutElastic',
                    opacity: {
                        value: [0,1], 
                        duration: 100, 
                        easing: 'linear'
                    },
                    translateY: (t,i) => i%2 === 0 ? ['-80%', '0%'] : ['80%', '0%'],
                    rotate: [90,0]
                },
                shapesAnimationOpts: {
                    duration: () => anime.random(1000,3000),
                    delay: (t,i) => i*20,
                    easing: 'easeOutElastic',
                    translateX: t => {
                        const tx = anime.random(-250,250);
                        t.dataset.tx = tx;
                        return [0,tx];
                    },
                    translateY: t => {
                        const ty = anime.random(-250,250);
                        t.dataset.ty = ty;
                        return [0,ty];
                    },
                    scale: t => {
                        const s = randomBetween(0.1,0.6);
                        t.dataset.s = s;
                        return [s,s];
                    },  
                    rotate: () => anime.random(-90,90),
                    opacity: {
                        value: 0.6, 
                        duration: 1000, 
                        easing: 'linear'
                    }
                }
            }
        }
    ];

    class Slideshow {
        constructor(el) {
            this.DOM = {};
            this.DOM.el = el;
            this.DOM.slides = Array.from(this.DOM.el.querySelectorAll('.slide'));
            this.DOM.bgs = Array.from(this.DOM.el.querySelectorAll('.slide__bg'));
            this.DOM.words = Array.from(this.DOM.el.querySelectorAll('.word'));
            this.slidesTotal = this.DOM.slides.length;
            this.current = 0;
            this.words = [];
            this.DOM.words.forEach((word, pos) => {
                this.words.push(new Word(word, effects[pos].options));
            });
            
            this.isAnimating = true;
            this.words[this.current].show(effects[this.current].show).then(() => this.isAnimating = false);
        }
        show(direction) {
            if ( this.isAnimating ) return;
            this.isAnimating = true;
            
            let newPos;
            let currentPos = this.current;
            if ( direction === 'next' ) {
                newPos = currentPos < this.slidesTotal - 1 ? currentPos+1 : 0;
            }
            else if ( direction === 'prev' ) {
                newPos = currentPos > 0 ? currentPos-1 : this.slidesTotal - 1;
            }

            this.DOM.slides[newPos].style.opacity = 1;
            this.DOM.bgs[newPos].style.transform = 'none';
            anime({
                targets: this.DOM.bgs[currentPos],
                duration: 600,
                easing: [0.2,1,0.3,1],
                translateY: ['0%', direction === 'next' ? '-100%' : '100%'],
                complete: () => {
                    this.DOM.slides[currentPos].classList.remove('slide--current');
                    this.DOM.slides[currentPos].style.opacity = 0;
                    this.DOM.slides[newPos].classList.add('slide--current');
                    this.words[newPos].show(effects[newPos].show).then(() => this.isAnimating = false);
                }
            });

            this.words[newPos].hide();
            this.words[this.current].hide(effects[currentPos].hide).then(() => {
                
                this.current = newPos;
            });
        }
    }

    const slideshow = new Slideshow(document.querySelector('.slideshow'));
    
}
gsap.registerPlugin(ScrollTrigger);

        let bodyScrollBar = Scrollbar.init(document.querySelector('#my-scrollbar'));
        ScrollTrigger.scrollerProxy("body", {
        scrollTop(value) {
            if (arguments.length) {
            bodyScrollBar.scrollTop = value;
            }
            return bodyScrollBar.scrollTop;
        }
        });
        bodyScrollBar.addListener(ScrollTrigger.update);
        Scrollbar.initAll();
        
// gsap.to(".content h2", {
//     y: -200,
//     ease: "none",
//     scrollTrigger: {
//         trigger: ".timeline",
//         scrub: true
//     }, 
//     });
//     gsap.to(".content p", {
//     y: -150,
//     ease: "none",
//     scrollTrigger: {
//         trigger: ".timeline",
//         scrub: true
//     }, 
//     });
//     gsap.to(".content button", {
//     y: -100,
//     ease: "none",
//     scrollTrigger: {
//         trigger: ".timeline",
//         scrub: true
//     }, 
//     });
//     gsap.from(".timeline h2", {
//         opacity: 0.2,
//         ease: "none",
//         scrollTrigger: {
//             trigger: ".timeline h2",
//             scrub: true
//         }, 
//     });
//     gsap.to(".timeline .wrapper", {
//     yPercent: -10,
//     ease: "none",
//     scrollTrigger: {
//         trigger: ".timeline .wrapper",
//         scrub: true
//     }, 
//     });
//     gsap.from(".timeline .row", {
//     opacity: 0,
//     ease: "none",
//     scrollTrigger: {
//         trigger: ".timeline h2",
//         scrub: true
//     }, 
//     });
//     gsap.to(".timeline .eyes", {
//         rotation: -5,
//         ease: "none",
//         scrollTrigger: {
//             trigger: ".timeline .eyes",
//             scrub: true
//         }, 
//     });
//         gsap.to(".timeline .image-2", {
//             yPercent: 5,
//             ease: "none",
//             duration: 3,
//             yoyo: true,
//             repeat: -1
//         });
//         gsap.from(".prizes", {
//             opacity: 0.2,
//             ease: "Power0.easeNone",
//             scrollTrigger: {
//                 trigger: ".prizes h2",
//                 scrub: true
//             }, 
//         });
//         gsap.to(".prizes img", {
//             yPercent: -10,
//             ease: "none",
//             scrollTrigger: {
//                 trigger: ".prizes img",
//                 scrub: true
//             }, 
//         });
//         gsap.to(".prizes .grid", {
//             yPercent: -10,
//             ease: "none",
//             scrollTrigger: {
//                 trigger: ".prizes .content",
//                 scrub: true
//             }, 
//             });
//             gsap.from(".judges h2", {
//                 opacity: 0.3,
//                 ease: "none",
//                 scrollTrigger: {
//                     trigger: ".judges h2",
//                     scrub: true
//                 }, 
//             });
        
        