var CON = $("div#content");

var sakaikvv = {
	changeHeader: function() {
		$("h2", CON).css({'font-size': '100%'});
	},

	divToTable: function() {

		/* step 1: fetch courses-div and gather information */
		coursesNodes = $("div.content_course", CON);
		courses = {};
		lastnode = null;
		groups = 1;		/* courses are arranged in groups (bsc, msc, labs,...) - divs need to be split */
		groupcourses = [];

debugger;

		$.each(coursesNodes, function(index, node) {
			
			/* new group when courses are not directly connected (divided by header) */
			if (lastnode && lastnode.nextSibling !== node) {
				courses[groups] = groupcourses;
				groups++;
				groupcourses = [];
			}

			_teachernode = $("div.lower_teacher_box",node);
			_firstteacher = $("div.lower_teacher",_teachernode)[0];

			/* new courseobject */
			course = {
				name: 			$("div.left_upper__content",node).text(),
				lecturer: 		$("div.lower_teacher__name",_firstteacher).text(),
				lecturermail: 	$("div.lower_teacher__mail a",_firstteacher).attr('href'),
				morelecturer: 	$("div.lower_teacher",_teachernode)[1] != null,
				ects: 			$("div.left_lower__ects",node).text(),
				type: 			$("div.left_lower__courseType",node).text(),
				period: 		$("div.left_lower__period",node).text()
			};
			groupcourses.push(course);

			/* store information for next iteration */
			lastnode = node;
		});
		courses[groups] = groupcourses;
		/* clean up */
		lastnode = null;
		course = null;
		groups = null;
		groupcourses = null;

		/* step 2: build table from courses */

	}
};


console.log('content.js');
sakaikvv.changeHeader();
sakaikvv.divToTable();

