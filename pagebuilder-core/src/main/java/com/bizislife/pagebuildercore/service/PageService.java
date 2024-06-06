package com.bizislife.pagebuildercore.service;

import java.util.List;
import com.bizislife.pagebuildercore.dao.entiry.Page;

public interface PageService {
   List<Page> getAllPages();

   Page findPageById(Long pageId);

   Long addPage(Page page);
}
