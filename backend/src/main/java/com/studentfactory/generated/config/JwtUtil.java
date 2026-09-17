package com.studentfactory.generated.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

  private final SecretKey key;
  private final long expirationMs;

  public JwtUtil(
    @Value("${jwt.secret:community-dashboard-management-system-super-secret-key-change-in-prod}") String secret,
    @Value("${jwt.expiration-ms:86400000}") long expirationMs
  ) {
    // Ensure key is at least 256 bits (32 chars) for HS256
    String paddedSecret = secret.length() < 32
      ? secret + "0".repeat(32 - secret.length())
      : secret;
    this.key = Keys.hmacShaKeyFor(paddedSecret.getBytes(StandardCharsets.UTF_8));
    this.expirationMs = expirationMs;
  }

  public String generateToken(String email, String role) {
    return Jwts.builder()
      .subject(email)
      .claim("role", role)
      .issuedAt(new Date())
      .expiration(new Date(System.currentTimeMillis() + expirationMs))
      .signWith(key)
      .compact();
  }

  public Claims validateToken(String token) {
    return Jwts.parser()
      .verifyWith(key)
      .build()
      .parseSignedClaims(token)
      .getPayload();
  }

  public String extractEmail(String token) {
    return validateToken(token).getSubject();
  }

  public String extractRole(String token) {
    return validateToken(token).get("role", String.class);
  }
}