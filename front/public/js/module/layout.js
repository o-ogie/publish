window.addEventListener('scroll', () => {
    if (window.pageYOffset > 0) {
        document.querySelector('#layoutWrap').classList.add('scrolled');
    } else {
        document.querySelector('#layoutWrap').classList.remove('scrolled');
    }
});

// let prevScroll = window.pageYOffset;
// window.addEventListener('scroll', () => {
//     let currentScroll = window.pageYOffset;
//     console.log('prevScroll :', prevScroll);
//     console.log('currentScroll :', currentScroll);
//     if (prevScroll > currentScroll) {
//         document.querySelector('#layoutWrap').classList.add('scrolled');
//     } else {
//         document.querySelector('#layoutWrap').classList.remove('scrolled');
//     }
// });



document.querySelector('#menu_icon').addEventListener('click', () => {

    document.querySelector('#userMenu').classList.toggle('clicked');
});