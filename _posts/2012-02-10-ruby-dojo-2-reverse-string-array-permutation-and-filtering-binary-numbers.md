---
title: 'Ruby dojo #2 reverse string, array permutation, and filtering binary numbers'
date: 2012-02-10 13:42:31.000000000 +00:00
type: post
published: true
status: publish
categories: []
tags: []
meta:
  _edit_last: '1907066'
  _wpas_skip_twitter: '1'
  _wpas_skip_linkedin: '1'
  _wp_old_slug: ruby-jodo-2-reverse-string-array-permutation-and-filtering-binary-numbers
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>It was the second ruby dojo yesterday (Thu. 9/2/2012). A few more people turned up this time. No pizza, sadly, but understandable that they can't buy pizza and drinks every time.</p>
<p>This time, it was more organised. If you are agile, you get better at each iteration.</p>
<p>3 problems were given.</p>
<ul>
<li>Reverse the string: "Welcome! Today's challenges: Reverse the string"</li>
<li>Find all permutations of the letters: "welcome"</li>
<li>Find all 10-digit binary numbers with no consecutive 1s</li>
</ul>
<p>The first and the third were relatively straightforward, but permutations of "welcome" was a real challenge. We ended up using ruby's "permutation" method, which was a cheat.</p>
<p><strong>Reverse the string</strong></p>
<p>[sourcecode language="ruby"]<br />
string = &quot;Hello Welcome to Ruby Dojo&quot;<br />
reverse = []<br />
string.each_char do |char|<br />
reverse.unshift char<br />
end<br />
puts reverse.to_s<br />
[/sourcecode]</p>
<p><strong>ten_digit_binary.rb</strong></p>
<p>[sourcecode language="ruby"]<br />
filtered = []<br />
max = &quot;1100000000&quot;.to_i(2)<br />
(0..max).each do |number|<br />
  n = number.to_s(2)<br />
  filtered &lt;&lt; n unless n.match /11/<br />
end</p>
<p>puts filtered<br />
[/sourcecode]</p>
<p><strong>permutations_of_welcome</strong></p>
<p>[sourcecode language="ruby"]<br />
string = &quot;welcome&quot;.split(&quot;&quot;)<br />
string.permutation do  |str|<br />
  puts str.inspect<br />
end<br />
[/sourcecode]</p>
