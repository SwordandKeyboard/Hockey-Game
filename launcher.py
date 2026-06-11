import tkinter as tk
from tkinter import messagebox
import requests
import json
import os
import webbrowser
import time

def build_database():
    try:
        start_year = int(start_entry.get())
        end_year = int(end_entry.get())
    except ValueError:
        messagebox.showerror("Error", "Please enter valid numbers for the years.")
        return

    if start_year > end_year:
        messagebox.showerror("Error", "Start year must be before or equal to End year.")
        return

    dl_btn.config(text="Downloading... Please wait", state="disabled")
    root.update()

    master_pool = []

    for year in range(start_year, end_year + 1):
        season_id = f"{year-1}{year}"
        ui_tag = f"{year-1}-{str(year)[2:]}"
        status_label.config(text=f"Fetching {ui_tag} season...")
        root.update()

        try:
            # Skaters
            skater_url = f"https://api.nhle.com/stats/rest/en/skater/summary?limit=-1&cayenneExp=seasonId={season_id}%20and%20gameTypeId=2"
            skater_res = requests.get(skater_url).json()

            for p in skater_res.get("data", []):
                if p.get("gamesPlayed", 0) < 40 or p.get("points", 0) < 10:
                    continue

                raw_pos = p.get("positionCode")
                if raw_pos not in ["C", "L", "R", "D"]: continue
                if raw_pos == "L": raw_pos = "LW"
                if raw_pos == "R": raw_pos = "RW"

                master_pool.append({
                    "name": p.get("skaterFullName", "Unknown"),
                    "pos": raw_pos,
                    "season": ui_tag,
                    "team": p.get("teamAbbrevs", "").split(",")[0].strip(),
                    "stats": {"G": p.get("goals", 0), "A": p.get("assists", 0), "Pts": p.get("points", 0), "plusMinus": p.get("plusMinus", 0)}
                })

            # Goalies
            goalie_url = f"https://api.nhle.com/stats/rest/en/goalie/summary?limit=-1&cayenneExp=seasonId={season_id}%20and%20gameTypeId=2"
            goalie_res = requests.get(goalie_url).json()

            for g in goalie_res.get("data", []):
                if g.get("gamesPlayed", 0) < 40:
                    continue

                master_pool.append({
                    "name": g.get("goalieFullName", "Unknown"),
                    "pos": "G",
                    "season": ui_tag,
                    "team": g.get("teamAbbrevs", "").split(",")[0].strip(),
                    "stats": {"GAA": round(g.get("goalsAgainstAverage", 3.0), 2), "SV": round(g.get("savePct", 0.900), 3), "Pts": 85}
                })

            time.sleep(0.25) # Polite delay
        except Exception as e:
            print(f"Failed to fetch {year}: {e}")

    # Write the data to a JS file the HTML can read
    with open("roster_data.js", "w") as f:
        f.write("let MASTER_REGULAR_POOL = " + json.dumps(master_pool) + ";")

    status_label.config(text="Download Complete! Launching game...")
    root.update()
    time.sleep(1)

    # Launch the game and close the downloader
    html_file_path = os.path.abspath("Godrun.html")
    webbrowser.open(f"file://{html_file_path}")
    root.destroy()

# --- UI SETUP ---
root = tk.Tk()
root.title("Godrun Database Setup")
root.geometry("350x250")
root.configure(padx=20, pady=20)

tk.Label(root, text="NHL Data Downloader", font=("Arial", 14, "bold")).pack(pady=(0, 10))
tk.Label(root, text="Start Year (e.g. 1990):").pack()
start_entry = tk.Entry(root, justify="center")
start_entry.pack(pady=5)

tk.Label(root, text="End Year (e.g. 1999):").pack()
end_entry = tk.Entry(root, justify="center")
end_entry.pack(pady=5)

dl_btn = tk.Button(root, text="Download & Play", command=build_database, bg="#2563eb", fg="white", font=("Arial", 10, "bold"))
dl_btn.pack(pady=15, fill="x")

status_label = tk.Label(root, text="", fg="#475569")
status_label.pack()

root.mainloop()
