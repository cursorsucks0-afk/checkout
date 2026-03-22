const express = require('express');
const cheerio = require('cheerio');
const { randomUUID } = require('crypto');

const HARDCODED_GROUP_COOKIE = "uev2.id.session_v2=cfa0cf3d-b0d2-414c-984b-011f35c3205d; uev2.ts.session_v2=1774181651906; uev2.embed_theme_preference=dark; uev2.id.xp=407c2d84-48b6-442a-ac56-0278806db8d2; dId=b2f7d13a-29ad-4c7f-bf5a-8bfeb2770a5f; uev2.id.session=d5cae4ca-02fb-4420-af26-a36f546aee4b; uev2.ts.session=1774181653319; uev2.diningMode=DELIVERY; _ua={\"session_id\":\"c0dcb45c-71ca-498d-a5dd-4562399abf2c\",\"session_time_ms\":1774181653459}; marketing_vistor_id=00a12e0e-6bc0-4d14-86ec-ebe96d2b48f0; uev2.gg=true; uev2.unregisteredUserType=DOMAIN_UNCONSTRAINED; uev2.loc=%7B%22latitude%22%3A38.506549%2C%22longitude%22%3A-121.47853799999999%2C%22address%22%3A%7B%22address1%22%3A%226607%20Woodbine%20Ave%22%2C%22address2%22%3A%22%22%2C%22aptOrSuite%22%3A%22%22%2C%22eaterFormattedAddress%22%3A%22%22%2C%22title%22%3A%226607%20Woodbine%20Ave%22%2C%22subtitle%22%3A%22Sacramento%2C%20CA%22%2C%22uuid%22%3A%22%22%7D%2C%22reference%22%3A%22786977c0-3d1b-17ae-928d-4a4b90acb36e%22%2C%22referenceType%22%3A%22uber_places%22%2C%22type%22%3A%22uber_places%22%2C%22addressComponents%22%3A%7B%22countryCode%22%3A%22%22%2C%22firstLevelSubdivisionCode%22%3A%22%22%2C%22city%22%3A%22%22%2C%22postalCode%22%3A%22%22%7D%7D; g_state={\"i_l\":0,\"i_ll\":1774182837189,\"i_b\":\"enXh2aBxolQgxg7YZwrN1m9M0gb0bJr8QzSmrXzrTuw\",\"i_e\":{\"enable_itp_optimization\":1}}; jwt-session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNsYXRlLWV4cGlyZXMtYXQiOjE3NzQxODU0MDA2NzJ9LCJpYXQiOjE3NzQxODE2NTQsImV4cCI6MTc3NDI2ODA1NH0.DIZa6kY3pFwm8TqIPVsfyuPYBezbhmdtVn65o6XAWi4; __cf_bm=WYqLOTzSmlpiSTHszeBWDhzjEiYNni7KFHKZc07G2iM-1774183827-1.0.1.1-iIff1u5IdNYOYZNLT0UUGfhLk20yg.EXeXeIg5de4VnEx8pHaTukyW526MNnj9tjDA7BEWq6X2b1OI7knbD62KZdJXiVZEtbIHVv_xEOpt0; state=JF0333C63bI0EH.1774184772278.TyfvaR+gcQqcreG/Gz0k4KSNeWOrIYMFp18CWc74Imc=; sid=QA.CAESEDmn5i9bHUStjPpCyjBv_Z8YwOWdzwYiATEqJDg3YTQxY2NiLThkMzctNDBlZi1hNzA0LTYzODhiZDdhYjFmNjI80dlkrQgOwOhgeuX-Jf7yrT-vL96ki4K3QOANW9ZYM3hVJCT4Lvd6UNgxyOPMU3Kgc9f21ZD_aMBOuwkWOgExQg0udWJlcmVhdHMuY29t._x781zm8TcxUgmZaddzh7bDuZK5QDRGezIC3e6W67cg; smeta={expiresAt:1776775872774}; udi-id=G50e3gGTCKk/CyoLwg6xGx02XRVYK9qCAE8P4+8Pcz3bZzyhPaqWb6oyD68tbDWbpx8BOz3XoLxmAWz9XMmKhLzAfzntw7RxpKnjvZ+pk3cTx9DeyimHxnDumN4mzRu65rBQYnSwB8CYj1Ol+uZS41N+7rR43vjlC1RHP9ilRfVviCFKxsphxhDpjwxZb78XaeM8OVCJvv41swj4TISUcQ==nhIU/NljwJs/wTlVs2hLrQ==i7yFFGn3Bgem7rPw8EIG6cGpweTqwAj4XqJnwTTLWgY=; uev2.do=1f8fd807-4217-41b5-97b2-042d9ab51d21; u-cookie-prefs=eyJ2ZXJzaW9uIjoxMDAsImRhdGUiOjE3NzQxODQ1ODQ2NDQsImNvb2tpZUNhdGVnb3JpZXMiOlsiYWxsIl0sImltcGxpY2l0Ijp0cnVlfQ%3D%3D; mp_adec770be288b16d9008c964acfba5c2_mixpanel=%7B%22distinct_id%22%3A%20%2287a41ccb-8d37-40ef-a704-6388bd7ab1f6%22%2C%22%24device_id%22%3A%20%2219d1576fb311560-015e971732bd1e8-26061c51-144000-19d1576fb3214b9%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%2C%22%24user_id%22%3A%20%2287a41ccb-8d37-40ef-a704-6388bd7ab1f6%22%7D";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
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

    const result = extractOrderData(html, parsed.toString());
    result.diagnostics.authCookieProvided = useAuthCookie;

    if (useAuthCookie && result.itemCount === 0) {
      const draftOrderFallback = await extractItemsWithDraftOrderByUuid(parsed.toString(), effectiveCookie);
      result.diagnostics.draftOrderByUuidFallback = {
        attempted: true,
        used: false,
        reason: draftOrderFallback.reason || null
      };

      if (draftOrderFallback.ok && Array.isArray(draftOrderFallback.items) && draftOrderFallback.items.length > 0) {
        result.items = draftOrderFallback.items;
        result.itemCount = draftOrderFallback.items.length;
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

  return {
    sourceUrl,
    merchantName: extractionState.merchantName,
    deliveryAddress: extractionState.deliveryAddress,
    hostName: extractionState.hostName,
    items: Array.from(unique.values()),
    itemCount: unique.size,
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

  const priceCandidate =
    candidate.price ??
    candidate.totalPrice ??
    candidate.unitPrice ??
    candidate.subtotal ??
    candidate.amount;

  const priceText = formatPrice(priceCandidate);

  return {
    name,
    quantity,
    priceText,
    notes: readString('description', 'note', 'specialInstructions')
  };
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
    return Number.isFinite(price) ? `$${price.toFixed(2)}` : null;
  }

  if (typeof price === 'object') {
    if (typeof price.displayString === 'string') {
      return cleanText(price.displayString);
    }

    if (typeof price.formattedPrice === 'string') {
      return cleanText(price.formattedPrice);
    }

    const amount = price.amount ?? price.value;
    const currencyCode = price.currencyCode ?? price.currency;

    if (typeof amount === 'number') {
      if (currencyCode && typeof currencyCode === 'string') {
        return `${currencyCode} ${amount.toFixed(2)}`;
      }
      return `$${amount.toFixed(2)}`;
    }
  }

  return null;
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

async function extractItemsWithDraftOrderByUuid(sourceUrl, cookieHeader) {
  const draftOrderUUID = extractDraftOrderUUID(sourceUrl, cookieHeader);
  if (!draftOrderUUID) {
    return {
      ok: false,
      reason: 'missing-draft-order-uuid',
      items: []
    };
  }

  const cookieMap = parseCookieMap(cookieHeader);
  const loc = parseLocationCookie(cookieMap.get('uev2.loc'));

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
        items: []
      };
    }

    const extractedItems = extractItemsFromDraftOrderPayload(json);
    return {
      ok: true,
      reason: extractedItems.length > 0 ? null : 'draft-order-no-item-names',
      items: extractedItems
    };
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : String(error),
      items: []
    };
  }
}

function extractDraftOrderUUID(sourceUrl, cookieHeader) {
  try {
    const parsed = new URL(sourceUrl);
    const match = parsed.pathname.match(/\/group-orders\/([0-9a-fA-F-]{16,})/i);
    if (match && match[1]) {
      return match[1];
    }
  } catch {
    // Ignore URL parse failure and try cookie fallback.
  }

  const cookieMap = parseCookieMap(cookieHeader);
  return cookieMap.get('uev2.do') || null;
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

  const collectCustomizationNames = (item) => {
    const names = [];
    if (!item || typeof item !== 'object' || !item.customizations || typeof item.customizations !== 'object') {
      return names;
    }

    for (const entry of Object.values(item.customizations)) {
      if (!Array.isArray(entry)) {
        continue;
      }

      for (const option of entry) {
        if (!option || typeof option !== 'object') {
          continue;
        }

        const optionName = cleanText(option.title || option.name || option.label || '');
        const optionQtyRaw = option.quantity ?? option.qty ?? option.count ?? null;
        const optionQty = Number(optionQtyRaw);

        if (!optionName || (Number.isFinite(optionQty) && optionQty <= 0) || isLikelyNoiseText(optionName)) {
          continue;
        }

        names.push(optionName);
      }
    }

    return names;
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
    const itemId = cleanText(item.shoppingCartItemUuid || item.uuid || '');
    const key = itemId || `${name}::${quantity}`;

    let record = byKey.get(key);
    if (!record) {
      record = {
        name,
        quantity,
        imageUrl: cleanText(item.imageURL || item.imageUrl || item.image_url || ''),
        modifiers: new Set()
      };
      byKey.set(key, record);
    } else if (!record.imageUrl) {
      const candidateImageUrl = cleanText(item.imageURL || item.imageUrl || item.image_url || '');
      if (candidateImageUrl) {
        record.imageUrl = candidateImageUrl;
      }
    }

    for (const modifier of collectCustomizationNames(item)) {
      record.modifiers.add(modifier);
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
    return {
      name: entry.name,
      quantity: entry.quantity,
      imageUrl: entry.imageUrl || null,
      priceText: null,
      notes: modifiers.length > 0 ? `Mods: ${modifiers.join(', ')} · From draft order API` : 'From draft order API'
    };
  });
}

