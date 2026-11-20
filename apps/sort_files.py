"""
File Sorter
-----------
Save this file in any folder (e.g. your Desktop) and run it.
It sorts the files sitting next to it into category folders
(Images, Documents, Videos, etc.).

- Only files in the same folder as the script are touched (not subfolders).
- Shortcuts (.lnk, .url) and desktop.ini are left alone.
- If a file with the same name already exists in the target folder,
  the moved file is renamed "name (1).ext", "name (2).ext", etc.
  Nothing is ever overwritten.
"""

import shutil
import sys
from pathlib import Path

# ---- Edit these to customise ------------------------------------------------

CATEGORIES = {
    "Images":        [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".svg", ".tiff", ".ico", ".heic", ".raw", ".psd"],
    "Videos":        [".mp4", ".mkv", ".avi", ".mov", ".wmv", ".flv", ".webm", ".m4v", ".mpeg", ".mpg"],
    "Audio":         [".mp3", ".wav", ".flac", ".aac", ".ogg", ".m4a", ".wma"],
    "Documents":     [".pdf", ".doc", ".docx", ".txt", ".rtf", ".odt", ".md", ".epub"],
    "Spreadsheets":  [".xls", ".xlsx", ".csv", ".ods"],
    "Presentations": [".ppt", ".pptx", ".odp", ".key"],
    "Archives":      [".zip", ".rar", ".7z", ".tar", ".gz", ".bz2", ".iso"],
    "Programs":      [".exe", ".msi", ".bat", ".cmd", ".apk"],
    "Code":          [".py", ".js", ".ts", ".html", ".css", ".json", ".xml", ".java", ".c", ".cpp", ".cs", ".php", ".sql", ".sh", ".ps1"],
    "Fonts":         [".ttf", ".otf", ".woff", ".woff2"],
}

OTHER_FOLDER = "Other"                      # for unknown extensions
IGNORED_EXTENSIONS = {".lnk", ".url"}       # never moved
IGNORED_NAMES = {"desktop.ini", "thumbs.db"}
ASK_FOR_CONFIRMATION = True                 # set to False to skip the prompt

# -----------------------------------------------------------------------------


def get_base_folder() -> Path:
    """Folder the script (or compiled .exe) lives in."""
    if getattr(sys, "frozen", False):
        return Path(sys.executable).resolve().parent
    return Path(__file__).resolve().parent


def category_for(ext: str) -> str:
    ext = ext.lower()
    for category, extensions in CATEGORIES.items():
        if ext in extensions:
            return category
    return OTHER_FOLDER


def unique_destination(dest: Path) -> Path:
    """Return a path that doesn't exist yet, adding (1), (2)... if needed."""
    if not dest.exists():
        return dest
    counter = 1
    while True:
        candidate = dest.with_name(f"{dest.stem} ({counter}){dest.suffix}")
        if not candidate.exists():
            return candidate
        counter += 1


def main() -> None:
    base = get_base_folder()
    me = Path(sys.executable if getattr(sys, "frozen", False) else __file__).resolve()

    plan = []
    for item in base.iterdir():
        if not item.is_file() or item.resolve() == me:
            continue
        if item.name.lower() in IGNORED_NAMES or item.suffix.lower() in IGNORED_EXTENSIONS:
            continue
        plan.append((item, category_for(item.suffix)))

    print(f"Folder: {base}\n")

    if not plan:
        print("No files to sort.")
        input("\nPress Enter to close...")
        return

    # Preview
    counts = {}
    for _, cat in plan:
        counts[cat] = counts.get(cat, 0) + 1
    print(f"Found {len(plan)} file(s) to sort:")
    for cat, n in sorted(counts.items()):
        print(f"  {cat:<14} {n}")

    if ASK_FOR_CONFIRMATION:
        answer = input("\nMove these files now? (y/n): ").strip().lower()
        if answer not in ("y", "yes"):
            print("Cancelled. Nothing was moved.")
            input("\nPress Enter to close...")
            return

    moved, failed = 0, 0
    for file, category in plan:
        target_dir = base / category
        try:
            target_dir.mkdir(exist_ok=True)
            dest = unique_destination(target_dir / file.name)
            shutil.move(str(file), str(dest))
            print(f"  {file.name}  ->  {category}/{dest.name}")
            moved += 1
        except Exception as e:  # file in use, permission denied, etc.
            print(f"  FAILED: {file.name} ({e})")
            failed += 1

    print(f"\nDone. Moved {moved} file(s)" + (f", {failed} failed." if failed else "."))
    input("\nPress Enter to close...")


if __name__ == "__main__":
    main()
