browser.tabs.getCurrent(tab => {
  const tabId = tab.id;
  browser.tabs.create({ url: browser.runtime.getURL('pages/newtab.html'), cookieStoreId: tab.cookieStoreId }, () => {
    browser.tabs.remove(tabId);
  });

  browser.history.deleteUrl({ url: browser.runtime.getURL('pages/newtab_redirect.html') });
});
