package com.bizislife.pagebuildercore.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bizislife.pagebuildercore.dao.entiry.Page;
import com.bizislife.pagebuildercore.model.PageWithoutBodyResponse;

public interface PageRepository extends JpaRepository<Page, Long> {

   // check [Effective Use of Projection in Spring Data JPA](https://medium.com/@ak123aryan/effective-use-of-projection-in-spring-data-jpa-b90234d524af)
   @Query("SELECT NEW com.bizislife.pagebuildercore.model.PageWithoutBodyResponse(p.id, p.name) FROM page p")
   List<PageWithoutBodyResponse> findPageWithoutBodyResponses();

}
