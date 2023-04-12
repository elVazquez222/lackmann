(eher Notizen an mich selbst)

# Infrastruktur allgemein

## Mongodb / Mongoose

  => <https://cloud.mongodb.com/>

## Hostinger hosting plan

## Hostinger VPS plan für node Ausführung

  => Ubuntu
  
  => api.vazquez.website

## Hostinger Domain

  => vazquez.website

---

# API setup

auf <https://hpanel.hostinger.com/> die VPS infos für api.vazquez.com aufrufen.
> ssh root@[IP]

Node installieren wie [hier beschrieben](https://www.hostinger.com/tutorials/how-to-install-node-ubuntu?ppc_campaign=google_search_generic_hosting_all&bidkw=defaultkeyword&lo=9044073&gclid=Cj0KCQjwxMmhBhDJARIsANFGOSvRKEGDryO598A3ac6qcwdDu93NA05N4E38WIE7bLMB2tXdFLPKj-0aAmYVEALw_wcB)

git installieren
> apt install git

auf <https://github.com/settings/tokens> einen access token für den login erstellen

> git clone [repo]
>
> cd [repoName]/server
>
> npm install
>
.env anlegen
> sudo touch .env
>
> nano .env
>
und die entsprechenden Einträge machen für mongoose, port etc.

Die Bude starten
> npm run dev
>
Testen

**<http://[IP>]:[PORT]/orders** sollte die Bestellungen anzeigen

**nachtrag**

Statt nodemon lieber pm2 verwenden.
> npm i -g pm2
>
siehe "Backend"

# https setup

1. *Auf Hostinger => Domains => DNS / Nameserver* ein DNS record anlegen. bei **points to** die api IP Adresse eingeben. Name: Api
2. In die API Adresse ssh'n und caddyserver installieren <https://caddyserver.com/docs/install> (eventuell mit --allow-unauthenticated flag)
3. "vim /etc/caddy/Caddyfile", um caddy Konfiguration zu öffnen, dort
   1. api.vazquez.website {
        revers_proxy localhost:5000
      }
4. *caddy start --config /etc/caddy/Caddyfile*

Caddy sollte jetzt im Hintergrund laufen.
(apache lief standardmäßig un dhat ports blockiet. mit systemctl stop apache2 beendet)

> systemctl status caddy

Caddy manuell starten für TroubleShooting:
> sudo /usr/bin/caddy run --environ --config /etc/caddy/Caddyfile

Wenn alles geklappt hat ist die api über <https://api.vazquez.website/orders> erreichbar 🎉
>

# Backend

### starten
>
> npm run buid
>
> pm2 start build/index.js

### Backend checken
>
> pm2 list
>
Gibt den akteullen Status aus

# Frontend

lokal
> npm run build
>
Auf Hostinger unter Websites im File manager den Inhalt des dist Ordners nach public_html hochladen
