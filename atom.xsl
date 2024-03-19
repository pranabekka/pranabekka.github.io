<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
  xmlns:atom="http://www.w3.org/2005/Atom">
<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="style.css" />
  <title><xsl:value-of select="/atom:feed/atom:title"/> (web feed)</title>
</head>
<body>
  <main>
    <h1><xsl:value-of select="/atom:feed/atom:title"/> (web feed)</h1>

    <!--
    <p><xsl:value-of select="/atom:feed/atom:subtitle"/></p>
    -->

    <p>
      This is the web feed for my site.
      You are meant to copy the feed URL, shown below,
      into a feed reader application.
    </p>

    <pre>
      <code id="feedurl">
        <xsl:value-of select="/atom:feed/atom:link[@rel='self']/@href"/>
      </code>
    </pre>

    <p>
      <!-- TODO: insert href from atom.xml into anchor tag href -->
      <!-- <xsl:value-of select="/atom:feed/atom:link[@rel='alternate']/@href"/> -->
      <a href="https://pranabekka.github.io/feed-atom/">Learn more about feeds</a>
    </p>

    <p>
      <a href="https://pranabekka.github.io/">My site</a>
    </p>

    <p>
      <a href="javascript:window.history.back();">Back to previous page</a>
    </p>

    <h2>Pages</h2>

    <ul class="cards">
      <xsl:for-each select="/atom:feed/atom:entry">
        <li>
          <h3>
            <xsl:value-of select="atom:title" />
          </h3>
          <p class="subtitle">
            <xsl:value-of select="atom:updated" />
          </p>
          <p>
            <xsl:value-of select="atom:summary" />
          </p>
        </li>
      </xsl:for-each>
    </ul>
  </main>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
