# Technical Approach Document

## 1. Problem-Solving Approach: Image Overlay Logic

The core feature of the Greetings App is the ability to generate a personalized greeting card by overlaying the user's name, profile picture, and a quote onto a template background, and then allowing the user to download it as a single high-resolution image. 

This was implemented using a combination of **CSS positioning** and **Client-Side DOM-to-Image rendering**:

1. **Visual Composition (CSS Positioning):**
   - The `GreetingCard` component acts as the visual container. It uses a relative positioning wrapper (`relative`).
   - The background template image is rendered to fill the container using Next.js `<Image fill />`.
   - The user's profile picture, name badge, and quotes are layered on top using `absolute` positioning with precise `top`, `left`, `right`, and `bottom` coordinates.
   - To ensure the text is legible regardless of the background image's brightness, semi-transparent black gradients (`bg-gradient-to-b` and `bg-gradient-to-t`) are placed at the top and bottom of the card.

2. **Image Generation (DOM to Image):**
   - To convert this HTML/CSS composition into a downloadable PNG, we utilize the `dom-to-image` library on the client side (`app/preview/[id]/page.tsx`). 
   - A `useRef` is attached to the `GreetingCard` container. When the user clicks "Download", `domtoimage.toPng(cardRef.current)` processes the DOM node, draws it onto an internal HTML5 Canvas, and outputs a base64 PNG data URL.
   - The data URL is then programmatically attached to an `<a>` tag with a `download` attribute to trigger the file save in the browser.

---

## 2. Tech Stack

The application is built using a modern React ecosystem:

* **Framework:** Next.js 16 (App Router) - Provides the routing, server-side rendering capabilities, and optimized image delivery.
* **UI Library:** React 19 - For building the interactive user interface.
* **Language:** TypeScript - Ensures type safety across components and state.
* **Styling:** Tailwind CSS 4 & shadcn/ui - For rapid, utility-first UI development and accessible component primitives.
* **State Management:** Zustand - A lightweight, unopinionated state manager used for tracking user authentication state (`useUserStore`).
* **Image Rendering:** `dom-to-image` - A third-party library to convert DOM nodes into vector or raster images.
* **Animations:** Framer Motion & Lenis - For smooth scrolling and fluid micro-interactions (e.g., page transitions, hover states).
* **Backend Services:** 
  * **Firebase:** Used for user authentication (Google Provider).
  * **Razorpay:** Integrated for handling secure payments to unlock premium templates.

---

## 3. Challenges & Solutions

### Challenge 1: Cross-Origin Resource Sharing (CORS) during Canvas Export
When `dom-to-image` attempts to draw external images (like a user's Google profile picture) onto a canvas, the browser's security policies taint the canvas, preventing the image from being exported.
* **Solution:** Before rendering the `GreetingCard` for preview, the external profile picture is fetched via a client-side API call and converted into a local Base64 string (`convertToBase64` function). The Base64 string is then passed to the `<Image />` component. Since the image data is now local to the document, the canvas is no longer tainted, and the export succeeds.

### Challenge 2: Incomplete Asset Loading
If the user clicks "Download" before the custom fonts or the template background image have completely loaded, the generated PNG will have missing text styles or a blank background.
* **Solution:** Implemented a `waitForAssets()` utility function that pauses the generation process until `document.fonts.ready` resolves and all `<img>` elements in the DOM report `img.complete = true`.

---

## 4. Future Improvements (Scalability Considerations)

As the application scales, the client-side rendering approach will face limitations regarding performance and consistency across different devices (e.g., mobile browsers with strict memory limits). 

**Future Scalability Improvements:**
1. **Server-Side Image Generation:** Migrate the image generation logic to the backend using tools like **Vercel Satori** (which generates SVG from React/HTML) or headless browsers like **Puppeteer/Playwright**. This offloads the heavy processing from the user's device and ensures 100% consistent rendering regardless of the client's browser engine.
2. **CDN Caching:** If users generate cards that are meant to be shared via URLs (e.g., `greetingsapp.com/share/123`), the generated images should be uploaded to an AWS S3 bucket or Firebase Storage, and served through a CDN to handle high traffic spikes seamlessly.
3. **Advanced Customization:** Introduce a Canvas-based editor (like Fabric.js) instead of static DOM positioning. This would allow users to drag, drop, resize, and change the colors of the text and elements before exporting.
4. **Asset Optimization:** Implement lazy loading and aggressive caching for the high-resolution template background images to reduce bandwidth costs and improve Time-To-Interactive (TTI).
