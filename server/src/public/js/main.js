$('.btn-submit').on('click', function(){

	function validate(){
		return new Promise(function(resolve, reject){
			let data = {};
			let url_field = null;
			let short_url_field = null;
			if($('#url-field').val()) data.full_url = url_field = $('#url-field').val();
			if($('#encoded-field').val()) data.encoded = short_url_field = $('#encoded-field').val();
			if(!url_field || checkForWhiteSpaces(url_field) || !isUrlValid(url_field)) {
				reject("Please enter a valid URL.");
			}
			if(short_url_field) {
				if(short_url_field.length < 3){
					reject("short url must contain at least 3 symbols");
				}
				if(checkForWhiteSpaces(short_url_field)){
					reject("short url cannot contain spaces");
				}
			}
			resolve(data);
		});
	}

	function checkForWhiteSpaces(value){
		var whiteSpaces = /\s/;
		var result = whiteSpaces.test(value);
		return result;
	}

	function isUrlValid(textval) {
		var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
		return urlregex.test(textval);
	}
	// AJAX call to /api/shorten with the URL that the user entered in the input box
	validate().then(function(data){
		$.ajax({	
			url: '/api/v1/',
			type: 'POST',
			data: data,
			success: function(data){
				// display the shortened URL to the user that is returned by the server
				const resultHTML = '<a class="result" href=http://' + data.url + '>'
						+ data.url + '</a>';
				$('#link').html(resultHTML);
				$('#link').hide().fadeIn('slow');
			},
			error:function(err){
				let errorMsg = JSON.parse(err.responseText);
				errorMsg = errorMsg.message;
				// display the error that is returned by the server
				const errorHtml = '<p class="result">'
						+ errorMsg + '</p>';
				$('#link').html(errorHtml);
				$('#link').hide().fadeIn('slow');
			}
		});
	}).catch(function(invalidMsg){
		const errorHtml = '<p class="result">'
			+ invalidMsg + '</p>';
		$('#link').html(errorHtml);
		$('#link').hide().fadeIn('slow');
	});

});