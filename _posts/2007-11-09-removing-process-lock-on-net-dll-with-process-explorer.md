---
title: Removing process lock on .net dll with Process Explorer
date: 2007-11-09 09:21:49.000000000 +00:00
type: post
published: true
status: publish
categories: []
tags: []
meta: {}
author:
  login: simplelifeuk
  email: andrew.chaa@yahoo.co.uk
  display_name: Andy
  first_name: Andrew
  last_name: Chaa
---
<p>갑자기 Business 솔루션이 compile이 안되는 거다. 우리는 common components 들을 GAC에 넣기 때문에, copy to local 이 false로 되어있어서 web project가 오픈되어 있으면 business 솔루션이 컴파일이 안되는 경우가 많다. 근데 분명 다른 VS를 다 닫았는데, 안되다니! Windows Task Manager를 찾아봐도 다른 Visual Studio process가 없다.</p>
<p>그래서 좀 어떻게 해볼려고 인터넷을 찾아더니, 고맙게도 <a href="http://www.microsoft.com/technet/sysinternals/utilities/processexplorer.mspx">Process Explorer</a>란 놈이 있네. 여기서 찾으니, 딱숨어 있던, 종료되지 않은 Visual Studio 프로세스가 하나 보인다. 그래서 그놈을캭 없앴다.</p>
