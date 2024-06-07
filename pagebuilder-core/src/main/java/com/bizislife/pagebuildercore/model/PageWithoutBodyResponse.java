package com.bizislife.pagebuildercore.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @AllArgsConstructor @ToString
public class PageWithoutBodyResponse implements ResponseDataInterface {
   private Long id;
   private String name;
}
