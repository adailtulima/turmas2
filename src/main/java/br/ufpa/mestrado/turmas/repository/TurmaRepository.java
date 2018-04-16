package br.ufpa.mestrado.turmas.repository;

import br.ufpa.mestrado.turmas.domain.Turma;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Turma entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TurmaRepository extends JpaRepository<Turma, Long> {

}
