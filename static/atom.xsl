<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
  xmlns:atom="http://www.w3.org/2005/Atom">
<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<xsl:param name="feedurl" select="/atom:feed/atom:link[@rel='self']/@href" />
<xsl:param name="baseurl" select="substring-before($feedurl, 'atom')" />
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="style.css" />
  <link rel="icon" href="favicon.svg" />
  <title><xsl:value-of select="/atom:feed/atom:title"/> (web feed)</title>
</head>
<body>
  <main>
    <h1><xsl:value-of select="/atom:feed/atom:title"/> (web feed)</h1>

    <p>
      This is the web feed for my site.
      You are meant to copy the feed URL, shown below,
      into a feed reader application.
    </p>

    <pre>
      <code id="feedurl">
        <xsl:value-of select="$feedurl"/>
      </code>
    </pre>

    <p>
      <a href="/feed-atom/">
        <xsl:attribute name="href">
          <xsl:value-of select="concat($baseurl, 'feed-atom/')" />
        </xsl:attribute>
        Learn more about feeds
      </a>
    </p>

    <p>
      <a href="/">
        <xsl:attribute name="href">
          <xsl:value-of select="$baseurl" />
        </xsl:attribute>
        My site
      </a>
    </p>

    <p>
      <a href="javascript:window.history.back();">Back to previous page</a>
    </p>

    <hr/>

    <p>For each post, this feed also contains
    the introduction, full post contents, and last updated date.</p>

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
