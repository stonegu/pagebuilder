package com.bizislife.pagebuildercore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;

@EnableEncryptableProperties
@SpringBootApplication
public class PagebuilderCoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(PagebuilderCoreApplication.class, args);
	}

}
