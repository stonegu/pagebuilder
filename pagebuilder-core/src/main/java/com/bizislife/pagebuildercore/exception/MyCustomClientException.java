package com.bizislife.pagebuildercore.exception;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MyCustomClientException extends RuntimeException {
    
    private final ApiError apiError;

    public MyCustomClientException(ApiError apiError) {
        super(apiError.getMessage());
        this.apiError = apiError;
    }

    public MyCustomClientException(Throwable cause, ApiError apiError) {
        super(apiError.getMessage(), cause);
        this.apiError = apiError;
    }

}