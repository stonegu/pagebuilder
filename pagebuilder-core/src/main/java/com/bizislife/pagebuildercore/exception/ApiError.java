package com.bizislife.pagebuildercore.exception;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.Instant;

@NoArgsConstructor @AllArgsConstructor @Getter @Setter @ToString
public class ApiError {
    private String logId;

    private int httpStatus;
    
    private Instant timestamp;
    
    private String message;

    @JsonInclude(JsonInclude.Include.NON_NULL)    
    private String path;

}