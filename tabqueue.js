function removeOverflowingTabs(obj) {
	var tab;
	while (obj.tabList.length > obj.maxTabCount) {
		tab = obj.tabList.shift();

		browser.bookmarks.create({
			title: tab.title,
			url: tab.url
		});

		browser.tabs.remove(tab.id);
	}
}

async function getMaxTabCount(tabList) {
  var options = await browser.storage.sync.get();

	return {
		tabList: tabList,
		maxTabCount: options.maxTabCount
	};
}

function processTabQueue(activeTab) {
	browser.tabs.move(activeTab.tabId, {
		windowId: activeTab.windowId,
		index: -1
	});

	browser.tabs.query({
		currentWindow: true
	}).then(getMaxTabCount)
	.then(removeOverflowingTabs);
}

browser.tabs.onActivated.addListener(processTabQueue);
