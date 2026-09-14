# NeonPunk Data Catalogs

Edit the JSON files in this folder to add content without changing `app.js`.

- `combat-actions.json`: combat actions. Use `title`/`hint`/`desc` for Traditional Chinese, `titleEn`/`hintEn`/`descEn` for English, and `category` (`offense`, `control`, `defense`, `support`, or `utility`) to keep the catalog organized. Use `price` for black-market actions and `cost` for Energy cost.
- `chips.json`: installable hardware upgrades. `id` must match upgrade logic in `app.js` when the chip changes a stat or action.
- `skills.json`: passive neural skills sold by the market.
- `equipment.json`: equipment grouped by `slot` (`DECK`, `WEAPON`, `COAT`).
- Equipment with `starter: true` is granted once at the start, while other gear uses `price` and `sellPrice` in the black-market trading system.
- `items.json`: market items and usable drink items. Set `usable: true` for inventory-only rewards.

The app loads these files at startup and keeps built-in fallback data if a file cannot be fetched.
