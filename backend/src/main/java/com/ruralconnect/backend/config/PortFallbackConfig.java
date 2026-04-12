package com.ruralconnect.backend.config;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.ServerSocket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PortFallbackConfig implements WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> {

    private static final Logger log = LoggerFactory.getLogger(PortFallbackConfig.class);

    @Value("${server.port:8080}")
    private int configuredPort;

    @Value("${app.server.auto-port-fallback:true}")
    private boolean autoPortFallback;

    @Value("${app.server.fallback-port:8081}")
    private int fallbackPort;

    @Override
    public void customize(ConfigurableServletWebServerFactory factory) {
        if (!autoPortFallback || configuredPort <= 0) {
            return;
        }

        if (isPortAvailable(configuredPort)) {
            return;
        }

        int targetPort = (fallbackPort > 0) ? fallbackPort : configuredPort + 1;

        if (!isPortAvailable(targetPort)) {
            log.warn("Configured port {} is busy and fallback port {} is also busy. Startup will fail unless a free port is configured.", configuredPort, targetPort);
            return;
        }

        factory.setPort(targetPort);
        log.warn("Configured port {} is busy. Switching automatically to fallback port {}.", configuredPort, targetPort);
    }

    private boolean isPortAvailable(int port) {
        try (ServerSocket serverSocket = new ServerSocket()) {
            serverSocket.setReuseAddress(false);
            serverSocket.bind(new InetSocketAddress("0.0.0.0", port), 1);
            return true;
        } catch (IOException ex) {
            return false;
        }
    }
}
