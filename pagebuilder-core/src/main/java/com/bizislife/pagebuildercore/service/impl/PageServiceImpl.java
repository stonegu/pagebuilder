package com.bizislife.pagebuildercore.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bizislife.pagebuildercore.dao.PageRepository;
import com.bizislife.pagebuildercore.dao.entiry.Page;
import com.bizislife.pagebuildercore.service.PageService;

@Service("PageService")
public class PageServiceImpl implements PageService {

   private final PageRepository pageRepository;

   @Autowired
   public PageServiceImpl(PageRepository pageRepository) {
      this.pageRepository = pageRepository;
   }

   @Override
   public List<Page> getAllPages() {
      return pageRepository.findAll();
   }

   @Override
   public List<Page> getAllPagesWithoutBody() {
      List<Page> pages = new ArrayList<>();
      List<Page> thePages = getAllPages();
      if (CollectionUtils.isNotEmpty(thePages)) {
         thePages.forEach( p -> {
            Page thePage = new Page();
            thePage.setId(p.getId());
            thePage.setName(p.getName());
            pages.add(thePage);
         });
      }

      return pages;
   }

   @Override
   public Page findPageById(Long pageId) {
      Page page = null;
      Optional<Page> thePage = pageRepository.findById(pageId);
      if (thePage.isPresent()) {
         page = thePage.get();
      }

      return page;
   }

   @Override
   public Long addPage(Page page) {
      Page newPage = pageRepository.saveAndFlush(page);
      return newPage.getId();
   }

   public Page updatePage(Page page) {

      Page pageToUpdate = findPageById(page.getId());
      if (pageToUpdate != null) {
         pageToUpdate.setComponents(page.getComponents());
         pageToUpdate.setCss(page.getCss());

         pageToUpdate = pageRepository.saveAndFlush(pageToUpdate);
      }

      return pageToUpdate;
   }

}
