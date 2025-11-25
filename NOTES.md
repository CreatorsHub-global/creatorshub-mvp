# CreatorsHub MVP — session 2025-10-22

## Prod
- URL: https://creatorshub-mvp.vercel.app
- Health: /api/health → stripe=true, resend=true, site=https://creatorshub-mvp.vercel.app

## Environment (Vercel → Production)
- NEXT_PUBLIC_SITE_URL = https://creatorshub-mvp.vercel.app
- RESEND_API_KEY = re_… (prod)
- STRIPE_SECRET_KEY = sk_test_… (sandbox)
- EMAIL_FROM = CreatorsHub <onboarding@resend.dev>

## Funktioner som funkar
- Checkout via Stripe (testkort 4242 4242 4242 4242)
- Magic link via Resend (/api/magiclink) + kvitto-mail på /unlock
- /unlock visar 3 bilder + ZIP + ”Till startsidan”
- Mailto-knapp i Hero (james@creatorshub.global)
- Copy: CreatorPass → CollectorPass

## Lokal dev
- Starta: npm run dev  → http://localhost:3000
- Test:
  - POST /api/magiclink  {"email":"din@adress.se"}
  - GET  /api/health

## Nästa steg (rekommenderat)
1) Koppla domän (låst): www.creatorshub.global
2) Verifiera avsändardomän i Resend (DKIM)
3) Terms & Privacy-länkar
4) (Sen) Stripe live + webhook
