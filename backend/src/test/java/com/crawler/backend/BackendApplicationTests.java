package com.crawler.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.crawler.backend.repository.TestApplication;

@SpringBootTest(classes = TestApplication.class)
@ActiveProfiles("test")
// @DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class BackendApplicationTests {

	@Test
	void contextLoads() {
	}

}
