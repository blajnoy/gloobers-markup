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
		touchMove: false
		//adaptiveHeight: true
	});

	$('.main-slider').slick({
		slidesToShow: 1,
		fade: true,
		arrows: true,
		prevArrow: '<a href="#" class="btn-prev"><i class="gl-ico gl-ico-arrow-left"></i></a>',
		nextArrow: '<a href="#" class="btn-next"><i class="gl-ico gl-ico-arrow-right"></i></a>',
		/*draggable: false,
		swipe: false,
		touchMove: false*/
	});

	$('.search-tabs .radio').click(function () {
		$(this).tab('show');
	});

	$('.how-slider')
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
			$('.how-slider').slick('slickGoTo', i);
		})
	});

	(function() {

		if ( $("#tether-elm").length && $("#tether-target").length ) {
			new Tether({
				element: '#tether-elm',
				target: '#tether-target',
				attachment: 'bottom center',
				targetAttachment: 'top center',
				constraints: [{
					to: 'window',
					pin: ['top']
				}]
			});
		}

	}).call(this);

	(function() {
		var init, setupDrop, _Drop;

		_Drop = Drop.createContext({
			classPrefix: 'drop'
		});

		init = function() {
			return setupDrop();
		};

		setupDrop = function() {


			return $('.open-drop').each(function() {

				var $elm, content, drop, openOn, theme, position, offset;

				$elm = $(this);
				theme = $elm.data('theme');
				openOn = $elm.data('open-on') || 'click';
				offset = $elm.data('offset') || '0 0';
				position = $elm.data('position')  || 'bottom center';

				$elm.addClass(theme);

				content = $($elm.data('drop-content')).html() || $elm.next('.drop-content').html();

				return drop = new _Drop({
					target: $elm[0],
					classes: theme,
					position: position,
					constrainToWindow: true,
					constrainToScrollParent: false,
					openOn: openOn,
					content: content,
					tetherOptions: {
						offset: offset
					}
				});

			});
		};

		init();

	}).call(this);

/**/
	/*$(function() {
		var target = $('.date-input'),
	 	elm;


		new Tether({
			element: elm,
			target: target,
			attachment: 'top center',
			targetAttachment: 'top center'
		});
	});*/


	(function() {

		function datapickerDropEmbedding(target) {

			$(target).each(function () {

				var dropElm,
					$elm,
					content,
					drop,
					theme,
					position,
					offset,
					dropDatapicker,
					_this = $(this);

				if( _this[0].nodeName != "A" ) {
					_this.daterangepicker({
						"autoApply": true,
						"showCustomRangeLabel": false,
						"alwaysShowCalendars": true
					});
				} else {


					_this.daterangepicker({
						"autoApply": true,
						"showCustomRangeLabel": false,
						"alwaysShowCalendars": true
					}).on("click", function () {
						return false;
					});

					_this.data('daterangepicker').updateElement = function(){
						if (this.element.is('input') && !this.singleDatePicker && this.autoUpdateInput) {
							this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
							this.element.trigger('change');
						} else if (this.element.is('input') && this.autoUpdateInput) {
							this.element.val(this.startDate.format(this.locale.format));
							this.element.trigger('change');
						} else if (this.element.is('a') && this.autoUpdateInput) {
							this.element.children(".date-field").html(this.startDate.format(this.locale.format));
						}
					};

					_this.children(".date-field").html(_this.data("startDate"));
				}

				_this.on('show.daterangepicker', function() {
					dropDatapicker.position();
				});

				dropElm = _this.data('daterangepicker').container;

				$elm = _this;
				theme = $elm.data('theme');
				offset = $elm.data('offset') || '0 0';
				position = $elm.data('position')  || 'bottom center';

				dropElm.addClass(theme).wrapInner( "<div class='drop-content'></div>");

				dropDatapicker = new Tether({
					classPrefix: 'drop',
					element: dropElm,
					target: _this,
					attachment: 'top left',
					targetAttachment: position,
					offset: offset,
					constraints: [
						{
							to: 'scrollParent'
						}
					]
				});


			});


		}

		datapickerDropEmbedding('.daterange-input');

	}).call(this);

	(function () {

		$(".date-set .daterange-input").on('apply.daterangepicker', function(ev, picker) {

			$(".btn-primary.daterange-input").data('daterangepicker').setStartDate(picker.startDate);
			$(".btn-primary.daterange-input").data('daterangepicker').setEndDate(picker.endDate);

		});

	})();


	$('.tags-list').find('a.tag').on('click', function () {
		$(this).toggleClass('selected');
		return false;
	});

	/*(function () {

		//  the data that powers the bar chart, a simple array of numeric values
		var chartdata = [40, 60, 80, 100, 70, 120, 100, 60, 70, 150, 120, 140];

		//  the size of the overall svg element
		var height = 200,
			width = 720,

		//  the width of each bar and the offset between each bar
			barWidth = 40,
			barOffset = 20;


		d3.select('#chart').append('svg')
			.attr('width', width)
			.attr('height', height)
			.style('background', '#dff0d8')
			.selectAll('rect').data(chartdata)
			.enter().append('rect')
			.style('fill', '#3c763d')
			.attr('width', barWidth)
			.attr('height', function (data) {
				return data;
			})
			.attr('x', function (data, i) {
				return i * (barWidth + barOffset);
			})
			.attr('y', function (data) {
				return height - data;
			});

	})();*/

	if( $('#ex2').length ) {

		$('#ex2').slider({
			tooltip: 'hide'
		});
		$("#ex2").on("slide", function(slideEvt) {
			$("#price-min span").text(slideEvt.value[0]);
			$("#price-max span").text(slideEvt.value[1]);

		});

	}


	(function(){



		function rndArr(size) {
			var arr = [];

			for (var i = 0, l = size; i < l; i++) {
				arr.push(Math.round(Math.random() * l))
			}

			return arr;
		}

		/*var chartdata = [500, 100, 10, 10, 500, 100, 10, 10, 0, 35, 1000, 0, 35, 100, 100, 500, 300, 500, 100, 10, 10, 0, 35, 2100, 1000, 500, 300, 300, 500, 100, 10, 10, 0, 35, 1000, 500, 300, 500, 100, 10, 10, 0, 35, 1000, 1000, 500, 1000, 1000, 500, 300];*/

		var chartdata = rndArr(50),
			height = 35,
			width = '100%',
			persentageItemWidth = 100 / chartdata.length;


		var yScale = d3.scaleLinear()
					   .domain([0, d3.max(chartdata)])
					   .range([0, height]);


		var rect;

		var awesome, dd3;


		var ww = function () {


			dd3 = d3.select('#chart').append('svg');
			rect = dd3
				.attr('width', width)
				.attr('height', height)
				.append('g')
				.selectAll('rect').data(chartdata);

			chartdata = rndArr(50);

			awesome = rect
				.enter().append('rect')
				.style('fill', '#acacac')
				.attr('width', persentageItemWidth + "%")
				.attr('x', function (data, i) {
					return persentageItemWidth * i + "%";
				})
				.attr('height', 0)
				.attr('y', height);

		};

		ww();

		var qq = function () {

			awesome.transition()
				.attr('height', function (data) {
					return yScale(data);
				})
				.attr('y', function (data) {
					return height - yScale(data);
				})
				.delay(function (/*data,*/ i) {
					return i * 10;
				})
				.duration(1000)
				.ease(d3.easeElastic);

		};
		qq();

		var refreshGraph = function () {
			var qw = rndArr(50);
			awesome.data(qw);
			qq();

		};
		


		$("#refresh-prices").click(function () {
			refreshGraph();
		})
		
		
	})();


});


/* start map init */


var map,
	desktopScreen = Modernizr.mq( "only screen and (min-width:1024px)" ),
	zoom = desktopScreen ? 10 : 8,
	scrollable = draggable = !Modernizr.hiddenscroll || desktopScreen,
	isIE11 = !!(navigator.userAgent.match(/Trident/) && navigator.userAgent.match(/rv[ :]11/)),
	customStyles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]

function initMap() {
	var myLatLng = {lat: 40.768525, lng: -74.075736};
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: zoom,
		center: myLatLng,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: scrollable,
		draggable: draggable,
		styles: customStyles
	});

	var locations = [
		{
			title: 'point1',
			position: {lat: 40.768525, lng: -74.075736},
			label: '22'/*,
			icon: {
				url: isIE11 ? "images/ico-map-marker.png" : "images/ico-map-marker.png",//svg
				scaledSize: new google.maps.Size(53, 69)
			}*/

		}
	];

	locations.forEach( function( element, index ){
		var marker = new google.maps.Marker({
			position: element.position,
			map: map,
			title: element.title,
			icon: element.icon,
			label: element.label
		});
	});

}

/* end map init */

Select.init({
	selector: '.sel'
});

