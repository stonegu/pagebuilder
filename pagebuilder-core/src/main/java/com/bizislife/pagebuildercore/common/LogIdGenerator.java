package com.bizislife.pagebuildercore.common;

import java.util.UUID;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

import lombok.Getter;
import lombok.Setter;

@Setter @Getter
@Component
@RequestScope
public class LogIdGenerator {

    private String logId;

    public LogIdGenerator() {
        this.logId = UUID.randomUUID().toString();
    }

}
