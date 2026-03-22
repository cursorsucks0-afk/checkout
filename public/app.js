const form = document.getElementById('viewer-form');
const urlInput = document.getElementById('group-url');
const statusEl = document.getElementById('status');
const loadBtn = document.getElementById('load-btn');
const resultSection = document.getElementById('result');
const metaEl = document.getElementById('meta');
const itemListEl = document.getElementById('item-list');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const url = urlInput.value.trim();
  if (!url) {
    return;
  }

  setLoading(true, 'Fetching link data through server proxy...');
  clearResult();

  try {
    const response = await fetch(`/api/group-order?url=${encodeURIComponent(url)}`);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }

    renderResult(data);

    const guestJoinPayload = Boolean(data.diagnostics && data.diagnostics.guestJoinPayloadFound);
    const draftFallbackUsed = Boolean(
      data.diagnostics && data.diagnostics.draftOrderByUuidFallback && data.diagnostics.draftOrderByUuidFallback.used
    );
    const statusMessage =
      data.itemCount > 0
        ? draftFallbackUsed
          ? `Loaded ${data.itemCount} cart items using draft-order API.`
          : `Loaded ${data.itemCount} cart items.`
        : guestJoinPayload
          ? 'Guest join data loaded, but draft-order API did not return line items.'
          : 'No cart items were found in guest-visible page data.';

    setLoading(false, statusMessage);
  } catch (error) {
    setLoading(false, `Error: ${error.message}`);
  }
});

function setLoading(loading, message) {
  loadBtn.disabled = loading;
  loadBtn.textContent = loading ? 'Loading...' : 'Load';
  statusEl.textContent = message;
}

function clearResult() {
  metaEl.innerHTML = '';
  itemListEl.innerHTML = '';
  resultSection.classList.add('hidden');
}

function renderResult(data) {
  const draftStatus = formatDraftFallbackStatus(data.diagnostics && data.diagnostics.draftOrderByUuidFallback);

  const rows = [
    ['Source', data.sourceUrl],
    ['Auth Mode', data.diagnostics && data.diagnostics.authCookieProvided ? 'Auto' : 'Guest'],
    ['Merchant', data.merchantName || 'Not found'],
    ['Delivery', data.deliveryAddress || 'Not found'],
    ['Host', data.hostName || 'Not found'],
    ['Diagnostics', `${data.diagnostics.parsedJsonBlobs} JSON blobs parsed`],
    ['Guest Join Payload', data.diagnostics.guestJoinPayloadFound ? 'Found' : 'Not found'],
    ['Draft API Fallback', draftStatus]
  ];

  for (const [label, value] of rows) {
    const row = document.createElement('div');
    row.className = 'meta-row';
    row.innerHTML = `<strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}`;
    metaEl.appendChild(row);
  }

  if (!Array.isArray(data.items) || data.items.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'item';
    empty.innerHTML = '<div class="item-name">No guest-visible cart line items found.</div>';
    itemListEl.appendChild(empty);

    if (Array.isArray(data.diagnostics.guestPresentationItems) && data.diagnostics.guestPresentationItems.length > 0) {
      for (const entry of data.diagnostics.guestPresentationItems) {
        const li = document.createElement('li');
        li.className = 'item';

        li.innerHTML = `
          <div>
            <div class="item-name">${escapeHtml(entry.title || 'Info')}</div>
            <div class="item-meta">Guest info row${entry.icon ? ` · ${escapeHtml(entry.icon)}` : ''}</div>
          </div>
          <div>-</div>
        `;

        itemListEl.appendChild(li);
      }
    }
  } else {
    for (const item of data.items) {
      const li = document.createElement('li');
      li.className = 'item';

      const itemLeft = document.createElement('div');
      itemLeft.className = 'item-left';

      const thumb = document.createElement('img');
      thumb.className = 'item-thumb';
      thumb.alt = item.name ? `${item.name} photo` : 'Item photo';

      const imageUrl = typeof item.imageUrl === 'string' ? item.imageUrl.trim() : '';
      if (/^https?:\/\//i.test(imageUrl)) {
        thumb.src = imageUrl;
      } else {
        thumb.classList.add('item-thumb-placeholder');
      }

      thumb.loading = 'lazy';
      thumb.referrerPolicy = 'no-referrer';

      const itemCopy = document.createElement('div');
      itemCopy.className = 'item-copy';
      itemCopy.innerHTML = `
        <div class="item-name">${escapeHtml(item.name)}</div>
        <div class="item-meta">Qty ${escapeHtml(String(item.quantity || 1))}${item.notes ? ` · ${escapeHtml(item.notes)}` : ''}</div>
      `;

      const right = document.createElement('div');
      right.textContent = item.priceText || '-';

      itemLeft.appendChild(thumb);
      itemLeft.appendChild(itemCopy);
      li.appendChild(itemLeft);
      li.appendChild(right);
      itemListEl.appendChild(li);
    }
  }

  resultSection.classList.remove('hidden');
}

function formatDraftFallbackStatus(fallback) {
  if (!fallback) {
    return 'Not attempted';
  }

  if (fallback.used) {
    return 'Used';
  }

  if (!fallback.reason) {
    return 'Not used';
  }

  const compact = String(fallback.reason).replace(/\s+/g, ' ').trim();
  return `Not used (${compact.slice(0, 80)}${compact.length > 80 ? '...' : ''})`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
