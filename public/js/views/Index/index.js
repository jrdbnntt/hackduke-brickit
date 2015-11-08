
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
$('#signInButton').click(function(a,b,c,d,e){
	console.log(a,b,c,d,e);
})

$('#signUpButton').click(function(a,b,c,d,e){
	alert($(this).serialize());
  return false;
})