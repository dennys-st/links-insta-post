document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('link-form');
  const input = document.getElementById('link-input');
  const container = document.getElementById('links-container');
  const countBadge = document.getElementById('link-count');
  const clearBtn = document.getElementById('clear-all-btn');

  let links = JSON.parse(localStorage.getItem('insta-links')) || [];

  const saveLinks = () => {
    localStorage.setItem('insta-links', JSON.stringify(links));
  };

  const linksParaImportar = [
    "https://www.instagram.com/reel/DVmPgkFgUxi/?igsh=eTVqN3pkMjdnMDNz&igsi=eTVqN3pkMjdnMDNz",
    "https://www.instagram.com/reel/DZED8M_Nv1o/?igsh=MTlxYWxkaDR6NDhlYQ==&igsi=MTlxYWxkaDR6NDhlYQ==",
    "https://www.instagram.com/reel/DOMyig7DcXU/?igsh=MzFsbWJldjg2bWk3&igsi=MzFsbWJldjg2bWk3",
    "https://www.instagram.com/reel/CuIb96qgqHl/?igsh=OHlhMXNrbm9sc21u&igsi=OHlhMXNrbm9sc21u",
    "https://www.instagram.com/reel/DYF4RpoxVYV/?igsh=MTJpcnFyZzQzN29rMw==&igsi=MTJpcnFyZzQzN29rMw==",
    "https://www.instagram.com/reel/DRwpGq_gmsE/?igsh=MTl3dXFzMmMzb3Z5YQ==&igsi=MTl3dXFzMmMzb3Z5YQ==",
    "https://www.instagram.com/reel/DLJI2hhgujp/?igsh=OXlxdzVybnVvczZh&igsi=OXlxdzVybnVvczZh",
    "https://www.instagram.com/reel/Da_DNENpz5R/?igsh=MWZqdDM2Y2owbmJhNQ==&igsi=MWZqdDM2Y2owbmJhNQ==",
    "https://www.instagram.com/reel/DRVStbmkgTN/?igsh=MWJobjduM3poNWh1MQ==&igsi=MWJobjduM3poNWh1MQ==",
    "https://www.instagram.com/reel/DJ5F_CYPOo5/?igsh=NDdtd25iMDVvaGh1&igsi=NDdtd25iMDVvaGh1",
    "https://www.instagram.com/reel/DaVyaI8COcz/?igsh=ZWF3MjdhemdqY2No&igsi=ZWF3MjdhemdqY2No",
    "https://www.instagram.com/reel/DACYcnlS6Pu/?igsh=cnc2bndtMGwwMzFq&igsi=cnc2bndtMGwwMzFq",
    "https://www.instagram.com/reel/DQZ2IFIiObl/?igsh=MTFobm5kb256bXJjcw==&igsi=MTFobm5kb256bXJjcw==",
    "https://www.instagram.com/reel/DZyRoKkOjCe/?igsh=bzgyamdtb2thdGg0&igsi=bzgyamdtb2thdGg0",
    "https://www.instagram.com/reel/DQ4wVN8Acc7/?igsh=MXFsbjFuMHFwa2d0NA==&igsi=MXFsbjFuMHFwa2d0NA==",
    "https://www.instagram.com/reel/DbESEZxC3JU/?igsh=dG00a3k0ZTlid2Nq&igsi=dG00a3k0ZTlid2Nq",
    "https://www.instagram.com/reel/DSm-lrSAKH9/?igsh=YTNhdG9rcXBudGRr&igsi=YTNhdG9rcXBudGRr",
    "https://www.instagram.com/reel/DAQyHx5xdfe/?igsh=MWQybTM5OXgxZDRlNg==&igsi=MWQybTM5OXgxZDRlNg==",
    "https://www.instagram.com/reel/DalGe3wDEqb/?igsh=Zm82YmhicWt3ODNt&igsi=Zm82YmhicWt3ODNt",
    "https://www.instagram.com/reel/DaQcAjUCBud/?igsh=b29uMHl5NTd4ajBh&igsi=b29uMHl5NTd4ajBh",
    "https://www.instagram.com/reel/DZ_hrbJs7Z-/?igsh=MXh6OW9ucjQyejM0bw==&igsi=MXh6OW9ucjQyejM0bw==",
    "https://www.instagram.com/reel/DZz95E2ubSS/?igsh=MWdnZ3hheWxuNzdkNg==&igsi=MWdnZ3hheWxuNzdkNg==",
    "https://www.instagram.com/reel/DbnfygABExB/?igsh=dnIzOXF0OTliaG5p&igsi=dnIzOXF0OTliaG5p",
    "https://www.instagram.com/reel/DJMhiVpAIyQ/?igsh=bnF1dmg3emozbGNx&igsi=bnF1dmg3emozbGNx",
    "https://www.instagram.com/reel/CqRa99FOpnS/?igsh=dDVscTBoZHljMzA=&igsi=dDVscTBoZHljMzA=",
    "https://www.instagram.com/reel/DZK33NMjI07/?igsh=amY5dWE3cDNtNDUw&igsi=amY5dWE3cDNtNDUw",
    "https://www.instagram.com/reel/DYbLWxcyHZv/?igsh=MXZqNmFtaWQxbDBwYg==&igsi=MXZqNmFtaWQxbDBwYg==",
    "https://www.instagram.com/reel/DKTETzysQgL/?igsh=MTd3OWFleTd6bGQxMw==&igsi=MTd3OWFleTd6bGQxMw==",
    "https://www.instagram.com/reel/DM3-7W2gtc-/?igsh=MXQ5aDN3ZHkwYWZyNw==&igsi=MXQ5aDN3ZHkwYWZyNw==",
    "https://www.instagram.com/reel/DYxNCiBxRR-/?igsh=NGJuczQ5c3IxMzlk&igsi=NGJuczQ5c3IxMzlk",
    "https://www.instagram.com/reel/DBGlYSHvuq4/?igsh=NHJtc3F6czkyczgw&igsi=NHJtc3F6czkyczgw",
    "https://www.instagram.com/reel/DPXPpfUjv_u/?igsh=bHBiNnczeHVoZmt5&igsi=bHBiNnczeHVoZmt5",
    "https://www.instagram.com/reel/DJdDK6Ks6LY/?igsh=bms1aTBxcHZ4NXhh&igsi=bms1aTBxcHZ4NXhh",
    "https://www.instagram.com/reel/DVv2N0AjmMG/?igsh=ZGZjMWk1bWhkN2Fv&igsi=ZGZjMWk1bWhkN2Fv",
    "https://www.instagram.com/reel/DYnJVRqDU18/?igsh=OGl3aDEzd3l5MWxy&igsi=OGl3aDEzd3l5MWxy",
    "https://www.instagram.com/reel/DX1Zs56yXKJ/?igsh=MTRvd2NxNXl2NWk4ag==&igsi=MTRvd2NxNXl2NWk4ag==",
    "https://www.instagram.com/reel/C5MZUMrvtXJ/?igsh=c3ZnY2FwNmh3cnVv&igsi=c3ZnY2FwNmh3cnVv",
    "https://www.instagram.com/reel/C9BPZJ1vjGX/?igsh=MWs1eGhlcHh0ZTBydA==&igsi=MWs1eGhlcHh0ZTBydA==",
    "https://www.instagram.com/reel/DP4X_0jgbgj/?igsh=MXhvbDk0OThwNmVjYQ==&igsi=MXhvbDk0OThwNmVjYQ==",
    "https://www.instagram.com/reel/DFG5qmLvQTX/?igsh=M29nZmZlcDJyN2dx&igsi=M29nZmZlcDJyN2dx",
    "https://www.instagram.com/reel/C6WInH0rFdE/?igsh=NHJ1NTQ4cXFobDlw&igsi=NHJ1NTQ4cXFobDlw",
    "https://www.instagram.com/reel/DTasFSejQR9/?igsh=MXVsOGhreWZ5ZnZiZw==&igsi=MXVsOGhreWZ5ZnZiZw==",
    "https://www.instagram.com/reel/DXrAjsRDl-c/?igsh=bGMwbXhjaXphNXIy&igsi=bGMwbXhjaXphNXIy",
    "https://www.instagram.com/reel/CyWmXGFPUC-/?igsh=Mjd3djE1aHluZWk2&igsi=Mjd3djE1aHluZWk2",
    "https://www.instagram.com/reel/DVBtWPWgLYt/?igsh=NndyaHAxOTAxd2xu&igsi=NndyaHAxOTAxd2xu",
    "https://www.instagram.com/reel/DaqyCq3h_yP/?igsh=cm9qMXU2YzhrNXBw&igsi=cm9qMXU2YzhrNXBw",
    "https://www.instagram.com/reel/DG0pIorMuhe/?igsh=MXZicHJoYWtzd3lweQ==&igsi=MXZicHJoYWtzd3lweQ==",
    "https://www.instagram.com/reel/DGwZ60ugHr5/?igsh=MXhpbjgyZWZxeWRoOA==&igsi=MXhpbjgyZWZxeWRoOA==",
    "https://www.instagram.com/reel/DZSPpWgRq_u/?igsi=MWQ1ZW00cWowNzdpdw==",
    "https://www.instagram.com/reel/DbtZXxrN5Rp/?igsi=OXpheHlzb3QzNDY5",
    "https://www.instagram.com/reel/DYMgFThRdzg/?igsi=MWc4aXgwb2kxZWNsbg==",
    "https://www.instagram.com/reel/DWJoEC1DftJ/?igsi=MThodmhjeGMxNGF5Ng==",
    "https://www.instagram.com/reel/DVdx_TFDTSl/?igsi=cmVib3p2Z2M2MGZi",
    "https://www.instagram.com/reel/DaEDejbhpN1/?igsi=dTllNTcxM3NucDdo",
    "https://www.instagram.com/reel/DXxKJHru7IK/?igsi=MTVoYzZrMW5mOHE3aA==",
    "https://www.instagram.com/reel/DYCMLRGxcOe/?igsi=ZGdwd3N3c3UyaWw5",
    "https://www.instagram.com/reel/DX8_y-DusfY/?igsi=cHVoeTN3bmo3M2V1",
    "https://www.instagram.com/reel/Da0sb91OI7H/?igsi=YW9laWhicHV2NWEz",
    "https://www.instagram.com/reel/DYiXHQLpkPM/?igsi=MWVzbHo0Ymp3OTR5Zw==",
    "https://www.instagram.com/reel/DXrsWBykT6U/?igsi=MXd1YTEydGhocmZjeQ==",
    "https://www.instagram.com/reel/DcJ-bxsAevD/?igsi=MTQ2dGFtdjl0dDVs",
    "https://www.instagram.com/reel/Db4YlKHt2w7/?igsi=cHh5NHdvYzk4Y2xh",
    "https://www.instagram.com/reel/DcY46PWu2zf/?igsi=MWs0c2JsaG9pYTM0aw==",
    "https://www.instagram.com/reel/DX3oJV-uiej/?igsi=MXFqcjl2cjE2YmV0NQ==",
    "https://www.instagram.com/reel/DcO0a6Novlx/?igsi=YXV5ODdoaW14em5p",
    "https://www.instagram.com/reel/DYGWVIbsWXt/?igsi=MWp2eG11bHd0em83aA==",
    "https://www.instagram.com/reel/DWZ5tmCjL_H/?igsi=MXByZmxod3N2cTRvcA==",
    "https://www.instagram.com/reel/DXovTKwAXFw/?igsi=MWYxZjUyc2Z1bmp6ZQ==",
    "https://www.instagram.com/reel/Db6JZeFxXPg/?igsi=bDF0OWtzbjl2Z2V3",
    "https://www.instagram.com/reel/DcbhIVnS73z/?igsi=MXJwYXltcjNzcmZoYw==",
    "https://www.instagram.com/reel/DZs2rIFg1dk/?igsi=MWFjMTdsdHQ2MGR5eg==",
    "https://www.instagram.com/reel/DaiiCVpg9sq/?igsi=MWdoam9tcDE1a3h0aQ==",
    "https://www.instagram.com/reel/DcPGyVlyo2T/?igsi=NWg5M3dyenkyeTJ2",
    "https://www.instagram.com/reel/DVcQxsaCdQF/?igsi=OHJvbG5md21hbHh6",
    "https://www.instagram.com/reel/DcLz7YMRNSD/?igsi=MXY3ZmRyaDkyZGVoNg==",
    "https://www.instagram.com/reel/DbZGdYGPazn/?igsi=MW1wa3pzdm5lMXN5NA==",
    "https://www.instagram.com/reel/DbWbyXhjAS7/?igsi=MWNlcWJrbTBsYmV1aQ==",
    "https://www.instagram.com/reel/DY-orYXRsLS/?igsi=MXhlaGN4OXVtNDRjcw==",
    "https://www.instagram.com/reel/DalUsgUA5sY/?igsi=YXMwa21oY3oxcjZ1",
    "https://www.instagram.com/reel/DYVvMXAsxJ2/?igsi=bmh3aG5oaWVxbTJv",
    "https://www.instagram.com/reel/DXmyhZbjtKh/?igsi=bWcwbW94ZGY3eDdv",
    "https://www.instagram.com/reel/DZNoMIoidbj/?igsi=MW14NDVwbTlpeXJsNQ==",
    "https://www.instagram.com/reel/DY5SrjZJO9I/?igsi=MXE2dmJtd2V1cmI5YQ==",
    "https://www.instagram.com/reel/DcTrIV5xYk7/?igsi=dXR1bHg4dmFyczJ6",
    "https://www.instagram.com/reel/DXwlQaWxybi/?igsi=MW80aWk0ZmNtZmtidA==",
    "https://www.instagram.com/reel/DaWDDZUha23/?igsi=MW5vc244dGk0c2Rqbw==",
    "https://www.instagram.com/reel/DatB6zECTQ7/?igsi=MTI0MGhvN3pnenNzZw==",
    "https://www.instagram.com/reel/Dbo6PK7kQgY/?igsi=MWltbjkxbGwydXp6aQ==",
    "https://www.instagram.com/reel/DXniMyHkejM/?igsi=MWp0ejcwamQ3aW5hYg==",
    "https://www.instagram.com/reel/Db3r_9qyWm1/?igsi=MTkwbDFuYjN6bzc2YQ==",
    "https://www.instagram.com/reel/DVdZgk-ADmz/?igsi=MWx1a2FiMzNnYzBseg==",
    "https://www.instagram.com/reel/DcPQWvlsa4s/?igsi=ZDVqZzVidjM1MDQ5"
  ];

  let addedNew = false;
  const baseTime = Date.now();
  linksParaImportar.forEach((url, index) => {
    if (!links.some(l => l.url === url)) {
      links.push({
        id: 'imported-' + baseTime + '-' + index,
        url: url,
        createdAt: new Date(baseTime + index * 1000).toISOString(),
        copied: false,
        copiedAt: null
      });
      addedNew = true;
    }
  });

  if (addedNew) saveLinks();
  const toastEl = document.getElementById('toast');
  let toastTimer;
  const showToast = (message) => {
    if (!toastEl) return;
    toastEl.innerHTML = `<span class="material-symbols-outlined">check_circle</span> ${message}`;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 4000);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    const date = d.toLocaleDateString('pt-BR');
    const time = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return `${date} às ${time}`;
  };

  const copyLink = async (id) => {
    const linkIndex = links.findIndex(l => l.id === id);
    if (linkIndex === -1) return;

    const link = links[linkIndex];
    
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(link.url);
      } else {
        throw new Error('Clipboard API not available');
      }
    } catch (err) {
      console.warn('Using fallback copy method:', err);
      const textarea = document.createElement('textarea');
      textarea.value = link.url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
      } catch (ex) {
        console.error('Fallback copy failed', ex);
      } finally {
        document.body.removeChild(textarea);
      }
    }

    const originalOrderLinks = [...links].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    const itemNum = originalOrderLinks.findIndex(l => l.id === id) + 1;

    link.copied = true;
    link.copiedAt = new Date().toISOString();
    link.moveAt = Date.now() + 20000; // 20 segundos de delay

    showToast(`Link #${itemNum} copiado! Moverá para o final em 20s.`);

    saveLinks();
    renderLinks();
  };

  let activeMoveTimers = [];

  const renderLinks = () => {
    activeMoveTimers.forEach(t => clearTimeout(t));
    activeMoveTimers = [];

    container.innerHTML = '';
    const now = Date.now();
    
    // Sort: links cujos 20 segundos já passaram vão pro final
    const sortedLinks = [...links].sort((a, b) => {
      const aMoved = a.copied && (a.moveAt ? now >= a.moveAt : true);
      const bMoved = b.copied && (b.moveAt ? now >= b.moveAt : true);

      if (aMoved && !bMoved) return 1;
      if (!aMoved && bMoved) return -1;
      if (a.copied && b.copied) {
        return new Date(a.copiedAt) - new Date(b.copiedAt);
      }
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    if (sortedLinks.length === 0) {
      container.innerHTML = `
        <div class="glass-panel empty-state">
          <span class="material-symbols-outlined" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;">inbox</span>
          <p>Nenhum link adicionado ainda.</p>
        </div>
      `;
    }

    // Preservar a ordem original estática de criação para fixar o número de cada item
    const originalOrderLinks = [...links].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    // Agendar movimentação automática de links pendentes
    links.forEach(l => {
      if (l.copied && l.moveAt && l.moveAt > now) {
        const remaining = l.moveAt - now;
        const timer = setTimeout(() => {
          renderLinks();
        }, remaining + 50);
        activeMoveTimers.push(timer);
      }
    });

    sortedLinks.forEach((link) => {
      // O número do item é estático (1, 2, 3...) baseado na sua inserção original
      const displayNumber = originalOrderLinks.findIndex(l => l.id === link.id) + 1;
      const card = document.createElement('div');
      card.className = `glass-panel link-card ${link.copied ? 'copied' : ''}`;
      
      let metaText = `Adicionado em ${formatDate(link.createdAt)}`;
      if (link.copied) {
        const isPendingMove = link.moveAt && now < link.moveAt;
        const statusMsg = isPendingMove ? ' (movendo pro final em 20s...)' : '';
        metaText = `<span style="color: var(--success-color); display: flex; align-items: center; gap: 4px; font-weight: 600;">
          <span class="material-symbols-outlined" style="font-size: 14px;">check_circle</span>
          Copiado dia ${formatDate(link.copiedAt)}${statusMsg}
        </span>`;
      }

      card.innerHTML = `
        <div style="font-size: 1.5rem; font-weight: 800; color: ${link.copied ? 'var(--success-color)' : 'rgba(255,255,255,0.2)'}; margin-right: 1rem; min-width: 40px; text-align: center; font-variant-numeric: tabular-nums;">
          ${displayNumber}
        </div>
        <div class="link-info">
          <a href="${link.url}" target="_blank" class="link-url" title="${link.url}">${link.url}</a>
          <div class="link-meta">${metaText}</div>
        </div>
        <div class="card-actions">
          <button class="copy-btn" data-id="${link.id}" title="Copiar Link">
            <span class="material-symbols-outlined">${link.copied ? 'done_all' : 'content_copy'}</span>
          </button>
        </div>
      `;

      container.appendChild(card);
    });

    // Attach events
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        copyLink(id);
      });
    });
  };

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (links.length === 0) return;
      if (confirm('Tem certeza que deseja apagar todos os links da sua lista?')) {
        links = [];
        saveLinks();
        renderLinks();
      }
    });
  }

  // Initial render
  renderLinks();
});
