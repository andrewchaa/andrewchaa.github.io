---
layout: post
title: Outputting to pdf using iTextSharp
date: 2010-08-25 15:47:57.000000000 +01:00
type: post
published: true
status: publish
categories:
- Programming
tags:
- C# iTextSharp
meta:
  _edit_last: '1907066'
  _wp_old_slug: ''
  _oembed_1379597d0937d5f27cdf4deb01355d5b: "{{unknown}}"
  _oembed_9a2b9bc7663acc5c0d88c2e5812087fd: "{{unknown}}"
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>Recently, I moved to Barclays. My job is still development, though. Totaljobs is a good company, and I enjoyed its casual, IT geek culture. It's the thing I miss in my new job, as I work with quants.</p>
<p>The web application here has generally more complex UI. On public web page, you would not normally demand user to put in more than 20 textboxes or dropdowns. On financial application, it seems to be common. Nice graphs are often mandatory.</p>
<p>Anyway, one of my recent task was to let user download a report in pdf format. A colleague in the team told me we already used iTextSharp. I haven't used it before, but it seems to be popular in java community, and ported to .Net as well. It looks like great component, but has poor documentation. It's not easy to find good code examples.</p>
<p>One good working code is <a href="http://ozzieperez.net/blog/?p=255">http://ozzieperez.net/blog/?p=255</a>. I was lucky to find a code dealing with multi-columns and fixed column table. (<a href="http://www.mikesdotnetting.com/Article/89/iTextSharp-Page-Layout-with-Columns">http://www.mikesdotnetting.com/Article/89/iTextSharp-Page-Layout-with-Columns</a>) This article greatly helped me.</p>
<p>I want to share my code too, to help other guys who may feel frustrated without any code sample. I changed variable names and also removed most part of the code, but it shouldn't matter.</p>
<p>[sourcecode language="csharp"]</p>
<p>public class ExportService<br />
{<br />
    private const int LEFT = 0;<br />
    private const int CENTER = 1;</p>
<p>    private pcService _pSvc;<br />
    private BaseFont _verdanaBase;<br />
    private Font _verdanaNormal, _verdanaHeading, _verdanaTitle;<br />
    private BaseColor _textColor, _lineColor, _backgroundColor;</p>
<p>    public ExportService()<br />
    {<br />
        _pSvc = new pcService();</p>
<p>        _textColor = new BaseColor(ColorTranslator.FromHtml(&quot;#003366&quot;));<br />
        _lineColor = new BaseColor(ColorTranslator.FromHtml(&quot;#00a4e8&quot;));<br />
        _backgroundColor = new BaseColor(ColorTranslator.FromHtml(&quot;#eeeeee&quot;));</p>
<p>        _verdanaBase = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.EMBEDDED);<br />
        _verdanaNormal = new Font(_verdanaBase, 10, Font.NORMAL, _textColor);<br />
        _verdanaHeading = new Font(_verdanaBase, 12, Font.NORMAL, _textColor);<br />
        _verdanaTitle = new Font(_verdanaBase, 24, Font.ITALIC, _textColor);<br />
    }</p>
<p>    public MemoryStream GetPdfStream(int pcId, string logoPath)<br />
    {<br />
        var memoryStream = new MemoryStream();</p>
<p>        var pageSize = new Rectangle(PageSize.A4);<br />
        var document = new Document(pageSize, 36, 36, 50, 50);</p>
<p>        SetMetadata(document);<br />
        EncryptPdf(document, memoryStream);</p>
<p>        document.Open();</p>
<p>        document.Add(GetLogo(document, logoPath));</p>
<p>        var title = new Paragraph(&quot;Report&quot;, _verdanaTitle);<br />
        title.SetAlignment(&quot;Center&quot;);</p>
<p>        document.Add(title);<br />
        document.Add(new Paragraph(&quot;\n&quot;));<br />
        document.Add(new Paragraph(&quot;\n&quot;));</p>
<p>        var table = GetTable(_pSvc.Get(pcId));<br />
        document.Add(table);<br />
        document.Close();</p>
<p>        return memoryStream;<br />
    }</p>
<p>    private PdfPTable GetTable(Pc pc)<br />
    {<br />
        var table = new PdfPTable(4);<br />
        var widths = new[] { 110f, 120f, 110f, 120f };<br />
        table.TotalWidth = 460f;<br />
        table.LockedWidth = true;<br />
        table.SetWidths(widths);</p>
<p>        AddHeading(table, &quot;Global Settings&quot;);<br />
        AddCell(table, &quot;Country: &quot;, pc.OCountry, &quot;Country: &quot;, pc.OperatingAssetsCountry);<br />
        AddCell(table, &quot;Currency: &quot;, pc.Currency, &quot;Date: &quot;, pc.ValuationDateString);</p>
<p>        AddHeading(table, &quot;Customer&quot;);<br />
        AddCell(table, &quot;Customer Name: &quot;, pc.Customer.Name, &quot;Customer ID: &quot;, pc.Customer.Id.ToString());<br />
        AddCell(table, &quot;Bc: &quot;, pc.Customer.Bc.ToString(), &quot;Sales Turnover (m): &quot;, pc.Customer.Sales.TwoDpText());</p>
<p>        ...</p>
<p>        AddHeading(table, &quot;Valuation Identification Number: &quot; + pc.Id);<br />
        return table;<br />
    }</p>
<p>    private void AddHeading(PdfPTable table, string heading)<br />
    {<br />
        PdfPCell cell = new PdfPCell(new Phrase(heading, _verdanaHeading));<br />
        cell.Colspan = 4;<br />
        cell.BackgroundColor = _backgroundColor;<br />
        cell.HorizontalAlignment = CENTER;<br />
        cell.Border = iTextSharp.text.Rectangle.BOX;<br />
        cell.BorderColor = _lineColor;<br />
        cell.MinimumHeight = 22;<br />
        cell.VerticalAlignment = 1;<br />
        table.AddCell(cell);<br />
    }</p>
<p>    private void AddCell(PdfPTable table, string label1, string text1, string label2, string text2)<br />
    {<br />
        var labelCell = GetLabelCell();<br />
        var textCell = GetTextCell();</p>
<p>        labelCell.Phrase = new Phrase(label1, _verdanaNormal);<br />
        table.AddCell(labelCell);</p>
<p>        textCell.Phrase = new Phrase(text1, _verdanaNormal);<br />
        table.AddCell(textCell);</p>
<p>        labelCell.Phrase = new Phrase(label2, _verdanaNormal);<br />
        table.AddCell(labelCell);</p>
<p>        textCell.Phrase = new Phrase(text2, _verdanaNormal);<br />
        table.AddCell(textCell);<br />
    }</p>
<p>    private void AddCell(PdfPTable table, string label, string text)<br />
    {<br />
        var labelCell = GetLabelCell();<br />
        var textCell = GetTextCell();</p>
<p>        labelCell.Phrase = new Phrase(label, _verdanaNormal);<br />
        table.AddCell(labelCell);</p>
<p>        textCell.Phrase = new Phrase(text, _verdanaNormal);<br />
        table.AddCell(textCell);</p>
<p>        labelCell.Phrase = new Phrase(string.Empty, _verdanaNormal);<br />
        table.AddCell(labelCell);</p>
<p>        textCell.Phrase = new Phrase(string.Empty, _verdanaNormal);<br />
        table.AddCell(textCell);<br />
    }</p>
<p>    private PdfPCell GetTextCell()<br />
    {<br />
        return new PdfPCell<br />
                   {<br />
                       Border = Rectangle.RIGHT_BORDER | Rectangle.BOTTOM_BORDER | Rectangle.TOP_BORDER,<br />
                       BorderColor = _lineColor,<br />
                       MinimumHeight = 20,<br />
                       HorizontalAlignment = LEFT,<br />
                   };<br />
    }</p>
<p>    private PdfPCell GetLabelCell()<br />
    {<br />
        return new PdfPCell<br />
                   {<br />
                       Border = Rectangle.LEFT_BORDER | Rectangle.BOTTOM_BORDER | Rectangle.TOP_BORDER,<br />
                       BorderColor = _lineColor,<br />
                       MinimumHeight = 20,<br />
                       HorizontalAlignment = LEFT,<br />
                       PaddingLeft = 3<br />
                   };<br />
    }</p>
<p>    private Image GetLogo(Document document, string logoPath)<br />
    {<br />
        var logo = Image.GetInstance(logoPath);<br />
        logo.ScalePercent(48f);<br />
        logo.SetAbsolutePosition(document.PageSize.Width - 36f - 130f, document.PageSize.Height - 36f - 15.36f);<br />
        return logo;<br />
    }</p>
<p>    private void SetMetadata(Document document)<br />
    {<br />
        document.AddAuthor(&quot;Wordpress&quot;);<br />
        document.AddSubject(&quot;Report&quot;);<br />
        document.AddKeywords(&quot;Report;Wordpress&quot;);<br />
    }</p>
<p>    private void EncryptPdf(Document document, MemoryStream memoryStream)<br />
    {<br />
        var writer = PdfWriter.GetInstance(document, memoryStream);<br />
        writer.SetEncryption(PdfWriter.STRENGTH128BITS, null, null, PdfWriter.AllowCopy | PdfWriter.ALLOW_PRINTING | PdfWriter.ALLOW_SCREENREADERS);<br />
    }</p>
<p>}<br />
[/sourcecode]</p>
