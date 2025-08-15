# Social Media Meta Tag Lösung für Workshop Pages

## Problem

WhatsApp und andere Social Media Plattformen zeigen für den Workshop-Link (`/workshops/ai-low-hanging-fruits`) die allgemeinen Meta-Tags der Homepage statt der workshop-spezifischen Meta-Tags an.

## Ursache

Social Media Crawler lesen das initiale HTML bevor JavaScript läuft. SPAs (Single Page Applications) liefern für alle Routes das gleiche `index.html` aus, sodass Crawler immer die Standard Meta-Tags sehen.

## Lösung

Zwei-teiliger Ansatz für optimale Social Media Unterstützung:

### 1. Statische HTML für Social Media Bots

- **Datei**: `public/workshops/ai-low-hanging-fruits/index.html`
- **Inhalt**: Statische HTML mit workshop-spezifischen Meta-Tags (KEIN JavaScript)
- **Besonderheiten**:
  - Enthält nur statischen HTML-Content für Bots
  - Kein React/JavaScript - sofortiges Meta-Tag Parsing
  - Einfacher HTML-Content als Fallback für Bots
- **Meta-Tags**:
  - Title: `KI Workshop - Low Hanging Fruits | 12 of Spades`
  - OpenGraph Type: `article`
  - Workshop-spezifische Beschreibung und Keywords
  - Workshop-Image: `workshop-participants.webp`
  - Korrekte URL: `/workshops/ai-low-hanging-fruits`

### 2. .htaccess Konfiguration für Bot-Detection

- **Datei**: `public/.htaccess`
- **Funktionalität**:
  - Erkennt Social Media Bots anhand User-Agent
  - Leitet Bots zur statischen HTML um (`/workshops/ai-low-hanging-fruits/index.html`)
  - Normale Browser bekommen die SPA (`/index.html`)
- **Implementierung**:

  ```apache
  # Social Media Bot Detection
  RewriteCond %{HTTP_USER_AGENT} (facebookexternalhit|Twitterbot|WhatsApp|LinkedInBot|Slackbot|TelegramBot|SkypeUriPreview|Discordbot|AppleBot) [NC]
  RewriteRule ^workshops/ai-low-hanging-fruits/?$ /workshops/ai-low-hanging-fruits/index.html [L]

  # For normal browsers accessing workshop routes, serve the main SPA
  RewriteRule ^workshops/ai-low-hanging-fruits/?$ /index.html [L]
  ```

**Erkannte Bots:**

- WhatsApp
- Facebook (facebookexternalhit)
- Twitter (Twitterbot)
- LinkedIn (LinkedInBot)
- Slack (Slackbot)
- Telegram (TelegramBot)
- Discord (Discordbot)
- Apple (AppleBot)

## Testing

### Development

```bash
# Normale Browser (bekommt Standard SPA)
curl http://localhost:5173/workshops/ai-low-hanging-fruits
# → Zeigt: <title>12 of Spades - Johannes Herrmann</title>

# Statische HTML direkt (für Bots)
curl http://localhost:5173/workshops/ai-low-hanging-fruits/index.html
# → Zeigt: <title>KI Workshop - Low Hanging Fruits | 12 of Spades</title>
```

### Production

```bash
# Simulation eines WhatsApp Crawlers (bekommt statische HTML)
curl -H "User-Agent: WhatsApp/2.21.4.18" https://12-of-spades.com/workshops/ai-low-hanging-fruits
# → Zeigt: Workshop-spezifische Meta-Tags

# Normale Browser (bekommt SPA)
curl https://12-of-spades.com/workshops/ai-low-hanging-fruits
# → Zeigt: Standard Meta-Tags + React App lädt Workshop-Seite
```

**Wichtig**: Im Development Mode funktioniert die .htaccess Bot-Detection nicht, da Vite die Regeln ignoriert. In Production funktioniert alles korrekt.

## Verification

Die Meta-Tags können auf folgenden Plattformen getestet werden:

- **Facebook**: https://developers.facebook.com/tools/debug/
- **Twitter**: https://cards-dev.twitter.com/validator
- **LinkedIn**: https://www.linkedin.com/post-inspector/
- **WhatsApp**: Teile Link direkt in WhatsApp

## Wartung

Bei neuen Workshop-Pages:

1. Neue statische HTML in `public/workshops/{workshop-name}/index.html` erstellen
2. .htaccess Regel für die neue Route hinzufügen
3. Workshop-spezifische Meta-Tags konfigurieren

## Benefits

✅ **SEO-optimiert**: Echte HTML-Meta-Tags für Crawler
✅ **Performance**: Keine JavaScript-Ausführung für Bots nötig
✅ **Benutzerfreundlich**: SPA funktioniert normal für echte User
✅ **Skalierbar**: Einfach erweiterbar für weitere Workshop-Pages
