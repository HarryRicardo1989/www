const yearElement = document.getElementById('year');
const currentYear = new Date().getFullYear();
yearElement.innerHTML += ` &copy;${currentYear}`;
