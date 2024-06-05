package com.bizislife.pagebuildercore.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bizislife.pagebuildercore.dao.entiry.Page;

public interface PageRepository extends JpaRepository<Page, Long> {

}
