document.addEventListener('DOMContentLoaded', () => {
  const groups = document.querySelectorAll('.nav-group');
  const nav = document.querySelector('.main-nav');
  const toggle = document.querySelector('.mobile-toggle');

  groups.forEach(group => {
    const trigger = group.querySelector('.nav-trigger');
    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      const willOpen = !group.classList.contains('open');
      groups.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.nav-trigger').setAttribute('aria-expanded', 'false');
      });
      group.classList.toggle('open', willOpen);
      trigger.setAttribute('aria-expanded', String(willOpen));
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-group')) {
      groups.forEach(group => {
        group.classList.remove('open');
        group.querySelector('.nav-trigger').setAttribute('aria-expanded', 'false');
      });
    }
  });

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('mobile-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? '×' : '☰';
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('mobile-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';
    groups.forEach(group => group.classList.remove('open'));
  }));

  document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.filter-button').forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      document.querySelectorAll('.project-tile').forEach(tile => {
        const show = filter === 'all' || tile.dataset.category === filter;
        tile.classList.toggle('hidden', !show);
      });
    });
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  // This static site does not store form submissions. It prepares a mailto draft instead.
  document.getElementById('contactForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent('Website enquiry — ' + data.get('interest'));
    const body = encodeURIComponent(
      'Name: ' + data.get('name') + '\\n' +
      'Email: ' + data.get('email') + '\\n' +
      'Interest: ' + data.get('interest') + '\\n\\n' +
      'Message:\\n' + data.get('message')
    );
    // Replace the placeholder address below with your preferred business email before publishing.
    window.location.href = 'mailto:ahsan.business.intelligence@gmail.com?subject=' + subject + '&body=' + body;
    document.querySelector('.form-status').textContent = 'Your email app should open with the enquiry prepared. Add your real email address in script.js before publishing.';
  });
});
