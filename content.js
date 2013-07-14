var CON = $("div#content");

var sakaivv = {
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
			if (newtable) {
				table = $("<table class='semester'><tbody>");
				header = sakaivv.tableHeaderRowHtml();
				table.append(header);
				newtable = false;
			}

			/* current node - extracting information */
			_teachernode = $("div.lower_teacher_box",node);
			_firstteacher = $("div.lower_teacher",_teachernode)[0];

			course = {
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
			link = sakaivv.generateMetalink(course);

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

/***

<div class="additional_top border__bottom">
    <div class="additional_top__lvnr float__left">
        19501
    </div>
    <div class="additional_top__monr float__left border__left border__right">
        086bA1.1.1
    </div>
    <div class="additional_top__sonr">
        01.10.2013 - 31.03.2014
    </div>
</div><!--
<div class="additional_tutor">
    <div class="additional_tutor_row border__bottom">
        <div class="additional_tutor__group">
            Tutorium 1
        </div>
        <div class="additional_tutor__name border__left">
            Nicolas Lehmann
            <div class="lower_teacher__mail float__right">
                <a href=" mailto:mail@nicolaslehmann.de?subject=Tutorium&#160;1" target="_blank"><i class="foundicon-mail"></i></a>
            </div>
        </div>
    </div>
    <div class="additional_tutor_row border__bottom">
        <div class="additional_tutor__group">
            Tutorium 1
        </div>
        <div class="additional_tutor__name border__left">
            Nicolas Lehmann
            <div class="lower_teacher__mail float__right">
                <a href=" mailto:mail@nicolaslehmann.de?subject=Tutorium&#160;1" target="_blank"><i class="foundicon-mail"></i></a>
            </div>
        </div>
    </div>
    <div class="additional_tutor_row border__bottom">
        <div class="additional_tutor__group">
            Tutorium 1
        </div>
        <div class="additional_tutor__name border__left">
            Nicolas Lehmann
            <div class="lower_teacher__mail float__right">
                <a href=" mailto:mail@nicolaslehmann.de?subject=Tutorium&#160;1" target="_blank"><i class="foundicon-mail"></i></a>
            </div>
        </div>
    </div>
</div> -->
<div class="additional__shortDescription">
    <p>
	<strong>Algorithmen und Programmieren 1 - Funktionale Programmierung</strong></p>
<p>
	<span style="font-size: 12px;" >Inhalte:</span></p>
<p>
	<span style="font-size: 12px;" >Grundlagen der Berechenbarkeit:&nbsp;</span></p>
<div>
	- Lambda-Kalk&uuml;l&nbsp;</div>
<div>
	- primitive Rekursion&nbsp;</div>
<div>
	- &micro;-Rekursion&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	Einf&uuml;hrung in die Funktionale Programmierung (Haskell):&nbsp;</div>
<div>
	- Syntax (Backus-Naur-Form)&nbsp;</div>
<div>
	- primitive Datentypen, Listen, Tupel, Zeichenketten&nbsp;</div>
<div>
	- Ausdr&uuml;cke, Funktionsdefinitionen, Rekursion und Iteration&nbsp;</div>
<div>
	- Funktionen h&ouml;herer Ordnung, Polymorphie&nbsp;</div>
<div>
	- Typsystem, Typherleitung und &ndash;&uuml;berpr&uuml;fung&nbsp;</div>
<div>
	- Algebraische und abstrakte Datentypen&nbsp;</div>
<div>
	- Ein- und Ausgabe&nbsp;</div>
<div>
	- Such- und Sortieralgorithmen&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	Beweisen von Programmeigenschaften:&nbsp;</div>
<div>
	- Termersetzung&nbsp;</div>
<div>
	- strukturelle Induktion&nbsp;</div>
<div>
	- Terminierung&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	Implementierung und Programmiertechnik:&nbsp;</div>
<div>
	- Auswertungsstrategien f&uuml;r funktionale Programme&nbsp;</div>
<div>
	- Modularer Programmentwurf</div>
<div>
	&nbsp;</div>
<div>
	<strong>Literatur:</strong></div>
<div>
	- Simon Thompson: Haskell: The Craft of Functional Programming, Third Edition, Addison-Wesley, 2011.</div>
<div>
	- Graham Hutton: Programming in Haskell, Cambridge University Press, 2007</div>
<div>
	- Bird, R./Wadler, Ph.: Einf&uuml;hrung in Funktionale Programmierung, Hanser Verlag, 1982.</div>
<div>
	- Hans Hermes: Aufz&auml;hlbarkeit, Entscheidbarkeit, Berechenbarkeit, Springer-Verlag, 1978.</div>
</div>

***/

	},

	addClickTrigger: function() {
		$("tr.course a.more").click(function(event) {
			event.preventDefault();
			$.ajax({
				url: $(this).attr('href') 
			}).done(function(htmlData) {
				data = sakaivv.decomposeAdditionalInfo(htmlData);

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
