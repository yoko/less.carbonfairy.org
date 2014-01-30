'use strict'

$w = $ window
$d = $ document

document_height = undefined
window_height = undefined
footer_top = undefined
footer_height = undefined


$ ->
  cloud.setup()
  forest.setup()
  lake.setup()

  cl_0 = $ '#cloud-layer-0'
  cl_1 = $ '#cloud-layer-1'
  cl_2 = $ '#cloud-layer-2'
  cl_3 = $ '#cloud-layer-3'
  cl_4 = $ '#cloud-layer-4'
  cl_5 = $ '#cloud-layer-5'
  ll_0 = $ '#lake-layer-0'
  ll_1 = $ '#lake-layer-1'
  ll_2 = $ '#lake-layer-2'
  fl_0 = $ '#forest-layer-0'
  fl_1 = $ '#forest-layer-1'
  fl_2 = $ '#forest-layer-2'
  fl_3 = $ '#forest-layer-3'

  $w
    .on 'scroll', ->
      cloud_top = $w.scrollTop()
      # console.log 'cloud:', cloud_top
      cl_0.css 'top', cloud_top * 1 * 0.1
      cl_1.css 'top', cloud_top * 2 * 0.1
      cl_2.css 'top', cloud_top * 3 * 0.1
      cl_3.css 'top', cloud_top * 4 * 0.1
      cl_4.css 'top', cloud_top * 5 * 0.1
      cl_5.css 'top', cloud_top * 6 * 0.1

      surface_top = $w.scrollTop() - footer_top + window_height
      # console.log 'surface:', footer_top, $w.scrollTop(), surface_top
      return if surface_top <= 0
      ll_0.css 'top', surface_top * 1 * 0.1
      ll_1.css 'top', surface_top * 2 * 0.1
      ll_2.css 'top', surface_top * 3 * 0.1
      fl_0.css 'top', surface_top * 1 * 0.1
      fl_1.css 'top', surface_top * 2 * 0.1
      fl_2.css 'top', surface_top * 3 * 0.1
      fl_3.css 'top', surface_top * 4 * 0.1
      return

    .on 'resize', ->
      document_height = $d.outerHeight true
      window_height = $w.height()
      footer = $ '.surface'
      footer_top = footer.offset().top
      footer_height = footer.outerHeight true
      return

    .trigger 'resize'

  notes = $ '.notes'
  notes.length and $('.note-count').click ->
    notes.toggle()
    return
  return


rand = (min, max) ->
  Math.floor(Math.random() * (max - min + 1)) + min


cloud =
  sizes: [16, 32, 48, 64, 96, 128]
  # deg  : rand 0, 90
  rainy: false

  setup: ->
    height = $d.outerHeight true
    $('.clouds, .cloud-layer').each ->
      $(this).height height - 300
      return

    cloud_length = rand 1, 8
    @rainy = cloud_length >= 4
    console.log 'clouds:', cloud_length, @rainy
    while cloud_length--
      @create()

    window.setTimeout ->
      $('.cloud').css 'opacity', 1
      return
    return

  create: ->
    layer = rand 0, @sizes.length - 1
    size = @sizes[layer]
    width = size * rand 2, 5
    height = width * (rand(25, 50) / 100)
    length = rand 4, 24
    items = []

    while length--
      items.push
        left  : rand 0, width
        top   : rand 0, height
        width : size * (rand(80, 200) / 100)
        height: size * (rand(50, 120) / 100)
        # deg   : this.deg

    $(templates.cloud.render
      size: size
      rain: @rainy and rand(0, 1) and {
        top   : height * 0.8,
        left  : width * 0.1
        width : width * 0.8
        height: Math.min(size * rand(5, 10), $d.outerHeight(true) - 300)
      }
      items: items
    )
      .appendTo '#cloud-layer-' + layer
      .css
        left      : rand(0, 100) + '%'
        top       : rand 0, 200
        width     : width
        height    : height
        marginLeft: width / -2
        marginTop : height / -2
    return


forest =
  sizes: [32, 48, 64]

  setup: ->
    length = rand 1, 12
    # console.log 'forests:', length
    while length--
      @create()
    return

  create: ->
    layer = rand 0, @sizes.length - 1
    size = @sizes[layer]
    width = size * rand 2, 5
    height = width * (rand(25, 50) / 100)
    length = rand 1, 4
    items = []

    while length--
      w = size * (rand(90, 110) / 100)
      items.push
        left  : rand 0, width
        top   : rand 0, height
        width : w
        height: w / Math.sqrt 3
    # console.log 'tree items:', items
    $ templates.forest.render items: items
      .appendTo '#forest-layer-' + layer
      .css
        left      : (if rand 0, 1 then rand 0, 25 else rand 70, 100) + '%'
        top       : rand(
          Math.floor layer * footer_height / 3,
          Math.floor (layer + 1) * footer_height / 3
        )
        width     : width
        height    : height
        marginLeft: width / -2
        marginTop : height / -2
    return


lake =
  sizes: [40, 48, 64]

  setup: ->
    length = rand 0, 4
    # console.log 'lakes:', length
    while length--
      @create()
    return

  create: ->
    layer = rand 0, @sizes.length - 1
    size = @sizes[layer]
    width = size * rand 2, 5
    height = width * (rand(25, 50) / 100)
    length = rand 1, 3
    items = []

    while length--
      items.push
        left  : rand 0, width
        top   : rand 0, height
        width : size * (rand(80, 240) / 100)
        height: size * (rand(10, 40) / 100)
    # console.log 'lake items:', items
    $ templates.lake.render items: items
      .appendTo '#lake-layer-' + layer
      .css
        left      : (if rand 0, 1 then rand 0, 20 else rand 60, 100) + '%'
        top       : rand(
          Math.floor layer * footer_height / 3
          Math.floor (layer + 1) * footer_height / 3
        )
        width     : width
        height    : height
        marginLeft: width / -2
        marginTop : height / -2
    return
