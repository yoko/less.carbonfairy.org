this["templates"] = this["templates"] || {};
this["templates"]["cloud"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"cloud size-");t.b(t.v(t.f("size",c,p,0)));t.b("\">");t.b("\n" + i);t.b("");if(t.s(t.f("rain",c,p,1),c,p,0,44,148,"<? ?>")){t.rs(c,p,function(c,p,t){t.b("<div class=\"rain\" style=\"left:");t.b(t.v(t.f("left",c,p,0)));t.b("px; top:");t.b(t.v(t.f("top",c,p,0)));t.b("px; width:");t.b(t.v(t.f("width",c,p,0)));t.b("px; height:");t.b(t.v(t.f("height",c,p,0)));t.b("px;\"></div>");});c.pop();}t.b("\n" + i);if(t.s(t.f("items",c,p,1),c,p,0,169,285,"<? ?>")){t.rs(c,p,function(c,p,t){t.b("<div class=\"cloud-block\" style=\"left:");t.b(t.v(t.f("left",c,p,0)));t.b("px; top:");t.b(t.v(t.f("top",c,p,0)));t.b("px; width:");t.b(t.v(t.f("width",c,p,0)));t.b("px; height:");t.b(t.v(t.f("height",c,p,0)));t.b("px;\"></div>");t.b("\n" + i);});c.pop();}t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
this["templates"]["forest"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"forest\">");t.b("\n" + i);if(t.s(t.f("items",c,p,1),c,p,0,32,199,"<? ?>")){t.rs(c,p,function(c,p,t){t.b("<div class=\"tree\" style=\"left:");t.b(t.v(t.f("left",c,p,0)));t.b("px; top:");t.b(t.v(t.f("top",c,p,0)));t.b("px; border-bottom-width:");t.b(t.v(t.f("width",c,p,0)));t.b("px; border-left-width:");t.b(t.v(t.f("height",c,p,0)));t.b("px; border-right-width:");t.b(t.v(t.f("height",c,p,0)));t.b("px;\"></div>");t.b("\n" + i);});c.pop();}t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
this["templates"]["lake"] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"lake\">");t.b("\n" + i);if(t.s(t.f("items",c,p,1),c,p,0,30,140,"<? ?>")){t.rs(c,p,function(c,p,t){t.b("<div class=\"water\" style=\"left:");t.b(t.v(t.f("left",c,p,0)));t.b("px; top:");t.b(t.v(t.f("top",c,p,0)));t.b("px; width:");t.b(t.v(t.f("width",c,p,0)));t.b("px; height:");t.b(t.v(t.f("height",c,p,0)));t.b("px;\"></div>");t.b("\n" + i);});c.pop();}t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }});
(function() {
  'use strict';
  var $d, $w, cloud, document_height, footer_height, footer_top, forest, lake, rand, window_height;

  $w = $(window);

  $d = $(document);

  document_height = void 0;

  window_height = void 0;

  footer_top = void 0;

  footer_height = void 0;

  $(function() {
    var cl_0, cl_1, cl_2, cl_3, cl_4, cl_5, fl_0, fl_1, fl_2, fl_3, ll_0, ll_1, ll_2, notes;
    cloud.setup();
    forest.setup();
    lake.setup();
    cl_0 = $('#cloud-layer-0');
    cl_1 = $('#cloud-layer-1');
    cl_2 = $('#cloud-layer-2');
    cl_3 = $('#cloud-layer-3');
    cl_4 = $('#cloud-layer-4');
    cl_5 = $('#cloud-layer-5');
    ll_0 = $('#lake-layer-0');
    ll_1 = $('#lake-layer-1');
    ll_2 = $('#lake-layer-2');
    fl_0 = $('#forest-layer-0');
    fl_1 = $('#forest-layer-1');
    fl_2 = $('#forest-layer-2');
    fl_3 = $('#forest-layer-3');
    $w.on('scroll', function() {
      var cloud_top, surface_top;
      cloud_top = $w.scrollTop();
      cl_0.css('top', cloud_top * 1 * 0.1);
      cl_1.css('top', cloud_top * 2 * 0.1);
      cl_2.css('top', cloud_top * 3 * 0.1);
      cl_3.css('top', cloud_top * 4 * 0.1);
      cl_4.css('top', cloud_top * 5 * 0.1);
      cl_5.css('top', cloud_top * 6 * 0.1);
      surface_top = $w.scrollTop() - footer_top + window_height;
      if (surface_top <= 0) {
        return;
      }
      ll_0.css('top', surface_top * 1 * 0.1);
      ll_1.css('top', surface_top * 2 * 0.1);
      ll_2.css('top', surface_top * 3 * 0.1);
      fl_0.css('top', surface_top * 1 * 0.1);
      fl_1.css('top', surface_top * 2 * 0.1);
      fl_2.css('top', surface_top * 3 * 0.1);
      fl_3.css('top', surface_top * 4 * 0.1);
    }).on('resize', function() {
      var footer;
      document_height = $d.outerHeight(true);
      window_height = $w.height();
      footer = $('.surface');
      footer_top = footer.offset().top;
      footer_height = footer.outerHeight(true);
    }).trigger('resize');
    notes = $('.notes');
    notes.length && $('.note-count').click(function() {
      notes.toggle();
    });
  });

  rand = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  cloud = {
    sizes: [16, 32, 48, 64, 96, 128],
    rainy: false,
    setup: function() {
      var cloud_length, height;
      height = $d.outerHeight(true);
      $('.clouds, .cloud-layer').each(function() {
        $(this).height(height - 300);
      });
      cloud_length = rand(1, 8);
      this.rainy = cloud_length >= 4;
      console.log('clouds:', cloud_length, this.rainy);
      while (cloud_length--) {
        this.create();
      }
      window.setTimeout(function() {
        $('.cloud').css('opacity', 1);
      });
    },
    create: function() {
      var height, items, layer, length, size, width;
      layer = rand(0, this.sizes.length - 1);
      size = this.sizes[layer];
      width = size * rand(2, 5);
      height = width * (rand(25, 50) / 100);
      length = rand(4, 24);
      items = [];
      while (length--) {
        items.push({
          left: rand(0, width),
          top: rand(0, height),
          width: size * (rand(80, 200) / 100),
          height: size * (rand(50, 120) / 100)
        });
      }
      $(templates.cloud.render({
        size: size,
        rain: this.rainy && rand(0, 1) && {
          top: height * 0.8,
          left: width * 0.1,
          width: width * 0.8,
          height: Math.min(size * rand(5, 10), $d.outerHeight(true) - 300)
        },
        items: items
      })).appendTo('#cloud-layer-' + layer).css({
        left: rand(0, 100) + '%',
        top: rand(0, 200),
        width: width,
        height: height,
        marginLeft: width / -2,
        marginTop: height / -2
      });
    }
  };

  forest = {
    sizes: [32, 48, 64],
    setup: function() {
      var length;
      length = rand(1, 12);
      while (length--) {
        this.create();
      }
    },
    create: function() {
      var height, items, layer, length, size, w, width;
      layer = rand(0, this.sizes.length - 1);
      size = this.sizes[layer];
      width = size * rand(2, 5);
      height = width * (rand(25, 50) / 100);
      length = rand(1, 4);
      items = [];
      while (length--) {
        w = size * (rand(90, 110) / 100);
        items.push({
          left: rand(0, width),
          top: rand(0, height),
          width: w,
          height: w / Math.sqrt(3)
        });
      }
      $(templates.forest.render({
        items: items
      })).appendTo('#forest-layer-' + layer).css({
        left: (rand(0, 1) ? rand(0, 25) : rand(70, 100)) + '%',
        top: rand(Math.floor(layer * footer_height / 3, Math.floor((layer + 1) * footer_height / 3))),
        width: width,
        height: height,
        marginLeft: width / -2,
        marginTop: height / -2
      });
    }
  };

  lake = {
    sizes: [40, 48, 64],
    setup: function() {
      var length;
      length = rand(0, 4);
      while (length--) {
        this.create();
      }
    },
    create: function() {
      var height, items, layer, length, size, width;
      layer = rand(0, this.sizes.length - 1);
      size = this.sizes[layer];
      width = size * rand(2, 5);
      height = width * (rand(25, 50) / 100);
      length = rand(1, 3);
      items = [];
      while (length--) {
        items.push({
          left: rand(0, width),
          top: rand(0, height),
          width: size * (rand(80, 240) / 100),
          height: size * (rand(10, 40) / 100)
        });
      }
      $(templates.lake.render({
        items: items
      })).appendTo('#lake-layer-' + layer).css({
        left: (rand(0, 1) ? rand(0, 20) : rand(60, 100)) + '%',
        top: rand(Math.floor(layer * footer_height / 3), Math.floor((layer + 1) * footer_height / 3)),
        width: width,
        height: height,
        marginLeft: width / -2,
        marginTop: height / -2
      });
    }
  };

}).call(this);
