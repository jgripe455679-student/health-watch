# Worker Image Vulnerability Report

## Scan Information

- Scan date: 2026-09-01
- Repository: health-watch
- Image: health-watch-worker:test
- Image digest: sha256:3b6720855527dfee14c197423b48ca8c12a7d06c400e669e0b0b2968e222b3e6
- Git commit: Feat(CI Foundation): fix deprecated CodeQL Action and a typo
- Trivy version: 0.69.3
- Scanner command or workflow run: https://github.com/jgripe455679-student/health-watch/actions/runs/33457324451

## Summary

- Critical findings: 0
- High findings: 28
- Medium findings: 0
- Low findings: 0
- Fixed findings: 12
- Unfixed findings: 13
- Fix deferred findings: 2
- Release decision: Pending review

## Findings

| Package | CVE | Severity | Installed version | Fixed version | Location | Status | Owner | Due date |
|---|---|---|---|---|---|---|---|---|
| gzip | CVE-2026-41992 | HIGH | 1.13-1 | none | Debian 13.6 runtime layer | affected | Unassigned | TBD |
| libacl1 | CVE-2026-54369 | HIGH | 2.3.2-2+b1 | none | Debian 13.6 runtime layer | affected | Unassigned | TBD |
| libncursesw6 | CVE-2025-69720 | HIGH | 6.5+20250216-2 | none | Debian 13.6 runtime layer | affected | Unassigned | TBD |
| libsqlite3-0 | CVE-2026-11822 | HIGH | 3.46.1-7+deb13u1 | none | Debian 13.6 runtime layer | affected | Unassigned | TBD |
| libsqlite3-0 | CVE-2026-11824 | HIGH> | 3.46.1-7+deb13u1 | none> | Debian 13.6 runtime layer | affected | Unassigned | TBD |
| libssl3t64 | CVE-2026-14456 | HIGH | 3.5.6-1~deb13u2 | 3.5.7-1~deb13u2 | Debian 13.6 runtime layer | fixed | Unassigned | TBD |
| libtinfo6 | CVE-2025-69720 | HIGH | 6.5+20250216-2 | none | Debian 13.6 runtime layer | affected | Unassigned | TBD |
| ncurses-base | CVE-2025-69720 | HIGH | 6.5+20250216-2 | none | Debian 13.6 runtime layer | affected | Unassigned | TBD |
| ncurses-bin | CVE-2025-69720 | HIGH | 6.5+20250216-2 | none | Debian 13.6 runtime layer | affected | Unassigned | TBD |
| openssl | CVE-2026-14456 | HIGH | 3.5.6-1~deb13u2 | 3.5.7-1~deb13u2 | Debian 13.6 runtime layer | fixed | Unassigned | TBD |
| openssl-provider-legacy | CVE-2026-14456 | HIGH | 3.5.6-1~deb13u2 | 3.5.7-1~deb13u2 | Debian 13.6 runtime layer | fixed | Unassigned | TBD |
| perl-base | CVE-2026-42497 | HIGH | 5.40.1-6 | none | Debian 13.6 runtime layer | fix_deferred | Unassigned | TBD |
| perl-base | CVE-2026-48962 | HIGH | 5.40.1-6 | none | Debian 13.6 runtime layer | affected | Unassigned | TBD |
| perl-base | CVE-2026-57432 | HIGH | 5.40.1-6 | none | Debian 13.6 runtime layer | affected | Unassigned | TBD |
| perl-base | CVE-2026-57433 | HIGH | 5.40.1-6 | none | Debian 13.6 runtime layer | affected | Unassigned | TBD |
| perl-base | CVE-2026-9538 | HIGH | 5.40.1-6 | none | Debian 13.6 runtime layer | fix_deferred | Unassigned | TBD |
| jaraco.context | CVE-2026-23949 | HIGH | 5.3.0 | 6.1.0 | Python application layer | fixed | Unassigned | TBD |
| nltk | CVE-2025-71408 | HIGH | 3.9.1 | 3.9.3 | Python application layer | fixed | Unassigned | TBD |
| nltk | CVE-2026-0846 | HIGH | 3.9.1 | 3.9.3 | Python application layer | fixed | Unassigned | TBD |
| nltk | CVE-2026-0847 | HIGH | 3.9.1 | none | Python application layer | affected | Unassigned | TBD |
| nltk | CVE-2026-12061 | HIGH | 3.9.1 | 3.10.0 | Python application layer | fixed | Unassigned | TBD |
| nltk | CVE-2026-12072 | HIGH | 3.9.1 | 3.10.0 | Python application layer | fixed | Unassigned | TBD |
| nltk | CVE-2026-12074 | HIGH | 3.9.1 | 3.10.0 | Python application layer | fixed | Unassigned | TBD |
| nltk | CVE-2026-12075 | HIGH> | 3.9.1 | 3.10.0 | Python application layer | fixed | Unassigned | TBD |
| nltk | CVE-2026-33231 | HIGH | 3.9.1 | 3.9.4 | Python application layer | fixed | Unassigned | TBD |
| nltk | CVE-2026-33236 | HIGH | 3.9.1 | none | Python application layer | affected | Unassigned | TBD |
| nltk | CVE-2026-54293 | HIGH | 3.9.1 | 3.10.0 | Python application layer | fixed | Unassigned | TBD |
| wheel | CVE-2026-24049 | HIGH | 0.45.1 | 0.46.2 | Python application layer | fixed | Unassigned | TBD |
| <PkgName> | <VulnerabilityID> | <Severity> | <InstalledVersion> | <FixedVersion or none> | <> | affected | Unassigned | TBD |