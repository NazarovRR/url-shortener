$('.btn-submit').on('click', function(){
	// AJAX call to /api/shorten with the URL that the user entered in the input box
	$.ajax({
		url: '/',
		type: 'POST',
		data: {
			full_url: $('#url-field').val()
		},
		success: function(data){
			// display the shortened URL to the user that is returned by the server
			const resultHTML = '<a class="result" href=http://' + data.url + '>'
					+ data.url + '</a>';
			$('#link').html(resultHTML);
			$('#link').hide().fadeIn('slow');
		},
		error:function(err){
			console.error(err);
		}
	});

});