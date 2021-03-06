/*MY SCRIPTS START*/
(function () {

	//$('any').ravno();
	$.fn.ravno = function () {
		var maxH = -1;
		var $cols = $(this).height("auto").each(function () {
			var h = $(this).height();
			maxH = h > maxH ? h : maxH;
		});
		$cols.height(maxH);
	};

	//Slider
	$('.slider').slick({
		prevArrow: $('.left'),
		nextArrow: $('.right'),
		responsive: [{
			breakpoint: 480,
			settings: {
				arrows: false
			}
		}]
	});


	class Menu {

		constructor (menu = '.site-nav', burger = '.c-hamburger', duration = 1000) {

			this.menu = menu;
			this.item = `${menu}__item`;
			this.activeItem = `${this.item}--act`;
			this.link = `${menu}__link`;
			this.burger = burger;
			this.duration = duration;
			this.isAnimating = false;
		}

		toggleAnimatingState(duration) {

			this.isAnimating = true;
			setTimeout(()=>{
				this.isAnimating = false;
			}, duration);

		}

		accordion(target, duration) {

			if (this.isAnimating) { return; }
			this.toggleAnimatingState(duration);

			target.toggleClass('mobile-open');
			target.toggleClass('mobile-close');
			if ( target.hasClass('hide') ){
				target.removeClass('hide');
				target.addClass('show');
			} else {
				target.removeClass('show');
				setTimeout(function(){
					target.addClass('hide');
				}, duration);
			}
		}

		toggleActiveItem(old, current) {

			old.removeClass( this.activeItem.slice(1) );
			current.addClass( this.activeItem.slice(1) );

		}

		initBurger() {

			$(this.burger).click((e)=> {

				var $button = $(e.target).is(this.burger) ? $(e.target) : $(e.target).parent();

				this.accordion( $(this.menu), 1000 );
				$button.toggleClass('is-active');

			});

		}

		closeOpened(target) {

			target.removeClass('mobile-open');
			target.addClass('mobile-close');
			target.removeClass('show');
			target.addClass('hide');

		}

		initMobile() {

			$(this.menu).on('click', this.link, (e)=>{


				e.preventDefault();

				var $target = $(e.target).is(this.link) ? $(e.target) : $(e.target).parent(),
						$targetItem = $target.parent(),
						$otherItems = $targetItem.siblings(),
						$otherOpened = $otherItems.find('.show'),
						$otherOpenedItem = $otherOpened.parent(),
						$innerMenu = $target.next();

				if ( !$innerMenu.length ) {
					location.href = $target.attr('href');
					return;
				}

				this.toggleActiveItem($otherItems, $targetItem);

				this.closeOpened($otherOpened);
				this.accordion($innerMenu, 1000);

			});

		}

		destructMobile() {

			$(this.menu).unbind('click');

		}

	}

	var menu = new Menu;

	(function adaptiveMenu () {

		var mobileView = window.matchMedia("(max-width: 768px)").matches,
				timing = 0;

		if ( mobileView ) {
			menu.initBurger();
			menu.initMobile();
		} else {
			menu.destructMobile();
		}

		$(window).resize(()=>{

			if ( !timing ) {
				timing = setTimeout(adaptiveMenu, 200);
			}

		});

	})(menu);




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

	//map

	(function initMap() {
		var viewPort = window.matchMedia("(min-width: 768px)");
		var	center = viewPort ? { lat: 55.685973, lng: 37.339480 } : { lat: 55.6873, lng: 37.338 },
				blueSqure = { lat: 55.68375, lng: 37.34281 },
				octagon = { lat: 55.681204, lng: 37.3396 },
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

	})();



})();
/*MY SCRIPTS END*/
