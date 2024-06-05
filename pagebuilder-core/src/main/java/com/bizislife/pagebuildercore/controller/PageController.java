package com.bizislife.pagebuildercore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bizislife.pagebuildercore.dao.entiry.Page;
import com.bizislife.pagebuildercore.service.PageService;

@RestController
@RequestMapping(value = "${api.base-request-mapping}", produces = MediaType.APPLICATION_JSON_VALUE)
public class PageController {

   @Autowired
   PageService pageService;

   @GetMapping("/pages")
   public List<Page> getAllPages() {
      return pageService.getAllPages();
   }

}
