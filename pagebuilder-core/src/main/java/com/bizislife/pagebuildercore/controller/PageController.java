package com.bizislife.pagebuildercore.controller;

import java.util.List;

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

   @GetMapping("/{pageId}")
   @ResponseBody
   public ResponseEntity<PbApiResponse<PageResponse>> getPageById(
      @PathVariable("pageId") Long pageId
   ) {
      PageResponse page = pageService.findPageById(pageId);
      PbApiResponse<PageResponse> apiResponse = ApiResponseUtils.createApiResponse(page, logIdGenerator.getLogId());
      return new ResponseEntity<>(apiResponse, HttpStatus.OK);
   }

   @PostMapping("/add")
   public ResponseEntity<PbApiResponse<StringResult>> add(
      @RequestBody Page page
   ) {
      Long pageId = pageService.addPage(page);
      StringResult pageIdInString = new StringResult(Long.toString(pageId));

      PbApiResponse<StringResult> apiResponse = ApiResponseUtils.createApiResponse(pageIdInString, logIdGenerator.getLogId());
      return new ResponseEntity<>(apiResponse, HttpStatus.OK);
   }

   @PutMapping("/update")
   public ResponseEntity<PbApiResponse<PageResponse>> updatePage(
      @RequestBody Page page
   ) {
      PageResponse thePage = pageService.updatePage(page);
      PbApiResponse<PageResponse> apiResponse = ApiResponseUtils.createApiResponse(thePage, logIdGenerator.getLogId());
      return new ResponseEntity<>(apiResponse, HttpStatus.OK);
   }


}
