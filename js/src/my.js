/*MY SCRIPTS START*/
(function () {

	$.fn.ravno = function () {
		var maxH = -1;
		var $cols = $(this).height("auto").each(function () {
			var h = $(this).height();
			maxH = h > maxH ? h : maxH;
		});
		$cols.height(maxH);
	};

	$('.slider').slick({
		prevArrow: $('.left'),
		nextArrow: $('.right'),
		responsive: [{
			breakpoint: 768,
			settings: {
				arrows: false
			}
		}]
	});

	$('.c-hamburger').click(function(){
		var $nav = $('.site-nav');
		$nav.toggleClass('mobile-open');
		$nav.toggleClass('mobile-close');
		if ( $nav.hasClass('hide') ){
			$nav.removeClass('hide');
			$nav.addClass('show');
		} else {
			$nav.removeClass('show');
			setTimeout(function(){
				$nav.addClass('hide');
			}, 1000);
		}
	});


	var viewPort = window.matchMedia("(min-width: 768px)");


	/*footer icons*/
	$('.soc').on('mousedown', '.soc__item', function () {
		$(this).addClass('soc__item--mousedown');
	});
	$('.soc').on('mouseup', '.soc__item', function () {
		$(this).removeClass('soc__item--mousedown');
	});

	//press footer
	(function pressFooter() {
		$('.content').height('auto');
		//bitrix panel
		var adminHeight = $('#bx-panel').length ? $('#bx-panel').outerHeight(true) : 0;

		var viewportHeight = $(window).outerHeight(true);

		var headerHeight = $('header').outerHeight(true);
		var contentHeight = $('.content').outerHeight(true);
		var footerHeight = $('footer').outerHeight(true);

		var contentHeight = headerHeight + contentHeight + footerHeight + adminHeight;

		if (viewportHeight - contentHeight > 0) {
			contentHeight = viewportHeight - (headerHeight + footerHeight + adminHeight);
			$('.content').height(contentHeight + "px");
		}
	})();

	(function initMap() {
		var viewPort = window.matchMedia("(min-width: 768px)").matches,
				center = viewPort ? { lat: 55.685973, lng: 37.339480 } : { lat: 55.6873, lng: 37.338 },
				blueSqure = { lat: 55.68375, lng: 37.34281 },
				octagon = { lat: 55.681204, lng: 37.3396 },

		//for html overlay
		myLatlng = viewPort ? new google.maps.LatLng(55.6901, 37.323) : new google.maps.LatLng(55.6905, 37.3326);

		// Create a map object and specify the DOM element for display.
		var map = new google.maps.Map(document.getElementById('map'), {
			center: center,
			scrollwheel: false,
			zoom: 15,
			"elementType": "geometry.fill",
			disableDefaultUI: true
		});
		// Create a markers and set its position.
		//blue squre
		//var target = new google.maps.Marker({
		//	map: map,
		//	position: blueSqure,
		//	icon: 'images/map/squre.png'
		//});

	}());
	//google.maps.event.addDomListener(window, 'load', initMap);
})();
/*MY SCRIPTS END*/
