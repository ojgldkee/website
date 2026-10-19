# Free Claude Code on iPhone — Codespaces setup

This is an **isolated setup branch**. Your main website branch is unchanged.

1. On iPhone Safari open https://github.com/codespaces/new?repo=1406818918&ref=setup%2Ffree-claude-code-iphone
2. Select the `setup/free-claude-code-iphone` branch if needed and create the Codespace. Codespaces may incur charges after free allowance.
3. Open Terminal → New Terminal.
4. Inspect the installer before executing it:

```bash
curl -fsSLo /tmp/fcc-install.sh https://raw.githubusercontent.com/Alishahryar1/free-claude-code/main/scripts/install.sh
less /tmp/fcc-install.sh
```

5. If you trust the installer, run:

```bash
sh /tmp/fcc-install.sh
```

6. Select a coding agent when prompted. Start the service:

```bash
fcc-server
```

7. In Codespaces **Ports**, locate the **actual port** printed by `fcc-server`. Keep visibility **Private** and open the forwarded URL.
8. In the FCC Admin UI, configure your provider's API key **privately**. Never commit keys to this repository. Follow the provider/model setup shown in the project's README.
9. Use FCC's browser coding sessions or start `fcc-codex` in a second terminal, if installed.

**Security:** FCC is third-party code and can execute commands on your Codespace. Inspect scripts and review permission prompts. Never make an authenticated admin port public.

**Important:** Creating this branch does not create a Codespace, run the installer, or configure API keys. Those require actions in your GitHub Codespaces account.
