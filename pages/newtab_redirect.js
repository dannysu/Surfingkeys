browser.tabs.getCurrent(tab => {
  if (!tab.cookieStoreId || !tab.cookieStoreId.startsWith('firefox-container-')) {
    browser.history.deleteUrl({ url: browser.runtime.getURL('pages/newtab_redirect.html') });
    return;
  }

  var tabId = tab.id;
  browser.tabs.create({ url: browser.runtime.getURL('pages/newtab.html'), cookieStoreId: tab.cookieStoreId }, () => {
    browser.tabs.remove(tabId);
  });

  browser.history.deleteUrl({ url: browser.runtime.getURL('pages/newtab_redirect.html') });
});
