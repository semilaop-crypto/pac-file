function FindProxyForURL(url, host) {

  host = host.toLowerCase();

  // ---------- Targets to control ----------
  // ChatGPT / OpenAI
  var isChatGPT =
      dnsDomainIs(host, "chatgpt.com") ||
      shExpMatch(host, "*.chatgpt.com") ||
      dnsDomainIs(host, "openai.com") ||
      shExpMatch(host, "*.openai.com") ||
      dnsDomainIs(host, "auth.openai.com") ||
      shExpMatch(host, "*.auth.openai.com") ||
      dnsDomainIs(host, "oaistatic.com") ||
      shExpMatch(host, "*.oaistatic.com") ||
      dnsDomainIs(host, "oaiusercontent.com") ||
      shExpMatch(host, "*.oaiusercontent.com");

  // Microsoft Copilot / Bing Copilot
  var isMicrosoftCopilot =
      dnsDomainIs(host, "copilot.microsoft.com") ||
      shExpMatch(host, "*.copilot.microsoft.com") ||
      dnsDomainIs(host, "bing.com") ||                 // Copilot in Bing often uses bing.com endpoints
      shExpMatch(host, "*.bing.com") ||
      dnsDomainIs(host, "www.bing.com") ||
      dnsDomainIs(host, "edgeservices.bing.com") ||
      shExpMatch(host, "*.edgeservices.bing.com");

  // GitHub Copilot (web + service endpoints)
  var isGitHubCopilot =
      dnsDomainIs(host, "github.com") ||
      shExpMatch(host, "*.github.com") ||
      dnsDomainIs(host, "githubcopilot.com") ||
      shExpMatch(host, "*.githubcopilot.com") ||
      dnsDomainIs(host, "api.githubcopilot.com") ||
      shExpMatch(host, "*.api.githubcopilot.com");

  // If request is for any controlled AI site/service
  if (isChatGPT || isMicrosoftCopilot || isGitHubCopilot) {

    // ---------- Corporate presence check via DNS ----------
    var corpIP = dnsResolve("sts.kingpower.com");

    if (corpIP == "142.1.10.22") {
      // In Corporate network -> allow
      return "DIRECT";
    } else {
      // Outside Corporate network -> block (blackhole proxy)
      return "PROXY 127.0.0.1:9";
    }
  }

  // Default for all other sites
  return "DIRECT";
}
