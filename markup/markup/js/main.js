$(document).ready(function() {

	$('.slider').slick({
		centerMode: true,
		slidesToShow: 3,
		arrows: false,
		variableWidth: true
	});
	$(function() {
		$('input[name="daterange"]').daterangepicker();
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
