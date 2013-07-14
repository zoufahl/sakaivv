var CON = $("div#content");

var sakaivv = {
	changeHeader: function() {
		$("h2", CON).css({'font-size': '100%'});
	},

	divToTable: function() {

		/* step 1: fetch courses-div and gather information */
		coursesNodes = $("div.content_course", CON);
		var coursesCount = coursesNodes.length;
		var previousnode = null;
		var newtable = true;

		$.each(coursesNodes, function(index, node) {

			/* logic about new table-creation and table-insertion */
			if (previousnode && previousnode.nextSibling !== node) {
				table.append($("</tbody></table>"));
				$(previousnode).after(table);
				newtable = true;
			}
			if (newtable) {
				table = $("<table class='semester'><tbody>");
				header = sakaivv.tableHeaderRowHtml();
				table.append(header);
				newtable = false;
			}

			/* current node - extracting information */
			_teachernode = $("div.lower_teacher_box",node);
			_firstteacher = $("div.lower_teacher",_teachernode)[0];

			var course = {
				name: 			$("div.left_upper__content",node).text(),
				lecturer: 		$("div.lower_teacher__name",_firstteacher).text(),
				lecturermail: 	$("div.lower_teacher__mail a",_firstteacher).attr('href'),
				morelecturer: 	$("div.lower_teacher",_teachernode)[1] != null,
				ects: 			$("div.left_lower__ects",node).text(),
				typeraw: 		$("div.left_lower__courseType",node).text(),
				period: 		$("div.left_lower__period",node).text(),
				metalink: 		$("a.loadCourseInfoButton",node).attr('href'),
				metaid: 		$("a.loadCourseInfoButton",node).attr('course'),
				metatype: 		$("a.loadCourseInfoButton",node).attr('type')
			};

			/* building new node */
			contentrow = sakaivv.tableContentRowHtml(course);
			table.append(contentrow);


			/* stuff to do for last element */
			if ((index + 1) == coursesCount) {
				$(node).after(table);
			}

			/* store information for next iteration */
			previousnode = node;
		});

		/* delete old stuff */
		$(coursesNodes).remove();
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

	generateMetalink: function(course) {
		return (course.metalink+".jsp?type="+course.metatype+"&course="+course.metaid);
	},

	tableContentRowHtml: function(course) {
		if(course) {
			var link = sakaivv.generateMetalink(course);

			$tr = $("<tr>", {
				'class': 'course'
			});

			$td1 = $("<td>", {
				html: "<a href='"+link+"' class='coursenr more'>(load)</a>",
				'colspan': 1
			});
			
			$td2 = $("<td>", {
				text: course.typeraw.replace(/\[[0-9]\]/g,''),
				'colspan': 1
			});

			ua = course.morelecturer?' u.a.':'';
			$td3 = $("<td>", {
			 	html: "<a href='"+course.lecturermail+"'>"+course.lecturer+"</a>"+ua,
			 	'colspan': 2
			});
			
			$td5 = $("<td>", {
			 	html: "<a href='"+link+"' class='coursename more'>"+course.name+"</a>",
			 	'colspan': 1
			});						
			$td1.add($td2).add($td3).add($td5).appendTo($tr);

			return $tr;
		}
	},

	decomposeAdditionalInfo: function(htmlData) {
		var node = $("<meta>", {html: htmlData});
		coursemeta = {
			lvnr: $(".additional_top .additional_top__lvnr", node).text(),
			monr: $(".additional_top .additional_top__monr", node).text(),
			time: $(".additional_top .additional_top__sonr", node).text(),
			description: $(".additional__shortDescription", node).html()
		};

		/* try to format the description a bit better html-wise */
		// TODO sometime

		return coursemeta;
	},

	tableContentMetaRowHtml: function(coursemeta) {
		if(coursemeta) {
			$tr = $("<tr>", {
				'class': 'coursemeta'
			});

			$td = $("<td>", {
				'colspan': 5
			});
			
			$div = $("<div>", {
				html: coursemeta.description
			})

			$div.appendTo($td);
			$td.appendTo($tr);

			return $tr;
		}
	},

	addClickTrigger: function() {
		$("tr.course a.more").click(function(event) {
			event.preventDefault();
			var node = $(this).parents("tr");
			$.ajax({
				url: $(this).attr('href') 
			}).done(function(htmlData) {
				data = sakaivv.decomposeAdditionalInfo(htmlData);
				newdata = sakaivv.tableContentMetaRowHtml(data);
				node.after(newdata);

				/* node.siblings("a").removeClass("more"); */
			}).fail(function() {
				console.log('fail');
			});
		});
	}
};

debugger;
console.log('content.js');
sakaivv.changeHeader();
sakaivv.divToTable();
sakaivv.addClickTrigger();
