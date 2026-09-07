from __future__ import annotations

import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest


HERE = Path(__file__).resolve().parent
SKILL = HERE.parent


class ArchiveCliTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        subprocess.run(["git", "init", "-q"], cwd=self.root, check=True)
        subprocess.run(["git", "config", "user.name", "Archive Test"], cwd=self.root, check=True)
        subprocess.run(["git", "config", "user.email", "archive@example.test"], cwd=self.root, check=True)
        subprocess.run(["git", "lfs", "install", "--local"], cwd=self.root, check=True, stdout=subprocess.DEVNULL)
        target = self.root / ".agents/skills/design-iteration-archive"
        shutil.copytree(SKILL, target)
        (self.root / ".agents/skills/design-critic-loop/references").mkdir(parents=True)
        (self.root / ".agents/skills/design-critic-loop/references/critic-prompt.md").write_text("Fixed prompt\n")
        (self.root / ".gitattributes").write_text("design-reviews/**/screenshots/*.png filter=lfs diff=lfs merge=lfs -text\n")
        (self.root / "design.txt").write_text("baseline\n")
        subprocess.run(["git", "add", "."], cwd=self.root, check=True)
        subprocess.run(["git", "commit", "-qm", "baseline"], cwd=self.root, check=True)
        self.cli = self.root / ".agents/skills/design-iteration-archive/scripts/archive.py"

    def tearDown(self):
        self.temp.cleanup()

    def call(self, *args, input_text=None, ok=True):
        result = subprocess.run(["python3", str(self.cli), *args], cwd=self.root, text=True,
                                input=input_text, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if ok and result.returncode:
            self.fail(result.stderr)
        return result

    def test_capture_review_winner_restore_and_dirty_guard(self):
        self.call("init", "--run", "test-run", "--title", "Test Run")
        screenshot = self.root / "shot.png"; screenshot.write_bytes(b"not-a-real-png")
        (self.root / "design.txt").write_text("iteration one\n")
        (self.root / "new.txt").write_text("new\n")
        self.call("capture", "--run", "test-run", "--screenshot", str(screenshot))
        self.call("review", "--run", "test-run", "--iteration", "1", "--stdin",
                  input_text="Aesthetic read\n\nScore: 8.1/10\n")
        (self.root / "design.txt").write_text("iteration two\n")
        (self.root / "new.txt").unlink()
        self.call("capture", "--run", "test-run", "--screenshot", str(screenshot))
        self.call("review", "--run", "test-run", "--iteration", "2", "--stdin",
                  input_text="Aesthetic read\n\nScore: 8.1/10\n")
        manifest = json.loads((self.root / "design-reviews/test-run/manifest.json").read_text())
        self.assertEqual(manifest["winner"]["iteration"], 2)
        self.assertIn("new.txt", manifest["managedPaths"])
        self.call("restore", "1", "--run", "test-run")
        self.assertEqual((self.root / "design.txt").read_text(), "iteration one\n")
        self.assertTrue((self.root / "new.txt").exists())
        (self.root / "design.txt").write_text("unarchived\n")
        refused = self.call("restore", "winner", "--run", "test-run", ok=False)
        self.assertEqual(refused.returncode, 2)
        self.assertIn("unarchived edits", refused.stderr)
        (self.root / "design.txt").write_text("iteration one\n")
        self.call("finalize", "--run", "test-run")
        self.assertEqual((self.root / "design.txt").read_text(), "iteration two\n")
        self.assertFalse((self.root / "new.txt").exists())

    def test_import_marks_missing_source_incomplete(self):
        self.call("init", "--run", "import-run")
        fixture = self.root / "rollout.jsonl"
        shutil.copyfile(HERE / "fixtures/codex-rollout.jsonl", fixture)
        self.call("import-codex", "--run", "import-run", "--session", str(fixture))
        manifest = json.loads((self.root / "design-reviews/import-run/manifest.json").read_text())
        self.assertEqual(len(manifest["iterations"]), 1)
        self.assertEqual(manifest["iterations"][0]["score"], 7.4)
        self.assertFalse(manifest["iterations"][0]["complete"])
        self.assertIsNone(manifest["winner"])


if __name__ == "__main__":
    unittest.main()
