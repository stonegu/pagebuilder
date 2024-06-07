package com.bizislife.pagebuildercore.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.commons.collections4.CollectionUtils;
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
   public PageResponse findPageById(Long pageId) {
      PageResponse page = null;
      Optional<Page> thePage = pageRepository.findById(pageId);
      if (thePage.isPresent()) {
         page = new PageResponse().mapFromPojo(thePage.get());
      }

      return page;
   }

   @Override
   public Long addPage(Page page) {
      Page newPage = pageRepository.saveAndFlush(page);
      return newPage.getId();
   }

   public PageResponse updatePage(Page page) {

      Optional<Page> thePageOpt = pageRepository.findById(page.getId());

      if (thePageOpt.isPresent()) {
         Page pageToUpdate = thePageOpt.get();
         pageToUpdate.setComponents(page.getComponents());
         pageToUpdate.setCss(page.getCss());
         pageToUpdate = pageRepository.saveAndFlush(pageToUpdate);
         return new PageResponse().mapFromPojo(pageToUpdate);
      }

      return null;
   }

}
