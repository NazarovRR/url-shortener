function submit(){

	let data = {};
	if($('#url-field').val()) data.full_url = $('#url-field').val();
	if($('#encoded-field').val()) data.encoded = $('#encoded-field').val();
	// AJAX call to /api/shorten with the URL that the user entered in the input box
	$.ajax({
		url: '/api/v1/',
		type: 'POST',
		data: data,
		success: function(data){
			// display the shortened URL to the user that is returned by the server
			const resultHTML = '<a class="result" href=' + data.url + '>'
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

}

$('.input').keypress(function (e) {
	if (e.which == 13) {
		submit();
	}
});

$('.btn-submit').on('click', function(){
	submit();
});