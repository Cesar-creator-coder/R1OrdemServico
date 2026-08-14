let registros = [];
let tipoPessoaAtual = 'pf';

window.addEventListener('DOMContentLoaded', () => {
  aplicarConfiguracoes();
  
  setTimeout(() => {
    const splash = document.getElementById('splash-screen');
    if (splash) splash.classList.add('hide');
  }, 800);
});

function switchType(tipo) {
  tipoPessoaAtual = tipo;
  document.getElementById('btn-pf').classList.toggle('active', tipo === 'pf');
  document.getElementById('btn-pj').classList.toggle('active', tipo === 'pj');
  
  document.querySelectorAll('.field-pf').forEach(el => el.classList.toggle('hidden', tipo !== 'pf'));
  document.querySelectorAll('.field-pj').forEach(el => el.classList.toggle('hidden', tipo !== 'pj'));
  
  document.getElementById('cli-form-title').innerText = `CADASTRO DE CLIENTE (${tipo.toUpperCase()})`;
}

function navigate(modId, el) {
  document.querySelectorAll('.view-module').forEach(m => m.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById(modId).classList.add('active');
  el.classList.add('active');
}

function salvarCliente(e) {
  e.preventDefault();
  const cliCount = parseInt(document.getElementById('dash-cli').innerText || 0) + 1;
  document.getElementById('dash-cli').innerText = cliCount;
  alert(`Cliente (${tipoPessoaAtual.toUpperCase()}) cadastrado com sucesso!`);
  e.target.reset();
}

function gerarOS(e) {
  e.preventDefault();
  const cli = document.getElementById('os-cliente').value;
  const whats = document.getElementById('os-whats').value;
  const tipo = document.getElementById('os-tipo').value;
  const orig = document.getElementById('os-origem').value || 'Não informada';
  const dest = document.getElementById('os-destino').value || 'Não informado';
  const val = parseFloat(document.getElementById('os-valor').value || 0);
  
  const agora = new Date();
  const dtStr = agora.toLocaleDateString('pt-BR') + ' ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const numOS = 'REC-' + Math.floor(1000 + Math.random() * 9000);
  
  document.getElementById('rec-num').innerText = numOS;
  document.getElementById('rec-data').innerText = dtStr;
  document.getElementById('rec-cliente').innerText = cli;
  document.getElementById('rec-valor').innerText = `R$ ${val.toFixed(2)}`;
  document.getElementById('rec-tipo').innerText = tipo;
  document.getElementById('rec-origem').innerText = orig;
  document.getElementById('rec-destino').innerText = dest;
  
  registros.unshift({ numOS, cli, tipo, val, dtStr });
  atualizarDash();
  alert("Ordem e Recibo gerados com sucesso!");
}

function enviarWhats() {
  const cli = document.getElementById('os-cliente').value;
  const whats = document.getElementById('os-whats').value.replace(/\D/g, '');
  const tipo = document.getElementById('os-tipo').value;
  const val = parseFloat(document.getElementById('os-valor').value || 0).toFixed(2);
  
  if (!whats || !cli) return alert("Preencha o Nome e o WhatsApp do cliente!");
  
  const txt = `*${configApp.empresaName} - RECIBO DE SERVIÇO*\n` +
    `----------------------------------\n` +
    `*Cliente:* ${cli}\n` +
    `*Serviço:* ${tipo}\n` +
    `*Valor:* R$ ${val}\n` +
    `----------------------------------\n` +
    `Obrigado pela preferência!`;
  
  window.open(`https://wa.me/55${whats}?text=${encodeURIComponent(txt)}`, '_blank');
}

function atualizarDash() {
  document.getElementById('dash-os').innerText = registros.length;
  const total = registros.reduce((acc, r) => acc + r.val, 0);
  document.getElementById('dash-rec').innerText = `R$ ${total.toFixed(2)}`;
  
  const lista = document.getElementById('os-lista');
  if (registros.length === 0) {
    lista.innerHTML = `<div style="text-align:center; color:var(--text-muted); padding:15px; font-size:0.8rem;">Nenhum registro armazenado.</div>`;
  } else {
    lista.innerHTML = registros.map(r => `
      <div class="recent-item">
        <div>
          <div class="item-title">${r.cli} • ${r.tipo}</div>
          <div class="item-sub"><span><i class="fa-regular fa-clock"></i> ${r.dtStr}</span></div>
        </div>
        <div style="font-weight:bold; color:var(--green);">R$ ${r.val.toFixed(2)}</div>
      </div>
    `).join('');
  }
}

function zerarDados() {
  if (confirm("Deseja zerar os dados de teste?")) {
    registros = [];
    document.getElementById('dash-cli').innerText = "0";
    atualizarDash();
  }
}
