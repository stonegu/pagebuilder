package com.bizislife.pagebuildercore.configure;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.bizislife.pagebuildercore.exception.ApiError;
import com.bizislife.pagebuildercore.exception.MyCustomClientException;

@ControllerAdvice
public class CustomGlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(MyCustomClientException.class)
    public ResponseEntity<ApiError> customClientException(Exception ex, WebRequest request) {
        ApiError error = ((MyCustomClientException)ex).getApiError();
        return new ResponseEntity<>(error, HttpStatus.resolve(error.getHttpStatus()));
    }


    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
            ApiError error = new ApiError();

            error.setHttpStatus(status.value());
            error.setLogId(UUID.randomUUID().toString());
            error.setMessage(ex.getMessage());
            error.setPath(((ServletWebRequest)request).getRequest().getRequestURI());
            error.setTimestamp(Instant.now());
            return new ResponseEntity<>(error, HttpStatus.resolve(error.getHttpStatus()));
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        StringBuilder errorMsg = new StringBuilder();
        List<ObjectError> errors = ex.getAllErrors();
        if (CollectionUtils.isNotEmpty(errors)) {
            for (ObjectError err : errors) {
                errorMsg.append(err.getDefaultMessage()).append(", ");
            }
        }

        ApiError error = new ApiError();
        error.setHttpStatus(status.value());
        error.setLogId(UUID.randomUUID().toString());
        error.setMessage(errorMsg.toString());
        error.setPath(((ServletWebRequest)request).getRequest().getRequestURI());
        error.setTimestamp(Instant.now());
        return new ResponseEntity<>(error, HttpStatus.resolve(error.getHttpStatus()));

    }



}
