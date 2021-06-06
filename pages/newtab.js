var listEl = document.querySelector('ul.top-sites-list');

var pinnedSites = [
  {
    url: 'https://news.ycombinator.com/',
    text: 'news.ycombinator.com',
    image: 'https://news.ycombinator.com/favicon.ico'
  },
  {
    url: 'https://slickdeals.net/',
    text: 'slickdeals.net',
    image: 'https://slickdeals.net/images/slickdeals_icon.svg'
  },
  {
    url: 'https://www.reddit.com/',
    text: 'reddit.com',
    image: 'https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-76x76.png'
  },
  {
    url: 'https://www.youtube.com/',
    text: 'youtube.com',
    image: 'https://www.youtube.com/s/desktop/79946f8f/img/favicon_96x96.png'
  }
];

var html = '';
for (const site of pinnedSites) {
  html += `<li class="top-site-outer">
  <div class="top-site-inner">
    <a class="top-site-button" href="${site.url}" tabindex="0" draggable="true">
      <div class="tile">
        <div class="icon-wrapper" data-fallback="n">
          <div class="top-site-icon rich-icon" style="background-image: url(${site.image});"></div>
        </div>
      </div>
      <div class="title has-icon pinned">
        <span dir="auto"><div class="icon icon-pin-small"></div>${site.text}</span>
      </div>
    </a>
  </div>
</li>`;
}

browser.topSites.get({ includeFavicon: true, newtab: true }).then(sites => {
  var i = 0;
  sites = sites.filter(x => {
    for (const site of pinnedSites) {
      if (x.url === site.url) {
        return false;
      }
    }
    return true;
  });
  sites = sites.slice(0, 8 - pinnedSites.length);
  for (const site of sites) {
    var liClass = '';
    if (i >= 2) {
      liClass = 'hide-for-narrow';
    }
    html += `<li class="top-site-outer ${liClass}">
  <div class="top-site-inner">
    <a class="top-site-button" href="${site.url}" tabindex="0" draggable="true">
      <div class="tile">
        <div class="icon-wrapper" data-fallback="n">
          <div class="top-site-icon rich-icon" style="background-image: url(${site.favicon});"></div>
        </div>
      </div>
      <div class="title">
        <span dir="auto">${site.title}</span>
      </div>
    </a>
  </div>
</li>`;
    i++;
  }
  listEl.innerHTML = html;
});

listEl.innerHTML = html;
