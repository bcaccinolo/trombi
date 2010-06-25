// JQTouch Config
var jQT = new $.jQTouch({
		icon: 'jqtouch.png',
		addGlossToIcon: true,
		startupScreen: 'jqt_startup.png',
		statusBar: 'black',
		preloadImages: [
			'themes/jqt/img/back_button.png',
			'themes/jqt/img/back_button_clicked.png',
			'themes/jqt/img/button_clicked.png',
			'themes/jqt/img/grayButton.png',
			'themes/jqt/img/whiteButton.png',
			'themes/jqt/img/loading.gif'
		]
});

function populate_adn_by_lastname() {
	
	if($("#buttons_lastname > #button_list > .buttons").size() == 0) {
		var letter = "";  
	  $.each(adn_by_lastname, function(index, value) { 
	    if(value.letter == undefined) {
				id = value.id - 1
	      $("<li class='arrow'><a class='person_lastname' id='"+id+"' href='#person'>"+
					persons[id].lastname +" "+ persons[id].firstname +
					"</a> </li>").appendTo("#lastname_"+letter+" > #person_list");
	    } else {
	      letter = value.letter;
	      $("body").append("<div class='lastname_letters' id='lastname_"+value.letter+"' >"+
	          "<div class='toolbar'><h1>"+value.letter+"</h1><a class='back' href='#'>Retour</a></div>"+
	          "<ul class='rounded' id='person_list'></ul></div>");
      
	      $("<li class='buttons'><a href='#lastname_"+value.letter+"' class='whiteButton'>"+
	        value.letter+"</a></li>").appendTo("#button_list");
      
	    }
	  });
		bind_events_on(".lastname_letters .person_lastname");
	}
}

function populate_adn_by_firstname() {
	if($("#buttons_firstname > #button_list > .buttons").size() == 0)	{
	var letter = "";  
	  $.each(adn_by_firstname, function(index, value) { 
	    if(value.letter == undefined) {
				id = value.id - 1
	      $("<li class='arrow'><a class='person_firstname' id='"+id+"' href='#person'>"+
					persons[id].firstname +" "+ persons[id].lastname +
					"</a> </li>").appendTo("#firstname_"+letter+" > #person_list");
	    } else {
	      letter = value.letter;
	        $("body").append("<div id='firstname_"+value.letter+"' >"+
	            "<div class='toolbar'><h1>"+value.letter+"</h1><a class='back' href='#'>Retour</a></div>"+
	            "<ul class='rounded' id='person_list'></ul></div>");
	      
	      var elem = $("#buttons_firstname >  #button_list");
	      $("<li class='buttons'><a href='#firstname_"+value.letter+"' class='whiteButton'>"+
	        value.letter+"</a></li>").appendTo(elem);
	    }
	  });
		bind_events_on(".person_firstname");
	}
}


function populate_adn_full() {
	if($("#search > #person_list > .arrow").size() == 0){
		var letter = "";  
	  $.each(persons, function(index, value) { 
			$("<li class='arrow'><a class='person_lastname' id='"+index+"' href='#person'>"+
	        value.firstname+" "+value.lastname+"</a> </li>").appendTo("#person_list");
	  });
		console.log("populate_adn_full done.");
		bind_events_on("#search .person_lastname");
	}
}

function bind_events_on(selector){
	$(selector).bind("tap", function() {
		var id = $(this).attr("id");
		update_detail(id);
	});
	$(selector).bind("click", function() {
		var id = $(this).attr("id");
		update_detail(id);
	});
}

function update_detail(id) {
	$("#person_name").text(persons[id].firstname + " " + persons[id].lastname);
	$("#person_picture").attr("src", "persons/pictures/"+persons[id].photo);
	$("#person_phone a").attr("href", "tel:"+persons[id].phone);
	$("#person_phone a").text(persons[id].phone);
	$("#person_email a").attr("href", "mailto:"+persons[id].email);
	$("#person_email a").text(persons[id].email);
	$("#person_sector").text(persons[id].sector);	
}

$("#by_firstname").tap(function(){
	console.log("click")
	populate_adn_by_firstname(); 
});
$("#by_lastname").tap(function(){
	console.log("click")
	populate_adn_by_lastname(); 
});
$("#by_search").tap(function(){
	console.log("click")
	populate_adn_full(); 

	$('#q').liveUpdate($('#person_list')).focus();
	$('#clear_search').click(function(){
		$("#q").val("");
		$("#person_list").children().show();
	});
	
});
