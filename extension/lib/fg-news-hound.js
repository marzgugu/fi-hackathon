function FGNewsHound() {
	console.log('hello world');
	var client = new Queuebert.Client({
		identifier: 'client',
		delegate: this
	});
}

FGNewsHound.prototype.addNewComment = function(clientId, clientTabId, body) {
	//var element = $('*:contains(' + body.selectionText + ')').last().
	//	html = 
};

$(document).ready(function() {
	new FGNewsHound();
	$('body').append( $('<div id="news-hound-thread" />') );
	console.log($('#news-hound-thread'));
});
