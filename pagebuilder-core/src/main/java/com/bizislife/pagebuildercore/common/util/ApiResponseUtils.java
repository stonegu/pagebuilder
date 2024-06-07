package com.bizislife.pagebuildercore.common.util;

import java.time.Instant;
import java.util.List;

import com.bizislife.pagebuildercore.model.PbApiResponse;
import com.bizislife.pagebuildercore.model.ResponseDataInterface;

public class ApiResponseUtils {

    public static<T extends ResponseDataInterface> PbApiResponse<T> createApiResponse(T data, String logId) {
        PbApiResponse<T> apiResponse = new PbApiResponse<>();
        apiResponse.setData(data);
        apiResponse.setLogId(logId);
        apiResponse.setTimestamp(Instant.now());
        return apiResponse;
    }

    public static<T extends ResponseDataInterface> PbApiResponse<T> createApiResponseInList(List<T> dataSet, String logId) {
        PbApiResponse<T> apiResponse = new PbApiResponse<>();
        apiResponse.setDataset(dataSet);
        apiResponse.setLogId(logId);
        apiResponse.setTimestamp(Instant.now());
        return apiResponse;
    }
}
