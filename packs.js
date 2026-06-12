// --- packs.js ---
// Modular Pack Generation System for Ice & Icons

const PackManager = {
    // Defines what qualifies as a high-value card based on your salary tiers
    RARITY: {
        RARE: 150000,   // Skaters >= 100 base output, Goalies at 100k
        MYTHIC: 250000  // Skaters >= 135 base output, Goalies at 250k
    },

    // --- HELPER FUNCTIONS ---
    _shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    },

    _getDecade(seasonString) {
        // Converts "1994" to "1990s"
        return seasonString.substring(0, 3) + "0s";
    },

    _pullCards(pool, conditionFn, count, fallbackPool = []) {
        // Attempts to pull 'count' cards meeting 'conditionFn' from 'pool'
        // If it runs out, it pulls from the 'fallbackPool' to prevent crashes
        let validCards = this._shuffle(pool.filter(conditionFn));
        let selected = validCards.slice(0, count);
        
        if (selected.length < count && fallbackPool.length > 0) {
            let needed = count - selected.length;
            let fallbackCards = this._shuffle(fallbackPool.filter(conditionFn));
            // Filter out cards we already grabbed
            fallbackCards = fallbackCards.filter(c => !selected.includes(c));
            selected = selected.concat(fallbackCards.slice(0, needed));
        }
        return selected;
    },

    // --- DRAFT PACK LOGIC ---
    generateDraftPackOptions(globalPool, numOptions = 3) {
        // Generates an array of theme objects to present to the player
        let teams = [...new Set(globalPool.map(p => p.team))];
        let years = [...new Set(globalPool.map(p => p.season))];
        let decades = [...new Set(globalPool.map(p => this._getDecade(p.season)))];

        let themeTypes = ["TEAM", "YEAR", "DECADE"];
        let options = [];

        for (let i = 0; i < numOptions; i++) {
            let type = themeTypes[Math.floor(Math.random() * themeTypes.length)];
            let value;
            if (type === "TEAM") value = teams[Math.floor(Math.random() * teams.length)];
            if (type === "YEAR") value = years[Math.floor(Math.random() * years.length)];
            if (type === "DECADE") value = decades[Math.floor(Math.random() * decades.length)];

            options.push({ type: type, value: value });
        }
        return options;
    },

    openDraftPack(globalPool, theme) {
        // Returns an array of 13 cards matching the theme
        let themePool = globalPool.filter(p => {
            if (theme.type === "TEAM") return p.team === theme.value;
            if (theme.type === "YEAR") return p.season === theme.value;
            if (theme.type === "DECADE") return this._getDecade(p.season) === theme.value;
            return true;
        });

        let pack = [];

        // 1. Core Positional Requirements (12 cards)
        // Uses globalPool as a fallback in case a specific team/year doesn't have 4 Defensemen
        pack = pack.concat(this._pullCards(themePool, p => p.pos === "LW", 2, globalPool));
        pack = pack.concat(this._pullCards(themePool, p => p.pos === "C", 2, globalPool));
        pack = pack.concat(this._pullCards(themePool, p => p.pos === "RW", 2, globalPool));
        pack = pack.concat(this._pullCards(themePool, p => p.pos === "D", 4, globalPool));
        pack = pack.concat(this._pullCards(themePool, p => p.pos === "G", 2, globalPool));

        // 2. Guaranteed High-Value Slot (1 card)
        // Looks for a Rare card within the theme. Falls back to global Rares if none exist.
        let rareCard = this._pullCards(
            themePool, 
            p => getPlayerSalary(p) >= this.RARITY.RARE, 
            1, 
            globalPool.filter(p => getPlayerSalary(p) >= this.RARITY.RARE)
        );

        pack = pack.concat(rareCard);

        return this._shuffle(pack); // Shuffle the final 13 cards so the rare isn't always at the end
    },

    // --- STORE PACK LOGIC ---
    openStorePack(globalPool) {
        // Returns an array of 7 unthemed cards: 5 random, 1 rare, 1 mythic
        let pack = [];

        // 1. Guaranteed Mythic
        let mythicPool = globalPool.filter(p => getPlayerSalary(p) >= this.RARITY.MYTHIC);
        let mythicCard = this._pullCards(mythicPool, () => true, 1);
        pack = pack.concat(mythicCard);

        // 2. Guaranteed Rare (Ensure we don't pull the exact same card as the mythic)
        let rarePool = globalPool.filter(p => getPlayerSalary(p) >= this.RARITY.RARE && !pack.includes(p));
        let rareCard = this._pullCards(rarePool, () => true, 1);
        pack = pack.concat(rareCard);

        // 3. Five Random Filler Cards
        let standardPool = globalPool.filter(p => !pack.includes(p));
        let fillerCards = this._pullCards(standardPool, () => true, 5);
        pack = pack.concat(fillerCards);

        return this._shuffle(pack);
    }
};
