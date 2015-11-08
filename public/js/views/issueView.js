/**
 * Brick view handler
 */


(function() {
	'use strict';

	var brickCont = $('#issue-container');


	

	var displayBricks = function(amt) {
		brickCont.find('.count').text(amt);

	};


	
	
	// display one
	var setIssue = function(issue) {
		displayBricks(issue.brickCount);
		brickCont.find('.summary').text(issue.summary);
		brickCont.find('.description').text(issue.description);
	};


	// query list

	setIssue({
		brickCount: 10,
		summary: 'Some summary',
		description: 'description'
	});

})($);