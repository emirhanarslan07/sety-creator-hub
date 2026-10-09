<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Sety architecture
- Use TanStack leaf routes for the landing page, parameterized storefront, and seven management tabs so navigation stays native to the existing stack.
- Keep auth and management changes as explicitly labeled, in-memory design previews; this redesign does not connect credentials, payments, or persistent storage.
- Preserve imported original hero SVGs and positions and the original StickyCTA scroll listener; presentation changes must not alter its trigger logic.
- Define visual roles in global semantic tokens and share the SetyLogo across all screens to maintain brand consistency.
