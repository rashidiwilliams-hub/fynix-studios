document.addEventListener('DOMContentLoaded', function () {
  var WHATSAPP_NUMBER = '5927135786';

  document.querySelectorAll('.tp-funnel').forEach(initFunnel);

  function initFunnel(root) {
    var serviceName = root.getAttribute('data-service') || 'Fynix Studios';
    var steps = Array.prototype.slice.call(root.querySelectorAll('.tp-funnel-step'));
    var totalSteps = steps.length;
    var progressFill = root.querySelector('.tp-funnel-progress-fill');
    var backBtn = root.querySelector('.tp-funnel-back');
    var nextBtn = root.querySelector('.tp-funnel-next');
    var summaryEl = root.querySelector('.tp-funnel-summary');
    var whatsappLink = root.querySelector('[data-channel="whatsapp"]');

    var current = 0;
    var answers = { budget: '', timeline: '', details: '', name: '', contact: '' };

    function showStep(index) {
      steps.forEach(function (step, i) {
        step.classList.toggle('is-active', i === index);
      });
      if (progressFill) progressFill.style.width = Math.round(((index + 1) / totalSteps) * 100) + '%';
      if (backBtn) backBtn.hidden = index === 0;

      var isLastAnswerable = index === totalSteps - 2;
      var isSummary = index === totalSteps - 1;
      if (nextBtn) nextBtn.hidden = isSummary;
      if (isSummary) buildSummary();
      updateNextState();
      if (isLastAnswerable) updateNextState();
    }

    function updateNextState() {
      if (!nextBtn || nextBtn.hidden) return;
      var step = steps[current];
      var field = step.getAttribute('data-requires');
      if (!field) {
        nextBtn.disabled = false;
        return;
      }
      var fields = field.split(',');
      var allFilled = fields.every(function (f) { return (answers[f] || '').trim().length > 0; });
      nextBtn.disabled = !allFilled;
    }

    // Choice buttons (budget / timeline)
    root.querySelectorAll('.tp-funnel-options').forEach(function (group) {
      var field = group.getAttribute('data-field');
      group.querySelectorAll('.tp-funnel-option').forEach(function (btn) {
        btn.addEventListener('click', function () {
          group.querySelectorAll('.tp-funnel-option').forEach(function (b) { b.classList.remove('is-selected'); });
          btn.classList.add('is-selected');
          answers[field] = btn.textContent.trim();
          updateNextState();
          setTimeout(function () {
            if (current < totalSteps - 1) goTo(current + 1);
          }, 220);
        });
      });
    });

    // Text inputs (details / name / contact)
    root.querySelectorAll('[data-field]').forEach(function (el) {
      var tag = el.tagName.toLowerCase();
      if (tag !== 'textarea' && tag !== 'input') return;
      el.addEventListener('input', function () {
        answers[el.getAttribute('data-field')] = el.value;
        updateNextState();
      });
    });

    function goTo(index) {
      current = Math.max(0, Math.min(totalSteps - 1, index));
      showStep(current);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        if (nextBtn.disabled) return;
        goTo(current + 1);
      });
    }
    if (backBtn) {
      backBtn.addEventListener('click', function () {
        goTo(current - 1);
      });
    }

    function buildMessage() {
      var lines = [
        'New Project Inquiry — ' + serviceName,
        '',
        'Name: ' + (answers.name || '—'),
        'Contact: ' + (answers.contact || '—'),
        'Budget: ' + (answers.budget || '—'),
        'Timeline: ' + (answers.timeline || '—'),
        'Details: ' + (answers.details || '—')
      ];
      return lines.join('\n');
    }

    function buildSummary() {
      if (summaryEl) summaryEl.textContent = buildMessage();
      var message = buildMessage();
      if (whatsappLink) {
        whatsappLink.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
      }
    }

    // Copy-to-clipboard alternative to WhatsApp, e.g. for anyone on desktop
    // without WhatsApp installed.
    var copyBtn = root.querySelector('.tp-funnel-copy');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        var message = buildMessage();
        var done = function () {
          var original = copyBtn.textContent;
          copyBtn.textContent = 'Copied!';
          setTimeout(function () { copyBtn.textContent = original; }, 1800);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(message).then(done).catch(function () {});
        }
      });
    }

    showStep(0);
  }
});
