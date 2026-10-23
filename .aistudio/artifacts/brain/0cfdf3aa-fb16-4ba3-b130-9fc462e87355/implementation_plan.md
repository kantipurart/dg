# Dream Garden Resort (Chapali Bhangal, Budhanilkantha) — Visual & Local Overhaul

Overhaul the Dream Garden Resort website into a photo-led, locally welcoming destination tailored for Kathmandu and Budhanilkantha visitors, stripping out wordy paragraphs and highlighting real offerings from the resort's Facebook and Google Maps pages.

### User Review & Critical Decisions

> [!IMPORTANT]
> The overhaul incorporates your confirmed preferences from our clarification step and grounds every section in Dream Garden Resort's Chapali Bhangal (Budhanilkantha) Google Maps and Facebook listings.

- **Confirmed Decision 1 — Local Kathmandu Voice & Bilingual Titles**: Replace formal, verbose hospitality essays with short, punchy headings combining natural everyday English and familiar Nepali/Devanagari phrases (e.g., *"हरियाली बगैंचा र मिठो खाना · Garden Huts & Family Dining in Chapali Bhangal"*, *"Mustang Mo:Mo, Sekuwa & Thakali Khana"*, *"Staycation & Birthday Packages"*).
- **Confirmed Decision 2 — Visual-First Layout with Minimal Text**: Eliminate long multi-paragraph descriptions and technical verification disclaimers. Lead every section with large, high-impact visual frames, 1-line captions, and clear NPR price tags.
- **Confirmed Decision 3 — Facebook & Google Maps Highlights Front-and-Center**:
  - **Garden Huts, Photo Spots & Family Lawn**: Dedicated visual cards for Gazebo Huts, Swing/Photo Spots, Outdoor Lawn, and Indoor Hall.
  - **Local Crowd Favorites**: Visual spotlight on *Mustang Mo:Mo Platter*, *Chicken & Mutton Sekuwa*, *Nepali Khana Set*, *Chicken/Duck Chhoila*, *Chicken Sizzler*, and *Special Lassi*.
  - **Staycation Rooms & Birthday Packages (from Facebook)**: Feature the *Weekend Staycation Package (from NPR 2,500 with Welcome Drink, Dinner & Breakfast)*, named cottages/rooms (*Fewa Cottage — NPR 2,000*, *Rara Standard — NPR 3,000*, *Makalu Deluxe — NPR 3,500*, *Sagarmatha Family Room — NPR 4,500*), and the *Birthday Celebration Package (NPR 2,000/person with 1-lb Cake)*.
  - **Direct Call & Chapali Bhangal Map**: Instant click-to-call (`981-5321221`), Facebook & Google Maps links, and quick booking/package inquiry.

---

### 1. Overview & Core Concept

- **What It Does**: Delivers a fast, image-driven hospitality website for **Dream Garden Resort (ड्रीम गार्डेन रिसोर्ट — चपली भंगाल, बूढानीलकण्ठ)** where local families, friend groups, and weekend visitors can browse photos of the garden huts, check NPR prices for Khaja, Khana, Staycations, and Birthday packages, and call or get directions in one tap.
- **Target Audience / Persona**: Local families, youth groups, and couples from Kathmandu Valley looking for a peaceful green hangout spot in Bhangal / Chapali for Saturday lunches, Mustang Mo:Mo & Sekuwa platters, birthday celebrations, or an overnight staycation.
- **Key Value**: Cuts out unnecessary reading and immediately shows what guests care about—how the garden looks, what the popular dishes and room packages cost in NPR, and how to reach Chapali Bhangal.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Home & Local Highlights Flow**: Visitor lands on a full-bleed Chapali Bhangal garden hero -> scans 4 big visual cards (*Garden Gazebo Huts*, *Mustang Mo:Mo & Sekuwa*, *Staycation @ NPR 2,500*, *Birthday & Party Lawn*) -> taps any dish or package to add to their quick inquiry or calls `981-5321221` directly.
  2. **Visual Menu & Khaja/Khana Browser**: Visitor switches between visual tabs (*Local Favorites 🔥*, *Khaja & Sekuwa*, *Khana Sets*, *Tandoori & Sizzlers*, *Pizza, Burgers & Pasta*, *Coffee, Lassi & Bar*) -> views clean dish cards with 1-line descriptions and bold `NPR` prices.
  3. **Staycation & Party Packages Flow**: Visitor views room options (*Fewa Cottage*, *Rara Standard*, *Makalu Deluxe*, *Sagarmatha Family Room*) and the *NPR 2,500 Staycation / NPR 2,000 Birthday Package* -> clicks *"Book This Package"* to pre-fill the inquiry form on the Contact view.
  4. **Photo Gallery & Live Photo Sync**: Visitor browses big masonry frames from Google Maps & Facebook categories (*Garden & Huts*, *Photo Spots & Swing*, *Food & Platter*, *Rooms & Cottages*, *Night Lights & Parties*) with fullscreen lightbox inspection and an easy photo URL paste tool for the owner.
- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Warm, vibrant Kathmandu garden resort aesthetic—sunlit greenery, warm timber gazebos, brass thali plates, and festive evening string lights, with zero clutter.
  - *Color Palette & Mood*:
    - Dominant Canvas (`60%`): Warm Alabaster (`#FAF8F5`) and Soft Sand (`#F3EFE6`).
    - Structural Surfaces (`30%`): Deep Pine Charcoal (`#142019`) for high-contrast photo showcases and crisp card borders (`#DED8CE`).
    - Accent Budget (`10%`): Lush Bhangal Green (`#1B4D3E`) for primary actions and Marigold/Brass (`#D49B35`) for Nepali headers and package highlights.
  - *Typography & Hierarchy*:
    - Display & Nepali Headers: `Cormorant Garamond` paired with `Noto Serif Devanagari` for expressive bilingual titles.
    - Body & UI Controls: `Plus Jakarta Sans` + `Mukta` for clean, scannable 1-line labels.
    - Prices & Numbers: `JetBrains Mono` (`tabular-nums`) for all `NPR` prices and phone numbers.
  - *Component Styling & Layout*:
    - Strict 3-zone top navigation bar (`Dream Garden Resort` — `Home`, `Menu`, `Staycation & Packages`, `Photos`, `Location & Book` — `Call 981-5321221`).
    - Media-first Bento and 2/3-column photo grids where imagery occupies 70%+ of each card and text is capped at a title + 1 short line.
- **Interactive Feedback & Motion**:
  - Instant tab switching (`<= 150ms`), smooth image hover zoom (`scale-[1.02]`), one-click package pre-selection into the booking form, and a fullscreen keyboard-accessible photo lightbox.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Replace "Our Story" Text Page with "Staycation & Packages" Visual Page**
  - *Chosen Approach*: Consolidate the narrative into a punchy visual section on Home and dedicate a top-level view to **Staycation & Packages** (*Rooms, Cottages, NPR 2,500 Staycation Deal, and Birthday Party Packages* promoted on Facebook).
  - *Why*: Local Kathmandu visitors browsing Dream Garden Resort on Facebook and Google Maps actively look for staycation rates, cottage prices, and birthday packages rather than long essays.
  - *Alternatives Considered*: Keeping a separate text-heavy "Our Story" page, which adds unnecessary reading that the user asked to remove.
- **Decision 2: High-Resolution Photo Rendering & Direct Facebook/Maps Photo Manager**
  - *Chosen Approach*: Provide rich, realistic visual compositions tailored to Chapali Bhangal's real features (Mustang Mo:Mo platter, Gazebo Huts, Fewa Cottage, Garden Swing photo spot, Thakali Khana, Evening Party Lawn) paired with a 1-click **"Import from Facebook / Google Maps"** modal so the owner can paste any image link from their Facebook page or Google Maps listing.
  - *Why*: Guarantees zero broken images out of the box while letting the owner drop in new Facebook event photos anytime.

---

### 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:

```
┌───────────────────────────────────────────────────────────────────────────┐
│                     Application State & Local Storage                     │
│  ┌─────────────────────┐  ┌──────────────────────┐  ┌──────────────────┐  │
│  │ Resort & FB Package │  │ 17-Category Complete │  │ Photo Assets &   │  │
│  │ Config (Bhangal)    │  │ Menu + Local Hits    │  │ Custom Overrides │  │
│  └──────────┬──────────┘  └──────────┬───────────┘  └────────┬─────────┘  │
└─────────────┼────────────────────────┼───────────────────────┼────────────┘
              │                        │                       │
              ▼                        ▼                       ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                   3-Zone Top Bar (Navbar) & Quick Call CTA                │
├─────────────────┬────────────────────┬──────────────────┬─────────────────┤
│   Home View     │    Menu View       │  Staycation &    │  Photos &       │
│  (Visual-First  │  (Local Favorites  │  Packages View   │  Location Views │
│   Bhangal Hero, │   Spotlight,       │  (NPR 2,500 Deal,│  (Masonry Grid, │
│   Huts, Hits &  │   Category Filter, │   4 Room Types,  │   Lightbox, Map │
│   FB Packages)  │   Quick Order Box) │   Birthday Pack) │   & Quick Book) │
└────────┬────────┴─────────┬──────────┴────────┬─────────┴────────┬────────┘
         │                  │                   │                  │
         └──────────────────┴─────────┬─────────┴──────────────────┘
                                      ▼
                    ┌───────────────────────────────────┐
                    │ Shared Interactive Modals & Trays │
                    │ · Fullscreen Photo Lightbox       │
                    │ · Dish & Package Inquiry Tray     │
                    │ · Facebook/Maps Photo Importer    │
                    └───────────────────────────────────┘
```

- **Data Model & State**:
  - **Resort & Package Store**: Holds verified Chapali Bhangal, Budhanilkantha location data, Google Maps (`4.1★ · 378 reviews`) and Facebook (`84% recommended`) metrics, the 4 room tiers (*Fewa Cottage*, *Rara Standard*, *Makalu Deluxe*, *Sagarmatha Family Room*), the *NPR 2,500 Staycation Package*, and the *NPR 2,000 Birthday Package*.
  - **Menu & Shortlist Store**: Preserves all 17 menu categories and exact NPR prices while elevating local bestsellers (*Mustang Mo:Mo*, *Chicken Sekuwa*, *Chicken Khana Set*, *Duck/Chicken Chhoila*, *Paneer Tikka*, *Chicken Sizzler*, *Special Lassi*) with concise 1-line descriptions.
- **Interactive Component & State Mapping**:
  - Clicking **"Select Package"** on any Staycation or Birthday card navigates to the Location & Book view with that package pre-selected in the form.
  - Clicking **"Add"** on any dish updates the floating/sidebar Inquiry Tray and calculates the running NPR total.
  - Submitting the booking/inquiry form validates Name, Phone, Date, and Guests, producing a copyable summary ready for phone confirmation at `981-5321221`.
