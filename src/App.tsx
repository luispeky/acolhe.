import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CircleHelp,
  ChevronDown,
  Clock3,
  CloudRain,
  CloudSun,
  Heart,
  HeartHandshake,
  Leaf,
  Menu,
  MessageCircle,
  Pause,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  X,
  Waves,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Mood = {
  label: string;
  icon: LucideIcon;
  response: string;
  suggestion: string;
};

type Resource = {
  category: 'Emoções' | 'Autocuidado' | 'Terapia';
  title: string;
  summary: string;
  duration: string;
  icon: LucideIcon;
  content: string;
};

const moods: Mood[] = [
  {
    label: 'Leve',
    icon: Sun,
    response: 'Que bom que hoje tem um pouco de leveza.',
    suggestion: 'Se puder, guarde um instante para perceber o que está fazendo bem.',
  },
  {
    label: 'Mais ou menos',
    icon: CloudSun,
    response: 'Tudo bem não saber exatamente como se sente.',
    suggestion: 'Uma pausa curta e um pouco de gentileza consigo já podem ajudar.',
  },
  {
    label: 'Ansioso(a)',
    icon: CloudRain,
    response: 'A ansiedade pode deixar tudo mais intenso. Você não precisa resolver tudo agora.',
    suggestion: 'Experimente a respiração guiada mais abaixo, no seu próprio ritmo.',
  },
  {
    label: 'Sobrecarregado(a)',
    icon: Waves,
    response: 'Parece que tem muita coisa acontecendo. Você merece apoio também.',
    suggestion: 'Escolha só o próximo passo — e considere dividir o peso com alguém de confiança.',
  },
  {
    label: 'Prefiro não dizer',
    icon: CircleHelp,
    response: 'Você não precisa colocar tudo em palavras para começar a se cuidar.',
    suggestion: 'Explore as práticas com calma. Fique apenas com o que fizer sentido para você.',
  },
];

const resources: Resource[] = [
  {
    category: 'Emoções',
    title: 'Quando a ansiedade aparece',
    summary: 'Pequenos passos para atravessar momentos de preocupação intensa.',
    duration: '4 min de leitura',
    icon: Sparkles,
    content:
      'A ansiedade é uma resposta humana, mas pode ficar difícil quando ocupa todo o espaço. Tente nomear o que está sentindo sem se julgar, voltar a atenção para o que está ao seu redor e escolher apenas uma ação possível para este momento. Se isso tem afetado sua rotina com frequência, conversar com um profissional de saúde pode ajudar.',
  },
  {
    category: 'Autocuidado',
    title: 'Descansar também é cuidado',
    summary: 'Um convite para fazer pausas sem precisar merecê-las.',
    duration: '3 min de leitura',
    icon: Leaf,
    content:
      'Descanso não é prêmio por produtividade: é uma necessidade. Uma pausa pode ser beber água, olhar pela janela, alongar o corpo ou simplesmente não fazer nada por alguns minutos. Não existe uma forma perfeita de descansar. Observe o que é possível hoje e tente respeitar seus limites.',
  },
  {
    category: 'Terapia',
    title: 'Como procurar ajuda psicológica',
    summary: 'Entenda por onde começar e quais caminhos gratuitos existem.',
    duration: '5 min de leitura',
    icon: HeartHandshake,
    content:
      'Você pode começar conversando com uma unidade básica de saúde (UBS) ou com a equipe de Saúde da Família do seu território. A rede pública também conta com os Centros de Atenção Psicossocial (CAPS), que acolhem pessoas em sofrimento psíquico intenso. Pergunte sobre as opções disponíveis na sua região. No atendimento particular, confirme a formação e o registro profissional no Conselho Regional de Psicologia.',
  },
  {
    category: 'Emoções',
    title: 'Colocar limites com gentileza',
    summary: 'Dizer “agora não” também pode ser uma forma de se respeitar.',
    duration: '4 min de leitura',
    icon: ShieldCheck,
    content:
      'Um limite saudável comunica o que você consegue oferecer sem desrespeitar a outra pessoa. Você pode começar com frases simples: “não consigo assumir isso agora”, “preciso pensar antes de responder” ou “posso ajudar de outra forma?”. É normal sentir desconforto ao praticar. Com o tempo, fica mais fácil perceber e expressar suas necessidades.',
  },
  {
    category: 'Autocuidado',
    title: 'Um minuto para voltar ao presente',
    summary: 'Um exercício simples para perceber o que existe ao seu redor.',
    duration: '2 min de leitura',
    icon: Clock3,
    content:
      'Sem pressa, perceba três coisas que você consegue ver, duas que consegue ouvir e uma sensação física que esteja presente. Não é preciso mudar nada. Se prestar atenção ao corpo não for confortável, abra os olhos e escolha apenas um objeto ao seu redor para observar por alguns segundos.',
  },
];

const faqs = [
  {
    question: 'O Acolhe oferece atendimento psicológico?',
    answer:
      'Não. O Acolhe é um espaço informativo e de autocuidado — não realiza consultas, diagnóstico ou acompanhamento profissional. As práticas e conteúdos não substituem o cuidado de um profissional de saúde.',
  },
  {
    question: 'Como encontro atendimento gratuito pelo SUS?',
    answer:
      'Você pode procurar a Unidade Básica de Saúde (UBS) mais próxima e conversar com a equipe. Os Centros de Atenção Psicossocial (CAPS) também fazem parte da rede pública. A disponibilidade e o fluxo de atendimento variam conforme o município.',
  },
  {
    question: 'Preciso estar em crise para buscar apoio?',
    answer:
      'Não. Buscar apoio pode fazer sentido em qualquer momento, inclusive para entender melhor o que você está sentindo ou cuidar de dificuldades do dia a dia. Você pode começar por alguém de confiança, uma UBS ou um profissional de saúde.',
  },
  {
    question: 'O que fazer se eu ou alguém estiver em perigo imediato?',
    answer:
      'Procure um serviço de emergência ou vá a uma UPA ou pronto-socorro. Em situações de urgência médica no Brasil, ligue 192 (SAMU). Para conversar e receber apoio emocional, o CVV atende gratuitamente pelo 188, 24 horas por dia.',
  },
];

const breathingDuration = 14;

function getBreathingPhase(second: number) {
  const position = second % breathingDuration;
  if (position < 4) return { label: 'Inspire', instruction: 'com calma pelo nariz' };
  if (position < 8) return { label: 'Segure', instruction: 'sem forçar' };
  return { label: 'Expire', instruction: 'devagar pela boca' };
}

function App() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathSecond, setBreathSecond] = useState(0);
  const [resourceCategory, setResourceCategory] = useState('Tudo');
  const [resourceSearch, setResourceSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeResource, setActiveResource] = useState<Resource | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isBreathing) return undefined;
    const timer = window.setInterval(() => setBreathSecond((second) => second + 1), 1000);
    return () => window.clearInterval(timer);
  }, [isBreathing]);

  useEffect(() => {
    if (!activeResource) return undefined;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setActiveResource(null);
    }
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [activeResource]);

  const visibleResources = resources.filter((resource) => {
    const categoryMatches = resourceCategory === 'Tudo' || resource.category === resourceCategory;
    const searchMatches = `${resource.title} ${resource.summary}`
      .toLocaleLowerCase('pt-BR')
      .includes(resourceSearch.trim().toLocaleLowerCase('pt-BR'));
    return categoryMatches && searchMatches;
  });
  const phase = getBreathingPhase(breathSecond);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  }

  function toggleBreathing() {
    if (isBreathing) {
      setIsBreathing(false);
      setBreathSecond(0);
      return;
    }
    setBreathSecond(0);
    setIsBreathing(true);
  }

  return (
    <div className="site-shell flex min-h-screen flex-col">
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <header className="site-header">
        <nav className="nav-wrap page-width" aria-label="Navegação principal">
          <a className="brand" href="#inicio" aria-label="Acolhe, início">
            <span className="brand-mark">
              <HeartHandshake size={21} strokeWidth={1.8} />
            </span>
            <span className="brand-wording">
              <span>acolhe<span className="brand-dot">.</span></span>
              <small>saúde emocional</small>
            </span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className={`nav-links${menuOpen ? ' nav-links-open' : ''}`}>
            <a href="#sobre" onClick={() => setMenuOpen(false)}>Nosso espaço</a>
            <a href="#praticas" onClick={() => setMenuOpen(false)}>Práticas</a>
            <a href="#leituras" onClick={() => setMenuOpen(false)}>Conteúdos</a>
            <button className="button button-dark nav-cta" onClick={() => scrollTo('apoio')}>
              Encontrar apoio <ArrowUpRight size={16} />
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-1" id="conteudo">
        <section className="hero-section page-width" id="inicio">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> UM ESPAÇO PARA VOCÊ</div>
            <h1>Seu bem-estar merece <em>espaço.</em></h1>
            <p className="hero-description">
              Um lugar gentil para acolher o que você sente, respirar um pouco e descobrir
              caminhos de cuidado — no seu tempo, do seu jeito.
            </p>
            <div className="hero-actions">
              <button className="button button-dark" onClick={() => scrollTo('como-voce-esta')}>
                Começar por mim <ArrowRight size={17} />
              </button>
              <button className="text-link" onClick={() => scrollTo('sobre')}>
                Conhecer o espaço <ArrowDown size={16} />
              </button>
            </div>
            <div className="hero-note">
              <span className="note-icon"><ShieldCheck size={17} /></span>
              <span>Sem julgamentos. Sem pressa. Um passo de cada vez.</span>
            </div>
          </div>

          <div className="hero-art" aria-label="Ilustração de cuidado e tranquilidade" role="img">
            <div className="art-sun" />
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-leaf leaf-one"><Leaf size={52} strokeWidth={1.2} /></div>
            <div className="art-leaf leaf-two"><Leaf size={35} strokeWidth={1.2} /></div>
            <div className="art-person">
              <div className="person-hair" />
              <div className="person-face"><span /><span /></div>
              <div className="person-body" />
              <div className="person-arm" />
            </div>
            <div className="art-caption caption-top">
              <span className="caption-heart"><Heart size={15} fill="currentColor" /></span>
              <span>Você importa</span>
            </div>
            <div className="art-caption caption-bottom">
              <span className="caption-sparkle"><Sparkles size={16} /></span>
              <span>Um dia de cada vez</span>
            </div>
            <Sparkles className="art-flower flower-one" size={25} aria-hidden="true" />
            <Sparkles className="art-flower flower-two" size={17} aria-hidden="true" />
          </div>
          <div className="hero-scroll" aria-hidden="true"><span /> role para continuar</div>
        </section>

        <section className="mood-section" id="como-voce-esta">
          <div className="page-width mood-wrap">
            <div className="mood-heading">
              <span className="section-kicker">UM CHECK-IN, SEM PRESSA</span>
              <h2>Como você está <em>hoje?</em></h2>
              <p>Não existe resposta certa. Escolha o que mais combina com este momento — ou só passe por aqui.</p>
            </div>
            <div className="mood-options" role="group" aria-label="Como você está se sentindo?">
              {moods.map((mood) => (
                <button
                  className={`mood-option${selectedMood?.label === mood.label ? ' mood-selected' : ''}`}
                  key={mood.label}
                  type="button"
                  aria-pressed={selectedMood?.label === mood.label}
                  onClick={() => setSelectedMood(mood)}
                >
                  <mood.icon className="mood-icon" size={19} strokeWidth={1.7} aria-hidden="true" />
                  <span>{mood.label}</span>
                  {selectedMood?.label === mood.label && <Check size={15} className="mood-check" />}
                </button>
              ))}
            </div>
            {selectedMood ? (
              <div className="mood-response" role="status" aria-live="polite">
                <span className="response-heart"><Heart size={17} /></span>
                <p><strong>{selectedMood.response}</strong> {selectedMood.suggestion}</p>
                <button className="response-close" aria-label="Fechar mensagem" onClick={() => setSelectedMood(null)}>
                  <X size={16} />
                </button>
              </div>
            ) : (
              <p className="mood-privacy">Seu check-in fica só nesta página e não é armazenado.</p>
            )}
          </div>
        </section>

        <section className="intro-section page-width" id="sobre">
          <div className="intro-art">
            <div className="intro-card">
              <div className="intro-card-top"><span>LEMBRETE DE HOJE</span><Heart size={17} /></div>
              <p>Você não precisa ter tudo resolvido para merecer cuidado.</p>
              <div className="intro-card-footer"><span>Leia de novo, se precisar.</span><Sparkles className="tiny-sun" size={18} /></div>
            </div>
            <div className="intro-sticker sticker-one">com carinho <Heart size={14} /></div>
            <div className="intro-sticker sticker-two"><Leaf size={22} /></div>
          </div>
          <div className="intro-copy">
            <span className="section-kicker">PRAZER, SOMOS O ACOLHE</span>
            <h2>Um cantinho para cuidar de <em>você por inteiro.</em></h2>
            <p>
              A vida acontece por dentro também. Criamos este espaço para tornar o cuidado
              emocional mais próximo, com informação clara, práticas simples e caminhos para
              encontrar ajuda quando você precisar.
            </p>
            <div className="value-list">
              <div className="value-item"><span><Heart size={17} /></span><div><strong>Feito com acolhimento</strong><small>Sem pressão para estar bem o tempo todo.</small></div></div>
              <div className="value-item"><span><BookOpen size={17} /></span><div><strong>Informação com cuidado</strong><small>Conteúdos educativos, sem promessas milagrosas.</small></div></div>
              <div className="value-item"><span><ShieldCheck size={17} /></span><div><strong>Respeito à sua história</strong><small>Seu caminho é único, e isso importa.</small></div></div>
            </div>
          </div>
        </section>

        <section className="practice-section" id="praticas">
          <div className="page-width practice-wrap">
            <div className="practice-copy">
              <span className="section-kicker">UM INTERVALO PARA VOCÊ</span>
              <h2>Vamos respirar <em>juntos?</em></h2>
              <p>
                Se for confortável para você, acompanhe este ritmo por alguns ciclos.
                Se não for, tudo bem — pode parar a qualquer momento.
              </p>
              <div className="practice-disclaimer"><ShieldCheck size={16} /> Uma prática de relaxamento, não um tratamento.</div>
            </div>
            <div className="breathing-card">
              <div className="breathing-top"><span><span className="live-dot" /> PRÁTICA GUIADA</span><span>~ 1 min</span></div>
              <div className={`breathing-orb${isBreathing ? ' breathing-active' : ''}`}>
                <div className="orb-ring" />
                <div className="orb-center">
                  <span className="phase-label" aria-live="polite">{isBreathing ? phase.label : 'Um respiro'}</span>
                  <span className="phase-instruction">{isBreathing ? phase.instruction : 'no seu tempo'}</span>
                </div>
              </div>
              <p className="breathing-caption" aria-live="polite">
                {isBreathing ? 'Acompanhe o movimento. Não precisa forçar.' : 'Encontre uma posição confortável.'}
              </p>
              <button className="button button-dark breathing-button" onClick={toggleBreathing}>
                {isBreathing ? <><Pause size={16} /> Pausar prática</> : <><Play size={16} fill="currentColor" /> Começar prática</>}
              </button>
            </div>
            <Sparkles className="practice-decoration decor-one" size={35} aria-hidden="true" />
            <Leaf className="practice-decoration decor-two" size={22} aria-hidden="true" />
          </div>
        </section>

        <section className="support-section page-width" id="apoio">
          <div className="support-intro">
            <span className="section-kicker">VOCÊ NÃO PRECISA IR SÓ</span>
            <h2>Há caminhos para encontrar <em>apoio.</em></h2>
            <p>Buscar ajuda pode começar com uma conversa. Veja algumas possibilidades e escolha a que fizer sentido para você.</p>
          </div>
          <div className="support-grid">
            <article className="support-card support-card-featured">
              <div className="support-icon"><HeartHandshake size={23} /></div>
              <span className="support-label">PELO SUS</span>
              <h3>Comece pela sua UBS</h3>
              <p>Converse com a equipe da Unidade Básica de Saúde do seu bairro. Ela pode acolher você e orientar sobre os serviços disponíveis na sua região.</p>
              <a href="https://www.gov.br/saude/pt-br/composicao/saes/desmad/raps" target="_blank" rel="noreferrer">
                Conhecer a rede de saúde mental <ArrowUpRight size={16} />
              </a>
            </article>
            <article className="support-card">
              <div className="support-icon support-icon-lilac"><MessageCircle size={22} /></div>
              <span className="support-label">CONVERSA E ACOLHIMENTO</span>
              <h3>Fale com o CVV</h3>
              <p>O Centro de Valorização da Vida oferece escuta gratuita e sigilosa, 24 horas por dia.</p>
              <a href="tel:188">Ligar gratuitamente para 188 <ArrowUpRight size={16} /></a>
            </article>
            <article className="support-card">
              <div className="support-icon support-icon-peach"><ShieldCheck size={22} /></div>
              <span className="support-label">ACOMPANHAMENTO</span>
              <h3>Converse com um profissional</h3>
              <p>Um psicólogo pode acompanhar você com cuidado individual. Confira a formação e o registro profissional.</p>
              <a href="https://www.cfp.org.br/" target="_blank" rel="noreferrer">
                Saiba mais sobre psicologia <ArrowUpRight size={16} />
              </a>
            </article>
          </div>
          <div className="emergency-note">
            <span className="emergency-icon"><ShieldCheck size={19} /></span>
            <p><strong>Se houver risco imediato:</strong> procure uma UPA ou pronto-socorro. Para urgência médica, ligue <a href="tel:192">192 (SAMU)</a>. Para conversar, o CVV atende pelo <a href="tel:188">188</a>.</p>
          </div>
        </section>

        <section className="resources-section" id="leituras">
          <div className="page-width">
            <div className="resources-heading">
              <div>
                <span className="section-kicker">PALAVRAS QUE ACOLHEM</span>
                <h2>Conteúdos para ler <em>no seu tempo.</em></h2>
              </div>
              <p>Informação leve e confiável para acompanhar você — sem substituir uma conversa profissional.</p>
            </div>
            <div className="resource-controls">
              <div className="resource-filters" role="group" aria-label="Filtrar conteúdos por tema">
                {['Tudo', 'Emoções', 'Autocuidado', 'Terapia'].map((category) => (
                  <button
                    className={`filter-chip${resourceCategory === category ? ' filter-active' : ''}`}
                    key={category}
                    type="button"
                    aria-pressed={resourceCategory === category}
                    onClick={() => setResourceCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <label className="resource-search">
                <Search size={16} />
                <span className="visually-hidden">Buscar conteúdo</span>
                <input
                  type="search"
                  value={resourceSearch}
                  onChange={(event) => setResourceSearch(event.target.value)}
                  placeholder="Buscar um assunto"
                />
              </label>
            </div>
            {visibleResources.length > 0 ? (
              <div className="resource-grid">
                {visibleResources.map((resource) => {
                  const Icon = resource.icon;
                  return (
                    <button className="resource-card" key={resource.title} onClick={() => setActiveResource(resource)}>
                      <div className="resource-card-top">
                        <span className={`resource-icon resource-icon-${resource.category.toLowerCase()}`}><Icon size={20} /></span>
                        <span className="resource-category">{resource.category}</span>
                        <ArrowUpRight size={17} className="resource-arrow" />
                      </div>
                      <h3>{resource.title}</h3>
                      <p>{resource.summary}</p>
                      <span className="resource-duration"><Clock3 size={14} /> {resource.duration}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="empty-resources" role="status">
                <Search size={21} />
                <p>Nenhum conteúdo encontrado. Tente outro termo ou tema.</p>
                <button onClick={() => { setResourceSearch(''); setResourceCategory('Tudo'); }}>Limpar filtros</button>
              </div>
            )}
          </div>
        </section>

        <section className="faq-section page-width" id="duvidas">
          <div className="faq-aside">
            <span className="section-kicker">PODEMOS AJUDAR?</span>
            <h2>Dúvidas <em>comuns.</em></h2>
            <p>Se a sua pergunta não estiver aqui, procure um serviço de saúde da sua região.</p>
            <button className="text-link faq-link" onClick={() => scrollTo('apoio')}>
              Ver caminhos de apoio <ArrowRight size={16} />
            </button>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div className={`faq-item${openFaq === index ? ' faq-item-open' : ''}`} key={faq.question}>
                <button
                  className="faq-question"
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown size={19} />
                </button>
                {openFaq === index && (
                  <p className="faq-answer" id={`faq-answer-${index}`}>{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="closing-section">
          <div className="closing-inner page-width">
            <Sparkles className="closing-flower" size={34} aria-hidden="true" />
            <span className="section-kicker">VOCÊ PODE VOLTAR SEMPRE</span>
            <h2>Cuidar de si não precisa ser <em>complicado.</em></h2>
            <p>Às vezes, o primeiro passo é só permitir uma pausa.</p>
            <button className="button button-light" onClick={() => scrollTo('como-voce-esta')}>
              Fazer um check-in <ArrowRight size={17} />
            </button>
            <Leaf className="closing-sparkle" size={23} aria-hidden="true" />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-width footer-main">
          <div className="footer-brand">
            <a className="brand brand-footer" href="#inicio">
              <span className="brand-mark"><HeartHandshake size={20} strokeWidth={1.8} /></span>
              <span className="brand-wording">
                <span>acolhe<span className="brand-dot">.</span></span>
                <small>saúde emocional</small>
              </span>
            </a>
            <p>Um espaço gentil para cuidar da saúde emocional — um passo de cada vez.</p>
          </div>
          <div className="footer-column">
            <strong>Explore</strong>
            <a href="#sobre">Nosso espaço</a>
            <a href="#praticas">Práticas</a>
            <a href="#leituras">Conteúdos</a>
          </div>
          <div className="footer-column">
            <strong>Encontre apoio</strong>
            <a href="#apoio">Caminhos de cuidado</a>
            <a href="#duvidas">Perguntas frequentes</a>
            <a href="tel:188">CVV — ligue 188</a>
          </div>
          <div className="footer-reminder">
            <span><Heart size={16} /> Um lembrete</span>
            <p>Este espaço informa e acolhe, mas não substitui atendimento profissional.</p>
          </div>
        </div>
        <div className="page-width footer-bottom">
          <span>© {new Date().getFullYear()} Acolhe. Um projeto de cuidado e informação.</span>
          <a href="https://www.gov.br/saude/pt-br/composicao/saes/desmad/raps" target="_blank" rel="noreferrer">
            Rede de Atenção Psicossocial <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>

      {activeResource && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveResource(null);
          }}
        >
          <section className="resource-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="modal-close" aria-label="Fechar conteúdo" onClick={() => setActiveResource(null)}>
              <X size={20} />
            </button>
            <span className="section-kicker">{activeResource.category} · {activeResource.duration}</span>
            <h2 id="modal-title">{activeResource.title}</h2>
            <p>{activeResource.content}</p>
            <div className="modal-reminder"><Heart size={16} /> Fique apenas com o que fizer sentido para você.</div>
            <button className="button button-dark" onClick={() => setActiveResource(null)}>Fechar leitura <Check size={16} /></button>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
