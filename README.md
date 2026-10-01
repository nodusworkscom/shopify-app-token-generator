# Shopify App Token Generator

> **Generate Shopify Admin API access tokens in seconds via OAuth 2.0.**
>
> A lightweight Node.js tool that runs a local server, walks you through Shopify's OAuth flow, and hands you the access token — ready to use with the Admin API.

Built and maintained by **[Nodusworks](https://nodusworks.com)** — Shopify experts & custom app developers.

---

## Table of Contents

- [English](#english)
  - [How It Works](#how-it-works)
  - [Prerequisites](#prerequisites)
  - [Step-by-Step Guide](#step-by-step-guide)
  - [FAQ](#faq)
- [Türkçe](#türkçe)
  - [Nasıl Çalışır](#nasıl-çalışır)
  - [Gereksinimler](#gereksinimler)
  - [Adım Adım Kurulum](#adım-adım-kurulum)
  - [SSS](#sss)
- [License](#license)

---

## English

### How It Works

```
Browser ──► localhost:3000 ──► Shopify OAuth consent screen
                                        │
                                   User approves
                                        │
              localhost:3000/callback ◄──┘
                      │
              Exchanges code for token
                      │
              ✅ Access token displayed
```

1. You start a local server.
2. It redirects you to Shopify's OAuth authorization page.
3. You approve the permissions.
4. Shopify redirects back with an authorization code.
5. The server exchanges the code for a **permanent access token**.
6. The token is displayed in your browser and terminal.

### Prerequisites

- **Node.js** v16 or higher — [download](https://nodejs.org)
- A **Shopify Partner account** — [partners.shopify.com](https://partners.shopify.com)
- A **Shopify store** (development or live) to install the app on

### Step-by-Step Guide

#### 1. Create a Shopify App in Partner Dashboard

1. Go to [partners.shopify.com](https://partners.shopify.com) → **Apps** → **Create app** → **Create app manually**
2. Give your app a name and click **Create**
3. In the app settings, note down:
   - **Client ID** (API key)
   - **Client secret**

#### 2. Configure the Callback URL

1. In your app's settings page, go to **App setup** → **URLs**
2. Set **App URL** to `http://localhost:3000`
3. Under **Allowed redirection URL(s)**, add:
   ```
   http://localhost:3000/callback
   ```
4. **Save** the changes

#### 3. Set Your OAuth Scopes

1. In the Partner Dashboard, go to your app → **API access** (or **Configuration**)
2. Add the scopes your app needs (e.g., `read_products`, `write_products`, `read_orders`)
3. Save

> **Full list of scopes:** [Shopify API access scopes documentation](https://shopify.dev/docs/api/usage/access-scopes)

#### 4. Clone and Configure This Tool

```bash
git clone https://github.com/nodusworkscom/shopify-app-token-generator.git
cd shopify-app-token-generator
npm install
```

Copy the example env file and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env`:

```env
SHOPIFY_API_KEY=your_client_id_here
SHOPIFY_API_SECRET=your_client_secret_here
SHOPIFY_SHOP=your-store.myshopify.com
SHOPIFY_SCOPES=read_products,write_products
```

> **Important:** The scopes in `.env` must match the scopes you configured in the Partner Dashboard (step 3).

#### 5. Run the Server

```bash
npm start
```

Open **http://localhost:3000** in your browser. You'll be redirected to Shopify's authorization screen.

#### 6. Approve & Get Your Token

1. Click **Install app** on the Shopify consent screen
2. You'll be redirected back — the **access token** will appear:
   - In your **browser** on the success page
   - In your **terminal** output
3. Copy the token and share it with your developer
4. Press `Ctrl+C` to stop the server

> **Note:** The access token is permanent (offline access) and does not expire unless the app is uninstalled.

### FAQ

**Q: I get "HMAC validation failed"**
A: Make sure your Client Secret in `.env` is correct and matches the app in your Partner Dashboard.

**Q: I get "invalid_request" from Shopify**
A: Verify that `http://localhost:3000/callback` is added as an Allowed Redirection URL in your app settings.

**Q: Can I use this for multiple stores?**
A: Yes! Just change `SHOPIFY_SHOP` in `.env` to a different store domain, install the app on that store, and run the server again.

---

## Türkçe

### Nasıl Çalışır

```
Tarayıcı ──► localhost:3000 ──► Shopify OAuth yetkilendirme sayfası
                                            │
                                      Kullanıcı onaylar
                                            │
                 localhost:3000/callback ◄───┘
                         │
                 Kodu token ile değiştirir
                         │
                 ✅ Access token ekranda görünür
```

1. Yerel bir sunucu başlatırsınız.
2. Shopify'ın OAuth yetkilendirme sayfasına yönlendirilirsiniz.
3. İzinleri onaylarsınız.
4. Shopify sizi geri yönlendirir ve bir yetkilendirme kodu gönderir.
5. Sunucu bu kodu **kalıcı bir access token** ile değiştirir.
6. Token hem tarayıcıda hem terminalde görünür.

### Gereksinimler

- **Node.js** v16 veya üzeri — [indir](https://nodejs.org)
- **Shopify Partner hesabı** — [partners.shopify.com](https://partners.shopify.com)
- Uygulamayı kuracağınız bir **Shopify mağazası** (geliştirme veya canlı)

### Adım Adım Kurulum

#### 1. Partner Dashboard'da Uygulama Oluşturun

1. [partners.shopify.com](https://partners.shopify.com) → **Apps** → **Create app** → **Create app manually**
2. Uygulamaya bir isim verin ve **Create** butonuna tıklayın
3. Uygulama ayarlarından şunları not edin:
   - **Client ID** (API anahtarı)
   - **Client secret** (gizli anahtar)

#### 2. Callback URL'i Ayarlayın

1. Uygulama ayarlarında **App setup** → **URLs** bölümüne gidin
2. **App URL** alanına `http://localhost:3000` yazın
3. **Allowed redirection URL(s)** kısmına şunu ekleyin:
   ```
   http://localhost:3000/callback
   ```
4. **Kaydedin**

#### 3. OAuth Scope'larını Belirleyin

1. Partner Dashboard'da uygulamanıza gidin → **API access** (veya **Configuration**)
2. İhtiyacınız olan scope'ları ekleyin (ör: `read_products`, `write_products`, `read_orders`)
3. Kaydedin

> **Tüm scope listesi:** [Shopify API erişim kapsamları dokümantasyonu](https://shopify.dev/docs/api/usage/access-scopes)

#### 4. Bu Aracı Klonlayın ve Yapılandırın

```bash
git clone https://github.com/nodusworkscom/shopify-app-token-generator.git
cd shopify-app-token-generator
npm install
```

Örnek env dosyasını kopyalayın ve bilgilerinizi girin:

```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin:

```env
SHOPIFY_API_KEY=client_id_buraya
SHOPIFY_API_SECRET=client_secret_buraya
SHOPIFY_SHOP=magazaniz.myshopify.com
SHOPIFY_SCOPES=read_products,write_products
```

> **Önemli:** `.env` dosyasındaki scope'lar, Partner Dashboard'da (3. adım) ayarladığınız scope'larla aynı olmalıdır.

#### 5. Sunucuyu Başlatın

```bash
npm start
```

Tarayıcınızda **http://localhost:3000** adresini açın. Shopify'ın yetkilendirme ekranına yönlendirileceksiniz.

#### 6. Onaylayın ve Token'ınızı Alın

1. Shopify onay ekranında **Install app** butonuna tıklayın
2. Geri yönlendirileceksiniz — **access token** görünecek:
   - **Tarayıcıda** başarı sayfasında
   - **Terminalde** çıktı olarak
3. Token'ı kopyalayın ve geliştiriciye iletin
4. Sunucuyu durdurmak için `Ctrl+C` tuşlayın

> **Not:** Access token kalıcıdır (offline access) ve uygulama mağazadan kaldırılmadığı sürece süresi dolmaz.

### SSS

**S: "HMAC validation failed" hatası alıyorum**
C: `.env` dosyasındaki Client Secret'ınızın Partner Dashboard'daki uygulama ile eşleştiğinden emin olun.

**S: Shopify'dan "invalid_request" hatası alıyorum**
C: Uygulama ayarlarınızda `http://localhost:3000/callback` adresinin izin verilen yönlendirme URL'lerine eklendiğini doğrulayın.

**S: Birden fazla mağaza için kullanabilir miyim?**
C: Evet! `.env` dosyasında `SHOPIFY_SHOP` değerini farklı bir mağaza alan adıyla değiştirin, uygulamayı o mağazaya kurun ve sunucuyu tekrar başlatın.

---

## License

MIT — see [LICENSE](LICENSE) for details.

Built with ❤️ by **[Nodusworks](https://nodusworks.com)** — Shopify development, custom apps & integrations.
