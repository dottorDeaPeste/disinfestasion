// Handle the navigation hamburger toggle on small screens
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('nav ul');
  if (toggle) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // Generate simple math captcha for contact forms
  const captchaA = document.querySelector('.captcha-a');
  const captchaB = document.querySelector('.captcha-b');
  const captchaExpected = document.querySelector('.captcha-expected');
  if (captchaA && captchaB && captchaExpected) {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    captchaA.textContent = a.toString();
    captchaB.textContent = b.toString();
    captchaExpected.value = (a + b).toString();
  }
});