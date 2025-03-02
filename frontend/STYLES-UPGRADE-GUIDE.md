# Tailwind CSS v4 Upgrade Guide

This README summarizes the key changes and upgrade steps for migrating from Tailwind CSS v3 to v4.

## Quick Start

The easiest way to upgrade is using the official upgrade tool:

```bash
npx @tailwindcss/upgrade
```

This tool requires Node.js 20 or higher and will:
- Update your dependencies
- Migrate your configuration to CSS
- Handle most template file changes

It's recommended to:
1. Run the upgrade in a new branch
2. Review the changes carefully
3. Test in browser before merging

## Major Changes in v4

### 1. New Package Structure

- The PostCSS plugin is now in `@tailwindcss/postcss`
- CLI moved to `@tailwindcss/cli`
- Vite users should use the dedicated `@tailwindcss/vite` plugin

```js
// postcss.config.mjs (v4)
export default {
  plugins: {
    "@tailwindcss/postcss": {},
    // No need for postcss-import or autoprefixer anymore
  },
};

// vite.config.ts (v4)
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss()],
});
```

### 2. Import Syntax Changes

From v3 directives:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

To v4 import:
```css
@import "tailwindcss";
```

### 3. Renamed Utilities

| v3 | v4 |
|---|---|
| shadow-sm | shadow-xs |
| shadow | shadow-sm |
| drop-shadow-sm | drop-shadow-xs |
| drop-shadow | drop-shadow-sm |
| blur-sm | blur-xs |
| blur | blur-sm |
| backdrop-blur-sm | backdrop-blur-xs |
| backdrop-blur | backdrop-blur-sm |
| rounded-sm | rounded-xs |
| rounded | rounded-sm |
| outline-none | outline-hidden |
| ring | ring-3 |

### 4. CSS Variable Syntax

Old:
```html
<div class="bg-[var(--brand-color)]"></div>
```

New:
```html
<div class="bg-(--brand-color)"></div>
```

### 5. Custom Utilities

From v3's `@layer utilities`:
```css
@layer utilities {
  .tab-4 {
    tab-size: 4;
  }
}
```

To v4's `@utility`:
```css
@utility tab-4 {
  tab-size: 4;
}
```

### 6. Border Colors

v4 uses `currentColor` as the default border color instead of gray-200. Either:

- Explicitly add color classes: `border border-gray-200`
- Add compatibility layer:
```css
@layer base {
  *,
  ::after,
  ::before,
  ::backdrop,
  ::file-selector-button {
    border-color: var(--color-gray-200, currentColor);
  }
}
```

### 7. Ring Width and Color

- Default ring width changed from 3px to 1px
- Default color changed from blue-500 to currentColor
- Use `ring-3 ring-blue-500` to match v3 behavior

### 8. Variant Stacking Order

Order changed from right-to-left to left-to-right:

```html
<!-- v3 -->
<ul class="py-4 first:*:pt-0 last:*:pb-0">

<!-- v4 -->
<ul class="py-4 *:first:pt-0 *:last:pb-0">
```

### 9. Theme Configuration

Use CSS variables in your theme:

```css
@theme {
  --font-display: "Satoshi", "sans-serif";
  --breakpoint-3xl: 120rem;
  --color-avocado-100: oklch(0.99 0 0);
}
```

### 10. Using with CSS Modules/Vue/Svelte

Use `@reference` to import definitions without duplicating CSS:

```vue
<style>
  @reference "../../app.css";
  h1 {
    @apply text-2xl font-bold text-red-500;
  }
</style>
```

Or use CSS variables directly:

```vue
<style>
  h1 {
    color: var(--text-red-500);
  }
</style>
```

## Common Pitfalls

1. **Hover on mobile**: Hover now only applies when the device supports hover
2. **Space between utilities**: The selector has changed, potentially causing layout issues
3. **Gradient variants**: Variants now preserve other gradient values
4. **Outline transitions**: `transition` now includes `outline-color`
5. **Prefixes**: Now appear at the beginning like variants: `tw:flex tw:bg-red-500`

## Legacy Support

JavaScript config files are still supported but must be loaded explicitly:

```css
@config "../../tailwind.config.js";
```

Note that `corePlugins`, `safelist`, and `separator` options are not supported in v4.

## Additional Resources

For more detailed information on migrating to Tailwind CSS v4, visit the [official documentation](https://tailwindcss.com/docs/upgrade-guide).