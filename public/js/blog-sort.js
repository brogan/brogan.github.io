(function() {
  'use strict';

  let currentSort = 'date-desc';

  function sortPosts(sortType) {
    const list = document.getElementById('post-list');
    if (!list) return;

    const items = Array.from(list.getElementsByTagName('li'));
    currentSort = sortType;

    // Filter out non-post items (like "No posts yet")
    const posts = items.filter(item => item.hasAttribute('data-date'));

    // Sort based on type
    posts.sort((a, b) => {
      switch(sortType) {
        case 'date-asc':
          return parseInt(a.dataset.date) - parseInt(b.dataset.date);
        case 'date-desc':
          return parseInt(b.dataset.date) - parseInt(a.dataset.date);
        case 'title':
          return a.dataset.title.localeCompare(b.dataset.title);
        default:
          return 0;
      }
    });

    // Reorder DOM elements
    posts.forEach(post => list.appendChild(post));

    // Update button active states
    document.querySelectorAll('.sort-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    const activeBtn = document.getElementById('sort-' + sortType);
    if (activeBtn) activeBtn.classList.add('active');
  }

  // Make sortPosts available globally
  window.sortPosts = sortPosts;

  // Initialize with default sort on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => sortPosts('date-desc'));
  } else {
    sortPosts('date-desc');
  }
})();
