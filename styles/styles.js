document.addEventListener("DOMContentLoaded", () =>{
const themeswitch = document.getElementById('switch');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if(savedTheme){
  body.classList.add(savedTheme);
  themeswitch.checked = savedTheme === 'dark-mode';
}

themeswitch.addEventListener('change', () => {
  if (themeswitch.checked){
    body.classList.add('dark-mode');

    localStorage.setItem('theme', 'dark-mode');
  }else{
    body.classList.remove('dark-mode');

    localStorage.setItem('theme', 'light-mode');
  }
});


});

const slides = document.querySelectorAll('.slide');
const leftArrow = document.querySelector('.arrow-left');
const rightArrow = document.querySelector('.arrow-right');
let currentSlide = 0;

function showSlide(index) {
  slides[currentSlide].classList.remove('active');
  slides[index].classList.add('active');
  currentSlide = index;
}

function nextSlide() {
  let next = (currentSlide + 1) % slides.length;
  showSlide(next);
}

function prevSlide() {
  let prev = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(prev);
}

leftArrow.addEventListener('click', prevSlide);
rightArrow.addEventListener('click', nextSlide);

// Auto slideshow
setInterval(nextSlide, 5000);

//sidebar

  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar'); 
  const content = document.getElementById('content');
  const blurContent = document.querySelector('.blur-content');
    menuToggle.addEventListener('change', () => {
    sidebar.classList.toggle('open');
  content.classList.toggle('blur');
      blurContent.classList.toggle('active');
    });
