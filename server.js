
// note this is just for refrence its not used via this project and is hosted via the checkout url
const express = require('express');
const cheerio = require('cheerio');
const { randomUUID } = require('crypto');

const HARDCODED_GROUP_COOKIE = "uev2.id.session_v2=cfa0cf3d-b0d2-414c-984b-011f35c3205d; uev2.ts.session_v2=1774181651906; uev2.embed_theme_preference=dark; uev2.id.xp=407c2d84-48b6-442a-ac56-0278806db8d2; dId=b2f7d13a-29ad-4c7f-bf5a-8bfeb2770a5f; uev2.id.session=d5cae4ca-02fb-4420-af26-a36f546aee4b; uev2.ts.session=1774181653319; uev2.diningMode=DELIVERY; _ua={\"session_id\":\"c0dcb45c-71ca-498d-a5dd-4562399abf2c\",\"session_time_ms\":1774181653459}; marketing_vistor_id=00a12e0e-6bc0-4d14-86ec-ebe96d2b48f0; uev2.gg=true; uev2.unregisteredUserType=DOMAIN_UNCONSTRAINED; uev2.loc=%7B%22latitude%22%3A38.506549%2C%22longitude%22%3A-121.47853799999999%2C%22address%22%3A%7B%22address1%22%3A%226607%20Woodbine%20Ave%22%2C%22address2%22%3A%22%22%2C%22aptOrSuite%22%3A%22%22%2C%22eaterFormattedAddress%22%3A%22%22%2C%22title%22%3A%226607%20Woodbine%20Ave%22%2C%22subtitle%22%3A%22Sacramento%2C%20CA%22%2C%22uuid%22%3A%22%22%7D%2C%22reference%22%3A%22786977c0-3d1b-17ae-928d-4a4b90acb36e%22%2C%22referenceType%22%3A%22uber_places%22%2C%22type%22%3A%22uber_places%22%2C%22addressComponents%22%3A%7B%22countryCode%22%3A%22%22%2C%22firstLevelSubdivisionCode%22%3A%22%22%2C%22city%22%3A%22%22%2C%22postalCode%22%3A%22%22%7D%7D; g_state={\"i_l\":0,\"i_ll\":1774182837189,\"i_b\":\"enXh2aBxolQgxg7YZwrN1m9M0gb0bJr8QzSmrXzrTuw\",\"i_e\":{\"enable_itp_optimization\":1}}; jwt-session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNsYXRlLWV4cGlyZXMtYXQiOjE3NzQxODU0MDA2NzJ9LCJpYXQiOjE3NzQxODE2NTQsImV4cCI6MTc3NDI2ODA1NH0.DIZa6kY3pFwm8TqIPVsfyuPYBezbhmdtVn65o6XAWi4; __cf_bm=WYqLOTzSmlpiSTHszeBWDhzjEiYNni7KFHKZc07G2iM-1774183827-1.0.1.1-iIff1u5IdNYOYZNLT0UUGfhLk20yg.EXeXeIg5de4VnEx8pHaTukyW526MNnj9tjDA7BEWq6X2b1OI7knbD62KZdJXiVZEtbIHVv_xEOpt0; state=JF0333C63bI0EH.1774184772278.TyfvaR+gcQqcreG/Gz0k4KSNeWOrIYMFp18CWc74Imc=; sid=QA.CAESEDmn5i9bHUStjPpCyjBv_Z8YwOWdzwYiATEqJDg3YTQxY2NiLThkMzctNDBlZi1hNzA0LTYzODhiZDdhYjFmNjI80dlkrQgOwOhgeuX-Jf7yrT-vL96ki4K3QOANW9ZYM3hVJCT4Lvd6UNgxyOPMU3Kgc9f21ZD_aMBOuwkWOgExQg0udWJlcmVhdHMuY29t._x781zm8TcxUgmZaddzh7bDuZK5QDRGezIC3e6W67cg; smeta={expiresAt:1776775872774}; udi-id=G50e3gGTCKk/CyoLwg6xGx02XRVYK9qCAE8P4+8Pcz3bZzyhPaqWb6oyD68tbDWbpx8BOz3XoLxmAWz9XMmKhLzAfzntw7RxpKnjvZ+pk3cTx9DeyimHxnDumN4mzRu65rBQYnSwB8CYj1Ol+uZS41N+7rR43vjlC1RHP9ilRfVviCFKxsphxhDpjwxZb78XaeM8OVCJvv41swj4TISUcQ==nhIU/NljwJs/wTlVs2hLrQ==i7yFFGn3Bgem7rPw8EIG6cGpweTqwAj4XqJnwTTLWgY=; uev2.do=1f8fd807-4217-41b5-97b2-042d9ab51d21; u-cookie-prefs=eyJ2ZXJzaW9uIjoxMDAsImRhdGUiOjE3NzQxODQ1ODQ2NDQsImNvb2tpZUNhdGVnb3JpZXMiOlsiYWxsIl0sImltcGxpY2l0Ijp0cnVlfQ%3D%3D; mp_adec770be288b16d9008c964acfba5c2_mixpanel=%7B%22distinct_id%22%3A%20%2287a41ccb-8d37-40ef-a704-6388bd7ab1f6%22%2C%22%24device_id%22%3A%20%2219d1576fb311560-015e971732bd1e8-26061c51-144000-19d1576fb3214b9%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%2C%22%24user_id%22%3A%20%2287a41ccb-8d37-40ef-a704-6388bd7ab1f6%22%7D";

const app = express();
const PORT = process.env.PORT || 3000;

app.disable('etag');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  return next();
});

app.use(express.static('public', {
  etag: false,
  lastModified: false,
  maxAge: 0,
  setHeaders(res) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
  }
}));
app.use(express.json({ limit: '200kb' }));

app.get(['/api/group-order', '/api/group-orders'], async (req, res) => {
  const rawUrl = req.query.url;
  const cookieHeader = HARDCODED_GROUP_COOKIE;

  const result = await handleGroupOrderRequest(rawUrl, cookieHeader);
  if (result.error) {
    return res.status(result.statusCode).json(result.error);
  }
  return res.json(result.data);
});

async function handleGroupOrderRequest(rawUrl, cookieHeader) {
  const normalizedCookie = typeof cookieHeader === 'string' ? cookieHeader.trim() : '';
  const effectiveCookie = normalizedCookie || HARDCODED_GROUP_COOKIE;
  const useAuthCookie = Boolean(effectiveCookie);

  if (!rawUrl || typeof rawUrl !== 'string') {
    return {
      statusCode: 400,
      error: { error: 'Missing required url' }
    };
  }

  let parsed;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return {
      statusCode: 400,
      error: { error: 'Invalid URL' }
    };
  }

  const allowedHosts = [
    'eats.uber.com',
    'www.eats.uber.com',
    'www.ubereats.com',
    'ubereats.com',
    'www.uber.com',
    'uber.com'
  ];

  if (!allowedHosts.some((host) => parsed.hostname === host || parsed.hostname.endsWith(`.${host}`))) {
    return {
      statusCode: 400,
      error: { error: 'Only Uber/Uber Eats links are supported.' }
    };
  }

  try {
    const response = await fetch(parsed.toString(), {
      headers: buildRequestHeaders(effectiveCookie),
      redirect: 'follow'
    });

    const html = await response.text();

    if (!response.ok) {
      return {
        statusCode: response.status,
        error: {
          error: `Upstream request failed with status ${response.status}`,
          details: html.slice(0, 500)
        }
      };
    }

    const resolvedUrl = response.url || parsed.toString();

    const result = extractOrderData(html, resolvedUrl);
    result.diagnostics.authCookieProvided = useAuthCookie;

    if (useAuthCookie && result.itemCount === 0) {
      const draftOrderFallback = await extractItemsWithDraftOrderByUuid(resolvedUrl, effectiveCookie, html);
      result.diagnostics.draftOrderByUuidFallback = {
        attempted: true,
        used: false,
        reason: draftOrderFallback.reason || null,
        autoJoinAttempted: Boolean(draftOrderFallback.autoJoin && draftOrderFallback.autoJoin.attempted),
        autoJoinSucceeded: Boolean(draftOrderFallback.autoJoin && draftOrderFallback.autoJoin.ok),
        autoJoinReason: (draftOrderFallback.autoJoin && draftOrderFallback.autoJoin.reason) || null
      };

      if (draftOrderFallback.ok && Array.isArray(draftOrderFallback.items) && draftOrderFallback.items.length > 0) {
        result.items = draftOrderFallback.items;
        result.itemCount = draftOrderFallback.items.length;
        result.subtotal = Number.isFinite(draftOrderFallback.subtotal)
          ? draftOrderFallback.subtotal
          : calculateSubtotalFromItems(draftOrderFallback.items);
        result.subtotalText = formatSubtotal(result.subtotal);
        result.diagnostics.draftOrderByUuidFallback.used = true;
        result.diagnostics.draftOrderByUuidFallback.reason = null;
      }
    }

    return {
      statusCode: 200,
      data: result
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: {
        error: 'Failed to fetch or parse the provided link',
        details: error instanceof Error ? error.message : String(error)
      }
    };
  }
}

app.listen(PORT, () => {
  console.log(`Viewer running at http://localhost:${PORT}`);
});

function extractOrderData(html, sourceUrl) {
  const $ = cheerio.load(html);

  const extractionState = {
    merchantName: null,
    deliveryAddress: null,
    hostName: null,
    items: [],
    guestPresentationItems: [],
    rawItemCandidates: 0,
    sources: [],
    guestJoinPayloadFound: false
  };

  const parsedJsonBlobs = [];

  $('script').each((_, el) => {
    const scriptText = $(el).html();
    if (!scriptText || !scriptText.trim()) {
      return;
    }

    const type = ($(el).attr('type') || '').toLowerCase();
    const id = ($(el).attr('id') || '').toLowerCase();

    if (id === '__next_data__' || type.includes('json')) {
      tryPushJson(scriptText, parsedJsonBlobs, extractionState.sources, id || type || 'script-json');
      return;
    }

    const jsonLike = extractLikelyJson(scriptText);
    jsonLike.forEach((chunk, idx) => {
      tryPushJson(chunk, parsedJsonBlobs, extractionState.sources, `inline-json-${idx}`);
    });
  });

  for (const blob of parsedJsonBlobs) {
    scanObject(blob.data, extractionState);
  }

  applyGuestPresentationFallbacks(extractionState);

  // Fallback: parse visible page text for basic metadata.
  if (!extractionState.merchantName) {
    extractionState.merchantName =
      cleanText($('title').first().text()) ||
      cleanText($('h1').first().text()) ||
      cleanText($('h2').first().text()) ||
      null;
  }

  // Keep unique items and remove empty names.
  const unique = new Map();
  for (const item of extractionState.items) {
    if (!item.name) {
      continue;
    }
    const key = `${item.name}::${item.quantity}::${item.priceText || ''}`;
    if (!unique.has(key)) {
      unique.set(key, item);
    }
  }

  const uniqueItems = Array.from(unique.values());
  const publicItems = uniqueItems.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    priceText: item.priceText || null,
    isUnitPrice: item._isUnitPrice !== false,
    unitPriceText: item._unitPriceText || null,
    lineTotalText: item._lineTotalText || item.priceText || null,
    unitPriceValue: Number.isFinite(item._unitPriceValue) ? item._unitPriceValue : null,
    lineTotalValue: Number.isFinite(item._lineTotalValue) ? item._lineTotalValue : null,
    addOnsTotalText: Number.isFinite(item._addOnsTotalValue) ? formatSubtotal(item._addOnsTotalValue) : null,
    addOnsTotalValue: Number.isFinite(item._addOnsTotalValue) ? item._addOnsTotalValue : null,
    imageUrl: item.imageUrl || null,
    notes: item.notes || null
  }));
  const subtotal = calculateSubtotalFromItems(uniqueItems);

  return {
    sourceUrl,
    merchantName: extractionState.merchantName,
    deliveryAddress: extractionState.deliveryAddress,
    hostName: extractionState.hostName,
    items: publicItems,
    itemCount: unique.size,
    subtotal,
    subtotalText: formatSubtotal(subtotal),
    diagnostics: {
      parsedJsonBlobs: parsedJsonBlobs.length,
      rawItemCandidates: extractionState.rawItemCandidates,
      extractionSources: extractionState.sources.slice(0, 30),
      guestJoinPayloadFound: extractionState.guestJoinPayloadFound,
      guestPresentationItems: extractionState.guestPresentationItems
    }
  };
}

function tryPushJson(text, parsedJsonBlobs, sources, sourceLabel) {
  const trimmed = text.trim();

  try {
    const parsed = JSON.parse(trimmed);
    parsedJsonBlobs.push({ source: sourceLabel, data: parsed });
    sources.push(sourceLabel);
  } catch {
    try {
      const parsed = JSON.parse(normalizeUberEscapedJson(trimmed));
      parsedJsonBlobs.push({ source: sourceLabel, data: parsed });
      sources.push(`${sourceLabel}-escaped`);
    } catch {
      // Ignore non-JSON blobs.
    }
  }
}

function normalizeUberEscapedJson(text) {
  if (typeof text !== 'string' || !text) {
    return text;
  }

  return decodeUnicodeEscapes(text)
    // Preserve escaped quote semantics in encoded query hashes like %5C\u0022.
    .replace(/%5C"/g, '%5C\\"');
}

function decodeUnicodeEscapes(text) {
  return text
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/\\x([0-9a-fA-F]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

function extractLikelyJson(text) {
  const matches = [];
  const patterns = [
    /\{\s*"props"[\s\S]*\}\s*$/m,
    /\{\s*"data"[\s\S]*\}\s*$/m,
    /\{\s*"state"[\s\S]*\}\s*$/m,
    /\[\s*\{[\s\S]*\}\s*\]/m
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[0]) {
      matches.push(match[0]);
    }
  }

  return matches;
}

function scanObject(value, state, path = '') {
  if (!value) {
    return;
  }

  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i += 1) {
      scanObject(value[i], state, `${path}[${i}]`);
    }
    return;
  }

  if (typeof value !== 'object') {
    return;
  }

  const entries = Object.entries(value);

  for (const [key, val] of entries) {
    const keyLower = key.toLowerCase();
    const nextPath = path ? `${path}.${key}` : key;

    if (!state.merchantName && /(merchant|store|restaurant).{0,12}(name)?/.test(keyLower) && typeof val === 'string') {
      const candidate = cleanText(val);
      if (candidate && !isLikelyNoiseText(candidate)) {
        state.merchantName = candidate;
      }
    }

    if (!state.deliveryAddress && /deliver|address|dropoff|destination/.test(keyLower) && typeof val === 'string') {
      const text = cleanText(val);
      if (text && text.length > 8 && !isLikelyNoiseText(text)) {
        state.deliveryAddress = text;
      }
    }

    if (!state.hostName && /(host|organizer|creator|owner).{0,8}(name)?/.test(keyLower) && typeof val === 'string') {
      const candidate = cleanText(val);
      if (candidate && !isLikelyNoiseText(candidate)) {
        state.hostName = candidate;
      }
    }

    if (keyLower === 'joingrouporderpresentationdata' && val && typeof val === 'object') {
      applyJoinGroupPresentationData(val, state);
    }

    if (Array.isArray(val) && isPotentialOrderArray(keyLower, nextPath)) {
      if (nextPath.toLowerCase().includes('joingrouporderpresentationdata')) {
        continue;
      }

      if (isIgnoredCatalogPath(nextPath)) {
        continue;
      }

      state.rawItemCandidates += val.length;
      for (const candidate of val) {
        const normalized = normalizeItem(candidate);
        if (normalized) {
          state.items.push(normalized);
        }
      }
    }

    if (typeof val === 'object' && val !== null) {
      scanObject(val, state, nextPath);
    }
  }
}

function applyJoinGroupPresentationData(payload, state) {
  if (!payload || typeof payload !== 'object') {
    return;
  }

  state.guestJoinPayloadFound = true;

  if (typeof payload.title === 'string') {
    const hostMatch = payload.title.match(/join\s+(.+?)'s\s+group\s+order\?/i);
    if (hostMatch && hostMatch[1] && (!state.hostName || isLikelyNoiseText(state.hostName))) {
      state.hostName = cleanText(hostMatch[1]);
    }
  }

  if (!Array.isArray(payload.items)) {
    return;
  }

  state.guestPresentationItems = payload.items
    .map((entry) => {
      if (!entry || typeof entry !== 'object') {
        return null;
      }

      return {
        icon: typeof entry.icon === 'string' ? entry.icon : null,
        title: typeof entry.title === 'string' ? cleanText(entry.title) : null
      };
    })
    .filter((entry) => entry && entry.title);

  for (const entry of state.guestPresentationItems) {
    if (!entry || !entry.title) {
      continue;
    }

    if (
      /(storefront|merchant|restaurant)/i.test(entry.icon || '') &&
      (!state.merchantName || isLikelyNoiseText(state.merchantName))
    ) {
      state.merchantName = entry.title;
    }

    if (
      /(location|deliver|address)/i.test(entry.icon || entry.title) &&
      (!state.deliveryAddress || isLikelyNoiseText(state.deliveryAddress))
    ) {
      state.deliveryAddress = entry.title;
    }
  }
}

function applyGuestPresentationFallbacks(state) {
  if (!Array.isArray(state.guestPresentationItems) || state.guestPresentationItems.length === 0) {
    return;
  }

  for (const entry of state.guestPresentationItems) {
    if (!entry || !entry.title) {
      continue;
    }

    const icon = (entry.icon || '').toUpperCase();

    if (icon === 'STOREFRONT') {
      state.merchantName = entry.title;
    }

    if (icon === 'LOCATION_MARKER') {
      state.deliveryAddress = entry.title;
    }

    if (icon === 'MONEY') {
      const parsedHost = parseHostFromPayerTitle(entry.title);
      if (parsedHost) {
        state.hostName = parsedHost;
      }
    }
  }
}

function parseHostFromPayerTitle(text) {
  const value = cleanText(text);
  if (!value) {
    return null;
  }

  const match = value.match(/^(.+?)\s+is\s+paying\s+for\s+this\s+order/i);
  if (!match || !match[1]) {
    return null;
  }

  return cleanText(match[1]);
}

function isPotentialOrderArray(keyLower, path) {
  const normalizedPath = String(path || '').toLowerCase();
  const hasItemLikeKey = /(items|lineitems|cartitems|orderitems|entries|contents)/.test(keyLower);
  if (!hasItemLikeKey) {
    return false;
  }

  // Avoid sweeping every generic "items" list in the page payload.
  return /(group|order|cart|basket|participant|member|creator|checkout)/.test(normalizedPath);
}

function isIgnoredCatalogPath(path) {
  const normalizedPath = String(path || '').toLowerCase();
  return /(catalogsectionsmap|catalogitems|standarditemspayload|menuitems|displayitems|recommendations)/.test(
    normalizedPath
  );
}

function isLikelyNoiseText(value) {
  const text = cleanText(value).toLowerCase();
  if (!text) {
    return true;
  }

  return (
    text.includes('${') ||
    text.includes('add your restaurant') ||
    text.includes('sign up to deliver') ||
    text.includes('group order is locked') ||
    text.includes('please login to your uber account') ||
    text === 'deliver now' ||
    text === 'creator'
  );
}

function normalizeItem(candidate) {
  if (!candidate || typeof candidate !== 'object') {
    return null;
  }

  const readString = (...keys) => {
    for (const key of keys) {
      const val = candidate[key];
      if (typeof val === 'string' && val.trim()) {
        return cleanText(val);
      }
    }
    return null;
  };

  const name = readString('name', 'title', 'itemName', 'displayName', 'label');
  if (!name) {
    return null;
  }

  const quantityRaw =
    candidate.quantity ??
    candidate.qty ??
    candidate.count ??
    candidate.itemQuantity ??
    candidate.units ??
    candidate.numItems;

  if (quantityRaw == null) {
    return null;
  }

  const quantity = Number.isFinite(Number(quantityRaw)) ? Number(quantityRaw) : 1;

  const selectedPrice = selectPriceCandidate(candidate);
  const priceCandidate = selectedPrice.value;

  const priceText = formatPrice(priceCandidate);
  const priceValue = parseMoneyToNumber(priceText);
  const isUnitPrice = selectedPrice.isUnitPrice !== false;
  const unitPriceValue = Number.isFinite(priceValue) ? priceValue : null;
  const lineTotalValue = Number.isFinite(priceValue)
    ? Number(((isUnitPrice ? priceValue * quantity : priceValue)).toFixed(2))
    : null;

  return {
    name,
    quantity,
    priceText,
    _priceValue: unitPriceValue,
    _isUnitPrice: isUnitPrice,
    _unitPriceValue: unitPriceValue,
    _lineTotalValue: lineTotalValue,
    _unitPriceText: Number.isFinite(unitPriceValue) ? formatSubtotal(unitPriceValue) : priceText,
    _lineTotalText: Number.isFinite(lineTotalValue) ? formatSubtotal(lineTotalValue) : priceText,
    notes: readString('description', 'note', 'specialInstructions')
  };
}

function selectPriceCandidate(candidate) {
  if (candidate.totalPrice != null) {
    return { value: candidate.totalPrice, isUnitPrice: false };
  }

  if (candidate.subtotal != null) {
    return { value: candidate.subtotal, isUnitPrice: false };
  }

  if (candidate.amount != null) {
    return { value: candidate.amount, isUnitPrice: inferUnitPriceFromCandidate(candidate, candidate.amount) };
  }

  if (candidate.price != null) {
    return { value: candidate.price, isUnitPrice: inferUnitPriceFromCandidate(candidate, candidate.price) };
  }

  if (candidate.unitPrice != null) {
    return { value: candidate.unitPrice, isUnitPrice: true };
  }

  return { value: null, isUnitPrice: false };
}

function inferUnitPriceFromCandidate(candidate, rawPrice) {
  const quantityRaw =
    candidate.quantity ??
    candidate.qty ??
    candidate.count ??
    candidate.itemQuantity ??
    candidate.units ??
    candidate.numItems;
  const quantity = Number.isFinite(Number(quantityRaw)) ? Number(quantityRaw) : 1;

  const explicitTotalKeys = [
    'lineTotal',
    'lineAmount',
    'extendedPrice',
    'itemTotal',
    'total',
    'subtotal'
  ];

  for (const key of explicitTotalKeys) {
    if (candidate[key] != null) {
      return false;
    }
  }

  const normalizedText = String(
    (rawPrice && typeof rawPrice === 'object' && (rawPrice.displayString || rawPrice.formattedPrice || rawPrice.displayPrice))
      || rawPrice
      || ''
  ).toLowerCase();

  if (normalizedText.includes('each') || normalizedText.includes('ea')) {
    return true;
  }

  if (normalizedText.includes('total') || normalizedText.includes('subtotal')) {
    return false;
  }

  // Generic price fields on item records are most often unit prices.
  if (quantity > 1) {
    return true;
  }

  return true;
}

function calculateSubtotalFromItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return 0;
  }

  let subtotal = 0;
  for (const item of items) {
    if (!item || typeof item !== 'object') {
      continue;
    }

    // Prefer explicit line totals when present so subtotal always matches rendered item totals.
    const explicitLineTotal = Number.isFinite(item._lineTotalValue)
      ? item._lineTotalValue
      : parseMoneyToNumber(item._lineTotalText || item.lineTotalText || null);
    if (Number.isFinite(explicitLineTotal)) {
      subtotal += explicitLineTotal;
      continue;
    }

    const parsedAmount = Number.isFinite(item._priceValue) ? item._priceValue : parseMoneyToNumber(item.priceText);
    if (!Number.isFinite(parsedAmount)) {
      continue;
    }

    const quantity = Number.isFinite(Number(item.quantity)) && Number(item.quantity) > 0 ? Number(item.quantity) : 1;
    const lineAmount = item._isUnitPrice ? parsedAmount * quantity : parsedAmount;
    subtotal += lineAmount;
  }

  return Number(subtotal.toFixed(2));
}

function formatSubtotal(amount) {
  if (!Number.isFinite(amount)) {
    return null;
  }

  return `$${amount.toFixed(2)}`;
}

function parseMoneyToNumber(value) {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value !== 'string') {
    return null;
  }

  const cleaned = cleanText(value);
  if (!cleaned) {
    return null;
  }

  const match = cleaned.match(/-?\d[\d,]*(?:\.\d+)?/);
  if (!match || !match[0]) {
    return null;
  }

  const normalized = Number(match[0].replace(/,/g, ''));
  return Number.isFinite(normalized) ? normalized : null;
}

function formatPrice(price) {
  if (price == null) {
    return null;
  }

  if (typeof price === 'string') {
    const trimmed = cleanText(price);
    return trimmed || null;
  }

  if (typeof price === 'number') {
    if (!Number.isFinite(price)) {
      return null;
    }
    const normalizedAmount = normalizeCurrencyAmount(price, {});
    return `$${normalizedAmount.toFixed(2)}`;
  }

  if (typeof price === 'object') {
    if (typeof price.displayString === 'string') {
      return cleanText(price.displayString);
    }

    if (typeof price.formattedPrice === 'string') {
      return cleanText(price.formattedPrice);
    }

    if (typeof price.displayPrice === 'string') {
      return cleanText(price.displayPrice);
    }

    const amount = price.amount ?? price.value;
    const currencyCode = price.currencyCode ?? price.currency;

    if (typeof amount === 'number') {
      const normalizedAmount = normalizeCurrencyAmount(amount, price);
      if (currencyCode && typeof currencyCode === 'string') {
        return `${currencyCode} ${normalizedAmount.toFixed(2)}`;
      }
      return `$${normalizedAmount.toFixed(2)}`;
    }
  }

  return null;
}

function normalizeCurrencyAmount(amount, priceObj) {
  if (!Number.isFinite(amount)) {
    return amount;
  }

  const explicitMinorUnitKeys = [
    'amountInMinorUnits',
    'amountMinor',
    'minorAmount',
    'valueInCents',
    'amountInCents',
    'cents'
  ];

  for (const key of explicitMinorUnitKeys) {
    if (typeof priceObj[key] === 'number' && Number.isFinite(priceObj[key])) {
      return Number(priceObj[key]) / 100;
    }
  }

  // Uber payloads frequently return integer cents for item-level amounts.
  if (Number.isInteger(amount) && Math.abs(amount) >= 100 && Math.abs(amount) <= 200000) {
    return amount / 100;
  }

  return amount;
}

function cleanText(text) {
  if (typeof text !== 'string') {
    return '';
  }
  return text.replace(/\s+/g, ' ').trim();
}

function buildRequestHeaders(cookieHeader) {
  const headers = {
    'user-agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'accept-language': 'en-US,en;q=0.9'
  };

  if (cookieHeader) {
    headers.cookie = cookieHeader;
  }

  return headers;
}

async function extractItemsWithDraftOrderByUuid(sourceUrl, cookieHeader, html) {
  const draftOrderUUID = extractDraftOrderUUID(sourceUrl, cookieHeader, html);
  if (!draftOrderUUID) {
    return {
      ok: false,
      reason: 'missing-draft-order-uuid',
      autoJoin: {
        attempted: false,
        ok: false,
        reason: 'missing-draft-order-uuid'
      },
      items: []
    };
  }

  const cookieMap = parseCookieMap(cookieHeader);
  const loc = parseLocationCookie(cookieMap.get('uev2.loc'));

  const autoJoin = await addMemberToDraftOrder(sourceUrl, cookieHeader, draftOrderUUID, cookieMap, loc);

  const requestHeaders = {
    accept: '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'content-type': 'application/json',
    'x-csrf-token': cookieMap.get('csrf_token') || 'x',
    'x-uber-ciid': cookieMap.get('x-uber-ciid') || randomUUID(),
    'x-uber-client-gitref': 'bd7681663ce1c75fe98231630f5e575b336e542d',
    'x-uber-request-id': randomUUID(),
    'x-uber-session-id': cookieMap.get('uev2.id.session') || randomUUID(),
    referer: sourceUrl,
    cookie: cookieHeader,
    priority: 'u=1, i'
  };

  if (loc && Number.isFinite(loc.latitude) && Number.isFinite(loc.longitude)) {
    requestHeaders['x-uber-target-location-latitude'] = String(loc.latitude);
    requestHeaders['x-uber-target-location-longitude'] = String(loc.longitude);
  }

  try {
    const response = await fetch('https://www.ubereats.com/_p/api/getDraftOrderByUuidV2', {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify({ draftOrderUUID })
    });

    const text = await response.text();
    if (!response.ok) {
      return {
        ok: false,
        reason: `draft-order-http-${response.status}`,
        autoJoin,
        items: []
      };
    }

    let json;
    try {
      json = JSON.parse(text);
    } catch {
      return {
        ok: false,
        reason: 'draft-order-invalid-json',
        autoJoin,
        items: []
      };
    }

    const extractedItems = extractItemsFromDraftOrderPayload(json);
    const checkoutData = await fetchCheckoutPresentationData(
      sourceUrl,
      cookieHeader,
      draftOrderUUID,
      cookieMap,
      loc
    );
    const pricedItems = applyCheckoutPrices(extractedItems, checkoutData.priceMap);
    const computedSubtotal = calculateSubtotalFromItems(pricedItems);
    const checkoutSubtotal = Number.isFinite(checkoutData.subtotal) ? Number(checkoutData.subtotal) : null;
    const shouldTrustCheckoutSubtotal = Number.isFinite(checkoutSubtotal)
      && Number.isFinite(computedSubtotal)
      && Math.abs(checkoutSubtotal - computedSubtotal) <= 0.5;

    return {
      ok: true,
      reason: pricedItems.length > 0 ? null : 'draft-order-no-item-names',
      autoJoin,
      items: pricedItems,
      subtotal: shouldTrustCheckoutSubtotal ? checkoutSubtotal : computedSubtotal
    };
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : String(error),
      autoJoin,
      items: [],
      subtotal: null
    };
  }
}

async function fetchCheckoutPresentationData(sourceUrl, cookieHeader, draftOrderUUID, cookieMap, loc) {
  const requestHeaders = {
    accept: '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'content-type': 'application/json',
    'x-csrf-token': cookieMap.get('csrf_token') || 'x',
    'x-uber-ciid': cookieMap.get('x-uber-ciid') || randomUUID(),
    'x-uber-client-gitref': 'bd7681663ce1c75fe98231630f5e575b336e542d',
    'x-uber-request-id': randomUUID(),
    'x-uber-session-id': cookieMap.get('uev2.id.session') || randomUUID(),
    referer: sourceUrl,
    cookie: cookieHeader,
    priority: 'u=1, i'
  };

  if (loc && Number.isFinite(loc.latitude) && Number.isFinite(loc.longitude)) {
    requestHeaders['x-uber-target-location-latitude'] = String(loc.latitude);
    requestHeaders['x-uber-target-location-longitude'] = String(loc.longitude);
  }

  const requestBody = {
    payloadTypes: [
      'cartItems',
      'subtotal',
      'basketSize',
      'promotion',
      'restrictedItems',
      'venueSectionPicker',
      'locationInfo',
      'upsellCatalogSections',
      'subTotalFareBreakdown',
      'canonicalProductStorePickerPayload',
      'storeSwitcherActionableBannerPayload',
      'fareBreakdown',
      'promoAndMembershipSavingBannerPayload',
      'passBanner',
      'passBannerOnCartPayload',
      'merchantMembership',
      'giftInfo',
      'total',
      'paymentProfilesEligibility',
      'requestUtensilPayload',
      'upsellFeed',
      'upfrontTipping',
      'promoAndMembershipSavingBannerPayloadCheckout',
      'deliveryOptInInfo',
      'eta',
      'orderConfirmations'
    ],
    draftOrderUUID,
    isGroupOrder: true,
    clientFeaturesData: {
      paymentSelectionContext: {
        value: '{"deviceContext":{"thirdPartyApplications":["google_pay","venmo"]}}'
      }
    }
  };

  try {
    const response = await fetch('https://www.ubereats.com/_p/api/getCheckoutPresentationV1', {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      return {
        priceMap: { byId: new Map(), byNameQty: new Map() },
        subtotal: null
      };
    }

    const text = await response.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      return {
        priceMap: { byId: new Map(), byNameQty: new Map() },
        subtotal: null
      };
    }

    return {
      priceMap: extractCheckoutPriceMap(json),
      subtotal: extractCheckoutSubtotal(json)
    };
  } catch {
    return {
      priceMap: { byId: new Map(), byNameQty: new Map() },
      subtotal: null
    };
  }
}

function extractCheckoutSubtotal(payload) {
  const candidates = [];

  const pushCandidate = (rawValue, weight, path) => {
    const parsed = parseMoneyToNumber(formatPrice(rawValue) || rawValue);
    if (!Number.isFinite(parsed)) {
      return;
    }
    if (parsed < 0 || parsed > 20000) {
      return;
    }
    candidates.push({ value: Number(parsed.toFixed(2)), weight, path: String(path || '') });
  };

  const walk = (value, path = '') => {
    if (!value) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((entry, idx) => walk(entry, `${path}[${idx}]`));
      return;
    }

    if (typeof value !== 'object') {
      return;
    }

    for (const [key, child] of Object.entries(value)) {
      const keyLower = String(key).toLowerCase();
      const nextPath = path ? `${path}.${key}` : key;

      if (keyLower === 'subtotal' || keyLower === 'sub_total' || keyLower === 'subtotalamount') {
        pushCandidate(child, 100, nextPath);
      }

      if (typeof child === 'string' && keyLower.includes('subtotal')) {
        pushCandidate(child, 70, nextPath);
      }

      if (child && typeof child === 'object') {
        if (keyLower.includes('subtotal')) {
          if (child.amount != null) pushCandidate(child.amount, 90, `${nextPath}.amount`);
          if (child.value != null) pushCandidate(child.value, 90, `${nextPath}.value`);
          if (child.displayString != null) pushCandidate(child.displayString, 80, `${nextPath}.displayString`);
          if (child.formattedPrice != null) pushCandidate(child.formattedPrice, 80, `${nextPath}.formattedPrice`);
          if (child.displayPrice != null) pushCandidate(child.displayPrice, 80, `${nextPath}.displayPrice`);
        }

        walk(child, nextPath);
      }
    }
  };

  walk(payload);

  if (!candidates.length) {
    return null;
  }

  candidates.sort((a, b) => {
    if (b.weight !== a.weight) return b.weight - a.weight;
    return b.value - a.value;
  });

  return candidates[0].value;
}

function extractCheckoutPriceMap(payload) {
  const byId = new Map();
  const byNameQty = new Map();
  const ambiguousNameQtyKeys = new Set();

  const selectCheckoutPriceForMap = (candidate, hasItemId) => {
    if (!candidate || typeof candidate !== 'object') {
      return null;
    }

    // Name/qty fallback should only use direct item price-like fields.
    if (candidate.unitPrice != null) {
      return { priceText: formatPrice(candidate.unitPrice), isUnitPrice: true, source: 'unitPrice' };
    }

    if (candidate.price != null) {
      return {
        priceText: formatPrice(candidate.price),
        isUnitPrice: inferUnitPriceFromCandidate(candidate, candidate.price),
        source: 'price'
      };
    }

    if (candidate.amount != null) {
      return {
        priceText: formatPrice(candidate.amount),
        isUnitPrice: inferUnitPriceFromCandidate(candidate, candidate.amount),
        source: 'amount'
      };
    }

    // For strict UUID matches we can still use broader fallback candidate extraction.
    if (hasItemId) {
      const selected = selectPriceCandidate(candidate);
      return {
        priceText: formatPrice(selected.value),
        isUnitPrice: selected.isUnitPrice !== false,
        source: 'fallback'
      };
    }

    return null;
  };

  const walk = (value) => {
    if (!value) {
      return;
    }

    if (Array.isArray(value)) {
      for (const entry of value) {
        walk(entry);
      }
      return;
    }

    if (typeof value !== 'object') {
      return;
    }

    const candidateName = cleanText(value.title || value.name || value.itemName || value.displayName || value.label || '');
    const candidateQtyRaw = value.quantity ?? value.qty ?? value.count ?? value.itemQuantity ?? null;
    const candidateQty = Number.isFinite(Number(candidateQtyRaw)) && Number(candidateQtyRaw) > 0 ? Number(candidateQtyRaw) : 1;
    const candidateId = cleanText(
      value.shoppingCartItemUuid || value.shoppingCartItemUUID || value.itemUuid || value.itemUUID || value.uuid || ''
    );
    const selectedForMap = selectCheckoutPriceForMap(value, Boolean(candidateId));
    const candidatePrice = selectedForMap && selectedForMap.priceText ? selectedForMap.priceText : null;
    const candidateIsUnit = selectedForMap ? selectedForMap.isUnitPrice !== false : true;
    const candidateSource = selectedForMap ? selectedForMap.source : null;

    if (candidatePrice && candidateName && candidateSource !== 'fallback') {
      const key = `${candidateName.toLowerCase()}::${candidateQty}`;
      if (ambiguousNameQtyKeys.has(key)) {
        // Keep ambiguous keys disabled.
      } else if (!byNameQty.has(key)) {
        byNameQty.set(key, { priceText: candidatePrice, isUnitPrice: candidateIsUnit });
      } else {
        ambiguousNameQtyKeys.add(key);
        byNameQty.delete(key);
      }
    }

    if (candidatePrice && candidateId && !byId.has(candidateId)) {
      byId.set(candidateId, { priceText: candidatePrice, isUnitPrice: candidateIsUnit });
    }

    for (const child of Object.values(value)) {
      walk(child);
    }
  };

  walk(payload);

  return { byId, byNameQty };
}

function applyCheckoutPrices(items, priceMap) {
  if (!Array.isArray(items) || items.length === 0) {
    return [];
  }

  const byId = priceMap && priceMap.byId instanceof Map ? priceMap.byId : new Map();
  const byNameQty = priceMap && priceMap.byNameQty instanceof Map ? priceMap.byNameQty : new Map();

  return items.map((item) => {
    const normalizedName = cleanText(item.name || '').toLowerCase();
    const itemKey = `${normalizedName}::${Number(item.quantity) || 1}`;

    // Prefer strict cart-item UUID matching; fallback to unambiguous name+qty when needed.
    const matchedById = (item._itemId && byId.get(item._itemId)) || null;
    const initialMatchedByNameQty = byNameQty.get(itemKey) || null;
    let matchedByNameQty = initialMatchedByNameQty;
    let matchedPriceRecord = matchedById || matchedByNameQty || null;

    const quantity = Number.isFinite(Number(item.quantity)) && Number(item.quantity) > 0 ? Number(item.quantity) : 1;
    const rawAddOnsTotalValue = Number.isFinite(item._addOnsTotalValue) ? Number(item._addOnsTotalValue) : 0;

    const draftUnitPriceValue = parseMoneyToNumber(item.priceText);
    const draftBaseLineValue = Number.isFinite(draftUnitPriceValue)
      ? Number(((item._isUnitPrice !== false ? draftUnitPriceValue * quantity : draftUnitPriceValue)).toFixed(2))
      : null;

    let matchedPrice = matchedPriceRecord && typeof matchedPriceRecord === 'object'
      ? matchedPriceRecord.priceText
      : matchedPriceRecord;
    let isUnitPrice = matchedPriceRecord && typeof matchedPriceRecord === 'object'
      ? matchedPriceRecord.isUnitPrice !== false
      : item._isUnitPrice !== false;
    let unitPriceValue = parseMoneyToNumber(matchedPrice || item.priceText);
    let matchedLineValue = Number.isFinite(unitPriceValue)
      ? Number(((isUnitPrice ? unitPriceValue * quantity : unitPriceValue)).toFixed(2))
      : null;

    // Guardrail: name/qty fallback can occasionally latch onto subtotal-like values.
    if (!matchedById && matchedByNameQty && Number.isFinite(draftBaseLineValue) && Number.isFinite(matchedLineValue)) {
      const expectedWithAddOns = Number((draftBaseLineValue + rawAddOnsTotalValue).toFixed(2));
      const isLargeAbsoluteJump = matchedLineValue - expectedWithAddOns >= 12;
      const isLargeRelativeJump = expectedWithAddOns > 0 && (matchedLineValue / expectedWithAddOns) >= 2.2;

      if (isLargeAbsoluteJump || isLargeRelativeJump) {
        matchedByNameQty = null;
        matchedPriceRecord = matchedById || null;
        matchedPrice = item.priceText || null;
        isUnitPrice = item._isUnitPrice !== false;
        unitPriceValue = parseMoneyToNumber(item.priceText);
        matchedLineValue = Number.isFinite(unitPriceValue)
          ? Number(((isUnitPrice ? unitPriceValue * quantity : unitPriceValue)).toFixed(2))
          : null;
      }
    }

    // Checkout price can be either base-only or already include modifiers depending on payload shape.
    // If matched line is near draft base line, keep draft add-ons; otherwise assume checkout already includes them.
    let addOnsTotalValue = rawAddOnsTotalValue;
    if (matchedPriceRecord && rawAddOnsTotalValue > 0 && Number.isFinite(matchedLineValue) && Number.isFinite(draftBaseLineValue)) {
      const deltaToDraftBase = Math.abs(matchedLineValue - draftBaseLineValue);
      const deltaToDraftWithAddOns = Math.abs(matchedLineValue - (draftBaseLineValue + rawAddOnsTotalValue));
      addOnsTotalValue = deltaToDraftBase <= deltaToDraftWithAddOns ? rawAddOnsTotalValue : 0;
    } else if (matchedPriceRecord && rawAddOnsTotalValue > 0 && !Number.isFinite(draftBaseLineValue)) {
      addOnsTotalValue = 0;
    }

    const lineTotalValue = Number.isFinite(unitPriceValue)
      ? Number(((isUnitPrice ? unitPriceValue * quantity : unitPriceValue) + addOnsTotalValue).toFixed(2))
      : (addOnsTotalValue > 0 ? Number(addOnsTotalValue.toFixed(2)) : null);

    return {
      name: item.name,
      quantity: item.quantity,
      imageUrl: item.imageUrl || null,
      priceText: matchedPrice || item.priceText || null,
      isUnitPrice,
      unitPriceText: Number.isFinite(unitPriceValue) ? formatSubtotal(unitPriceValue) : (matchedPrice || item.priceText || null),
      lineTotalText: Number.isFinite(lineTotalValue) ? formatSubtotal(lineTotalValue) : (matchedPrice || item.priceText || null),
      unitPriceValue: Number.isFinite(unitPriceValue) ? unitPriceValue : null,
      lineTotalValue: Number.isFinite(lineTotalValue) ? lineTotalValue : null,
      addOnsTotalText: addOnsTotalValue > 0 ? formatSubtotal(addOnsTotalValue) : null,
      addOnsTotalValue: addOnsTotalValue > 0 ? addOnsTotalValue : null,
      notes: item.notes || null,
      pricingSource: matchedById ? 'checkout-by-id' : (matchedByNameQty ? 'checkout-by-name-qty' : 'draft-order'),
      pricingDebug: {
        quantity,
        matchedById: Boolean(matchedById),
        matchedByNameQty: Boolean(matchedByNameQty),
        matchedByNameQtyInitially: Boolean(initialMatchedByNameQty),
        matchedPriceText: matchedPrice || null,
        draftPriceText: item.priceText || null,
        draftBaseLineValue: Number.isFinite(draftBaseLineValue) ? draftBaseLineValue : null,
        matchedLineValue: Number.isFinite(matchedLineValue) ? matchedLineValue : null,
        rawAddOnsTotalValue: Number(rawAddOnsTotalValue.toFixed(2)),
        appliedAddOnsTotalValue: Number(addOnsTotalValue.toFixed(2)),
        isUnitPrice
      }
    };
  });
}

async function addMemberToDraftOrder(sourceUrl, cookieHeader, draftOrderUUID, cookieMap, loc) {
  if (!draftOrderUUID) {
    return {
      attempted: false,
      ok: false,
      reason: 'missing-draft-order-uuid'
    };
  }

  const requestHeaders = {
    accept: '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'content-type': 'application/json',
    'x-csrf-token': cookieMap.get('csrf_token') || 'x',
    'x-uber-ciid': cookieMap.get('x-uber-ciid') || randomUUID(),
    'x-uber-client-gitref': 'bd7681663ce1c75fe98231630f5e575b336e542d',
    'x-uber-request-id': randomUUID(),
    'x-uber-session-id': cookieMap.get('uev2.id.session') || randomUUID(),
    referer: buildGroupOrderJoinReferer(sourceUrl, draftOrderUUID),
    cookie: cookieHeader,
    priority: 'u=1, i'
  };

  if (loc && Number.isFinite(loc.latitude) && Number.isFinite(loc.longitude)) {
    requestHeaders['x-uber-target-location-latitude'] = String(loc.latitude);
    requestHeaders['x-uber-target-location-longitude'] = String(loc.longitude);
  }

  try {
    const response = await fetch('https://www.ubereats.com/_p/api/addMemberToDraftOrderV1', {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify({ draftOrderUuid: draftOrderUUID })
    });

    if (!response.ok) {
      return {
        attempted: true,
        ok: false,
        reason: `add-member-http-${response.status}`
      };
    }

    return {
      attempted: true,
      ok: true,
      reason: null
    };
  } catch (error) {
    return {
      attempted: true,
      ok: false,
      reason: error instanceof Error ? error.message : String(error)
    };
  }
}

function buildGroupOrderJoinReferer(sourceUrl, draftOrderUUID) {
  try {
    const parsed = new URL(sourceUrl);
    return `${parsed.origin}/group-orders/${draftOrderUUID}/join?source=quickActionCopy`;
  } catch {
    return `https://www.ubereats.com/group-orders/${draftOrderUUID}/join?source=quickActionCopy`;
  }
}

function extractDraftOrderUUID(sourceUrl, cookieHeader, html) {
  try {
    const parsed = new URL(sourceUrl);
    const match = parsed.pathname.match(/\/group-orders\/([0-9a-fA-F-]{16,})/i);
    if (match && match[1]) {
      return match[1];
    }

    const directQueryKeys = ['draftOrderUUID', 'draft_order_uuid', 'groupOrderUUID', 'group_order_uuid', 'uev2.do'];
    for (const key of directQueryKeys) {
      const rawValue = parsed.searchParams.get(key);
      const candidate = findUuidLikeText(rawValue);
      if (candidate) {
        return candidate;
      }
    }
  } catch {
    // Ignore URL parse failure and try cookie fallback.
  }

  const cookieMap = parseCookieMap(cookieHeader);
  const fromCookie = findUuidLikeText(cookieMap.get('uev2.do'));
  if (fromCookie) {
    return fromCookie;
  }

  return extractDraftOrderUUIDFromHtml(html);
}

function extractDraftOrderUUIDFromHtml(html) {
  if (typeof html !== 'string' || !html) {
    return null;
  }

  const patterns = [
    /(draftOrderUUID|draft_order_uuid|uev2\.do)\"?\s*[:=]\s*\"?([0-9a-fA-F-]{16,})/i,
    /(groupOrderUUID|group_order_uuid)\"?\s*[:=]\s*\"?([0-9a-fA-F-]{16,})/i,
    /\/group-orders\/([0-9a-fA-F-]{16,})/i
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    const candidate = findUuidLikeText(match && (match[2] || match[1]));
    if (candidate) {
      return candidate;
    }
  }

  return null;
}

function findUuidLikeText(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const match = value.match(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/);
  if (match && match[0]) {
    return match[0];
  }

  const fallback = value.match(/[0-9a-fA-F-]{16,}/);
  return fallback && fallback[0] ? fallback[0] : null;
}

function parseCookieMap(cookieHeader) {
  const map = new Map();
  if (!cookieHeader || typeof cookieHeader !== 'string') {
    return map;
  }

  for (const part of cookieHeader.split(';')) {
    const segment = part.trim();
    if (!segment) {
      continue;
    }
    const idx = segment.indexOf('=');
    if (idx <= 0) {
      continue;
    }
    map.set(segment.slice(0, idx).trim(), segment.slice(idx + 1).trim());
  }

  return map;
}

function parseLocationCookie(encodedValue) {
  if (!encodedValue || typeof encodedValue !== 'string') {
    return null;
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(encodedValue));
    return {
      latitude: Number(parsed.latitude),
      longitude: Number(parsed.longitude)
    };
  } catch {
    return null;
  }
}

function extractItemsFromDraftOrderPayload(payload) {
  const draftOrder = payload && payload.data && payload.data.draftOrder;
  const shoppingCart = draftOrder && draftOrder.shoppingCart;
  if (!shoppingCart || typeof shoppingCart !== 'object') {
    return [];
  }

  const byKey = new Map();

  const parseQuantity = (rawQty) => {
    const parsedQty = Number(rawQty);
    return Number.isFinite(parsedQty) && parsedQty > 0 ? parsedQty : 1;
  };

  const collectCustomizationDetails = (item) => {
    const details = [];
    if (!item || typeof item !== 'object' || !item.customizations || typeof item.customizations !== 'object') {
      return details;
    }

    for (const entry of Object.values(item.customizations)) {
      if (!Array.isArray(entry)) {
        continue;
      }

      const groupHasSelectionSignals = entry.some((option) => {
        if (!option || typeof option !== 'object') {
          return false;
        }

        const selectedQtyRaw = option.selectedQuantity ?? option.selectedQty ?? null;
        const selectedQty = Number(selectedQtyRaw);
        return Boolean(
          option.selected === true
          || option.isSelected === true
          || option.isChosen === true
          || option.checked === true
          || option.is_checked === true
          || (Number.isFinite(selectedQty) && selectedQty > 0)
        );
      });

      for (const option of entry) {
        if (!option || typeof option !== 'object') {
          continue;
        }

        const optionName = cleanText(option.title || option.name || option.label || '');
        const selectedQtyRaw = option.selectedQuantity ?? option.selectedQty ?? null;
        const selectedQty = Number(selectedQtyRaw);
        const fallbackQtyRaw = option.quantity ?? option.qty ?? option.count ?? null;
        const fallbackQty = Number(fallbackQtyRaw);
        const isExplicitlySelected = Boolean(
          option.selected === true
          || option.isSelected === true
          || option.isChosen === true
          || option.checked === true
          || option.is_checked === true
        );
        const hasSelectedQty = Number.isFinite(selectedQty) && selectedQty > 0;
        const hasPositiveFallbackQty = Number.isFinite(fallbackQty) && fallbackQty > 0;

        if (!optionName || isLikelyNoiseText(optionName)) {
          continue;
        }

        // If this group exposes explicit selection signals, trust only those signals.
        // Otherwise, treat positive generic quantity as selected (selected-only payload shape).
        const isSelected = groupHasSelectionSignals
          ? (isExplicitlySelected || hasSelectedQty)
          : (isExplicitlySelected || hasSelectedQty || hasPositiveFallbackQty);

        if (!isSelected) {
          continue;
        }

        let normalizedQty = 1;
        if (hasSelectedQty) {
          normalizedQty = selectedQty;
        } else if (hasPositiveFallbackQty) {
          normalizedQty = fallbackQty;
        }

        const selected = selectPriceCandidate(option);
        const priceText = formatPrice(selected.value) || null;
        const unitPriceValue = parseMoneyToNumber(priceText);
        const linePriceValue = Number.isFinite(unitPriceValue)
          ? Number((unitPriceValue * normalizedQty).toFixed(2))
          : null;

        const label = Number.isFinite(linePriceValue)
          ? `${optionName} (+${formatSubtotal(linePriceValue)})`
          : optionName;

        details.push({
          key: `${optionName.toLowerCase()}::${normalizedQty}::${priceText || ''}`,
          label,
          linePriceValue
        });
      }
    }

    return details;
  };

  const addBaseItem = (item) => {
    if (!item || typeof item !== 'object') {
      return;
    }

    const name = cleanText(item.title || item.name || item.itemName || '');
    if (!name || isLikelyNoiseText(name)) {
      return;
    }

    const quantity = parseQuantity(item.quantity);
    const itemId = cleanText(item.shoppingCartItemUuid || item.shoppingCartItemUUID || item.itemUuid || item.uuid || '');
    const key = itemId || `${name}::${quantity}`;

    let record = byKey.get(key);
    if (!record) {
      record = {
        name,
        quantity,
        itemId: itemId || null,
        imageUrl: cleanText(item.imageURL || item.imageUrl || item.image_url || ''),
        priceText: null,
        isUnitPrice: true,
        modifiers: new Set(),
        modifierKeys: new Set(),
        addOnsTotalValue: 0
      };

      const selected = selectPriceCandidate(item);
      const selectedPriceText = formatPrice(selected.value) || null;
      if (selectedPriceText) {
        record.priceText = selectedPriceText;
        record.isUnitPrice = selected.isUnitPrice !== false;
      }

      byKey.set(key, record);
    } else if (!record.imageUrl) {
      const candidateImageUrl = cleanText(item.imageURL || item.imageUrl || item.image_url || '');
      if (candidateImageUrl) {
        record.imageUrl = candidateImageUrl;
      }
    }

    if (!record.itemId && itemId) {
      record.itemId = itemId;
    }

    if (!record.priceText) {
      const selected = selectPriceCandidate(item);
      const candidatePriceText = formatPrice(selected.value);
      if (candidatePriceText) {
        record.priceText = candidatePriceText;
        record.isUnitPrice = selected.isUnitPrice !== false;
      }
    }

    for (const modifier of collectCustomizationDetails(item)) {
      if (!modifier || !modifier.key || record.modifierKeys.has(modifier.key)) {
        continue;
      }

      record.modifierKeys.add(modifier.key);
      record.modifiers.add(modifier.label);
      if (Number.isFinite(modifier.linePriceValue)) {
        record.addOnsTotalValue = Number((record.addOnsTotalValue + modifier.linePriceValue).toFixed(2));
      }
    }
  };

  const cartItems = Array.isArray(shoppingCart.items) ? shoppingCart.items : [];
  for (const item of cartItems) {
    addBaseItem(item);
  }

  const groupedItems = Array.isArray(shoppingCart.groupedItems) ? shoppingCart.groupedItems : [];
  for (const group of groupedItems) {
    if (!group || typeof group !== 'object' || !Array.isArray(group.items)) {
      continue;
    }

    for (const item of group.items) {
      addBaseItem(item);
    }
  }

  return Array.from(byKey.values()).map((entry) => {
    const modifiers = Array.from(entry.modifiers.values());
    const quantity = Number.isFinite(Number(entry.quantity)) && Number(entry.quantity) > 0 ? Number(entry.quantity) : 1;
    const unitPriceValue = parseMoneyToNumber(entry.priceText);
    const baseLineTotalValue = Number.isFinite(unitPriceValue)
      ? Number(((entry.isUnitPrice !== false ? unitPriceValue * quantity : unitPriceValue)).toFixed(2))
      : null;
    const addOnsTotalValue = Number.isFinite(entry.addOnsTotalValue) ? entry.addOnsTotalValue : 0;
    const lineTotalValue = Number.isFinite(baseLineTotalValue)
      ? Number((baseLineTotalValue + addOnsTotalValue).toFixed(2))
      : (addOnsTotalValue > 0 ? Number(addOnsTotalValue.toFixed(2)) : null);
    return {
      name: entry.name,
      quantity,
      _itemId: entry.itemId || null,
      imageUrl: entry.imageUrl || null,
      priceText: entry.priceText || null,
      _isUnitPrice: entry.isUnitPrice !== false,
      _unitPriceValue: Number.isFinite(unitPriceValue) ? unitPriceValue : null,
      _addOnsTotalValue: addOnsTotalValue > 0 ? Number(addOnsTotalValue.toFixed(2)) : null,
      _lineTotalValue: Number.isFinite(lineTotalValue) ? lineTotalValue : null,
      _unitPriceText: Number.isFinite(unitPriceValue) ? formatSubtotal(unitPriceValue) : (entry.priceText || null),
      _lineTotalText: Number.isFinite(lineTotalValue) ? formatSubtotal(lineTotalValue) : (entry.priceText || null),
      notes: modifiers.length > 0 ? `Mods: ${modifiers.join(', ')}` : null
    };
  });
}

