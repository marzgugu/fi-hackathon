function FGNewsHound() {
	this.client = new Queuebert.Client({
		identifier: 'client',
		delegate: this
	});

	this.attachEvents();
	this.pollForNews();
}

FGNewsHound.prototype.pollForNews = function() {
	var _this = this;
	setInterval(function() {
		_this.client.sendMessage({
			tabId: 'background',
			to: 'background-client',
			action: 'pollForNews',
			body: {location: window.location.href}
		}, function(results){

		});
	}, 1000);
};

FGNewsHound.prototype.updateComments = function(clientId, clientTabId, body) {
	body.comments.forEach(function(comment) {
		var smallestElement = null,
			smallestCount = 99999999;
		
		$('*').each(function() {
			if ($(this).text().indexOf(comment.text) > -1) {
				var html = $(this).html();
				if (html.length < smallestCount) {
					smallestCount = html.length;
					smallestElement = $(this);
				}
			}
		});

		if (smallestElement) {
			smallestElement.addClass('nh-highlighted');
			smallestElement.css({color: 'red'});
		}
	});
};

FGNewsHound.prototype.attachEvents = function() {
	var _this = this;
	
	$('.nh-highlighted').live('click', function() {
		_this.displayComment( $(this) );
	});
};

FGNewsHound.prototype.addNewComment = function(clientId, clientTabId, body) {
	/*var smallestElement = null,
		smallestCount = 99999999;
		
	$('*').each(function() {
		if ($(this).text().indexOf(body.selectionText) > -1) {
			var html = $(this).html();
			if (html.length < smallestCount) {
				smallestCount = html.length;
				smallestElement = $(this);
			}
		}
	});
	
	if (smallestElement) {
		smallestElement.addClass('nh-highlighted');
		smallestElement.css({color: 'red'});
	}*/
};

FGNewsHound.prototype.displayComment = function(element) {
	console.log('should display comment.')
};

$(document).ready(function() {
	new FGNewsHound();
	
	$('body').append( $('<div id="news-hound-thread" />') );
});
