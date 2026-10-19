import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  CreditCard,
  Heart,
  Landmark,
  MapPin,
  Moon,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sun,
  Ticket,
  UserRound,
  X,
} from 'lucide-react'
import './App.css'

const events = [
  {
    id: 'circo-lunar',
    artist: 'CIRCO LUNAR',
    title: 'Vuelo bajo la gran carpa',
    category: 'Acrobacia aérea',
    date: '2026-10-24T20:00:00-06:00',
    venue: 'Carpa Central',
    city: 'Ciudad de México',
    price: 450,
    vipPrice: 980,
    available: 42,
    image: 'https://images.unsplash.com/photo-1787661403706-3a5569d30c79?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Acróbata aérea actuando con telas rojas bajo luces de escenario',
    tag: 'ÚLTIMOS LUGARES',
  },
  {
    id: 'circo-fantasia',
    artist: 'CIRCO FANTASÍA',
    title: 'Aventura para toda la familia',
    category: 'Familiar',
    date: '2026-10-31T20:30:00-06:00',
    venue: 'Carpa del Parque Metropolitano',
    city: 'Guadalajara',
    price: 380,
    vipPrice: 820,
    available: 86,
    image: 'https://images.unsplash.com/photo-1589982790148-3b281287d529?auto=format&fit=crop&w=1100&q=85',
    imageAlt: 'Artista circense con chaqueta naranja haciendo equilibrio sobre una esfera',
    tag: 'NUEVA FUNCIÓN',
  },
  {
    id: 'circo-aereo',
    artist: 'CIRCO AÉREO',
    title: 'Dos cuerpos, un solo vuelo',
    category: 'Acrobacia aérea',
    date: '2026-11-07T21:00:00-06:00',
    venue: 'Explanada Fundidora',
    city: 'Monterrey',
    price: 520,
    vipPrice: 1100,
    available: 118,
    image: 'https://images.unsplash.com/photo-1762271232481-30bd8d3342fa?auto=format&fit=crop&w=1100&q=85',
    imageAlt: 'Dos acróbatas realizando una rutina de telas aéreas',
    tag: 'EN CARTELERA',
  },
  {
    id: 'circo-estelar',
    artist: 'CIRCO ESTELAR',
    title: 'La cuerda de las maravillas',
    category: 'Equilibrismo',
    date: '2026-11-14T20:00:00-06:00',
    venue: 'Carpa Estelar',
    city: 'Puebla',
    price: 420,
    vipPrice: 900,
    available: 64,
    image: 'https://images.unsplash.com/photo-1645287681218-2162a46b0299?auto=format&fit=crop&w=1100&q=85',
    imageAlt: 'Acróbata suspendida en el aire sobre una cuerda durante un acto circense',
    tag: 'EN CARTELERA',
  },
  {
    id: 'mundo-de-ilusiones',
    artist: 'MUNDO DE ILUSIONES',
    title: 'Magia, humor y asombro',
    category: 'Magia y comedia',
    date: '2026-11-21T20:30:00-06:00',
    venue: 'Teatro del Parque',
    city: 'León',
    price: 350,
    vipPrice: 760,
    available: 31,
    image: 'https://images.unsplash.com/photo-1645287642975-fb04fa89347a?auto=format&fit=crop&w=1100&q=85',
    imageAlt: 'Artista de circo ejecutando un acto aéreo sobre el escenario',
    tag: 'AFORO LIMITADO',
  },
  {
    id: 'circo-de-una-pista',
    artist: 'CIRCO DE UNA PISTA',
    title: 'Equilibrio al límite',
    category: 'Acrobacia',
    date: '2026-12-05T21:00:00-06:00',
    venue: 'Carpa del Jardín Norte',
    city: 'Querétaro',
    price: 400,
    vipPrice: 850,
    available: 102,
    image: 'https://images.unsplash.com/photo-1786741269791-587abb1d7e6e?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Artista circense haciendo equilibrio sobre un pedestal',
    tag: 'PRÓXIMAMENTE',
  },
]

const categories = ['Todos', 'Acrobacia aérea', 'Familiar', 'Magia y comedia', 'Equilibrismo', 'Acrobacia']
const money = (amount) =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(amount)
const dateLabel = (date, options = { day: '2-digit', month: 'short' }) =>
  new Intl.DateTimeFormat('es-MX', options.hour ? { ...options, hourCycle: 'h23' } : options).format(new Date(date))
const imageUrl = (source, width = 900) =>
  source.startsWith('https://') ? source : `https://images.unsplash.com/${source}?auto=format&fit=crop&w=${width}&q=85`
const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}
const createReceiptId = () => `BT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
const createReceiptDate = () => new Date().toISOString()

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('boleto-theme') || 'light')
  const [curtainOpening, setCurtainOpening] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [activeCity, setActiveCity] = useState('Todas las ciudades')
  const [page, setPage] = useState('events')
  const [heroIndex, setHeroIndex] = useState(0)
  const [previousHeroIndex, setPreviousHeroIndex] = useState(null)
  const [heroPaused, setHeroPaused] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedType, setSelectedType] = useState('general')
  const [ticketQuantity, setTicketQuantity] = useState(1)
  const [cart, setCart] = useState(() => readStorage('ticketstar-circus-cart', []))
  const [purchases, setPurchases] = useState(() => readStorage('ticketstar-circus-purchases', []))
  const [inventory, setInventory] = useState(() => readStorage('ticketstar-circus-inventory', {}))
  const [user, setUser] = useState(() => readStorage('boleto-user', null))
  const [accountOpen, setAccountOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [successPurchase, setSuccessPurchase] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [authMode, setAuthMode] = useState('login')
  const [favorites, setFavorites] = useState(() => readStorage('ticketstar-circus-favorites', []))
  const [notice, setNotice] = useState('')
  const heroEvent = events[heroIndex]
  const previousHeroEvent = previousHeroIndex === null ? null : events[previousHeroIndex]

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('boleto-theme', theme)
  }, [theme])

  useEffect(() => localStorage.setItem('ticketstar-circus-cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('ticketstar-circus-purchases', JSON.stringify(purchases)), [purchases])
  useEffect(() => localStorage.setItem('ticketstar-circus-inventory', JSON.stringify(inventory)), [inventory])
  useEffect(() => localStorage.setItem('ticketstar-circus-favorites', JSON.stringify(favorites)), [favorites])
  useEffect(() => {
    if (user) localStorage.setItem('boleto-user', JSON.stringify(user))
    else localStorage.removeItem('boleto-user')
  }, [user])

  useEffect(() => {
    if (heroPaused) return undefined
    const interval = window.setInterval(() => {
      setPreviousHeroIndex(heroIndex)
      setHeroIndex((heroIndex + 1) % events.length)
    }, 6000)
    return () => window.clearInterval(interval)
  }, [heroIndex, heroPaused])

  useEffect(() => {
    if (previousHeroIndex === null) return undefined
    const timeout = window.setTimeout(() => setPreviousHeroIndex(null), 900)
    return () => window.clearTimeout(timeout)
  }, [heroIndex, previousHeroIndex])

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedEvent(null)
        setAccountOpen(false)
        setCheckoutOpen(false)
        setSuccessPurchase(null)
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const filteredEvents = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase('es-MX')
    return events.filter((event) => {
      const matchesQuery = !query ||
        `${event.artist} ${event.title} ${event.category} ${event.venue} ${event.city}`.toLocaleLowerCase('es-MX').includes(query)
      const matchesCategory = activeCategory === 'Todos' || event.category === activeCategory
      const matchesCity = activeCity === 'Todas las ciudades' || event.city === activeCity
      return matchesQuery && matchesCategory && matchesCity
    })
  }, [searchTerm, activeCategory, activeCity])

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce((total, item) => {
    const event = events.find((concert) => concert.id === item.eventId)
    return total + (event ? (item.ticketType === 'vip' ? event.vipPrice : event.price) * item.quantity : 0)
  }, 0)

  const availableTickets = (event) => inventory[event.id] ?? event.available

  const changeHeroSlide = (nextIndex) => {
    const normalizedIndex = (nextIndex + events.length) % events.length
    if (normalizedIndex === heroIndex) return
    setPreviousHeroIndex(heroIndex)
    setHeroIndex(normalizedIndex)
  }

  const openEvent = (event) => {
    setSelectedEvent(event)
    setSelectedType('general')
    setTicketQuantity(1)
  }

  const addToCart = () => {
    const currentEvent = selectedEvent
    if (!currentEvent) return
    const alreadyInCart = cart.find((item) => item.eventId === currentEvent.id)?.quantity ?? 0
    if (ticketQuantity + alreadyInCart > availableTickets(currentEvent)) {
      setNotice('La cantidad supera los boletos disponibles.')
      return
    }
    setCart((items) => {
      const existing = items.find((item) => item.eventId === currentEvent.id)
      if (existing) {
        return items.map((item) => item.eventId === currentEvent.id
          ? { ...item, quantity: item.quantity + ticketQuantity, ticketType: selectedType }
          : item)
      }
      return [...items, { eventId: currentEvent.id, quantity: ticketQuantity, ticketType: selectedType }]
    })
    setSelectedEvent(null)
    setNotice('Agregamos tus boletos al carrito.')
    setCheckoutOpen(true)
  }

  const updateCartQuantity = (eventId, nextQuantity) => {
    const event = events.find((concert) => concert.id === eventId)
    if (!event || nextQuantity < 1) {
      setCart((items) => items.filter((item) => item.eventId !== eventId))
      return
    }
    if (nextQuantity > availableTickets(event)) {
      setNotice(`Solo quedan ${availableTickets(event)} boletos para ${event.artist}.`)
      return
    }
    setCart((items) => items.map((item) => item.eventId === eventId ? { ...item, quantity: nextQuantity } : item))
  }

  const completePurchase = (event) => {
    event.preventDefault()
    const order = {
      id: createReceiptId(),
      date: createReceiptDate(),
      paymentMethod,
      buyer: user?.name || event.currentTarget.elements.name.value,
      email: user?.email || event.currentTarget.elements.email.value,
      items: cart.map((item) => ({ ...item })),
      total: cartTotal,
    }
    const purchasedCounts = Object.fromEntries(cart.map((item) => [item.eventId, item.quantity]))
    setInventory((current) => Object.fromEntries(
      events.map((concert) => [concert.id, Math.max(0, (current[concert.id] ?? concert.available) - (purchasedCounts[concert.id] ?? 0))]),
    ))
    setPurchases((current) => [order, ...current])
    setCart([])
    setCheckoutOpen(false)
    setSuccessPurchase(order)
  }

  const submitAccount = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const nextUser = {
      name: form.elements.name?.value || form.elements.email.value.split('@')[0],
      email: form.elements.email.value,
    }
    setUser(nextUser)
    setAccountOpen(false)
    setNotice(`Hola, ${nextUser.name}. Tu cuenta está lista en este dispositivo.`)
  }

  const toggleFavorite = (eventId) => {
    setFavorites((current) => current.includes(eventId)
      ? current.filter((id) => id !== eventId)
      : [...current, eventId])
  }

  const browseEvents = () => {
    setPage('events')
    document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })
  }

  const formatEventDate = (date) => dateLabel(date, { weekday: 'short', day: 'numeric', month: 'short' })

  return (
    <div className="app-shell">
      {!hasEntered && <div className={`curtain-intro${curtainOpening ? ' is-opening' : ''}`} role="dialog" aria-modal="true" aria-labelledby="curtain-title">
        <div className="curtain-panel curtain-panel-left" onAnimationEnd={(event) => { if (event.animationName === 'curtain-sweep-left') setHasEntered(true) }} />
        <div className="curtain-panel curtain-panel-right" />
        <div className="curtain-valance" />
        <div className="curtain-welcome">
          <span className="curtain-kicker">TICKET STAR PRESENTA</span>
          <h1 id="curtain-title">La función<br />está por comenzar</h1>
          <p>Una noche de asombro te espera bajo la gran carpa.</p>
          <button className="curtain-button" type="button" autoFocus disabled={curtainOpening} onClick={() => setCurtainOpening(true)}>
            <Ticket size={18} /> Abrir la carpa <ArrowRight size={17} />
          </button>
          <span className="curtain-footnote">ACROBACIA · MAGIA · MARAVILLA</span>
        </div>
      </div>}
      <div className={`announcement${hasEntered ? ' is-visible' : ''}`} inert={!hasEntered}><span className="announcement-dot" /> Cada función, una aventura <span className="announcement-divider">/</span> <a href="#events">Descubre la próxima función <ArrowRight size={13} /></a></div>
      <header className={`site-header${hasEntered ? ' is-visible' : ''}`} inert={!hasEntered}>
        <a className="brand" href="#top" aria-label="Ticket Star, inicio" onClick={() => setPage('events')}>
          <span className="brand-mark"><Ticket size={22} strokeWidth={2.2} /></span>
          <span>Ticket Star</span>
        </a>
        <nav className="desktop-nav" aria-label="Navegación principal">
          <button className={page === 'events' ? 'nav-link active' : 'nav-link'} onClick={browseEvents}>Funciones</button>
          <a className="nav-link" href="#how-it-works">Cómo funciona</a>
          <a className="nav-link" href="#help">Ayuda</a>
          <button className={page === 'history' ? 'nav-link active' : 'nav-link'} onClick={() => setPage('history')}>Mis boletos</button>
        </nav>
        <div className="header-actions">
          <button className="icon-button theme-toggle" type="button" aria-label={theme === 'light' ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro'} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} title={theme === 'light' ? 'Tema oscuro' : 'Tema claro'}>
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button className="icon-button account-button" type="button" aria-label={user ? `Cuenta de ${user.name}` : 'Iniciar sesión'} title={user ? user.name : 'Iniciar sesión'} onClick={() => setAccountOpen(true)}><UserRound size={18} /></button>
          <button className="cart-button" type="button" onClick={() => setCheckoutOpen(true)} aria-label={`Abrir carrito, ${cartCount} boletos`}>
            <ShoppingBag size={17} /><span className="cart-label">Carrito</span><span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </header>

      {notice && <div className="toast" role="status"><Check size={16} />{notice}<button type="button" aria-label="Cerrar aviso" onClick={() => setNotice('')}><X size={15} /></button></div>}

      {page === 'events' ? (
        <main id="top" className={hasEntered ? 'is-visible' : ''} inert={!hasEntered}>
          <section className="hero-section" aria-labelledby="hero-title">
            <div className="hero-copy">
              <p className="eyebrow"><span /> EMOCIÓN BAJO LA CARPA</p>
              <h1 id="hero-title">La magia<br />se vive <span>en familia.</span></h1>
              <p className="hero-description">Acrobacias, risas y asombro en una función para recordar. Encuentra tu próxima aventura circense.</p>
              <button className="primary-button hero-cta" onClick={browseEvents}>Ver funciones <ArrowRight size={17} /></button>
              <div className="hero-proof"><div className="proof-avatars" aria-hidden="true"><span>JM</span><span>AL</span><span>CR</span><span>+</span></div><p><strong>10 mil+</strong> familias ya encontraron su próxima función</p></div>
            </div>
            <div
              className="hero-visual"
              data-slide={heroEvent.id}
              role="group"
              aria-roledescription="carrusel"
              aria-label="Funciones de circo destacadas"
              onMouseEnter={() => setHeroPaused(true)}
              onMouseLeave={() => setHeroPaused(false)}
              onFocusCapture={() => setHeroPaused(true)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setHeroPaused(false)
              }}
            >
              <img className="hero-slide-current" src={imageUrl(heroEvent.image, 1400)} alt={heroEvent.imageAlt} />
              {previousHeroEvent && <img className="hero-slide-previous" src={imageUrl(previousHeroEvent.image, 1400)} alt="" aria-hidden="true" />}
              <div className="hero-image-shade" />
              <div className="hero-event-chip"><span className="live-pulse" /> PRÓXIMA FUNCIÓN EN {heroEvent.city.toUpperCase()}</div>
              <div className="hero-caption" key={heroEvent.id}><span>{dateLabel(heroEvent.date).toUpperCase()} · {heroEvent.venue.toUpperCase()}</span><strong>{heroEvent.artist}</strong><span>{heroEvent.title}</span></div>
              <button className="hero-previous" type="button" aria-label="Función anterior" onClick={() => changeHeroSlide(heroIndex - 1)}><ArrowRight size={17} /></button>
              <button className="hero-arrow" type="button" aria-label={`Ver función de ${heroEvent.artist}`} onClick={() => openEvent(heroEvent)}><ArrowRight size={19} /></button>
              <div className="hero-image-index">{String(heroIndex + 1).padStart(2, '0')} <span>/ {String(events.length).padStart(2, '0')}</span></div>
              <div className="hero-pagination" role="group" aria-label="Elegir función destacada">
                {events.map((event, index) => <button key={event.id} type="button" aria-label={`Mostrar función de ${event.artist}`} aria-pressed={index === heroIndex} className={index === heroIndex ? 'active' : ''} onClick={() => changeHeroSlide(index)}><span /></button>)}
              </div>
            </div>
          </section>

          <section className="events-section content-width" id="events">
            <div className="section-heading">
              <div><p className="eyebrow"><span /> TU PRÓXIMA AVENTURA</p><h2>Funciones <em>para asombrarte.</em></h2></div>
              <p className="section-aside">Grandes acrobacias, mejores recuerdos.<br />Elige tu función.</p>
            </div>
            <div className="filter-bar">
              <label className="search-field"><Search size={18} /><span className="sr-only">Buscar funciones</span><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Circo, función o ciudad" /></label>
              <label className="select-field"><MapPin size={17} /><span className="sr-only">Filtrar por ciudad</span><select value={activeCity} onChange={(event) => setActiveCity(event.target.value)}><option>Todas las ciudades</option><option>Ciudad de México</option><option>Guadalajara</option><option>Monterrey</option><option>Puebla</option><option>León</option><option>Querétaro</option></select><ChevronDown size={15} /></label>
              <div className="category-filters" aria-label="Filtrar por tipo de función">
                {categories.map((category) => <button type="button" key={category} className={activeCategory === category ? 'category-chip selected' : 'category-chip'} onClick={() => setActiveCategory(category)}>{category}</button>)}
              </div>
            </div>
            <div className="results-row"><span>{filteredEvents.length} funciones</span><span>Ordenadas por fecha <ChevronDown size={14} /></span></div>
            {filteredEvents.length ? <div className="event-grid">
              {filteredEvents.map((event) => <article className="event-card" key={event.id}>
                <button className="event-image-button" onClick={() => openEvent(event)} aria-label={`Ver detalles de la función ${event.artist}`}>
                  <img className="event-image" src={imageUrl(event.image)} alt={event.imageAlt} loading="lazy" />
                  <span className="event-tag">{event.tag}</span>
                </button>
                <button className={favorites.includes(event.id) ? 'favorite-button favorited' : 'favorite-button'} type="button" aria-label={favorites.includes(event.id) ? `Quitar ${event.artist} de favoritos` : `Guardar ${event.artist} en favoritos`} onClick={() => toggleFavorite(event.id)}><Heart size={17} fill={favorites.includes(event.id) ? 'currentColor' : 'none'} /></button>
                <div className="event-card-body">
                  <div className="event-category">{event.category}<span>·</span>{event.city}</div>
                  <h3>{event.artist}</h3><p className="event-tour">{event.title}</p>
                  <div className="event-meta"><span><CalendarDays size={15} />{formatEventDate(event.date)}</span><span><MapPin size={15} />{event.venue}</span></div>
                  <div className="event-card-bottom"><p>Desde <strong>{money(event.price)}</strong></p><button type="button" className="round-arrow" aria-label={`Comprar boletos para ${event.artist}`} onClick={() => openEvent(event)}><ArrowRight size={17} /></button></div>
                  <div className="availability"><span style={{ width: `${Math.max(4, Math.min(56, Math.round((availableTickets(event) / event.available) * 56)))}px` }} /><small>{availableTickets(event)} disponibles</small></div>
                </div>
              </article>)}
            </div> : <div className="empty-results"><Search size={23} /><h3>No encontramos esa función</h3><p>Prueba con otro circo, ciudad o tipo de espectáculo.</p><button className="text-button" onClick={() => { setSearchTerm(''); setActiveCategory('Todos'); setActiveCity('Todas las ciudades') }}>Limpiar filtros</button></div>}
          </section>

          <section className="experience-band" id="how-it-works"><div className="experience-inner content-width">
            <div><p className="eyebrow"><span /> FÁCIL DESDE EL PRIMER CLIC</p><h2>Menos filas.<br /><em>Más asombro.</em></h2><p className="experience-copy">Encuentra una función para compartir en familia. Compra sencilla, confirmación inmediata y tus boletos siempre a la mano.</p><button className="outline-button" onClick={browseEvents}>Encontrar una función <ArrowRight size={16} /></button></div>
            <div className="steps-list"><div className="step-item"><span className="step-number">01</span><div><h3>Elige un espectáculo</h3><p>Busca por circo, ciudad o tipo de función y revisa las fechas disponibles.</p></div><Search size={21} /></div><div className="step-item"><span className="step-number">02</span><div><h3>Elige tus boletos</h3><p>Revisa las zonas, selecciona tus lugares y confirma disponibilidad.</p></div><Ticket size={21} /></div><div className="step-item"><span className="step-number">03</span><div><h3>Disfruta la función</h3><p>Recibe tu comprobante y consulta los detalles de tu visita cuando quieras.</p></div><Check size={21} /></div></div>
          </div></section>

          <section className="help-section content-width" id="help"><div className="help-heading"><p className="eyebrow"><span /> ANTES DE QUE EMPIECE LA FUNCIÓN</p><h2>¿Dudas? <em>Te ayudamos.</em></h2><p>Todo lo que necesitas saber para disfrutar del espectáculo.</p></div><div className="faq-list"><details><summary>¿Cómo recibo mis boletos?<ChevronDown size={17} /></summary><p>Al confirmar tu compra se genera un comprobante con el número de pedido, los datos de la función y la cantidad de boletos. También puedes consultarlo en “Mis boletos”.</p></details><details><summary>¿Puedo elegir mi zona?<ChevronDown size={17} /></summary><p>Sí. En cada función puedes elegir entre Gradas y Preferente, según la disponibilidad del recinto.</p></details><details><summary>¿Cómo sé si quedan lugares?<ChevronDown size={17} /></summary><p>Mostramos la disponibilidad de localidades en cada función y volvemos a comprobarla antes de confirmar la compra.</p></details><details><summary>¿Qué métodos de pago puedo usar?<ChevronDown size={17} /></summary><p>La demostración incluye tarjeta y transferencia como opciones de ejemplo. No se realiza ningún cargo ni se guardan datos financieros.</p></details></div></section>
        </main>
      ) : <main className={`history-page content-width${hasEntered ? ' is-visible' : ''}`} inert={!hasEntered}><p className="eyebrow"><span /> TU HISTORIAL DE FUNCIONES</p><div className="history-title-row"><div><h1>Mis <em>boletos.</em></h1><p>Consulta tus compras y las funciones que tienes próximamente.</p></div><button className="primary-button" onClick={browseEvents}>Explorar funciones <ArrowRight size={17} /></button></div>{purchases.length ? <div className="purchase-list">{purchases.map((purchase) => <article className="purchase-card" key={purchase.id}><div className="purchase-card-head"><div><span className="purchase-status"><Check size={13} /> Compra confirmada</span><h2>Pedido {purchase.id}</h2></div><span>{dateLabel(purchase.date, { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>{purchase.items.map((item) => { const event = events.find((circus) => circus.id === item.eventId); return event ? <div className="purchase-event" key={item.eventId}><img src={imageUrl(event.image, 280)} alt={event.imageAlt} /><div><h3>{event.artist}</h3><p>{event.title}</p><span>{formatEventDate(event.date)} · {event.venue}, {event.city}</span><span>{item.quantity} boleto{item.quantity > 1 ? 's' : ''} · {item.ticketType === 'vip' ? 'VIP' : 'General'}</span></div><strong>{money((item.ticketType === 'vip' ? event.vipPrice : event.price) * item.quantity)}</strong></div> : null })}<div className="purchase-card-foot"><span>Comprobante para {purchase.email}</span><strong>Total pagado: {money(purchase.total)}</strong></div></article>)}</div> : <div className="empty-history"><span className="empty-ticket"><Ticket size={27} /></span><h2>Aún no tienes funciones en tu historial</h2><p>Cuando compres boletos, encontrarás aquí tu comprobante y los detalles de cada espectáculo.</p><button className="primary-button" onClick={browseEvents}>Descubrir funciones <ArrowRight size={17} /></button></div>}</main>}

      <footer className={`site-footer${hasEntered ? ' is-visible' : ''}`} inert={!hasEntered}><div className="footer-main content-width"><a className="brand footer-brand" href="#top" onClick={() => setPage('events')}><span className="brand-mark"><Ticket size={22} /></span><span>Ticket Star</span></a><p>Nos vemos bajo<br />la gran carpa.</p><div className="footer-links"><a href="#events" onClick={() => setPage('events')}>Funciones</a><a href="#how-it-works">Cómo funciona</a><a href="#help">Centro de ayuda</a><button onClick={() => setPage('history')}>Mis boletos</button></div><div className="footer-security"><ShieldCheck size={18} /><span>Compra protegida<br /><small>Tus datos, siempre seguros</small></span></div></div><div className="footer-bottom content-width"><span>© 2026 Ticket Star. Hecho para compartir el asombro.</span><span>Funciones y precios de muestra · No se procesan pagos reales</span></div></footer>

      {selectedEvent && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedEvent(null) }}><section className="event-modal modal-panel" role="dialog" aria-modal="true" aria-labelledby="event-modal-title"><button className="modal-close" type="button" aria-label="Cerrar" onClick={() => setSelectedEvent(null)}><X size={20} /></button><div className="event-modal-image"><img src={imageUrl(selectedEvent.image, 1200)} alt={selectedEvent.imageAlt} /><span className="event-tag">{selectedEvent.tag}</span></div><div className="event-modal-content"><p className="event-category">{selectedEvent.category}<span>·</span>{selectedEvent.city}</p><h2 id="event-modal-title">{selectedEvent.artist}</h2><p className="modal-tour">{selectedEvent.title}</p><div className="modal-event-facts"><span><CalendarDays size={17} />{dateLabel(selectedEvent.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span><span><Clock3 size={17} />{dateLabel(selectedEvent.date, { hour: '2-digit', minute: '2-digit' })} h</span><span><MapPin size={17} />{selectedEvent.venue}, {selectedEvent.city}</span></div><div className="ticket-type-label">ELIGE TU TIPO DE BOLETO <span>{availableTickets(selectedEvent)} disponibles</span></div><div className="ticket-type-options"><button type="button" className={selectedType === 'general' ? 'ticket-type-option chosen' : 'ticket-type-option'} onClick={() => setSelectedType('general')}><span><strong>General</strong><small>Acceso al evento</small></span><strong>{money(selectedEvent.price)}</strong><span className="radio-mark" /></button><button type="button" className={selectedType === 'vip' ? 'ticket-type-option chosen' : 'ticket-type-option'} onClick={() => setSelectedType('vip')}><span><strong>VIP</strong><small>Acceso preferente</small></span><strong>{money(selectedEvent.vipPrice)}</strong><span className="radio-mark" /></button></div><div className="event-modal-buy"><div className="quantity-control"><button type="button" aria-label="Quitar un boleto" onClick={() => setTicketQuantity((quantity) => Math.max(1, quantity - 1))}>−</button><span>{ticketQuantity}</span><button type="button" aria-label="Agregar un boleto" onClick={() => setTicketQuantity((quantity) => Math.min(availableTickets(selectedEvent), quantity + 1))}>+</button></div><button className="primary-button" onClick={addToCart}>Agregar · {money((selectedType === 'vip' ? selectedEvent.vipPrice : selectedEvent.price) * ticketQuantity)} <ArrowRight size={17} /></button></div><p className="secure-note"><ShieldCheck size={15} /> Compra segura · Sin cargos ocultos</p></div></section></div>}

      {checkoutOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCheckoutOpen(false) }}><section className="checkout-modal modal-panel" role="dialog" aria-modal="true" aria-labelledby="checkout-title"><div className="checkout-heading"><div><p className="eyebrow"><span /> CASI ES TUYO</p><h2 id="checkout-title">Tu compra<span>.</span></h2></div><button className="modal-close inline-close" type="button" aria-label="Cerrar" onClick={() => setCheckoutOpen(false)}><X size={20} /></button></div>{cart.length ? <form onSubmit={completePurchase}><div className="checkout-items">{cart.map((item) => { const event = events.find((circus) => circus.id === item.eventId); if (!event) return null; const price = item.ticketType === 'vip' ? event.vipPrice : event.price; return <div className="checkout-item" key={event.id}><img src={imageUrl(event.image, 240)} alt={event.imageAlt} /><div className="checkout-item-info"><strong>{event.artist}</strong><span>{formatEventDate(event.date)} · {event.venue}</span><span>{item.ticketType === 'vip' ? 'VIP' : 'General'} · {money(price)} c/u</span></div><div className="checkout-item-actions"><div className="mini-quantity"><button type="button" aria-label={`Quitar boleto de ${event.artist}`} onClick={() => updateCartQuantity(event.id, item.quantity - 1)}>−</button><span>{item.quantity}</span><button type="button" aria-label={`Agregar boleto de ${event.artist}`} onClick={() => updateCartQuantity(event.id, item.quantity + 1)}>+</button></div><strong>{money(price * item.quantity)}</strong></div></div> })}</div><div className="checkout-contact"><h3>¿A dónde enviamos tu comprobante?</h3>{!user && <label>Nombre completo<input name="name" placeholder="Tu nombre" required autoComplete="name" /></label>}<label>Correo electrónico<input name="email" type="email" placeholder="tu@correo.com" required defaultValue={user?.email || ''} autoComplete="email" /></label></div><fieldset className="payment-options"><legend>Método de pago</legend><label className={paymentMethod === 'card' ? 'payment-option chosen' : 'payment-option'}><input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} /><CreditCard size={18} /><span>Tarjeta<small>Crédito o débito</small></span></label><label className={paymentMethod === 'transfer' ? 'payment-option chosen' : 'payment-option'}><input type="radio" name="payment" value="transfer" checked={paymentMethod === 'transfer'} onChange={() => setPaymentMethod('transfer')} /><Landmark size={18} /><span>Transferencia<small>Pago bancario</small></span></label></fieldset><div className="checkout-total"><span>Total</span><strong>{money(cartTotal)}</strong></div><p className="demo-payment-note"><ShieldCheck size={16} /> Esta es una demostración. No se procesará ningún pago real ni se almacenarán datos bancarios.</p><button className="primary-button checkout-submit" type="submit">Confirmar compra <ArrowRight size={17} /></button></form> : <div className="empty-cart"><ShoppingBag size={26} /><h3>Tu próxima función te espera</h3><p>Elige una función de circo y agrega tus boletos.</p><button type="button" className="primary-button" onClick={() => { setCheckoutOpen(false); browseEvents() }}>Ver funciones <ArrowRight size={16} /></button></div>}</section></div>}

      {accountOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setAccountOpen(false) }}><section className="account-modal modal-panel" role="dialog" aria-modal="true" aria-labelledby="account-title"><button className="modal-close" type="button" aria-label="Cerrar" onClick={() => setAccountOpen(false)}><X size={20} /></button>{user ? <><span className="account-icon"><UserRound size={24} /></span><p className="eyebrow"><span /> TU CUENTA</p><h2 id="account-title">Hola, {user.name}<span>.</span></h2><p className="account-description">{user.email}</p><button className="primary-button account-history-button" onClick={() => { setAccountOpen(false); setPage('history') }}>Ver mis boletos <ArrowRight size={16} /></button><button className="text-button signout-button" onClick={() => { setUser(null); setNotice('Cerraste sesión en este dispositivo.'); setAccountOpen(false) }}>Cerrar sesión</button></> : <><span className="account-icon"><UserRound size={24} /></span><p className="eyebrow"><span /> TU PRÓXIMA AVENTURA</p><h2 id="account-title">{authMode === 'login' ? 'Qué bueno verte' : 'Únete a la carpa'}<span>.</span></h2><p className="account-description">Guarda tus compras y ten los boletos de tus funciones siempre a la mano.</p><form className="account-form" onSubmit={submitAccount}>{authMode === 'signup' && <label>Nombre<input name="name" placeholder="Tu nombre" required autoComplete="name" /></label>}<label>Correo electrónico<input name="email" type="email" placeholder="tu@correo.com" required autoComplete="email" /></label><label>Contraseña<input name="password" type="password" placeholder="Mínimo 6 caracteres" minLength="6" required autoComplete={authMode === 'login' ? 'current-password' : 'new-password'} /></label><button className="primary-button" type="submit">{authMode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'} <ArrowRight size={16} /></button></form><p className="account-switch">{authMode === 'login' ? '¿Primera vez por aquí?' : '¿Ya tienes cuenta?'} <button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}>{authMode === 'login' ? 'Crear cuenta' : 'Iniciar sesión'}</button></p><p className="account-demo-note"><ShieldCheck size={14} /> Cuenta de demostración guardada solo en este dispositivo.</p></>}</section></div>}

      {successPurchase && <div className="modal-backdrop success-backdrop"><section className="success-modal modal-panel" role="dialog" aria-modal="true" aria-labelledby="success-title"><button className="modal-close" type="button" aria-label="Cerrar" onClick={() => setSuccessPurchase(null)}><X size={20} /></button><span className="success-check"><Check size={27} /></span><p className="eyebrow"><span /> TODO LISTO PARA LA FUNCIÓN</p><h2 id="success-title">¡Nos vemos <em>bajo la carpa!</em></h2><p className="success-copy">Tu compra está confirmada. Guarda los detalles de tu pedido.</p><div className="receipt"><div><span>NÚMERO DE PEDIDO</span><strong>{successPurchase.id}</strong></div>{successPurchase.items.map((item) => { const event = events.find((circus) => circus.id === item.eventId); return event ? <div className="receipt-event" key={item.eventId}><Ticket size={18} /><span><strong>{event.artist}</strong><small>{item.quantity} boleto{item.quantity > 1 ? 's' : ''} · {item.ticketType === 'vip' ? 'VIP' : 'General'} · {formatEventDate(event.date)}</small></span></div> : null })}<div><span>COMPROBANTE ENVIADO A</span><strong>{successPurchase.email}</strong></div><div className="receipt-total"><span>TOTAL</span><strong>{money(successPurchase.total)}</strong></div></div><button className="primary-button success-history-button" onClick={() => { setSuccessPurchase(null); setPage('history') }}>Ir a mis boletos <ArrowRight size={16} /></button><p className="receipt-note"><CircleHelp size={14} /> Este comprobante de demostración se conserva en este dispositivo.</p></section></div>}
    </div>
  )
}

export default App
