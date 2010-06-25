
String.prototype.score_simple = function(abbreviation,offset) {
	
	// if(abbreviation.length < 3) return 1.0;
	if(abbreviation.length > this.length) return 0.0;

	var str_index = 0, 
	string = this;

	for (var i = 0; i < abbreviation.length; i++) {
		var sub_abbreviation = abbreviation[i];
		var sub_index = string.indexOf(sub_abbreviation);

		if(sub_index < 0) 
		return 0.0; 
		else
		string = string.substring(sub_index+1, string.length );
	}

	return 1;
}


jQuery.fn.liveUpdate = function(list){

  list = jQuery(list);

	if ( list.length ) {
		var rows = list.children('li');
		var cache = rows.map(function(){
			return this.children.item(0).innerHTML.toLowerCase();
		});

		this
		.keyup(filter).keyup()
		.parents('form').submit(function(){
			return false;
		});
	}

	return this;

	function filter(){

		var term = jQuery.trim( jQuery(this).val().toLowerCase() );

		// console.log(term);
		var scores = [];

		if ( !term ) {
			rows.show();
		} else {
			rows.hide();

			cache.each(function(i){
				if (this.score_simple(term) == 1) {
					jQuery(rows[ i ]).show();
				} else {
					jQuery(rows[ i ]).hide();
				}
			});

			jQuery.each(scores.sort(function(a, b){ return b[0] - a[0];}), function(){
				jQuery(rows[ this[1] ]).show();
			});
		}
	}
};

