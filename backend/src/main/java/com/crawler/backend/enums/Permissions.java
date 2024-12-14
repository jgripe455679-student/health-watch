package com.crawler.backend.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Permissions {
    USER_READ("USER:READ"),
    USER_CREATE("USER:CREATE"),
    USER_UPDATE("USER:UPDATE"),
    USER_DELETE("USER:DELETE"),
    PROFILE_CREATE("PROFILE:CREATE"),
    PROFILE_READ("PROFILE:READ"),
    PROFILE_UPDATE("PROFILE:UPDATE"),
    PROFILE_DELETE("PROFILE:DELETE"),
    RECORD_CREATE("RECORD:CREATE"),
    RECORD_READ("RECORD:READ"),
    RECORD_UPDATE("RECORD:UPDATE"),
    RECORD_DELETE("RECORD:DELETE");

    private final String name;
}
