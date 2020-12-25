---
title: nested using staments
date: 2008-11-06 16:44:37.000000000 +00:00
categories: []
tags: []
meta:
  _edit_last: '1907066'
---
<p>I love using statement for database access. It closes the connection automatically when all the codes within the using statment are executed. Recently I had to nest using staments for the project I was working on, and there were guys who thought it wasn't elegant. The arguments were, first, they doubted if nesting using actually work. Second, it did not conform to the standard.</p>
<p>[sourcecode language='xml']<br />
using (RecruiterUser uen = new RecruiterUser())<br />
{<br />
    using (RecruiterUserSite userSite = new RecruiterUserSite())<br />
    {<br />
        IDbTransaction trans = uen.BeginTransaction(scnfg);</p>
<p>        try<br />
        {<br />
            uen.update(trans, fd.memId, fd.comId, fd.Forename, fd.Surname, fd.Email);<br />
            userSite.updateSite(trans, fd.memId, fd.SiteId, 0, 0, false, DateTime.Now,<br />
                fd.ExpiryDate, 0, 0, 0, 0);</p>
<p>            userSite.CommitTransaction(trans);<br />
        }<br />
        catch (Exception e)<br />
        {<br />
            try<br />
            {<br />
                userSite.RollbackTransaction(trans);<br />
                PublishException(new BaseEx(scnfg, "Update fd failed and is rolled back", e));<br />
            }<br />
            catch (Exception ex)<br />
            {<br />
                PublishException(new BaseEx(scnfg, "Rollback Update fd failed", ex));<br />
            }<br />
        }</p>
<p>    }<br />
}<br />
[/sourcecode]</p>
<p>In my opinion, coding standard is important in team play, but also it should not hinder our progress in coding. We developers grow each day in our insight in the code. We need to be able to update the coding standard, rather than the standard drag us behind.</p>
<p>For the beauty of nested using, I agree that it does not look elegand. I googled a littlbe bit, and found that there were may other guys who thought about the beauty. Their solution was to nest using without {}.</p>
<p>[sourcecode language='xml']<br />
using (RecruiterUser uen = new RecruiterUser())<br />
using (RecruiterUserSite userSite = new RecruiterUserSite())<br />
{<br />
    IDbTransaction trans = uen.BeginTransaction(scnfg);</p>
<p>    try<br />
    {<br />
        uen.update(trans, fd.memId, fd.comId, fd.Forename, fd.Surname, fd.Email);<br />
        userSite.updateSite(trans, fd.memId, fd.SiteId, 0, 0, false, DateTime.Now,<br />
            fd.ExpiryDate, 0, 0, 0, 0);</p>
<p>        userSite.CommitTransaction(trans);<br />
    }<br />
    catch (Exception e)<br />
    {<br />
        try<br />
        {<br />
            userSite.RollbackTransaction(trans);<br />
            PublishException(new BaseEx(scnfg, "Update fd failed and is rolled back", e));<br />
        }<br />
        catch (Exception ex)<br />
        {<br />
            PublishException(new BaseEx(scnfg, "Rollback Update fd failed", ex));<br />
        }<br />
    }</p>
<p>}[/sourcecode]</p>
<p>I like this and will use this from now on.</p></p>
