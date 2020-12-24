---
layout: post
title: About WPF RichTextBox
date: 2012-10-02 12:30:38.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- RichTextBox
- WPF
meta:
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";i:0;s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2012-10-02
    12:30:38";}
  _edit_last: '1907066'
  _wpas_done_1752093: '1'
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>This content is moved from <a href="http://andrewchaa.me.uk/2012/09/09/building-console-an-enhanced-hopefully-interface-to-windows-shells/">Console+ post</a>, as I use <a href="http://www.codeproject.com/Articles/42490/Using-AvalonEdit-WPF-Text-Editor">Avalon Text Editor</a>, not RichTextBox, for the project.</p>
<p>It's an interesting control. Because now I can read the shell's screen buffer and write it into textbox, I wanted to use RichTextBox, to change the colors of some texts. It behaves very similar to textbox and the internal seems to be quite different. Maybe it's a victory of OOP, that TextBox and RichTextBox share large part of the interface, even thought the internals are so different. </p>
<p><strong>Moving cursor or caret</strong> is easier with RichTextBox.</p>
<p>[sourcecode language="csharp"]</p>
<p>//TextBox<br />
int lastPosition = tbxConsole.Text.Length;<br />
tbxConsole.Focus();<br />
tbxConsole.SelectionStart = lastPosition;<br />
tbxConsole.SelectionLength = 0;</p>
<p>vs.</p>
<p>//RichTextBox<br />
tbxConsole.CaretPosition = tbxConsole.CaretPosition.DocumentEnd;</p>
<p>[/sourcecode]</p>
<p><strong>Assigning text</strong> is slightly trickier. You use TextRage.</p>
<p>[sourcecode language="csharp"]<br />
new TextRange(tbxConsole.Document.ContentStart, tbxConsole.Document.ContentEnd)<br />
	{<br />
		Text = _console.ReadAll()<br />
	};</p>
<p>[/sourcecode]</p>
<p>Nobody seems to like the empty line RichTextBox inserts between paragraph. I am not happy either, so set <strong>the height of the paragraph to zero</strong>, thanks to <a href="http://stackoverflow.com/a/445897/437961">a guy with style</a>.</p>
<p>[sourcecode language="xml"]<br />
&lt;RichTextBox Name=&quot;tbxConsole&quot; AcceptsTab=&quot;False&quot; AcceptsReturn=&quot;False&quot; Background=&quot;Black&quot; Foreground=&quot;#FF28C128&quot; HorizontalAlignment=&quot;Left&quot;<br />
		 PreviewKeyDown=&quot;TbxConsolePreviewKeyDown&quot;&gt;<br />
	&lt;RichTextBox.Resources&gt;<br />
		&lt;Style TargetType=&quot;{x:Type Paragraph}&quot;&gt;<br />
			&lt;Setter Property=&quot;Margin&quot; Value=&quot;0&quot; /&gt;<br />
		&lt;/Style&gt;<br />
	&lt;/RichTextBox.Resources&gt;<br />
&lt;/RichTextBox&gt;<br />
[/sourcecode]</p>
<p>to be contined ...</p>
