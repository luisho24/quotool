// Tab Switcher Logic
function switchTab(tabId) {
    document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    document.getElementById('view-' + tabId).classList.add('active');
    document.getElementById('btn-tab-' + tabId).classList.add('active');
}

// Modal & Experimental Features Logic
function openSettings() {
    document.getElementById('settingsModal').style.display = 'flex';
}

function closeSettings() {
    document.getElementById('settingsModal').style.display = 'none';
}

function toggleExperimental(isEnabled) {
    if (isEnabled) {
        document.body.classList.add('show-experimental');
    } else {
        document.body.classList.remove('show-experimental');
        
        let batchCheckbox = document.getElementById('batchMode');
        if (batchCheckbox && batchCheckbox.checked) {
            batchCheckbox.checked = false;
            toggleBatchMode();
            clearAllData();
        } else {
            document.getElementById('destFilter').value = 'standard';
            document.getElementById('productFilter').value = 'none';
            document.getElementById('insuranceInput').value = '';
            document.getElementById('liftgateFilter').checked = false;
            document.getElementById('cubicFilter').checked = false;
            
            if (appQuotes.length === 1) {
                let q = appQuotes[0];
                q.destType = 'standard';
                q.prodType = 'none';
                q.checkLiftgate = false;
                q.checkCubic = false;
                q.insurance = 0;
                updateSummaryUI();
                renderTable();
            }
        }
    }
    localStorage.setItem('ltl-experimental', isEnabled ? 'true' : 'false');
}

// Theme Logic
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.getElementById('btn-light').classList.toggle('active', theme === 'light');
    document.getElementById('btn-dark').classList.toggle('active', theme === 'dark');
    try { localStorage.setItem('ltl-theme-mode', theme); } catch(e){} 
}

function setAppTheme(themeName) {
    document.documentElement.setAttribute('data-app-theme', themeName);
    document.getElementById('appThemeSelect').value = themeName;
    try { localStorage.setItem('ltl-app-theme', themeName); } catch(e){} 
}

const dict = {
    es: {
        mainTitle: "📊 Parser Inteligente de Cotizaciones LTL",
        step1Title: "1. Datos de la Cotización", analyzeBtn: "Parser Cotización", step2Title: "2. Filtros y Reglas",
        destLabel: "Tipo de Destino:", optStd: "🏢 Comercial Estándar", prodLabel: "Mercancía Especial:", optNone: "📦 General / FAK",
        optTob: "🚬 Tabaco / Cigarros", optAlc: "🍷 Alcohol", optVap: "💨 Vapeadores", optFire: "🔫 Armas / Municiones",
        insLabel: "Seguro Adicional ($):", lblInsurance: "Seguro", lblTotal: "Total",
        liftLabel: "Forzar advertencia de Regla de Liftgate", cubicLabel: "Exceso de Longitud / Capacidad Cúbica (Overlength)",
        lblFrom: "Origen (From)", lblTo: "Destino (To)", lblItems: "Items / Detalles", lblAcc: "Servicios Adicionales (Accessorials)",
        thCarrier: "Carrier", thRate: "Tarifa", thLiability: "Responsabilidad", thTransit: "Tránsito", thNotes: "Notas & Reglas",
        emptyText: "Pega los datos en el panel izquierdo y presiona Parser.", resCount: "Resultados ({0} viables)",
        statOk: "Compatible", statWarn: "Con Restricciones", statBanned: "Prohibido:", statRestr: "Restringido:", 
        day: "Día", days: "Días", rateLTL: "LTL", rateVol: "Volumen",
        warnLiftgate: "Precaución Liftgate", warnCubic: "Regla Capacidad/Longitud", placeholder: "Pega aquí todo el texto de tu cotización (Quote Id, From, To, Items, Rates)...",
        copyBtn: "📋 Copiar para Correo", exportBtn: "📁 Exportar CSV", exportPdfBtn: "📄 PDF", lblIncludeNotes: "Incluir Notas", 
        lblIncludeRating: "Incluir Calificación", msgCopied: "¡Copiado al Portapapeles!",
        shipOptions: "Opciones de Envío", noResults: "Sin resultados exactos.", refLabel: "Quote id:",
        liabNew: "NEW:", liabUsed: "USED:",
        disclaimerMsg: "⚠️ <strong>Aviso Importante:</strong> Esta herramienta proporciona recomendaciones basadas en reglas predefinidas. Siempre debe verificar y hacer un 'double check' de la información y requerimientos según lo solicitado por el cliente y las normativas actualizadas de cada carrier.",
        clearBtn: "Limpiar", clearAllBtn: "Limpiar Todo", autoCopy: "Auto-Parser al Pegar", lblBatchMode: "Modo Batch",
        optSortCheap: "Ordenar: Más Barato", optSortFast: "Ordenar: Más Rápido", optSortRate: "Ordenar: Mejor Calificación", bestPick: "Mejor Opción",
        lblEmailTheme: "Tema Exportación:",
        toastMsg: "¡Copiado con Éxito!",
        volDisclaimer: "<strong>Tarifas LTL vs Volumen:</strong> Las tarifas LTL son la estructura estándar para envíos pequeños. En contraste, las tarifas de Volumen se basan en el espacio lineal y peso para cargas que exceden dimensiones estándar. Las tarifas de volumen ofrecen grandes ahorros pero pueden tener menor disponibilidad o tiempos de tránsito variables.",
        lblLocalTime: "Hora Local", lblPickupNear: "Cut-off cerca", lblPickupLate: "Cut-off pasado",
        waitingRates: "⏳ Esperando tarifas del carrier...",
        lblCarrierCost: "Costo Carrier", lblMargin: "Margen", lblExpDate: "F. Expiración",
        
        // Tabs & Extras ES
        'btn-tab-analyzer': "Parser", 'btn-tab-extras': "Extras",
        extHazTitle: "☢️ Búsqueda Rápida Hazmat / NMFC", extHazDesc: "Busca rápidamente clases de Hazmat, números UN# o NMFC comunes sin salir de la herramienta.", hazmatPlaceholder: "Ej. 1203, UN1203, Explosives, Baterías...",
        
        // Themes ES
        appThmDef: "🎨 Por defecto", appThmMono: "⚫ Monocromo", appThmViv: "🌈 Vivos", appThmFem: "🌸 Femenino", appThmNav: "🌌 Navy", appThmCorp: "🏢 Corporativo", appThmFor: "🌲 Bosque", appThmEar: "🟤 Tierra", appThmMid: "🌙 Medianoche", appThmSla: "📓 Pizarra",
        thmDef: "🎨 Por defecto", thmMono: "⚫ Monocromo", thmViv: "🌈 Vivos", thmFem: "🌸 Femenino", thmNav: "🌌 Navy", thmCorp: "🏢 Corporativo", thmFor: "🌲 Bosque", thmEar: "🟤 Tierra", thmMid: "🌙 Medianoche", thmSla: "📓 Pizarra"
    },
    en: {
        mainTitle: "📊 Smart LTL Quote Parser",
        step1Title: "1. Quote Data Input", analyzeBtn: "Parse Quote", step2Title: "2. Rules & Filters",
        destLabel: "Destination Type:", optStd: "🏢 Standard Commercial", prodLabel: "Special Commodity:", optNone: "📦 General / FAK",
        optTob: "🚬 Tobacco / Cigarettes", optAlc: "🍷 Alcohol", optVap: "💨 Vape Products", optFire: "🔫 Firearms / Ammunition",
        insLabel: "Additional Insurance ($):", lblInsurance: "Insurance", lblTotal: "Total",
        liftLabel: "Force Liftgate Rule Warning", cubicLabel: "Overlength / Cubic Capacity Rule Applies",
        lblFrom: "Origin (From)", lblTo: "Destination (To)", lblItems: "Items / Pallets", lblAcc: "Accessorials",
        thCarrier: "Carrier", thRate: "Rate", thLiability: "Liability", thTransit: "Transit", thNotes: "Notes & Rules",
        emptyText: "Paste quote data in the left panel and click Parse.", resCount: "Results ({0} viable)",
        statOk: "Compatible", statWarn: "With Restrictions", statBanned: "Banned:", statRestr: "Restricted:", 
        day: "Day", days: "Days", rateLTL: "LTL", rateVol: "Volume",
        warnLiftgate: "Liftgate Warning", warnCubic: "Cubic/Length Rule", placeholder: "Paste your full quote text here (Quote Id, From, To, Items, Rates)...",
        copyBtn: "📋 Copy for Email", exportBtn: "📁 CSV", exportPdfBtn: "📄 PDF", lblIncludeNotes: "Include Notes", 
        lblIncludeRating: "Include Rating", msgCopied: "Table Copied!",
        shipOptions: "Shipping Options", noResults: "No exact matches found.", refLabel: "Quote id:",
        liabNew: "NEW:", liabUsed: "USED:",
        disclaimerMsg: "⚠️ <strong>Important Notice:</strong> This tool provides recommendations based on predefined rules. Always double-check information and requirements based on client requests and updated carrier tariffs.",
        clearBtn: "Clear", clearAllBtn: "Clear All", autoCopy: "Auto-Parse on Paste", lblBatchMode: "Batch Mode",
        optSortCheap: "Sort: Cheapest", optSortFast: "Sort: Fastest", optSortRate: "Sort: Best Rating", bestPick: "Best Pick",
        lblEmailTheme: "Export Theme:",
        toastMsg: "Copied successfully!",
        volDisclaimer: "<strong>LTL vs Volume Rates:</strong> The LTL rate is designed for smaller shipments that don't fill a truck's capacity. In contrast, volume rates are based on linear feet and weight for larger shipments. Volume rates offer potential savings but may have less availability and variable transit times.",
        lblLocalTime: "Local Time", lblPickupNear: "Pickup cut-off nearing", lblPickupLate: "Likely too late for today",
        waitingRates: "⏳ Waiting for carrier rates...",
        lblCarrierCost: "Carrier Cost", lblMargin: "Margin", lblExpDate: "Exp. Date",
        
        // Tabs & Extras EN
        'btn-tab-analyzer': "Parser", 'btn-tab-extras': "Extras",
        extHazTitle: "☢️ Hazmat / NMFC Quick Search", extHazDesc: "Quickly search for Hazmat classes, common NMFC numbers, or UN# without leaving the tool.", hazmatPlaceholder: "Ex. 1203, UN1203, Explosives, Batteries...",
        
        // Themes EN 
        appThmDef: "🎨 Default", appThmMono: "⚫ Monochrome", appThmViv: "🌈 Vivid", appThmFem: "🌸 Feminine", appThmNav: "🌌 Navy", appThmCorp: "🏢 Corporate", appThmFor: "🌲 Forest", appThmEar: "🟤 Earthy", appThmMid: "🌙 Midnight", appThmSla: "📓 Slate",
        thmDef: "🎨 Default", thmMono: "⚫ Monochrome", thmViv: "🌈 Vivid", thmFem: "🌸 Feminine", thmNav: "🌌 Navy", thmCorp: "🏢 Corporate", thmFor: "🌲 Forest", thmEar: "🟤 Earthy", thmMid: "🌙 Midnight", thmSla: "📓 Slate"
    }
};

let currentLang = 'en';

function setLang(lang) {
    currentLang = lang;
    document.getElementById('btn-es').classList.toggle('active', lang === 'es');
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
    
    const keys = ['mainTitle', 'step1Title', 'analyzeBtn', 'step2Title', 'destLabel', 'optStd', 'prodLabel', 'optNone', 'optTob', 'optAlc', 'optVap', 'optFire', 'insLabel', 'liftLabel', 'cubicLabel', 'lblIncludeNotes', 'lblIncludeRating', 'clearBtn', 'clearAllBtn', 'lblBatchMode', 'optSortCheap', 'optSortFast', 'optSortRate', 'lblEmailTheme', 'appThmDef', 'appThmMono', 'appThmViv', 'appThmFem', 'appThmNav', 'appThmCorp', 'appThmFor', 'appThmEar', 'appThmMid', 'appThmSla', 'thmDef', 'thmMono', 'thmViv', 'thmFem', 'thmNav', 'thmCorp', 'thmFor', 'thmEar', 'thmMid', 'thmSla', 'toastMsg', 'btn-tab-analyzer', 'btn-tab-extras', 'extHazTitle', 'extHazDesc', 'exportPdfBtn', 'lblCarrierCost', 'lblMargin', 'exportBtn', 'copyBtn'];
    keys.forEach(k => {
        const el = document.getElementById(k);
        if (el) el.innerText = dict[lang][k];
    });
    
    document.getElementById('lblAutoCopy').innerText = dict[lang].autoCopy;
    document.getElementById('inputData').placeholder = dict[lang].placeholder;
    document.getElementById('hazmatSearch').placeholder = dict[lang].hazmatPlaceholder;
    document.getElementById('disclaimerText').innerHTML = dict[lang].disclaimerMsg;
    
    if(appQuotes.length === 0) {
        document.getElementById('emptyText').innerText = dict[lang].emptyText;
        document.getElementById('resultCount').innerText = "Results";
    } else {
        updateSummaryUI();
        renderTable();
    }
    searchHazmat();
}

const carrierInfo = { 
    "abf": { rating: 4.5 }, "aaa cooper": { rating: 3.9 }, "averitt express": { rating: 4.5 }, "estes": { rating: 4.2 }, "old dominion": { rating: 4.9 }, 
    "r&l carriers": { rating: 3.6 }, "saia": { rating: 4.1 }, "xpo": { rating: 3.8 }, "tforce": { rating: 3.3 }, "dayton freight": { rating: 4.8 }, 
    "a. duie pyle": { rating: 4.7 }, "central transport": { rating: 2.2 }, "fedex": { rating: 4.0 }, "fedex economy": { rating: 4.0 }, "fedex priority": { rating: 4.5 }, 
    "custom companies": { rating: 4.0 }, "daylight": { rating: 4.3 }, "forward air": { rating: 3.9 }, "frontline": { rating: 3.8 }, "roadrunner": { rating: 3.2 }, 
    "pitt ohio": { rating: 4.8 }, "ward": { rating: 4.1 }, "southeastern freight": { rating: 4.7 }, "dohrn transfer": { rating: 4.1 }, "magnum": { rating: 4.2 }, 
    "tax airfreight": { rating: 4.0 }, "double d express": { rating: 4.0 }, "n&m transfer": { rating: 4.5 }, "performance freight": {rating: 4.0}, 
    "go2 logistics": { rating: 3.8 }, "a & b freight line": { rating: 4.0 }
};

const stateTimezones = {
    "alabama": "America/Chicago", "alaska": "America/Anchorage", "arizona": "America/Phoenix", "arkansas": "America/Chicago", 
    "california": "America/Los_Angeles", "colorado": "America/Denver", "connecticut": "America/New_York", "delaware": "America/New_York", 
    "florida": "America/New_York", "georgia": "America/New_York", "hawaii": "Pacific/Honolulu", "idaho": "America/Boise", 
    "illinois": "America/Chicago", "indiana": "America/Indiana/Indianapolis", "iowa": "America/Chicago", "kansas": "America/Chicago", 
    "kentucky": "America/New_York", "louisiana": "America/Chicago", "maine": "America/New_York", "maryland": "America/New_York", 
    "massachusetts": "America/New_York", "michigan": "America/Detroit", "minnesota": "America/Chicago", "mississippi": "America/Chicago", 
    "missouri": "America/Chicago", "montana": "America/Denver", "nebraska": "America/Chicago", "nevada": "America/Los_Angeles", 
    "new hampshire": "America/New_York", "new jersey": "America/New_York", "new mexico": "America/Denver", "new york": "America/New_York", 
    "north carolina": "America/New_York", "north dakota": "America/Chicago", "ohio": "America/New_York", "oklahoma": "America/Chicago", 
    "oregon": "America/Los_Angeles", "pennsylvania": "America/New_York", "rhode island": "America/New_York", "south carolina": "America/New_York", 
    "south dakota": "America/Chicago", "tennessee": "America/Chicago", "texas": "America/Chicago", "utah": "America/Denver", 
    "vermont": "America/New_York", "virginia": "America/New_York", "washington": "America/Los_Angeles", "west virginia": "America/New_York", 
    "wisconsin": "America/Chicago", "wyoming": "America/Denver", "dc": "America/New_York", "district of columbia": "America/New_York",
    "al": "America/Chicago", "ak": "America/Anchorage", "az": "America/Phoenix", "ar": "America/Chicago", "ca": "America/Los_Angeles", 
    "co": "America/Denver", "ct": "America/New_York", "de": "America/New_York", "fl": "America/New_York", "ga": "America/New_York", 
    "hi": "Pacific/Honolulu", "id": "America/Boise", "il": "America/Chicago", "in": "America/Indiana/Indianapolis", "ia": "America/Chicago", 
    "ks": "America/Chicago", "ky": "America/New_York", "la": "America/Chicago", "me": "America/New_York", "md": "America/New_York", 
    "ma": "America/New_York", "mi": "America/Detroit", "mn": "America/Chicago", "ms": "America/Chicago", "mo": "America/Chicago", 
    "mt": "America/Denver", "ne": "America/Chicago", "nv": "America/Los_Angeles", "nh": "America/New_York", "nj": "America/New_York", 
    "nm": "America/Denver", "ny": "America/New_York", "nc": "America/New_York", "nd": "America/Chicago", "oh": "America/New_York", 
    "ok": "America/Chicago", "or": "America/Los_Angeles", "pa": "America/New_York", "ri": "America/New_York", "sc": "America/New_York", 
    "sd": "America/Chicago", "tn": "America/Chicago", "tx": "America/Chicago", "ut": "America/Denver", "vt": "America/New_York", 
    "va": "America/New_York", "wa": "America/Los_Angeles", "wv": "America/New_York", "wi": "America/Chicago", "wy": "America/Denver"
};

function getTimezoneForLocation(locationString) {
    if (!locationString || locationString === '-') return null;
    let lowerLoc = locationString.toLowerCase();
    lowerLoc = lowerLoc.replace(/[.,]/g, ' ');
    const words = lowerLoc.split(/\s+/);
    
    for (const [state, tz] of Object.entries(stateTimezones)) {
        if (state.length > 2 && lowerLoc.includes(state)) return tz;
    }
    for (let word of words) {
        if (word.length === 2 && stateTimezones[word]) return stateTimezones[word];
    }
    return null;
}

let clockInterval;
function startLiveClocks() {
    if (clockInterval) clearInterval(clockInterval);
    const updateClocks = () => {
        document.querySelectorAll('.live-clock').forEach(el => {
            const tz = el.getAttribute('data-tz');
            if (!tz) return;
            try {
                const now = new Date();
                const timeString = new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: 'numeric', minute: '2-digit', hour12: true }).format(now);
                const hour24 = parseInt(new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: 'numeric', hour12: false }).format(now));
                const t = dict[currentLang];
                let badgeClass = 'time-ok'; let extraText = ''; let icon = '🕒';
                if (hour24 >= 16) { badgeClass = 'time-danger'; extraText = ` - ${t.lblPickupLate}`; icon = '🛑'; } 
                else if (hour24 >= 14) { badgeClass = 'time-warn'; extraText = ` - ${t.lblPickupNear}`; icon = '⚠️'; }
                el.className = `live-clock local-time-badge ${badgeClass}`;
                el.innerHTML = `${icon} ${timeString} ${extraText}`;
            } catch (e) { console.error("Timezone error:", e); }
        });
    };
    updateClocks();
    clockInterval = setInterval(updateClocks, 60000); 
}

function initApp() {
    try { 
        const savedMode = localStorage.getItem('ltl-theme-mode'); 
        if (savedMode) setTheme(savedMode); 
        else setTheme('light'); 
        
        const savedAppTheme = localStorage.getItem('ltl-app-theme');
        if (savedAppTheme) setAppTheme(savedAppTheme);
        
        // Initialize Master Toggle from memory
        let expEnabled = localStorage.getItem('ltl-experimental') === 'true';
        document.getElementById('expToggle').checked = expEnabled;
        toggleExperimental(expEnabled);
        
    } catch(e){}

    setLang('en');
    startLiveClocks();

    document.getElementById('inputData').addEventListener('paste', () => {
        if(document.getElementById('autoCopyPaste').checked) {
            setTimeout(() => {
                processData();
                if (appQuotes.length > 0) copyForEmail();
            }, 100);
        }
    });
}

const rules = {
    amazon: { allowed: ["AAA Cooper", "ABF", "Central Transport", "Estes", "Frontline", "Old Dominion", "Saia", "TForce", "Unis", "XPO"], notes: { "Estes": "Verify local terminal. Some do not deliver to Amazon.", "Frontline": "Applies $200 extra charge for limited access.", "Saia": "Applies $175 extra charge for limited access." } },
    walmart: { allowed: ["A. Duie Pyle", "AAA Cooper", "ABF", "Averitt Express", "Central Transport", "Custom Companies", "Daylight", "Estes", "FedEx", "Forward Air", "N&M Transfer", "Old Dominion", "R&L Carriers", "Roadrunner", "Saia", "Southeastern Freight", "TForce", "Unis", "Ward", "XPO"], notes: { "AAA Cooper": "Email walmartcsr@aaacooper.com.", "Daylight": "Mandatory to confirm with delivery terminal.", "R&L Carriers": "Mandatory to confirm with delivery terminal.", "Saia": "Mandatory to confirm with delivery terminal.", "Southeastern Freight": "Mandatory to confirm with delivery terminal." } },
    tobacco: { banned: ["Central Transport"], restricted: ["UPS"], notes: { "UPS": "Requires written authorization. No Cargo Claims Liability.", "Dayton Freight": "Max coverage $5,000. $1.00/lb.", "AAA Cooper": "Max coverage $50,000. $2.00/lb.", "Estes": "Must be palletized & secured. Max liability $2.00/lb.", "Saia": "Will haul tobacco, but NO vape products." } },
    alcohol: { notes: { "ABF": "Add $58.05 for AL, CA, FL, GA, IL, KY, LA, MD, MS, MT, NV, NJ, OK, PA, TX.", "Estes": "No 00110-00119 zips. Extra fees: $45 NJ, $15.75 AL/CA/FL/etc.", "Dayton Freight": "NO alcohol in PA, WV or via partners.", "R&L Carriers": "NO alcohol CA, IN, NH, NY, WV. Beer only in TX. +$39 NJ.", "Saia": "NO NYC/Long Island. Yes PR. No hazmat.", "Southeastern Freight": "No intrastate (TX to TX). No KY.", "FedEx": "Shipper/Consignee must have license." } },
    vape: { allowed: ["Aberdeen Express", "Accurate Cargo", "Clear Lane", "Cross Country", "Custom Companies", "Dayton Freight", "Double D Express", "Dugan Truck Line", "Estes", "NM Transfer", "Numark", "Old Dominion", "Pitt Ohio", "Saia", "Tax Airfreight"], banned: ["R&L Carriers", "Forward Air", "AAA Cooper", "Total Transportation", "Southwest Motor", "XPO"], notes: { "Clear Lane": "ONLY if empty and UN-charged.", "Estes": "No residential/limited access. Hardware only, no e-juice.", "Cross Country": "Requires Hazmat if batteries included." } },
    firearms: { allowed: ["A. Duie Pyle", "AAA Cooper", "ABF", "FedEx", "Saia"], notes: { "A. Duie Pyle": "Firearms: Only specific cases (coordinate with rep). Ammo: Class 1.4 usually accepted.", "ABF": "Firearms: Licensed importers/dealers only. Ammo: Class 1.4 usually accepted.", "FedEx": "Firearms: FFL holders/Gov only. Ammo: Class 1.4 usually accepted.", "AAA Cooper": "Ammo: Class 1.4 usually accepted. Others not accepted.", "Saia": "Ammo: Class 1.4 usually accepted. Others not accepted." } },
    liftgate: { limits: { "AAA Cooper": { w: 2000, l: 72, note: "Max 2000 lbs. (72\" L max)" }, "ABF": { w: 2000, note: "Max 2000 lbs." }, "Averitt Express": { w: 3000, note: "Max 3000 lbs. (High capacity)" }, "Central Transport": { w: 1500, note: "Max 1500 lbs." }, "Dayton Freight": { w: 2000, l: 80, wid: 60, note: "Max 2000 lbs. (60x80 max)" }, "Estes": { w: 1500, l: 60, wid: 72, h: 64, note: "Max 1500-1800 lbs. (60x72x64 max per Tariff)" }, "Old Dominion": { w: 1500, note: "Max 1500 lbs." }, "R&L Carriers": { w: 2000, warnL: 60, note: "Max 2000 lbs. (Double charge if >60\" L)" }, "Roadrunner": { w: 2000, note: "Max 2000 lbs." }, "Saia": { w: 2000, note: "Max 2000 lbs." }, "TForce": { w: 2500, note: "Max 2500 lbs." }, "XPO": { w: 2500, note: "Max 2500 lbs." }, "Custom Companies": { w: 1500, note: "Max 1500 lbs. Call to confirm." } } },
    cubic: { defaultNote: "Please check Cubic Capacity / Overlength rules tariff with this carrier.", notes: { "A. Duie Pyle": "Overlength > 8' o 6'x6'. LF > 8'. Cubic > 750 cu' (< 6 PCF).", "AAA Cooper": "Overlength > 8'. Cubic > 350 cu' (< 3 PCF) o 750 cu' (< 6 PCF).", "ABF": "Overlength > 8' (96\").", "Estes": "Overlength > 8' (96\"). Cubic > 750 cu' (< 6 PCF).", "Old Dominion": "Overlength > 8'. Capacity Load Item 390: > 20' linear o > 20,000 lbs.", "Saia": "Overlength > 8'. Cubic > 750 cu' (< 6 PCF).", "TForce": "Overlength > 8'. LF > 20'. Cubic > 750 cu' (< 6 PCF).", "XPO": "Overlength > 8'. Item 233: Cubic > 350 cu' (< 3 PCF) o 750 cu' (< 6 PCF)." } }
};

let appQuotes = [];
let lastParsedText = "";

function toggleBatchMode() {
    const isBatch = document.getElementById('batchMode').checked;
    document.getElementById('clearAllBtn').style.display = isBatch ? 'block' : 'none';
}

function updateFilters() {
    const isBatch = document.getElementById('batchMode').checked;
    if (!isBatch && appQuotes.length === 1) {
        let q = appQuotes[0];
        q.destType = document.getElementById('destFilter').value;
        q.prodType = document.getElementById('productFilter').value;
        q.checkLiftgate = document.getElementById('liftgateFilter').checked;
        q.checkCubic = document.getElementById('cubicFilter').checked;
        q.insurance = parseFloat(document.getElementById('insuranceInput').value) || 0;
        updateSummaryUI();
        renderTable();
    }
}

function clearData() {
    document.getElementById('inputData').value = '';
    document.getElementById('inputData').focus();
    const isBatch = document.getElementById('batchMode').checked;
    if (!isBatch) { clearAllDataInternal(); }
    
    document.getElementById('destFilter').value = 'standard';
    document.getElementById('productFilter').value = 'none';
    document.getElementById('insuranceInput').value = '';
    document.getElementById('liftgateFilter').checked = false;
    document.getElementById('cubicFilter').checked = false;
}

function clearAllData() {
    document.getElementById('inputData').value = '';
    document.getElementById('destFilter').value = 'standard';
    document.getElementById('productFilter').value = 'none';
    document.getElementById('insuranceInput').value = '';
    document.getElementById('liftgateFilter').checked = false;
    document.getElementById('cubicFilter').checked = false;
    clearAllDataInternal();
    document.getElementById('inputData').focus();
}

function clearAllDataInternal() {
    document.getElementById('quoteSummaryContainer').innerHTML = '';
    document.querySelector('#quotesTable tbody').innerHTML = `<tr><td colspan="8"><div class="empty-state" id="emptyText">${dict[currentLang].emptyText}</div></td></tr>`;
    document.getElementById('resultCount').innerText = "Results";
    document.getElementById('internalColsFilters').style.display = 'none';
    document.getElementById('exportCarrierCost').checked = false;
    document.getElementById('exportMargin').checked = false;
    appQuotes = [];
    lastParsedText = "";
}

function normalizeCarrierName(name) {
    let n = name.toLowerCase().trim();
    
    if (n.includes('fedex')) {
        if (n.includes('economy')) return 'FedEx Economy';
        if (n.includes('priority')) return 'FedEx Priority';
        return 'FedEx';
    }
    
    if (n.includes('forward')) return 'Forward Air';
    if (n.includes('southeastern') || /\bsefl\b/.test(n)) return 'Southeastern Freight'; 
    if (n.includes('old dominion') || /\bodfl\b/.test(n)) return 'Old Dominion';
    if (n.includes('central transport')) return 'Central Transport'; 
    if (n.includes('dayton')) return 'Dayton Freight';
    if (n.includes('duie pyle')) return 'A. Duie Pyle'; 
    if (n.includes('custom comp')) return 'Custom Companies'; 
    if (n.includes('dohrn')) return 'Dohrn Transfer';
    if (n.includes('magnum')) return 'Magnum'; 
    if (n.includes('a & b') || /\babfl\b/.test(n) || n.includes('a&b')) return 'A & B Freight Line';
    if (n.includes('double d') || /\bdbde\b/.test(n)) return 'Double D Express'; 
    if (n.includes('fort transport') || /\bftsc\b/.test(n)) return 'Fort Transportation';
    if (n.includes('n&m') || n.includes('n & m') || /\bnmtf\b/.test(n)) return 'N&M Transfer'; 
    if (n.includes('performance') || /\bpfeg\b/.test(n)) return 'Performance Freight';
    if (n.includes('pitt ohio') || /\bpitd\b/.test(n)) return 'Pitt Ohio'; 
    if (n.includes('roadrunner') || /\brdfs\b/.test(n)) return 'Roadrunner';
    if (n.includes('southwestern motor') || /\bsmtl\b/.test(n)) return 'Southwestern Motor Transport';
    if (n.includes('tax air') || /\btaxa\b/.test(n)) return 'Tax Airfreight'; 
    if (n.includes('unis') || /\butpa\b/.test(n)) return 'UNIS Transportation';
    if (n.includes('go2')) return 'Go2 Logistics';
    if (n.includes('aaa cooper')) return 'AAA Cooper'; 
    if (n.includes('averitt')) return 'Averitt Express';
    if (n.includes('estes')) return 'Estes'; 

    if (/\bward\b/.test(n)) return 'Ward'; 
    if (/\babf\b/.test(n)) return 'ABF'; 
    if (/\bxpo\b/.test(n)) return 'XPO'; 
    if (/\btforce\b/.test(n) || n.includes('tforce')) return 'TForce'; 
    if (/\bsaia\b/.test(n)) return 'Saia'; 
    if (/\br\s*&\s*l\b/.test(n) || /\brandl\b/.test(n) || n.includes('r and l')) return 'R&L Carriers';
    if (/\brude\b/.test(n)) return 'Rude Transportation'; 

    let fallback = name.replace(/\s*(LTL|Volume|Standard Rate|Economy|Priority|Market Rate|Standard Service|Standard|Interline|Guaranteed)\s*\d*$/i, '').trim();
    return fallback.charAt(0).toUpperCase() + fallback.slice(1);
}

function processData() {
    let rawText = document.getElementById('inputData').value;
    if(!rawText.trim()) return;

    const isBatch = document.getElementById('batchMode').checked;
    if (isBatch && rawText === lastParsedText) return; 
    lastParsedText = rawText;

    rawText = rawText.replace(/⠀/g, '\t'); 
    rawText = rawText.replace(/Quote Id:\s*([A-Za-z0-9_-]+)(From:)/gi, 'Quote Id: $1\n$2');
    rawText = rawText.replace(/(\$\d+(?:,\d+)?\.\d{2})([A-Za-z0-9_-]+)/g, '$1 \t $2');
    rawText = rawText.replace(/LTL Rates:/gi, '\nLTL Rates:\n').replace(/Volume Rates:/gi, '\nVolume Rates:\n');
    const lines = rawText.split('\n').map(l => l.trim()).filter(l => l);
    
    if (!isBatch) { appQuotes = []; }

    let q = {
        label: isBatch ? `Quote #${appQuotes.length + 1}` : 'Priority 1 Quote',
        id: '-', from: '-', to: '-', items: [], accessorials: [], 
        maxDims: { weight: 0, length: 0, width: 0, height: 0 }, 
        rawRates: [], processedRates: [],
        destType: document.getElementById('destFilter').value,
        prodType: document.getElementById('productFilter').value,
        checkLiftgate: document.getElementById('liftgateFilter').checked,
        checkCubic: document.getElementById('cubicFilter').checked,
        insurance: parseFloat(document.getElementById('insuranceInput').value) || 0,
        hasInternalCols: false
    };

    const handlingUnits = ['pallet', 'skid', 'bag', 'bale', 'box', 'bucket', 'bundle', 'can', 'carton', 'case', 'coil', 'crate', 'cylinder', 'drum', 'pail', 'piece', 'reel', 'roll', 'tube', 'tote'];
    let currentRateType = 'LTL';
    let mode = 'header';
    
    let isAdvancedFormat = lines.some(l => l.toLowerCase().includes('carrier cost') || l.toLowerCase().includes('margin'));
    if (isAdvancedFormat) q.hasInternalCols = true;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let lowerLine = line.toLowerCase();

        if (lowerLine === 'accessorials' || lowerLine === 'accessorials:') { mode = 'accessorials'; continue; }
        if (lowerLine === 'items' || lowerLine.startsWith('items / pallets') || lowerLine === 'items:') { mode = 'items'; continue; }
        if (lowerLine.includes('ltl rates') || lowerLine.includes('ltl rates:')) { mode = 'rates'; currentRateType = 'LTL'; continue; }
        if (lowerLine.includes('volume rates') || lowerLine.includes('volume rates:')) { mode = 'rates'; currentRateType = 'Volume'; continue; }

        if (mode === 'header') {
            if (lowerLine.startsWith('quote id:') || lowerLine.startsWith('quote:')) {
                let val = line.replace(/quote id:|quote:/i, '').trim();
                q.id = val ? val : (lines[i+1] ? lines[i+1].trim() : '-');
            }
            else if (lowerLine.startsWith('from:')) {
                let val = line.replace(/from:/i, '').trim();
                q.from = val ? val : (lines[i+1] ? lines[i+1].trim() : '-');
            }
            else if (lowerLine.startsWith('to:')) {
                let val = line.replace(/to:/i, '').trim();
                q.to = val ? val : (lines[i+1] ? lines[i+1].trim() : '-');
            }
        }
        else if (mode === 'accessorials') {
            let parts = line.includes(',') ? line.split(',') : [line];
            parts.forEach(part => {
                let cleanPart = part.trim();
                let lowerPart = cleanPart.toLowerCase();
                if (!cleanPart || cleanPart.includes('$')) return;

                // BULLETPROOF: Orden estricto de Específico a General
                const accRules = [
                    { name: 'Delivery Appointment', keywords: ['appointment', 'appt', 'notify', 'notification'] },
                    { name: 'Residential Delivery', keywords: ['residential delivery', 'residence delivery'] },
                    { name: 'Residential Pickup', keywords: ['residential pickup', 'residence pickup'] },
                    { name: 'Residential', keywords: ['residential', 'residence'] },
                    { name: 'Lift Gate Delivery', keywords: ['lift gate delivery', 'liftgate delivery', 'lift-gate delivery'] },
                    { name: 'Lift Gate Pickup', keywords: ['lift gate pickup', 'liftgate pickup', 'lift-gate pickup'] },
                    { name: 'Lift Gate', keywords: ['lift gate', 'liftgate', 'lift-gate'] },
                    { name: 'Excessive Length', keywords: ['excessive length', 'overlength', '7ft', '8ft', '9ft', '10ft'] },
                    { name: 'Inside Delivery', keywords: ['inside delivery', 'inside pickup', 'inside'] },
                    { name: 'Hazmat', keywords: ['hazardous', 'hazmat'] },
                    { name: 'Limited Access', keywords: ['limited access'] },
                    { name: 'Protect From Freeze', keywords: ['protect from freeze', 'freeze'] }
                ];

                let matchedRule = accRules.find(r => r.keywords.some(kw => lowerPart.includes(kw)));
                let finalName = matchedRule ? matchedRule.name : cleanPart;

                // Evitar basura larga o tags duplicados
                if (finalName.length < 40 && !q.accessorials.includes(finalName)) {
                    q.accessorials.push(finalName);
                }
            });
        }
        else if (mode === 'items') {
            if (handlingUnits.some(unit => lowerLine.includes(unit)) && /\d/.test(line)) {
                let isSubItem = line.startsWith('-');
                let cleanLine = line.replace(/^"|"$/g, '');
                
                let itemObj;
                if (isSubItem) {
                    let noDimsLine = cleanLine.replace(/\s*-\s*[\d.]+\s*(?:in|"|cm|”|'')?\s*x\s*[\d.]+\s*(?:in|"|cm|”|'')?\s*x\s*[\d.]+\s*(?:in|"|cm|”|'')?/gi, '');
                    itemObj = { text: noDimsLine.replace(/^\s*-\s*/, '').trim(), isSub: true };
                } else {
                    itemObj = { text: cleanLine, isSub: false };
                    const wMatch = line.match(/([\d.,]+)\s*(lbs|kg)/i);
                    if (wMatch) {
                        let w = parseFloat(wMatch[1].replace(/,/g,''));
                        if (wMatch[2].toLowerCase() === 'kg') w *= 2.20462;
                        if (w > q.maxDims.weight) q.maxDims.weight = w;
                    }
                    const dMatch = line.match(/([\d.]+)\s*(in|"|cm|”|'')?\s*x\s*([\d.]+)\s*(in|"|cm|”|'')?\s*x\s*([\d.]+)/i);
                    if (dMatch) {
                        let l = parseFloat(dMatch[1]), w = parseFloat(dMatch[3]), h = parseFloat(dMatch[5]), unit = (dMatch[2] || dMatch[4] || dMatch[6] || "").toLowerCase();
                        if (unit === 'cm') { l /= 2.54; w /= 2.54; h /= 2.54; }
                        if (l > q.maxDims.length) q.maxDims.length = l;
                        if (w > q.maxDims.width) q.maxDims.width = w;
                        if (h > q.maxDims.height) q.maxDims.height = h;
                    }
                }
                if (!q.items.some(existing => existing.text === itemObj.text && existing.isSub === itemObj.isSub)) {
                    q.items.push(itemObj);
                }
            }
        }
        else if (mode === 'rates') {
            if (/carrier\s*service\s*level/i.test(lowerLine) || /customer\s*cost/i.test(lowerLine) || /carrier\s*quote/i.test(lowerLine) || (lowerLine.includes('carrier') && lowerLine.includes('rate'))) {
                continue; 
            }

            if (line.includes('$')) {
                line = line.replace(/(\d+\.\d{1,2})(\d)\s*(Day|Days)/i, '$1 $2 $3');
                line = line.replace(/(\d{3,})(\d)\s*(Day|Days)/i, '$1 $2 $3');

                let liability = '-';
                let newLiabMatch = line.match(/NEW:\s*\$?([0-9,.]+)/i);
                let usedLiabMatch = line.match(/USED:\s*\$?([0-9,.]+)/i);
                let slashLiabMatch = line.match(/\$?([0-9,.]+)\s*\/\s*\$?([0-9,.]+)/);
                
                if (newLiabMatch) {
                    liability = newLiabMatch[1];
                    if (usedLiabMatch) liability += '/' + usedLiabMatch[1];
                    line = line.replace(/NEW:\s*\$?[0-9,.]+/i, '').replace(/USED:\s*\$?[0-9,.]+/i, '');
                } else if (slashLiabMatch) {
                    liability = slashLiabMatch[1] + '/' + slashLiabMatch[2];
                    line = line.replace(slashLiabMatch[0], ''); 
                } else {
                    let rawNumbers = [...line.matchAll(/(?<!\$)\b(\d+(?:\.\d+)?)\b/g)].map(m => parseFloat(m[1]));
                    let liabNumbers = rawNumbers.filter(n => n > 50 && n % 1 === 0);
                    if (liabNumbers.length > 0) liability = liabNumbers.join('/');
                }

                let carrier = "Unknown";
                let firstDollarIdx = line.indexOf('$');
                if (firstDollarIdx !== -1) {
                    let prefix = line.substring(0, firstDollarIdx).trim();
                    prefix = prefix.replace(/[\t]+/g, ' ');
                    carrier = prefix.replace(/\s*(LTL|Volume)$/i, '').trim();
                }

                let dollarPrices = [...line.matchAll(/\$([0-9,.]+)/g)].map(m => parseFloat(m[1].replace(/,/g, '')));
                let customerCost = dollarPrices[0] || 0;
                let carrierCost = '';
                if (q.hasInternalCols && dollarPrices.length >= 2) {
                    carrierCost = dollarPrices[1];
                }

                let service = "Standard";
                let serviceMatch = line.match(/(Standard Rate|Economy|Priority|LTL Standard Transit|Market Rate|Standard Service|Standard|Interline|TLX|TLS|EXCL|Guaranteed)/i);
                if (serviceMatch) service = serviceMatch[1];

                let days = "N/A";
                let daysMatch = line.match(/(\d+)\s*Days?/i);
                if (daysMatch) {
                    days = daysMatch[1];
                } else {
                    let endDigit = line.trim().match(/\s(\d)$/);
                    if (endDigit) days = endDigit[1];
                    else {
                        let standaloneDigit = line.match(/\s(\d)\s/);
                        if (standaloneDigit) days = standaloneDigit[1];
                    }
                }

                let expMatch = line.match(/(\d{1,2}\/\d{1,2}\/\d{2,4})/);
                let expiration = expMatch ? expMatch[1] : '-';

                let marginMatch = line.match(/(\d+(?:\.\d+)?)%/);
                let margin = marginMatch ? marginMatch[1] + '%' : '-';

                let quoteNum = '-';
                let tokens = line.split(/[\s\t]+/);
                let rateFound = false;
                for (let token of tokens) {
                    if (!rateFound) {
                        if (token.includes('$')) rateFound = true;
                        continue;
                    }
                    if (token.length >= 6 && /^[A-Z0-9_-]+$/i.test(token) && /\d/.test(token) && !/^(Standard|Economy|Priority|Market|Interline|Guaranteed)$/i.test(token)) {
                        quoteNum = token;
                        break;
                    }
                }

                q.rawRates.push({
                    carrier: carrier,
                    cost: customerCost,
                    carrierCost: carrierCost,
                    margin: margin,
                    expiration: expiration,
                    quoteNumber: quoteNum,
                    liability: liability,
                    service: service,
                    days: days,
                    rateType: currentRateType
                });
            } 
            else if (!line.includes('$') && q.rawRates.length > 0) {
                let lastRate = q.rawRates[q.rawRates.length - 1];
                let expMatch = line.match(/(\d{1,2}\/\d{1,2}\/\d{4})/);
                if (expMatch && lastRate.expiration === '-') lastRate.expiration = expMatch[1];
                let marginMatch = line.match(/(\d+(?:\.\d+)?)%/);
                if (marginMatch && lastRate.margin === '-') lastRate.margin = marginMatch[1] + '%';
            }
        }
    }
    
    if (q.rawRates.length === 0) { 
        document.querySelector('#quotesTable tbody').innerHTML = `<tr><td colspan="8"><div class="empty-state" style="color: var(--warning); font-weight: bold;">${dict[currentLang].waitingRates}</div></td></tr>`;
        return; 
    }
    
    appQuotes.push(q);
    
    updateSummaryUI(); 
    renderTable();
    startLiveClocks(); 
}

function updateSummaryUI() {
    const container = document.getElementById('quoteSummaryContainer');
    if(appQuotes.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    const t = dict[currentLang];
    const isBatch = document.getElementById('batchMode').checked;
    let html = '';
    
    appQuotes.forEach(q => {
        let itemsHtml = q.items.length > 0 
            ? `<ul style="margin: 0; padding-left: 20px;">` + q.items.map(i => i.isSub 
                ? `<li style="list-style-type: none; font-size: 0.85em; color: var(--text-muted); margin-left: 12px; margin-top: 2px;">↳ ${i.text}</li>` 
                : `<li style="margin-top: 4px;">${i.text}</li>`).join('') + `</ul>`
            : '-';

        let accHtml = q.accessorials.length > 0 ? q.accessorials.join(' | ') : '-';
        let showAcc = q.accessorials.length > 0 ? 'block' : 'none';

        let accLower = accHtml.toLowerCase(); 
        let isRes = accLower.includes('residential') || accLower.includes('residence'); 
        let hasLiftgate = accLower.includes('lift gate') || accLower.includes('liftgate'); 
        let hasAppt = accLower.includes('appoint') || accLower.includes('appt') || accLower.includes('notify') || accLower.includes('notification');
        
        let missing = [];
        if (isRes) {
            if (!hasLiftgate) missing.push(currentLang === 'es' ? "Lift Gate" : "Lift Gate");
            if (!hasAppt) missing.push(currentLang === 'es' ? "Cita de Entrega" : "Delivery Appointment");
        }
        
        let showWarning = (isRes && missing.length > 0) ? 'flex' : 'none';
        let dynamicWarnMsg = currentLang === 'es' 
            ? `<strong>Advertencia:</strong> Se detectó entrega Residencial, pero falta solicitar: <u>${missing.join(' y ')}</u>. Verifique con el cliente.`
            : `<strong>Warning:</strong> Residential delivery detected, but missing: <u>${missing.join(' and ')}</u>. Verify requirements.`;

        let warnHtml = showWarning === 'flex' ? `<div class="res-warning" style="display: flex; margin-top: 12px;">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" style="width: 18px; height: 18px; flex-shrink: 0; margin-top: 1px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                <span>${dynamicWarnMsg}</span>
            </div>` : '';

        let tz = getTimezoneForLocation(q.from);
        let clockHtml = tz ? `<span class="live-clock" data-tz="${tz}">--:--</span>` : '';

        let headerBlock = '';
        if (isBatch) {
            headerBlock = `<div class="summary-item summary-full-width" style="margin-top: 0; padding-top: 0; border-top: none;">
                <span class="summary-label" style="font-size: 0.85rem; color: var(--primary);">${q.label} ${q.id !== '-' ? `(${t.refLabel.replace(':', '')} ${q.id})` : ''}</span>
            </div>`;
        } else {
            headerBlock = `<div class="summary-item" style="grid-column: 1 / -1; margin-bottom: 8px;">
                <span class="summary-label" style="font-size: 0.85rem; color: var(--primary);">Priority 1 Quote ID</span>
                <span class="summary-value" style="font-size: 1.3rem; color: var(--primary);">${q.id !== '-' ? q.id : '-'}</span>
            </div>`;
        }

        html += `
        <div class="quote-summary" style="display: block; margin-bottom: 16px;">
            <div class="summary-grid">
                ${headerBlock}
                <div class="summary-item summary-full-width" style="margin-top: 0; padding-top: 0; border-top: none;">
                    <span class="summary-label">${t.lblFrom}</span>
                    <span class="summary-value">${q.from} ${clockHtml}</span>
                </div>
                <div class="summary-item summary-full-width">
                    <span class="summary-label">${t.lblTo}</span>
                    <span class="summary-value">${q.to}</span>
                </div>
                <div class="summary-item summary-full-width">
                    <span class="summary-label">${t.lblItems}</span>
                    <span class="summary-value" style="font-family: monospace; font-size: 0.85rem; font-weight: normal; line-height: 1.5;">${itemsHtml}</span>
                </div>
                <div class="summary-item summary-full-width" style="display:${showAcc}; padding-top:4px; border-top:none;">
                    <span class="summary-label">${t.lblAcc}</span>
                    <span class="summary-value" style="color:var(--warning); font-size: 0.85rem;">${accHtml}</span>
                </div>
            </div>
            ${warnHtml}
        </div>
        `;
    });
    
    container.innerHTML = html;
}

function getCarrierDomain(normalizedName) {
    const domains = { "aaa cooper": "aaacooper.com", "abf": "arcb.com", "averitt express": "averitt.com", "southeastern freight": "sefl.com", "old dominion": "odfl.com", "xpo": "xpo.com", "tforce": "tforcefreight.com", "fedex": "fedex.com", "fedex priority": "fedex.com", "fedex economy": "fedex.com", "ward": "wardtlc.com", "saia": "saia.com", "r&l carriers": "rlcarriers.com", "estes": "estes-express.com", "central transport": "centraltransport.com", "dayton freight": "daytonfreight.com", "a. duie pyle": "aduiepyle.com", "pitt ohio": "pittohio.com", "custom companies": "customco.com", "frontline": "stgusa.com", "daylight": "dylt.com", "forward air": "forwardair.com", "roadrunner": "rrts.com", "unis transportation": "unisco.com", "clear lane": "clearlanefreightsystems.com", "n&m transfer": "nmtransfer.com", "cross country": "ccfsi.com", "dohrn transfer": "dohrn.com", "magnum": "magnumlog.com", "a & b freight line": "abfreight.com", "double d express": "doubledexpress.com", "fort transportation": "forttransport.com", "performance freight": "performancefreight.com", "rude transportation": "rudetransportation.com", "southwestern motor transport": "smtl.com", "tax airfreight": "taxair.com", "go2 logistics": "go2logistics.com" };
    return domains[normalizedName.toLowerCase()] || null;
}

function getCarrierRating(name) {
    const info = carrierInfo[name.toLowerCase()];
    return info && info.rating ? info.rating : 3.5; 
}

function generateStarsHTML(rating) {
    const percent = (rating / 5) * 100;
    return `<div class="stars-container" title="${rating.toFixed(1)}/5">★★★★★<div class="stars-filled" style="width: ${percent}%;">★★★★★</div></div><span class="rating-number">${rating.toFixed(1)}</span>`;
}

function getEmailStars(rating) {
    if(rating >= 4.8) return '★★★★★'; if(rating >= 3.8) return '★★★★☆';
    if(rating >= 2.8) return '★★★☆☆'; if(rating >= 1.8) return '★★☆☆☆';
    return '★☆☆☆☆';
}

function renderTable() {
    const tbody = document.querySelector('#quotesTable tbody');
    const headerRow = document.getElementById('tableHeadersRow');
    
    if (appQuotes.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8"><div class="empty-state" id="emptyText">${dict[currentLang].emptyText}</div></td></tr>`;
        document.getElementById('resultCount').innerText = "Results";
        document.getElementById('internalColsFilters').style.display = 'none';
        return;
    }
    tbody.innerHTML = ''; 
    const t = dict[currentLang]; 
    
    const sortBy = document.getElementById('sortFilter').value;
    const isBatch = document.getElementById('batchMode').checked;
    const showInternalCols = appQuotes.some(q => q.hasInternalCols);
    
    if (showInternalCols) {
        document.getElementById('internalColsFilters').style.display = 'flex';
    } else {
        document.getElementById('internalColsFilters').style.display = 'none';
    }

    let headerHtml = `<th id="thCarrier">${t.thCarrier}</th><th id="thRate">${t.thRate}</th>`;
    if (showInternalCols) {
        let exportCarrierCost = document.getElementById('exportCarrierCost') ? document.getElementById('exportCarrierCost').checked : false;
        let exportMargin = document.getElementById('exportMargin') ? document.getElementById('exportMargin').checked : false;
        if (exportCarrierCost || exportMargin) {
            headerHtml += `<th style="color:var(--primary); font-weight:700;">${exportCarrierCost ? t.lblCarrierCost : ''} ${exportCarrierCost && exportMargin ? '/' : ''} ${exportMargin ? t.lblMargin : ''}</th>`;
        }
    }
    headerHtml += `<th id="thLiability">${t.thLiability}</th><th id="thTransit">${t.thTransit}</th>`;
    if (showInternalCols) {
        headerHtml += `<th style="color:var(--primary); font-weight:700;">${t.lblExpDate}</th>`;
    }
    headerHtml += `<th id="thNotes">${t.thNotes}</th>`;
    headerRow.innerHTML = headerHtml;

    let visibleCount = 0;

    appQuotes.forEach(q => {
        const destType = q.destType; 
        const prodType = q.prodType; 
        const checkLiftgate = q.checkLiftgate; 
        const checkCubic = q.checkCubic;
        let insVal = q.insurance;

        let needsLiftgate = checkLiftgate;
        if (q.accessorials && q.accessorials.some(a => a.toLowerCase().includes('lift'))) needsLiftgate = true;

        q.processedRates = q.rawRates.map((quote) => {
            const normalizedName = normalizeCarrierName(quote.carrier); 
            let isAllowed = true; let warnings = []; let infos = []; let statusClass = 'badge-ok'; let statusText = t.statOk;
            
            if (destType === 'amazon') { if (!rules.amazon.allowed.includes(normalizedName)) { isAllowed = false; statusText = t.statBanned + ' Amazon'; } else if (rules.amazon.notes[normalizedName]) warnings.push(`Amazon: ${rules.amazon.notes[normalizedName]}`); } 
            else if (destType === 'walmart') { if (!rules.walmart.allowed.includes(normalizedName)) { isAllowed = false; statusText = t.statBanned + ' Walmart'; } else if (rules.walmart.notes[normalizedName]) infos.push(`Walmart: ${rules.walmart.notes[normalizedName]}`); }

            if (prodType === 'vape') { if (rules.vape.banned.includes(normalizedName)) { isAllowed = false; statusText = t.statRestr + ' Vape'; } else if (!rules.vape.allowed.includes(normalizedName)) warnings.push("Vape: Carrier not listed explicitly. Verify."); else if (rules.vape.notes[normalizedName]) infos.push(`Vape: ${rules.vape.notes[normalizedName]}`); } 
            else if (prodType === 'tobacco') { if (rules.tobacco.banned.includes(normalizedName)) { isAllowed = false; statusText = t.statRestr + ' Tobacco'; } else if (rules.tobacco.notes[normalizedName]) infos.push(`Tobacco: ${rules.tobacco.notes[normalizedName]}`); } 
            else if (prodType === 'alcohol') { if (rules.alcohol.notes[normalizedName]) warnings.push(`Alcohol: ${rules.alcohol.notes[normalizedName]}`); } 
            else if (prodType === 'firearms') { if (!rules.firearms.allowed.includes(normalizedName)) warnings.push("Firearms/Ammo: Carrier not explicitly listed as friendly. Check rules tariff."); else if (rules.firearms.notes[normalizedName]) infos.push(`${rules.firearms.notes[normalizedName]}`); }

            if (needsLiftgate && rules.liftgate.limits[normalizedName]) {
                const lg = rules.liftgate.limits[normalizedName];
                let violated = false; let viols = [];
                if (q.maxDims && q.maxDims.weight > 0) {
                    if (lg.w && q.maxDims.weight > lg.w) { violated = true; viols.push(`Weight > ${lg.w}lbs`); }
                    if (lg.l && q.maxDims.length > lg.l) { violated = true; viols.push(`L > ${lg.l}"`); }
                    if (lg.wid && q.maxDims.width > lg.wid) { violated = true; viols.push(`W > ${lg.wid}"`); }
                    if (lg.h && q.maxDims.height > lg.h) { violated = true; viols.push(`H > ${lg.h}"`); }
                    if (lg.warnL && q.maxDims.length > lg.warnL) warnings.push(`Liftgate Fee: Over ${lg.warnL}" L (Possible double charge)`);
                    if (violated) { warnings.push(`Liftgate Exceeded: ${viols.join(', ')} (${lg.note})`); if(isAllowed) { statusClass = 'badge-warn'; statusText = t.warnLiftgate; } } 
                    else if (checkLiftgate) warnings.push(`Liftgate Note: ${lg.note}`);
                } else if (checkLiftgate) { warnings.push(`Liftgate Limit: ${lg.note}`); if(isAllowed) { statusClass = 'badge-warn'; statusText = t.warnLiftgate; } }
            }

            if (checkCubic) { warnings.push(`Cubic/Length: ${rules.cubic.notes[normalizedName] || rules.cubic.defaultNote}`); if(isAllowed) { statusClass = 'badge-warn'; statusText = t.warnCubic; } }

            const rating = getCarrierRating(normalizedName);
            let numericDays = parseInt(quote.days); if (isNaN(numericDays)) numericDays = 99;
            if (isAllowed) { if (warnings.length > 0) { statusClass = 'badge-warn'; statusText = t.statWarn; } } else statusClass = 'badge-error';

            return { ...quote, normalizedName, isAllowed, warnings, infos, statusClass, statusText, rating, numericDays, isBestPick: false };
        });

        let allowedQuotes = q.processedRates.filter(r => r.isAllowed);
        if (allowedQuotes.length > 0) {
            allowedQuotes.sort((a,b) => a.cost - b.cost); allowedQuotes.forEach((r, i) => r.priceRank = i + 1);
            allowedQuotes.sort((a,b) => a.numericDays - b.numericDays); allowedQuotes.forEach((r, i) => r.daysRank = i + 1);
            allowedQuotes.sort((a,b) => b.rating - a.rating); allowedQuotes.forEach((r, i) => r.ratingRank = i + 1);
            allowedQuotes.forEach(r => { r.bestScore = (r.priceRank * 1.5) + (r.daysRank * 1.0) + (r.ratingRank * 0.5); });
            allowedQuotes.sort((a,b) => a.bestScore - b.bestScore);
            allowedQuotes[0].isBestPick = true;
        }

        if (sortBy === 'cheapest') { q.processedRates.sort((a,b) => a.cost - b.cost); } 
        else if (sortBy === 'fastest') { q.processedRates.sort((a,b) => { if (a.numericDays === b.numericDays) return a.cost - b.cost; return a.numericDays - b.numericDays; }); } 
        else if (sortBy === 'best_rating') { q.processedRates.sort((a,b) => { if (b.rating === a.rating) return a.cost - b.cost; return b.rating - a.rating; }); }

        const trGroup = document.createElement('tr');
        trGroup.classList.add('group-header-row');
        let tableGroupTitle = isBatch ? `📦 ${q.label}: ${q.from || 'Origin'} ➡️ ${q.to || 'Dest'}` : `📦 Priority 1 Quote ID: ${q.id !== '-' ? q.id : 'N/A'} | ${q.from || 'Origin'} ➡️ ${q.to || 'Dest'}`;
        trGroup.innerHTML = `<td colspan="8" style="font-weight: bold; color: var(--primary); font-size: 0.9rem; border-top: 2px solid var(--primary);">${tableGroupTitle}</td>`;
        tbody.appendChild(trGroup);

        q.processedRates.forEach((row) => {
            if (row.isAllowed) { visibleCount++; }
            
            let htmlNotes = row.warnings.map(w => `<div class="note-text" style="color:var(--warning)"><span class="note-icon">⚠️</span><span>${w}</span></div>`).join('') + row.infos.map(i => `<div class="note-text"><span class="note-icon">ℹ️</span><span>${i}</span></div>`).join('');
            let daysText = String(row.days).trim(); if(daysText !== '') { if (daysText === '1') daysText += ` ${t.day}`; else if (!isNaN(daysText) || daysText.match(/^\d+(\s*-\s*\d+)?$/)) daysText += ` ${t.days}`; }

            // Solo mostramos iconos en la interfaz web
            const domain = getCarrierDomain(row.normalizedName); const iconHtml = domain ? `<img src="https://www.google.com/s2/favicons?domain=${domain}&sz=32" class="carrier-icon" onerror="this.style.display='none'">` : '';
            let toolsHtml = ''; const cInfo = carrierInfo[row.normalizedName.toLowerCase()];
            if(cInfo) {
                let tooltipText = `${t.ttContact} ${row.normalizedName}:\n──────────────────\n📊 ${t.ttOnTime}: ${cInfo.onTime || 'N/A'}\n📦 ${t.ttClaims}: ${cInfo.claims || 'N/A'}\n`;
                if(cInfo.phone || cInfo.email) tooltipText += `──────────────────\n📞 ${t.ttPhone}: ${cInfo.phone || '-'}\n✉️ ${t.ttEmail}: ${cInfo.email || '-'}`;
                toolsHtml += `<span class="info-icon" title="${tooltipText}">ℹ️</span>`;
            }

            let liabilityHtml = '';
            if (row.liability && row.liability !== '-') {
                if (row.liability.includes('/')) {
                    const parts = row.liability.split('/');
                    liabilityHtml = `<div class="liab-box"><div class="liab-row"><span class="liab-label">${t.liabNew}</span> <span class="liab-val">${parts[0]}</span></div><div class="liab-row"><span class="liab-label">${t.liabUsed}</span> <span class="liab-val">${parts[1]}</span></div></div>`;
                } else liabilityHtml = `<div class="liab-row"><span class="liab-val">${row.liability}</span></div>`;
            }

            let refHtml = row.quoteNumber && row.quoteNumber !== '-' ? `<div style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace; margin-top: 2px;">${t.refLabel} ${row.quoteNumber}</div>` : '';
            let starsHtml = row.isAllowed ? generateStarsHTML(row.rating) : '';
            let typeBadgeClass = row.rateType === 'Volume' ? 'badge-vol' : 'badge-ltl';
            let typeText = row.rateType === 'Volume' ? t.rateVol : t.rateLTL;
            let rateTypeHtml = `<span class="badge ${typeBadgeClass}" style="font-size: 0.6rem; margin-left: 6px; vertical-align: middle;">${typeText}</span>`;
            let bestPickHtml = row.isBestPick ? `<span class="badge badge-best" style="font-size: 0.6rem; margin-left: 6px; vertical-align: middle;">🌟 ${t.bestPick}</span>` : '';

            let priceHtml = `$${row.cost.toFixed(2)}`;
            if (insVal > 0) {
                priceHtml += `<div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">+ $${insVal.toFixed(2)} ${t.lblInsurance}</div>`;
                priceHtml += `<div style="font-size: 0.85rem; font-weight: bold; color: var(--text); margin-top: 2px;">${t.lblTotal}: $${(row.cost + insVal).toFixed(2)}</div>`;
            }

            let internalCostHtml = "";
            let internalExpHtml = "";
            
            let exportCarrierCost = document.getElementById('exportCarrierCost') ? document.getElementById('exportCarrierCost').checked : false;
            let exportMargin = document.getElementById('exportMargin') ? document.getElementById('exportMargin').checked : false;

            if (showInternalCols) {
                if (exportCarrierCost || exportMargin) {
                    internalCostHtml = `<td style="color:var(--text-muted); font-size: 0.85rem;">`;
                    if (exportCarrierCost) internalCostHtml += `<div>Cost: $${row.carrierCost || '-'}</div>`;
                    if (exportMargin) internalCostHtml += `<div style="margin-top:2px;">Margin: <span style="font-weight:bold; color:var(--text);">${row.margin || '-'}</span></div>`;
                    internalCostHtml += `</td>`;
                }
                internalExpHtml = `<td style="color:var(--text-muted); font-size: 0.85rem;">${row.expiration || '-'}</td>`;
            }

            const tr = document.createElement('tr'); 
            if (!row.isAllowed) tr.classList.add('disabled-row');
            
            tr.innerHTML = `
                <td><div class="carrier-name-wrapper"><div><div class="carrier-name">${row.normalizedName}</div>${rateTypeHtml}${bestPickHtml}<div>${starsHtml}</div>${refHtml}<div class="carrier-tools" style="margin-top: 4px;">${toolsHtml}</div></div>${iconHtml}</div></td>
                <td class="price" style="${!row.isAllowed ? 'color:var(--text-muted);' : ''}">${priceHtml}</td>
                ${showInternalCols && (exportCarrierCost || exportMargin) ? internalCostHtml : (showInternalCols ? '<td>-</td>' : '')}
                <td>${liabilityHtml}</td>
                <td><div class="transit">${daysText}</div><div style="color:var(--text-muted); font-size: 0.75rem; line-height:1.1;">${row.service}</div></td>
                ${showInternalCols ? internalExpHtml : ''}
                <td><span class="badge ${row.statusClass}">${row.statusText}</span>${htmlNotes}</td>
            `;
            tbody.appendChild(tr);
        });
    });
    document.getElementById('resultCount').innerText = t.resCount.replace('{0}', visibleCount);
}

function getReportHTML(isPdf = false) {
    const t = dict[currentLang]; 
    const isBatch = document.getElementById('batchMode').checked;
    let includeNotes = document.getElementById('exportNotes').checked;
    let includeRating = document.getElementById('exportRating').checked;
    let exportCarrierCost = document.getElementById('exportCarrierCost') ? document.getElementById('exportCarrierCost').checked : false;
    let exportMargin = document.getElementById('exportMargin') ? document.getElementById('exportMargin').checked : false;
    
    const selectedThemeId = document.getElementById('emailTheme').value;
    const hasInternalCols = appQuotes.some(q => q.hasInternalCols);
    let hasVolume = false;
    
    const emailThemes = {
        default: { bg: "#ffffff", thBg: "#f1f5f9", border: "#cbd5e1", text: "#333333", textMuted: "#64748b", primary: "#2563eb", acc1: "#166534", acc2: "#b45309", thText: "#333333" },
        monochrome: { bg: "#ffffff", thBg: "#f2f2f2", border: "#cccccc", text: "#000000", textMuted: "#555555", primary: "#000000", acc1: "#000000", acc2: "#000000", thText: "#000000" },
        vivid: { bg: "#ffffff", thBg: "#fef08a", border: "#fde047", text: "#111111", textMuted: "#444444", primary: "#ea580c", acc1: "#059669", acc2: "#be123c", thText: "#854d0e" },
        feminine: { bg: "#ffffff", thBg: "#fce7f3", border: "#fbcfe8", text: "#4c1d95", textMuted: "#701a75", primary: "#db2777", acc1: "#be185d", acc2: "#9d174d", thText: "#831843" },
        navy: { bg: "#ffffff", thBg: "#dbeafe", border: "#bfdbfe", text: "#0f172a", textMuted: "#334155", primary: "#1e3a8a", acc1: "#1e40af", acc2: "#1d4ed8", thText: "#1e3a8a" },
        corporate: { bg: "#ffffff", thBg: "#e2e8f0", border: "#cbd5e1", text: "#1e293b", textMuted: "#475569", primary: "#0f172a", acc1: "#334155", acc2: "#1e293b", thText: "#0f172a" },
        forest: { bg: "#ffffff", thBg: "#d1fae5", border: "#a7f3d0", text: "#064e3b", textMuted: "#166534", primary: "#059669", acc1: "#047857", acc2: "#065f46", thText: "#064e3b" },
        earth: { bg: "#ffffff", thBg: "#fef3c7", border: "#fde68a", text: "#451a03", textMuted: "#78350f", primary: "#92400e", acc1: "#b45309", acc2: "#78350f", thText: "#78350f" },
        midnight: { bg: "#ffffff", thBg: "#0f172a", border: "#94a3b8", text: "#1e293b", textMuted: "#475569", primary: "#0f172a", acc1: "#020617", acc2: "#0f172a", thText: "#ffffff" },
        slate: { bg: "#ffffff", thBg: "#f8fafc", border: "#cbd5e1", text: "#334155", textMuted: "#64748b", primary: "#475569", acc1: "#1e293b", acc2: "#334155", thText: "#0f172a" }
    };
    const th = emailThemes[selectedThemeId];

    let html = `<div id="exportWrapper" style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: ${th.text}; ${isPdf ? 'width: 100%;' : 'max-width: 800px;'} background-color: ${th.bg}; padding: 10px; box-sizing: border-box;">`;

    appQuotes.forEach((q, idx) => {
        let allowedRates = q.processedRates.filter(r => r.isAllowed);
        if (allowedRates.length === 0) return;
        
        let insVal = q.insurance || 0;

        let itemsHtml = q.items.length > 0 ? q.items.map(i => i.isSub ? `<li style="list-style-type: none; font-size: 12px; color: ${th.textMuted}; margin-left: 12px; margin-top: 2px;">↳ ${i.text}</li>` : `<li style="margin-top: 4px;">${i.text}</li>`).join('') : '<li>N/A</li>';
        let accHtml = q.accessorials.length > 0 ? q.accessorials.join(', ') : '';

        html += `<div style="page-break-inside: avoid; margin-bottom: 24px;">`;

        let reportGroupTitle = isBatch ? `📦 ${q.label} ${q.id !== '-' ? `(ID: ${q.id})` : ''}` : `📦 Priority 1 Quote ID: ${q.id !== '-' ? q.id : 'N/A'}`;

        html += `
            <h3 style="color: ${th.primary}; border-bottom: 2px solid ${th.border}; padding-bottom: 8px; margin-bottom: 16px;">${reportGroupTitle}</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px;">
                <tr><td style="padding: 4px 0; color: ${th.text}; width: 100px;"><strong>${t.lblFrom}:</strong></td><td style="padding: 4px 0; color: ${th.text};">${q.from || 'N/A'}</td></tr>
                <tr><td style="padding: 4px 0; color: ${th.text};"><strong>${t.lblTo}:</strong></td><td style="padding: 4px 0; color: ${th.text};">${q.to || 'N/A'}</td></tr>
            </table>
            <h4 style="margin: 0 0 8px 0; color: ${th.acc1}; font-size: 14px;">${t.lblItems}</h4>
            <ul style="margin: 0 0 12px 0; padding-left: 20px; color: ${th.text};">
                ${itemsHtml}
            </ul>
            ${accHtml ? `<p style="margin: 0 0 16px 0;"><strong style="color: ${th.acc2};">${t.lblAcc}:</strong> <span style="color: ${th.text};">${accHtml}</span></p>` : ''}
        `;
        
        let wN = includeNotes ? "20%" : "0%"; 
        let thHTML = `<th style="border: 1px solid ${th.border}; padding: 10px; background-color: ${th.thBg}; font-weight: bold; width: 25%; color: ${th.thText};">${t.thCarrier}</th>
                      <th style="border: 1px solid ${th.border}; padding: 10px; background-color: ${th.thBg}; font-weight: bold; width: 15%; color: ${th.thText};">${t.thRate}</th>`;
        
        if (hasInternalCols) {
            if (exportCarrierCost || exportMargin) {
                thHTML += `<th style="border: 1px solid ${th.border}; padding: 10px; background-color: ${th.thBg}; font-weight: bold; color: ${th.thText};">${exportCarrierCost ? t.lblCarrierCost : ''} ${exportCarrierCost && exportMargin ? '/' : ''} ${exportMargin ? t.lblMargin : ''}</th>`;
            }
        }

        thHTML += `<th style="border: 1px solid ${th.border}; padding: 10px; background-color: ${th.thBg}; font-weight: bold; width: 20%; color: ${th.thText};">${t.thLiability}</th>
                   <th style="border: 1px solid ${th.border}; padding: 10px; background-color: ${th.thBg}; font-weight: bold; width: 15%; color: ${th.thText};">${t.thTransit}</th>`;
        
        if (hasInternalCols) {
            thHTML += `<th style="border: 1px solid ${th.border}; padding: 10px; background-color: ${th.thBg}; font-weight: bold; color: ${th.thText};">${t.lblExpDate}</th>`;
        }

        if (includeNotes) thHTML += `<th style="border: 1px solid ${th.border}; padding: 10px; background-color: ${th.thBg}; font-weight: bold; width: ${wN}; color: ${th.thText};">${t.thNotes}</th>`;

        html += `<table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; color: ${th.text}; margin-bottom: 12px;">
                 <thead><tr>${thHTML}</tr></thead><tbody>`;

        allowedRates.forEach(row => {
            if (row.rateType === 'Volume') hasVolume = true;

            let daysText = String(row.days).trim();
            if(daysText !== '') { if (daysText === '1') daysText += ` ${t.day}`; else if (!isNaN(daysText) || daysText.match(/^\d+(\s*-\s*\d+)?$/)) daysText += ` ${t.days}`; }

            let notesHtml = row.warnings.concat(row.infos).length > 0 ? `<span style="color: ${th.acc2};">${row.warnings.concat(row.infos).join(' | ')}</span>` : `<span style="color: ${th.textMuted};">-</span>`;
            
            let liabilityHtml = '';
            if (row.liability && row.liability !== '-') {
                if(row.liability.includes('/')){
                    const parts = row.liability.split('/');
                    liabilityHtml = `<span style="font-size: 10px; color: ${th.textMuted};">${t.liabNew}</span> <span style="font-size: 12px; color: ${th.text}; font-family: monospace;">${parts[0]}</span><br>
                                     <span style="font-size: 10px; color: ${th.textMuted};">${t.liabUsed}</span> <span style="font-size: 12px; color: ${th.text}; font-family: monospace;">${parts[1]}</span>`;
                } else liabilityHtml = `<span style="font-size: 12px; color: ${th.text}; font-family: monospace;">${row.liability}</span>`;
            }
            
            let emailStars = '';
            if (includeRating) {
                emailStars = `<span style="color: #f59e0b; font-size: 12px;">${getEmailStars(row.rating)}</span> <span style="font-size: 10px; color: ${th.textMuted};">(${row.rating.toFixed(1)})</span>`;
            }
            
            let typeText = row.rateType === 'Volume' ? t.rateVol : t.rateLTL;
            let rateTypeHtml = row.rateType === 'Volume' ? `<span style="color: ${th.text}; padding: 2px 4px; border-radius: 4px; font-size: 10px; border: 1px solid ${th.border}; margin-left: 6px; vertical-align: middle;">${typeText}</span>` : `<span style="color: ${th.textMuted}; padding: 2px 4px; border-radius: 4px; font-size: 10px; border: 1px solid ${th.border}; margin-left: 6px; vertical-align: middle;">${typeText}</span>`;

            let carrierExtra = includeRating ? `<br>${emailStars}` : '';
            if(row.quoteNumber !== '-') carrierExtra += `<br><span style="font-size:10px; color:${th.textMuted};">${t.refLabel} ${row.quoteNumber}</span>`;

            let rateHtml = `$${row.cost.toFixed(2)}`;
            if (insVal > 0) {
                rateHtml += `<br><span style="font-size: 11px; color: ${th.textMuted};">+ $${insVal.toFixed(2)} ${t.lblInsurance}</span>`;
                rateHtml += `<br><strong style="font-size: 13px; color: ${th.text};">${t.lblTotal}: $${(row.cost + insVal).toFixed(2)}</strong>`;
            }

            // BULLETPROOF: Sin Iconos en Exportación
            let rowHTML = `<tr>
                <td style="border: 1px solid ${th.border}; padding: 10px; color: ${th.text}; vertical-align: top;"><strong style="vertical-align: middle;">${row.normalizedName}</strong>${rateTypeHtml}${carrierExtra}</td>
                <td style="border: 1px solid ${th.border}; padding: 10px; color: ${th.primary}; font-weight: bold; font-size: 14px; vertical-align: top;">${rateHtml}</td>`;
            
            if (hasInternalCols) {
                if (exportCarrierCost || exportMargin) {
                    rowHTML += `<td style="border: 1px solid ${th.border}; padding: 10px; color: ${th.textMuted}; vertical-align: top; font-size: 12px;">`;
                    if (exportCarrierCost) rowHTML += `<div>Cost: $${row.carrierCost || '-'}</div>`;
                    if (exportMargin) rowHTML += `<div style="margin-top:2px;">Margin: <span style="font-weight:bold; color:var(--text);">${row.margin || '-'}</span></div>`;
                    rowHTML += `</td>`;
                }
            }

            rowHTML += `
                <td style="border: 1px solid ${th.border}; padding: 10px; color: ${th.text}; vertical-align: top;">${liabilityHtml}</td>
                <td style="border: 1px solid ${th.border}; padding: 10px; color: ${th.text}; vertical-align: top;"><div style="font-size: 13px;">${daysText}</div><div style="font-size: 11px; color: ${th.textMuted}; margin-top: 2px;">${row.service}</div></td>`;
            
            if (hasInternalCols) {
                rowHTML += `<td style="border: 1px solid ${th.border}; padding: 10px; color: ${th.textMuted}; vertical-align: top; font-size: 12px;">${row.expiration || '-'}</td>`;
            }

            if (includeNotes) rowHTML += `<td style="border: 1px solid ${th.border}; padding: 10px; font-size: 12px; color: ${th.text}; vertical-align: top;">${notesHtml}</td>`;
            
            rowHTML += `</tr>`;
            html += rowHTML;
        });
        html += `</tbody></table></div>`;
    });
    
    if (hasVolume) html += `<p style="margin-top: 16px; font-size: 10px; color: ${th.textMuted}; line-height: 1.4; border-top: 1px dashed ${th.border}; padding-top: 12px;">${t.volDisclaimer}</p>`;
    html += `</div>`;
    return html;
}

function exportToPdf() {
    if (appQuotes.length === 0) { alert(dict[currentLang].errNoRates); return; }
    
    const btn = document.getElementById('exportPdfBtn');
    const originalText = btn.innerText;
    btn.innerText = "⏳...";
    btn.disabled = true;

    const htmlContent = getReportHTML(true); 
    let p1Id = appQuotes.length > 0 && appQuotes[0].id !== '-' ? appQuotes[0].id : 'Export';
    
    const opt = {
        margin:       10,
        filename:     `Quote#_${p1Id}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, letterRendering: true, scrollY: 0, scrollX: 0 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(htmlContent).save().then(() => {
        btn.innerText = originalText;
        btn.disabled = false;
    }).catch(err => {
        console.error("PDF Export Error:", err);
        btn.innerText = originalText;
        btn.disabled = false;
        alert("Error generating PDF.");
    });
}

function copyForEmail() {
    if (appQuotes.length === 0) { alert(dict[currentLang].errNoRates); return; }
    const t = dict[currentLang]; 
    
    const currentTheme = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', 'light');

    const html = getReportHTML(false);

    const container = document.createElement('div'); 
    container.innerHTML = html; 
    container.style.position = 'absolute'; 
    container.style.left = '-9999px'; 
    container.style.backgroundColor = '#ffffff'; 
    document.body.appendChild(container);
    
    try { 
        const range = document.createRange(); 
        range.selectNodeContents(container); 
        const selection = window.getSelection(); 
        selection.removeAllRanges(); 
        selection.addRange(range); 
        document.execCommand('copy'); 
        
        const btn = document.getElementById('copyBtn'); 
        const originalText = t.copyBtn; 
        btn.innerText = "✅ " + t.msgCopied; 
        btn.style.backgroundColor = "#10b981"; 
        btn.style.color = "#ffffff"; 
        
        const toast = document.getElementById('copyToast');
        if (toast) {
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2500);
        }

        setTimeout(() => { 
            btn.innerText = originalText; 
            btn.style.backgroundColor = ""; 
            btn.style.color = ""; 
        }, 2500); 
    } catch (err) { 
        alert("Error copying text. Your browser might block this action inside Google Sites."); 
    } finally { 
        window.getSelection().removeAllRanges(); 
        document.body.removeChild(container); 
        if(currentTheme) {
            document.documentElement.setAttribute('data-theme', currentTheme);
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }
}

function exportToCsv() {
    if (appQuotes.length === 0) { alert(dict[currentLang].errNoRates); return; }
    
    let includeNotes = document.getElementById('exportNotes').checked;
    let includeRating = document.getElementById('exportRating').checked;
    let exportCarrierCost = document.getElementById('exportCarrierCost') ? document.getElementById('exportCarrierCost').checked : false;
    let exportMargin = document.getElementById('exportMargin') ? document.getElementById('exportMargin').checked : false;
    const isBatch = document.getElementById('batchMode').checked;
    
    let hasInsurance = false;
    let hasInternalCols = appQuotes.some(q => q.hasInternalCols);
    appQuotes.forEach(q => { if (q.insurance > 0) hasInsurance = true; });
    
    let headers = ["Batch Name", "P1 Quote#", "Origin", "Destination", "Type", "Carrier"];
    if (includeRating) headers.push("Rating");
    headers.push("Carrier Quote ID", "Base Rate");
    
    if (hasInternalCols) {
        if (exportCarrierCost) headers.push("Carrier Cost");
        if (exportMargin) headers.push("Margin");
    }
    
    if (hasInsurance) headers.push("Insurance", "Total Rate");
    headers.push("Liability", "Transit Days", "Service");
    
    if (hasInternalCols) headers.push("Exp. Date");
    if (includeNotes) headers.push("Notes");
    
    let csvRows = [];
    csvRows.push(headers.join(","));
    
    appQuotes.forEach(q => {
        let insVal = q.insurance || 0;
        let allowedRates = q.processedRates.filter(r => r.isAllowed);
        
        allowedRates.forEach(row => {
            let liabClean = row.liability !== '-' && row.liability.includes('/') ? `${dict[currentLang].liabNew} ${row.liability.split('/')[0]} | ${dict[currentLang].liabUsed} ${row.liability.split('/')[1]}` : (row.liability === '-' ? '' : row.liability.replace(/\n/g, ' '));
            let typeText = row.rateType === 'Volume' ? dict[currentLang].rateVol : dict[currentLang].rateLTL;
            
            let safeQuoteId = q.id !== '-' ? q.id : '';
            let safeOrigin = q.from !== '-' ? q.from : '';
            let safeDest = q.to !== '-' ? q.to : '';

            let rowData = [isBatch ? q.label : "Priority 1 Quote", safeQuoteId, safeOrigin, safeDest, typeText, row.normalizedName];

            if (includeRating) rowData.push(row.rating.toFixed(1));
            
            rowData.push(row.quoteNumber !== '-' ? row.quoteNumber : '');
            rowData.push(row.cost.toFixed(2));
            
            if (hasInternalCols) {
                if (exportCarrierCost) rowData.push(row.carrierCost || '');
                if (exportMargin) rowData.push(row.margin || '');
            }

            if (hasInsurance) {
                rowData.push(insVal > 0 ? insVal.toFixed(2) : '0.00');
                rowData.push((row.cost + insVal).toFixed(2));
            }
            
            rowData.push(liabClean);
            rowData.push(String(row.days).trim());
            rowData.push(row.service);
            
            if (hasInternalCols) rowData.push(row.expiration || '');
            
            if (includeNotes) {
                let notesStr = row.warnings.concat(row.infos).join(" | ");
                rowData.push(notesStr);
            }
            
            let escapedRow = rowData.map(cell => {
                let cellStr = String(cell);
                if (cellStr.includes('"') || cellStr.includes(',') || cellStr.includes('\n')) {
                    return `"${cellStr.replace(/"/g, '""')}"`;
                }
                return `"${cellStr}"`; 
            });

            csvRows.push(escapedRow.join(","));
        });
    });
    
    const csvString = "\uFEFF" + csvRows.join("\n"); 
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    let p1Id = appQuotes.length > 0 && appQuotes[0].id !== '-' ? appQuotes[0].id : 'Export';
    
    link.setAttribute("href", url);
    link.setAttribute("download", `Quote#_${p1Id}.csv`);
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

const hazmatData = [
    { class: "1", type: "Explosives", nmfc: "64300", notes: "Please review the carrier list for Explosives to confirm which LTL carriers will move explosives." },
    { class: "2.1", type: "Flammable Gases or Gas Mixtures", nmfc: "85890", notes: "" },
    { class: "2.2", type: "Non-Flammable and Non-Toxic Gases or Gas Mixtures", nmfc: "85880", notes: "" },
    { class: "2.3", type: "Poison Gases or Gas Mixtures", nmfc: "85900", notes: "" },
    { class: "3", type: "Flammable Liquids", nmfc: "44500", notes: "Applies to ALL Flammable Liquids. Applies to Combustible Liquids when in bulk containers." },
    { class: "4.1", type: "Flammable Solids", nmfc: "44515", notes: "" },
    { class: "4.2", type: "Spontaneously Combustible Materials", nmfc: "44515", notes: "" },
    { class: "4.3", type: "Dangerous When Wet Materials", nmfc: "44515", notes: "" },
    { class: "5.1", type: "Oxidizers", nmfc: "45467", notes: "" },
    { class: "5.2", type: "Organic Peroxides", nmfc: "45463", notes: "" },
    { class: "6.1", type: "Poisonous or Toxic Materials", nmfc: "45615", notes: "" },
    { class: "6.2", type: "Infectious Substances", nmfc: "101682", notes: "Freight class 0 – Not taken." },
    { class: "7", type: "Radioactive Materials", nmfc: "164900", notes: "Most (if not all) LTL carriers will not move radioactive materials." },
    { class: "8", type: "Corrosive Materials", nmfc: "44155", notes: "" },
    { class: "9", type: "Miscellaneous Hazardous Materials", nmfc: "45322", notes: "Also applies on Marine Pollutants not specifically listed in 49 CFR §172.101, Hazardous Materials Table, and that do not meet the definition of Hazard Classes 1 through 8." },
    { class: "Special", type: "Hazardous batteries", nmfc: "60680", notes: "" },
    { class: "Special", type: "Chemicals NOI", nmfc: "43940", notes: "Applies to Combustible Liquids NOT in bulk containers, and applies to non-haz chemicals. For Combustible Liquids in bulk containers, see NMFC 44500." },
    { class: "Special", type: "Chemical oxygen generators", nmfc: "45470", un: "3356", notes: "Specifically applies to UN3356." },
    { class: "Special", type: "Lighters", nmfc: "111230", notes: "" },
    { class: "Special", type: "EBikes or ETrikes (with hazmat batteries)", nmfc: "190270", notes: "" },
    { class: "Special", type: "Air bag inflators or modules", nmfc: "192080", notes: "" },
    { class: "Special", type: "Empty cylinders containing hazmat residue", nmfc: "41160", notes: "" },
    { class: "Special", type: "Self-reactive Materials", nmfc: "46047", notes: "" },
    { class: "Special", type: "Flares or Fusees", nmfc: "70060", notes: "" },
    { class: "Special", type: "Oxygen, recreational", nmfc: "86070", notes: "" },
    { class: "Special", type: "Life-saving boats or rafts", nmfc: "24650", notes: "" }
];

function searchHazmat() {
    const val = document.getElementById('hazmatSearch').value.toLowerCase().trim();
    const container = document.getElementById('hazmatResults');
    if(!val) { container.innerHTML = ''; return; }
    
    const unVal = val.replace(/^un\s*/i, '');
    
    const filtered = hazmatData.filter(h => 
        h.class.toLowerCase().includes(val) || 
        h.type.toLowerCase().includes(val) || 
        h.nmfc.includes(val) ||
        (h.un && h.un.toLowerCase().includes(unVal)) ||
        (h.notes && h.notes.toLowerCase().includes(val))
    );
    
    if (filtered.length === 0) {
         container.innerHTML = `<div style="padding: 8px; color: var(--text-muted); font-style: italic;">
            ${dict[currentLang].noResults}<br><br>
         </div>`;
    } else {
         container.innerHTML = filtered.map(h => `<div class="hazmat-result-item"><strong>${h.class.includes('Special') ? '' : 'Class '}${h.class}</strong> - ${h.type}<br><span style="color:var(--primary); font-weight:bold;">NMFC: ${h.nmfc}</span>${h.un ? ` | <span style="color:var(--warning); font-weight:bold;">UN#: ${h.un}</span>` : ''}${h.notes ? `<br><span style="color:var(--text-muted); font-size: 0.75rem;">${h.notes}</span>` : ''}</div>`).join('');
    }
}
