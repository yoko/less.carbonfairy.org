# coding:utf-8

relative_assets = true
project_path    = File.expand_path(File.dirname(__FILE__)) + '/../../'
css_dir         = "css"
sass_dir        = "css/src"
images_dir      = "images"
javascripts_dir = "js"

asset_cache_buster :none

sass_options = {
  :syntax        => :scss,
  :unix_newlines => true
}
# nested, expanded, compact, compressed
output_style = :compressed
line_comments = false

on_stylesheet_saved do |filename|
  begin
    %x{echo 'display notification "#{File.basename(filename)} updated."'|osascript 2>/dev/null}
  rescue => e
  end
end

on_stylesheet_error do |filename, message|
  begin
    %x{echo 'display notification "#{File.basename(filename)}: #{message}"'|osascript 2>/dev/null}
  rescue => e
  end
end

on_sprite_saved do |filename|
	begin
	  %x{optipng -strip all -o7 #{filename} 2>/dev/null}
	rescue => e
		puts e
		puts 'OptiPNGを入れると画像を最適化してくれるよ！_(┐「ε:)_'
	end
end
