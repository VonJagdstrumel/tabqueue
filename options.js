function saveOption(event) {
	browser.storage.sync.set({
		maxTabCount: this.value
	});

	event.preventDefault();
}

function setMaxTabCount(options) {
	document.querySelector("#maxTabCount").value = options.maxTabCount || '100';
}

function restoreOption() {
	browser.storage.sync.get().then(setMaxTabCount);
}

document.addEventListener('DOMContentLoaded', restoreOption);
document.querySelector("#maxTabCount").addEventListener("input", saveOption);
