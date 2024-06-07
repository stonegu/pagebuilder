package com.bizislife.pagebuildercore.model;

import java.time.Instant;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor @Getter @Setter @ToString
public class PbApiResponse<T extends ResponseDataInterface> {

    private String logId;

    private Instant timestamp;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T data;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<T> dataset;

    @AllArgsConstructor @Setter @Getter @ToString
    public static class StringResult implements ResponseDataInterface{
        private String result;
    }

    @AllArgsConstructor @Setter @Getter @ToString
    public static class BooleanResult implements ResponseDataInterface{
        private Boolean result;
    }

    @AllArgsConstructor @Setter @Getter @ToString
    public static class KeyValue<K extends CharSequence, V> implements ResponseDataInterface {
        private K key;
        private V value;
    }
   

}
