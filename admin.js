let cliquesLogo = 0;
let timerCliques = null;

let configApp = JSON.parse(localStorage.getItem('r1_config')) || {
  appName: 'R1 HUB',
  empresaName: 'R1AMOBI LOGÍSTICA',
  cidadeUF: 'Assis - SP',
  primaryColor: '#D50000',
  logoURL: ''
};

function registrarCliqueLogo() {
  cliquesLogo++;
  clearTimeout(timerCliques);
  
  const badge = document.getElementById('click-count-badge');
  if (badge) {
    badge.innerText = `${cliquesLogo}/5`;
    badge.style.opacity = '1';
  }
  
  if (cliquesLogo >= 5) {
    cliquesLogo = 0;
    if (badge) badge.style.opacity = '0';
    abrirAdmin();
  } else {
    timerCliques = setTimeout(() => {
      cliquesLogo = 0;
      if (badge) badge.style.opacity = '0';
    }, 2000);
  }
}

function abrirAdmin() {
  document.getElementById('adm-app-name').value = configApp.appName;
  document.getElementById('adm-empresa-name').value = configApp.empresaName;
  document.getElementById('adm-cidade').value = configApp.cidadeUF;
  document.getElementById('adm-color-picker').value = configApp.primaryColor;
  document.getElementById('admin-modal').style.display = 'flex';
}

function fecharAdmin() {
  document.getElementById('admin-modal').style.display = 'none';
}

function previewNovaLogo(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      configApp.logoURL = evt.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function salvarConfigAdmin() {
  configApp.appName = document.getElementById('adm-app-name').value || 'R1 HUB';
  configApp.empresaName = document.getElementById('adm-empresa-name').value || 'R1AMOBI LOGÍSTICA';
  configApp.cidadeUF = document.getElementById('adm-cidade').value || 'Assis - SP';
  configApp.primaryColor = document.getElementById('adm-color-picker').value || '#D50000';
  
  localStorage.setItem('r1_config', JSON.stringify(configApp));
  aplicarConfiguracoes();
  fecharAdmin();
  alert("Configurações salvas e aplicadas!");
}

function aplicarConfiguracoes() {
  document.documentElement.style.setProperty('--primary', configApp.primaryColor);
  
  const partesNome = configApp.appName.split(' ');
  document.getElementById('app-name-part1').innerText = partesNome[0] || '';
  document.getElementById('app-name-part2').innerText = partesNome.slice(1).join(' ') || '';
  document.getElementById('splash-title-txt').innerText = configApp.appName;
  document.getElementById('rec-empresa-name').innerText = configApp.empresaName;
  document.getElementById('rec-cidade-uf').innerText = configApp.cidadeUF;
  
  if (configApp.logoURL) {
    const imgTag = `<img src="${configApp.logoURL}">`;
    document.getElementById('header-logo-box').innerHTML = imgTag;
    document.getElementById('splash-logo-container').innerHTML = imgTag;
    document.getElementById('recibo-logo-box').innerHTML = `<img src="${configApp.logoURL}" style="max-height:40px;">`;
  }
}
