package com.bizislife.pagebuildercore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bizislife.pagebuildercore.dao.entiry.Page;
import com.bizislife.pagebuildercore.service.PageService;

@RestController
@RequestMapping(value = "${api.base-request-mapping}/page", produces = MediaType.APPLICATION_JSON_VALUE)
public class PageController {

   @Autowired
   PageService pageService;

   @GetMapping("/all")
   public List<Page> getAllPages() {
      return pageService.getAllPagesWithoutBody();
   }

   @GetMapping("/{pageId}")
   public Page getPageById(
      @PathVariable("pageId") Long pageId
   ) {
      return pageService.findPageById(pageId);
   }

   @PostMapping("/add")
   public Long add(
      @RequestBody Page page
   ) {
      Long pageId = pageService.addPage(page);

      return pageId;
   }

   @PutMapping("/update")
   public Page updatePage(
      @RequestBody Page page
   ) {
      Page thePage = pageService.updatePage(page);

      return thePage;
   }


}
