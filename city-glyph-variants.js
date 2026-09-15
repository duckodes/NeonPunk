/* Give generated city routes distinct node emblems instead of the shared fallback glyph. */
(() => {
	const generatedGlyphs = [
		'<path d="M0-18 15-9v18L0 18-15 9V-9Z"/><path d="M0-11v22M-10-5l20 10M10-5-10 5"/>',
		'<path d="M0-20 5-5 20 0 5 5 0 20-5 5-20 0-5-5Z"/><circle r="4"/>',
		'<path d="M-15 16 0-18 15 16Z"/><path d="M-8 8h16M-5 1h10M0-18v34"/>',
		'<circle r="15"/><path d="M0-15v30M-15 0h30M-11-11l22 22M11-11-11 11"/>',
		'<path d="M-17-10 0-19 17-10v20L0 19-17 10Z"/><path d="M-17-10 0 0l17-10M0 0v19"/>',
		'<path d="M-16 12 0-16 16 12Z"/><path d="M-10 12h20M-5 3h10M0-16v29"/>'
	];

	function paintGeneratedGlyphs() {
		document.querySelectorAll('.redesigned-city-node[data-city^="sector-"] .redesigned-city-icon svg').forEach(svg => {
			const serial = Number(svg.closest('[data-city]')?.dataset.city.match(/^sector-(\d+)$/)?.[1] || 1);
			const variant = (serial - 1) % generatedGlyphs.length;
			if (svg.dataset.glyphVariant === String(variant)) return;
			svg.innerHTML = generatedGlyphs[variant];
			svg.dataset.glyphVariant = String(variant);
		});
	}

	paintGeneratedGlyphs();
	new MutationObserver(paintGeneratedGlyphs).observe(document.body, { childList: true, subtree: true });
})();
