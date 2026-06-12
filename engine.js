// --- GLOBAL CONSTANTS & CACHE ---
const POS_REQUIREMENTS = { "LW": 2, "C": 2, "RW": 2, "D": 4, "G": 2 };
const VISUAL_LAYOUT = ["LW", "C", "RW", "D", "G", "D"];
const DOM = {};

const TEAM_COLORS = {
    "ANA": {name: "Anaheim Ducks", bg: "#F47A38", text: "#FFFFFF", border: "#000000"},
    "BOS": {name: "Boston Bruins", bg: "#111111", text: "#FFFFFF", border: "#FFB81C"},
    "BUF": {name: "Buffalo Sabres", bg: "#002654", text: "#FFFFFF", border: "#FCB514"},
    "CAR": {name: "Carolina Hurricanes", bg: "#CC0000", text: "#FFFFFF", border: "#000000"},
    "CBJ": {name: "Columbus Blue Jackets", bg: "#002654", text: "#FFFFFF", border: "#CE1126"},
    "CGY": {name: "Calgary Flames", bg: "#C8102E", text: "#FFFFFF", border: "#F15A22"},
    "CHI": {name: "Chicago Blackhawks", bg: "#CF0A2C", text: "#FFFFFF", border: "#111111"},
    "COL": {name: "Colorado Avalanche", bg: "#6F263D", text: "#FFFFFF", border: "#236192"},
    "DAL": {name: "Dallas Stars", bg: "#006847", text: "#FFFFFF", border: "#8F8F8C"},
    "DET": {name: "Detroit Red Wings", bg: "#CE1126", text: "#FFFFFF", border: "#FFFFFF"},
    "EDM": {name: "Edmonton Oilers", bg: "#041E42", text: "#FFFFFF", border: "#FF4A00"},
    "FLA": {name: "Florida Panthers", bg: "#041E42", text: "#FFFFFF", border: "#C8102E"},
    "LAK": {name: "Los Angeles Kings", bg: "#111111", text: "#FFFFFF", border: "#A2AAAD"},
    "MIN": {name: "Minnesota Wild", bg: "#154734", text: "#FFFFFF", border: "#DDCBA4"},
    "MTL": {name: "Montreal Canadiens", bg: "#AF1E2D", text: "#FFFFFF", border: "#192A56"},
    "NJD": {name: "New Jersey Devils", bg: "#CE1126", text: "#FFFFFF", border: "#111111"},
    "NSH": {name: "Nashville Predators", bg: "#FFB81C", text: "#111111", border: "#041E42"},
    "NYI": {name: "New York Islanders", bg: "#00539B", text: "#FFFFFF", border: "#F47920"},
    "NYR": {name: "New York Rangers", bg: "#0038A8", text: "#FFFFFF", border: "#CE1126"},
    "OTT": {name: "Ottawa Senators", bg: "#C52032", text: "#FFFFFF", border: "#C2912C"},
    "PHI": {name: "Philadelphia Flyers", bg: "#F74902", text: "#FFFFFF", border: "#111111"},
    "PIT": {name: "Pittsburgh Penguins", bg: "#111111", text: "#FFFFFF", border: "#FCB514"},
    "SJS": {name: "San Jose Sharks", bg: "#006D75", text: "#FFFFFF", border: "#EA7200"},
    "SEA": {name: "Seattle Kraken", bg: "#001628", text: "#FFFFFF", border: "#99D9D9"},
    "STL": {name: "St. Louis Blues", bg: "#002F87", text: "#FFFFFF", border: "#FCB514"},
    "TBL": {name: "Tampa Bay Lightning", bg: "#002868", text: "#FFFFFF", border: "#FFFFFF"},
    "TOR": {name: "Toronto Maple Leafs", bg: "#00205B", text: "#FFFFFF", border: "#FFFFFF"},
    "UTA": {name: "Utah Hockey Club", bg: "#111111", text: "#FFFFFF", border: "#71AFE5"},
    "VAN": {name: "Vancouver Canucks", bg: "#00205B", text: "#FFFFFF", border: "#00843D"},
    "VGK": {name: "Vegas Golden Knights", bg: "#B4975A", text: "#111111", border: "#333F42"},
    "WSH": {name: "Washington Capitals", bg: "#C8102E", text: "#FFFFFF", border: "#041E42"},
    "WPG": {name: "Winnipeg Jets", bg: "#041E42", text: "#FFFFFF", border: "#FFFFFF"},
    "ATL": {name: "Atlanta Thrashers", bg: "#002868", text: "#FFFFFF", border: "#F9A01B"},
    "QUE": {name: "Quebec Nordiques", bg: "#005FA9", text: "#FFFFFF", border: "#C8102E"},
    "HFD": {name: "Hartford Whalers", bg: "#007A33", text: "#FFFFFF", border: "#00205B"},
    "WIN": {name: "Winnipeg Jets", bg: "#002E6D", text: "#FFFFFF", border: "#C8102E"},
    "MNS": {name: "Minnesota North Stars", bg: "#009639", text: "#FFFFFF", border: "#FFD100"},
    "AFM": {name: "Atlanta Flames", bg: "#C8102E", text: "#FFFFFF", border: "#FFC72C"},
    "CLR": {name: "Colorado Rockies", bg: "#00285D", text: "#FFFFFF", border: "#C8102E"},
    "KCS": {name: "Kansas City Scouts", bg: "#002F87", text: "#FFFFFF", border: "#C8102E"},
    "CGS": {name: "California Golden Seals", bg: "#008853", text: "#FFFFFF", border: "#FFB81C"},
    "CLE": {name: "Cleveland Barons", bg: "#C8102E", text: "#FFFFFF", border: "#000000"},
    "OAK": {name: "Oakland Seals", bg: "#008853", text: "#FFFFFF", border: "#FFB81C"}
};

let runState = {
    stageIndex: 0,
    handIndex: 0,
    totalGamesPlayed: 0,
    franchisePool: [],
    runtimeDeck: [],
    discardPile: [],
    currentHand: [],
    selectedLineup: [],
    activePerks: { manager: null, coach: null, game_plan: null },
    teamFunds: 0,
    discardsLeft: 3
};

let draftState = {
    budget: 2000000,
    round: 1,
    schedule: ["C", "G", "LW", "RW", "D", "G", "D", "RW", "LW", "C", "D", "D"],
    currentPool: [],
    roundPicks: [],
    seenPlayers: new Set()
};

document.addEventListener("DOMContentLoaded", () => {
    DOM.scoreCalc = document.getElementById('current-score-calc');
    DOM.baseTarget = document.getElementById('hud-base-target');
    DOM.targetScore = document.getElementById('hud-target-score');
    DOM.earningsText = document.getElementById('earnings-text-info');
    DOM.submitBtn = document.getElementById('submit-lineup-btn');
    DOM.discardBtn = document.getElementById('discard-selected-btn');
    DOM.selectedZone = document.getElementById('selected-lineup-zone');
    DOM.handZone = document.getElementById('hand-zone');
    DOM.staffZone = document.getElementById('active-staff-zone');
});

// --- CORE UTILS ---
function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function showNotification(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = message;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function getPlayerSalary(player) {
    if (player.pos === "G") {
        if (player.stats.SV >= 0.930) return 250000;
        if (player.stats.SV >= 0.915) return 100000;
        return 75000;
    } else {
        let base = (player.stats.G * 2) + player.stats.A;
        if (base >= 160) return 500000;
        if (base >= 135) return 250000;
        if (base >= 100) return 150000;
        if (base >= 65) return 75000;
        return 50000;
    }
}

function calculateMatchupStats(lineupArray) {
    let skaters = lineupArray.filter(p => p.pos !== "G");
    let goalie = lineupArray.find(p => p.pos === "G");
    let baseTarget = HISTORICAL_STAGES[runState.stageIndex]?.target || 0;

    let activePerks = runState.activePerks;

    let totalScore = 0;
    let pmSum = 0;

    let franchises = skaters.map(s => s.team);
    let uniqueFranchises = [...new Set(franchises)].length;
    let maxSameTeam = Math.max(0, ...Object.values(franchises.reduce((a,c) => {a[c] = (a[c]||0)+1; return a}, {})));

    skaters.forEach(p => {
        let gVal = 2;
        if (activePerks.coach?.id === 'coach_offensive') gVal = activePerks.coach.data.mult;

        let pts = (p.stats.G * gVal) + p.stats.A;

        if (p.stats.A > p.stats.G && activePerks.coach?.id === 'coach_playmaker') {
            pts += (p.stats.A - p.stats.G) * activePerks.coach.data.mult;
        }

        if (p.stats.G > p.stats.A && activePerks.game_plan?.id === 'gp_forecheck') {
            pts += activePerks.game_plan.data.bonus;
        }

        if ((p.pos === 'LW' || p.pos === 'RW') && activePerks.game_plan?.id === 'gp_winglock') {
            pts += activePerks.game_plan.data.bonus;
        }

        if (p.pos === 'C' && activePerks.game_plan?.id === 'gp_trap') {
            pts *= activePerks.game_plan.data.cMult;
        }

        totalScore += pts;
        pmSum += p.stats.plusMinus;
    });

    if (uniqueFranchises === 5 && skaters.length === 5 && activePerks.manager?.id === 'gm_sather') {
        totalScore += activePerks.manager.data.bonus;
    }

    let adjTarget = baseTarget;

    if (goalie) {
        let svBase = 0.900;
        let svDiff = goalie.stats.SV - svBase;
        let reductionPct = (svDiff * 5);

        if (activePerks.game_plan?.id === 'gp_trap') {
            reductionPct += activePerks.game_plan.data.gMult;
        }

        adjTarget = adjTarget * (1 - reductionPct);

        let pmMult = 0;
        if (activePerks.coach?.id === 'coach_goalie' && goalie.stats.GAA < activePerks.coach.data.gaa) {
            pmMult = activePerks.coach.data.mult;
        }

        if (pmSum > 0 && pmMult > 0) {
            adjTarget -= (pmSum * pmMult);
        }
    }

    if (maxSameTeam >= 3 && activePerks.manager?.id === 'gm_pollock') {
        adjTarget *= activePerks.manager.data.mult;
    }

    return {
        score: Math.floor(totalScore),
        target: Math.floor(Math.max(0, adjTarget))
    };
}

function switchView(viewId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
}

// --- DRAFT SCREEN LOGIC ---
function initiateRun() {
    runState.stageIndex = 0;
    runState.handIndex = 0;
    runState.totalGamesPlayed = 0;
    runState.teamFunds = 2000000; 
    runState.franchisePool = [];
    runState.discardPile = [];
    runState.currentHand = [];
    runState.activePerks = { manager: null, coach: null, game_plan: null };

    draftState.round = 1;
    draftState.maxRounds = 4;
    draftState.currentPacks = [];
    draftState.selectedPack = null;

    switchView('scr-initial-draft');
    generateDraftPacks();
}

function generateDraftPacks() {
    draftState.currentPacks = PackManager.generateDraftPackOptions(MASTER_REGULAR_POOL, 4);
    draftState.selectedPack = null;
    renderDraftScreen();
}

function renderDraftScreen() {
    document.getElementById('draft-round-display').innerText = draftState.round;
    
    const finishBtn = document.getElementById('finish-draft-btn');
    finishBtn.disabled = draftState.selectedPack === null;
    finishBtn.innerText = draftState.round === draftState.maxRounds ? "Finalize Core & Open" : "Confirm Pack Selection";

    const poolContainer = document.getElementById('draft-card-pool');
    poolContainer.innerHTML = '';

    draftState.currentPacks.forEach(packTheme => {
        const card = document.createElement('div');
        card.className = "hockey-card pack-card";
        card.style.cursor = "pointer";
        card.style.display = "flex";
        card.style.alignItems = "center";
        card.style.justifyContent = "center";
        card.style.flexDirection = "column";

        if (packTheme.type === "TEAM") {
            const tColor = TEAM_COLORS[packTheme.value] || { bg: "#333", border: "#888", text: "#FFFFFF" };
            card.style.backgroundColor = tColor.bg;
            card.style.border = `5px solid ${tColor.border}`;
            card.style.color = tColor.text;
        } else {
            card.style.backgroundColor = "#1e293b";
            card.style.border = "5px solid #cbd5e1";
            card.style.color = "#FFFFFF";
        }

        card.innerHTML = `<h3 style="margin:0; text-shadow:1px 1px 3px #000; font-size:1.4rem;">${packTheme.value}</h3><span style="font-size:0.75rem; opacity:0.8; font-weight:bold; text-transform:uppercase; margin-top:5px;">${packTheme.type} THEME</span>`;

        if (draftState.selectedPack === packTheme) {
            card.style.transform = "translateY(-4px)";
            card.style.boxShadow = "0 0 0 5px var(--rink-blue)";
        }

        card.onclick = () => {
            draftState.selectedPack = packTheme;
            renderDraftScreen();
        };

        poolContainer.appendChild(card);
    });
}

function confirmDraftRound() {
    let pulledCards = PackManager.openDraftPack(MASTER_REGULAR_POOL, draftState.selectedPack);
    runState.franchisePool.push(...pulledCards);

    openPackModal(pulledCards, () => {
        if (draftState.round === draftState.maxRounds) {
            finishInitialDraft();
        } else {
            draftState.round++;
            generateDraftPacks();
        }
    });
}

function openPackModal(cards, onCloseCallback) {
    const modal = document.getElementById('deck-modal');
    const title = document.getElementById('modal-title');
    const grid = document.getElementById('modal-card-grid');

    title.innerText = `Pack Opened! (${cards.length} Cards)`;
    grid.innerHTML = '';

    cards.forEach(player => {
        const card = createCardUiNode(player, false);
        card.onclick = null;
        card.draggable = false;
        
        let salary = getPlayerSalary(player);
        if (salary >= PackManager.RARITY.MYTHIC) {
            card.style.border = "6px solid #eab308"; 
        } else if (salary >= PackManager.RARITY.RARE) {
            card.style.border = "6px solid #a855f7"; 
        }

        grid.appendChild(card);
    });

    const closeBtn = document.getElementById('modal-close-btn');
    const originalOnclick = closeBtn.onclick;
    
    closeBtn.onclick = () => {
        closeDeckModal();
        closeBtn.onclick = originalOnclick; 
        if (onCloseCallback) onCloseCallback();
    };

    modal.style.display = 'flex';
}

function finishInitialDraft() {
    runState.runtimeDeck = [...runState.franchisePool];
    beginStage();
}

// --- GAMEPLAY LOOP ---
function beginStage() {
    runState.handIndex = 0;
    beginHand();
}

function beginHand() {
    runState.discardsLeft = 3;
    runState.selectedLineup = [];
    updateHudDisplay();

    Object.keys(POS_REQUIREMENTS).forEach(pos => {
        let currentCount = runState.currentHand.filter(p => p.pos === pos).length;
        let needed = POS_REQUIREMENTS[pos] - currentCount;

        if (needed > 0) {
            let available = runState.runtimeDeck.filter(p => p.pos === pos && !runState.currentHand.includes(p));
            if (available.length < needed) {
                runState.runtimeDeck.push(...runState.discardPile);
                runState.discardPile = [];
                available = runState.runtimeDeck.filter(p => p.pos === pos && !runState.currentHand.includes(p));
            }

            let options = runState.runtimeDeck.filter(p => p.pos === pos && !runState.currentHand.includes(p));
            let shuffled = shuffleArray([...options]);
            for(let i = 0; i < needed; i++) {
                if(shuffled[i]) runState.currentHand.push(shuffled[i]);
            }
        }
    });

    renderHandSelectionScreen();
    switchView('scr-gameplay');
}

function executeMassDiscard() {
    const sendDownCount = runState.selectedLineup.length;
    if (sendDownCount === 0 || sendDownCount > runState.discardsLeft) return;

    let totalCost = 0;
    runState.selectedLineup.forEach(discardedCard => {
        totalCost += Math.floor(getPlayerSalary(discardedCard) * 0.25);
    });

    if (runState.teamFunds < totalCost) {
        showNotification(`Insufficient funds! Need $${totalCost.toLocaleString()}`, "error");
        return;
    }

    runState.teamFunds -= totalCost;

    runState.selectedLineup.forEach(discardedCard => {
        let targetIdx = runState.currentHand.findIndex(c => c.name === discardedCard.name && c.season === discardedCard.season);
        let deckIdx = runState.runtimeDeck.findIndex(c => c.name === discardedCard.name && c.season === discardedCard.season);
        let franchiseIdx = runState.franchisePool.findIndex(c => c.name === discardedCard.name && c.season === discardedCard.season);

        if (deckIdx !== -1) runState.runtimeDeck.splice(deckIdx, 1);
        if (franchiseIdx !== -1) runState.franchisePool.splice(franchiseIdx, 1);

        let options = runState.runtimeDeck.filter(c => c.pos === discardedCard.pos && !runState.currentHand.includes(c));
        if (options.length === 0) {
            runState.runtimeDeck.push(...runState.discardPile);
            runState.discardPile = [];
            options = runState.runtimeDeck.filter(c => c.pos === discardedCard.pos && !runState.currentHand.includes(c));
        }

        if (options.length > 0) {
            let rolledCard = options[Math.floor(Math.random() * options.length)];
            if (targetIdx !== -1) runState.currentHand[targetIdx] = rolledCard;
        } else if (targetIdx !== -1) {
            runState.currentHand.splice(targetIdx, 1);
        }
    });

    runState.discardsLeft -= sendDownCount;
    runState.selectedLineup = [];

    showNotification(`Waived player(s) for a fee of $${totalCost.toLocaleString()}!`, "info");

    renderHandSelectionScreen();
    updateHudDisplay();
}

function executeMatchup() {
    let matchupStats = calculateMatchupStats(runState.selectedLineup);
    let stage = HISTORICAL_STAGES[runState.stageIndex];

    if (matchupStats.score >= matchupStats.target) {
        let surplus = matchupStats.score - matchupStats.target;
        let earnings = surplus * 1000;

        let activePerks = runState.activePerks;
        if (activePerks.manager?.id === 'gm_lamoriello') {
            let goalie = runState.selectedLineup.find(p => p.pos === 'G');
            if (goalie && getPlayerSalary(goalie) <= 100000 && runState.handIndex === stage.gamesCount - 1) {
                earnings += activePerks.manager.data.bonus;
            }
        }

        runState.teamFunds += earnings;

        runState.selectedLineup.forEach(playedCard => {
            let idx = runState.runtimeDeck.findIndex(c => c.name === playedCard.name && c.season === playedCard.season);
            if (idx !== -1) {
                let removed = runState.runtimeDeck.splice(idx, 1)[0];
                runState.discardPile.push(removed);
            }

            let handIdx = runState.currentHand.findIndex(c => c.name === playedCard.name && c.season === playedCard.season);
            if (handIdx !== -1) {
                runState.currentHand.splice(handIdx, 1);
            }
        });

        runState.handIndex++;
        runState.totalGamesPlayed++;

        if (runState.totalGamesPlayed >= 82) {
            showNotification(`Dynasty validated! Capital retained: $${runState.teamFunds.toLocaleString()}`, "success");
            switchView('scr-menu');
            return;
        }

        if (runState.handIndex >= stage.gamesCount) {
            showNotification("Series over! Entering Intermission Marketplace.", "info");
            openStorefrontPhase();
        } else {
            beginHand();
        }

    } else {
        showNotification(`Eliminated! Needed ${matchupStats.target} Pts. Scored ${matchupStats.score} Pts.`, "error");
        switchView('scr-menu');
    }
}

// --- UI UPDATES & DRAG/DROP ---
function handleDragStart(event, playerName, playerSeason) {
    event.dataTransfer.setData('text/plain', JSON.stringify({name: playerName, season: playerSeason}));
    event.dataTransfer.effectAllowed = 'move';
}
function handleDragOver(event) { event.preventDefault(); event.dataTransfer.dropEffect = 'move'; document.getElementById('rink-drop-zone').classList.add('drag-over'); }
function handleDragLeave(event) { document.getElementById('rink-drop-zone').classList.remove('drag-over'); }
function handleDrop(event) {
    event.preventDefault(); document.getElementById('rink-drop-zone').classList.remove('drag-over');
    try {
        const data = JSON.parse(event.dataTransfer.getData('text/plain'));
        const player = runState.currentHand.find(p => p.name === data.name && p.season === data.season);
        if (player) selectCardToLineup(player);
    } catch(e) { console.error("Drop failed: ", e); }
}

function renderHandSelectionScreen() {
    DOM.handZone.innerHTML = '';
    let unselectedHand = runState.currentHand.filter(p => !runState.selectedLineup.includes(p));
    let totalCards = unselectedHand.length;
    let middle = (totalCards - 1) / 2;

    unselectedHand.forEach((player, index) => {
        const card = createCardUiNode(player, false);
        card.onclick = () => selectCardToLineup(player);
