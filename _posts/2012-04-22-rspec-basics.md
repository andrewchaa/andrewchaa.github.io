---
layout: post
title: rspec basics
date: 2012-04-22 15:48:12.000000000 +01:00
type: post
published: true
status: publish
categories: []
tags:
- basics
- rspec
- test
meta:
  _edit_last: '1907066'
  _wpas_done_linkedin: '1'
  publicize_results: a:1:{s:7:"twitter";a:1:{i:111615627;a:2:{s:7:"user_id";s:10:"andrewchaa";s:7:"post_id";s:18:"194090235720765440";}}}
  _wpas_done_twitter: '1'
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>When you create a new site, skip generating unit test, as you want to use rspec instead.</p>
<p>[sourcecode language="bash"]<br />
$ rails new sample_app --skip-test-unit<br />
[/sourcecode]</p>
<p>Add rspec to your gemfile</p>
<p>[sourcecode language="rails"]<br />
group :development, :test do<br />
  gem 'sqlite3'<br />
  gem 'rspec-rails', '2.9.0'<br />
end</p>
<p>group :test do<br />
  gem 'capybara', '1.1.2'<br />
end<br />
[/sourcecode]</p>
<p><a href="https://github.com/jnicklas/capybara?version=3.2#">copybara gem</a> allows you to interact with the app with a natual English-like syntaxt.</p>
<p>Then run bundle install to install those gems.</p>
<p>[sourcecode language="bash"]<br />
$ bundle install --without production<br />
[/sourcecode]</p>
<p>Configure your rails app to use rspec in place of test::unit.</p>
<p>[sourcecode language="bash"]<br />
$ rails generate rspec:install<br />
[/sourcecode]</p>
