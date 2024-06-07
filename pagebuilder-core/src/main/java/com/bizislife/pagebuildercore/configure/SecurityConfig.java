package com.bizislife.pagebuildercore.configure;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity(debug = false)
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

   @Value("${spring.security.AUTH_WHITELIST}")
   private  String[] AUTH_WHITELIST;

   @Bean
   public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

      http
         .cors(cors -> cors.configurationSource(new MyCorsConfigurationSource()))
         // .cors(Customizer.withDefaults())
         .csrf(csrf -> csrf.disable())
         .authorizeHttpRequests(authz -> 
            authz.requestMatchers(AUTH_WHITELIST).permitAll()
            .anyRequest().authenticated())
         .sessionManagement((sessionManagement) -> { sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS); })
         // .addFilterBefore(bearerTokenFilter, BearerTokenAuthenticationFilter.class)         
         // .oauth2ResourceServer(oAuth2ResourceServerConfigurerCustomizer())
         // .exceptionHandling(exception -> 
         //    exception.authenticationEntryPoint(new CustomAuthenticationEntryPoint()) // handle no token
         //             .accessDeniedHandler(new CustomAccessDeniedHandler())) // handle PreAuthorize for Role / Group permission issue
         ;

      return http.build();

   }



}
