(function(){
  const root = document.documentElement;

  // --- i18n ---
  const i18n = {
    en: {
      "nav.features":"Features",
      "nav.security":"Security",
      "nav.pricing":"Pricing",
      "nav.faq":"FAQ",
      "nav.compare":"Compare plans",
      "nav.getStarted":"Get started",

      "hero.badge":"Ultra-fast hosting with premium support",
      "hero.h1a":"Launch your website on",
      "hero.h1b":"infrastructure.",
      "hero.lead":"Everything you need to build, host, and scale—optimized servers, free SSL, daily backups, and an intuitive dashboard.",
      "hero.cta1":"Start free migration",
      "hero.cta2":"See pricing",

      "features.title":"Everything you need to ship faster",
      "features.subtitle":"Premium performance, modern tooling, and the controls you expect—without the complexity.",

      "security.title":"Security, backups, and peace of mind",

      "pricing.title":"Pricing that scales with you",
      "pricing.monthly":"Monthly",
      "pricing.annual":"Annual",
      "pricing.save":"Save 20%",

      "order.title":"Quick order",
      "order.subtitle":"Choose a plan, apply a promo code, and pick a payment method. We’ll confirm your order instantly.",
      "order.b1t":"Cash or Visa",
      "order.b1s":"Pay the way you prefer",
      "order.b2t":"Promo codes",
      "order.b2s":"Instant discount applied",
      "order.name":"Full name",
      "order.phone":"Phone",
      "order.email":"Email",
      "order.plan":"Plan",
      "order.payment":"Payment method",
      "order.promo":"Promo code (optional)",
      "order.subtotal":"Subtotal",
      "order.discount":"Discount",
      "order.total":"Total",
      "order.hint":"Tip: Try promo codes <strong>FAST20</strong> or <strong>WELCOME10</strong>.",
      "order.submit":"Place order",
      "order.realNote":"Visa payments require a payment gateway integration (Paymob/Fawry). This demo confirms the order only.",

      "plan.starter":"Starter",
      "plan.business":"Business",
      "plan.cloud":"Cloud",

      "pay.cash":"Cash",
      "pay.visa":"Visa",

      "faq.title":"Frequently asked questions",
      "faq.subtitle":"Everything you might want to know before you migrate.",
      "faq.expand":"Expand all",
      "faq.collapse":"Collapse all",
      "faq.q1":"Can you migrate my website for free?",
      "faq.a1":"Yes. We migrate your site, databases, and email (if applicable) and validate SSL, caching, and DNS with minimal downtime.",
      "faq.q2":"Do you support WordPress, Python, and Node?",
      "faq.a2":"WordPress is one‑click. For Python/Node, you can run WSGI/ASGI apps and deploy via Git or container workflows (depending on plan).",
      "faq.q3":"Is SSL included on all plans?",
      "faq.a3":"Yes—free SSL for every connected domain with automatic renewals and HSTS support.",
      "faq.q4":"What if my traffic spikes?",
      "faq.a4":"Business and Cloud plans include burst capacity and caching rules to keep response times stable during spikes. You can scale anytime.",

      "footer.about":"About",
      "footer.status":"Status",
      "footer.careers":"Careers",
      "footer.contact":"Contact",
      "footer.docs":"Docs",
      "footer.migration":"Migration",
      "footer.blog":"Blog",
      "footer.support":"Support",
    },
    ar: {
      "nav.features":"المميزات",
      "nav.security":"الأمان",
      "nav.pricing":"الأسعار",
      "nav.faq":"الأسئلة",
      "nav.compare":"مقارنة الباقات",
      "nav.getStarted":"ابدأ الآن",

      "hero.badge":"استضافة سريعة جدًا مع دعم مميز",
      "hero.h1a":"شغّل موقعك على",
      "hero.h1b":"بنية تحتية فائقة السرعة.",
      "hero.lead":"كل اللي تحتاجه لبناء واستضافة وتطوير موقعك—سيرفرات محسّنة، SSL مجاني، نسخ احتياطي يومي، ولوحة تحكم سهلة.",
      "hero.cta1":"اطلب نقل مجاني",
      "hero.cta2":"شوف الأسعار",

      "features.title":"كل اللي تحتاجه عشان تطلق أسرع",
      "features.subtitle":"أداء ممتاز وأدوات حديثة وتحكم كامل—بدون تعقيد.",

      "security.title":"أمان ونسخ احتياطي وراحة بال",

      "pricing.title":"أسعار تناسب نموك",
      "pricing.monthly":"شهري",
      "pricing.annual":"سنوي",
      "pricing.save":"وفر 20%",

      "order.title":"طلب سريع",
      "order.subtitle":"اختر الباقة، استخدم برومو كود، وحدد طريقة الدفع. هنأكد طلبك فورًا.",
      "order.b1t":"كاش أو فيزا",
      "order.b1s":"ادفع بالطريقة اللي تناسبك",
      "order.b2t":"برومو كود",
      "order.b2s":"خصم فوري يتطبق تلقائيًا",
      "order.name":"الاسم بالكامل",
      "order.phone":"رقم الموبايل",
      "order.email":"الإيميل",
      "order.plan":"الباقة",
      "order.payment":"طريقة الدفع",
      "order.promo":"برومو كود (اختياري)",
      "order.subtotal":"المجموع",
      "order.discount":"الخصم",
      "order.total":"الإجمالي",
      "order.hint":"جرّب الأكواد: <strong>FAST20</strong> أو <strong>WELCOME10</strong>.",
      "order.submit":"تأكيد الطلب",
      "order.realNote":"دفع الفيزا يحتاج ربط بوابة دفع (Paymob / Fawry). النسخة دي للتأكيد فقط.",

      "plan.starter":"Starter",
      "plan.business":"Business",
      "plan.cloud":"Cloud",

      "pay.cash":"كاش",
      "pay.visa":"فيزا",

      "faq.title":"الأسئلة الشائعة",
      "faq.subtitle":"كل اللي محتاج تعرفه قبل ما تنقل موقعك.",
      "faq.expand":"فتح الكل",
      "faq.collapse":"قفل الكل",
      "faq.q1":"هل تقدروا تنقلوا موقعي مجانًا؟",
      "faq.a1":"نعم. بننقل الموقع وقواعد البيانات والإيميل (لو موجود) وبنراجع SSL والكاش وDNS بدون توقف تقريبًا.",
      "faq.q2":"هل بتدعموا WordPress و Python و Node؟",
      "faq.a2":"WordPress بنقرة واحدة. وبالنسبة لـ Python/Node تقدر تشغّل تطبيقات WSGI/ASGI وتعمل Deploy عن طريق Git أو Containers (حسب الباقة).",
      "faq.q3":"هل SSL متضمن في كل الباقات؟",
      "faq.a3":"نعم—SSL مجاني لكل دومين مع تجديد تلقائي ودعم HSTS.",
      "faq.q4":"ماذا لو زاد الترافيك فجأة؟",
      "faq.a4":"باقات Business و Cloud فيها قدرة Burst وقواعد كاش لتحافظ على الاستجابة ثابتة وقت الضغط، وتقدر تعمل Scale في أي وقت.",

      "footer.about":"من نحن",
      "footer.status":"حالة الخدمة",
      "footer.careers":"وظائف",
      "footer.contact":"تواصل معنا",
      "footer.docs":"الدليل",
      "footer.migration":"نقل الموقع",
      "footer.blog":"المدونة",
      "footer.support":"الدعم",
    }
  };

  function applyI18n(lang){
    const dict = i18n[lang] || i18n.en;
    root.setAttribute('lang', lang === 'ar' ? 'ar' : 'en');
    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = dict[key];
      if (!val) return;
      if (val.includes('<') && val.includes('>')) el.innerHTML = val;
      else el.textContent = val;
    });

    const langToggle = document.getElementById('langToggle');
    if (langToggle) langToggle.textContent = (lang === 'ar') ? 'EN' : 'AR';

    const fullName = document.getElementById('fullName');
    if (fullName) fullName.placeholder = lang === 'ar' ? 'أحمد علي' : 'Ahmed Ali';

    const phone = document.getElementById('phone');
    if (phone) phone.placeholder = lang === 'ar' ? '01X XXX XXXX' : '+20 1X XXX XXXX';
  }

  const savedLang = localStorage.getItem('fh_lang') || 'ar';
  applyI18n(savedLang);

  const langToggle = document.getElementById('langToggle');
  if (langToggle){
    langToggle.addEventListener('click', () => {
      const current = root.getAttribute('lang') || 'en';
      const next = current === 'ar' ? 'en' : 'ar';
      localStorage.setItem('fh_lang', next);
      applyI18n(next);
    });
  }

  // Footer year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (toggle && menu){
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (menu.classList.contains('open')){
          menu.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Smooth scroll (same page anchors only)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // Pricing toggle (monthly vs annual)
  const billingToggle = document.getElementById('billingToggle');
  const amounts = Array.from(document.querySelectorAll('.amount'));
  const perLabels = Array.from(document.querySelectorAll('.per'));
  let isAnnual = false;

  function setBilling(annual){
    isAnnual = !!annual;
    amounts.forEach(el => {
      const v = annual ? el.dataset.year : el.dataset.month;
      if (v) el.textContent = v;
    });
    perLabels.forEach(el => el.textContent = annual ? '/mo (billed yearly)' : '/mo');
    if (billingToggle) billingToggle.setAttribute('aria-pressed', String(annual));
    updateOrderSummary();
  }

  if (billingToggle){
    billingToggle.addEventListener('click', () => {
      const next = billingToggle.getAttribute('aria-pressed') !== 'true';
      setBilling(next);
    });
    setBilling(false);
  }

  // --- FAQ (ROBUST) ---
  const faq = document.querySelector('.faq');
  function setFaqItem(btn, open){
    const ans = btn?.nextElementSibling;
    if (!ans) return;
    btn.setAttribute('aria-expanded', String(open));
    ans.classList.toggle('open', !!open);
  }
  function closeAllFaq(){
    document.querySelectorAll('.faq-q').forEach(btn => setFaqItem(btn, false));
  }
  function openAllFaq(){
    document.querySelectorAll('.faq-q').forEach(btn => setFaqItem(btn, true));
  }

  if (faq){
    faq.addEventListener('click', (e) => {
      const btn = e.target.closest('.faq-q');
      if (!btn) return;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      // toggle only this one (better UX)
      setFaqItem(btn, !expanded);
    });
  }

  const faqExpand = document.getElementById('faqExpand');
  const faqCollapse = document.getElementById('faqCollapse');
  if (faqExpand) faqExpand.addEventListener('click', openAllFaq);
  if (faqCollapse) faqCollapse.addEventListener('click', closeAllFaq);

  // Open first FAQ by default for clarity
  const firstFaq = document.querySelector('.faq-q');
  if (firstFaq) setFaqItem(firstFaq, true);

  // Lead form (demo)
  const form = document.getElementById('leadForm');
  const note = document.getElementById('formNote');
  if (form && note){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const email = (data.get('email') || '').toString();
      const site = (data.get('site') || '').toString();
      const lang = root.getAttribute('lang') || 'en';
      note.textContent = (lang === 'ar')
        ? `✅ تم استلام طلبك! هنتواصل معاك على ${email} بخصوص نقل ${site}.`
        : `✅ Request received! We'll contact ${email} about migrating ${site}.`;
      form.reset();
    });
  }

  // --- Order form: plan pricing + promo code ---
  const planPrices = {
    Starter: { month: 89, year: 71 },
    Business: { month: 179, year: 143 },
    Cloud: { month: 299, year: 239 }
  };

  const promoRules = { "FAST20": 0.20, "WELCOME10": 0.10 };

  const orderForm = document.getElementById('orderForm');
  const orderPlan = document.getElementById('orderPlan');
  const promo = document.getElementById('promo');
  const sumSubtotal = document.getElementById('sumSubtotal');
  const sumDiscount = document.getElementById('sumDiscount');
  const sumTotal = document.getElementById('sumTotal');
  const orderNote = document.getElementById('orderNote');

  function money(n){ return `EGP ${Math.round(n)}`; }

  function calcSubtotal(){
    const plan = orderPlan ? orderPlan.value : 'Starter';
    const p = planPrices[plan] || planPrices.Starter;
    return isAnnual ? p.year : p.month;
  }

  function calcDiscount(subtotal){
    const code = (promo ? promo.value : '').trim().toUpperCase();
    const pct = promoRules[code] || 0;
    return subtotal * pct;
  }

  function updateOrderSummary(){
    if (!sumSubtotal || !sumDiscount || !sumTotal) return;
    const subtotal = calcSubtotal();
    const discount = calcDiscount(subtotal);
    const total = Math.max(0, subtotal - discount);
    sumSubtotal.textContent = money(subtotal);
    sumDiscount.textContent = money(discount);
    sumTotal.textContent = money(total);
  }

  if (orderPlan) orderPlan.addEventListener('change', updateOrderSummary);
  if (promo) promo.addEventListener('input', updateOrderSummary);
  updateOrderSummary();

  if (orderForm && orderNote){
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(orderForm);
      const plan = (data.get('plan') || '').toString();
      const pay = (data.get('payment') || '').toString();
      const code = ((data.get('promo') || '').toString().trim().toUpperCase());

      const subtotal = calcSubtotal();
      const discount = calcDiscount(subtotal);
      const total = Math.max(0, subtotal - discount);

      const lang = root.getAttribute('lang') || 'en';
      const codePart = code ? (lang === 'ar' ? ` | الكود: ${code}` : ` | Promo: ${code}`) : '';
      const billingPart = isAnnual ? (lang === 'ar' ? 'سنوي' : 'Annual') : (lang === 'ar' ? 'شهري' : 'Monthly');

      orderNote.textContent = (lang === 'ar')
        ? `✅ تم تأكيد الطلب: ${plan} (${billingPart}) | الدفع: ${pay} | الإجمالي: ${money(total)}${codePart}`
        : `✅ Order confirmed: ${plan} (${billingPart}) | Payment: ${pay} | Total: ${money(total)}${codePart}`;

      orderForm.reset();
      updateOrderSummary();
    });
  }
})();
