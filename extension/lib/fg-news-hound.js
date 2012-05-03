function FGNewsHound() {
	console.log('hello world');
	var client = new Queuebert.Client({
		identifier: 'client',
		delegate: this
	});
}

FGNewsHound.prototype.addNewComment = function(clientId, clientTabId, body) {
	console.log( $('*:contains(' + body.selectionText + ')') );
};

$(document).ready(function() {
	new FGNewsHound();
});
