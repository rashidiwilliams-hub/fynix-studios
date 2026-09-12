// ==========================================================================
// Flowspace — settings.html behavior
// Profile form (persists to flowspace_profile), notification toggles
// (persists to flowspace_notifications). Theme is handled globally by
// app.js's initTheme() against the same .theme-opt buttons used here.
// ==========================================================================

const NOTIFICATION_DEFAULTS = {
  emailUpdates: true,
  taskReminders: true,
  weeklyDigest: false,
  teamMentions: true
};

function getNotificationSettings() {
  try {
    return Object.assign({}, NOTIFICATION_DEFAULTS, JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || '{}'));
  } catch (e) {
    return Object.assign({}, NOTIFICATION_DEFAULTS);
  }
}
function saveNotificationSettings(settings) {
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(settings));
}

function populateProfileForm() {
  const p = getProfile();
  document.getElementById('settingsName').value = p.name || '';
  document.getElementById('settingsRole').value = p.role || '';
  document.getElementById('settingsEmail').value = p.email || '';
  document.getElementById('settingsPhone').value = p.phone || '';
  document.getElementById('settingsBio').value = p.bio || '';
}

function initProfileForm() {
  const form = document.getElementById('profileForm');
  const cancelBtn = document.getElementById('cancelProfileEdit');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('settingsName').value.trim() || CURRENT_USER.name;
    const role = document.getElementById('settingsRole').value.trim() || CURRENT_USER.role;
    const email = document.getElementById('settingsEmail').value.trim() || CURRENT_USER.email;
    const phone = document.getElementById('settingsPhone').value.trim();
    const bio = document.getElementById('settingsBio').value.trim();

    saveProfile({ name, role, email, phone, bio });
    applyProfileToShell();
    populateProfileForm();
    showToast('Profile updated');
  });

  cancelBtn?.addEventListener('click', () => {
    populateProfileForm();
    showToast('Changes discarded');
  });
}

function initNotificationToggles() {
  const settings = getNotificationSettings();
  document.querySelectorAll('.notif-toggle').forEach((input) => {
    input.checked = !!settings[input.dataset.key];
    input.addEventListener('change', () => {
      const current = getNotificationSettings();
      current[input.dataset.key] = input.checked;
      saveNotificationSettings(current);
      showToast('Notification preferences saved');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  populateProfileForm();
  initProfileForm();
  initNotificationToggles();
  // .theme-opt click handling is already wired globally by app.js's initTheme().
});
