---
title: Building Console+, an enhanced (hopefully) interface to windows shells
date: 2012-09-09 17:17:45.000000000 +01:00
categories:
- Programming
tags:
- Console+
- shell
- win api
- WPF
meta:
  _edit_last: '1907066'
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";i:0;s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2012-10-03
    16:39:38";}
  _wpas_skip_twitter: '1'
  _wpas_skip_linkedin: '1'
---
<p>Everyday, almost, I use three different shells, Command Prompt, PowerShell, and Bash for Git. I think the interface of those shells has lots to improve. As I am spoiled by good editors like Visual Studio, TextMate, Sublime, Notepad+, (but no Vim yet), I expected the similar level of maturity and convenience. </p>
<p>Console+ is on <a href="https://github.com/andrewchaa/ConsolePlus">github</a> now. Please bear in mind, it is code in progress.</p>
<p>So, I wanted to build an interface to them. I'm not building any shell. I'm going to build just an interface. And in this journey, I start learning a few tips with WPF. A geeky joy, as Kent Beck confesses in his book, "TDD By Example". </p>
<h3>Resources I used</h3>
<p>As this is a WPF application with Win API calls, I don't have enough knowledge or experience. I am more focust on Web development (thought I don't like being labelled as mere web developer as some windows devs believe wrongly web development is child's play)</p>
<p>So, I google a lot to understand how it can possibly work. This is the list of my resources. </p>
<ul>
<li><a href="http://www.devsource.com/c/a/Using-VS/Working-with-Console-Screen-Buffers-in-NET/">Working with COnsole Screen Buffer in .NET</a></li>
<li><a href="http://www.gamedev.net/blog/1202/entry-2250483-emulating-the-command-prompt-in-c-part-2/">Emulating the Command Prompt in C#</a></li>
<li><a href="http://sourceforge.net/projects/winqconsole/">Windows Quake Style Console</a></li>
<li><a href="http://msdn.microsoft.com/en-us/library/windows/desktop/ms682010(v=vs.85).aspx">Windows desktop console development</a> on MSDN</li>
<li><a href="https://github.com/AnthonyMastrean/ConsoleEx">Console Ex library</a></li>
<li><a href="http://code.google.com/p/conemu-maximus5/">conemu-maximus5</a></li>
<li><a href="http://www.codeproject.com/Articles/42490/Using-AvalonEdit-WPF-Text-Editor">AvalonEdit WPF Text Editor</a></li>
</ul>
<h3>Adding an icon to your application</h3>
<p>I thought I would simply put Icon="/Resource/Icon.ico", but it wasn't. You have to open the property dialog and <a href="http://stackoverflow.com/questions/1881580/wpf-icon-for-all-app-windows">set it there</a>. </p>
<h3>Handling RETURN and TAB on textbox</h3>
<p>If "AcceptsReturn" and "AcceptsTab" are on, you can't capture those key codes in the event. They are handled within the control, and the event is not escalated. So, turn them off. </p>
<h3>Color coding in console</h3>
<p>Colour is an attribute of the console, and you don't get it from StandardOutput. You have to do something with windows api, and I'm not ready get my hands dirty with win api yet. I'll depriortise this story :-)</p>
<h3>DispatcherTimer</h3>
<p>Initially, I used System.Timers.Timer to update the screen regularly, but it didn't work. Timer runs in a separate thread, and can't update UI thread. You get "The calling thread cannot access this object ..." error. In this case, DispatcherTimer is handy, as <a href="http://stackoverflow.com/questions/5423422/the-calling-thread-cannot-access-this-object-because-a-different-thread-owns-it">Tick event is fired in the dispatcher thread</a>. </p>
<p>[sourcecode language="csharp"]<br />
_timer = new DispatcherTimer();<br />
_timer.Interval = TimeSpan.FromMilliseconds(1000);<br />
_timer.Tick += (o, args) =&gt;<br />
					  {<br />
						  tbxConsole.Text = _console.ReadAll();<br />
						  MoveCursorToTheEnd();<br />
					  };<br />
_timer.IsEnabled = true;</p>
<p>[/sourcecode]</p>
<h3>Sending key event to the console</h3>
<p>I need to send user's key input to "cmd.exe" process. In WPF key event, I get KeyEventArgs, but I need to convert it to a character, and it is not possible with <a href="http://stackoverflow.com/questions/5825820/how-to-capture-the-character-on-different-locale-keyboards-in-wpf-c">the help of win api</a>.</p>
<p>[sourcecode language="csharp"]</p>
<p>public class KeyHelper<br />
{<br />
	public enum MapType : uint<br />
	{<br />
		MAPVK_VK_TO_VSC = 0x0,<br />
		MAPVK_VSC_TO_VK = 0x1,<br />
		MAPVK_VK_TO_CHAR = 0x2,<br />
		MAPVK_VSC_TO_VK_EX = 0x3,<br />
	}</p>
<p>	[DllImport(&quot;user32.dll&quot;)]<br />
	public static extern int ToUnicode(<br />
		uint wVirtKey,<br />
		uint wScanCode,<br />
		byte[] lpKeyState,<br />
		[Out, MarshalAs(UnmanagedType.LPWStr, SizeParamIndex = 4)]<br />
		StringBuilder pwszBuff,<br />
		int cchBuff,<br />
		uint wFlags);</p>
<p>	[DllImport(&quot;user32.dll&quot;)]<br />
	public static extern bool GetKeyboardState(byte[] lpKeyState);</p>
<p>	[DllImport(&quot;user32.dll&quot;)]<br />
	public static extern uint MapVirtualKey(uint uCode, MapType uMapType);</p>
<p>	public static char GetCharFromKey(Key key)<br />
	{<br />
		char ch = ' ';</p>
<p>		int virtualKey = KeyInterop.VirtualKeyFromKey(key);<br />
		byte[] keyboardState = new byte[256];<br />
		GetKeyboardState(keyboardState);</p>
<p>		uint scanCode = MapVirtualKey((uint)virtualKey, MapType.MAPVK_VK_TO_VSC);<br />
		var stringBuilder = new StringBuilder(2);</p>
<p>		int result = ToUnicode((uint)virtualKey, scanCode, keyboardState, stringBuilder, stringBuilder.Capacity, 0);<br />
		switch (result)<br />
		{<br />
			case -1:<br />
				break;<br />
			case 0:<br />
				break;<br />
			case 1:<br />
				{<br />
					ch = stringBuilder[0];<br />
					break;<br />
				}<br />
			default:<br />
				{<br />
					ch = stringBuilder[0];<br />
					break;<br />
				}<br />
		}<br />
		return ch;<br />
	}<br />
}</p>
<p>[/sourcecode]</p>
<h3>Char.MinValue</h3>
<p>Sometimes, not often, I want to return empty character in my method. String has string.empty, but until now, I ddin't know that Char.MinValue exists. It's really handly. Look at this code.</p>
<p>[sourcecode language="csharp"]<br />
public char GetCharacterFrom(Key key)<br />
{<br />
    if (key == Key.LeftShift)<br />
        return Char.MinValue;</p>
<p>    if (key == Key.Return)<br />
        return (char) 13;</p>
<p>    return GetCharFromKey(key);<br />
}<br />
[/sourcecode]</p>
<h3>Avalon Text Editor</h3>
<p>You can highlight the part of text with <a href="http://stackoverflow.com/questions/5029724/avalonedit-wpf-texteditor-sharpdevelop-how-to-highlight-a-specific-range-of-t?lq=1">VisualLineElement</a>. the <a href="http://danielgrunwald.de/coding/AvalonEdit/rendering.php">Rendering article</a> has more detailed description.</p>
<p>With <a href="http://stackoverflow.com/questions/tagged/avalonedit">StackOverflow's avalonedit tag</a>, you can read through useful tips</p>
<p>You can download the source code, a sample application, and help file from <a href="http://www.codeproject.com/Articles/42490/Using-AvalonEdit-WPF-Text-Editor">codeproject</a>.</p>
<h3>Changing text color in Avalon Text Editor</h3>
<p>Changing color of text or highlighting text is quite tricky with Avalon Text Editor. Primarily it's because Avalon is not RichTextEditor but code editor. Text are treated as string and you put meta data on those text if you want to change the format. </p>
<p>You need to create your own DocumentColorizingTransformer to highlight a part of your text, and then add it to your editor's LineTransformers collection. I found an example of custom DocumentColorizingTransformer, bud spend some time to find out <a href="http://stackoverflow.com/questions/9478403/how-to-add-a-documentcolorizingtransformer-to-avalonedit">how to use it</a>.</p>
<p>[sourcecode language="csharp"]<br />
public void UpdateConsole()<br />
{<br />
	tbxConsole.Document.Text = _console.ReadAll();<br />
	tbxConsole.ScrollToEnd();<br />
	tbxConsole.TextArea.TextView.LineTransformers.Add(new ColorizeAvalonEdit());<br />
}</p>
<p>public class ColorizeAvalonEdit : DocumentColorizingTransformer<br />
{<br />
	protected override void ColorizeLine(DocumentLine line)<br />
	{<br />
		if (line.Length == 0)<br />
			return;</p>
<p>		int lineStartOffset = line.Offset;<br />
		string text = CurrentContext.Document.GetText(line);<br />
		int start = 0;<br />
		int index;<br />
		while ((index = text.IndexOf(&quot;Microsoft&quot;, start)) &gt;= 0)<br />
		{<br />
			base.ChangeLinePart(<br />
				lineStartOffset + index, // startOffset<br />
				lineStartOffset + index + 10, // endOffset<br />
				(VisualLineElement element) =&gt;<br />
				{<br />
					// This lambda gets called once for every VisualLineElement<br />
					// between the specified offsets.<br />
					Typeface tf = element.TextRunProperties.Typeface;<br />
					// Replace the typeface with a modified version of<br />
					// the same typeface<br />
					element.TextRunProperties.SetTypeface(new Typeface(<br />
						tf.FontFamily,<br />
						FontStyles.Italic,<br />
						FontWeights.Bold,<br />
						tf.Stretch<br />
					));<br />
				});<br />
			start = index + 1; // search for next occurrence<br />
		}<br />
	}<br />
}</p>
<p>[/sourcecode]</p>
<p>to be continued...</p>
