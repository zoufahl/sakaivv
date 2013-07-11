
var CON = $("div#content");

var sakaikvv = {
	changeHeader: function() {
		$("h2", CON).css({'font-size': '100%'});
	},

	divToTable: function() {

		/* step 1: fetch courses-div and gather information */
		coursesNodes = $("div.content_course", CON);
		var coursesCount = coursesNodes.length;
		previousnode = null;
		newtable = true;


		$.each(coursesNodes, function(index, node) {

			/* logic about new table-creation and table-insertion */
			if (previousnode && previousnode.nextSibling !== node) {
				table.append($("</tbody></table>"));
				$(previousnode).after(table);
				newtable = true;
			}

			/* logic about new table-creation and table-insertion */
			if (newtable) {
				table = $("<table><tbody>");
				header = sakaikvv.tableHeaderRowHtml();
				table.append(header);
				newtable = false;
			}

			/* current node - extracting information */
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
			/* building new node */
			contentrow = sakaikvv.tableContentRowHtml(course);
			table.append(contentrow);


			/* stuff to do for last element */
			if ((index + 1) == coursesCount) {
				$(node).after(table);
			}


			/* store information for next iteration */
			previousnode = node;
		});
	},

	tableHeaderRowHtml: function() {
		$htmlNode = $("<tr> \
			<th style='width: 7%; font-size: 8px'>Nummer</th> \
			<th style='width: 7%; font-size: 8px'>Typ</th> \
			<th style='width: 15%; font-size: 8px'>Dozent</th> \
			<th style='width: 2%; font-size: 8px'></th> \
			<th style='width: 75%; font-size: 8px'>Titel</th> \
			</tr>"); 
		return $htmlNode;
	},

	tableContentRowHtml: function(course) {
		if(course) {
			$tr = $("<tr>");
			$td = $("<td>", {
				text: course.name,
				'colspan': 5
			}).appendTo($tr);
			
			return $tr;
		}
	}
};

debugger;
console.log('content.js');
sakaikvv.changeHeader();
sakaikvv.divToTable();

