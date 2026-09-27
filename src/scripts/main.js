/*
 * Interações do site — JavaScript puro, sem bibliotecas.
 * Nenhum dado do visitante é enviado a servidores nem salvo no navegador.
 */
(function () {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scrollBehavior = () => (reduceMotion.matches ? 'auto' : 'smooth');

  // Contatos vêm do cabeçalho (gerado a partir de src/config.js).
  const contactSource = ($('[data-header]') || document.body).dataset;
  const CONTACT = {
    wa: contactSource.waNumber,
    waDisplay: contactSource.waDisplay,
    email: contactSource.email,
  };

  const svg = (paths, size = 18) =>
    `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true" focusable="false">${paths}</svg>`;
  const ICON = {
    check: svg('<path d="M4 12.5l5 5L20 6.5"/>'),
    alert: svg('<path d="M12 3.5l9.5 17h-19z"/><path d="M12 10v5"/><path d="M12 17.25v1"/>'),
  };

  /** Reinicia a animação curta de entrada (desligada com movimento reduzido via CSS). */
  function enter(el) {
    if (!el) return;
    el.classList.remove('is-entering');
    void el.offsetWidth;
    el.classList.add('is-entering');
  }

  function headerHeight() {
    const header = $('[data-header]');
    return header ? header.getBoundingClientRect().height : 0;
  }

  /* Aviso flutuante --------------------------------------------------------- */
  const toastEl = $('[data-toast]');
  let toastTimer;
  function toast(message, icon = 'check') {
    if (!toastEl) return;
    $('[data-toast-icon]', toastEl).innerHTML = ICON[icon] || '';
    $('[data-toast-text]', toastEl).textContent = message;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 4200);
  }

  /* Copiar texto ------------------------------------------------------------ */
  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (err) {
      /* tenta o método alternativo abaixo */
    }
    try {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand('copy');
      area.remove();
      return ok;
    } catch (err) {
      return false;
    }
  }

  function selectText(el) {
    if (!el) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  function flashButton(btn, text, ms = 2600) {
    const label = $('[data-label]', btn);
    if (!label) return;
    if (!btn.dataset.originalLabel) btn.dataset.originalLabel = label.textContent;
    label.textContent = text;
    btn.classList.add('is-copied');
    clearTimeout(btn._flashTimer);
    btn._flashTimer = setTimeout(() => {
      label.textContent = btn.dataset.originalLabel;
      btn.classList.remove('is-copied');
    }, ms);
  }

  $$('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const value = btn.dataset.copy;
      const ok = await copyText(value);
      if (ok) {
        flashButton(btn, btn.dataset.copiedLabel);
        toast(`${btn.dataset.copiedLabel}: ${value}`);
      } else {
        selectText(btn.closest('.channel')?.querySelector('.channel__text'));
        toast('Não foi possível copiar automaticamente. O texto foi selecionado: use Ctrl+C ou “Copiar”.', 'alert');
      }
    });
  });

  /* Menu no celular --------------------------------------------------------- */
  const navToggle = $('[data-nav-toggle]');
  const navPanel = $('[data-nav-panel]');
  const navLabel = $('[data-nav-toggle-label]');
  const desktopNav = window.matchMedia('(min-width: 56em)');

  function setMenu(open, { focusFirst = true } = {}) {
    if (!navToggle || !navPanel) return;
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    navLabel.textContent = open ? 'Fechar' : 'Menu';
    navPanel.classList.toggle('is-open', open);
    if (open && focusFirst) $('a', navPanel)?.focus();
  }

  if (navToggle && navPanel) {
    navToggle.setAttribute('aria-label', 'Abrir menu');
    navToggle.addEventListener('click', () => {
      setMenu(navToggle.getAttribute('aria-expanded') !== 'true');
    });
    navPanel.addEventListener('click', (e) => {
      if (e.target.closest('a')) setMenu(false, { focusFirst: false });
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        navToggle.focus();
      }
    });
    document.addEventListener('click', (e) => {
      if (navToggle.getAttribute('aria-expanded') === 'true' && !e.target.closest('[data-header]')) {
        setMenu(false, { focusFirst: false });
      }
    });
    desktopNav.addEventListener('change', () => setMenu(false, { focusFirst: false }));
  }

  /* Indicação da seção atual ------------------------------------------------ */
  const navLinks = $$('[data-nav-link]');
  const spySections = $$('main > section, .contact');
  let spyTicking = false;

  function updateSpy() {
    spyTicking = false;
    const probe = headerHeight() + window.innerHeight * 0.3;
    let current = null;
    for (const section of spySections) {
      if (section.getBoundingClientRect().top <= probe) current = section;
    }
    let spy = current ? current.dataset.spy || null : null;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom) spy = 'contato';
    navLinks.forEach((link) => {
      if (spy && link.getAttribute('href') === `#${spy}`) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!spyTicking) {
        spyTicking = true;
        requestAnimationFrame(updateSpy);
      }
    },
    { passive: true },
  );
  window.addEventListener('resize', updateSpy);
  updateSpy();

  /* Camadas da abertura (abas) ---------------------------------------------- */
  const layerTabs = $$('[data-layer-tab]');

  function selectLayer(tab, { focus = false } = {}) {
    layerTabs.forEach((t) => {
      const selected = t === tab;
      t.setAttribute('aria-selected', String(selected));
      t.tabIndex = selected ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      panel.removeAttribute('data-initially-hidden');
      panel.hidden = !selected;
      if (selected) enter(panel);
    });
    if (focus) tab.focus();
  }

  if (layerTabs.length) {
    layerTabs.forEach((tab, i) => {
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      panel.removeAttribute('data-initially-hidden');
      panel.hidden = tab.getAttribute('aria-selected') !== 'true';

      tab.addEventListener('click', () => selectLayer(tab));
      tab.addEventListener('keydown', (e) => {
        const last = layerTabs.length - 1;
        let next = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = i === last ? 0 : i + 1;
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = i === 0 ? last : i - 1;
        if (e.key === 'Home') next = 0;
        if (e.key === 'End') next = last;
        if (next !== null) {
          e.preventDefault();
          selectLayer(layerTabs[next], { focus: true });
        }
      });
    });
  }

  /* O que você precisa colocar no ar? --------------------------------------- */
  const needRadios = $$('input[name="need-picker"]');
  const needPanels = $$('[data-need-panel]');

  function showNeed(id, animate = true) {
    needPanels.forEach((panel) => {
      panel.removeAttribute('data-initially-hidden');
      panel.hidden = panel.dataset.needPanel !== id;
      if (!panel.hidden && animate) enter(panel);
    });
  }

  if (needRadios.length) {
    const checked = needRadios.find((r) => r.checked) || needRadios[0];
    showNeed(checked.value, false);
    needRadios.forEach((radio) => radio.addEventListener('change', () => showNeed(radio.value)));
  }

  // Links que apontam para um serviço abrem os detalhes dele.
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-open-service]');
    if (!link) return;
    const details = $(`#servico-${link.dataset.openService} [data-service-details]`);
    if (details) details.open = true;
  });

  /* Briefing ---------------------------------------------------------------- */
  const form = $('[data-briefing]');
  if (form) initBriefing(form);

  function initBriefing(form) {
    const steps = $$('.bf__step', form);
    const segs = $$('[data-progress-item]', form);
    const segLabels = segs.map((s) => $('.bf__seg-label', s).textContent.trim());
    const progressText = $('[data-progress-text]', form);
    const btnBack = $('[data-bf-back]', form);
    const btnNext = $('[data-bf-next]', form);
    const btnNextLabel = $('[data-label]', btnNext);
    const btnReset = $('[data-bf-reset]', form);
    const btnResetLabel = $('[data-label]', btnReset);
    const summaryEl = $('[data-summary]', form);
    const messageEl = $('[data-message]', form);
    const waLink = $('[data-bf-whatsapp]', form);
    const mailLink = $('[data-bf-mail]', form);
    const copyBtn = $('[data-bf-copy]', form);
    const afterEl = $('[data-bf-after]', form);
    const presetEl = $('[data-preset]', form);
    let current = 0;
    let message = '';

    function stepName(i) {
      return steps[i].dataset.step;
    }

    function goTo(i, { focus = true } = {}) {
      current = Math.max(0, Math.min(i, steps.length - 1));
      steps.forEach((step, idx) => {
        step.hidden = idx !== current;
      });
      enter(steps[current]);

      segs.forEach((seg, idx) => {
        seg.classList.toggle('is-done', idx < current);
        seg.classList.toggle('is-current', idx === current);
      });
      progressText.textContent = `Etapa ${current + 1} de ${steps.length} · ${segLabels[current]}`;

      const isSummary = stepName(current) === 'summary';
      btnBack.hidden = current === 0;
      btnNext.hidden = isSummary;
      btnReset.hidden = !isSummary;
      btnNextLabel.textContent = current === steps.length - 2 ? 'Ver resumo' : 'Continuar';
      if (isSummary) renderSummary();
      else afterEl.hidden = true;

      if (focus) {
        const heading = $('[data-step-heading]', steps[current]);
        heading?.focus({ preventScroll: true });
        const top = form.getBoundingClientRect().top;
        if (top < headerHeight()) {
          window.scrollTo({ top: window.scrollY + top - headerHeight() - 16, behavior: scrollBehavior() });
        }
      }
    }

    function unsureLabel(step) {
      const opt = $('input[value="nao-sei"]', step);
      return opt ? opt.dataset.label : 'Não sei ainda';
    }

    function showError(step, text) {
      const err = $('[data-error]', step);
      err.innerHTML = `${ICON.alert}<span>${text}</span>`;
      err.hidden = false;
      $$('input[type="radio"], input[type="checkbox"]', step).forEach((input) =>
        input.setAttribute('aria-invalid', 'true'),
      );
    }

    function clearError(step) {
      const err = $('[data-error]', step);
      if (!err || err.hidden) return;
      err.hidden = true;
      err.textContent = '';
      $$('[aria-invalid]', step).forEach((input) => input.removeAttribute('aria-invalid'));
    }

    function validate(step) {
      if (step.dataset.required !== 'true') return true;
      if ($('input:checked', step)) {
        clearError(step);
        return true;
      }
      const isMulti = step.dataset.stepType === 'checkbox';
      showError(
        step,
        `<strong>Falta uma resposta.</strong> ${isMulti ? 'Marque pelo menos uma opção' : 'Escolha uma opção'} para continuar. Se ainda não tiver certeza, escolha “${unsureLabel(step)}”.`,
      );
      $('input', step)?.focus();
      return false;
    }

    /* Coleta as respostas na ordem das etapas. */
    function collect() {
      const rows = [];
      steps.forEach((step, index) => {
        const type = step.dataset.stepType;
        if (!type) return;
        if (type === 'radio') {
          const checked = $('input:checked', step);
          rows.push({ key: step.dataset.step, label: step.dataset.summaryLabel, value: checked ? checked.dataset.label : '', index });
        }
        if (type === 'checkbox') {
          const values = $$('input:checked', step).map((i) => i.dataset.label);
          rows.push({ key: step.dataset.step, label: step.dataset.summaryLabel, list: values, value: values.join('\n'), index });
        }
        $$('input[type="text"], textarea', step).forEach((field) => {
          const value = field.value.trim();
          const isExtra = type !== 'contact';
          if (isExtra && !value) return; // complementos só aparecem quando preenchidos
          rows.push({ key: field.name, label: field.dataset.summaryLabel, value, index, optional: true });
        });
      });
      return rows;
    }

    function buildMessage(rows, { plain = false } = {}) {
      const b = (t) => (plain ? `${t}` : `*${t}*`);
      const get = (key) => rows.find((r) => r.key === key);
      const name = get('name')?.value;
      const lines = [
        `Olá, Luis!${name ? ` Aqui é ${name}.` : ''} Vim pelo seu site e organizei algumas informações sobre o meu projeto.`,
        '',
      ];
      rows.forEach((row) => {
        if (row.key === 'name' || !row.value) return;
        if (row.list) {
          lines.push(`${b(`${row.label}:`)}`);
          row.list.forEach((item) => lines.push(`• ${item}`));
        } else if (row.key === 'details') {
          lines.push(`${b(`${row.label}:`)}`, row.value);
        } else {
          lines.push(`${b(`${row.label}:`)} ${row.value}`);
        }
      });
      lines.push('', 'Podemos conversar?');
      return lines.join('\n');
    }

    function renderSummary() {
      const rows = collect();
      summaryEl.innerHTML = '';
      rows.forEach((row) => {
        const wrap = document.createElement('div');
        wrap.className = 'bf-summary__row';
        const dt = document.createElement('dt');
        dt.textContent = row.label;
        const dd = document.createElement('dd');
        if (row.value) {
          dd.textContent = row.list ? row.list.map((v) => `• ${v}`).join('\n') : row.value;
        } else {
          dd.textContent = 'Não informado';
          dd.classList.add('is-empty');
        }
        const edit = document.createElement('button');
        edit.type = 'button';
        edit.className = 'bf-summary__edit';
        edit.innerHTML = `Editar<span class="sr-only"> ${row.label}</span>`;
        edit.addEventListener('click', () => goTo(row.index));
        wrap.append(dt, dd, edit);
        summaryEl.append(wrap);
      });

      message = buildMessage(rows);
      messageEl.textContent = message;
      waLink.href = `https://wa.me/${CONTACT.wa}?text=${encodeURIComponent(message)}`;

      const need = rows.find((r) => r.key === 'need')?.value;
      const subject = `Projeto${need ? `: ${need}` : ''}`;
      mailLink.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage(rows, { plain: true }))}`;
    }

    /* Eventos ---------------------------------------------------------------- */
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (stepName(current) === 'summary') return;
      if (validate(steps[current])) goTo(current + 1);
    });

    btnBack.addEventListener('click', () => goTo(current - 1));

    form.addEventListener('change', (e) => {
      const input = e.target;
      const step = input.closest('.bf__step');
      if (input.type === 'checkbox' && input.checked) {
        const group = $$(`input[name="${input.name}"]`, step);
        if (input.hasAttribute('data-exclusive')) {
          group.forEach((other) => { if (other !== input) other.checked = false; });
        } else {
          group.forEach((other) => { if (other.hasAttribute('data-exclusive')) other.checked = false; });
        }
      }
      if (input.name === 'need') presetEl.hidden = true;
      if (step && $('input:checked', step)) clearError(step);
    });

    // Reiniciar pede confirmação na própria página (segundo clique).
    let resetArmed = false;
    let resetTimer;
    btnReset.addEventListener('click', () => {
      if (!resetArmed) {
        resetArmed = true;
        btnResetLabel.textContent = 'Confirmar: apagar respostas';
        clearTimeout(resetTimer);
        resetTimer = setTimeout(disarmReset, 6000);
        return;
      }
      disarmReset();
      clearAll();
      goTo(0);
      toast('Respostas apagadas. Você pode começar de novo.');
    });
    function disarmReset() {
      resetArmed = false;
      btnResetLabel.textContent = 'Recomeçar';
    }

    function clearAll() {
      form.reset();
      presetEl.hidden = true;
      steps.forEach(clearError);
      message = '';
      messageEl.textContent = '';
      waLink.href = `https://wa.me/${CONTACT.wa}`;
    }

    waLink.addEventListener('click', () => {
      afterEl.hidden = false;
      afterEl.textContent = `O WhatsApp deve abrir em outra aba ou no aplicativo com a mensagem pronta. Confira e envie por lá. Se não abrir, use “Copiar mensagem” e envie para ${CONTACT.waDisplay}.`;
    });

    copyBtn.addEventListener('click', async () => {
      if (!message) return;
      const ok = await copyText(message);
      if (ok) {
        flashButton(copyBtn, 'Mensagem copiada');
        toast('Mensagem copiada. Cole no WhatsApp ou no e-mail.');
      } else {
        selectText(messageEl);
        toast('Não foi possível copiar automaticamente. A mensagem foi selecionada: use Ctrl+C ou “Copiar”.', 'alert');
      }
    });

    // Atalhos que iniciam o briefing com uma opção escolhida.
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-briefing-need]');
      if (!trigger) return;
      e.preventDefault();
      const radio = $(`input[name="need"][value="${trigger.dataset.briefingNeed}"]`, form);
      if (radio) {
        radio.checked = true;
        clearError(steps[0]);
        presetEl.hidden = false;
      }
      setMenu(false, { focusFirst: false });
      goTo(0, { focus: false });
      const section = $('#briefing');
      const top = section.getBoundingClientRect().top + window.scrollY - headerHeight();
      window.scrollTo({ top, behavior: scrollBehavior() });
      $('[data-step-heading]', steps[0])?.focus({ preventScroll: true });
    });

    // Não deixar respostas para trás ao sair da página.
    window.addEventListener('pagehide', clearAll);

    goTo(0, { focus: false });
  }
})();
