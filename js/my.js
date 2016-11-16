'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

	var Menu = function () {
		function Menu() {
			var menu = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.site-nav';
			var burger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.c-hamburger';
			var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;

			_classCallCheck(this, Menu);

			this.menu = menu;
			this.item = menu + '__item';
			this.activeItem = this.item + '--act';
			this.link = menu + '__link';
			this.burger = burger;
			this.duration = duration;
			this.isAnimating = false;
		}

		_createClass(Menu, [{
			key: 'toggleAnimatingState',
			value: function toggleAnimatingState(duration) {
				var _this = this;

				this.isAnimating = true;
				setTimeout(function () {
					_this.isAnimating = false;
				}, duration);
			}
		}, {
			key: 'accordion',
			value: function accordion(target, duration) {

				if (this.isAnimating) {
					return;
				}
				this.toggleAnimatingState(duration);

				target.toggleClass('mobile-open');
				target.toggleClass('mobile-close');
				if (target.hasClass('hide')) {
					target.removeClass('hide');
					target.addClass('show');
				} else {
					target.removeClass('show');
					setTimeout(function () {
						target.addClass('hide');
					}, duration);
				}
			}
		}, {
			key: 'toggleActiveItem',
			value: function toggleActiveItem(old, current) {

				old.removeClass(this.activeItem.slice(1));
				current.addClass(this.activeItem.slice(1));
			}
		}, {
			key: 'initBurger',
			value: function initBurger() {
				var _this2 = this;

				$(this.burger).click(function (e) {

					var $button = $(e.target).is(_this2.burger) ? $(e.target) : $(e.target).parent();

					_this2.accordion($(_this2.menu), 1000);
					$button.toggleClass('is-active');
				});
			}
		}, {
			key: 'closeOpened',
			value: function closeOpened(target) {

				target.removeClass('mobile-open');
				target.addClass('mobile-close');
				target.removeClass('show');
				target.addClass('hide');
			}
		}, {
			key: 'initMobile',
			value: function initMobile() {
				var _this3 = this;

				$(this.menu).on('click', this.link, function (e) {

					e.preventDefault();

					var $target = $(e.target).is(_this3.link) ? $(e.target) : $(e.target).parent(),
					    $targetItem = $target.parent(),
					    $otherItems = $targetItem.siblings(),
					    $otherOpened = $otherItems.find('.show'),
					    $otherOpenedItem = $otherOpened.parent(),
					    $innerMenu = $target.next();

					if (!$innerMenu.length) {
						location.href = $target.attr('href');
						return;
					}

					_this3.toggleActiveItem($otherItems, $targetItem);

					_this3.closeOpened($otherOpened);
					_this3.accordion($innerMenu, 1000);
				});
			}
		}, {
			key: 'destructMobile',
			value: function destructMobile() {

				$(this.menu).unbind('click');
			}
		}]);

		return Menu;
	}();

	var menu = new Menu();

	(function adaptiveMenu() {

		var mobileView = window.matchMedia("(max-width: 768px)").matches,
		    timing = 0;

		if (mobileView) {
			menu.initBurger();
			menu.initMobile();
		} else {
			menu.destructMobile();
		}

		$(window).resize(function () {

			if (!timing) {
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
		var center = viewPort ? { lat: 55.685973, lng: 37.339480 } : { lat: 55.6873, lng: 37.338 },
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
//# sourceMappingURL=my.js.map
