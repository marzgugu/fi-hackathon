function FGNewsHound() {
	var client = new Queuebert.Client({
		identifier: 'client',
		delegate: this
	});

	this.attachEvents();
}

FGNewsHound.prototype.attachEvents = function() {
	var _this = this;
	
	$('.nh-highlighted').live('click', function() {
		_this.displayComment( $(this) );
	});
};

FGNewsHound.prototype.addNewComment = function(clientId, clientTabId, body) {
	var smallestElement = null,
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
	}
};

FGNewsHound.prototype.displayComment = function(element) {
	console.log('should display comment.')
};

$(document).ready(function() {
	new FGNewsHound();
	
	$('body').append( $('<div id="news-hound-thread" />') );
});
