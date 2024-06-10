package com.bizislife.pagebuildercore.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bizislife.pagebuildercore.dao.PageRepository;
import com.bizislife.pagebuildercore.dao.entiry.Page;
import com.bizislife.pagebuildercore.model.PageResponse;
import com.bizislife.pagebuildercore.model.PageWithoutBodyResponse;
import com.bizislife.pagebuildercore.service.PageService;

@Service("PageService")
public class PageServiceImpl implements PageService {

   private final PageRepository pageRepository;

   @Autowired
   public PageServiceImpl(PageRepository pageRepository) {
      this.pageRepository = pageRepository;
   }

   @Override
   public List<PageResponse> getAllPages() {
      List<PageResponse> pageListResult = new ArrayList<>();
      List<Page> thePages = pageRepository.findAll();
      if (CollectionUtils.isNotEmpty(thePages)) {
         thePages.forEach(p -> {
            pageListResult.add(new PageResponse().mapFromPojo(p));
         });
      }
      return pageListResult;
   }

   @Override
   public List<PageWithoutBodyResponse> getAllPagesWithoutBody() {
      return pageRepository.findPageWithoutBodyResponses();
   }

   @Override
   public PageResponse findPageById(Long pageId, String uuid) {
      PageResponse page = null;
      Optional<Page> pageOptional = pageRepository.findById(pageId);
      if (pageOptional.isPresent()) {
         Page thePage = pageOptional.get();
         if(StringUtils.equals(thePage.getUuid(), uuid)) {
            page = new PageResponse().mapFromPojo(thePage);
         }
      }

      return page;
   }

   @Override
   public PageWithoutBodyResponse addPage(Page page) {
      PageWithoutBodyResponse thePage = null;
      if (StringUtils.isNotBlank(page.getUuid()) && StringUtils.isNotBlank(page.getName())) {
         Page newPage = pageRepository.saveAndFlush(page);
         thePage = new PageWithoutBodyResponse().mapFromPojo(newPage);
      }
      return thePage;
   }

   public PageWithoutBodyResponse updatePage(Page page) {
      Optional<Page> thePageOpt = pageRepository.findById(page.getId());

      if (thePageOpt.isPresent()) {
         Page pageToUpdate = thePageOpt.get();
         if (StringUtils.equals(pageToUpdate.getUuid(), page.getUuid())) {
            pageToUpdate.setComponents(page.getComponents());
            pageToUpdate.setCss(page.getCss());
            pageToUpdate = pageRepository.saveAndFlush(pageToUpdate);
            return new PageWithoutBodyResponse().mapFromPojo(pageToUpdate);   
         }
      }
      return null;
   }

}
