#!/bin/sh
set -eu
cd "$(dirname "$0")/../.."
exec python3 .agents/skills/design-iteration-archive/scripts/archive.py serve --run shin-wellness-studio-redesign --open
