package com.bizislife.pagebuildercore.service;

import java.util.List;
import com.bizislife.pagebuildercore.dao.entiry.Page;
import com.bizislife.pagebuildercore.model.PageResponse;
import com.bizislife.pagebuildercore.model.PageWithoutBodyResponse;

public interface PageService {
   List<PageResponse> getAllPages();
   List<PageWithoutBodyResponse> getAllPagesWithoutBody();

   PageResponse findPageById(Long pageId);

   Long addPage(Page page);

   PageResponse updatePage(Page page);
}
