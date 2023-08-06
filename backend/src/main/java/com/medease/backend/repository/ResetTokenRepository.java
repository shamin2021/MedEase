package com.medease.backend.repository;

import com.medease.backend.entity.ResetToken;
import com.medease.backend.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ResetTokenRepository extends JpaRepository<ResetToken, Integer> {

    @Query("""
    select t from ResetToken t inner join User u on t.user.id = u.id
    where u.id = :userId and (t.expired = false or t.revoked = false ) and t.tokenType = 'RESET'
""")
    List<ResetToken> findAllValidResetTokensByUser(Integer userId);

    Optional<ResetToken> findByToken(String token);
}
