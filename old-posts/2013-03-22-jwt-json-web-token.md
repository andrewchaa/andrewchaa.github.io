---
title: JWT - JSON Web Token
date: 2013-03-22 10:56:45.000000000 +00:00
categories:
- Programming
tags:
- JWT
- Security
- Signature
meta:
  _edit_last: '1907066'
  tagazine-media: a:7:{s:7:"primary";s:0:"";s:6:"images";a:0:{}s:6:"videos";a:0:{}s:11:"image_count";i:0;s:6:"author";s:7:"1907066";s:7:"blog_id";s:7:"1833431";s:9:"mod_stamp";s:19:"2013-03-22
    15:56:56";}
  publicize_twitter_user: andrewchaa
  _wpas_done_1752093: '1'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:111615627;b:1;}}
  _wpas_skip_1752093: '1'
  _oembed_ce59a06dc4fce18e304e0902c06d77a4: "{{unknown}}"
  _oembed_d7344b3c97760859ed3df45463fe5e69: "{{unknown}}"
  _oembed_cfd232dbbdbecd91c5094c7c04750d26: "{{unknown}}"
  _oembed_9ad4aff471d85f2443496cb758ead446: "{{unknown}}"
---
<h2>JWT is</h2>
<p>JWT (JSON Web Token) is "a compact URL-safe means of representing claims to be transferred between two parties," by its definition. (<a href="http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html">http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html</a>)</p>
<p>What is "claim", then? Claim is "a peice of information asserted about a subject." Claims are represented name/value pairs. Claims are in plain text withint JWT.</p>
<p>Examples of claims</p>
<ul>
<li>urn:wordpress:claims:userid=1234</li>
<li>urn:foo:claims:age=27</li>
<li>urn:bar:claims:over18= true</li>
</ul>
<h2>Getting to know the each part of the request url</h2>
<p>For example, this is a request url</p>
<p>param1=value1&amp;param2=value2&amp;client_id=my.test.local&amp;key_uri=https://login.yourapp.local/keys/jwt.test.pem&amp;cipher=ES512&amp;sig=AOXiKKHYOrfGOihBDOsS2yyNVTD_29ykbPJf8hplXpUdAiRCkuU1bBtQa0dDvJpJX71UAC9vJfE2n2ZUuIIB_eWMAW85gs9ZSAWJYZ_NmtGXX-z0f_kzWO7tymTHJ1r9OMVH5CGppQGj4P8XU0pyYKBH4VQWfAbk1jEBvT0ftOLJwab9</p>
<p>It's quite frustrating that you don't know what it means when people use a technical term and everyone other than you seems to understand what he/she means. I often feel that with security things... So I write down here what I understand so far.</p>
<h3>client_id</h3>
<p>it's the id you register with your authorisation service provider. If you use twitter api, then you need to register your client (can be web site, mobile, or whatever) and receive the id. It will be the id you use to access their api and get the authentication.</p>
<h3>key_uri</h3>
<p>It is the uri that you visit and receive the public key. With the public key you encrypt your require url and add the encrypted string as signature.</p>
<h3>cipher</h3>
<p>encrypting algorithm</p>
<h3>sig</h3>
<p>Signature, the encrypted string of your url request. from the example, the whole url part except &amp;sig bit is called "payload" Your authentication service provider will use the signature to verify that the request is correct.</p>
<h2>Access Token</h2>
<p>the piece of data which proves your authorisation to access data on behalf of the user.</p>
<p>How does the authorisation happen with OAuth 2.0</p>
<p>You uses OAuth to call apis, like facebook, twitter, Huddle apis.</p>
<h3>First, initial request</h3>
<p>You issue a request to the authorise endpoint of the Authorisation server.</p>
<pre>GET /request?response_type=code&amp;client_id=s6BhdRkqt&amp;redirect_uri=MyAppUri%3A%2F%2FMyAppServer.com/receiveAuthCode
HTTP/1.1
Host: login.huddle.net</pre>
<h3>Second, you get a response that will allow the end-user authorise the grant</h3>
<pre>HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
. . .

&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"&gt;

&lt;html id="api" xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en"&gt;
   &lt;head&gt;
      &lt;title&gt;Log in to authorise this request&lt;title&gt;
   &lt;/head&gt;
   &lt;body&gt;
      . . .
      &lt;form action="https://login.yourapp.net/authoriseGrantRequest" method="POST"&gt;
         . . .
      &lt;/form&gt;
   &lt;/body&gt;
&lt;/html&gt;</pre>
<p>If the user successfully authorises the request, the server will redirect the user back to your registered pag, passing the Authorisation Code back.</p>
<pre>HTTP/1.1 302 Found
Location: yourapp://yourapp.net/receiveAuthCode?code=ilWsRn1uB1</pre>
<h3>Third, obtain an Access token and its associated Refresh token</h3>
<p>The Access token expires after a set period of time (say, 5 minutes) and must be refreshed by calling back to the authorisation server. The Refresh token is used then.</p>
<pre>POST /token HTTP/1.1
Host: login.yourapp.net
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&amp;client_id=s6BhdRkqt&amp;redirect_uri=MyAppUri%3A%2F%2FMyAppServer.com/receiveAuthCode&amp;code=i1WsRn1uB1</pre>
<p>If the Authorisation code is valid, you get a standard HTTP 200 response similar to this.</p>
<pre>HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store

{
   "access_token":"S1AV32hkKG",
   "expires_in":300,
   "refresh_token":"8xLOxBtZp8"
}</pre>
<h3>Finally, api calls</h3>
<p>Now as you have everything you need, you can start making calls to api. Include the Access token in the authorization header field of HTTP requests.</p>
<pre>GET https://api.yourapp.net/v2/calendar/workspaces/all HTTP/1.1
Authorization: OAuth2 vF9dft4qmT
Accept: application/xml
Host: api.yourapp.net</pre>
<p>Alternatively, the token can be passed as a querystring parameter.</p>
<pre>GET https://api.yourapp.net/v2/calendar/workspaces/all?oauth_token=vF9dft4qmT HTTP/1.1
Accept: application/xml
Host: api.yourapp.net</pre>
<p>If the Access token is expired, as it does in 5 mins, you will need to refresh it periodically with refresh token.</p>
<pre>POST /refresh HTTP/1.1
Host: login.yourapp.net
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token&amp;client_id=s6BhdRkqt&amp;refresh_token=n4E9O119d</pre>
<p>Hope this helps, and I will add more details as I go on with my current security project.</p>
