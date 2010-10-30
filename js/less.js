
$(function() {
	$('<div id="loading"/>')
		.hide()
		.appendTo('body')
		.ajaxStart(function() { $(this).show(); })
		.ajaxComplete(function() { $(this).fadeOut(); });

	$('a[href*="ASIN/"]').leaf(function() {
		var price = $('.price', this);
		price.text(price.text().replace(/￥ /, '¥'));

		var h = 0;
		$(this).children()
			.each(function() {
				h = Math.max(h, $(this).height());
			})
			.height(h);
	});

	// Fairy.Life.log();
	// Leaf.setup();
});


if ($.browser.msie) document.execCommand('BackgroundImageCache', false, true);
