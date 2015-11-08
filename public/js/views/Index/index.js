
// Fading navbar in and out
$('nav').addClass('not-scrolled');
$(window).scroll(function () {
  var scroll = $(window).scrollTop();

	if (scroll < 300) {
		if (!$('nav').hasClass('not-scrolled')) {
			$('nav').addClass('not-scrolled');
		}
	} else {
 		if ($('nav').hasClass('not-scrolled')) {
 			$('nav').removeClass('not-scrolled');
 		}
	}
});
	
// carousel
$('.carousel').carousel({
			interval: 4000,
			pause: false,
			wrap: true
		})	

//signin
$('#signInButton').click(function(){
	if(!signUpFill){
		$('#signUp').hide();
		signUpFill = true;
	}

	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: "/api/signin", 
		data: JSON.stringify({
				email: $('#inputEmail').val(),
				password: $('#inputPassword').val()

			}), 
		success: function( data ) {
			  console.log( data);
			}
		});
})

var signUpFill = true;
//signup
$('#signUp').hide();
$('#signUpButton').click(function(){
	$('#signUp').show();
	if(signUpFill){
		$.post( "/api/school/listAll" )
		  .done(function( data ) {
		  	console.log(data);
		     for (var k in data.schools) {
		        if (data.schools.hasOwnProperty(k)) {
		        	$('#inputUniversity').append($('<option>', {
					    value: k,
					    text: data.schools[k]
					}));
		        }
		    }
		  });
		signUpFill = false;
	} else {
		if(!$('#schoolRep').is(':checked')){

			$.ajax({
				type: "POST",
				contentType: "application/json",
				url: "/api/signup/student", 
				data: JSON.stringify({
						email: $('#inputEmail').val(),
						password: $('#inputPassword').val(),
						schoolId: $('#inputUniversity').val()

					}), 
				success: function( data ) {
					  console.log( data);
					}
				});
		} else {
			$.ajax({
				type: "POST",
				contentType: "application/json",
				url: "/api/signup/school", 
				data: JSON.stringify({
						email: $('#inputEmail').val(),
						password: $('#inputPassword').val(),
						name: $('#inputUniversityName').val(),
						emaiDomains: $('#inputEmailDomains').val(),
						shortName: $('#inputUniShortName').val(),
						primaryColor: $('#inputPrimaryColor').val(),
						secondaryColor: $('#inputSecondaryColor').val(),
						logoLing: $('#inputLogoLink').val(),
					}), 
				success: function( data ) {
					  console.log( data);
					}
				});
		}

	}
})

//schoolRep
$('#signUpUniversity').hide();
$('#schoolRep').change(function(){
    if(this.checked) {
    	$('#inputUniversity').hide();
    	$('#signUpUniversity').show();

    } else {
    	$('#signUpUniversity').hide();
    	$('#inputUniversity').show();
    }
});