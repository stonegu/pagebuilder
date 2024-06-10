package com.bizislife.pagebuildercore.model;

import com.bizislife.pagebuildercore.dao.entiry.Page;
import com.bizislife.pagebuildercore.dao.entiry.Pojo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor @ToString
public class PageWithoutBodyResponse implements ResponseDataInterface, PojoModelInterface {
   private Long id;
   private String uuid;
   private String name;

   @Override
   public PageWithoutBodyResponse mapFromPojo(Pojo pojo) {
      if (pojo != null) {
         Page thePage = (Page)pojo;
         this.id = thePage.getId();
         this.uuid = thePage.getUuid();
         this.name = thePage.getName();
         return this;
      }
      return null;
   }

}
