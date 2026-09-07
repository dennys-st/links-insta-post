document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('links-container');
  const undoBtn = document.getElementById('undo-btn');
  const undoLabel = document.getElementById('undo-label');
  const toastEl = document.getElementById('toast');

  // HUD Dashboard Elements
  const statTotal = document.getElementById('stat-total');
  const statPending = document.getElementById('stat-pending');
  const statCopied = document.getElementById('stat-copied');
  const statPercent = document.getElementById('stat-percent');
  const statProgressSub = document.getElementById('stat-progress-sub');
  const progressBarFill = document.getElementById('progress-bar-fill');

  // Filter Cards & Search Elements
  const filterCards = document.querySelectorAll('.filter-card');
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');

  let activeFilter = 'all'; // 'all' | 'pending' | 'copied'
  let searchQuery = '';

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

  // Lista dos 9 IDs específicos solicitados para remoção
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

  if (links.length !== rawLinks.length) {
    saveLinks();
  }

  // 3. Importar links da lista mestre que ainda não existem
  let addedNew = false;
  const baseTime = Date.now();
  masterFullList.forEach((url, index) => {
    const reelId = getReelId(url);
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
    }, 3500);
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

    if (link.copied) {
      showToast(`Link #${itemNum} copiado novamente!`);
      link.copiedAt = new Date().toISOString();
      saveLinks();
      renderLinks();
      return;
    }

    link.copied = true;
    link.copiedAt = new Date().toISOString();
    link.moveAt = Date.now() + 20000; // 20s de delay antes de ir pro final

    showToast(`Link #${itemNum} copiado com sucesso!`);

    saveLinks();
    renderLinks();
  };

  let activeMoveTimers = [];

  const renderLinks = () => {
    activeMoveTimers.forEach(t => clearTimeout(t));
    activeMoveTimers = [];

    container.innerHTML = '';
    const now = Date.now();

    // 1. Estatísticas Globais
    const totalCount = links.length;
    const copiedCount = links.filter(l => l.copied).length;
    const pendingCount = totalCount - copiedCount;
    const percent = totalCount > 0 ? Math.round((copiedCount / totalCount) * 100) : 0;

    if (statTotal) statTotal.textContent = totalCount;
    if (statPending) statPending.textContent = pendingCount;
    if (statCopied) statCopied.textContent = copiedCount;
    if (statPercent) statPercent.textContent = `${percent}%`;
    if (statProgressSub) statProgressSub.textContent = `${copiedCount} de ${totalCount} links processados`;
    if (progressBarFill) progressBarFill.style.width = `${percent}%`;
 
    // Sincronizar estado visual ativo dos cards de filtro
    filterCards.forEach(card => {
      if (card.getAttribute('data-filter') === activeFilter) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    // 2. Identificar histórico de cópia (Último e Penúltimo)
    const copiedList = links.filter(l => l.copied)
      .sort((a, b) => {
        if (a.copiedAt && b.copiedAt) return new Date(b.copiedAt) - new Date(a.copiedAt);
        if (a.copiedAt && !b.copiedAt) return -1;
        if (!a.copiedAt && b.copiedAt) return 1;
        return getAbsoluteNumber(b.url) - getAbsoluteNumber(a.url);
      });

    const lastCopiedId = copiedList.length > 0 ? copiedList[0].id : null;
    const secondLastCopiedId = copiedList.length > 1 ? copiedList[1].id : null;

    // Atualizar rótulo do botão "Voltar no Tempo"
    if (undoLabel) {
      if (copiedList.length > 0) {
        const lastNum = getAbsoluteNumber(copiedList[0].url);
        undoLabel.textContent = `Desfazer #${lastNum}`;
      } else {
        undoLabel.textContent = 'Voltar no Tempo';
      }
    }

    // 3. Ordenação Canônica
    // Não-copiados no topo ordenados pelo número absoluto (#1, #2, #3...)
    // Copiados após 20s no final pela data de cópia
    const sortedLinks = [...links].sort((a, b) => {
      const aMoved = a.copied && (a.moveAt ? now >= a.moveAt : true);
      const bMoved = b.copied && (b.moveAt ? now >= b.moveAt : true);

      if (aMoved && !bMoved) return 1;
      if (!aMoved && bMoved) return -1;
      if (a.copied && b.copied) {
        return new Date(a.copiedAt || 0) - new Date(b.copiedAt || 0);
      }
      return getAbsoluteNumber(a.url) - getAbsoluteNumber(b.url);
    });

    // Próximo da fila (primeiro pendente da lista ordenada)
    const pendingList = sortedLinks.filter(l => !l.copied);
    const nextInQueueId = pendingList.length > 0 ? pendingList[0].id : null;

    // 4. Filtrar por Aba Ativa (Todos / Pendentes / Copiados)
    let displayList = sortedLinks.filter(link => {
      if (activeFilter === 'pending') return !link.copied;
      if (activeFilter === 'copied') return link.copied;
      return true;
    });

    // 5. Filtrar por Busca
    if (searchQuery.trim() !== '') {
      const q = searchQuery.trim().toLowerCase().replace('#', '');
      displayList = displayList.filter(link => {
        const numStr = String(getAbsoluteNumber(link.url));
        const urlStr = link.url.toLowerCase();
        return numStr === q || numStr.includes(q) || urlStr.includes(q);
      });
    }

    // Estado Vazio
    if (displayList.length === 0) {
      const emptyMsg = searchQuery.trim() !== ''
        ? `Nenhum resultado para "<strong>${searchQuery}</strong>". Tente outro termo ou limpe a busca.`
        : (activeFilter === 'pending'
            ? 'Parabéns! Todos os links já foram copiados e baixados.'
            : (activeFilter === 'copied'
                ? 'Nenhum link foi copiado ainda. Clique em Copiar para iniciar.'
                : 'Nenhum link encontrado.'));

      container.innerHTML = `
        <div class="empty-state">
          <span class="material-symbols-outlined empty-icon">saved_search</span>
          <div class="empty-title">Nenhum link encontrado</div>
          <div class="empty-desc">${emptyMsg}</div>
        </div>
      `;
      return;
    }

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

    // 6. Renderizar Cards
    displayList.forEach((link) => {
      const displayNumber = getAbsoluteNumber(link.url);
      const isLast = link.id === lastCopiedId;
      const isSecondLast = link.id === secondLastCopiedId;
      const isNext = link.id === nextInQueueId && !link.copied;

      const card = document.createElement('div');
      let cardClasses = 'link-card';
      if (link.copied) cardClasses += ' copied';
      if (isLast) cardClasses += ' is-last-copied';
      else if (isSecondLast) cardClasses += ' is-second-last-copied';
      else if (isNext) cardClasses += ' is-next-in-queue';
      card.className = cardClasses;

      // Badges
      let pillHtml = '';
      if (isLast) {
        pillHtml = `<span class="status-pill pill-amber"><span class="material-symbols-outlined" style="font-size: 13px;">star</span> Último copiado</span>`;
      } else if (isSecondLast) {
        pillHtml = `<span class="status-pill pill-cyan"><span class="material-symbols-outlined" style="font-size: 13px;">history_toggle_off</span> Penúltimo copiado</span>`;
      } else if (isNext) {
        pillHtml = `<span class="status-pill pill-next"><span class="material-symbols-outlined" style="font-size: 13px;">play_arrow</span> Próximo da fila</span>`;
      }

      // Metadata
      let metaStatusText = '';
      if (link.copied) {
        const isPendingMove = link.moveAt && now < link.moveAt;
        const statusMsg = isPendingMove ? ' (movendo em 20s...)' : '';
        const dateText = link.copiedAt ? `Copiado em ${formatDate(link.copiedAt)}` : 'Copiado anteriormente';
        metaStatusText = `<span class="date-status"><span class="material-symbols-outlined">check_circle</span> ${dateText}${statusMsg}</span>`;
      } else {
        metaStatusText = `<span class="date-status"><span class="material-symbols-outlined">schedule</span> Adicionado em ${formatDate(link.createdAt)}</span>`;
      }

      // Botões de Ação
      const actionButtons = link.copied
        ? `
          <button class="btn-recopy" data-id="${link.id}" title="Copiar link novamente">
            <span class="material-symbols-outlined">content_copy</span>
            <span>Copiar de novo</span>
          </button>
          <a href="${link.url}" target="_blank" class="btn-action-icon" title="Abrir Reel no Instagram">
            <span class="material-symbols-outlined">open_in_new</span>
          </a>
        `
        : `
          <button class="btn-copy-primary" data-id="${link.id}" title="Copiar link para download">
            <span class="material-symbols-outlined">content_copy</span>
            <span>Copiar</span>
          </button>
          <a href="${link.url}" target="_blank" class="btn-action-icon" title="Abrir Reel no Instagram">
            <span class="material-symbols-outlined">open_in_new</span>
          </a>
        `;

      card.innerHTML = `
        <div class="card-num-box">
          #${displayNumber}
        </div>
        <div class="card-content">
          <div class="link-title-line">
            <a href="${link.url}" target="_blank" class="link-url" title="${link.url}">${link.url}</a>
          </div>
          <div class="card-meta-line">
            ${pillHtml}
            ${metaStatusText}
          </div>
        </div>
        <div class="card-actions">
          ${actionButtons}
        </div>
      `;

      container.appendChild(card);
    });

    // Eventos de clique para copiar
    container.querySelectorAll('.btn-copy-primary, .btn-recopy').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        copyLink(id);
      });
    });
  };

  // Eventos de Clique nos Cards de Filtro do HUD
  filterCards.forEach(card => {
    card.addEventListener('click', () => {
      filterCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      activeFilter = card.getAttribute('data-filter');
      renderLinks();
    });
  });

  // Eventos do Campo de Busca
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (searchClear) {
        searchClear.style.display = searchQuery ? 'flex' : 'none';
      }
      renderLinks();
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      searchClear.style.display = 'none';
      renderLinks();
      searchInput.focus();
    });
  }

  // Botão "Voltar no Tempo" (desfaz a última cópia)
  if (undoBtn) {
    undoBtn.addEventListener('click', () => {
      const copiedLinks = links.filter(l => l.copied);
      if (copiedLinks.length === 0) {
        showToast('Nenhum link copiado para voltar.');
        return;
      }
      copiedLinks.sort((a, b) => {
        if (a.copiedAt && b.copiedAt) return new Date(b.copiedAt) - new Date(a.copiedAt);
        if (a.copiedAt && !b.copiedAt) return -1;
        if (!a.copiedAt && b.copiedAt) return 1;
        return getAbsoluteNumber(b.url) - getAbsoluteNumber(a.url);
      });
      const lastCopied = copiedLinks[0];

      lastCopied.copied = false;
      lastCopied.copiedAt = null;
      lastCopied.moveAt = null;

      saveLinks();
      renderLinks();

      const num = getAbsoluteNumber(lastCopied.url);
      showToast(`Voltou no tempo! Link #${num} retornou para a fila.`);
    });
  }

  // Render inicial
  renderLinks();

  // ============================================================
  // SISTEMA DE TEMAS: NEVE (PADRÃO), ESTRELAS & MINIMAL
  // ============================================================
  const canvas = document.getElementById('bg-canvas') || document.getElementById('rain-canvas') || document.getElementById('snow-canvas');
  let activeAnimationId = null;
  // Neve como padrão ao acessar o site, a não ser que o usuário tenha salvo outro tema
  let currentTheme = localStorage.getItem('insta-studio-theme') || 'snow';
  if (currentTheme === 'rain') currentTheme = 'snow';

  // Configurar botões de tema na interface
  const themeBtns = document.querySelectorAll('.theme-btn');
  const updateThemeButtons = (theme) => {
    themeBtns.forEach(btn => {
      const t = btn.getAttribute('data-theme');
      if (t === theme) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  };

  // --- TEMA 1: CÉU ESTRELADO REALISTA (INSPIRADO NO PRINT: NÍTIDO, DENSO E CINTILANTE) ---
  const startStarsTheme = (ctx, getWidth, getHeight) => {
    let width = getWidth();
    let height = getHeight();

    // Paleta de cores estelares naturais (predominância de branco nítido com toques sutis)
    const starColors = [
      { r: 255, g: 255, b: 255 }, // Branco diamante puro
      { r: 255, g: 255, b: 255 }, // Branco (peso maior)
      { r: 255, g: 255, b: 255 }, // Branco (peso maior)
      { r: 224, g: 242, b: 254 }, // Azul gelo sutil
      { r: 186, g: 230, b: 253 }, // Ciano celeste suave
      { r: 254, g: 240, b: 138 }, // Ouro estelar pálido
      { r: 253, g: 230, b: 138 }, // Âmbar quente suave
      { r: 245, g: 208, b: 254 }, // Lavanda estelar
      { r: 251, g: 207, b: 232 }, // Rosa pálido
    ];

    // Densidade rica inspirada no print de exemplo (centenas de pontos estelares)
    const starCount = Math.min(550, Math.max(350, Math.floor((width * height) / 2200)));
    const stars = [];

    for (let i = 0; i < starCount; i++) {
      const color = starColors[Math.floor(Math.random() * starColors.length)];
      const rand = Math.random();
      let r, minAlpha, maxAlpha, hasGlow, glowSize;

      if (rand < 0.65) {
        // Micro poeira estelar (pontos minúsculos e nítidos como no print)
        r = Math.random() * 0.45 + 0.45; // 0.45px a 0.9px
        minAlpha = Math.random() * 0.2 + 0.15;
        maxAlpha = Math.random() * 0.3 + 0.55;
        hasGlow = false;
        glowSize = 0;
      } else if (rand < 0.92) {
        // Estrelas médias nítidas
        r = Math.random() * 0.7 + 0.95; // 0.95px a 1.65px
        minAlpha = Math.random() * 0.25 + 0.3;
        maxAlpha = Math.random() * 0.25 + 0.75;
        hasGlow = Math.random() < 0.25;
        glowSize = Math.random() * 2.0 + 1.2; // Brilho bem discreto e colado na estrela
      } else {
        // Estrelas de destaque nítidas (sem borrão)
        r = Math.random() * 0.8 + 1.7; // 1.7px a 2.5px
        minAlpha = Math.random() * 0.2 + 0.45;
        maxAlpha = Math.random() * 0.15 + 0.85;
        hasGlow = true;
        glowSize = Math.random() * 3.0 + 2.0; // Brilho pontual nítido
      }

      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: r,
        color: color,
        hasGlow: hasGlow,
        glowSize: glowSize,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.025 + 0.012, // Aumentando e diminuindo o brilho suavemente
        minAlpha: minAlpha,
        maxAlpha: maxAlpha
      });
    }

    const loop = () => {
      width = getWidth();
      height = getHeight();
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Pulsação suave (aumentando e diminuindo o brilho)
        s.phase += s.pulseSpeed;
        const sinVal = 0.5 + 0.5 * Math.sin(s.phase);
        const alpha = s.minAlpha + (s.maxAlpha - s.minAlpha) * sinVal;
        const currentR = s.r * (0.88 + 0.24 * sinVal);
        const { r, g, b } = s.color;

        ctx.beginPath();
        ctx.arc(s.x, s.y, currentR, 0, Math.PI * 2);

        if (s.hasGlow && sinVal > 0.45) {
          ctx.shadowBlur = s.glowSize * sinVal;
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha * 0.75})`;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.shadowColor = 'transparent';
        } else {
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.fill();
        }
      }

      activeAnimationId = requestAnimationFrame(loop);
    };

    activeAnimationId = requestAnimationFrame(loop);
  };

  // --- TEMA 2: NEVE BRANCA COM PONTOS COLORIDOS NÉON ---
  const startSnowTheme = (ctx, getWidth, getHeight) => {
    let width = getWidth();
    let height = getHeight();

    const neonColors = [
      { r: 245, g: 158, b: 11  },
      { r: 6,   g: 182, b: 212 },
      { r: 16,  g: 185, b: 129 },
      { r: 99,  g: 102, b: 241 },
      { r: 244, g: 63,  b: 94  },
      { r: 168, g: 85,  b: 247 },
      { r: 56,  g: 189, b: 248 },
    ];

    const whiteCount = 140;
    const coloredCount = 35;
    const flakes = [];

    for (let i = 0; i < whiteCount; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.6,
        speedY: Math.random() * 1.3 + 0.6,
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.7 + 0.25,
        swing: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.02 + 0.008,
        colored: false
      });
    }

    for (let i = 0; i < coloredCount; i++) {
      const color = neonColors[Math.floor(Math.random() * neonColors.length)];
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 1.0,
        speedY: Math.random() * 1.1 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.65 + 0.35,
        swing: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.018 + 0.006,
        colored: true,
        color,
        glowRadius: Math.random() * 6 + 4,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.04 + 0.015
      });
    }

    const totalCount = flakes.length;

    const loop = () => {
      width = getWidth();
      height = getHeight();
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < totalCount; i++) {
        const f = flakes[i];
        f.swing += f.swingSpeed;
        f.y += f.speedY;
        f.x += f.speedX + Math.sin(f.swing) * 0.45;

        if (f.y > height + 5) { f.y = -5; f.x = Math.random() * width; }
        if (f.x > width + 5) f.x = -5;
        if (f.x < -5) f.x = width + 5;

        if (f.colored) {
          f.pulsePhase += f.pulseSpeed;
          const pulse = 0.7 + 0.3 * Math.sin(f.pulsePhase);
          const alpha = f.opacity * pulse;
          const { r, g, b } = f.color;

          ctx.shadowBlur = f.glowRadius * pulse;
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha * 0.9})`;
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.shadowColor = 'transparent';
        } else {
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
          ctx.fill();
        }
      }

      activeAnimationId = requestAnimationFrame(loop);
    };

    activeAnimationId = requestAnimationFrame(loop);
  };

  // Gerenciador central de temas
  const applyTheme = (themeName) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (activeAnimationId) {
      cancelAnimationFrame(activeAnimationId);
      activeAnimationId = null;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    currentTheme = themeName;
    localStorage.setItem('insta-studio-theme', themeName);
    updateThemeButtons(themeName);

    const getWidth = () => canvas.width;
    const getHeight = () => canvas.height;

    if (themeName === 'minimal') {
      // Tema Minimal: 100% escuro sem animação, zero consumo de CPU/GPU
      // O loop de animação é cancelado e o canvas permanece limpo
    } else if (themeName === 'snow') {
      startSnowTheme(ctx, getWidth, getHeight);
    } else {
      startStarsTheme(ctx, getWidth, getHeight);
    }
  };

  // Redimensionamento de tela para o canvas
  window.addEventListener('resize', () => {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (currentTheme === 'minimal') {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  });

  // Eventos de clique nos botões de tema
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-theme');
      let targetTheme = selected;
      if (selected === 'rain') targetTheme = 'stars';
      if (targetTheme !== currentTheme) {
        applyTheme(targetTheme);
        const nameMap = {
          stars: 'Estrelas',
          snow: 'Neve Néon',
          minimal: 'Minimal (Fundo Preto)'
        };
        showToast(`Tema alterado para ${nameMap[targetTheme] || targetTheme}!`);
      }
    });
  });

  // Iniciar tema salvo ou padrão (Estrelas)
  applyTheme(currentTheme);
});
