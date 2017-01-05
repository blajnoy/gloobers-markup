$(document).ready(function() {

	$('.testimonials-carousel').slick({
		centerMode: true,
		slidesToShow: 5,
		swipeToSlide: true,
		arrows: false,
		variableWidth: true,
		focusOnSelect: true,
		asNavFor: '.slider-for'
	});

	$('.slider-for').slick({
		slidesToShow: 1,
		arrows: false,
		fade: true,
		draggable: false,
		swipe: false,
		touchMove: false,
		//adaptiveHeight: true
	});
	$("#open-person-popover").popover({
		html: true,
		content: function() {
			return $('#popover-content').html();
		}
	});
	$(document).on( "click", "#close-person-popover", function() {
		$('#open-person-popover').popover('hide');
		return false;
	});

	$("#open-person-popover01").popover({
		html: true,
		content: function() {
			return $('#popover-content01').html();
		}
	});
	$(document).on( "click", "#close-person-popover01", function() {
		$('#open-person-popover01').popover('hide');
		return false;
	});

	$('.search-tabs .radio').click(function () {
		$('#open-person-popover').popover('hide');
		$('#open-person-popover01').popover('hide');
		$(this).tab('show');
	});



	$('.slider')
		.slick({
			slidesToShow: 1,
			arrows: false
		})
		.on('afterChange', function(event, slick, currentSlide, nextSlide){
			$('.slider-tabs li').removeClass("active").eq(currentSlide).addClass("active");
		});

	$('.slider-tabs li').each( function(i) {
		$(this).click(function(){
			$('.slider-tabs li').removeClass("active");
			$(this).addClass("active");
			$('.slider').slick('slickGoTo', i);
		})
	});

	$('.date-range-input').daterangepicker({
		"autoApply": true,
		"showCustomRangeLabel": false,
		"startDate": "12/16/2016",
		"endDate": "12/22/2016",
		"opens": "left"
	}, function(start, end, label) {
		console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
	});

	/*
	$("#btn-toggle").on("click", function() {
		$("#elm-expand").toggleClass("open");
		return false;
	});
	$(".lang .lang-choice").on("click", function() {
		$(this).parent().toggleClass("open");
		return false;
	});

	$('body').click(function() {
		$("#elm-expand").removeClass("open");
		$(".lang").removeClass("open");
	});
	
	$(".fancybox").fancybox({
		autoSize: true
	});

	// sticked elm

	var didScroll;
	var lastScrollTop = 0;
	var delta = 20;
	var elm = $('#elm-expand');
	var navbarHeight = elm.outerHeight();

	$(window).scroll(function(event) {
		didScroll = true;
	});

	setInterval(function() {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 250);

	function hasScrolled() {
		var st = $(this).scrollTop();
		if (Math.abs(lastScrollTop - st) <= delta)
			return;
		if (st > lastScrollTop && st > navbarHeight) {
			// Scroll Down
			elm.removeClass('sticked-down').addClass('sticked-up');
		} else {
			// Scroll Up
			if (st + $(window).height() < $(document).height()) {
				elm.removeClass('sticked-up').addClass('sticked-down');
			}
		}

		lastScrollTop = st;
	}



	// menu

	function toggleClassMenu(event) {
		var target = event.target;
		while (target != this) {
			if (target.tagName == 'A' && target.parentNode.classList.contains("has-drop")) {
				event.preventDefault();
			}
			if (target.classList.contains("has-drop")) {
				if (!target.classList.contains("open-drop")) {
					target.classList.add('open-drop');
				} else {
					target.classList.remove('open-drop');
				}
				return;
			}
			target = target.parentNode;
		}
		myMenu.classList.add("menu--animatable");
		if (!myMenu.classList.contains("menu--visible")) {
			myMenu.classList.add("menu--visible");
		} else {
			myMenu.classList.remove('menu--visible');
		}
	}

	function OnTransitionEnd() {
		myMenu.classList.remove("menu--animatable");
	}

	var myMenu = document.querySelector(".extra-nav");
	var oppMenu = document.querySelector(".menu-icon");


	myMenu.addEventListener("transitionend", OnTransitionEnd, false);
	oppMenu.addEventListener("click", toggleClassMenu, false);
	myMenu.addEventListener("click", toggleClassMenu, false);

	*/

});
