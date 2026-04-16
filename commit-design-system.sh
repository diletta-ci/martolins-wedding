#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Run this once from the repo root on your machine to commit the design-system
# changes that Claude prepared. It assumes you are already on (or will checkout)
# the feature/design-system branch.
#
# Usage:
#   cd path/to/martolins-wedding
#   git checkout feature/design-system   # already exists from Claude's session
#   bash commit-design-system.sh
#   git push -u origin feature/design-system
# ─────────────────────────────────────────────────────────────────────────────
set -e

# Clear any stale lock files left by the Cowork sandbox
rm -f .git/HEAD.lock .git/index.lock

# ── Commit 1 ─────────────────────────────────────────────────────────────────
git add index.html
git commit -m "feat: update index.html with Italian locale, Google Fonts, and meta

Load Great Vibes (calligraphy), Cormorant Garamond (serif heading), and
Inter (body) from Google Fonts to match the invitation's visual identity.
Set lang=\"it\", update page title and add meta description.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"

# ── Commit 2 ─────────────────────────────────────────────────────────────────
git add src/assets/base.css
git commit -m "feat: rewrite base.css with wedding design tokens

Replace Vue boilerplate variables with a wedding-specific token set:
periwinkle brand palette from the invitation, surface/ink colors, font
stack (Great Vibes, Cormorant Garamond, Inter), and spacing rhythm.
Remove dark-mode overrides — not applicable for a wedding site.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"

# ── Commit 3 ─────────────────────────────────────────────────────────────────
git add src/assets/main.css
git commit -m "feat: rewrite main.css with Tailwind @theme and clean app layout

Add @theme block exposing all wedding tokens as Tailwind utility classes
(bg-brand, text-ink, font-display, etc). Remove Vue scaffold defaults:
green link colours, 2-column desktop grid, and centred body flex. App
shell is now a simple full-height flex column.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"

# ── Commit 4 ─────────────────────────────────────────────────────────────────
git add src/components/AppNav.vue src/App.vue
git commit -m "feat: add AppNav component and simplify App.vue

AppNav replaces the inline scaffold nav with a sticky white bar using
wedding brand tokens: Great Vibes wordmark, Cormorant Garamond small-caps
links, periwinkle active states. Includes a mobile hamburger drawer that
hides at sm breakpoint. App.vue reduced to AppNav + RouterView.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"

# ── Commit 5 ─────────────────────────────────────────────────────────────────
git add src/components/LaceDivider.vue
git commit -m "feat: add LaceDivider component

SVG scallop divider inspired by the invitation's lace border motif.
Accepts a \`flip\` prop (scallops pointing down) and a \`color\` override.
Stretches full-width via preserveAspectRatio=\"none\" at a fixed 24px
height. Use between page sections to echo the invitation's visual
rhythm.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"

echo ""
echo "✓ All 5 commits created. Run: git push -u origin feature/design-system"
