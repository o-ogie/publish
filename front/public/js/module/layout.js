particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 60,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.1,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 6,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.1,
        "width": 2
      },
      "move": {
        "enable": true,
        "speed": 1.5,
        "direction": "top",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "repulse"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });


// window.addEventListener('scroll', () => {
//     if (window.pageYOffset > 0) {
//         document.querySelector('#layoutWrap').classList.add('scrolled');
//         document.querySelector('#logo').style.filter = "invert(0%)";
//         document.querySelector('#write>button>a').style.filter = "invert(100%)";
//         document.querySelector('input[id="menu_icon"] + label').style.filter = "invert(100%)";
//     } else {
//         document.querySelector('#layoutWrap').classList.remove('scrolled');
//         document.querySelector('#logo').style.filter = "invert(100%)";
//         document.querySelector('#write>button>a').style.filter = "invert(0%)";
//         document.querySelector('input[id="menu_icon"] + label').style.filter = "invert(0%)";
//     }
// });


document.querySelector('#layout').addEventListener('mouseover', () => {
      document.querySelector('#layoutWrap').classList.add('scrolled');
      document.querySelector('#logo').style.filter = "invert(0%)";
      document.querySelector('#write>button>a').style.filter = "invert(100%)";
      document.querySelector('input[id="menu_icon"] + label').style.filter = "invert(100%)";
});
document.querySelector('#layout').addEventListener('mouseout', () => {
      document.querySelector('#layoutWrap').classList.remove('scrolled');
      document.querySelector('#logo').style.filter = "invert(100%)";
      document.querySelector('#write>button>a').style.filter = "invert(0%)";
      document.querySelector('input[id="menu_icon"] + label').style.filter = "invert(0%)";
});



document.querySelector('#menu_icon').addEventListener('click', () => {
    document.querySelector('#userMenu').classList.toggle('clicked');
});

// 로그아웃
document.querySelector('#logout').addEventListener('click', (e) => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    location.href= "/"
})




