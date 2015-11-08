/**
 * Controller for the issue view page
 */
'use strict';

export default function(app) {
	const m = app.model;
	const Parse = app.Parse;
	
	app.controller.IssueView = {
		index: function(req, res) {
			// Get issues for user's school
			let query = new Parse.Query(m.Issue);
			query.equalTo('school', req.session.user.school);
			query.decending('brickCount', 'updatedAt');

			if(req.params.type) {
				let types = req.params.type.split('+');
				query.containedIn('type', types);
			}

			query.find().then(function(issues) {
				let foundIssues = [];
				issues.forEach(function(issue) {
					foundIssues.push({
						brickCount: issue.get('brickCount'),
						type: issue.get('type'),
						isCemented: issue.get('isCemented'),
						summary: issue.get('summary'),
						description: issue.get('description')
					});
				});

				res.render('IssueView/index', {
					title: 'Issues',
					foundIssues: foundIssues
				});
			}, function(err) {
				res.render('IssueView/index', {
					title: 'Issues',
					foundIssues: [],
					err: err.message
				});
			});
		},

		create: function(req, res) {
			const b = req.body;

			if(!b.summary,
				!b.description) {
				res.json({
					err: 'Invalid usage'
				});
				return;
			}

			let issue = new m.Issue({
				school: req.user.school,
				brickCount: 0,
				isCemented: false,
				type: b.type,
				summary: b.summary,
				description: b.description
			});

			issue.relation('subscibers');
			issue.relation('brickLayers');

			issue.save().then(function() {
				res.json();
			}, function(err) {
				res.json({
					err: err.message
				});
			});
		},

		addBrick: function(req, res) {
			const b = req.body;

			if(!b.issueId) {
				res.json({
					err: 'Invalid usage'
				});
				return;
			}

			m.Issue.queryByObjectId(b.issueId).then(function(issue) {
				let relation = issue.relation('brickLayers');
				let query = relation.query();
				query.equalTo('objectId', req.session.user.id);
				query.find().then(function(results) {
					if(results.length !== 0) {
						res.json({
							err: 'User already laid brick for this issue'
						});
						return;
					}

					// Lay brick
					issue.increment('brickCount');
					relation.add(req.session.user.user);
					issue.save().then(function(issueObj) {
						res.json({
							brickCount: issueObj.get('brickCount')
						});

					}, function(err) {
						res.json({
							err: err.message
						});
					});
				}, function(err) {
					res.json({
						err: err.message
					});
				});
			}, function(err) {
				res.json({
					err: err.message
				});
			});
		},


		getHasLaid: function(req, res) {
			const b = req.body;

			if(!b.issueId) {
				res.json({
					err: 'Invalid usage'
				});
				return;
			}

			m.Issue.queryByObjectId(b.issueId).then(function(issue) {
				let relation = issue.relation('brickLayers');
				let query = relation.query();
				query.equalTo('objectId', req.session.user.id);
				query.find().then(function(results) {
					res.json({
						brickCount: issue.get('brickCount'),
						hasLaid: results.length === 0
					});

				}, function(err) {
					res.json({
						err: err.message
					});
				});
			}, function(err) {
				res.json({
					err: err.message
				});
			});
		}
	};


}