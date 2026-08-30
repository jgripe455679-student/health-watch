# Backend Image Vulnerability Report

## Scan Information

- Scan date: 2026-08-27
- Repository: health-watch
- Image: health-watch-api:test
- Image digest: sha256:3270d0e1c74f11c49204ce19fd22c251b01a99629bbfb7b9038ae8ead6fb5d25
- Git commit: Feat(CI Foundation): update trivy action fixed version
- Trivy version: 0.69.3
- Scanner command or workflow run: https://github.com/jgripe455679-student/health-watch/actions/runs/33035373147

## Summary

- Critical findings: 3
- High findings: 25
- Medium findings: 45 | 47
- Low findings: 20 | 29
- Fixed findings: 71
- Unfixed findings: 22 | 33
- Release decision: Pending review

## Findings

| Package | CVE | Severity | Installed version | Fixed version | Location | Status | Owner | Due date |
|---|---|---|---|---|---|---|---|---|
| bsdutils | CVE-2026-27456 | MEDIUM | 1:2.37.2-4ubuntu3.5 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| gcc-12-base | CVE-2022-27943 | LOW | 12.3.0-1ubuntu1~22.04.3 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| libattr1 | CVE-2026-54371 | MEDIUM | 1:2.5.1-1build1 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| libblkid1 | CVE-2026-27456 | MEDIUM | 2.37.2-4ubuntu3.5 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| libexpat1 | CVE-2025-66382 | MEDIUM | 2.4.7-1ubuntu0.7 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| libgcc-s1 | CVE-2022-27943 | LOW | 12.3.0-1ubuntu1~22.04.3 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| libgcrypt20 | CVE-2024-2236 | LOW | 1.9.4-3ubuntu3.2 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| libmount1 | CVE-2026-27456 | MEDIUM | 2.37.2-4ubuntu3.5 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| libncurses6 | CVE-2023-50495 | LOW | 6.3-2ubuntu0.2 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| libncursesw6 | CVE-2023-50495 | LOW | 6.3-2ubuntu0.2 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| libp11-kit0 | CVE-2026-13757 | MEDIUM | 0.24.0-6build1 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| libpcre2-8-0 | CVE-2022-41409 | LOW | 10.39-3ubuntu0.1 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| libsmartcols1 | CVE-2026-27456 | MEDIUM | 2.37.2-4ubuntu3.5 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| libssl3 | CVE-2026-63072 | MEDIUM | 3.0.2-0ubuntu1.26 | 3.0.2-0ubuntu1.29 | Ubuntu 22.04 runtime layer | fixed | Unassigned | TBD |
| libssl3 | CVE-2026-63076 | MEDIUM | 3.0.2-0ubuntu1.26 | 3.0.2-0ubuntu1.29 | Ubuntu 22.04 runtime layer | fixed | Unassigned | TBD |
| libssl3 | CVE-2026-54874 | LOW | 3.0.2-0ubuntu1.26 | 3.0.2-0ubuntu1.29 | Ubuntu 22.04 runtime layer | fixed | Unassigned | TBD |
| libssl3 | CVE-2026-63074 | LOW | 3.0.2-0ubuntu1.26 | 3.0.2-0ubuntu1.29 | Ubuntu 22.04 runtime layer | fixed | Unassigned | TBD |
| libssl3 | CVE-2026-75803 | LOW | 3.0.2-0ubuntu1.26 | 3.0.2-0ubuntu1.29 | Ubuntu 22.04 runtime layer | fixed | Unassigned | TBD |
| libstdc++6 | CVE-2022-27943 | LOW | 12.3.0-1ubuntu1~22.04.3 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| libsystemd0 | CVE-2026-40228 | LOW | 249.11-0ubuntu3.22 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| libtinfo6 | CVE-2023-50495 | LOW | 6.3-2ubuntu0.2 | None | Ubuntu 22.04 runtime layer | affected  | Unassigned | TBD |
| libudev1 | CVE-2026-40228 | LOW | 249.11-0ubuntu3.22 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| libuuid1 | CVE-2026-27456 | MEDIUM | 2.37.2-4ubuntu3.5 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| libzstd1 | CVE-2022-4899 | LOW | 1.4.8+dfsg-3build1 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| login | CVE-2023-29383 | LOW | 1:4.8.1-2ubuntu2.2 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| login | CVE-2024-56433 | LOW | 1:4.8.1-2ubuntu2.2 | None | Ubuntu 22.04 runtime layer |  affected | Unassigned | TBD |
| mount | CVE-2026-27456 | MEDIUM | 2.37.2-4ubuntu3.5 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| ncurses-base | CVE-2023-50495 | LOW | 6.3-2ubuntu0.2 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| ncurses-bin | CVE-2023-50495 | LOW | 6.3-2ubuntu0.2 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| openssl | CVE-2026-63072 | MEDIUM | 3.0.2-0ubuntu1.26 | 3.0.2-0ubuntu1.29 | Ubuntu 22.04 runtime layer | fixed | Unassigned | TBD |
| openssl | CVE-2026-63076 | MEDIUM | 3.0.2-0ubuntu1.26 | 3.0.2-0ubuntu1.29 | Ubuntu 22.04 runtime layer | fixed | Unassigned | TBD |
| openssl | CVE-2026-54874 | LOW | 3.0.2-0ubuntu1.26 | 3.0.2-0ubuntu1.29 | Ubuntu 22.04 runtime layer | fixed | Unassigned | TBD |
| openssl | CVE-2026-63074 | LOW | 3.0.2-0ubuntu1.26 | 3.0.2-0ubuntu1.29 | Ubuntu 22.04 runtime layer | fixed | Unassigned | TBD |
| openssl | CVE-2026-75803 | LOW | 3.0.2-0ubuntu1.26 | 3.0.2-0ubuntu1.29 | Ubuntu 22.04 runtime layer | fixed | Unassigned | TBD |
| p11-kit | CVE-2026-13757 | MEDIUM | 0.24.0-6build1 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| p11-kit-modules | CVE-2026-13757 | MEDIUM | 0.24.0-6build1 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| passwd | CVE-2023-29383 | LOW | 1:4.8.1-2ubuntu2.2 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| passwd | CVE-2024-56433 | LOW | 1:4.8.1-2ubuntu2.2 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| perl-base | CVE-2026-12087 | MEDIUM | 5.34.0-3ubuntu1.7 | 5.34.0-3ubuntu1.8 | Ubuntu 22.04 runtime layer | fixed | Unassigned | TBD |
| perl-base | CVE-2026-13221 | MEDIUM | 5.34.0-3ubuntu1.7 | 5.34.0-3ubuntu1.8 | Ubuntu 22.04 runtime layer | fixed | Unassigned | TBD |
| perl-base | CVE-2026-57432 | MEDIUM | 5.34.0-3ubuntu1.7 | 5.34.0-3ubuntu1.8 | Ubuntu 22.04 runtime layer | fixed | Unassigned | TBD |
| perl-base | CVE-2026-57433 | MEDIUM | 5.34.0-3ubuntu1.7 | 5.34.0-3ubuntu1.8 | Ubuntu 22.04 runtime layer | fixed | Unassigned | TBD |
| tar | CVE-2026-18477 | MEDIUM | 1.34+dfsg-1ubuntu0.1.22.04.6 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |

| tar | CVE-2026-18508 | MEDIUM | 1.34+dfsg-1ubuntu0.1.22.04.6 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| util-linux | CVE-2026-27456 | MEDIUM | 2.37.2-4ubuntu3.5 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| wget | CVE-2021-31879 | MEDIUM | 1.21.2-2ubuntu1.5 | None | Ubuntu 22.04 runtime layer | affected | Unassigned | TBD |
| ch.qos.logback:logback-core | CVE-2026-10532 | LOW | 1.5.32 | 1.5.34 | Java application layer | fixed | Unassigned | TBD |
| ch.qos.logback:logback-core | CVE-2026-9828 | LOW | 1.5.32 | 1.5.33 | Java application layer | fixed | Unassigned | TBD |
| com.fasterxml.jackson.core:jackson-core | GHSA-r7wm-3cxj-wff9 | HIGH | 2.21.2 | 2.18.8, 2.21.4 | Java application layer | fixed | Unassigned | TBD |
| com.fasterxml.jackson.core:jackson-databind | CVE-2026-54512 | HIGH | 2.15.2 | 2.18.8, 3.1.4, 2.21.4 | Java application layer | fixed | Unassigned | TBD |
| com.fasterxml.jackson.core:jackson-databind | CVE-2026-54513 | HIGH | 2.15.2 | 2.18.8, 2.21.4, 3.1.4 | Java application layer | fixed | Unassigned | TBD |
| com.fasterxml.jackson.core:jackson-databind | CVE-2026-54514 | MEDIUM | 2.15.2 | 2.18.8, 2.21.4, 3.1.4 | Java application layer | fixed | Unassigned | TBD |
| com.fasterxml.jackson.core:jackson-databind | CVE-2026-54515 | MEDIUM | 2.15.2 | 3.1.4, 2.18.9, 2.21.5, 2.22.1 | Java application layer | fixed | Unassigned | TBD |
| com.fasterxml.jackson.core:jackson-databind | CVE-2026-59888 | MEDIUM | 2.15.2 | 2.18.8, 2.21.4 | Java application layer | fixed  | Unassigned | TBD |
| com.google.protobuf:protobuf-java | CVE-2021-22569 | HIGH | 3.11.4 | 3.16.1, 3.18.2, 3.19.2 | Java application layer | fixed | Unassigned | TBD |
| com.google.protobuf:protobuf-java | CVE-2022-3509 | HIGH | 3.11.4 | 3.16.3, 3.19.6, 3.20.3, 3.21.7 | Java application layer | fixed | Unassigned | TBD |
| com.google.protobuf:protobuf-java | CVE-2022-3510 | HIGH | 3.11.4 | 3.16.3, 3.19.6, 3.20.3, 3.21.7 | Java application layer | fixed | Unassigned | TBD |
| com.google.protobuf:protobuf-java | CVE-2024-7254 | HIGH | 3.11.4 | 3.25.5, 4.27.5, 4.28.2 | Java application layer | fixed | Unassigned | TBD |
| com.google.protobuf:protobuf-java | CVE-2022-3171 | MEDIUM | 3.11.4 | 3.21.7, 3.20.3, 3.19.6, 3.16.3 | Java application layer | fixed | Unassigned | TBD |
| com.rabbitmq:amqp-client | CVE-2026-63337 | HIGH | 5.25.0 | 5.33.0 | Java application layer | fixed | Unassigned | TBD |
| com.rabbitmq:amqp-client | CVE-2026-69219 | HIGH | 5.25.0 | 5.33.1 | Java application layer | fixed | Unassigned | TBD |
| com.rabbitmq:amqp-client | CVE-2026-69220 | HIGH | 5.25.0 | 5.33.1 | Java application layer | fixed | Unassigned | TBD |
| com.rabbitmq:amqp-client | CVE-2026-63335 | MEDIUM | 5.25.0 | 5.31.0 | Java application layer | fixed | Unassigned | TBD |
| com.rabbitmq:amqp-client | CVE-2026-63336 | MEDIUM | 5.25.0 | 5.33.0 | Java application layer | fixed | Unassgined | TBD |
| com.rabbitmq:amqp-client | CVE-2026-61634 | LOW | 5.25.0 | 5.33.0 | Java application layer | fixed | Unassigned | TBD |
| io.micrometer:micrometer-core | CVE-2026-40983 | HIGH | 1.15.11 | 1.16.6, 1.15.12 | Java application layer | fixed | Unassigned | TBD |
| io.micrometer:micrometer-core | CVE-2026-40984 | HIGH | 1.15.11 | 1.16.6, 1.15.12 | Java application layer | fixed | Unassigned | TBD |
| io.netty:netty-codec | CVE-2026-42583 | HIGH | 4.1.132.Final | 4.1.133.Final | Java application layer | fixed | Unassigned | TBD |
| io.netty:netty-codec | CVE-2026-59901 | HIGH | 4.1.132.Final | 4.1.136.Final | Java application layer | fixed | Unassigned | TBD |
| io.netty:netty-handler | CVE-2026-44249 | HIGH | 4.1.132.Final | 4.2.15.Final, 4.1.135.Final | Java application layer | fixed | Unassigned | TBD |
| io.netty:netty-handler | CVE-2026-45416 | HIGH | 4.1.132.Final | 4.2.15.Final, 4.1.135.Final | Java application layer | fixed | Unassigned | TBD |
| io.netty:netty-handler | CVE-2026-50010 | HIGH | 4.1.132.Final | 4.2.15.Final, 4.1.135.Final | Java application layer | fixed | Unassigned | TBD |
| mysql:mysql-connector-java | CVE-2023-22102 | HIGH | 8.0.28 | None | Java application layer | affected | Unassigned | TBD | 
| org.apache.commons:commons-lang3 | CVE-2025-48924 | MEDIUM | 3.17.0 | 3.18.0 | Java application layer | fixed | Unassigned | TBD |
| org.apache.logging.log4j:log4j-api | CVE-2026-49844 | MEDIUM | 2.24.3 | 2.25.5, 2.26.1 | Java application layer | fixed | Unassigned | TBD |
| org.apache.tomcat.embed:tomcat-embed-core | CVE-2026-41293 | CRITICAL | 10.1.54 | 9.0.118, 10.1.55, 11.0.22 | Java application layer | fixed | Unassigned | TBD |
| org.apache.tomcat.embed:tomcat-embed-core | CVE-2026-43512 | CRITICAL | 10.1.54 | 9.0.118, 10.1.55, 11.0.22 | Java application layer | fixed | Unassigned | TBD |
| org.apache.tomcat.embed:tomcat-embed-core | CVE-2026-43515 | CRITICAL | 10.1.54 | 9.0.118, 10.1.55, 11.0.22 | Java application layer | fixed | Unassigned | TBD |
| org.apache.tomcat.embed:tomcat-embed-core | CVE-2026-41284 | HIGH | 10.1.54 | 9.0.118, 10.1.55, 11.0.22 | Java application layer | fixed | Unassigned | TBD |
| org.apache.tomcat.embed:tomcat-embed-core | CVE-2026-42498 | HIGH | 10.1.54 | 9.0.118, 10.1.55, 11.0.22 | Java application layer | fixed | Unassigned | TBD |
| org.apache.tomcat.embed:tomcat-embed-core | CVE-2026-43513 | HIGH | 10.1.54 | 9.0.118, 10.1.55, 11.0.22 | Java application layer | fixed | Unassigned | TBD |
| org.apache.tomcat.embed:tomcat-embed-core | CVE-2026-43514 | LOW | 10.1.54 | 9.0.118, 10.1.55, 11.0.22 | Java application layer | fixed | Unassigned | TBD |
| org.springframework.amqp:spring-amqp | CVE-2026-41701 | MEDIUM | 3.2.10 | 4.0.4, 3.2.11 | Java application layer | fixed | Unassigned | TBD |
| org.springframework.amqp:spring-amqp | CVE-2026-41714 | MEDIUM | 3.2.10 | 4.0.4, 3.2.11 | Java application layer | fixed | Unassigned | TBD |
| org.springframework.boot:spring-boot-autoconfigure | CVE-2026-41001 | MEDIUM | 3.5.14 | 4.0.7, 3.5.15 | Java application layer | fixed | Unassigned | TBD |
| org.springframework.data:spring-data-commons | CVE-2026-41695 | HIGH | 3.5.11 | 4.0.6, 3.5.12 | Java application layer | fixed | Unassigned | TBD |
| org.springframework.data:spring-data-commons | CVE-2026-41716 | HIGH | 3.5.11 | 4.0.6, 3.5.12 | Java application layer | fixed | Unassigned | TBD |
| org.springframework.data:spring-data-commons | CVE-2026-41711 | MEDIUM | 3.5.11 | 4.0.6, 3.5.12 | Java application layer | fixed | Unassigned | TBD |
| org.springframework.data:spring-data-commons | CVE-2026-41721 | MEDIUM | 3.5.11 | 4.0.6, 3.5.12 | Java application layer | fixed | Unassigned | TBD |
| org.springframework.data:spring-data-keyvalue | CVE-2026-41719 | MEDIUM | 3.5.11 | 4.0.6, 3.5.12 | Java application layer | fixed | Unassigned | TBD |
| org.springframework.retry:spring-retry | CVE-2026-41710 | MEDIUM | 2.0.12 | 2.0.13 | Java application layer | fixed | Unassigned | TBD |
| org.springframework.security:spring-security-web | CVE-2026-41706 | MEDIUM | 6.5.10 | 7.0.6, 6.5.11 | Java application layer | fixed | Unassigned | TBD |
| org.springframework.security:spring-security-web | CVE-2026-47838 | MEDIUM | 6.5.10 | 6.5.11 | Java application layer | fixed | Unassigned | TBD |
| org.springframework:spring-core | CVE-2026-41848 | LOW | 6.2.18 | 7.0.8, 6.2.19 | Java application layer | fixed | Unassigned | TBD |
| org.springframework:spring-expression | CVE-2026-41850 | HIGH | 6.2.18 | 7.0.8, 6.2.19 | Java application layer | fixed | Unassigned | TBD |
| org.springframework:spring-expression | CVE-2026-41851 | MEDIUM | 6.2.18 | 7.0.8, 6.2.19 | Java application layer | fixed | Unassigned | TBD |
| org.springframework:spring-expression | CVE-2026-41852 | LOW | 6.2.18 | 7.0.8, 6.2.19 | Java application layer | fixed | Unassigned | TBD |
| org.springframework:spring-web | CVE-2026-41854 | MEDIUM | 6.2.18 | 7.0.8, 6.2.19 | Java application layer | fixed | Unassigned | TBD |
| org.springframework:spring-webmvc | CVE-2026-41842 | HIGH | 6.2.18 | 7.0.8, 6.2.19 | Java application layer | fixed | Unassigned | TBD |
| org.springframework:spring-webmvc | CVE-2026-41845 | HIGH | 6.2.18 | 7.0.8, 6.2.19 | Java application layer | fixed | Unassigned | TBD |
| org.springframework:spring-webmvc | CVE-2026-41841 | MEDIUM | 6.2.18 | 7.0.8, 6.2.19 | Java application layer | fixed | Unassigned | TBD |
| org.springframework:spring-webmvc | CVE-2026-41843 | MEDIUM | 6.2.18 | 7.0.8, 6.2.19 | Java application layer | fixed | Unassigned | TBD |
| org.springframework:spring-webmvc | CVE-2026-41844 | MEDIUM | 6.2.18 | 7.0.8, 6.2.19 | Java application layer | fixed | Unassigned | TBD |
| org.springframework:spring-webmvc | CVE-2026-41846 | MEDIUM | 6.2.18 | 7.0.8, 6.2.19 | Java application layer | fixed | Unassigned | TBD |
| org.springframework:spring-webmvc | CVE-2026-41853 | MEDIUM | 6.2.18 | 7.0.8, 6.2.19 | Java application layer | fixed | Unassigned | TBD |


## Finding Details

### CVE-2026-27456: A TOCTOU race condition vulnerability exists in the SUID binary /usr/bin/mount from util-linux prior to version 2.41.4. When setting up loop devices, the binary validates a file path using user privileges but later opens it as root without ensuring the path has not changed. A local, unprivileged attacker with write access to an /etc/fstab user,loop target directory can exploit this by replacing the source file with a symlink. This allows them to mount and gain unauthorized read access to root-protected files, disk volumes, and block devices. The issue is resolved in version 2.41.4.

- Package: bsdutils, libblkid1, libmount1, libsmartcols1, libuuid1, mount
- Severity: MEDIUM
- Installed version: 1:2.37.2-4ubuntu3.5, 2.37.2-4ubuntu3.5
- Fixed version: none, 2.41.4?
- Location: Ubuntu 22.04 runtime
- Exploitability: known
- Reachable at runtime: yes
- Trivy status: affected
- Security Disposition: open
- Remediation: upgrade, rebuild base image, and investigate
- Tracking issues: 
- Exception expiry: 
- Notes: 

### CVE-2022-27943: libiberty/rust-demangle.c in GNU GCC 11.2 allows stack consumption in demangle_const, as demonstrated by nm-new.

- Package: gcc-12-base, libgcc-s1, libstdc++6
- Severity: LOW
- Installed version: 12.3.0-1ubuntu1~22.04.3
- Fixed version: none
- Location: Ubuntu 22.04 runtime
- Exploitability: not currently exploitable
- Reachable at runtime: unknown
- Trivy status: LOW
- Security disposition: open
- Remediation: upgrade, rebuild base image, and investigate
- Tracking issue: 
- Exception expiry: 
- Notes: 

### CVE-2026-54371: A symlink traversal vulnerability exists in the getfattr and setfattr utilities within attr prior to version 2.6.0. Local attackers who control a pathname component can replace it with a symbolic link during directory hierarchy traversal. This redirects getfattr and setfattr operations to arbitrary files, leading to local privilege escalation when a privileged process executes these utilities over the manipulated path.

- Package: libattr1
- Severity: MEDIUM
- Installed version: 1:2.5.1-1build1
- Fixed version: none
- Location: Ubuntu 22.04 runtime
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: affected
- Security Disposition: open
- Remediation: upgrade, rebuild base image, and investigate
- Tracking issue: 
- Exception expiry: 
- Notes: 

### <CVE-2025-66382>: <In libexpat through 2.7.3, a crafted file with an approximate size of 2 MiB can lead to dozens of seconds of processing time.>

- Package: libexpat1
- Severity: MEDIUM
- Installed version: 2.4.7-1ubuntu0.7
- Fixed version: none
- Location: Ubuntu 22.04 runtime
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: affected
- Security Disposition: open
- Remediation: upgrade, rebuild base image, and investigate
- Tracking issue: 
- Exception expiry: 
- Notes: 

### CVE-2024-2236: A timing-based side-channel flaw was found in libgcrypt's RSA implementation. This issue may allow a remote attacker to initiate a Bleichenbacher-style attack, which can lead to the decryption of RSA ciphertexts.

- Package: libgcrypt20
- Severity: LOW
- Installed version: 1.9.4-3ubuntu3.2
- Fixed version: none
- Location: Ubuntu 22.04 runtime
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: affected
- Security Disposition: open
- Remediation: upgrade, rebuild base image, and investigate
- Tracking issue: 
- Exception expiry: 
- Notes: 

### CVE-2023-50495: NCurse v6.4-20230418 was discovered to contain a segmentation fault via the component _nc_wrap_entry().

- Package: libncurses6, libncursesw6, libtinfo6, ncurses-base, ncurses-bin
- Severity: LOW
- Installed version: 6.3-2ubuntu0.2
- Fixed version: none
- Location: Ubuntu 22.04 runtime
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: affected
- Security Disposition: open
- Remediation: upgrade, rebuild base image, and investigate
- Tracking issue: 
- Exception expiry: 
- Notes: 

### CVE-2026-13757: A stack exhaustion flaw exists in p11-kit due to unlimited mutual recursion between the RPC message attribute parsing functions p11_rpc_message_get_attribute() and p11_rpc_message_get_attribute_array_value(). An unauthenticated local attacker with access to the p11-kit RPC Unix domain socket can exploit this by sending a crafted request with deeply nested CKA_WRAP_TEMPLATE, CKA_UNWRAP_TEMPLATE, or CKA_DERIVE_TEMPLATE attributes. This triggers a crash of the p11-kit server process and its dependent services, resulting in a denial of service.

- Package: libp11-kit0, p11-kit, p11-kit-modules
- Severity: MEDIUM
- Installed version: 0.24.0-6build1
- Fixed version: none
- Location: Ubuntu 22.04 runtime
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: affected
- Security Disposition: open
- Remediation: upgrade, rebuild base image, and investigate
- Tracking issue: 
- Exception expiry: 
- Notes: 

### CVE-2022-41409: Integer overflow vulnerability in pcre2test before 10.41 allows attackers to cause a denial of service or other unspecified impacts via negative input.

- Package: libpcre2-8-0
- Severity: LOW
- Installed version: 10.39-3ubuntu0.1
- Fixed version: none
- Location: Ubuntu 22.04 runtime
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: affected
- Security Disposition: open
- Remediation: upgrade package, rebuild base image, and investigate
- Tracking issue: 
- Exception expiry: 
- Notes: 

### CVE-2026-63072>: An out-of-bounds heap write vulnerability (CWE-787) exists in OpenSSL's CMS decryption. The CMS_decrypt() function sizes its key-unwrap output buffer based on the reported key size, but the AES-WRAP-PAD primitive can write 8 additional bytes during a failed unwrap operation. An attacker can exploit this by modifying a single OID byte in a legitimate CMS message to force the padded variant. When processed, this triggers a deterministic, 8-byte zero-value heap overflow, causing heap corruption and a Denial of Service. FIPS modules are unaffected.

- Package: libssl3, openssl
- Severity: MEDIUM
- Installed version: 3.0.2-0ubuntu1.26
- Fixed version: 3.0.2-0ubuntu1.29
- Location: Ubuntu 22.04 runtime
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: upgrade, rebuild base image, and investigate
- Tracking issue: 
- Exception expiry: 
- Notes: 

### <CVE-2026-63076>: <OpenSSL CMP password based protection verification only\nchecks whether the protectionAlg parameter was not NULL and not its\nASN.1 type, before treating it as a PBMParameter.>

- Package: libssl3, openssl
- Severity: MEDIUM
- Installed version: 3.0.2-0ubuntu1.26
- Fixed version: 3.0.2-0ubuntu1.29
- Location: Ubuntu 22.04 runtime
- Exploitability: known
- Reachable at runtime: unknown
- Trivy Status: fixed
- Security Disposition: open
- Remediation: upgrade, rebuild base image, and investigate
- Tracking issue: 
- Exception expiry: 
- Notes: 

### CVE-2026-54874: Receiving a DTLS record for a future epoch while a handshake\nis in progress causes OpenSSL to buffer far more memory than the record\nitself requires.

- Package: libssl3, openssl
- Severity: LOW
- Installed version: 3.0.2-0ubuntu1.26
- Fixed version: 3.0.2-0ubuntu1.29
- Location: Ubuntu 22.04 runtime
- Exploitability: known
- Reachable at runtime: unknown
- Trivy Status: fixed
- Security Disposition: open
- Remediation: investigate
- Tracking issue: 
- Exception expiry: 
- Notes: 

### CVE-2026-63074: The OpenSSL Certificate Management Protocol (CMP) caches\nadditional certificates (extraCerts) sent in a CMP message, but never expunges\nthem (for instance if they are invalid).

- Package: libssl3, openssl
- Severity: LOW
- Installed version: 3.0.2-0ubuntu1.26
- Fixed version: 3.0.2-0ubuntu1.29
- Location: Ubuntu 22.04 runtime
- Exploitability: known
- Reachable at runtime: unknown
- Trivy Status: fixed
- Security Disposition: open
- Remediation: upgrade, rebuild base image, and investigate
- Tracking issue: 
- Exception expiry: 
- Notes: 

### CVE-2026-75803: The EVP_Cipher() API call for AEAD ciphers behaves like a one\nshot encryption and decryption call. It also verifies the AEAD tag after the\ndecryption operation. However for AES-OCB and ChaCha20-Poly1305 ciphers\nit skipped the AEAD tag verification when an empty ciphertext was passed to\nthe function. The callers of this function might believe that a successful\nreturn indicates a valid AEAD tag for these ciphers, even when that has not\ntruly been validated in this case.

- Package: libssl3, openssl
- Severity: LOW
- Installed version: 3.0.2-0ubuntu1.26
- Fixed version: 3.0.2-0ubuntu1.29
- Location: Ubuntu 22.04 runtime
- Exploitability: known
- Reachable at runtime: unknown
- Trivy Status: fixed
- Security Disposition: open
- Remediation: upgrade, rebuild base image, and investigate
- Tracking issue: 
- Exception expiry: 
- Notes: 

### <CVE-2026-40228>: <In systemd 259, systemd-journald can send ANSI escape sequences to the terminals of arbitrary users when a \"logger -p emerg\" command is executed, if ForwardToWall=yes is set.>

- Package: libsystemd0, libudev1
- Severity: LOW
- Installed version: 249.11-0ubuntu3.22
- Fixed version: none
- Location: Ubuntu 22.04 runtime
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: affected
- Security Disposition: open
- Remediation: upgrade, rebuild base image, and investigate
- Tracking issue: 
- Exception expiry: 
- Notes: 

### CVE-2022-4899: A vulnerability was found in zstd v1.4.10, where an attacker can supply empty string as an argument to the command line tool to cause buffer overrun.

- Package: libzstd1
- Severity: LOW
- Installed version: 1.4.8+dfsg-3build1
- Fixed version: none
- Location: Ubuntu 22.04 runtime
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: affected
- Security Disposition: open
- Remediation: upgrade, rebuild base image, and investigate
- Tracking issue: 
- Exception expiry: 
- Notes: 

### CVE-2023-29383: In Shadow 4.13, it is possible to inject control characters into fields provided to the SUID program chfn (change finger). Although it is not possible to exploit this directly (e.g., adding a new user fails because \\n is in the block list), it is possible to misrepresent the /etc/passwd file when viewed. Use of \\r manipulations and Unicode characters to work around blocking of the : character make it possible to give the impression that a new user has been added. In other words, an adversary may be able to convince a system administrator to take the system offline (an indirect, social-engineered denial of service) by demonstrating that \"cat /etc/passwd\" shows a rogue user account.

- Package: login, passwd
- Severity: LOW
- Installed version: 1:4.8.1-2ubuntu2.2
- Fixed version: none
- Location: Ubuntu 22.04 runtime
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: affected
- Security Disposition: open
- Remediation: upgrade, rebuild base image, and investigate
- Tracking issue: 
- Exception expiry: 
- Notes: 

### CVE-2024-56433: shadow-utils (aka shadow) 4.4 through 4.17.0 establishes a default /etc/subuid behavior (e.g., uid 100000 through 165535 for the first user account) that can realistically conflict with the uids of users defined on locally administered networks, potentially leading to account takeover, e.g., by leveraging newuidmap for access to an NFS home directory (or same-host resources in the case of remote logins by these local network users). NOTE: it may also be argued that system administrators should not have assigned uids, within local networks, that are within the range that can occur in /etc/subuid.

- Package: login, passwd
- Severity: LOW
- Installed version: 1:4.8.1-2ubuntu2.2
- Fixed version: none
- Location: Ubuntu 22.04 runtime
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: affected
- Security Disposition: open
- Remediation: upgrade, rebuild base image, and investigate
- Tracking issue: 
- Exception expiry: 
- Notes: 

### CVE-2026-12087: Socket versions before 2.041 for Perl have an out-of-bounds heap read.\n\nIn Socket.xs, pack_ip_mreq_source() checks the length of its source argument before the argument is read, so the check tests the byte length carried over from the preceding multiaddr argument instead. Both addresses occupy a 4-byte field, so a valid multiaddr lets a source of any length pass the check, and the source is then copied into the 4-byte imr_sourceaddr field with a fixed-size copy. A source shorter than 4 bytes is not rejected, and the copy reads up to 3 bytes past the end of its buffer.\n\nCalling pack_ip_mreq_source() with a source value shorter than 4 bytes copies adjacent heap memory into the returned packed structure.
          
- Package: perl-base
- Severity: MEDIUM
- Installed version: 5.34.0-3ubuntu1.7
- Fixed version: 5.34.0-3ubuntu1.8
- Location: Ubuntu 22.04 runtime
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: upgrade, rebuild base image, and investigate
- Tracking issue: 
- Exception expiry: 
- Notes: 

### CVE-2026-13221: Perl versions through 5.43.9 produce silently incorrect regular expression matches when an alternation of more than 65535 fixed string branches is compiled into a trie in Perl_study_chunk.\n\nWhen such branches are combined into a trie, the delta between the first branch and the shared tail is stored in a 16-bit field. A branch count above 65535 overflows the field, and the trie's match decision table is truncated with no warning or error.\n\nA pattern of this shape produces false positive matches (matching strings it should not) and false negative matches (failing to match strings it should). When such a pattern gates an access or filtering decision, the result is wrong.
          
- Package: perl-base
- Severity: MEDIUM
- Installed version: 5.34.0-3ubuntu1.7
- Fixed version: 5.34.0-3ubuntu1.8
- Location: Ubuntu 22.04 runtime
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes: 

### CVE-2026-57432: Perl versions through 5.43.10 have an integer overflow in S_measure_struct leading to an out-of-bounds heap read in pack and unpack.\n\nS_measure_struct adds each item's size times its repeat count to a running total with no overflow check, so a large repeat count in a pack or unpack template wraps the signed SSize_t total negative. The @, X, and x position codes then guard their moves with a signed length comparison that passes when the length is negative, advancing the buffer pointer out of bounds.\n\nA template derived from untrusted input can read heap memory past the buffer and return it to the caller.

- Package: perl-base
- Severity: MEDIUM
- Installed version: 5.34.0-3ubuntu1.7
- Fixed version: 5.34.0-3ubuntu1.8
- Location: Ubuntu 22.04 runtime
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes: 

### CVE-2026-57433: Storable versions before 3.41 for Perl have a signed integer overflow when deserializing a crafted SX_HOOK record.\n\nretrieve_hook_common reads a signed 32-bit item count from an SX_HOOK record and calls av_extend with that count plus one. A count of I32_MAX wraps the addition to a negative value.\n\nA crafted blob passed to thaw or retrieve triggers the overflow; av_extend receives the negative count and dies with a panic, terminating the deserialization.
          
- Package: perl-base
- Severity: MEDIUM
- Installed version: 5.34.0-3ubuntu1.7
- Fixed version: 5.34.0-3ubuntu1.8
- Location: Ubuntu 22.04 runtime
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes: 

### CVE-2026-18477: A TOCTOU (Time-of-Check Time-of-Use) vulnerability in GNU tar's incremental dumpdir 'X' rename handling allows a local attacker with write access to a directory being backed up to influence the restore process if the attacker has access to the system where the restore is being performed. During restoration, files or directories may be created, renamed or overwritten outside the intended extraction directory. This could lead to unauthorized file modification or, in some cases, privilege escalation. Exploitation does not require the attacker to modify or craft the archive, and standard backup and restore workflows—including extracting into a newly created directory without using the -P option do not mitigate the issue.
          
- Package: tar
- Severity: MEDIUM
- Installed version: 1.34+dfsg-1ubuntu0.1.22.04.6
- Fixed version: none
- Location: Ubuntu 22.04 runtime
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: <>
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes: 

### <CVE-ID>: <short description>
          
- Package: <PkgName>
- Severity: <Severity>
- Installed version: <InstalledVersion>
- Fixed version: <FixedVersion or none>
- Location: Ubuntu 22.04 runtime
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: <>
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes: 

## Remediation Log

| Date | Finding | Change made | Validation | Result |
|---|---|---|---|---|
| YYYY-MM-DD | <CVE-ID or package> | <dependency/image/package change> | <test or scan command> | <passed/failed> |

## Release Decision

- Decision: <Approved / Blocked / Approved with exception>
- Decision date: YYYY-MM-DD
- Approved by: <name or team>
- Conditions: <required fixes or monitoring>
- Next review date: YYYY-MM-DD
