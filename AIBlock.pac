function FindProxyForURL(url, host) {

  host = host.toLowerCase();

  // Domains to control
  var isChatGPT =
      dnsDomainIs(host, "chatgpt.com") ||
      shExpMatch(host, "*.chatgpt.com") ||
      dnsDomainIs(host, "openai.com") ||
      shExpMatch(host, "*.openai.com") ||
      dnsDomainIs(host, "auth.openai.com") ||
      shExpMatch(host, "*.auth.openai.com");

  if (isChatGPT) {

    // Corporate DNS check
    var corpIP = dnsResolve("sts.kingpower.com");

    if (corpIP == "142.1.10.22") {
      // Corporate network
      return "DIRECT";
    } else {
      // Non-corporate network -> Block
      return "PROXY 127.0.0.1:9";
    }
  }

  // Default behavior
  return "DIRECT";
}
