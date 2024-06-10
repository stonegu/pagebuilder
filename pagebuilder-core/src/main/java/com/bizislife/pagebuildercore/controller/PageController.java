package com.bizislife.pagebuildercore.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bizislife.pagebuildercore.common.LogIdGenerator;
import com.bizislife.pagebuildercore.common.util.ApiResponseUtils;
import com.bizislife.pagebuildercore.dao.entiry.Page;
import com.bizislife.pagebuildercore.model.PageResponse;
import com.bizislife.pagebuildercore.model.PageWithoutBodyResponse;
import com.bizislife.pagebuildercore.model.PbApiResponse;
import com.bizislife.pagebuildercore.model.PbApiResponse.StringResult;
import com.bizislife.pagebuildercore.service.PageService;

@RestController
@RequestMapping(value = "${api.base-request-mapping}/page", produces = MediaType.APPLICATION_JSON_VALUE)
public class PageController {

   @Autowired
   private LogIdGenerator logIdGenerator;

   @Autowired
   PageService pageService;

   @GetMapping("/all")
   @ResponseBody
   public ResponseEntity<PbApiResponse<PageWithoutBodyResponse>> getAllPages() {

      List<PageWithoutBodyResponse> pages = pageService.getAllPagesWithoutBody();
      PbApiResponse<PageWithoutBodyResponse> apiResponse = ApiResponseUtils.createApiResponseInList(pages, logIdGenerator.getLogId());
      
      return new ResponseEntity<>(apiResponse, HttpStatus.OK);
   }

   @GetMapping("/{pageId}/{uuid}")
   @ResponseBody
   public ResponseEntity<PbApiResponse<PageResponse>> getPageById(
      @PathVariable("pageId") Long pageId,
      @PathVariable("uuid") String uuid
   ) {
      PageResponse page = pageService.findPageById(pageId, uuid);
      PbApiResponse<PageResponse> apiResponse = ApiResponseUtils.createApiResponse(page, logIdGenerator.getLogId());
      return new ResponseEntity<>(apiResponse, HttpStatus.OK);
   }

   @PostMapping("/add")
   public ResponseEntity<PbApiResponse<PageWithoutBodyResponse>> add(
      @RequestBody Page page
   ) {
      // add page uuid
      if (page != null) {
         page.setUuid(UUID.randomUUID().toString());
      }
      PageWithoutBodyResponse thePage = pageService.addPage(page);
      PbApiResponse<PageWithoutBodyResponse> apiResponse = ApiResponseUtils.createApiResponse(thePage, logIdGenerator.getLogId());
      return new ResponseEntity<>(apiResponse, HttpStatus.OK);
   }

   @PutMapping("/update")
   public ResponseEntity<PbApiResponse<PageWithoutBodyResponse>> updatePage(
      @RequestBody Page page
   ) {
      PageWithoutBodyResponse thePage = pageService.updatePage(page);
      PbApiResponse<PageWithoutBodyResponse> apiResponse = ApiResponseUtils.createApiResponse(thePage, logIdGenerator.getLogId());
      return new ResponseEntity<>(apiResponse, HttpStatus.OK);
   }


}
