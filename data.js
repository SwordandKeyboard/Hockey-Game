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
    // GMs
    { id: "dynasty_1", name: "Dynasty Core I", category: "manager", desc: "If 3+ skaters share a franchise, Target reduces by 5%.", cost: 100000 },
{ id: "dynasty_2", name: "Dynasty Core II", category: "manager", desc: "If 3+ skaters share a franchise, Target reduces by 10%.", cost: 150000 },
{ id: "dynasty_3", name: "Dynasty Core III", category: "manager", desc: "If 3+ skaters share a franchise, Target reduces by 15%.", cost: 200000 },
{ id: "hired_guns_1", name: "Hired Guns I", category: "manager", desc: "If all 5 skaters are from different franchises, gain +20 Pts.", cost: 90000 },
{ id: "hired_guns_2", name: "Hired Guns II", category: "manager", desc: "If all 5 skaters are from different franchises, gain +35 Pts.", cost: 130000 },
{ id: "hired_guns_3", name: "Hired Guns III", category: "manager", desc: "If all 5 skaters are from different franchises, gain +50 Pts.", cost: 180000 },
{ id: "cap_crunch_1", name: "Cap Crunch I", category: "manager", desc: "Starting a Goalie with <$100k salary pays +$10k per cleared series.", cost: 80000 },
{ id: "cap_crunch_2", name: "Cap Crunch II", category: "manager", desc: "Starting a Goalie with <$100k salary pays +$25k per cleared series.", cost: 120000 },
{ id: "cap_crunch_3", name: "Cap Crunch III", category: "manager", desc: "Starting a Goalie with <$100k salary pays +$50k per cleared series.", cost: 160000 },

// Coaches
{ id: "sniper_1", name: "Sniper Focus I", category: "coach", desc: "Every Goal (G) is worth 2.5 Pts.", cost: 110000 },
{ id: "sniper_2", name: "Sniper Focus II", category: "coach", desc: "Every Goal (G) is worth 3.0 Pts.", cost: 160000 },
{ id: "sniper_3", name: "Sniper Focus III", category: "coach", desc: "Every Goal (G) is worth 4.0 Pts.", cost: 220000 },
{ id: "playmaker_1", name: "Playmaker Vision I", category: "coach", desc: "If A > G, the difference grants +1.0x Pts.", cost: 100000 },
{ id: "playmaker_2", name: "Playmaker Vision II", category: "coach", desc: "If A > G, the difference grants +1.5x Pts.", cost: 150000 },
{ id: "playmaker_3", name: "Playmaker Vision III", category: "coach", desc: "If A > G, the difference grants +2.0x Pts.", cost: 200000 },
{ id: "shutout_1", name: "Shutout System I", category: "coach", desc: "If Goalie GAA < 2.50, Skater total +/- reduces target by 1.0x.", cost: 120000 },
{ id: "shutout_2", name: "Shutout System II", category: "coach", desc: "If Goalie GAA < 2.50, Skater total +/- reduces target by 1.5x.", cost: 170000 },
{ id: "shutout_3", name: "Shutout System III", category: "coach", desc: "If Goalie GAA < 2.30, Skater total +/- reduces target by 2.0x.", cost: 250000 },

// Game Plans
{ id: "trap_1", name: "The Trap I", category: "game_plan", desc: "Goalie Target Reduction +3%. Centers generate 10% fewer Pts.", cost: 90000 },
{ id: "trap_2", name: "The Trap II", category: "game_plan", desc: "Goalie Target Reduction +5%. Centers generate 15% fewer Pts.", cost: 130000 },
{ id: "trap_3", name: "The Trap III", category: "game_plan", desc: "Goalie Target Reduction +8%. Centers generate 20% fewer Pts.", cost: 180000 },
{ id: "wing_lock_1", name: "Wing Lock I", category: "game_plan", desc: "Active LW and RW gain +10 Pts flat.", cost: 85000 },
{ id: "wing_lock_2", name: "Wing Lock II", category: "game_plan", desc: "Active LW and RW gain +15 Pts flat.", cost: 125000 },
{ id: "wing_lock_3", name: "Wing Lock III", category: "game_plan", desc: "Active LW and RW gain +25 Pts flat.", cost: 175000 },
{ id: "forecheck_1", name: "Heavy Forecheck I", category: "game_plan", desc: "Skaters with G > A gain +10 Pts flat.", cost: 80000 },
{ id: "forecheck_2", name: "Heavy Forecheck II", category: "game_plan", desc: "Skaters with G > A gain +20 Pts flat.", cost: 120000 },
{ id: "forecheck_3", name: "Heavy Forecheck III", category: "game_plan", desc: "Skaters with G > A gain +35 Pts flat.", cost: 170000 }
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
