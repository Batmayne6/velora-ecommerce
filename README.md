🥂 VELORA | Luxury E-Commerce
Velora is a high-fidelity, minimalist e-commerce platform designed with a focus on luxury fashion and premium user experience. Built with Next.js 15 and Tailwind CSS, it features a fully functional dynamic cart system, category filtering, and a state-based single-page navigation architecture.

✨ Features
Dynamic Product Catalog: An expanded inventory across Men, Women, and Accessories categories.

Intelligent Filtering: A "Collections" gateway that filters the store view based on user selection.

Interactive Cart System:

Real-time quantity adjustments.

Size and color state persistence.

Live subtotal and total calculations.

Editorial UI/UX:

Responsive hero sections with high-resolution imagery.

Smooth transitions and hover effects on all interactive elements.

Custom-styled scroll behavior and sticky navigation.

Single Page Application (SPA) Flow: State-managed routing for a seamless, "no-refresh" browsing experience.

🛠️ Tech Stack
Framework: Next.js 15 (App Router)

Styling: Tailwind CSS

Icons: Lucide React

Language: JavaScript / React

🚀 Getting Started
Prerequisites
Ensure you have Node.js installed on your machine.

Installation
Clone the repository:

Bash
git clone https://github.com/your-username/velora-ecommerce.git
cd velora-ecommerce
Install dependencies:

Bash
npm install
Run the development server:

Bash
npm run dev
Open the site:
Navigate to http://localhost:3000 to view the application in your browser.

📁 Project Structure
Plaintext
/app
  ├── page.tsx          # Main entry point (Client Component)
  ├── layout.tsx        # Global fonts and metadata
  └── globals.css       # Tailwind directives and custom CSS
/public                 # Static assets (logos, fallback images)
🎨 Design System
Primary Palette:

Velora Gold: #C5A373

Onyx Black: #1A1A1A

Soft Alabaster: #FAFAFA

Typography:

Headings: Serif (Editorial style)

Body: Sans-serif (Clean, readable)

📸 Component Breakdown
HomePage: Editorial hero and shop-by-category grid.

CollectionsPage: High-level overview of available style lines.

ShopPage: Dynamic grid with real-time category filtering.

ProductDetailPage: Deep-dive view with interactive variant selection.

CartPage: Full order management with quantity controls.

📝 Roadmap
[ ] Integrate a Headless CMS (like Sanity or Contentful) for dynamic product management.

[ ] Implement a real-world payment gateway (Stripe/PayPal).

[ ] Add User Authentication (NextAuth.js).

[ ] Implement Persistent Storage (LocalStorage or Database) for the cart.

👤 Author
Fleming Tembo Web Developer based in Zambia GitHub | Portfolio
