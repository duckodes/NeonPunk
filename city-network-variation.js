/* Add gentle per-city node variation and a variable-sized discovery batch. */
(() => {
	const clampPercent = value => Math.max(8, Math.min(92, value));

	function hash(value) {
		return [...value].reduce((total, character) => (total * 31 + character.charCodeAt(0)) % 997, 17);
	}

	function varyNodePositions() {
		document.querySelectorAll('.redesigned-city-frame').forEach(frame => {
			const activeCity = frame.dataset.city || 'glass';
			const signature = `${activeCity}:${[...frame.querySelectorAll('.redesigned-city-node')].map(node => node.dataset.city).join(',')}`;
			if (frame.dataset.layoutVariation === signature) return;
			frame.querySelectorAll('.redesigned-city-node').forEach(node => {
				const seed = hash(`${activeCity}:${node.dataset.city}`);
				const left = Number.parseFloat(node.style.left) || 50;
				const top = Number.parseFloat(node.style.top) || 50;
				const horizontal = ((seed % 9) - 4) * .55;
				const vertical = ((Math.floor(seed / 9) % 9) - 4) * .55;
				node.style.left = `${clampPercent(left + horizontal)}%`;
				node.style.top = `${clampPercent(top + vertical)}%`;
			});
			frame.dataset.layoutVariation = signature;
		});
	}

	function varyDiscoveryBatch() {
		document.addEventListener('click', event => {
			if (!event.target.closest('[data-discover-city]')) return;
			setTimeout(() => {
				const count = Math.max(0, Number(localStorage.getItem('neonpunk-city-network-count')) || 0);
				const extra = 1 + Math.floor(Math.random() * 3);
				const nextCount = count + extra;
				const saved = JSON.parse(localStorage.getItem('neonpunk-save') || '{}');
				const currentPool = Array.isArray(saved.cityMapPool) ? saved.cityMapPool : [];
				const newIds = Array.from({ length: extra }, (_, index) => `sector-${count + index + 1}`);
				localStorage.setItem('neonpunk-city-network-count', String(nextCount));
				saved.cityMapPool = [...new Set([...currentPool, ...newIds])].slice(0, 7);
				localStorage.setItem('neonpunk-save', JSON.stringify(saved));
				location.reload();
			}, 160);
		}, false);
	}

	varyDiscoveryBatch();
	varyNodePositions();
	new MutationObserver(varyNodePositions).observe(document.body, { childList: true, subtree: true });
})();
