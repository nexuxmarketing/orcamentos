/* =========================================================
   EVENTOS — cada bloco é um tipo de evento.
   Para criar um evento novo: copie um bloco, mude o "id",
   crie a pasta com o mesmo nome e copie o index.html de outra pasta.
   ========================================================= */
const EVENTOS = {

  /* ---------------- CASAMENTO ---------------- */
  casamento: {
    nome: "Casamento",
    titulo: "Casamento",
    icone: "anel",
    resumo: "Civil, cerimônia e festa. Com teaser e ensaio pré-wedding.",
    chips: [["anel", "Civil + festa"], ["camera", "Fotos <b>sem limite</b>"]],
    horaExtra: 150,
    base: {
      nome: "Fotos da festa",
      desc: "Todas as fotos boas editadas · prévia com 10 a 15 fotos em até 48h",
      horas: { 3: 450, 4: 530, 5: 620 }
    },
    itens: [
      { id: "civil",  nome: "Fotos do civil", desc: "Cobertura completa da cerimônia civil, do início ao fim", preco: 150 },
      { id: "teaser", nome: "Vídeo · teaser do casamento", desc: "1 a 1min30 com os melhores momentos, pronto pra postar", preco: 350 },
      { id: "pre",    nome: "Ensaio pré-wedding", desc: "Até 1h30, em 1 locação · fotos do casal antes do grande dia", preco: 250 },
      { id: "takes",  nome: "Takes do pré-wedding no teaser", desc: "Gravamos o casal no ensaio e essas cenas abrem o teaser", preco: 80, requer: ["teaser", "pre"] },
      { id: "making", nome: "Making of", desc: "Fotos de vocês se arrumando antes do civil", preco: 70 }
    ],
    pacotes: [
      { id: "essencial", nome: "Essencial", itens: ["civil"], lista: ["Fotos do civil, do início ao fim", "Fotos da festa", "Prévia em até 48h"] },
      { id: "classico",  nome: "Clássico",  itens: ["civil", "teaser"], lista: ["Tudo do Essencial", "Teaser do casamento em vídeo"] },
      { id: "especial",  nome: "Especial",  itens: ["civil", "teaser", "pre"], selo: "MAIS ESCOLHIDO", lista: ["Tudo do Clássico", "Ensaio pré-wedding"] },
      { id: "completo",  nome: "Completo",  itens: ["civil", "teaser", "pre", "takes", "making"], lista: ["Tudo do Especial", "Takes do ensaio abrindo o teaser", "Making of antes do civil"] }
    ],
    descontos: [
      { se: ["teaser", "pre"], valor: 50 },
      { se: ["civil", "teaser", "pre", "takes", "making"], valor: 60 }
    ],
    padrao: "especial"
  },

  /* ---------------- ANIVERSÁRIO INFANTIL ---------------- */
  "aniversario-infantil": {
    nome: "Aniversário infantil",
    titulo: "Aniversário infantil",
    icone: "balao",
    resumo: "A festa, o parabéns e a decoração. Com ensaio temático e vídeo.",
    chips: [["balao", "Festa infantil"], ["camera", "Fotos <b>sem limite</b>"]],
    horaExtra: 120,
    base: {
      nome: "Fotos da festa",
      desc: "Decoração, convidados, brincadeiras e parabéns · prévia em até 48h",
      horas: { 3: 380, 4: 450, 5: 520 }
    },
    itens: [
      { id: "teaser",  nome: "Vídeo · teaser da festa", desc: "1 min com os melhores momentos, pronto pra postar", preco: 300 },
      { id: "ensaio",  nome: "Ensaio temático", desc: "Ensaio da criança antes da festa (smash the cake ou com o tema)", preco: 200 },
      { id: "decor",   nome: "Fotos da decoração vazia", desc: "Chegamos antes dos convidados para fotografar a mesa e a decoração", preco: 50 },
      { id: "stories", nome: "Stories em tempo real", desc: "Postamos stories da festa enquanto ela acontece", preco: 100 }
    ],
    pacotes: [
      { id: "essencial", nome: "Essencial", itens: [], lista: ["Fotos da festa", "Parabéns completo", "Prévia em até 48h"] },
      { id: "classico",  nome: "Clássico",  itens: ["decor", "teaser"], lista: ["Tudo do Essencial", "Fotos da decoração vazia", "Teaser da festa em vídeo"] },
      { id: "especial",  nome: "Especial",  itens: ["decor", "teaser", "ensaio"], selo: "MAIS ESCOLHIDO", lista: ["Tudo do Clássico", "Ensaio temático da criança"] },
      { id: "completo",  nome: "Completo",  itens: ["decor", "teaser", "ensaio", "stories"], lista: ["Tudo do Especial", "Stories em tempo real"] }
    ],
    descontos: [
      { se: ["teaser", "ensaio"], valor: 40 },
      { se: ["decor", "teaser", "ensaio", "stories"], valor: 60 }
    ],
    padrao: "especial"
  },

  /* ---------------- BATIZADO ---------------- */
  batizado: {
    nome: "Batizado",
    titulo: "Batizado",
    icone: "pomba",
    resumo: "Cerimônia na igreja e recepção com a família.",
    chips: [["igreja", "Igreja + recepção"], ["camera", "Fotos <b>sem limite</b>"]],
    horaExtra: 120,
    base: {
      nome: "Fotos do batizado",
      desc: "Cerimônia, família, padrinhos e recepção · prévia em até 48h",
      horas: { 2: 300, 3: 370, 4: 440 }
    },
    itens: [
      { id: "teaser",  nome: "Vídeo · teaser do batizado", desc: "1 min com os melhores momentos, pronto pra postar", preco: 280 },
      { id: "familia", nome: "Ensaio de família", desc: "Ensaio curto com os pais e o bebê antes ou depois da cerimônia", preco: 150 },
      { id: "making",  nome: "Making of", desc: "Fotos da preparação do bebê e da família em casa", preco: 70 }
    ],
    pacotes: [
      { id: "essencial", nome: "Essencial", itens: [], lista: ["Fotos da cerimônia", "Fotos da recepção", "Prévia em até 48h"] },
      { id: "classico",  nome: "Clássico",  itens: ["teaser"], lista: ["Tudo do Essencial", "Teaser do batizado em vídeo"] },
      { id: "completo",  nome: "Completo",  itens: ["teaser", "familia", "making"], selo: "MAIS ESCOLHIDO", lista: ["Tudo do Clássico", "Ensaio de família", "Making of"] }
    ],
    descontos: [
      { se: ["teaser", "familia", "making"], valor: 50 }
    ],
    padrao: "classico"
  }
};
