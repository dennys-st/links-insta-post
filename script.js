document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('links-container');
  const countBadge = document.getElementById('link-count');
  const undoBtn = document.getElementById('undo-btn');
  const toastEl = document.getElementById('toast');

  // Lista mestre com todos os 129 links originais em sequência canônica (#1 a #129)
  const masterFullList = [
    "https://www.instagram.com/reel/DVmPgkFgUxi/?igsh=eTVqN3pkMjdnMDNz&igsi=eTVqN3pkMjdnMDNz", // #1
    "https://www.instagram.com/reel/DZED8M_Nv1o/?igsh=MTlxYWxkaDR6NDhlYQ==&igsi=MTlxYWxkaDR6NDhlYQ==", // #2
    "https://www.instagram.com/reel/DOMyig7DcXU/?igsh=MzFsbWJldjg2bWk3&igsi=MzFsbWJldjg2bWk3", // #3
    "https://www.instagram.com/reel/CuIb96qgqHl/?igsh=OHlhMXNrbm9sc21u&igsi=OHlhMXNrbm9sc21u", // #4
    "https://www.instagram.com/reel/DYF4RpoxVYV/?igsh=MTJpcnFyZzQzN29rMw==&igsi=MTJpcnFyZzQzN29rMw==", // #5
    "https://www.instagram.com/reel/DRwpGq_gmsE/?igsh=MTl3dXFzMmMzb3Z5YQ==&igsi=MTl3dXFzMmMzb3Z5YQ==", // #6
    "https://www.instagram.com/reel/DLJI2hhgujp/?igsh=OXlxdzVybnVvczZh&igsi=OXlxdzVybnVvczZh", // #7
    "https://www.instagram.com/reel/Da_DNENpz5R/?igsh=MWZqdDM2Y2owbmJhNQ==&igsi=MWZqdDM2Y2owbmJhNQ==", // #8
    "https://www.instagram.com/reel/DRVStbmkgTN/?igsh=MWJobjduM3poNWh1MQ==&igsi=MWJobjduM3poNWh1MQ==", // #9
    "https://www.instagram.com/reel/DJ5F_CYPOo5/?igsh=NDdtd25iMDVvaGh1&igsi=NDdtd25iMDVvaGh1", // #10
    "https://www.instagram.com/reel/DaVyaI8COcz/?igsh=ZWF3MjdhemdqY2No&igsi=ZWF3MjdhemdqY2No", // #11
    "https://www.instagram.com/reel/DACYcnlS6Pu/?igsh=cnc2bndtMGwwMzFq&igsi=cnc2bndtMGwwMzFq", // #12
    "https://www.instagram.com/reel/DQZ2IFIiObl/?igsh=MTFobm5kb256bXJjcw==&igsi=MTFobm5kb256bXJjcw==", // #13
    "https://www.instagram.com/reel/DZyRoKkOjCe/?igsh=bzgyamdtb2thdGg0&igsi=bzgyamdtb2thdGg0", // #14
    "https://www.instagram.com/reel/DQ4wVN8Acc7/?igsh=MXFsbjFuMHFwa2d0NA==&igsi=MXFsbjFuMHFwa2d0NA==", // #15
    "https://www.instagram.com/reel/DbESEZxC3JU/?igsh=dG00a3k0ZTlid2Nq&igsi=dG00a3k0ZTlid2Nq", // #16
    "https://www.instagram.com/reel/DSm-lrSAKH9/?igsh=YTNhdG9rcXBudGRr&igsi=YTNhdG9rcXBudGRr", // #17
    "https://www.instagram.com/reel/DAQyHx5xdfe/?igsh=MWQybTM5OXgxZDRlNg==&igsi=MWQybTM5OXgxZDRlNg==", // #18
    "https://www.instagram.com/reel/DalGe3wDEqb/?igsh=Zm82YmhicWt3ODNt&igsi=Zm82YmhicWt3ODNt", // #19
    "https://www.instagram.com/reel/DaQcAjUCBud/?igsh=b29uMHl5NTd4ajBh&igsi=b29uMHl5NTd4ajBh", // #20
    "https://www.instagram.com/reel/DZ_hrbJs7Z-/?igsh=MXh6OW9ucjQyejM0bw==&igsi=MXh6OW9ucjQyejM0bw==", // #21
    "https://www.instagram.com/reel/DZz95E2ubSS/?igsh=MWdnZ3hheWxuNzdkNg==&igsi=MWdnZ3hheWxuNzdkNg==", // #22
    "https://www.instagram.com/reel/DbnfygABExB/?igsh=dnIzOXF0OTliaG5p&igsi=dnIzOXF0OTliaG5p", // #23
    "https://www.instagram.com/reel/DJMhiVpAIyQ/?igsh=bnF1dmg3emozbGNx&igsi=bnF1dmg3emozbGNx", // #24
    "https://www.instagram.com/reel/CqRa99FOpnS/?igsh=dDVscTBoZHljMzA=&igsi=dDVscTBoZHljMzA=", // #25
    "https://www.instagram.com/reel/DZK33NMjI07/?igsh=amY5dWE3cDNtNDUw&igsi=amY5dWE3cDNtNDUw", // #26
    "https://www.instagram.com/reel/DYbLWxcyHZv/?igsh=MXZqNmFtaWQxbDBwYg==", // #27
    "https://www.instagram.com/reel/DKTETzysQgL/?igsh=MTd3OWFleTd6bGQxMw==", // #28
    "https://www.instagram.com/reel/DM3-7W2gtc-/?igsh=MXQ5aDN3ZHkwYWZyNw==", // #29
    "https://www.instagram.com/reel/DYxNCiBxRR-/?igsh=NGJuczQ5c3IxMzlk&igsi=NGJuczQ5c3IxMzlk", // #30
    "https://www.instagram.com/reel/DBGlYSHvuq4/?igsh=NHJtc3F6czkyczgw&igsi=NHJtc3F6czkyczgw", // #31
    "https://www.instagram.com/reel/DPXPpfUjv_u/?igsh=bHBiNnczeHVoZmt5&igsi=bHBiNnczeHVoZmt5", // #32
    "https://www.instagram.com/reel/DJdDK6Ks6LY/?igsh=bms1aTBxcHZ4NXhh&igsi=bms1aTBxcHZ4NXhh", // #33
    "https://www.instagram.com/reel/DVv2N0AjmMG/?igsh=ZGZjMWk1bWhkN2Fv&igsi=ZGZjMWk1bWhkN2Fv", // #34
    "https://www.instagram.com/reel/DYnJVRqDU18/?igsh=OGl3aDEzd3l5MWxy&igsi=OGl3aDEzd3l5MWxy", // #35
    "https://www.instagram.com/reel/DX1Zs56yXKJ/?igsh=MTRvd2NxNXl2NWk4ag==&igsi=MTRvd2NxNXl2NWk4ag==", // #36
    "https://www.instagram.com/reel/C5MZUMrvtXJ/?igsh=c3ZnY2FwNmh3cnVv&igsi=c3ZnY2FwNmh3cnVv", // #37
    "https://www.instagram.com/reel/C9BPZJ1vjGX/?igsh=MWs1eGhlcHh0ZTBydA==", // #38
    "https://www.instagram.com/reel/DP4X_0jgbgj/?igsh=MXhvbDk0OThwNmVjYQ==", // #39
    "https://www.instagram.com/reel/DFG5qmLvQTX/?igsh=M29nZmZlcDJyN2dx&igsi=M29nZmZlcDJyN2dx", // #40
    "https://www.instagram.com/reel/C6WInH0rFdE/?igsh=NHJ1NTQ4cXFobDlw&igsi=NHJ1NTQ4cXFobDlw", // #41
    "https://www.instagram.com/reel/DTasFSejQR9/?igsh=MXVsOGhreWZ5ZnZiZw==", // #42
    "https://www.instagram.com/reel/DXrAjsRDl-c/?igsh=bGMwbXhjaXphNXIy&igsi=bGMwbXhjaXphNXIy", // #43 (removido)
    "https://www.instagram.com/reel/CyWmXGFPUC-/?igsh=Mjd3djE1aHluZWk2&igsi=Mjd3djE1aHluZWk2", // #44
    "https://www.instagram.com/reel/DVBtWPWgLYt/?igsh=NndyaHAxOTAxd2xu&igsi=NndyaHAxOTAxd2xu", // #45
    "https://www.instagram.com/reel/DaqyCq3h_yP/?igsh=cm9qMXU2YzhrNXBw&igsi=cm9qMXU2YzhrNXBw", // #46
    "https://www.instagram.com/reel/DG0pIorMuhe/?igsh=MXZicHJoYWtzd3lweQ==", // #47
    "https://www.instagram.com/reel/DGwZ60ugHr5/?igsh=MXhpbjgyZWZxeWRoOA==", // #48
    "https://www.instagram.com/reel/DZSPpWgRq_u/?igsi=MWQ1ZW00cWowNzdpdw==", // #49
    "https://www.instagram.com/reel/DbtZXxrN5Rp/?igsi=OXpheHlzb3QzNDY5", // #50
    "https://www.instagram.com/reel/DYMgFThRdzg/?igsi=MWc4aXgwb2kxZWNsbg==", // #51 (removido)
    "https://www.instagram.com/reel/DWJoEC1DftJ/?igsi=MThodmhjeGMxNGF5Ng==", // #52
    "https://www.instagram.com/reel/DVdx_TFDTSl/?igsi=cmVib3p2Z2M2MGZi", // #53
    "https://www.instagram.com/reel/DaEDejbhpN1/?igsi=dTllNTcxM3NucDdo", // #54
    "https://www.instagram.com/reel/DXxKJHru7IK/?igsi=MTVoYzZrMW5mOHE3aA==", // #55 (removido)
    "https://www.instagram.com/reel/DYCMLRGxcOe/?igsi=ZGdwd3N3c3UyaWw5", // #56 (removido)
    "https://www.instagram.com/reel/DX8_y-DusfY/?igsi=cHVoeTN3bmo3M2V1", // #57 (removido)
    "https://www.instagram.com/reel/Da0sb91OI7H/?igsi=YW9laWhicHV2NWEz", // #58
    "https://www.instagram.com/reel/DYiXHQLpkPM/?igsi=MWVzbHo0Ymp3OTR5Zw==", // #59
    "https://www.instagram.com/reel/DXrsWBykT6U/?igsi=MXd1YTEydGhocmZjeQ==", // #60 (removido)
    "https://www.instagram.com/reel/DcJ-bxsAevD/?igsi=MTQ2dGFtdjl0dDVs", // #61
    "https://www.instagram.com/reel/Db4YlKHt2w7/?igsi=cHh5NHdvYzk4Y2xh", // #62
    "https://www.instagram.com/reel/DcY46PWu2zf/?igsi=MWs0c2JsaG9pYTM0aw==", // #63
    "https://www.instagram.com/reel/DX3oJV-uiej/?igsi=MXFqcjl2cjE2YmV0NQ==", // #64
    "https://www.instagram.com/reel/DcO0a6Novlx/?igsi=YXV5ODdoaW14em5p", // #65
    "https://www.instagram.com/reel/DYGWVIbsWXt/?igsi=MWp2eG11bHd0em83aA==", // #66
    "https://www.instagram.com/reel/DWZ5tmCjL_H/?igsi=MXByZmxod3N2cTRvcA==", // #67
    "https://www.instagram.com/reel/DXovTKwAXFw/?igsi=MWYxZjUyc2Z1bmp6ZQ==", // #68
    "https://www.instagram.com/reel/Db6JZeFxXPg/?igsi=bDF0OWtzbjl2Z2V3", // #69
    "https://www.instagram.com/reel/DcbhIVnS73z/?igsi=MXJwYXltcjNzcmZoYw==", // #70
    "https://www.instagram.com/reel/DZs2rIFg1dk/?igsi=MWFjMTdsdHQ2MGR5eg==", // #71
    "https://www.instagram.com/reel/DaiiCVpg9sq/?igsi=MWdoam9tcDE1a3h0aQ==", // #72
    "https://www.instagram.com/reel/DcPGyVlyo2T/?igsi=NWg5M3dyenkyeTJ2", // #73
    "https://www.instagram.com/reel/DVcQxsaCdQF/?igsi=OHJvbG5md21hbHh6", // #74
    "https://www.instagram.com/reel/DcLz7YMRNSD/?igsi=MXY3ZmRyaDkyZGVoNg==", // #75
    "https://www.instagram.com/reel/DbZGdYGPazn/?igsi=MW1wa3pzdm5lMXN5NA==", // #76
    "https://www.instagram.com/reel/DbWbyXhjAS7/?igsi=MWNlcWJrbTBsYmV1aQ==", // #77
    "https://www.instagram.com/reel/DY-orYXRsLS/?igsi=MXhlaGN4OXVtNDRjcw==", // #78
    "https://www.instagram.com/reel/DalUsgUA5sY/?igsi=YXMwa21oY3oxcjZ1", // #79
    "https://www.instagram.com/reel/DYVvMXAsxJ2/?igsi=bmh3aG5oaWVxbTJv", // #80
    "https://www.instagram.com/reel/DXmyhZbjtKh/?igsi=bWcwbW94ZGY3eDdv", // #81 (removido)
    "https://www.instagram.com/reel/DZNoMIoidbj/?igsi=MW14NDVwbTlpeXJsNQ==", // #82
    "https://www.instagram.com/reel/DY5SrjZJO9I/?igsi=MXE2dmJtd2V1cmI5YQ==", // #83
    "https://www.instagram.com/reel/DcTrIV5xYk7/?igsi=dXR1bHg4dmFyczJ6", // #84
    "https://www.instagram.com/reel/DXwlQaWxybi/?igsi=MW80aWk0ZmNtZmtidA==", // #85 (removido)
    "https://www.instagram.com/reel/DaWDDZUha23/?igsi=MW5vc244dGk0c2Rqbw==", // #86
    "https://www.instagram.com/reel/DatB6zECTQ7/?igsi=MTI0MGhvN3pnenNzZw==", // #87
    "https://www.instagram.com/reel/Dbo6PK7kQgY/?igsi=MWltbjkxbGwydXp6aQ==", // #88
    "https://www.instagram.com/reel/DXniMyHkejM/?igsi=MWp0ejcwamQ3aW5hYg==", // #89 (removido)
    "https://www.instagram.com/reel/Db3r_9qyWm1/?igsi=MTkwbDFuYjN6bzc2YQ==", // #90
    "https://www.instagram.com/reel/DVdZgk-ADmz/?igsi=MWx1a2FiMzNnYzBseg==", // #91
    "https://www.instagram.com/reel/DcPQWvlsa4s/?igsi=ZDVqZzVidjM1MDQ5", // #92
    "https://www.instagram.com/reel/Dczdy9Ev3I9/?igsi=MTM0MnA3YzFvdWp0eQ==", // #93
    "https://www.instagram.com/reel/DW6DLHqjKeO/?igsi=MW5wZ2htaG1saWV5Mw==", // #94
    "https://www.instagram.com/reel/DV3Qp8Ik3gr/?igsi=MTk3eXRhc3NzcWJicw==", // #95
    "https://www.instagram.com/reel/DW1aKq6DiVD/?igsi=N2JsY2c4cG9zbjIx", // #96
    "https://www.instagram.com/reel/DcrAF-qRWq6/?igsi=MXVrdnRhaW1uNnNtNQ==", // #97
    "https://www.instagram.com/reel/DcQplJupNpa/?igsi=MWx5OXpjNGZiNDRjMw==", // #98
    "https://www.instagram.com/reel/Dcr3NwzNQ9K/?igsi=MW5iOHhuZjcyY3Rybg==", // #99
    "https://www.instagram.com/reel/DcjYOP8Ki48/?igsi=MWRqdG84eHJpYm13Mw==", // #100
    "https://www.instagram.com/reel/DbMiFZ_uqKz/?igsi=MWs4eWN4NWFsbTI4cg==", // #101
    "https://www.instagram.com/reel/DVe_wG5DvYJ/?igsi=cmlxamJpeHY5Y3I4", // #102
    "https://www.instagram.com/reel/DcoIYNHRymI/?igsi=bmRxanpueHZ3OWg4", // #103
    "https://www.instagram.com/reel/DX0nI4Xomde/?igsi=aHl1OWZvZDRnM2x0", // #104
    "https://www.instagram.com/reel/DclKXMjxktz/?igsi=cTQyMnNxY3p1ZjJt", // #105
    "https://www.instagram.com/reel/DaGROwFhKQn/?igsi=MWpxZzJneTV1cjl4dg==", // #106
    "https://www.instagram.com/reel/DclaQMXKkXM/?igsi=MW01eW5tb2Y0bHBmbg==", // #107
    "https://www.instagram.com/reel/DcBgcBlxjKL/?igsi=MXNweW11OWV1Z2luOA==", // #108
    "https://www.instagram.com/reel/DZsb3_4RUWC/?igsi=MXhnNDJvdzRsYXNjdg==", // #109
    "https://www.instagram.com/reel/DYkP9tOgu8b/?igsi=eXA0OGJjZ2g3ZjZw", // #110
    "https://www.instagram.com/reel/DYlMVMfN7do/?igsi=MXZrZGoyenU5NGcyZA==", // #111
    "https://www.instagram.com/reel/DY8NlWyOjj3/?igsi=MXU0eTRwZnNleGh6Ng==", // #112
    "https://www.instagram.com/reel/DWqzXSbjAQw/?igsi=MTI4bG9sMHZvMHdibQ==", // #113
    "https://www.instagram.com/reel/DZ4g5GvRjES/?igsi=eW85dXFsMnF5bWJt", // #114
    "https://www.instagram.com/reel/DVuJAoTj7zn/?igsi=MWxmNGZmNmphYmx1OQ==", // #115
    "https://www.instagram.com/reel/DaDTL-yORUl/?igsi=ZjI2ZmVpamFsd3Mz", // #116
    "https://www.instagram.com/reel/DbRWAb1RjoU/?igsi=MmI1czcwOGlmaDAy", // #117
    "https://www.instagram.com/reel/Dbj0irisP1b/?igsi=MXB2NTM2ZG1qMW02YQ==", // #118
    "https://www.instagram.com/reel/DavNwzXu3u7/?igsi=N3pndXpvZWVkMzVr", // #119
    "https://www.instagram.com/reel/DZcqjphPKak/?igsi=MXc2dmx4Z3BvMWRuOQ==", // #120
    "https://www.instagram.com/reel/DceKIJ4xrL_/?igsi=ZHZrNXZiMWNnNnhk", // #121
    "https://www.instagram.com/reel/DbOGzCcxfn0/?igsi=bG5ndGdyMjU0bW9q", // #122
    "https://www.instagram.com/reel/DcddE4PIO1T/?igsi=eDJ5M2NiampneDg5", // #123
    "https://www.instagram.com/reel/DbtbrSIB7TY/?igsi=c3d2b3duanU3cDFi", // #124
    "https://www.instagram.com/reel/DcFO8b1t6J8/?igsi=MTJ5Ynp6YTdyaHprNQ==", // #125
    "https://www.instagram.com/reel/DZD2W4RRyZp/?igsi=MW02dDNwdGNjcDQyZA==", // #126
    "https://www.instagram.com/reel/DbacnWlO3a1/?igsi=MWRyYm1ka2xmZWtwZg==", // #127
    "https://www.instagram.com/reel/DaDF5qfxvZs/?igsi=Njljdm1ya3oxNzNz", // #128
    "https://www.instagram.com/reel/Dcev5wMiPC1/?igsi=MXU0enJmb3UwOTMwZA==" // #129
  ];

  // Helper para obter o Reel ID de qualquer link do Instagram
  const getReelId = (url) => {
    return (url.split('/reel/')[1] || '').split('/')[0].split('?')[0];
  };

  // Helper para obter o número absoluto (1 a 129) baseado na lista mestre
  const getAbsoluteNumber = (url) => {
    const reelId = getReelId(url);
    if (!reelId) return 0;
    const idx = masterFullList.findIndex(mUrl => getReelId(mUrl) === reelId);
    return idx !== -1 ? (idx + 1) : 0;
  };

  // Lista dos 9 IDs específicos solicitados para remoção (não funcionam)
  const idsParaRemover = [
    'DXrAjsRDl-c', // #43
    'DYMgFThRdzg', // #51
    'DXxKJHru7IK', // #55
    'DYCMLRGxcOe', // #56
    'DX8_y-DusfY', // #57
    'DXrsWBykT6U', // #60
    'DXmyhZbjtKh', // #81
    'DXwlQaWxybi', // #85
    'DXniMyHkejM'  // #89
  ];

  let rawLinks = JSON.parse(localStorage.getItem('insta-links')) || [];

  // 1. Filtrar links removidos
  rawLinks = rawLinks.filter(l => !idsParaRemover.includes(getReelId(l.url)));

  // 2. DEDUPLICAÇÃO ESTRITA: deixa apenas UM de cada Reel ID no localStorage
  const seenReels = new Map();
  rawLinks.forEach(l => {
    const id = getReelId(l.url);
    if (!id) return;
    if (!seenReels.has(id)) {
      seenReels.set(id, l);
    } else {
      // Se um duplicado já estava copiado, mantém o status de copiado
      const existing = seenReels.get(id);
      if (l.copied && !existing.copied) {
        seenReels.set(id, l);
      }
    }
  });

  let links = Array.from(seenReels.values());

  const saveLinks = () => {
    localStorage.setItem('insta-links', JSON.stringify(links));
  };

  // Salvar se houve limpeza de duplicados ou links removidos
  if (links.length !== rawLinks.length) {
    saveLinks();
  }

  // 3. Importar links da lista mestre que ainda não existem no localStorage
  let addedNew = false;
  const baseTime = Date.now();
  masterFullList.forEach((url, index) => {
    const reelId = getReelId(url);
    // Não importar os que foram deletados
    if (idsParaRemover.includes(reelId)) return;

    if (!links.some(l => getReelId(l.url) === reelId)) {
      links.push({
        id: 'imported-' + baseTime + '-' + index,
        url: url,
        createdAt: new Date(baseTime + index * 1000).toISOString(),
        copied: false,
        copiedAt: null,
        moveAt: null
      });
      addedNew = true;
    }
  });

  if (addedNew) saveLinks();

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

    const itemNum = getAbsoluteNumber(link.url);

    // Permite copiar mesmo se já tiver sido copiado antes!
    if (link.copied) {
      showToast(`Link #${itemNum} copiado novamente!`);
      link.copiedAt = new Date().toISOString();
      saveLinks();
      renderLinks();
      return;
    }

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

    // ORDENAÇÃO PERFEITA:
    // 1. Links não-copiados ficam NO TOPO em ordem numérica crescente absoluta (#1, #2, #3...)
    // 2. Links cujo tempo de 20s já passou vão pro FINAL, na ordem em que foram copiados
    const sortedLinks = [...links].sort((a, b) => {
      const aMoved = a.copied && (a.moveAt ? now >= a.moveAt : true);
      const bMoved = b.copied && (b.moveAt ? now >= b.moveAt : true);

      if (aMoved && !bMoved) return 1;
      if (!aMoved && bMoved) return -1;
      if (a.copied && b.copied) {
        return new Date(a.copiedAt) - new Date(b.copiedAt);
      }
      return getAbsoluteNumber(a.url) - getAbsoluteNumber(b.url);
    });

    if (sortedLinks.length === 0) {
      container.innerHTML = `
        <div class="glass-panel empty-state">
          <span class="material-symbols-outlined" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;">inbox</span>
          <p>Nenhum link adicionado ainda.</p>
        </div>
      `;
    }

    // Contar total de links ativos
    countBadge.textContent = links.length;

    // Agendar movimentação automática de links pendentes (delay de 20s)
    links.forEach(l => {
      if (l.copied && l.moveAt && l.moveAt > now) {
        const remaining = l.moveAt - now;
        const timer = setTimeout(() => {
          renderLinks();
        }, remaining + 50);
        activeMoveTimers.push(timer);
      }
    });

    // Identificar último e penúltimo copiados pela data mais recente de cópia
    const copiedList = links.filter(l => l.copied && l.copiedAt)
      .sort((a, b) => new Date(b.copiedAt) - new Date(a.copiedAt));

    const lastCopiedId = copiedList.length > 0 ? copiedList[0].id : null;
    const secondLastCopiedId = copiedList.length > 1 ? copiedList[1].id : null;

    sortedLinks.forEach((link) => {
      const displayNumber = getAbsoluteNumber(link.url);
      const isLast = link.id === lastCopiedId;
      const isSecondLast = link.id === secondLastCopiedId;

      const card = document.createElement('div');
      let cardClasses = 'glass-panel link-card';
      if (link.copied) cardClasses += ' copied';
      if (isLast) cardClasses += ' is-last-copied';
      else if (isSecondLast) cardClasses += ' is-second-last-copied';
      card.className = cardClasses;

      let metaText = `Adicionado em ${formatDate(link.createdAt)}`;
      if (link.copied) {
        const isPendingMove = link.moveAt && now < link.moveAt;
        const statusMsg = isPendingMove ? ' (movendo pro final em 20s...)' : '';

        let badgeTag = '';
        if (isLast) {
          badgeTag = `<span class="copy-tag tag-amber"><span class="material-symbols-outlined" style="font-size: 13px;">star</span> Último copiado</span>`;
        } else if (isSecondLast) {
          badgeTag = `<span class="copy-tag tag-cyan"><span class="material-symbols-outlined" style="font-size: 13px;">history_toggle_off</span> Penúltimo copiado</span>`;
        }

        metaText = `<div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          ${badgeTag}
          <span class="copied-date-text">
            <span class="material-symbols-outlined" style="font-size: 14px;">check_circle</span>
            Copiado dia ${formatDate(link.copiedAt)}${statusMsg}
          </span>
        </div>`;
      }

      let numberColor = 'rgba(255,255,255,0.2)';
      if (isLast) numberColor = '#fbbf24';
      else if (isSecondLast) numberColor = '#38bdf8';
      else if (link.copied) numberColor = 'var(--success-color)';

      const buttonHtml = link.copied
        ? `<button class="copy-btn recopy-btn" data-id="${link.id}" title="Copiar link novamente">
             <span class="material-symbols-outlined" style="font-size: 18px;">content_copy</span>
             <span>Copiar de novo</span>
           </button>`
        : `<button class="copy-btn" data-id="${link.id}" title="Copiar Link">
             <span class="material-symbols-outlined">content_copy</span>
           </button>`;

      card.innerHTML = `
        <div class="card-number" style="color: ${numberColor};">
          ${displayNumber}
        </div>
        <div class="link-info">
          <a href="${link.url}" target="_blank" class="link-url" title="${link.url}">${link.url}</a>
          <div class="link-meta">${metaText}</div>
        </div>
        <div class="card-actions">
          ${buttonHtml}
        </div>
      `;

      container.appendChild(card);
    });

    // Eventos de cópia
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        copyLink(id);
      });
    });
  };

  // Botão "Voltar no Tempo" (desfaz a última cópia)
  if (undoBtn) {
    undoBtn.addEventListener('click', () => {
      const copiedLinks = links.filter(l => l.copied && l.copiedAt);
      if (copiedLinks.length === 0) {
        showToast('Nenhum link copiado para voltar.');
        return;
      }
      copiedLinks.sort((a, b) => new Date(b.copiedAt) - new Date(a.copiedAt));
      const lastCopied = copiedLinks[0];

      lastCopied.copied = false;
      lastCopied.copiedAt = null;
      lastCopied.moveAt = null;

      saveLinks();
      renderLinks();

      const num = getAbsoluteNumber(lastCopied.url);
      showToast(`Voltou no tempo! Link #${num} retornou à fila original.`);
    });
  }

  // Render inicial
  renderLinks();
});
