import { useTranslation } from './useTranslation';
import { projectsData as originalProjects } from '../data/projects';
import { Project } from '../types';

// German translations for all projects
const germanTranslations: { [key: string]: Partial<Project> } = {
  "Modern Portfolio Website with Advanced Features": {
    title: "Moderne Portfolio-Website mit erweiterten Funktionen",
    description: [
      "Entwicklung einer modernen, responsiven Portfolio-Website zur Präsentation von Software-Entwicklungsexpertise und Projektportfolio. Die Website dient als professionelle Plattform zur Darstellung von Services, Projekten und technischen Fähigkeiten für potenzielle Kunden und Kooperationspartner.",
      "Das Projekt legt Wert auf moderne Web-Entwicklungspraktiken mit **React 19** und **TypeScript** und verfügt über eine komponentenbasierte Architektur mit dem **Mantine UI Framework**. Die Website bietet erweiterte Filterfunktionen für Projekte und Technologien, die es Besuchern ermöglichen, relevante Arbeiten basierend auf ihren Interessen zu erkunden.",
      "Zu den Hauptfunktionen gehören umfassende Internationalisierungsunterstützung (Deutsch/Englisch), flüssige Animationen mit **Framer Motion** und ein ausgeklügeltes Dark/Light-Theme-System. Die Website generiert automatisch Technologie-Statistiken aus Projektdaten und bietet eine intuitive Benutzererfahrung auf allen Gerätetypen.",
      "Das Projekt verfügt über umfassende Testabdeckung mit **Vitest**, strenge TypeScript-Integration und automatisierte **CI/CD-Praktiken** über GitHub Actions. Als *Open Source Projekt* ist die gesamte Codebasis öffentlich auf [GitHub](https://github.com/woozar/website-relaunch) verfügbar und zeigt transparente Entwicklungspraktiken und hohe Code-Qualitätsstandards.",
      "Dieses Projekt demonstriert *KI-gestützte Entwicklungsworkflows*, bei denen alle Programmier- und Testaufgaben mit **Claude Code** erledigt wurden, während der menschliche Entwickler als Product Owner für strategische Entscheidungen und manuelle Qualitätssicherung fungierte."
    ]
  },
  "AI Playground": {
    description: [
      "ChatYourData, ein innovatives Technologieunternehmen, arbeitet mit Kreuz & Partner, einer AI-Beratungsfirma, zusammen, um modernste KI-Lösungen zu entwickeln. Gemeinsam entwickeln wir eine Demonstrationsplattform namens **\"Playground\"**, die das Potenzial von KI zeigt und die von uns angebotenen Services hervorhebt.",
      "Als Hauptentwickler des Playground-Projekts war ich für den gesamten Entwicklungsprozess verantwortlich, vom ersten Konzept bis zur finalen Bereitstellung. Die Plattform ermöglicht es Nutzern, mit verschiedenen **KI-Anwendungen** zu experimentieren, wie z.B. KI-Experten aus hochgeladenen Dokumenten zu erstellen, Bilder zu generieren und benutzerdefinierte KI-Szenarien zu definieren.",
      "Um Flexibilität und Skalierbarkeit zu gewährleisten, ist die Playground-Plattform für **Multi-Tenancy** ausgelegt, sodass jeder Kunde seinen eigenen dedizierten Arbeitsbereich haben kann. Darüber hinaus kann jeder Tenant in mehrere Bereiche unterteilt werden, was es verschiedenen Abteilungen innerhalb einer Organisation ermöglicht, ihre eigenen *privaten Räume* zu haben und gleichzeitig relevante Informationen zu teilen."
    ]
  },
  "Workshop for 'Using AI in software for tax advisors'": {
    title: "Workshop 'KI-Einsatz in Software für Steuerberater'",
    description: [
      "WIADOK, ein Unternehmen, das sich auf innovative Lösungen für Unternehmen, insbesondere Steuerberater, spezialisiert hat, erforscht ständig neue Wege zur Effizienz- und Produktivitätssteigerung durch Technologieeinsatz.",
      "Ich leitete einen KI-Workshop für WIADOK, in dem wir potenzielle KI-Anwendungen in ihrem Geschäft diskutierten. Eine der Hauptideen war die Entwicklung einer mobilen App, die KI zur Verarbeitung von Belegen und Rechnungen nutzen könnte. Endnutzer könnten einfach Fotos dieser Dokumente machen, und die App würde ein LLM verwenden, um wichtige Informationen wie Datum, Anbieter und Einzelkosten zu extrahieren. Diese Informationen könnten dann automatisch an das Steuerberaterbüro übertragen werden.",
      "Ein weiterer interessanter Anwendungsfall war die Nutzung von KI zur Personalisierung von Newslettern. Durch eine Reihe von Fragen an Abonnenten könnte das LLM detaillierte Nutzerprofile erstellen. Diese Profile würden es dem LLM ermöglichen, hochpersonalisierte Newsletter zu erstellen, die auf die spezifischen Bedürfnisse und Interessen jedes Einzelnen zugeschnitten sind."
    ]
  },
  "Workshop for 'Using AI in ambiFOX daily business'": {
    title: "Workshop 'KI-Einsatz im ambiFOX Tagesgeschäft'",
    description: [
      "ambiFOX ist ein Technologieunternehmen, das sich auf Netzwerkbetrieb spezialisiert hat. Sie bieten eine Reihe von Services an, einschließlich Netzwerkdesign, Implementierung und Wartung. Ihr Ziel ist es, Netzwerkoperationen zu optimieren und die IT-Effizienz zu verbessern.",
      "Ich leitete einen Workshop für ambiFOX, in dem wir potenzielle KI-Anwendungen in ihrem Geschäft erforschten. Eine Idee war, KI zur Automatisierung der Generierung von Netzwerkgeräte-Konfigurationen zu nutzen. Dies könnte die Zeit und den Aufwand für die Einrichtung neuer Geräte erheblich reduzieren.",
      "Eine weitere interessante Anwendung war die Verwendung von KI zur Umformulierung eingehender Support-Tickets. Durch automatische Anpassung des Tons dieser Nachrichten könnte ambiFOX die Support-Erfahrung verbessern und die emotionale Belastung ihres Support-Teams reduzieren."
    ]
  },
  "Uninu AI infused foodtracking app": {
    title: "Uninu KI-gestützte Food-Tracking App",
    description: [
      "Glückliche Gäste GmbH, ein Unternehmen, das sich auf innovative Food-Tracking-Lösungen konzentriert, arbeitet an einer neuen App namens \"Uninu\". Sie wollen revolutionieren, wie Menschen ihre Nahrungsaufnahme verfolgen, indem sie KI zur Vereinfachung des Prozesses nutzen.",
      "Ich war einer der ersten Entwickler im Uninu-Projekt und spielte eine Schlüsselrolle beim Aufbau der Backend-Infrastruktur und der React Native Mobile App. Anfangs verwendeten wir einen traditionellen Ansatz mit AWS API Gateway und RDS. Um jedoch Skalierbarkeit, Performance und Echtzeit-Fähigkeiten zu verbessern, wechselten wir zu einer moderneren Architektur mit AWS AppSync und DynamoDB.",
      "AppSync, ein vollständig verwalteter GraphQL-Service, ermöglichte es uns, eine echtzeitfähige, skalierbare und flexible API-Schicht zu erstellen. DynamoDB bot uns schnelle und vorhersagbare Performance für große Mengen von Nutzerdaten wie Food-Logs, Nährwertinformationen und Nutzereinstellungen.",
      "Durch die Nutzung dieser AWS-Services konnten wir eine robuste Backend-Infrastruktur aufbauen, die die Kernfunktionalitäten der Uninu-App unterstützt, wie Nutzerauthentifizierung, Lebensmittelerkennung, Nährwertberechnung und personalisierte Speiseplan-Generierung."
    ]
  },
  "Sikant Med": {
    description: [
      "Sikant ist ein Healthcare-Technologieunternehmen, das Softwarelösungen für kleine und mittlere Operationszentren entwickelt. Ich trug zur Verbesserung ihrer Software \"Sikant Med\" bei, indem ich ein Echtzeit-Support-Chat-Feature implementierte und umfassende End-to-End-Tests entwickelte.",
      "Als Teil dieses Projekts integrierte ich die Chat-Funktionalität, entwarf eine benutzerfreundliche Oberfläche für Support-Agenten und implementierte die notwendige Backend-Infrastruktur für Echtzeit-Kommunikation. Zusätzlich entwickelte und führte ich End-to-End-Tests durch, um die Qualität und Zuverlässigkeit der Software sicherzustellen.",
      "Durch das Hinzufügen dieser Funktionen und die Implementierung robuster Testpraktiken verbesserte Sikant ihre Software durch effizienteren und zeitnaheren Support, erhöhte Nutzerzufriedenheit und stellte ein hochwertiges Produkt sicher."
    ]
  },
  "AI infused WebScrapper for construction tenders": {
    title: "KI-gestützter WebScrapper für Bauausschreibungen",
    description: [
      "Drawag AG, ein auf Bau und Ingenieurswesen spezialisiertes Unternehmen, stand vor einer erheblichen Herausforderung: Ein beträchtlicher Teil der Arbeitszeit eines Mitarbeiters wurde mit der manuellen Suche durch verschiedene Portale verbracht, um potenzielle Bauprojekte zu identifizieren, die ihrer Expertise entsprachen. Das Ziel war es, Projekte mit spezifischen Baugewerken effizient zu identifizieren, bei denen Drawag ihre Dienste als Subunternehmer anbieten konnte.",
      "Um diese Herausforderung zu bewältigen, schlugen wir vor, KI zu nutzen, um den Such- und Filterprozess durch diese Portale zu automatisieren. Wir begannen mit der Entwicklung eines Web-Scrapers zur Extraktion relevanter Daten aus diesen Portalen. Diese Daten wurden dann in ein hochmodernes Sprachmodell wie GPT-4 eingespeist, um Projekte zu identifizieren, die Drawags spezifischen Kriterien entsprachen.",
      "Durch die Automatisierung dieses Prozesses zielten wir darauf ab, die Zeit für manuelle Suchen erheblich zu reduzieren und die Effizienz bei der Identifizierung relevanter Projekte zu steigern. Das Sprachmodell wurde verwendet, um die extrahierten Daten zu analysieren und relevante Informationen wie Projektdetails, Zeitpläne und Kontaktinformationen zu identifizieren. Zusätzlich implementierten wir ein Benachrichtigungssystem, um die relevanten Teammitglieder per E-Mail zu alarmieren, wenn ein neues Projekt identifiziert wurde, das ihren Kriterien entsprach."
    ]
  },
  "Concept and implementation of an app store and a demo app": {
    title: "Konzept und Implementierung eines App Stores und einer Demo-App",
    description: [
      "Das Projekt konzentrierte sich auf die Entwicklung eines branchenspezifischen App Stores für Industrial PCs (IPCs) innerhalb von Maschinen unseres Kunden. Ein wesentlicher Aspekt war der Launch der ersten App—Celos Tech Calculator—ein spezialisiertes Tool für maschinenspezifische Berechnungen, das darauf abzielte, die operative Effizienz und Funktionalität zu verbessern.",
      "Das primäre Ziel war es, ein robustes App Store-Framework nahtlos in IPCs zu integrieren und die unkomplizierte Installation und Verwaltung von Apps zu ermöglichen. Dieses Framework diente als Plattform für die Bereitstellung des Celos Tech Calculators und ebnete den Weg für zukünftige App-Erweiterungen.",
      "Technologisch nutzte das Projekt Cloud-Services für die App-Distribution, implementierte strenge Sicherheitsmaßnahmen für die Authentifizierung und verwendete Docker für eine effiziente App-Containerisierung. Continuous Integration und Deployment (CI/CD) Pipelines sorgten für reibungslose Updates und Wartung des App Store-Ökosystems.",
      "Durch die Einführung des Celos Tech Calculators, der speziell für maschinenspezifische Berechnungen entwickelt wurde, zielte das Projekt darauf ab, industrielle Abläufe zu optimieren. Es bot eine benutzerfreundliche Schnittstelle für die Verwaltung und Nutzung spezialisierter Tools direkt auf den von unserem Kunden hergestellten Maschinen und verbesserte damit Produktivität und operative Effektivität."
    ]
  },
  "Integrate TULIP no code plattform": {
    title: "Integration der TULIP No-Code-Plattform",
    description: [
      "Das Projekt integrierte erfolgreich die TULIP No-Code-Plattform mit der Celos X Maschinensoftware und schuf einen nahtlosen, API-basierten bidirektionalen Datenfluss. Diese Integration verbesserte Celos X durch Echtzeit-Datenaustausch und erweiterte Funktionalität durch TULIPs No-Code-Fähigkeiten.",
      "Zu den implementierten Hauptfunktionen gehörten robuste APIs für effizientes Datenmanagement, unternehmenstaugliche Authentifizierungs- und Autorisierungsmechanismen sowie ein Technologie-Stack mit TypeScript und Angular für Skalierbarkeit und Reaktionsfähigkeit. Diese Elemente sorgten für sicheren Benutzerzugang und reibungslose Kommunikation zwischen den Plattformen.",
      "Der Entwicklungsprozess folgte einer strukturierten Roadmap mit Anforderungsanalyse, Design, Entwicklung, Tests und Deployment. Dieser Ansatz stellte sicher, dass die Integration alle funktionalen und Leistungsanforderungen erfüllte und zu einer skalierbaren, wartbaren und effizienten Lösung für Unternehmensumgebungen führte."
    ]
  },
  "Integration of ISTOS production planning system ": {
    title: "Integration des ISTOS Produktionsplanungssystems",
    description: [
      "Das Projekt integrierte das ISTOS Produktionsplanungssystem durch die Verbindung von Cloud-Frontends und On-Premise-Maschinen mit einer cloudbasierten Plattform. Diese Integration ermöglichte nahtlose Kommunikation und Koordination zwischen verschiedenen Komponenten und verbesserte die Effizienz der Produktionsplanung.",
      "Zentrale Elemente der Integration umfassten robuste Benutzerauthentifizierung und Autorisierungsmechanismen, die sicheren Zugang in einem Unternehmenskontext gewährleisteten. Das Projekt nutzte mehrere Azure-Services und Terraform, um ein skalierbares und widerstandsfähiges System aufzubauen.",
      "Der Entwicklungsprozess folgte einem strukturierten Ansatz mit Anforderungsanalyse, Design, Implementierung und Tests. Dies stellte sicher, dass die Integration alle funktionalen und Sicherheitsanforderungen erfüllte und zu einer zuverlässigen und effizienten Produktionsplanungslösung führte."
    ]
  },
  "Implementation of PAYZR Business Model (Data Flow)": {
    title: "Implementierung des PAYZR Geschäftsmodells (Datenfluss)",
    description: [
      "Dieses Projekt zielte darauf ab, eine fortschrittliche headless Maschine für die Verwaltung von Cloud-Datenflüssen zu entwickeln, die Anforderungen wie Betrugserkennnung, Remote-Deaktivierung, Unternehmensregulierungs-Compliance und Abrechnungsintegration mit externen Systemen erfüllt. Die Lösung betonte hohe Sicherheitsstandards, einschließlich Write Once Read Many (WORM) Speicher und Stream-Validierung, während sie ein Pay-per-Use-Modell für Endnutzer ermöglichte.",
      "Zu den Hauptfunktionen gehörten Echtzeit-Betrugserkennung, sichere Remote-Deaktivierung, Einhaltung von Vorschriften wie GDPR und HIPAA sowie nahtlose Abrechnungsintegration. Die Maschine integrierte umfassende Sicherheitsprotokolle wie Verschlüsselung und Zugriffskontrolle, um robusten Datenschutz zu gewährleisten.",
      "Die Entwicklung folgte einer strukturierten Roadmap, beginnend mit Anforderungsanalyse, gefolgt von Design, Entwicklung, Tests und Deployment. Die Architektur war cloud-nativ und microservices-basiert für hohe Verfügbarkeit, Widerstandsfähigkeit und Skalierbarkeit.",
      "Zusammenfassend lieferte dieses Projekt eine sichere, konforme und effiziente Lösung für die Verwaltung komplexer Cloud-Datenflüsse. Durch die Ermöglichung eines Pay-per-Use-Modells bot es Kosteneffizienz, Skalierbarkeit und Flexibilität und war damit eine ideale Wahl für Unternehmen, die ihre Datenverwaltungsprozesse optimieren wollten, während strenge Sicherheits- und Regulierungsstandards eingehalten wurden."
    ]
  },
  "Development and design of the \"Celos X\" digital ecosystem": {
    title: "Entwicklung und Design des \"Celos X\" digitalen Ökosystems",
    description: [
      "DMG Moris preisgekröntes **\"Celos X\"** Projekt revolutioniert den Datenaustausch für High-End-Werkzeugmaschinen. Diese innovative Plattform integriert nahtlos Edge Computing mit der **Microsoft Azure Cloud** und ermöglicht leistungsstarke Datenanalyse und Maschinenoptimierung. Von Microsoft mit dem *2021 \"Intelligent Manufacturing Award\"* in der Kategorie \"Envision\" ausgezeichnet, ebnet Celos X den Weg für intelligentere Fabriken.",
      "Die Plattform nutzt industrielle PCs innerhalb der Maschinen, um sich mit Shop-Floor-Geräten und Peripheriegeräten über branchenübliche Protokolle wie **OPC UA**, **MTConnect**, **MQTT** und **IO-Link Master** zu verbinden. Diese robuste Kommunikationsgrundlage ermöglicht eine reichhaltige Auswahl an Bedieneranwendungen, die über hochauflösende Touchscreens zugänglich sind. Mit modernen Webtechnologien wie **Angular 16** Frontends mit **Mikrofrontends** und **REST APIs** bieten diese Anwendungen eine intuitive Benutzererfahrung.",
      "Von Anfang an hatte ich das Glück, Teil des Celos X Entwicklungsteams zu sein. Es war eine aufregende Gelegenheit, zur Grundlage des Projekts beizutragen und gemeinsam mit anderen Pionieren die Architektur der Plattform zu definieren. Wir konzentrierten uns darauf, ein starkes Framework zu etablieren, das zukünftige Entwicklungen unterstützen könnte."
    ]
  },
  "Exploring AI Automation": {
    title: "KI-Automatisierung erforschen",
    description: [
      "Open Tinkering ist nicht deine durchschnittliche Tech-Gruppe. Angetrieben von einer gemeinsamen Leidenschaft für Erforschung taucht dieses Kollektiv kopfüber in die sich ständig entwickelnde Welt der KI und LLMs (Large Language Models) ein. Ihr Ziel ist es, das Potenzial der Automatisierung zu nutzen, um benutzerfreundliche Tools zu schaffen.",
      "Ein faszinierendes Projekt beinhaltet die Erstellung maßgeschneiderter Chatbots. Vergiss generische KI-Assistenten - diese Bots spezialisieren sich auf spezifische Themen. Stell dir einen Garten-Begleiter vor, der personalisierte Tipps bietet, oder einen Astronomie-Bot, der komplexe himmlische Anfragen behandelt. Durch den Aufbau dieser fokussierten KI-Helfer hofft Open Tinkering, Benutzererfahrungen zu optimieren und den Zugang zu spezialisiertem Wissen zu demokratisieren.",
      "Ein weiteres faszinierendes Konzept, das sie erforschen, ist Langgraph. Stell es dir als die \"Avengers Initiative\" für KI vor - ein System, das virtuelle Teams von KI-Experten zusammenstellt. Stell dir verschiedene KI-Modelle vor, jede mit ihren einzigartigen Stärken, die nahtlos zusammenarbeiten. Langgraph zielt darauf ab, diese Zusammenarbeit zu erleichtern und komplexe Probleme mit größerer Effizienz durch die kombinierte Kraft dieser KI-\"Superteams\" zu bewältigen.",
      "Open Tinkerings Vorstoß in die KI-Automatisierung zeigt ihr Engagement, die Grenzen der Technologie zu erweitern. Ihr Engagement für Open-Source-Entwicklung stellt sicher, dass ihre Erkenntnisse leicht verfügbar sind und die Community befähigt, die aufregende Zukunft KI-gestützter Lösungen gemeinsam mit ihnen zu erkunden."
    ]
  },
  "Streamlining Operations: A Tailored Software Solution for Kranz IT": {
    title: "Betriebsabläufe optimieren: Eine maßgeschneiderte Softwarelösung für Kranz IT",
    description: [
      "Trotz verfügbarer Software für die Digitalisierung von Geschäftsprozessen suchte das IT-Systemhaus Kranz eine maßgeschneiderte Lösung. Ihre Priorität: Minimalismus und Benutzerfreundlichkeit, um die Lernkurve zu minimieren.",
      "Eine Schlüsselanforderung war die Nachbildung der bestehenden Prozesse, die sorgfältig entwickelt und in den Arbeitsablauf des Geschäftsführers eingebettet waren. Über grundlegende Dateneingabe und Cloud-Speicherung in einer proprietären Datenbank hinaus musste die Software Kundensignaturen direkt auf Smartphones erfassen und als Datenbankbilder speichern.",
      "Als Entwickler bestand meine Herausforderung darin, eine Softwarelösung von Grund auf mit minimalem Wartungsaufwand zu erstellen. Da sie nur auf den Geschäftsführer und sein Team abzielte, implementierten wir ein sehr einfaches Benutzerverwaltungssystem. Cloud-Ressourcenerstellungsskripte und die anfänglichen Workflow-Implementierungen waren ebenfalls Teil des Projektumfangs."
    ]
  },
  "Unlocking the Potential of DIY IoT": {
    title: "Das Potenzial von DIY IoT erschließen",
    description: [
      "Eine leidenschaftliche Gruppe namens \"Open Tinkering\" taucht in die Welt der nächsten Generation Internet of Things (IoT) Hardware ein. Ihr Fokus liegt auf der Erstellung von Open-Source-Komponenten, die speziell für fortgeschrittene Nutzer entwickelt wurden. Das bedeutet vollständige Kontrolle - Nutzer können Funktionalitäten anpassen, benutzerdefinierte Firmware flashen und das Potenzial ihrer Kreationen wirklich erkunden.",
      "Angetrieben von Technologieliebe und dem Wunsch, Grenzen zu erweitern, ist Open Tinkering im Kern ein Hobbyprojekt. Die Teammitglieder widmen ihre Freizeit der Entwicklung von Tools, die die fortgeschrittene Nutzergemeinschaft befähigen, im sich ständig erweiternden Feld des IoT zu experimentieren und zu innovieren.",
      "Ob du ein erfahrener Entwickler bist oder einfach neugierig auf die Zukunft vernetzter Geräte - Open Tinkering heißt Mitarbeiter willkommen. Ihre Leidenschaft liegt in der Förderung einer Open-Source-Umgebung, die Erforschung ermutigt und die Grenzen dessen erweitert, was mit IoT-Hardware möglich ist.",
      "Im Mittelpunkt ihres aktuellen Projekts steht die Entwicklung ihres ersten Open-Source-IoT-Geräts. Ich bin der Gründer der Gruppe und aktiv an der Umsetzung dieser innovativen Hardware beteiligt. Das gesamte Projekt wird dokumentiert und offen geteilt, sodass die Community alle Details der Projekte erhalten, Ideen beitragen und bei der Entwicklung von etwas wirklich Freiem zusammenarbeiten kann."
    ]
  },
  "Development of the \"Minerva Micro\" mobile frontend": {
    title: "Entwicklung des \"Minerva Micro\" mobilen Frontends",
    description: [
      "Die Fabrikautomatisierungsabteilung von Siemens Digital Industries stellt ein Online-Portal bereit, wo Nutzer alle Arten von Dokumentation als PDFs herunterladen können. Sie stellen auch eine DVD mit der gesamten Dokumentation bereit, die mit ihren Produkten mitgeliefert wird.",
      "Anstatt nur eine Liste von Dateien zu haben, wollten sie eine interaktivere Art des Durchsuchens der Dokumentation bieten.",
      "Meine Aufgabe war es, eine kleine Anwendung zu entwickeln, die zu diesen DVDs hinzugefügt werden sollte. Sie musste ohne Installation laufen (unter der Annahme, dass der Nutzer bereits einen modernen Browser installiert hat) und so sicher wie möglich für den Nutzer sein. Die App sollte die Dokumentation in einer Baumstruktur anzeigen können, wo der Nutzer durch die Dateien und ihre Metadaten navigieren kann. Zusätzlich sollte der Nutzer nach Textinhalten der Dateien suchen können, also musste ich eine Offline-Volltextsuche hinzufügen, die auch die Entwicklung eines Prozesses zur Erstellung des Volltextindex beinhaltete, der mit der App ausgeliefert wird und von den PDFs abhängt."
    ]
  },
  "Addition of missing tests for an existing software product": {
    title: "Ergänzung fehlender Tests für ein bestehendes Softwareprodukt",
    description: [
      "Die FITS betreibt ein Portal, das ihren Mitarbeitern ermöglicht, alle ihre internen Konten für verschiedene Systeme zu verwalten. Dieses Portal ist über API mit der MFA-Infrastruktur verbunden, die Hardware-Token-Schlüsselanhänger verwendet.",
      "Da die Entwicklungsressourcen in diesem Projekt begrenzt waren, wurde ich angewiesen, das Testprojekt einzurichten und alle Testfälle für bestehende Features hinzuzufügen, damit die internen Entwickler weiter an ihren Aufgaben arbeiten und nur Tests für ihren neuen Code hinzufügen konnten.",
      "Der herausforderndste Teil des Projekts war es, einen Weg zu finden, wie die MFA-Token-Infrastruktur für die Integrationstests gemockt werden konnte."
    ]
  },
  "Development of the backend for a core service in the lightelligence portal": {
    title: "Entwicklung des Backends für einen Core-Service im Lightelligence-Portal",
    description: [
      "Osram entwickelte ein neues Cloud-Portal namens \"Lightelligence\". Die vom Portal bereitgestellten Services sind in drei Gruppen unterteilt. Die \"Core Services\" werden von allen genutzt und bieten die grundlegenden Funktionen für jeden Nutzer. Osram hatte eigene interne Scrum-Teams, die die Core Services erstellten. Die \"Domain Services\" sind die nächste Ebene von Features, die für jeden Nutzer nützlich, aber nicht obligatorisch sind. Nutzer können die Domain Services separat als Plugins für ihr Lightelligence-Konto buchen.",
      "Ich war einer der Entwickler des \"Building Central\" Domain Service Teams und meine Aufgabe war es, das Backend als RESTful API und eine GraphQL-Middleware bereitzustellen. Teil der Backend-Aufgabe war es, Datenbankmigration mit knex.js zu verwalten.",
      "Aufgrund von Fluktuation in unserem Frontend-Team schafften wir es, das Backend zu beenden, bevor das Frontend fertig war. Um unsere Meilensteine innerhalb des gegebenen Zeitrahmens zu erreichen, unterstützte ich das Frontend-Team durch das Beheben einiger Bugs im React-Code und das Schreiben einiger E2E-Tests mit Cypress."
    ]
  },
  "Consulting: modernization of the IoT portal architecture": {
    title: "Beratung: Modernisierung der IoT-Portal-Architektur",
    description: [
      "Telent GmbH verkauft Hardware-Geräte wie Sensoren für fast alles rund um \"Smart Buildings\". Sie bieten auch ein kostenpflichtiges Service-Portal, das die Informationen der Geräte in verschiedenen \"Apps\" bereitstellt. Da das Portal wuchs und absehbar war, dass die bestehende Architektur bald Engpässe bekommen würde, entschied Telent, große Teile ihrer Architektur zu überarbeiten. Für einen sauberen Neustart mit neuen Technologien stellten sie Berater wie mich ein, um zu helfen und zu lehren.",
      "Meine Aufgabe war es, bei der Refaktorierung oder dem Neuschreiben einiger Services zu helfen, um den Anforderungen an Skalierbarkeit zu entsprechen. Da das gesamte Versionskontrollkonzept geändert wurde und der neue Code in einem Mono-Repository gespeichert wurde, half ich auch bei der Refaktorierung der gesamten Build-Pipelines.",
      "Einige Teile der Services, die sehr oft ausgeführt werden und sehr isoliert sind, wurden als prädestiniert für serverlose Ausführung identifiziert. Da die gesamte Plattform auf Microsoft Azure gehostet wurde, entschieden wir uns, diesen Code zu Azure Functions zu migrieren. Ich wurde angewiesen, ein neues Azure Functions-Projekt zu erstellen, das durch einen HTTP POST-Request ausgelöst werden sollte. Danach war es auch meine Aufgabe, eine neue Pipeline zu erstellen, die das Azure Functions-Projekt deployen würde."
    ]
  },
  "Development of Node.Js microservices for smart factory": {
    title: "Entwicklung von Node.js Microservices für Smart Factory",
    description: [
      "Ich arbeitete in einem Team, das eine Reihe von Microservices und ein Angular 7 Frontend namens \"Smart Factory App\" entwickelte, die jetzt in der Fabrik in China läuft. Meine Aufgabe war es, eine Reihe von Node.js Microservices zu entwickeln, die RESTful APIs bereitstellen. Die Daten werden in einer MongoDB gespeichert und über eine zusätzliche Schicht zugegriffen, die wie eine leichtgewichtige Version von Eclipse Ditto ist.",
      "Ich dockerisierte die Services, deployete sie auf Kubernetes und stellte eine Beschreibung mit Swagger bereit. Für die Qualitätssicherung schrieb ich eine Reihe von Testfällen mit Chai und Mocha und verwendete auch Dredd, um die API automatisch gegen die Swagger-Beschreibung zu testen. Zusätzlich zu den Funktionstests verwenden wir statische Code-Analyse mit SonarQube.",
      "Für die Build-Automatisierung schrieb ich ein Skript für GitLab CI/CD, das Tests, Building und Deployment handhabt. Die SonarQube Quality Gates sind auch Teil der Testphase und können potenziell den Build zum Scheitern bringen.",
      "Später in diesem Projekt entschieden wir uns, keine RESTful APIs mehr zu verwenden, sondern stattdessen GraphQL zu nutzen, also erstellte ich zusätzlich eine Middleware, die die Daten aus den RESTful APIs über GraphQL bereitstellt."
    ]
  },
  "Development of a dotNet based knowledge portal": {
    title: "Entwicklung eines dotNet-basierten Wissensportals",
    description: [
      "T3 entwickelt zwei Softwareprodukte. Da ist der Knowledge Manager, eine intelligente Suchmaschine für modulare Informationsbits. Die Engine basiert auf Informationen, die gut strukturiert und gepflegt sind und viele Meta-Informationen enthalten. Das zweite Produkt ist der Learning Content Manager, ein AngularJS-Tool, das verwendet wird, um E-Learning-Inhalte für die Nutzer bereitzustellen.",
      "Meine Aufgabe war es, neue Features zu entwickeln und Performance und Qualität des bestehenden C# Knowledge Manager Codes zu verbessern. Ich unterstützte auch das Knowledge Manager Frontend-Team bei der Einführung von Unit- und E2E-Tests mit Jasmine, Karma und Selenium.",
      "Neben meinen Entwicklungsaufgaben war ich auch für die Verbesserung der Entwicklungsprozesse verantwortlich. Ich verlegte den Quellcode von SVN zu Git und GitLab, führte GitFlow ein und automatisierte den Build-Prozess."
    ]
  },
  "Development of a formular editor and library": {
    title: "Entwicklung eines Formular-Editors und einer Bibliothek",
    description: [
      "OMNINET GmbH entwickelt eine Geschäftsprozess-Software namens OMNITRACKER. Der OMNITRACKER ist sehr nah an einem objektorientierten Programmier-Framework, das zur Modellierung von Geschäftsprozessen verwendet werden kann. Das Backend ist in C++ geschrieben und das Frontend in C# und WPF.",
      "Für jeden Prozessschritt, der manuelle Eingaben erfordert oder Informationen für den Nutzer anzeigt, benötigt der OMNITRACKER ein Formular. Ein sehr einfaches Formular kann automatisch gerendert werden, aber es ist Teil der Aufgabe des Prozessdesigners, die erforderlichen Formulare bereitzustellen. Der Formular-Editor und die Formular-Bibliothek, die zum Rendern der Formulare verwendet wird, ist ein zentraler Teil der Lösung.",
      "Meine nächste Aufgabe war es, ein Konzept und einen Proof of Concept für eine neue Formular-Bibliothek basierend auf WPF bereitzustellen. Eine der Hauptfunktionen dieser neuen Bibliothek war, dass sie mit den Web-Formularen kompatibel sein sollte.",
      "OMNITRACKER bietet eine Scripting-Schnittstelle für VBScript, aber einige Kollegen aus der Anwendungsentwicklung wünschten sich etwas Moderneres, also schrieb ich einen Proof of Concept, der IronPython verwendet, um Scripting in Python zu ermöglichen."
    ]
  },
  "Sensor development": {
    title: "Sensor-Entwicklung",
    description: [
      "Die Paessler AG entwickelt eine Netzwerk-Monitoring-Lösung namens PRTG. Sie hat einen zentralen Server und eine oder mehrere Sonden, die Daten von den Zielsystemen sammeln. Auf jeder Sonde gibt es eine Baumstruktur, die Ordner enthält, die andere Ordner oder Geräte enthalten. Jedes Gerät kann eine Liste von Sensoren enthalten, die die tatsächlichen Messungen liefern.",
      "Paessler verkauft verschiedene Lizenzen für PRTG On-Premise-Installationen und bietet auch eine gehostete Version an, die als Service gebucht werden kann.",
      "Meine Aufgabe war es, neue Sensortypen zu erstellen und bestehende zu verbessern. Ein Sensortyp ist verantwortlich für das Erhalten von Messungen entweder von einem Hardware-Gerät oder von einem Service. Es gibt verschiedene Wege, Messungen zu erhalten. Die häufigsten Wege in PRTG sind SNMP, WMI oder Web-APIs. Bei der Entwicklung neuer Sensoren ist die Hauptaufgabe, zu lernen, wie man mit neuen Zielsystemen umgeht und zu entscheiden, welche Messungen überhaupt wert sind, gespeichert zu werden.",
      "In meiner Zeit bei Paessler habe ich mehr als 100 verschiedene Sensortypen geschrieben. Das Testen dieser Sensoren mit der Vielfalt verschiedener Zielsysteme ist nicht so einfach, also entwickelte ich einen Simulator, der Scan-Daten eines Systems importieren und sie verwenden konnte, um die SNMP- oder HTTP-Schnittstelle dieses Systems zu mocken. Wir konnten diesen Simulator auch als Ziel für unsere Testfälle verwenden."
    ]
  }
};

export const useProjects = () => {
  const { language } = useTranslation();
  
  const getTranslatedProjects = (): Project[] => {
    if (language === 'de') {
      return originalProjects.projects.map(project => {
        const translation = germanTranslations[project.title];
        if (translation) {
          return {
            ...project,
            ...translation
          };
        }
        return project;
      });
    }
    
    // Return original English projects
    return originalProjects.projects;
  };

  return {
    projects: getTranslatedProjects()
  };
};