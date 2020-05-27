package org.openvasp.host.config;

import lombok.val;
import org.openvasp.host.model.cfg.HostConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;

/**
 * @author Olexandr_Bilovol@epam.com
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    // To generate HTTP header (Authorization: )
    // See https://www.blitter.se/utils/basic-authentication-header-generator/
    private static final String USER_ROLE = "REST-CLIENT";

    @Autowired
    private HostConfig hostConfig;

    @Override
    protected void configure(final HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .cors().and().csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/", "/api-doc/**").permitAll()
                .antMatchers("/api/v1/**").hasRole(USER_ROLE)
                .and()
                .httpBasic().realmName("Open-VASP-Host-App");
    }

    @Override
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        val httpBasicAuth = hostConfig.getHttpBasicAuth();
        val encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        auth.inMemoryAuthentication()
                .withUser(httpBasicAuth.getName())
                .password(encoder.encode(httpBasicAuth.getPassword()))
                .roles(USER_ROLE);
    }

    @Bean
    @Override
    public UserDetailsService userDetailsServiceBean() throws Exception {
        return super.userDetailsServiceBean();
    }

}
