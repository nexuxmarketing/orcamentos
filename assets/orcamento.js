/* Motor da página de orçamento — não precisa mexer aqui.
   A página do evento define: <body data-evento="casamento"> */
(function () {
  const id = document.body.dataset.evento;
  const ev = EVENTOS[id];
  if (!ev) { document.body.innerHTML = "<p style='padding:40px'>Evento não encontrado.</p>"; return; }

  const nome = nomeCliente();
  const horasLista = Object.keys(ev.base.horas).map(Number);
  let horas = horasLista[0];
  let sel = [];
  const voltar = "../";

  document.title = "Orçamento · " + ev.nome + (nome ? " · " + nome : "") + " · Nexux";

  const chips = [["pin", "<b>" + NEXUX.cidade + "</b>"]].concat(ev.chips)
    .map(c => '<div class="chip">' + icone(c[0]) + c[1] + "</div>").join("");

  document.body.innerHTML = `
  <header class="hero"><div class="wrap">
    ${BRAND}
    <a class="back" href="${voltar}">← Todos os eventos</a>
    ${nome ? `<div class="hello">Olá, ${esc(nome)}!</div>` : ""}
    <h1>Orçamento de <span>${ev.titulo}</span></h1>
    <p>Escolha um dos pacotes prontos ou monte o seu do jeito que preferir. O valor atualiza na hora.</p>
    <div class="chips">${chips}</div>
  </div></header>
  <main class="wrap">
    <h2 class="sec-t">Pacotes prontos</h2>
    <p class="sec-s">Valores com ${horasLista[0]} horas de cobertura. Toque em um pacote para selecionar.</p>
    <div class="grid" id="packs"></div>
    <h2 class="sec-t">Monte o seu</h2>
    <p class="sec-s">Marque só o que você quer. Escolhendo um pacote acima, as opções já vêm marcadas aqui.</p>
    <div class="panel" id="builder">
      <label class="opt locked"><span class="box"></span>
        <div class="txt"><div class="t">${ev.base.nome}</div><div class="d">${ev.base.desc}</div><div class="hours" id="hours"></div></div>
        <div class="v" id="v-base"></div></label>
      ${ev.itens.map(it => `
      <label class="opt" id="opt-${it.id}"><input type="checkbox" data-id="${it.id}"><span class="box"></span>
        <div class="txt"><div class="t">${it.nome}</div><div class="d" id="d-${it.id}">${it.desc}</div></div>
        <div class="v">+ ${brl(it.preco)}</div></label>`).join("")}
    </div>
    <h2 class="sec-t">Como funciona</h2>
    <p class="sec-s">Simples e sem surpresas.</p>
    <div class="info">
      <div class="ib"><div class="k">RESERVA DA DATA</div><div class="big">30%</div><p>de sinal no fechamento. Garante a data e o valor.</p></div>
      <div class="ib"><div class="k">RESTANTE</div><div class="big">70%</div><p>até 30 dias antes do evento.</p></div>
      <div class="ib"><div class="k">HORA EXTRA NO DIA</div><div class="big">${brl(ev.horaExtra)}</div><p>por hora, se passar do horário contratado.</p></div>
    </div>
    <p class="foot">Nexux Marketing Digital · ${NEXUX.cidade} · Proposta válida por ${NEXUX.validade}</p>
  </main>
  <div class="bar"><div class="wrap">
    <div><div class="lab" id="bar-lab"></div><div class="tot" id="tot"></div><div class="sub" id="sub"></div></div>
    <button id="send">${WA_ICON}Enviar no WhatsApp</button>
  </div></div>`;

  const $ = s => document.getElementById(s);
  const boxes = [...document.querySelectorAll("#builder input[data-id]")];
  const item = i => ev.itens.find(x => x.id === i);

  function esc(t) { return t.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
  function mesmo(a, b) { return a.length === b.length && a.every(x => b.includes(x)); }
  function pacoteAtual() { return ev.pacotes.find(p => mesmo(p.itens, sel)); }

  function renderPacks() {
    $("packs").innerHTML = ev.pacotes.map(p => {
      const c = calcular(ev, p.itens, horasLista[0]);
      return `<button class="card" data-id="${p.id}" type="button">
        ${p.selo ? `<span class="badge">${p.selo}</span>` : ""}
        <div class="tag">${p.nome.toUpperCase()}</div><h3>${p.nome}</h3>
        <div class="price">${brl(c.total)}${c.desc ? `<span class="old">${brl(c.cheio)}</span>` : ""}</div>
        <ul>${p.lista.map(b => `<li>${b}</li>`).join("")}</ul>
        <div class="pick">Escolher este</div></button>`;
    }).join("");
    document.querySelectorAll(".card").forEach(el => el.onclick = () => {
      sel = ev.pacotes.find(x => x.id === el.dataset.id).itens.slice();
      update();
      $("builder").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
  function renderHours() {
    $("hours").innerHTML = horasLista.map(h => `<button type="button" data-h="${h}" class="${h === horas ? "on" : ""}">${h} horas<small>${h === horasLista[0] ? "incluso" : "+ " + brl(ev.base.horas[h] - ev.base.horas[horasLista[0]])}</small></button>`).join("");
    document.querySelectorAll("#hours button").forEach(b => b.onclick = e => { e.preventDefault(); horas = +b.dataset.h; update(); });
  }
  function update() {
    // dependências (ex.: takes precisam de teaser + pré-wedding)
    ev.itens.forEach(it => {
      if (!it.requer) return;
      const ok = it.requer.every(r => sel.includes(r));
      if (!ok) sel = sel.filter(x => x !== it.id);
      const box = boxes.find(b => b.dataset.id === it.id);
      box.disabled = !ok;
      $("opt-" + it.id).classList.toggle("off", !ok);
      $("d-" + it.id).textContent = ok ? it.desc : "Precisa de: " + it.requer.map(r => item(r).nome).join(" e ");
    });
    boxes.forEach(b => b.checked = sel.includes(b.dataset.id));
    renderHours();
    $("v-base").textContent = brl(ev.base.horas[horas]);
    const c = calcular(ev, sel, horas), p = pacoteAtual();
    document.querySelectorAll(".card").forEach(el => el.classList.toggle("sel", !!p && horas === horasLista[0] && el.dataset.id === p.id));
    $("bar-lab").textContent = p ? "PACOTE " + p.nome.toUpperCase() + (horas !== horasLista[0] ? " · " + horas + "H" : "") : "MONTADO POR VOCÊ";
    $("tot").textContent = brl(c.total);
    $("sub").innerHTML = (c.desc ? `<span class="disc">Desconto de combo: − ${brl(c.desc)}</span> · ` : "") + "Sinal de 30%: " + brl(Math.round(c.total * .3));
  }
  boxes.forEach(b => b.addEventListener("change", () => {
    const i = b.dataset.id;
    sel = b.checked ? sel.concat(i) : sel.filter(x => x !== i);
    update();
  }));
  $("send").onclick = () => {
    const c = calcular(ev, sel, horas), p = pacoteAtual();
    const l = [(nome ? "Oi! Aqui é " + nome + ". " : "Oi! ") + "Minha escolha no orçamento de " + ev.nome.toLowerCase() + ":",
      p ? "Pacote " + p.nome : "Pacote montado por mim",
      "• " + ev.base.nome + " (" + horas + " horas)"];
    ev.itens.forEach(it => { if (sel.includes(it.id)) l.push("• " + it.nome); });
    l.push("Total: " + brl(c.total));
    abrirWhatsApp(l.join("\n"));
  };

  renderPacks();
  sel = (ev.pacotes.find(p => p.id === ev.padrao) || ev.pacotes[0]).itens.slice();
  update();
})();
