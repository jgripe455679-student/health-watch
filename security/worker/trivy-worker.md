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
- High findings: 2
- Medium findings: 0
- Low findings: 0
- Fixed findings: 0
- Unfixed findings: 0
- Release decision: Pending review

## Findings

| Package | CVE | Severity | Installed version | Fixed version | Location | Status | Owner | Due date |
|---|---|---|---|---|---|---|---|---|
| gzip | CVE-2026-41992 | HIGH | 1.13-1 | none | Debian 13.6 runtime layer | affected | Unassigned | TBD |
| libacl1 | CVE-2026-54369 | HIGH | 2.3.2-2+b1 | none | Debian 13.6 runtime layer | affected | Unassigned | TBD |
| <PkgName> | <VulnerabilityID> | <Severity> | <InstalledVersion> | <FixedVersion or none> | <> | affected | Unassigned | TBD |