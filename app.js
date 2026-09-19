(function(){
  "use strict";

  const sb = window.supabase.createClient(window.SINAR_CONFIG.SUPABASE_URL, window.SINAR_CONFIG.SUPABASE_ANON_KEY);

  const ICONS = {
    gift: '<path d="M4 9h16M12 9v11M8 9c-1.5 0-2.5-1-2.5-2.3S6.8 4 8 4c1.8 0 3 2 4 5c1-3 2.2-5 4-5c1.2 0 2.5 1.1 2.5 2.7S17.5 9 16 9"/><rect x="4" y="9" width="16" height="11" rx="1"/>',
    wallet: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/><circle cx="16" cy="14.2" r="1.3" fill="currentColor" stroke="none"/>',
    shield: '<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/><path d="M9 12l2 2 4-4"/>',
    gradcap: '<path d="M12 4l10 5-10 5L2 9l10-5z"/><path d="M6 11.5v4.3c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.3"/><path d="M22 9v6"/>',
    food: '<path d="M4 13a8 8 0 0116 0"/><path d="M2 13h20"/><path d="M12 3v3"/>',
    home: '<path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/><path d="M10 20v-6h4v6"/>',
    heartBowl: '<path d="M4 12h16l-1.4 6.2A2 2 0 0116.6 20H7.4a2 2 0 01-2-1.8L4 12z"/><path d="M12 12c-1.6-1.8-4.2-1.4-4.2 1M12 12c1.6-1.8 4.2-1.4 4.2 1"/>',
    pot: '<path d="M4 10h16l-1.5 9a2 2 0 01-2 1.7H7.5A2 2 0 015.5 19L4 10z"/><path d="M8 10V7a4 4 0 018 0v3"/>',
    briefcase: '<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2"/><path d="M3 13h18"/>',
    peopleHands: '<circle cx="8" cy="7.5" r="3"/><circle cx="16" cy="7.5" r="3"/><path d="M2 20c0-3.3 2.7-5.6 6-5.6s6 2.3 6 5.6"/><path d="M10 20c0-3.3 2.7-5.6 6-5.6s6 2.3 6 5.6"/>',
    ambulance: '<rect x="2" y="10" width="14" height="8" rx="1"/><path d="M16 13h4l2 3.2V18h-6"/><path d="M7 10V6h4v4"/><circle cx="7.5" cy="19" r="1.6"/><circle cx="17.5" cy="19" r="1.6"/>',
    heartHands: '<path d="M12 15.5s-4.2-2.6-5.7-5.3C5.4 8.2 6.2 6 8.2 5.7c1.2-.2 2.2.5 2.7 1.4.5-.9 1.5-1.6 2.7-1.4 2 .3 2.8 2.5 1.9 4.5-1.5 2.7-5.7 5.3-5.7 5.3z"/><path d="M4 21c0-2.2 1.8-3.8 4-3.8s4 1.6 4 3.8"/><path d="M12 21c0-2.2 1.8-3.8 4-3.8s4 1.6 4 3.8"/>',
    toolkit: '<rect x="3" y="9" width="18" height="11" rx="2"/><path d="M8 9V7a2 2 0 012-2h4a2 2 0 012 2v2"/><circle cx="12" cy="14.4" r="2.1"/>',
    docs: '<path d="M9 12l2 2 4-4"/><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 2v4M16 2v4"/>',
    stack: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 8v5"/><circle cx="12" cy="16.3" r="0.6" fill="currentColor"/>',
    coin: '<circle cx="12" cy="12" r="9"/><path d="M9.5 15.5c0 1 1 1.8 2.5 1.8s2.5-.8 2.5-1.8c0-2.6-5-1.4-5-4 0-1 1-1.8 2.5-1.8s2.5.8 2.5 1.8"/><path d="M12 6.5v11"/>'
  };
  function iconSvg(key){ return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[key]||ICONS.shield) + '</svg>'; }

  const BANTUAN = [
    {id:'bingkas-kasih', no:1, title:'Bingkas Kasih', subtitle:'Bantuan Awal Pengajian', icon:'gift',
      desc:'Bantuan sekali sedia bagi membantu pelajar baharu menyediakan keperluan asas semasa mendaftar di UMT.'},
    {id:'dana-siswa', no:2, title:'Dana Siswa Sara Hidup', subtitle:'RM200.00', icon:'wallet', amount:200,
      desc:'Sumbangan tunai sara hidup bulanan bagi meringankan beban perbelanjaan harian pelajar.'},
    {id:'skim-perlindungan', no:3, title:'Skim Perlindungan Pelajar', subtitle:'Perlindungan Insurans/Takaful', icon:'shield',
      desc:'Perlindungan automatik kepada semua pelajar berdaftar sepanjang tempoh pengajian di UMT.'},
    {id:'siswa-sulung', no:4, title:'Program Pembangunan Siswa Sulung', subtitle:'Bantuan Yuran Pengajian', icon:'gradcap',
      desc:'Bantuan yuran pengajian khusus untuk anak pertama dalam keluarga yang menyambung pengajian di peringkat ijazah sarjana muda.'},
    {id:'maidam', no:5, title:'Dapo MAIDAM@UMT', subtitle:'Bantuan Baucer Makanan', icon:'food',
      desc:'Baucer makanan untuk membantu keperluan pemakanan harian pelajar yang memerlukan.'},
    {id:'rumah-rezeki', no:6, title:'Rumah Rezeki', subtitle:'Bantuan Kebajikan', icon:'home',
      desc:'Sokongan tempat tinggal atau bantuan berkaitan penginapan bagi pelajar yang menghadapi kesukaran.'},
    {id:'menu-kasih', no:7, title:'Menu Kasih Siswa', subtitle:'Bantuan Makanan', icon:'heartBowl',
      desc:'Inisiatif penyediaan makanan berkonsepkan kasih sayang untuk kebajikan pelajar.'},
    {id:'dapur-madani', no:8, title:'Dapur Siswa MADANI', subtitle:'Bantuan Makanan', icon:'pot',
      desc:'Dapur komuniti kampus yang menyediakan makanan berkhidmat kepada pelajar yang memerlukan.'},
    {id:'mysiswa-joc', no:9, title:'Mysiswa Job On Campus', subtitle:'Peluang Pekerjaan Sambilan', icon:'briefcase',
      desc:'Peluang bekerja sambilan dalam kampus bagi pelajar menjana pendapatan tambahan semasa belajar.'},
    {id:'jenazah', no:10, title:'Sumbangan Pengurusan Jenazah dan Khairat Kematian', subtitle:'RM2,500.00', icon:'peopleHands', amount:2500,
      desc:'Sumbangan bagi menguruskan jenazah dan khairat kematian pelajar yang berdaftar di UMT.'},
    {id:'pengangkutan-kecemasan', no:11, title:'Bantuan Pengangkutan Untuk Kes Kecemasan', subtitle:'Bantuan Kecemasan', icon:'ambulance',
      desc:'Bantuan kos pengangkutan segera bagi pelajar yang menghadapi situasi kecemasan.'},
    {id:'kebajikan-pelajar', no:12, title:'Bantuan Kebajikan Pelajar', subtitle:'7 Jenis Bantuan Khas', icon:'heartHands',
      desc:'Merangkumi pelbagai bentuk bantuan kebajikan berikut — sila pilih jenis yang berkaitan semasa memohon.',
      subtypes:['Khairat Kematian Ibu dan Bapa','Kos Penghantaran Pelajar Kematian Waris','Masalah Kesihatan','Tragedi/Bencana','Masalah Tajaan','Sara Hidup','Kes-Kes Khas']},
    {id:'latihan-industri', no:13, title:'Bantuan Khas Latihan Industri', subtitle:'Bantuan Latihan Industri', icon:'toolkit',
      desc:'Bantuan khas bagi meringankan kos yang ditanggung pelajar semasa menjalani latihan industri.'}
  ];
  const BANTUAN_BY_ID = {};
  BANTUAN.forEach(function(b){ BANTUAN_BY_ID[b.id] = b; });

  const MONTH_LABELS = ['Jan','Feb','Mac','Apr','Mei','Jun','Jul','Ogo','Sep','Okt','Nov','Dis'];
  const DONUT_COLORS = ['#0B2A45','#D9A441','#127373','#3F7D4F','#6C4A7C','#B9AE86'];
  const FILE_RULES = { maxFiles:3, maxBytes:3*1024*1024, allowedTypes:['application/pdf','image/jpeg','image/png'], allowedExt:['.pdf','.jpg','.jpeg','.png'] };
  const STATUS_LIST = ['Dalam Semakan','Diluluskan','Ditolak'];

  let isAdmin = false;
  let publicStats = [];
  let adminApplications = [];
  let refreshTimer = null;

  const tabButtons = document.querySelectorAll('nav.tabs button');
  const sections = document.querySelectorAll('main section');
  function setActiveTab(tab){
    tabButtons.forEach(function(b){ b.classList.toggle('active', b.dataset.tab===tab); });
    sections.forEach(function(s){ s.classList.toggle('active', s.id === 'tab-'+tab); });
    document.getElementById('navTabs').classList.remove('open');
    window.scrollTo({top:0, behavior:'auto'});
  }
  tabButtons.forEach(function(b){ b.addEventListener('click', function(){ setActiveTab(b.dataset.tab); }); });
  document.querySelectorAll('[data-goto]').forEach(function(b){
    b.addEventListener('click', function(){ setActiveTab(b.dataset.goto); });
  });
  document.getElementById('hamburgerBtn').addEventListener('click', function(){
    document.getElementById('navTabs').classList.toggle('open');
  });

  function renderBantuanGrid(){
    const host = document.getElementById('bantuanGrid');
    host.innerHTML = BANTUAN.map(function(b){
      const subtypesHtml = b.subtypes ? ('<ul class="subtypes">' + b.subtypes.slice(0,3).map(function(s){return '<li>'+s+'</li>';}).join('') + '<li>…dan lain-lain</li></ul>') : '';
      return '' +
      '<div class="bantuan-card">' +
        '<div class="no mono">#' + String(b.no).padStart(2,'0') + '</div>' +
        '<div class="icon-wrap">' + iconSvg(b.icon) + '</div>' +
        '<div class="subtitle">' + b.subtitle + '</div>' +
        '<h4>' + b.title + '</h4>' +
        '<p class="desc">' + b.desc + '</p>' +
        subtypesHtml +
        '<button class="btn btn-teal mohon-btn" data-apply="' + b.id + '">Mohon Sekarang</button>' +
      '</div>';
    }).join('');
    host.querySelectorAll('[data-apply]').forEach(function(btn){
      btn.addEventListener('click', function(){ openModal(btn.dataset.apply); });
    });
  }

  let selectedFiles = [];
  function formatBytes(bytes){
    if (bytes >= 1024*1024) return (bytes/(1024*1024)).toFixed(1) + 'MB';
    return Math.max(1, Math.round(bytes/1024)) + 'KB';
  }
  function renderFileChips(){
    const host = document.getElementById('fileChipsList');
    host.innerHTML = selectedFiles.map(function(f,i){
      return '<span class="file-chip"><span>'+f.name+'</span><span class="fc-size">'+formatBytes(f.size)+'</span><button type="button" class="fc-remove" data-remove="'+i+'" aria-label="Buang fail">✕</button></span>';
    }).join('');
    host.querySelectorAll('[data-remove]').forEach(function(btn){
      btn.addEventListener('click', function(){
        selectedFiles.splice(parseInt(btn.dataset.remove,10), 1);
        renderFileChips();
      });
    });
  }
  const docInput = document.getElementById('in-doc');
  docInput.addEventListener('change', function(){
    const incoming = Array.from(docInput.files || []);
    let errors = [];
    incoming.forEach(function(f){
      const extOk = FILE_RULES.allowedExt.some(function(ext){ return f.name.toLowerCase().endsWith(ext); });
      if (!FILE_RULES.allowedTypes.includes(f.type) && !extOk){ errors.push(f.name + ' — jenis fail tidak dibenarkan.'); return; }
      if (f.size > FILE_RULES.maxBytes){ errors.push(f.name + ' — melebihi had 3MB.'); return; }
      if (selectedFiles.length >= FILE_RULES.maxFiles){ errors.push('Had maksimum ' + FILE_RULES.maxFiles + ' fail dicapai.'); return; }
      selectedFiles.push(f);
    });
    docInput.value = '';
    renderFileChips();
    if (errors.length) showToast(errors[0]);
  });

  const modalBackdrop = document.getElementById('modalBackdrop');
  const formView = document.getElementById('formView');
  const confirmView = document.getElementById('confirmView');
  let currentCategory = null;

  function openModal(categoryId){
    currentCategory = BANTUAN_BY_ID[categoryId];
    if (!currentCategory) return;
    document.getElementById('modalTitle').textContent = 'Borang Permohonan';
    document.getElementById('modalSubtitle').textContent = currentCategory.title + ' — ' + currentCategory.subtitle;
    const subtypeField = document.getElementById('f-subtype');
    const subtypeSelect = document.getElementById('in-subtype');
    if (currentCategory.subtypes){
      subtypeField.style.display = 'block';
      subtypeSelect.innerHTML = currentCategory.subtypes.map(function(s){ return '<option value="'+s+'">'+s+'</option>'; }).join('');
    } else {
      subtypeField.style.display = 'none';
    }
    formView.style.display = 'block';
    confirmView.style.display = 'none';
    document.getElementById('applyForm').reset();
    document.querySelectorAll('#applyForm .field').forEach(function(f){ f.classList.remove('invalid'); });
    selectedFiles = [];
    renderFileChips();
    modalBackdrop.classList.add('open');
  }
  function closeModal(){ modalBackdrop.classList.remove('open'); }
  document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
  document.getElementById('cancelBtn').addEventListener('click', closeModal);
  document.getElementById('doneBtn').addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', function(e){ if (e.target===modalBackdrop) closeModal(); });

  function validateField(id, isValid){
    document.getElementById(id).classList.toggle('invalid', !isValid);
    return isValid;
  }
  function generateRef(){
    const year = new Date().getFullYear();
    const rand = Math.floor(10000 + Math.random()*89999);
    return 'SNR-' + year + '-' + rand;
  }

  document.getElementById('applyForm').addEventListener('submit', async function(e){
    e.preventDefault();
    const name = document.getElementById('in-name').value.trim();
    const matric = document.getElementById('in-matric').value.trim();
    const faculty = document.getElementById('in-faculty').value.trim();
    const phone = document.getElementById('in-phone').value.trim();
    const email = document.getElementById('in-email').value.trim();
    const note = document.getElementById('in-note').value.trim();

    let ok = true;
    ok = validateField('f-name', name.length>1) && ok;
    ok = validateField('f-matric', matric.length>2) && ok;
    ok = validateField('f-faculty', faculty.length>1) && ok;
    ok = validateField('f-phone', /^[0-9+\-\s]{7,15}$/.test(phone)) && ok;
    ok = validateField('f-email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) && ok;
    ok = validateField('f-note', note.length>3) && ok;
    if (!ok) return;

    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Menghantar...';

    try{
      const ref = generateRef();
      const attachments = [];
      for (let i=0;i<selectedFiles.length;i++){
        const f = selectedFiles[i];
        const path = ref + '/' + Date.now() + '-' + i + '-' + f.name.replace(/[^a-zA-Z0-9.\-_]/g,'_');
        const up = await sb.storage.from('attachments').upload(path, f, { contentType: f.type });
        if (up.error){
          showToast('Fail "' + f.name + '" gagal dimuat naik.');
        } else {
          attachments.push({ path: path, name: f.name, type: f.type, size: f.size });
        }
      }

      const { error } = await sb.from('applications').insert({
        ref: ref, category_id: currentCategory.id, category: currentCategory.title,
        subtype: currentCategory.subtypes ? document.getElementById('in-subtype').value : null,
        name: name, matric: matric, faculty: faculty, phone: phone, email: email, note: note,
        attachments: attachments
      });
      if (error) throw error;

      formView.style.display = 'none';
      confirmView.style.display = 'block';
      document.getElementById('refNumberOut').textContent = ref;
      showToast('Permohonan ' + currentCategory.title + ' berjaya dihantar.');
      selectedFiles = [];
      renderFileChips();
      loadPublicStats();
    }catch(err){
      console.error('Submit error', err);
      showToast('Ralat menghantar permohonan. Sila cuba lagi.');
    }finally{
      submitBtn.disabled = false;
      submitBtn.textContent = 'Hantar Permohonan';
    }
  });

  function statusClass(status){
    if (status === 'Diluluskan') return 'status-pill approved';
    if (status === 'Ditolak') return 'status-pill rejected';
    return 'status-pill';
  }
  document.getElementById('lookupBtn').addEventListener('click', async function(){
    const ref = document.getElementById('lk-ref').value.trim();
    const email = document.getElementById('lk-email').value.trim();
    const host = document.getElementById('lookupResult');
    if (!ref || !email){ showToast('Sila isi nombor rujukan dan emel.'); return; }
    host.innerHTML = '<p class="mono" style="color:var(--ink-soft);font-size:13px;">Menyemak...</p>';
    try{
      const { data, error } = await sb.rpc('lookup_application', { p_ref: ref, p_email: email });
      if (error) throw error;
      if (!data || !data.length){
        host.innerHTML = '<div class="empty-state">' + iconSvg('alert') + '<h4>Tidak dijumpai</h4><p>Sila semak semula nombor rujukan dan emel yang digunakan semasa memohon.</p></div>';
        return;
      }
      const a = data[0];
      const attHtml = (a.attachments && a.attachments.length)
        ? ('<div class="app-attachments">' + a.attachments.map(function(att){ return '<span class="att-btn">'+iconSvg('docs')+' '+att.name+'</span>'; }).join('') + '</div>')
        : '';
      host.innerHTML = '<div class="apps-list"><div class="app-row">' +
        '<div class="cat">' + a.category + (a.subtype?' — '+a.subtype:'') + '</div>' +
        '<div class="meta mono">' + a.ref + '</div>' +
        '<div class="meta">' + new Date(a.created_at).toLocaleDateString('ms-MY',{day:'2-digit',month:'short',year:'numeric'}) + '</div>' +
        '<div class="' + statusClass(a.status) + '">' + a.status + '</div>' +
        attHtml +
        '</div></div>';
    }catch(err){
      console.error('Lookup error', err);
      host.innerHTML = '<p style="color:var(--danger);font-size:13.5px;">Ralat semasa menyemak. Sila cuba lagi.</p>';
    }
  });

  const adminCategoryFilter = document.getElementById('adminCategoryFilter');
  adminCategoryFilter.innerHTML += BANTUAN.map(function(b){ return '<option value="'+b.id+'">'+b.title+'</option>'; }).join('');

  async function refreshAuthUI(){
    const { data: { session } } = await sb.auth.getSession();
    isAdmin = !!session;
    document.getElementById('adminLoginView').style.display = isAdmin ? 'none' : 'block';
    document.getElementById('adminPanelView').style.display = isAdmin ? 'block' : 'none';
    if (isAdmin) loadAdminApplications();
  }
  sb.auth.onAuthStateChange(function(){ refreshAuthUI(); });

  document.getElementById('adminLoginBtn').addEventListener('click', async function(){
    const email = document.getElementById('admin-email').value.trim();
    const password = document.getElementById('admin-password').value;
    const errEl = document.getElementById('adminLoginError');
    errEl.style.display = 'none';
    const btn = document.getElementById('adminLoginBtn');
    btn.disabled = true; btn.textContent = 'Log masuk...';
    try{
      const { error } = await sb.auth.signInWithPassword({ email: email, password: password });
      if (error) throw error;
    }catch(err){
      errEl.textContent = 'Log masuk gagal — sila semak emel/kata laluan.';
      errEl.style.display = 'block';
    }finally{
      btn.disabled = false; btn.textContent = 'Log Masuk';
    }
  });
  document.getElementById('adminLogoutBtn').addEventListener('click', async function(){
    await sb.auth.signOut();
  });

  async function loadAdminApplications(){
    const { data, error } = await sb.from('applications').select('*').order('created_at', { ascending:false }).limit(1000);
    if (!error){ adminApplications = data || []; renderAdminTable(); }
  }
  document.getElementById('adminSearch').addEventListener('input', renderAdminTable);
  adminCategoryFilter.addEventListener('change', renderAdminTable);
  document.getElementById('adminStatusFilter').addEventListener('change', renderAdminTable);

  async function updateApplicationStatus(ref, newStatus, selectEl){
    selectEl.disabled = true;
    try{
      const { error } = await sb.from('applications').update({ status: newStatus }).eq('ref', ref);
      if (error) throw error;
      showToast('Status ' + ref + ' dikemas kini kepada "' + newStatus + '".');
      const row = adminApplications.find(function(a){ return a.ref===ref; });
      if (row) row.status = newStatus;
    }catch(err){
      showToast('Gagal kemas kini status.');
      renderAdminTable();
    }finally{
      selectEl.disabled = false;
    }
  }

  async function attachmentLink(path){
    const { data, error } = await sb.storage.from('attachments').createSignedUrl(path, 60);
    if (error || !data){ showToast('Gagal membuka fail.'); return; }
    window.open(data.signedUrl, '_blank', 'noopener');
  }

  function renderAdminTable(){
    const host = document.getElementById('adminTableWrap');
    if (!host) return;
    const q = (document.getElementById('adminSearch').value || '').trim().toLowerCase();
    const catFilter = document.getElementById('adminCategoryFilter').value;
    const statusFilter = document.getElementById('adminStatusFilter').value;

    const rows = adminApplications.filter(function(a){
      if (catFilter && a.category_id !== catFilter) return false;
      if (statusFilter && a.status !== statusFilter) return false;
      if (q){
        const hay = ((a.name||'')+' '+(a.matric||'')+' '+(a.ref||'')).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    if (!rows.length){
      host.innerHTML = '<div class="admin-empty">Tiada permohonan sepadan dengan penapis semasa.</div>';
      return;
    }

    let html = '<div class="admin-table-scroll"><table class="admin-table"><thead><tr>' +
      '<th>Rujukan</th><th>Kategori</th><th>Nama</th><th>No. Matrik</th><th>Fakulti</th><th>Telefon</th><th>Emel</th><th>Catatan</th><th>Lampiran</th><th>Tarikh</th><th>Status</th>' +
      '</tr></thead><tbody>';
    rows.forEach(function(a){
      const attHtml = (a.attachments && a.attachments.length)
        ? a.attachments.map(function(att){ return '<button type="button" class="att-btn" data-path="'+att.path+'">'+iconSvg('docs')+' '+att.name+'</button>'; }).join('')
        : '<span style="color:var(--ink-soft);">—</span>';
      const options = STATUS_LIST.map(function(s){ return '<option value="'+s+'"'+(s===a.status?' selected':'')+'>'+s+'</option>'; }).join('');
      html += '<tr>' +
        '<td class="mono">'+a.ref+'</td>' +
        '<td>'+a.category+(a.subtype?' — '+a.subtype:'')+'</td>' +
        '<td>'+a.name+'</td>' +
        '<td class="mono">'+a.matric+'</td>' +
        '<td>'+a.faculty+'</td>' +
        '<td class="mono">'+a.phone+'</td>' +
        '<td class="mono">'+a.email+'</td>' +
        '<td class="note-cell">'+(a.note||'')+'</td>' +
        '<td>'+attHtml+'</td>' +
        '<td>'+new Date(a.created_at).toLocaleDateString('ms-MY',{day:'2-digit',month:'short',year:'numeric'})+'</td>' +
        '<td><select class="status-select" data-ref="'+a.ref+'">'+options+'</select></td>' +
        '</tr>';
    });
    html += '</tbody></table></div>';
    host.innerHTML = html;
    host.querySelectorAll('.status-select').forEach(function(sel){
      sel.addEventListener('change', function(){ updateApplicationStatus(sel.dataset.ref, sel.value, sel); });
    });
    host.querySelectorAll('.att-btn[data-path]').forEach(function(btn){
      btn.addEventListener('click', function(){ attachmentLink(btn.dataset.path); });
    });
  }

  function csvEscape(v){
    v = (v===undefined||v===null) ? '' : String(v);
    if (/[",\n]/.test(v)) return '"' + v.replace(/"/g,'""') + '"';
    return v;
  }
  document.getElementById('exportBtn').addEventListener('click', function(){
    if (!adminApplications.length){ showToast('Tiada data untuk dieksport lagi.'); return; }
    const headers = ['Rujukan','Kategori','Sub-jenis','Nama','No Matrik','Fakulti','Telefon','Emel','Catatan','Tarikh','Status'];
    const rows = adminApplications.map(function(a){
      return [a.ref, a.category, a.subtype||'', a.name, a.matric, a.faculty, a.phone, a.email, (a.note||'').replace(/\n/g,' '), a.created_at, a.status];
    });
    const csv = [headers].concat(rows).map(function(r){ return r.map(csvEscape).join(','); }).join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'permohonan-bantuan-umt.csv';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function(){ URL.revokeObjectURL(url); }, 4000);
  });

  function formatRM(value){
    if (value >= 1000000) return 'RM' + (value/1000000).toFixed(1) + 'J';
    if (value >= 1000) return 'RM' + (value/1000).toFixed(1) + 'K';
    return 'RM' + Math.round(value).toLocaleString('ms-MY');
  }
  function relativeTime(iso){
    const diffMs = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diffMs/60000);
    if (mins < 1) return 'Baru sahaja';
    if (mins < 60) return mins + ' minit lalu';
    const hrs = Math.floor(mins/60);
    if (hrs < 24) return hrs + ' jam lalu';
    const days = Math.floor(hrs/24);
    if (days < 7) return days + ' hari lalu';
    return new Date(iso).toLocaleDateString('ms-MY',{day:'2-digit',month:'short'});
  }
  function buildMonthBuckets(rows, monthsBack){
    const now = new Date();
    const buckets = [];
    for (let i=monthsBack; i>=0; i--){
      const d = new Date(now.getFullYear(), now.getMonth()-i, 1);
      buckets.push({ key: d.getFullYear()+'-'+d.getMonth(), label: MONTH_LABELS[d.getMonth()], count:0 });
    }
    rows.forEach(function(r){
      const d = new Date(r.created_at);
      const key = d.getFullYear()+'-'+d.getMonth();
      const bucket = buckets.find(function(b){ return b.key===key; });
      if (bucket) bucket.count++;
    });
    return buckets;
  }

  let pinnedIndex = null;

  async function loadPublicStats(){
    try{
      const { data, error } = await sb.from('applications_public_stats').select('*').order('created_at', { ascending:false }).limit(2000);
      if (error) throw error;
      publicStats = data || [];
      document.getElementById('storageBanner').classList.remove('show');
    }catch(err){
      console.error('Stats load error', err);
      const banner = document.getElementById('storageBanner');
      banner.textContent = 'Tidak dapat sambung ke pangkalan data buat masa ini. Sila cuba muat semula halaman.';
      banner.classList.add('show');
    }
    renderDashboardLanding();
  }

  function renderDashboardLanding(){
    const total = publicStats.length;
    const byCategory = {};
    publicStats.forEach(function(a){ byCategory[a.category_id] = (byCategory[a.category_id]||0) + 1; });
    const categoriesUsed = Object.keys(byCategory).filter(function(id){ return byCategory[id]>0; }).length;
    const categoriesUnused = BANTUAN.length - categoriesUsed;
    let disbursed = 0;
    BANTUAN.forEach(function(b){ if (b.amount) disbursed += (byCategory[b.id]||0) * b.amount; });

    document.getElementById('kpiRow').innerHTML = '' +
      '<div class="kpi-card highlight"><div class="kpi-top"><span class="kpi-label">Jumlah Permohonan</span>'+iconSvg('docs')+'</div><div class="kpi-value">'+total.toLocaleString('ms-MY')+'</div><div class="kpi-note">Data masa nyata dari portal</div></div>' +
      '<div class="kpi-card"><div class="kpi-top"><span class="kpi-label">Kategori Digunakan</span>'+iconSvg('stack')+'</div><div class="kpi-value">'+categoriesUsed+'/'+BANTUAN.length+'</div><div class="kpi-note">Kategori dengan sekurang-kurangnya 1 permohonan</div></div>' +
      '<div class="kpi-card"><div class="kpi-top"><span class="kpi-label">Belum Ada Permohonan</span>'+iconSvg('alert')+'</div><div class="kpi-value">'+categoriesUnused+'</div><div class="kpi-note">Kategori bantuan belum dimohon</div></div>' +
      '<div class="kpi-card"><div class="kpi-top"><span class="kpi-label">Anggaran Bantuan Disalurkan</span>'+iconSvg('coin')+'</div><div class="kpi-value">'+formatRM(disbursed)+'</div><div class="kpi-note">Dikira dari kategori bernilai tetap sahaja</div></div>';

    const buckets = buildMonthBuckets(publicStats, 9);
    document.getElementById('trendRange').textContent = buckets[0].label + ' – ' + buckets[buckets.length-1].label;
    if (pinnedIndex === null || pinnedIndex >= buckets.length) pinnedIndex = buckets.length-1;
    drawTrendChart(document.getElementById('trendChartHost'), buckets);

    const sortedCats = Object.keys(byCategory).sort(function(a,b){ return byCategory[b]-byCategory[a]; });
    let segments = sortedCats.slice(0,5).map(function(id){ return { label: BANTUAN_BY_ID[id] ? BANTUAN_BY_ID[id].title : id, value: byCategory[id] }; });
    if (sortedCats.length > 5){
      const rest = sortedCats.slice(5).reduce(function(s,id){ return s+byCategory[id]; }, 0);
      segments.push({ label:'Lain-lain', value: rest });
    }
    drawDonutChart(document.getElementById('donutHost'), segments);

    document.getElementById('bellDot').style.display = total>0 ? 'block' : 'none';
    const recent = publicStats.slice(0,5);
    document.getElementById('bellPanelBody').innerHTML = recent.length ? recent.map(function(e){
      const cat = BANTUAN_BY_ID[e.category_id];
      return '<div class="bp-row"><div class="bp-cat">'+(cat ? cat.title : e.category_id)+'</div><div class="bp-meta mono">'+e.ref+' · '+relativeTime(e.created_at)+'</div></div>';
    }).join('') : '<div class="bp-empty">Tiada aktiviti permohonan lagi.</div>';
  }

  function shortLabel(title){
    if (title.length<=20) return title;
    return title.split(' ').slice(0,2).join(' ');
  }

  function drawTrendChart(host, buckets){
    const width = 560, height = 300;
    const padTop = 26, padBottom = 40, padLeft = 46, padRight = 20;
    const plotW = width - padLeft - padRight;
    const plotH = height - padTop - padBottom;
    const maxVal = Math.max(5, Math.ceil(Math.max.apply(null, buckets.map(function(b){return b.count;}).concat([0])) * 1.3));
    const stepX = plotW / (buckets.length-1);

    const gridSteps = 4;
    let gridLines = '', gridLabels = '';
    for (let i=0;i<=gridSteps;i++){
      const val = Math.round((maxVal/gridSteps)*i);
      const y = padTop + plotH - (val/maxVal)*plotH;
      gridLines += '<line x1="'+padLeft+'" y1="'+y+'" x2="'+(width-padRight)+'" y2="'+y+'" stroke="#EEE6D2" stroke-width="1" stroke-dasharray="3 4"/>';
      gridLabels += '<text x="'+(padLeft-10)+'" y="'+(y+4)+'" text-anchor="end" font-size="11" fill="#54637A" font-family="IBM Plex Mono, monospace">'+val+'</text>';
    }

    const points = buckets.map(function(b,i){
      const x = padLeft + i*stepX;
      const y = padTop + plotH - (b.count/maxVal)*plotH;
      return {x:x, y:y, b:b};
    });
    const linePath = points.map(function(p,i){ return (i===0?'M':'L') + p.x.toFixed(1) + ' ' + p.y.toFixed(1); }).join(' ');
    const areaPath = linePath + ' L ' + points[points.length-1].x + ' ' + (padTop+plotH) + ' L ' + points[0].x + ' ' + (padTop+plotH) + ' Z';

    let xLabels = '', circles = '';
    points.forEach(function(p,i){
      xLabels += '<text x="'+p.x+'" y="'+(padTop+plotH+22)+'" text-anchor="middle" font-size="11" fill="#54637A" font-family="IBM Plex Sans, sans-serif">'+p.b.label+'</text>';
      const isPinned = i===pinnedIndex;
      circles += '<circle class="trend-pt" data-idx="'+i+'" cx="'+p.x+'" cy="'+p.y+'" r="'+(isPinned?5.5:4)+'" fill="'+(isPinned?'#0B2A45':'#FFFFFF')+'" stroke="#0B2A45" stroke-width="2" style="cursor:pointer;"/>';
    });

    let tooltip = '';
    if (pinnedIndex!==null && points[pinnedIndex]){
      const p = points[pinnedIndex];
      const boxW = 152, boxH = 52;
      let bx = p.x - boxW/2; bx = Math.max(padLeft, Math.min(bx, width-padRight-boxW));
      let by = p.y - boxH - 14; if (by < 4) by = p.y + 14;
      tooltip = '<g><rect x="'+bx+'" y="'+by+'" width="'+boxW+'" height="'+boxH+'" rx="8" fill="#FFFFFF" stroke="#DED2AE" stroke-width="1.2"/>' +
        '<text x="'+(bx+14)+'" y="'+(by+21)+'" font-size="13" font-weight="700" fill="#152233" font-family="IBM Plex Sans, sans-serif">'+p.b.label+'</text>' +
        '<text x="'+(bx+14)+'" y="'+(by+38)+'" font-size="12" fill="#54637A" font-family="IBM Plex Sans, sans-serif">Permohonan : '+p.b.count+'</text></g>';
    }

    host.innerHTML = '<svg viewBox="0 0 '+width+' '+height+'" width="100%" height="'+height+'" role="img" aria-label="Carta trend permohonan bulanan">' +
      gridLines +
      '<line x1="'+padLeft+'" y1="'+(padTop+plotH)+'" x2="'+(width-padRight)+'" y2="'+(padTop+plotH)+'" stroke="#B9AE86" stroke-width="1.2"/>' +
      gridLabels +
      '<path d="'+areaPath+'" fill="#12737318" stroke="none"/>' +
      '<path d="'+linePath+'" fill="none" stroke="#127373" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>' +
      circles + xLabels + tooltip +
      '</svg>';
    host.querySelectorAll('.trend-pt').forEach(function(c){
      c.addEventListener('click', function(){
        pinnedIndex = parseInt(c.dataset.idx,10);
        drawTrendChart(host, buckets);
      });
    });
  }

  function drawDonutChart(host, segments){
    const total = segments.reduce(function(s,seg){ return s+seg.value; }, 0);
    const size = 180, r = 62, cx = size/2, cy = size/2, strokeW = 26;
    const circumference = 2 * Math.PI * r;
    let cumulative = 0;
    let circles = '';
    if (total === 0){
      circles = '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="#ECE1C4" stroke-width="'+strokeW+'"/>';
    } else {
      segments.forEach(function(seg, i){
        const frac = seg.value/total;
        const dash = frac * circumference;
        const gap = circumference - dash;
        const offset = -cumulative * circumference;
        circles += '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="'+DONUT_COLORS[i%DONUT_COLORS.length]+'" stroke-width="'+strokeW+'" stroke-dasharray="'+dash+' '+gap+'" stroke-dashoffset="'+offset+'" transform="rotate(-90 '+cx+' '+cy+')"/>';
        cumulative += frac;
      });
    }
    const svg = '<svg viewBox="0 0 '+size+' '+size+'" width="'+size+'" height="'+size+'" role="img" aria-label="Carta pecahan kategori bantuan">' +
      circles +
      '<text x="'+cx+'" y="'+(cy-3)+'" text-anchor="middle" font-size="20" font-weight="700" fill="#152233" font-family="Fraunces, serif">'+total+'</text>' +
      '<text x="'+cx+'" y="'+(cy+15)+'" text-anchor="middle" font-size="10.5" fill="#54637A" font-family="IBM Plex Sans, sans-serif">permohonan</text></svg>';
    const legend = total===0
      ? '<div class="leg-row"><span class="leg-label" style="color:var(--ink-soft)">Belum ada permohonan direkodkan.</span></div>'
      : segments.map(function(seg,i){ return '<div class="leg-row"><span class="leg-dot" style="background:'+DONUT_COLORS[i%DONUT_COLORS.length]+'"></span><span class="leg-label">'+shortLabel(seg.label)+'</span><span class="leg-value">'+seg.value+'</span></div>'; }).join('');
    host.innerHTML = svg + '<div class="donut-legend">' + legend + '</div>';
  }

  const searchInput = document.getElementById('dbSearchInput');
  const searchResults = document.getElementById('dbSearchResults');
  searchInput.addEventListener('input', function(){
    const q = searchInput.value.trim().toLowerCase();
    if (!q){ searchResults.classList.remove('open'); searchResults.innerHTML=''; return; }
    const matches = BANTUAN.filter(function(b){ return b.title.toLowerCase().includes(q) || b.subtitle.toLowerCase().includes(q); }).slice(0,6);
    searchResults.innerHTML = matches.length
      ? matches.map(function(b){ return '<div class="result-row" data-id="'+b.id+'">'+iconSvg(b.icon)+'<div><div class="rtitle">'+b.title+'</div><div class="rsub">'+b.subtitle+'</div></div></div>'; }).join('')
      : '<div class="no-result">Tiada kategori sepadan.</div>';
    searchResults.classList.add('open');
    searchResults.querySelectorAll('[data-id]').forEach(function(row){
      row.addEventListener('click', function(){
        searchResults.classList.remove('open');
        searchInput.value = '';
        setActiveTab('bantuan');
        setTimeout(function(){ openModal(row.dataset.id); }, 60);
      });
    });
  });
  document.addEventListener('click', function(e){
    if (!e.target.closest('.db-search')) searchResults.classList.remove('open');
  });

  const bellBtn = document.getElementById('bellBtn');
  const bellPanel = document.getElementById('bellPanel');
  bellBtn.addEventListener('click', function(e){
    e.stopPropagation();
    bellPanel.classList.toggle('open');
  });
  document.addEventListener('click', function(e){
    if (!e.target.closest('.bell-wrap')) bellPanel.classList.remove('open');
  });

  let toastTimer = null;
  function showToast(msg){
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ t.classList.remove('show'); }, 3500);
  }

  renderBantuanGrid();
  loadPublicStats();
  refreshAuthUI();
  refreshTimer = setInterval(loadPublicStats, 25000);
})();
