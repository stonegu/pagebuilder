package com.bizislife.pagebuildercore.service.impl;

import java.util.List;
import java.util.Optional;

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

}
