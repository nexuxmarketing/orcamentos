/* =========================================================
   CONFIGURAÇÃO GERAL DA NEXUX — vale para todos os eventos
   ========================================================= */
const NEXUX = {
  whatsapp: "5519994476040",   // 55 + DDD + número, só dígitos
  cidade: "Tambaú/SP",
  validade: "15 dias"
};

/* Ícones (cinza, traço) usados nas páginas */
const ICONES = {
  pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  anel: '<circle cx="12" cy="14" r="6"/><path d="M9 4h6l-3 4z"/>',
  pessoas: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7"/><path d="M18 14a6 6 0 0 1 3.5 6"/>',
  camera: '<path d="M3 8h4l2-3h6l2 3h4v11H3z"/><circle cx="12" cy="13" r="3.5"/>',
  balao: '<path d="M12 3c3.3 0 6 2.6 6 6 0 3.8-3.4 7-6 7s-6-3.2-6-7c0-3.4 2.7-6 6-6z"/><path d="M12 16l-1.2 2h2.4z"/><path d="M12 18c0 1.5-1 2-1 3"/>',
  bolo: '<path d="M4 21h16v-7H4z"/><path d="M4 16c2 1 3 1 4 0s2-1 4 0 3 1 4 0 3-1 4 0"/><path d="M12 14v-4"/><path d="M12 7c.8-.8.8-1.6 0-3-.8 1.4-.8 2.2 0 3z"/>',
  pomba: '<path d="M3 13c3 0 5-2 6-5 1 3 3 5 6 5l6-3-3 5c-2 3-5 5-9 5-3 0-5-1-6-3z"/><circle cx="16" cy="11" r=".6"/>',
  igreja: '<path d="M12 2v4"/><path d="M10 4h4"/><path d="M6 21V11l6-5 6 5v10"/><path d="M10 21v-4a2 2 0 0 1 4 0v4"/><path d="M3 21h18"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.8 7L3 21l2-5.6A8 8 0 1 1 21 12z"/>'
};
function icone(nome, cls) {
  return '<svg class="' + (cls || "ic") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (ICONES[nome] || "") + "</svg>";
}

const LOGO = '<img src="' + (document.body.dataset.evento ? '../' : '') + 'assets/logo.png" alt="Nexux" style="height:46px;width:auto;display:block">';
const BRAND = '<div class="brand">' + LOGO + '<div><div class="n">NEXUX</div><div class="m">MARKETING DIGITAL</div></div></div>';

const WA_ICON = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style="vertical-align:-4px;margin-right:6px"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.3z"/></svg>';

const brl = n => "R$ " + n.toLocaleString("pt-BR");

/* Nome do cliente pelo link: ...?nome=Ana%20Júlia */
function nomeCliente() {
  try { return (new URLSearchParams(location.search).get("nome") || "").trim(); } catch (e) { return ""; }
}
function abrirWhatsApp(texto) {
  const url = "https://wa.me/" + NEXUX.whatsapp + "?text=" + encodeURIComponent(texto);
  const w = window.open(url, "_blank");
  if (!w) location.href = url;
}

/* Calcula o menor preço possível de um evento (para "a partir de") */
function precoInicial(ev) {
  const horas = Object.values(ev.base.horas);
  const p = ev.pacotes.map(pk => calcular(ev, pk.itens, Object.keys(ev.base.horas)[0]).total);
  return Math.min(Math.min(...horas), ...p);
}
function calcular(ev, sel, h) {
  let cheio = ev.base.horas[h];
  ev.itens.forEach(it => { if (sel.includes(it.id)) cheio += it.preco; });
  let desc = 0;
  (ev.descontos || []).forEach(d => { if (d.se.every(id => sel.includes(id))) desc = Math.max(desc, d.valor); });
  return { cheio, desc, total: cheio - desc };
}
