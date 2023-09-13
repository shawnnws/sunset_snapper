package com.example.sunset_snapper_server.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

// import com.auth0.jwt.JWT;
// import com.auth0.jwt.algorithms.Algorithm;
import com.example.sunset_snapper_server.model.UserPrincipal;

@Service
public class TokenService {
    
    @Value("${jwt.key.secret}")
    private String secretKey;

    // public String generateToken(Authentication auth) {
    //     UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
    //     Instant now = Instant.now();
    //     String scope = auth.getAuthorities()
    //         .stream()
    //         .map(GrantedAuthority::getAuthority)
    //         .collect(Collectors.joining(","));

    //     return JWT.create()
    //         .withIssuer("Zapit")
    //         .withIssuedAt(now)
    //         .withSubject(String.valueOf(userPrincipal.getUser().getUserId()))
    //         .withExpiresAt(now.plus(1, ChronoUnit.HOURS))
    //         .withClaim("name", auth.getName())
    //         .withClaim("scope", scope)
    //         .sign(Algorithm.HMAC256(secretKey));
    // }
}
