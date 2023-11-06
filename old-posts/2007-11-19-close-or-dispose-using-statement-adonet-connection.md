---
title: close or dispose (using statement) ADO.NET connection
date: 2007-11-19 14:27:02.000000000 +00:00
categories: []
tags: []
meta:
  _oembed_382e83fc90fc839198c0d3d81988697f: "{{unknown}}"
---
<p>During the code-review, a question arose if we need to call close() within the using statement of ado.net connection. The answer is no. using statement calls dispose() at the end and dispose() calls close() inside. You can check it in <a href="http://www.aisto.com/roeder/dotnet/Download.aspx?File=Reflector">reflector</a>.</p>
<pre>
protected override void Dispose(bool disposing)
{
    if (disposing)
    {
        this._userConnectionOptions = null;
        this._poolGroup = null;
        this.Close();
    }
    this.DisposeMe(disposing);
    base.Dispose(disposing);
}</pre>
<p>C# compiler converts "using" statement into try and catch block and simplifies your code (<a href="http://msdn2.microsoft.com/en-us/library/ms998569.aspx">http://msdn2.microsoft.com/en-us/library/ms998569.aspx</a>)</p>
<pre>using (SqlConnection conn = new SqlConnection(connString))
{
  conn.Open();
  . . .
} // Dispose is automatically called on the conn variable here</pre>
<pre>SqlConnection conn = new SqlConnection(connString);
try
{
  conn.Open();
}

finally
{
  conn.Dispose();
}</pre>
