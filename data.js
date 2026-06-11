// --- MODULAR CONFIGURATION ---
// Type the years of the files you have generated and wish to load here.
// e.g., if you have "season_2024.js", add "2024" to this array.
const ACTIVE_SEASONS = [
    "1967", "1968", "1969", "1970", "1971", "1972", "1973", "1974", "1975", "1976",
"1977", "1978", "1979", "1980", "1981", "1982", "1983", "1984", "1985", "1986",
"1987", "1988", "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1996",
"1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006",
"2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016",
"2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"
];

// --- STATIC GAME DATA ---
const MASTER_PERKS_POOL = [
    // GMs (Named after historical greats)
    {
        id: "gm_pollock", name: "Sam Pollock", category: "manager",
        levels: [
            { cost: 100000, desc: "If 3+ skaters share a franchise, Target reduces by 5%.", mult: 0.95 },
            { cost: 150000, desc: "If 3+ skaters share a franchise, Target reduces by 8%.", mult: 0.92 },
            { cost: 200000, desc: "If 3+ skaters share a franchise, Target reduces by 12%.", mult: 0.88 },
            { cost: 260000, desc: "If 3+ skaters share a franchise, Target reduces by 18%.", mult: 0.82 },
            { cost: 350000, desc: "If 3+ skaters share a franchise, Target reduces by 25%.", mult: 0.75 }
        ]
    },
    {
        id: "gm_sather", name: "Glen Sather", category: "manager",
        levels: [
            { cost: 90000, desc: "If all 5 skaters are from different franchises, gain +20 Pts.", bonus: 20 },
            { cost: 130000, desc: "If all 5 skaters are from different franchises, gain +35 Pts.", bonus: 35 },
            { cost: 180000, desc: "If all 5 skaters are from different franchises, gain +50 Pts.", bonus: 50 },
            { cost: 250000, desc: "If all 5 skaters are from different franchises, gain +75 Pts.", bonus: 75 },
            { cost: 320000, desc: "If all 5 skaters are from different franchises, gain +110 Pts.", bonus: 110 }
        ]
    },
    {
        id: "gm_lamoriello", name: "Lou Lamoriello", category: "manager",
        levels: [
            { cost: 80000, desc: "Starting a Goalie with <$100k salary pays +$10k per cleared series.", bonus: 10000 },
            { cost: 120000, desc: "Starting a Goalie with <$100k salary pays +$25k per cleared series.", bonus: 25000 },
            { cost: 160000, desc: "Starting a Goalie with <$100k salary pays +$50k per cleared series.", bonus: 50000 },
            { cost: 220000, desc: "Starting a Goalie with <$100k salary pays +$80k per cleared series.", bonus: 80000 },
            { cost: 300000, desc: "Starting a Goalie with <$100k salary pays +$150k per cleared series.", bonus: 150000 }
        ]
    },

    // Coaches (Archetypes)
    {
        id: "coach_offensive", name: "Offensive Coordinator", category: "coach",
        levels: [
            { cost: 110000, desc: "Every Goal (G) is worth 2.5 Pts.", mult: 2.5 },
            { cost: 160000, desc: "Every Goal (G) is worth 3.0 Pts.", mult: 3.0 },
            { cost: 220000, desc: "Every Goal (G) is worth 3.5 Pts.", mult: 3.5 },
            { cost: 300000, desc: "Every Goal (G) is worth 4.2 Pts.", mult: 4.2 },
            { cost: 400000, desc: "Every Goal (G) is worth 5.5 Pts.", mult: 5.5 }
        ]
    },
    {
        id: "coach_playmaker", name: "Playmaking Specialist", category: "coach",
        levels: [
            { cost: 100000, desc: "If A > G, the difference grants +1.0x Pts.", mult: 1.0 },
            { cost: 150000, desc: "If A > G, the difference grants +1.5x Pts.", mult: 1.5 },
            { cost: 200000, desc: "If A > G, the difference grants +2.0x Pts.", mult: 2.0 },
            { cost: 260000, desc: "If A > G, the difference grants +2.6x Pts.", mult: 2.6 },
            { cost: 350000, desc: "If A > G, the difference grants +3.5x Pts.", mult: 3.5 }
        ]
    },
    {
        id: "coach_goalie", name: "Goalie Whisperer", category: "coach",
        levels: [
            { cost: 120000, desc: "If Goalie GAA < 2.50, Skater total +/- reduces target by 1.0x.", mult: 1.0, gaa: 2.50 },
            { cost: 170000, desc: "If Goalie GAA < 2.50, Skater total +/- reduces target by 1.5x.", mult: 1.5, gaa: 2.50 },
            { cost: 250000, desc: "If Goalie GAA < 2.30, Skater total +/- reduces target by 2.0x.", mult: 2.0, gaa: 2.30 },
            { cost: 320000, desc: "If Goalie GAA < 2.30, Skater total +/- reduces target by 2.8x.", mult: 2.8, gaa: 2.30 },
            { cost: 450000, desc: "If Goalie GAA < 2.15, Skater total +/- reduces target by 4.0x.", mult: 4.0, gaa: 2.15 }
        ]
    },

    // Game Plans
    {
        id: "gp_trap", name: "The Trap", category: "game_plan",
        levels: [
            { cost: 90000, desc: "Goalie Target Reduction +3%. Centers generate 10% fewer Pts.", gMult: 0.03, cMult: 0.90 },
            { cost: 130000, desc: "Goalie Target Reduction +5%. Centers generate 15% fewer Pts.", gMult: 0.05, cMult: 0.85 },
            { cost: 180000, desc: "Goalie Target Reduction +8%. Centers generate 20% fewer Pts.", gMult: 0.08, cMult: 0.80 },
            { cost: 240000, desc: "Goalie Target Reduction +12%. Centers generate 25% fewer Pts.", gMult: 0.12, cMult: 0.75 },
            { cost: 320000, desc: "Goalie Target Reduction +18%. Centers generate 30% fewer Pts.", gMult: 0.18, cMult: 0.70 }
        ]
    },
    {
        id: "gp_winglock", name: "Wing Lock", category: "game_plan",
        levels: [
            { cost: 85000, desc: "Active LW and RW gain +10 Pts flat.", bonus: 10 },
            { cost: 125000, desc: "Active LW and RW gain +15 Pts flat.", bonus: 15 },
            { cost: 175000, desc: "Active LW and RW gain +25 Pts flat.", bonus: 25 },
            { cost: 230000, desc: "Active LW and RW gain +38 Pts flat.", bonus: 38 },
            { cost: 300000, desc: "Active LW and RW gain +55 Pts flat.", bonus: 55 }
        ]
    },
    {
        id: "gp_forecheck", name: "Heavy Forecheck", category: "game_plan",
        levels: [
            { cost: 80000, desc: "Skaters with G > A gain +10 Pts flat.", bonus: 10 },
            { cost: 120000, desc: "Skaters with G > A gain +20 Pts flat.", bonus: 20 },
            { cost: 170000, desc: "Skaters with G > A gain +35 Pts flat.", bonus: 35 },
            { cost: 220000, desc: "Skaters with G > A gain +55 Pts flat.", bonus: 55 },
            { cost: 290000, desc: "Skaters with G > A gain +80 Pts flat.", bonus: 80 }
        ]
    }
];

const HISTORICAL_STAGES =
    [
        { name: "October Road Opener", gamesCount: 5, target: 280 },  // Very easy, lets you get to the first store
        { name: "November Home Stand", gamesCount: 5, target: 320 },
        { name: "Western Canada Swing", gamesCount: 6, target: 380 },
        { name: "December Cold Front", gamesCount: 6, target: 450 },  // Mid-game ramp starts
        { name: "Holiday Roster Gauntlet", gamesCount: 6, target: 530 },
        { name: "January Winter Grind", gamesCount: 6, target: 620 },
        { name: "All-Star Break Push", gamesCount: 6, target: 720 },
        { name: "February Stadium Series", gamesCount: 6, target: 800 },
        { name: "Trade Deadline Madness", gamesCount: 6, target: 880 }, // Late-game brutality starts
        { name: "March Playoff Push", gamesCount: 6, target: 950 },
        { name: "Northeastern Rivalries", gamesCount: 6, target: 1020 },
        { name: "California Road Trip", gamesCount: 6, target: 1100 },
        { name: "April Division Deciders", gamesCount: 6, target: 1180 },
        { name: "Season Finale Gridlock", gamesCount: 6, target: 1250 } // Requires massive Tier 3 perk synergy
    ];
