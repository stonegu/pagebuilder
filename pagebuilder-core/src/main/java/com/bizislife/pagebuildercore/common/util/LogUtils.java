package com.bizislife.pagebuildercore.common.util;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;

import com.bizislife.pagebuildercore.exception.ApiError;
import com.bizislife.pagebuildercore.exception.MyCustomClientException;
import com.bizislife.pagebuildercore.model.PbApiResponse.KeyValue;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class LogUtils {

    public static String generateLogString(String logId, String uri, String logMsg) {
        StringBuilder log = new StringBuilder("logId: ").append(logId);
        if (StringUtils.isNotBlank(uri)) {
            log.append(", uri: ").append(uri);
        }
        log.append(" - ").append(StringUtils.isNotBlank(logMsg) ? logMsg : "NO LOG MESSAGE!");
        return log.toString();
    }

    public static String generateDebugMsg(String theClass, String functionName, String debugMsg, Map<String, String> paramsMapForDebug) {
        StringBuilder log = new StringBuilder(StringUtils.isNotBlank(debugMsg) ? debugMsg : "NO DEBUG MESSAGE!").append(" (")
                .append("class: ").append(theClass).append(", ")
                .append("function: ").append(functionName);

        if (paramsMapForDebug != null && paramsMapForDebug.size() > 0) {
            log.append(", params: [");
            int i = 0;
            for (Map.Entry<String, String> entry : paramsMapForDebug.entrySet()) {
                if (i > 0) {
                    log.append(", ");
                }
                i = i + 1;
                log.append("{").append(entry.getKey()).append(" : ").append(entry.getValue()).append("}");
            }
            log.append("]");
        }
        log.append(")");

        return log.toString();
    }

    @SafeVarargs
    public static Map<String, String> paramMapGenerator(KeyValue<String, String>... keyValues) {
        Map<String, String> paramsMapForDebug = new HashMap<>();
        if (keyValues != null) {
            for (KeyValue<String, String> keyValue : keyValues) {
                paramsMapForDebug.put(keyValue.getKey(), keyValue.getValue());
            }
        }
        return paramsMapForDebug;
    }

    public static String logError(String logId, String theClass, String functionName, String uri, String logMsg, Map<String, String> paramsMapForDebug) {
        if (StringUtils.isBlank(logId)) {
            logId = UUID.randomUUID().toString();
        }
        log.error(
                generateLogString(
                        logId,
                        uri,
                        generateDebugMsg(
                                theClass,
                                functionName,
                                logMsg,
                                paramsMapForDebug
                        )
                )
        );
        return logId;
    }

    public static String logInfo(String logId, String theClass, String functionName, String uri, String logMsg, Map<String, String> paramsMapForDebug) {
        if (StringUtils.isBlank(logId)) {
            logId = UUID.randomUUID().toString();
        }
        log.info(
                generateLogString(
                        logId,
                        uri,
                        generateDebugMsg(
                                theClass,
                                functionName,
                                logMsg,
                                paramsMapForDebug
                        )
                )
        );
        return logId;
    }

    public static void logAndThrowMyCustomClientException(String logId, HttpStatus status, String theClass, String functionName, String logMsg, Map<String, String> paramsMapForDebug) {
        // LocalDateTime now = LocalDateTime.now();
        Instant now = Instant.now();
        // log
        logError(logId, theClass, functionName, null, logMsg, paramsMapForDebug);
        // throw
        ApiError apiError = new ApiError(logId, status.value(), now, logMsg, null);
        MyCustomClientException exception = new MyCustomClientException(apiError);
        throw exception;
    }
    
}
