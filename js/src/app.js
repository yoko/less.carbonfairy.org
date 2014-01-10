new function() {
'use strict';

var $w = $(window),
	$d = $(document);
	// $b = $('body');

var document_height, window_height, footer_top, footer_height;

$(function() {
	cloud.setup();
	forest.setup();
	lake.setup();

	var cl_0 = $('#cloud-layer-0'),
		cl_1 = $('#cloud-layer-1'),
		cl_2 = $('#cloud-layer-2'),
		cl_3 = $('#cloud-layer-3'),
		cl_4 = $('#cloud-layer-4'),
		cl_5 = $('#cloud-layer-5'),
		ll_0 = $('#lake-layer-0'),
		ll_1 = $('#lake-layer-1'),
		ll_2 = $('#lake-layer-2'),
		fl_0 = $('#forest-layer-0'),
		fl_1 = $('#forest-layer-1'),
		fl_2 = $('#forest-layer-2'),
		fl_3 = $('#forest-layer-3');
	$w
		.on('scroll', function() {
			var cloud_top = $w.scrollTop();// / (document_height - window_height) * 100;
			// console.log('cloud:', cloud_top);
			cl_0.css('top', cloud_top * 1 * 0.1);
			cl_1.css('top', cloud_top * 2 * 0.1);
			cl_2.css('top', cloud_top * 3 * 0.1);
			cl_3.css('top', cloud_top * 4 * 0.1);
			cl_4.css('top', cloud_top * 5 * 0.1);
			cl_5.css('top', cloud_top * 6 * 0.1);

			var surface_top = $w.scrollTop() - footer_top + window_height;
			// console.log('surface:', footer_top, $w.scrollTop(), surface_top);
			if (surface_top <= 0) return;
			ll_0.css('top', surface_top * 1 * 0.1);
			ll_1.css('top', surface_top * 2 * 0.1);
			ll_2.css('top', surface_top * 3 * 0.1);
			fl_0.css('top', surface_top * 1 * 0.1);
			fl_1.css('top', surface_top * 2 * 0.1);
			fl_2.css('top', surface_top * 3 * 0.1);
			fl_3.css('top', surface_top * 4 * 0.1);
		})
		.on('resize', function() {
			document_height = $d.outerHeight(true);
			window_height = $w.height();
			var footer = $('.surface');
			footer_top = footer.offset().top;
			footer_height = footer.outerHeight(true);
		})
		.trigger('resize');

	var notes = $('.notes');
	notes.length && $('.note-count').click(function() {
		notes.toggle();
	});
});


var rand = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};


var cloud = {
	sizes: [16, 32, 48, 64, 96, 128],
	deg  : rand(0, 90),
	rainy: false,

	setup: function() {
		var height = $d.outerHeight(true);
		$('.clouds, .cloud-layer').each(function() {
			$(this).height(height - 300);
		});

		var cloud_length = rand(1, 8);
		this.rainy = cloud_length >= 4;
		// console.log('clouds:', cloud_length, this.rainy);
		while (cloud_length--) {
			this.create();
		}
	},

	create: function() {
		var layer = rand(0, this.sizes.length - 1),
			size = this.sizes[layer],
			width = size * rand(2, 5),
			height = width * (rand(25, 50) / 100),
			length = rand(4, 24),
			items = [], cloud;

		while (length--) {
			items.push({
				left  : rand(0, width),
				top   : rand(0, height),
				width : size * (rand(80, 200) / 100),
				height: size * (rand(50, 120) / 100)
				// deg   : this.deg
			});
		}
		cloud = $(templates.cloud.render({
			size : size,
			rain : this.rainy && rand(0, 1) && {
				top   : height * 0.8,
				left  : width * 0.1,
				width : width * 0.8,
				height: Math.min(size * rand(5, 10), $d.outerHeight(true) - 300)
			},
			items: items
		}))
			.appendTo('#cloud-layer-' + layer)
			.css({
				left      : rand(0, 100) + '%',
				top       : rand(0, 200),
				width     : width,
				height    : height,
				marginLeft: width / -2,
				marginTop : height / -2,
			});
		window.setTimeout(function() {
			cloud.css('opacity', 1);
		});
	}
};


var forest = {
	sizes   : [32, 48, 64],
	template: null,

	setup: function() {
		this.template = Hogan.compile($('#template-forest').html(), {delimiters: '<% %>'});
		// this.template = Handlebars.compile($('#template-forest').html());

		var length = rand(1, 12);
		// console.log('forests:', length);
		while (length--) {
			this.create();
		}
	},

	create: function() {
		var layer = rand(0, this.sizes.length - 1),
			size = this.sizes[layer],
			width = size * rand(2, 5),
			height = width * (rand(25, 50) / 100),
			length = rand(1, 4),
			items = [],
			w;

		while (length--) {
			w = size * (rand(90, 110) / 100);
			items.push({
				left  : rand(0, width),
				top   : rand(0, height),
				width : w,
				height: w / Math.sqrt(3)
			});
		}
		// console.log('tree items:', items);
		$(this.template.render({items: items}))
			.appendTo('#forest-layer-' + layer)
			.css({
				left      : (rand(0, 1) ? rand(0, 25) : rand(70, 100)) + '%',
				top       : rand(
					Math.floor(layer * footer_height / 3),
					Math.floor((layer + 1) * footer_height / 3)
				),
				width     : width,
				height    : height,
				marginLeft: width / -2,
				marginTop : height / -2,
			});
	}
};


var lake = {
	sizes   : [40, 48, 64],
	template: null,

	setup: function() {
		this.template = Hogan.compile($('#template-lake').html(), {delimiters: '<% %>'});
		// this.template = Handlebars.compile($('#template-lake').html());

		var length = rand(0, 4);
		console.log('lakes:', length);
		while (length--) {
			this.create();
		}
	},

	create: function() {
		var layer = rand(0, this.sizes.length - 1),
			size = this.sizes[layer],
			width = size * rand(2, 5),
			height = width * (rand(25, 50) / 100),
			length = rand(1, 3),
			items = [];

		while (length--) {
			items.push({
				left  : rand(0, width),
				top   : rand(0, height),
				width : size * (rand(80, 240) / 100),
				height: size * (rand(10, 40) / 100)
			});
		}
		console.log('lake items:', items);
		$(this.template.render({items: items}))
			.appendTo('#lake-layer-' + layer)
			.css({
				left      : (rand(0, 1) ? rand(0, 20) : rand(60, 100)) + '%',
				top       : rand(
					Math.floor(layer * footer_height / 3),
					Math.floor((layer + 1) * footer_height / 3)
				),
				width     : width,
				height    : height,
				marginLeft: width / -2,
				marginTop : height / -2,
			});
	}
};

};
