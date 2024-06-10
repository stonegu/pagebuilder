package com.bizislife.pagebuildercore.model;

import com.bizislife.pagebuildercore.dao.entiry.Page;
import com.bizislife.pagebuildercore.dao.entiry.Pojo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @NoArgsConstructor @ToString
public class PageResponse implements ResponseDataInterface, PojoModelInterface {

   private Long id;

   private String uuid;

   private String name;

   private String components;

   private String css;

   @Override
   public PageResponse mapFromPojo(Pojo pojo) {
      if (pojo != null) {
         Page thePage = (Page)pojo;
         this.id = thePage.getId();
         this.uuid = thePage.getUuid();
         this.name = thePage.getName();
         this.components = thePage.getComponents();
         this.css = thePage.getCss();
         return this;
      }
      return null;
   }

}
