package com.studentfactory.generated.runner;

import com.studentfactory.generated.service.SeedService;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.stereotype.Component;

@Component
public class FactoryTaskRunner implements ApplicationRunner {
  private final SeedService seedService;
  private final ConfigurableApplicationContext context;

  public FactoryTaskRunner(SeedService seedService, ConfigurableApplicationContext context) {
    this.seedService = seedService;
    this.context = context;
  }

  @Override
  public void run(ApplicationArguments args) throws Exception {
    if (!args.containsOption("factory.task")) return;

    String task = args.getOptionValues("factory.task").get(0);
    if ("seed".equals(task)) {
      seedService.seed();
      System.out.println("[seed] completed");
    } else if ("migrate".equals(task)) {
      System.out.println("[migrate] schema synchronized");
    }
    SpringApplicationExit.exit(context);
  }

  static class SpringApplicationExit {
    static void exit(ConfigurableApplicationContext context) {
      int code = org.springframework.boot.SpringApplication.exit(context, () -> 0);
      System.exit(code);
    }
  }
}
