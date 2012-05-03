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
	var commentMap = {
	}
	
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
			if (!commentMap[smallestElement.text()]) {
				commentMap[smallestElement.text()] = {
					comments: []
				};
			} 
			commentMap[smallestElement.text()].element = smallestElement;
			commentMap[smallestElement.text()].comments.push(comment);
		}
	});
	
	for (var key in commentMap) {
		if (commentMap.hasOwnProperty(key)) {
			commentMap[key].element.data('comments', commentMap[key].comments)
		}
	}
};

FGNewsHound.prototype.attachEvents = function() {
	var _this = this;
	
	$('.nh-highlighted').live('click', function() {
		_this.displayComment( $(this) );
	});
	
	$('.btn-primary').live('click', function() {
		console.log( $('.comment-text').val() );
		$('#news-hound-thread').empty();
		return false;
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
	var top = $(element).offset().top + $(element).height() + 10;
	
	$("#news-hound-thread").html('<div id="news-hound-thread" class="modal" style="position: absolute; top: '+top+'px; left: 36%;">\
  <div id="thread-header" class="modal-header">\
    <h3>Comment Thread</h3>\
  </div>\
  <div class="modal-body">\
  </div>\
  <div class="modal-header">\
    <h3>Add Your Voice</h3>\
  </div>\
  <form id="add-news-hound-comment" class="span6" action="#" method="post">\
    <textarea class="span6 comment-text" rows="4"></textarea>\
    <input class="span4 left" type="text" placeholder="you@email.com">\
    <button class="btn btn-primary span2 left" type="submit" value="Add Comment">Add Comment</button>\
  </form>\
</div>');

	if (element.data('comments') && element.data('comments').length) {
		var comments = element.data('comments');
		for (var i = 0, comment; (comment = comments[i]) != null; i++) {
			var c = $('<div class="comment"><img class="avatar" height="32" width="32" src="' + comment.user + '" /><span class="comment-content">' + comment.comment + '</span></div>')
			$('#news-hound-thread .modal-body').append(c);
		}
	}
};

$(document).ready(function() {
	new FGNewsHound();
	
	$('body').append( $('<div id="news-hound-thread" />') );
});
