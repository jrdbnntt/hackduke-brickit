// /**
//  * School model
//  */
// 'use strict';

// export default function(app) {
// 	const Parse = app.Parse;
// 	const _ = app._;
// 	const validate = app.validate;

// 	const ParseIssue = Parse.Object.extend('Issue');

// 	class Issue {
// 		constructor(o) {
// 			const p = this.p = new ParseIssue('Issue');
// 			p.set('summary', o.summary);
// 			p.set('description', o.description);
// 			p.set('createdBy', o.user);
// 			p.set('bricks', 0);
// 			p.set('cemented', false);
// 			p.set('subscribers', []);

// 		}
		
// 		save() {
// 			this.p.save();
// 		}
// 	}

// 	app.model.Issue = Issue;
// }