source "https://rubygems.org"

gem "github-pages", group: :jekyll_plugins

# Ruby 4.0 removed these from default gems; required by jekyll-3.9 / github-pages
gem "csv"
gem "bigdecimal", "~> 3.1"  # 4.x requires Ruby >= 3.4; pin for Ruby 3.3 local dev
gem "base64"
gem "ostruct"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.0" if Gem.win_platform?
