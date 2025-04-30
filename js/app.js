// Gallery Modal

const modalOverlay = document.querySelector('.modal-overlay');
const modalContainer = document.querySelector('.modal-container');
const modalImg = document.querySelector('.modal-img');
const closeBtn = document.querySelector('.close-btn');
const galleryIcons = document.querySelectorAll('.gallery-icon');

// Function to get average color of an image
function getAverageColor(img) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const width = img.naturalWidth || img.offsetWidth;
  const height = img.naturalHeight || img.offsetHeight;

  canvas.width = width;
  canvas.height = height;
  context.drawImage(img, 0, 0, width, height);

  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;
  let r = 0,
    g = 0,
    b = 0;

  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }

  const pixels = data.length / 4;
  r = Math.round(r / pixels);
  g = Math.round(g / pixels);
  b = Math.round(b / pixels);

  return { r, g, b };
}

// Function to determine if color is light or dark
function isLightColor(r, g, b) {
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
}

// Function to set button styles based on image color
function setButtonStyles(img) {
  const { r, g, b } = getAverageColor(img);
  const isLight = isLightColor(r, g, b);

  const root = document.documentElement;

  if (isLight) {
    // For light backgrounds, use dark button
    root.style.setProperty('--btn-bg', 'rgba(0, 0, 0, 0.5)');
    root.style.setProperty('--btn-bg-hover', 'rgba(0, 0, 0, 0.7)');
    root.style.setProperty('--btn-border', 'rgba(255, 255, 255, 0.3)');
    root.style.setProperty('--btn-border-hover', 'rgba(255, 255, 255, 0.5)');
    root.style.setProperty('--btn-color', '#ffffff');
  } else {
    // For dark backgrounds, use light button
    root.style.setProperty('--btn-bg', 'rgba(255, 255, 255, 0.5)');
    root.style.setProperty('--btn-bg-hover', 'rgba(255, 255, 255, 0.7)');
    root.style.setProperty('--btn-border', 'rgba(0, 0, 0, 0.3)');
    root.style.setProperty('--btn-border-hover', 'rgba(0, 0, 0, 0.5)');
    root.style.setProperty('--btn-color', '#000000');
  }
}

// Add click event listeners to gallery icons
galleryIcons.forEach((icon) => {
  icon.addEventListener('click', (e) => {
    console.log('Gallery icon clicked');
    e.preventDefault();
    const imgSrc = icon.getAttribute('data-image');
    console.log('Image source:', imgSrc);
    modalImg.src = imgSrc;

    // Wait for image to load before analyzing colors
    modalImg.onload = () => {
      console.log('Image loaded');
      setButtonStyles(modalImg);
      modalOverlay.classList.add('show-modal');
      console.log('Modal should be visible now');
    };
  });
});

// Add click event listener to close button
closeBtn.addEventListener('click', () => {
  console.log('Close button clicked');
  modalOverlay.classList.remove('show-modal');
});

// Add click event listener to modal overlay
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    console.log('Modal overlay clicked');
    modalOverlay.classList.remove('show-modal');
  }
});

// Scroll to Top Button
const scrollBtn = document.querySelector('.scroll-top-btn');

// Show button when scrolling down
window.addEventListener('scroll', () => {
  const scrollHeight = window.pageYOffset;
  const documentHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercentage = (scrollHeight / documentHeight) * 100;

  // Show button when scrolled down
  if (scrollHeight > 100) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }

  // Update border animation based on scroll percentage
  scrollBtn.style.setProperty('--scroll-percentage', `${scrollPercentage}%`);
});

// Scroll to top when button is clicked
scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// ********** set date ************
// select span
const date = (document.getElementById('date').innerHTML =
  new Date().getFullYear());

// ********** nav toggle ************
// select button and links
const navBtn = document.getElementById('nav-toggle');
const links = document.getElementById('nav-links');
// add event listener
navBtn.addEventListener('click', () => {
  links.classList.toggle('show-links');
});

// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll('.scroll-link');
scrollLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    // prevent default
    e.preventDefault();
    links.classList.remove('show-links');

    const id = e.target.getAttribute('href').slice(1);
    const element = document.getElementById(id);
    //
    let position = element.offsetTop - 62;

    window.scrollTo({
      left: 0,
      // top: element.offsetTop,
      top: position,
      behavior: 'smooth',
    });
  });
});
