function BGNewsHound(params) {
	this.server = new Queuebert.Server();
	this.client = new Queuebert.BackgroundClient({
		delegate: this,
		server: this.server,
		identifier: 'background-client'
	});
	this.createContextMenu();
}

BGNewsHound.prototype.createContextMenu = function() {
	var _this = this;
	chrome.contextMenus.create({
		type: 'normal',
		title: 'Add News Hound Comment',
		contexts: ['all'],
		onclick: function(info, tab) {
			_this.client.sendMessage({
				action: 'addNewComment',
				tabId: 'tab_' + tab.id,
				to: 'client',
				body: {selectionText: info.selectionText}
			});
		}
	});
};